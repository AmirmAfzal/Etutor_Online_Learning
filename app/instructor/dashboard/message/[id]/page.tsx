import ChatMessages from "@/components/Student/student-messages/ChatMessages";
import ContactList from "@/components/Student/student-messages/ContactList";
import { Types } from "mongoose";
import { redirect } from "next/navigation";
import { connectDB } from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";

interface Props {
  params: Promise<{ id: Types.ObjectId & string }>;
}

const MessagesById = async (props: Props) => {
  const params = await props.params;
  const receiverId = params.id;

  await connectDB();
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect("/auth/signin");
  }

  return (
    <div className="border-base-300 bg-base-200 flex h-screen w-full gap-6 border p-6">
      {/* Contact List */}
      <div
        className={`border-base-300 bg-base-100 flex flex-col border-r ${receiverId ? "hidden md:flex md:w-1/3" : "flex w-full md:w-1/3"}`}
      >
        <ContactList userRole="instructor" />
      </div>

      {/* Chat Section */}
      {receiverId ? (
        <div
          className={`bg-base-100 flex flex-col ${receiverId ? "flex w-full md:w-2/3" : "hidden md:flex md:w-2/3"}`}
        >
          <div className="flex-1 overflow-y-auto">
            <ChatMessages receiverId={receiverId} />
          </div>
          {/*<MessageInput receiverId={receiverId} />*/}
        </div>
      ) : (
        <div className="bg-base-100 text-base-content/70 hidden items-center justify-center md:flex md:w-2/3">
          <p>Please select a student from the list to start a conversation.</p>
        </div>
      )}
    </div>
  );
};

export default MessagesById;
