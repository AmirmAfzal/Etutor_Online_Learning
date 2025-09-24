"use server";

import { connectDB } from "@/lib/db/db";
import messageModel from "@/lib/db/models/messageModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { Types } from "mongoose";
import studentModel from "@/lib/db/models/studentModel";
import instructorModel from "@/lib/db/models/instructorModel";
import MessageInput from "@/components/Student/student-messages/MessageInput";

interface Props {
  searchParams?: Promise<{ id: string }>;
  params?: Promise<{ id: string }>;
  receiverId: Types.ObjectId;
}

const ChatMessages = async (props: Props) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const receiverId = props.receiverId || searchParams?.id || params?.id;

  await connectDB();

  // USER : SENDER
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const userId = session?.user?.id;
  if (!session?.user?.id) {
    return <span>invalid user id</span>;
  }

  console.log(session?.user?.id);

  let studentId = null;
  let instructorId = null;

  if (user?.role === "STUDENT") {
    const student = await studentModel.findOne({ user: userId }).lean();
    if (student) {
      studentId = student?._id;
      instructorId = receiverId;
    }
  } else if (user?.role === "INSTRUCTOR") {
    const instructor = await instructorModel.findOne({ user: userId }).lean();
    if (instructor) {
      instructorId = instructor?._id;
      studentId = receiverId;
    }
  }

  console.log("student", studentId);
  console.log("instructor", instructorId);

  const messages = await messageModel
    .find({ student: studentId, instructor: instructorId })
    .sort({ createdAt: -1 })
    .lean();

  console.log(messages);

  return (
      <div className="bg-base-100 ml:w-3/4 border-base-300 relative flex-1 border p-4">
        <div className="flex h-[600px] mb-2 flex-col-reverse space-y-4 space-y-reverse overflow-y-auto">
          {messages.map((message) => (
            <div
              key={message?._id?.toString()}
              className={`flex flex-col ${
                message.sender === "STUDENT" ? "items-end" : "items-start"
              }`}
            >
              <p className="mb-1 text-xs opacity-70">
                {new Date(message.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <div
                className={`max-w-xs rounded-md p-2.5 ${
                  message.sender === "STUDENT"
                    ? "bg-primary text-primary-content"
                    : "bg-primary/20 text-base-content/70"
                }`}
              >
                <p className="text-xs font-medium md:text-sm">
                  {message.message}
                </p>
              </div>
            </div>
          ))}
        </div>
        <MessageInput receiverId={receiverId} />
      </div>
  );
};

export default ChatMessages;
