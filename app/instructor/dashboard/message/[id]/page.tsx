import ChatMessages from "@/components/Student/student-messages/ChatMessages";
import MessageInput from "@/components/Student/student-messages/MessageInput";
import { Types } from "mongoose";
import ContactList from "@/components/Student/student-messages/ContactList";

interface Props {
  params: Promise<{ id: Types.ObjectId & string}>;
}

const MessagesById = async (props: Props) => {
  const params = await props.params;
  const receiverId = params.id;

  return (
    <div className="bg-base-200 border-base-300 flex p-4 w-full flex-col">
      <div className="bg-base-100 gap-4 flex overflow-y-auto">
        <ContactList role="student" />
        <ChatMessages receiverId={receiverId} />
      </div>
      {/*<MessageInput receiverId={receiverId} />*/}
    </div>
  );
};

export default MessagesById;
