"use server";

import { connectDB } from "@/lib/db/db";
import messageModel from "@/lib/db/models/messageModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { Types } from "mongoose";
import studentModel from "@/lib/db/models/studentModel";
import instructorModel from "@/lib/db/models/instructorModel";
import MessageInput from "@/components/Student/student-messages/MessageInput";
import MessageProfile from "@/components/Student/student-messages/MessageProfile";

interface Props {
  searchParams?: Promise<{ id: string }>;
  params?: Promise<{ id: string }>;
  receiverId: Types.ObjectId;
}

interface LeanProp {
  _id: Types.ObjectId;
}

const ChatMessages = async (props: Props) => {
  const searchParams = await props.searchParams;
  const params = await props.params;

  const receiverId = props.receiverId || searchParams?.id || params?.id;

  await connectDB();

  // USER : SENDER
  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;
  if (!userId) {
    return <span>Invalid user id</span>;
  }

  let userRole: "STUDENT" | "INSTRUCTOR" | null = null;
  const student = await studentModel.findOne({ user: userId }).lean<LeanProp>();
  if (student) userRole = "STUDENT";

  const instructor = await instructorModel
    .findOne({ user: userId })
    .lean<LeanProp>();
  if (instructor) userRole = "INSTRUCTOR";

  let receiverInfo = null;
  let studentId = null;
  let instructorId = null;

  const receiverStudent = await studentModel.findById(receiverId).lean();
  if (receiverStudent) {
    receiverInfo = { ...receiverStudent, role: "STUDENT" };
  } else {
    const receiverInstructor = await instructorModel
      .findById(receiverId)
      .lean();
    if (receiverInstructor) {
      receiverInfo = { ...receiverInstructor, role: "INSTRUCTOR" };
    }
  }
  if (!receiverInfo) {
    return <span>Receiver not found</span>;
  }

  if (userRole === "STUDENT") {
    studentId = student?._id;
    instructorId = receiverId;
  } else if (userRole === "INSTRUCTOR") {
    instructorId = instructor?._id;
    studentId = receiverId;
  }

  const messages = await messageModel
    .find({ student: studentId, instructor: instructorId })
    .sort({ createdAt: -1 })
    .lean();

  const profileProps = {
    avatar: receiverInfo.avatar,
    firstname: receiverInfo.firstname,
    lastname: receiverInfo.lastname,
  };

  return (
    <div className="bg-base-100 relative flex flex-col flex-1 p-4">
      {/* Header */}
      <MessageProfile {...profileProps} />

      {/* Messages */}
      <div className=" flex flex-col-reverse overflow-y-auto h-[600px] p-4 space-y-4 space-y-reverse">
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

      {/* Input */}
      <MessageInput receiverId={receiverId} />
    </div>
  );
};

export default ChatMessages;
