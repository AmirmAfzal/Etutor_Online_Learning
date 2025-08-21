import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Curriculum from "@/components/Courses/Curriculum";
import CourseInstructors from "@/components/Courses/CourseInstructors";
import Comments from "@/components/Courses/Comments";
import CourseRating from "@/components/Courses/CourseRating";
import CourseOverview from "@/components/Courses/CourseOverview";

type CurriculumItem = {
  title: string;
  info: string;
  type: "video" | "file" | string;
};

type CurriculumSection = {
  title: string;
  lectures: number;
  duration: string;
  content: CurriculumItem[];
};

type InstructorForCourse = {
  avatar: string;
  name: string;
  bio: string;
  rating: number;
  students: number;
  courses: number;
  description: string;
};

type StudentComment = {
  name: string;
  avatar: string;
  time: string;
  star: number;
  comment: string;
};

type CourseTabsProps = {
  overview: {
    courseDescription?: string;
    whatYouWillLearn?: string[];
    thisCourseFor?: string[];
    courseRequirements?: string[];
  };
  curriculum: CurriculumSection[];
  instructors: InstructorForCourse[];
  rating: number;
  studentsComments: StudentComment[];
};

const CourseTabs = ({
  overview,
  curriculum,
  instructors,
  rating,
  studentsComments,
}: CourseTabsProps) => {
  const tabTriggerClass =
    "!text-base-content/70 data-[state=active]:!bg-base-100 !border-primary !rounded-none border-0 p-6 text-lg font-semibold data-[state=active]:!border-b-2 data-[state=active]:!shadow-none";

  return (
    <Tabs defaultValue="overview" className="mt-8 w-full">
      <TabsList className="!bg-base-100 flex gap-6">
        <TabsTrigger value="overview" className={tabTriggerClass}>
          Overview
        </TabsTrigger>
        <TabsTrigger value="curriculum" className={tabTriggerClass}>
          Curriculum
        </TabsTrigger>
        <TabsTrigger value="instructors" className={tabTriggerClass}>
          Instructors
        </TabsTrigger>
        <TabsTrigger value="review" className={tabTriggerClass}>
          Review
        </TabsTrigger>
      </TabsList>
      <TabsContent value="overview">
        <CourseOverview
          courseDescription={overview.courseDescription}
          whatYouWillLearn={overview.whatYouWillLearn}
          thisCourseFor={overview.thisCourseFor}
          courseRequirements={overview.courseRequirements}
        />
        <Curriculum curriculum={curriculum} />
        <CourseInstructors instructors={instructors} />
        <CourseRating rating={rating} />
        <Comments studentsComments={studentsComments} />
      </TabsContent>
      <TabsContent value="curriculum">
        <Curriculum curriculum={curriculum} />
      </TabsContent>
      <TabsContent value="instructors">
        <CourseInstructors instructors={instructors} />
      </TabsContent>
      <TabsContent value="review">
        <CourseRating rating={rating} />
        <Comments studentsComments={studentsComments} />
      </TabsContent>
    </Tabs>
  );
};

export default CourseTabs;
