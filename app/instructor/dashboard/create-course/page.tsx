import CreateCourseTabs from "@/components/instructor-dashboard/create-course/CreateCourseTabs";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { redirect } from "next/navigation";

export const dynamic = "force-dynamic";
interface Props {
  searchParams: Promise<{ _id: string; tab: string }>;
}

const CreateNewCoursePage = async ({ searchParams }: Props) => {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    redirect("/auth/signin");
  }

  const { _id, tab } = await searchParams;
  const foundCourse = await courseModel
    .findOne({ _id })
    .populate("category")
    .populate("subCategory")
    .lean()
    .exec();
  const plainCourse = JSON.parse(JSON.stringify(foundCourse));
  return <CreateCourseTabs course={plainCourse} tab={tab} />;
};

export default CreateNewCoursePage;
