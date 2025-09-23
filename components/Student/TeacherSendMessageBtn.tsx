"use client";

import { useRouter } from "next/navigation";
import { ObjectId } from "mongoose";

interface Props {
  id: ObjectId;
}

const TeacherSendMessageBtn = ({ id }: Props) => {
  const router = useRouter();

  const handleClicker = () => {
    router.push(`student/messages/${id}`);
  };

  return (
    <button
      onClick={handleClicker}
      className="btn btn-soft btn-primary w-full text-sm"
    >
      Send Message
    </button>
  );
};

export default TeacherSendMessageBtn;
