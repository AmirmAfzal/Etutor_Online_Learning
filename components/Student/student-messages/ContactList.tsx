import { connectDB } from "@/lib/db/db";
import messageModel from "@/lib/db/models/messageModel";
import Icon from "@/components/ui/Icon";
import React from "react";
import Image from "next/image";
import Link from "next/link";
import moment from "moment";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import instructorModel from "@/lib/db/models/instructorModel";
import studentModel from "@/lib/db/models/studentModel";
import MessageHeader from "@/components/Student/student-messages/MessageHeader";
import { PipelineStage, Types } from "mongoose";

interface Props {
  userRole: "student" | "instructor";
}

interface IdProp {
  _id: Types.ObjectId;
}

const contactList = async ({ userRole }: Props) => {
  await connectDB();

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  console.log("Current Role:", userRole);

  let currentInstructorId = null;
  let currentStudentId = null;
  let pipeline: PipelineStage[] = [];

  if (userRole === "instructor" && userId) {
    const instructor = await instructorModel
      .findOne({ user: userId })
      .lean<IdProp>();
    currentInstructorId = instructor?._id;
  }
  if (userRole === "student" && userId) {
    const student = await studentModel.findOne({ user: userId }).lean<IdProp>();
    currentStudentId = student?._id;
  }

  if (userRole == "instructor") {
    pipeline = [
      { $match: { sender: "STUDENT", instructor: currentInstructorId } },
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
    ];
  } else if (userRole == "student") {
    pipeline = [
      { $match: { sender: "INSTRUCTOR", student: currentStudentId } },
      { $sort: { createdAt: -1 } },
      {
        $group: {
          _id: "$instructor",
          lastMessage: { $first: "$$ROOT" },
        },
      },
      {
        $lookup: {
          from: "instructors",
          localField: "_id",
          foreignField: "_id",
          as: "instructorData",
        },
      },
      { $unwind: "$instructorData" },
      {
        $project: {
          _id: 1,
          firstname: "$instructorData.firstname",
          lastname: "$instructorData.lastname",
          avatar: "$instructorData.avatar",
          lastMessage: "$lastMessage.message",
          lastMessageDate: "$lastMessage.createdAt",
        },
      },
    ];
  }

  const messageSender = await messageModel.aggregate(pipeline);

  return (
    <div className="border-base-300 flex flex-col gap-2 border">
      <MessageHeader />
      <ul className="ml:w-1/4">
        {messageSender.map((sender, index) => (
          <li key={index} className="my-3 ml-2">
            <Link
              href={
                userRole == "student"
                  ? `/student/messages/${sender._id}`
                  : userRole == "instructor"
                    ? `/instructor/dashboard/message/${sender._id}`
                    : ""
              }
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
              <span className="text-base-content/60 text-[10px] sm:text-right sm:text-xs">
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
