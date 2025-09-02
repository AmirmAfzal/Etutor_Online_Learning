import CourseLevelClient from "./CourseLevelClient";

interface Props {
  courseLevel: string[];
  searchParams: Promise<{ level?: string }>;
}

const CourseLevel = async (props: Props) => {
  const searchParams = await props.searchParams;

  return (
    <CourseLevelClient
      courseLevel={props.courseLevel}
      searchParams={searchParams}
    />
  );
};

export default CourseLevel;
