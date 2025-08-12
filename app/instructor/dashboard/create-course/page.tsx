import CreateCourseTabs from "@/components/instructor-dashboard/create-course/CreateCourseTabs";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
interface Props {
  searchParams: Promise<{ _id: string , tab: string }>;
}

const CreateNewCoursePage = async ({ searchParams }: Props) => {
  await connectDB();
  const { _id , tab } = await searchParams;
  const foundCourse = await courseModel.findOne({ _id }).populate("category").lean().exec()
  const plainCourse = JSON.parse(JSON.stringify(foundCourse));
  return <CreateCourseTabs course={plainCourse} tab={tab} />;
};

export default CreateNewCoursePage;
