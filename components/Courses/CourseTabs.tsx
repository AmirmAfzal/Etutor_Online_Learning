import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Curriculum from "@/components/Courses/Curriculum";
import CourseInstructors from "@/components/Courses/CourseInstructors";
import Comments from "@/components/Courses/Comments";
import CourseRating from "@/components/Courses/CourseRating";
import CourseOverview from "@/components/Courses/CourseOverview";

type CourseTabsProps = {
  overview: {
    courseDescription?: string;
    whatYouWillLearn?: string[];
    thisCourseFor?: string[];
    courseRequirements?: string[];
  };
  curriculum: any;
  instructors: any[];
  rating: number;
  studentsComments: any[];
};

const CourseTabs = ({
  overview,
  curriculum,
  instructors,
  rating,
  studentsComments,
}: CourseTabsProps) => {
  return (
    <Tabs defaultValue="description" className="mt-8 w-full">
      <TabsList className="!bg-base-100 data- flex gap-6">
        <TabsTrigger
          value="overview"
          className="!text-base-content/70 data-[state=active]:!bg-base-100 !border-primary !rounded-none border-0 p-6 text-lg font-semibold data-[state=active]:!border-b-2 data-[state=active]:!shadow-none"
        >
          Overview
        </TabsTrigger>
        <TabsTrigger
          value="curriculum"
          className="!text-base-content/70 data-[state=active]:!bg-base-100 !border-primary !rounded-none border-0 p-6 text-lg font-semibold data-[state=active]:!border-b-2 data-[state=active]:!shadow-none"
        >
          Curriculum
        </TabsTrigger>
        <TabsTrigger
          value="instructors"
          className="!text-base-content/70 data-[state=active]:!bg-base-100 !border-primary !rounded-none border-0 p-6 text-lg font-semibold data-[state=active]:!border-b-2 data-[state=active]:!shadow-none"
        >
          Instructors
        </TabsTrigger>
        <TabsTrigger
          value="review"
          className="!text-base-content/70 data-[state=active]:!bg-base-100 !border-primary !rounded-none border-0 p-6 text-lg font-semibold data-[state=active]:!border-b-2 data-[state=active]:!shadow-none"
        >
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
        {/* TODO : what do we have here? */}
      </TabsContent>
    </Tabs>
  );
};

export default CourseTabs;
