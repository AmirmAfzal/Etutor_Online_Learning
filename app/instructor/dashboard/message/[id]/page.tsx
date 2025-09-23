import ChatMessages from "@/components/Student/student-messages/ChatMessages";
import MessageInput from "@/components/Student/student-messages/MessageInput";

interface Props {
  params: Promise<{ id: string }>;
}

const StudentMessagePage = async ({ params }: Props) => {
  const resolvedParams = await params;
  const studentId = resolvedParams.id;

  return (
    <div className="bg-base-200 border-base-300 flex h-screen w-full flex-col">
      <div className="bg-base-100 flex-1 overflow-y-auto">
        <ChatMessages receiverId={studentId} isStudentPage={true} />
      </div>
      <MessageInput receiverId={studentId} />
    </div>
  );
};

export default StudentMessagePage;