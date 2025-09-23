import { connectDB } from "@/lib/db/db";
import messageModel from "@/lib/db/models/messageModel";
import Icon from "@/components/ui/Icon";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";

const contactList = async () => {
  await connectDB();

  const messageSender = await messageModel.aggregate([
    { $match: { sender: "STUDENT" } },
    { $sort: { createdAt: -1 } },
    {
      $group: {
        _id: "$student",
        lastMessage: { $first: "$$ROOT" },
      },
    },
    {
      $lookup: {
        from: "students",
        localField: "_id",
        foreignField: "_id",
        as: "studentData",
      },
    },
    { $unwind: "$studentData" },
    {
      $project: {
        _id: 1,
        firstname: "$studentData.firstname",
        lastname: "$studentData.lastname",
        avatar: "$studentData.avatar",
        lastMessage: "$lastMessage.message",
        lastMessageDate: "$lastMessage.createdAt",
      },
    },
  ]);

  return (
    <div>
      <ul>
        {messageSender.map((sender, index) => (
          <li key={index} className="my-3 ml-2">
            <Link
              href={`/instructor/dashboard/message/${sender._id}`}
              className="hover:bg-base-200 flex flex-col gap-2 rounded-lg p-2 transition sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex min-w-0 flex-1 items-center gap-2">
                {sender.avatar ? (
                  <Image
                    src={sender.avatar || "/default-avatar.png"}
                    alt={`${sender.firstname} ${sender.lastname}'s avatar`}
                    width={50}
                    height={50}
                    className="shrink-0 rounded-full"
                  />
                ) : (
                  <Icon
                    icon="ph:user"
                    className="border-base-300 shrink-0 rounded-full border p-3 text-2xl"
                  />
                )}
                <div className="flex min-w-0 flex-col">
                  <span className="text-sm font-medium sm:text-base">
                    {`${sender.firstname} ${sender.lastname}`}
                  </span>
                  <p className="text-base-content/70 truncate text-xs sm:text-sm">
                    {sender.lastMessage}
                  </p>
                </div>
              </div>
              <span className="text-[10px] text-base-content/60 sm:text-right sm:text-xs">
                {moment(sender.lastMessageDate).fromNow()}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default contactList;
