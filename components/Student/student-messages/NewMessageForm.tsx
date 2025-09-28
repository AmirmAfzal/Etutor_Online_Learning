import { connectDB } from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import studentModel from "@/lib/db/models/studentModel";
import courseModel from "@/lib/db/models/courseModel";
import instructorModel from "@/lib/db/models/instructorModel";
import NewMessageClient from "@/components/Student/student-messages/NewMessageClient";
import { Types } from "mongoose";

interface Instructor {
  _id: string | undefined;
  firstname: string;
  lastname: string;
}
interface StudentLean {
  _id: Types.ObjectId;
  courses: Types.ObjectId[];
}

const NewMessageForm = async () => {
  await connectDB();

  const session = await getServerSession(authOptions);
  const userId = session?.user?.id;

  const foundStudent = await studentModel
    .findOne({ user: userId })
    .lean<StudentLean>();
  const foundCourse = await courseModel.find({ _id: foundStudent?.courses });
  const authors = foundCourse?.flatMap((course) => course.authors);
  const foundInstructors = await instructorModel.find({ _id: authors }).lean();

  const instructors: Instructor[] = foundInstructors.map((inst) => ({
    _id: inst?._id?.toString(),
    firstname: inst.firstname,
    lastname: inst.lastname,
  }));

  return <NewMessageClient instructors={instructors} />;
};

export default NewMessageForm;
