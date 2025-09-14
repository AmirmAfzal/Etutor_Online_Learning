import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Curriculum from "@/components/Courses/Curriculum";
import CourseInstructors from "@/components/Courses/CourseInstructors";
import Comments from "@/components/Courses/Comments";
import CourseRating from "@/components/Courses/CourseRating";
import CourseOverview from "@/components/Courses/CourseOverview";


interface InstructorForCourse  {
  avatar: string;
  name: string;
  bio: string;
  rating: number;
  students: number;
  courses: number;
  description: string;
};


interface CourseTabsProps  {
  overview: {
    courseDescription?: string;
    whatYouWillLearn?: string[];
    thisCourseFor?: string[];
    courseRequirements?: string[];
  };
  courseId: string;
  instructors: InstructorForCourse[];
  rating: number;

};

const CourseTabs = ({
  overview,
  courseId ,
  instructors,
  rating,

}: CourseTabsProps) => {
  const tabTriggerClass =
    "!text-base-content/70 data-[state=active]:!bg-base-100 py-3 !border-primary !rounded-none border-0  px-4 sm:px-6 text-lg font-semibold data-[state=active]:!border-b-2 data-[state=active]:!shadow-none";

  return (
    <Tabs defaultValue="overview" className="mt-8 w-full">
      <TabsList className="!bg-base-100 mt-4 flex h-12 w-full flex-row items-start justify-start gap-6 overflow-x-scroll overflow-y-hidden">
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
        <Curriculum courseId={courseId} />
        <CourseInstructors instructors={instructors} />
        <CourseRating rating={rating} />
        <Comments  />
      </TabsContent>
      <TabsContent value="curriculum">
        <Curriculum courseId={courseId} />
      </TabsContent>
      <TabsContent value="instructors">
        <CourseInstructors instructors={instructors} />
      </TabsContent>
      <TabsContent value="review">
        <CourseRating rating={rating} />
        <Comments />
      </TabsContent>
    </Tabs>
  );
};

export default CourseTabs;
