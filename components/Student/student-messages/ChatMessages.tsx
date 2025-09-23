"use server";
import { connectDB } from "@/lib/db/db";
import messageModel from "@/lib/db/models/messageModel";

// interface Message {
//   _id: string;
//   sender: string;
//   message: string;
//   timestamp: string;
// }

const ChatMessages = async () => {
  await connectDB();

  const foundMessages = await messageModel.find().lean();

  return (
    <div className="bg-base-100 flex-1 overflow-y-auto p-4">
      <div className="flex h-full flex-col justify-end space-y-4">
        {foundMessages.map((message) => (
          <div
            key={message?._id}
            className={`flex flex-col ${
              message.sender === "STUDENT" ? "items-end" : "items-start"
            }`}
          >
            {/*FIXME : add instructor profile*/}
            <p className="mb-1 text-xs opacity-70">
              {new Date(message.createdAt).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </p>
            <div
              className={`max-w-xs rounded-none p-2.5 ${
                message.sender === "STUDENT"
                  ? "bg-primary text-primary-content"
                  : message.sender === "INSTRUCTOR"
                    ? "bg-primary/20 text-base-content/70"
                    : "hidden"
              }`}
            >
              <p className="text-xs font-medium md:text-sm">
                {message.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChatMessages;
