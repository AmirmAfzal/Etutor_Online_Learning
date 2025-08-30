"use client";

import { deleteCourse } from "@/lib/actions/instructor/my-courses/deleteCourse";

interface Props {
  courseId: string;
}

const DeleteButton = ({ courseId }: Props) => {
  const deleteHandler = async (id: string) => {
    await deleteCourse(id);
  };

  return (
    <div>
      <button
        className="cursor-pointer"
        onClick={() => deleteHandler(courseId)}
      >
        Delete Course
      </button>
    </div>
  );
};

export default DeleteButton;
