import ChatMessages from "@/components/Student/student-messages/ChatMessages";
import ContactList from "@/components/Student/student-messages/ContactList";
import MessageInput from "@/components/Student/student-messages/MessageInput";
import { Types } from "mongoose";

interface Props {
  searchParams?: Promise<{ id: Types.ObjectId & string }>;
}

const MessagePage = async (props: Props) => {
  const searchParams = await props.searchParams;
  const receiverId = searchParams?.id;

  return (
    <div className="border-base-300 bg-base-200 flex h-screen w-full gap-6 border p-6">
      <div className="border-base-300 bg-base-100 flex w-full flex-col border-r md:w-1/3">
        <ContactList role="instructor" />
      </div>

      {receiverId ? (
        <div className="bg-base-100 flex w-2/3 flex-col">
          <div className="flex-1 overflow-y-auto">
            <ChatMessages receiverId={receiverId} />
          </div>
          <MessageInput receiverId={receiverId} />
        </div>
      ) : (
        <div className="bg-base-100 text-base-content/70 hidden w-2/3 items-center justify-center md:flex">
          <p>Please select a student from the list to start a conversation.</p>
        </div>
      )}
    </div>
  );
};

export default MessagePage;
