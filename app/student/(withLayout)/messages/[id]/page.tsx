import ChatMessages from "@/components/Student/student-messages/ChatMessages";
import MessageInput from "@/components/Student/student-messages/MessageInput";
import { Types } from "mongoose";

interface Props {
  params: Promise<{ id: Types.ObjectId & string}>;
}

const MessagesById = async (props: Props) => {
  const params = await props.params;
  const receiverId = params.id;

  return (
    <div className="bg-base-200 border-base-300 flex h-screen w-full flex-col">
      <div className="bg-base-100 flex-1 overflow-y-auto">
        <ChatMessages receiverId={receiverId} />
      </div>
      <MessageInput receiverId={receiverId} />
    </div>
  );
};

export default MessagesById;
