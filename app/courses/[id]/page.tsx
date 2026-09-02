import { notFound } from "next/navigation";

import SingleCourseHeader from "@/components/Courses/SingleCourseHeader";
import CourseTabs from "@/components/Courses/CourseTabs";
import RelatedCoursesSection from "@/components/Courses/RelatedCoursesSection";
import SidebarCart from "@/components/Courses/SidebarCart";
import CourseTrailer from "@/components/Courses/CourseTrailer";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";

export const dynamic = "force-dynamic";
interface CurriculumContentItem {
  title: string;
  info: string;
  type: "video" | "file";
}

interface CurriculumSection {
  title: string;
  lectures: number;
  duration: string;
  content: CurriculumContentItem[];
}

interface Course {
  _id?: string;
  id?: string;
  thumbnail: string;
  title: string;
  subtitle: string;
  description?: string;
  category: string;
  price: number;
  rating: number;
  students: number;
  trailer: string;
  reviews?: number;
  breadcrumb?: string[];
  originalPrice: number;
  discount: string;
  timeLeft: string;
  courseDetails: { label: string; value: string }[];
  instructors?: { name: string; avatar: string }[];
  courseDescription?: string;
  whatYouWillLearn?: string[];
  thisCourseFor?: string[];
  courseRequirements?: string[];
  createdBy: string | undefined;
  curriculum?: CurriculumSection[];
}

interface Instructor {
  name: string;
  bio: string;
  avatar: string;
  rating: number;
  students: number;
  courses: number;
  description: string;
}

interface InstructorDocument {
  firstname?: string;
  lastname?: string;
  bio?: string;
  avatar?: string;
  rating?: number;
  students?: number;
  courses?: number;
  name?: string;
}

interface FoundCourseDocument {
  _id?: { toString: () => string } | string;
  thumbnail?: string;
  title?: string;
  subtitle?: string;
  description?: string;
  level?: string;
  language?: string;
  subtitleLanguage?: string;
  category?: { name?: string } | null;
  price?: number;
  trailer: string;
  duration?: string;
  studentsCount?: number;
  authors?: InstructorDocument[];
  rating?: number;
  reviews?: number;
  originalPrice?: number;
  discount?: string;
  timeLeft?: string;
  requirements?: string[];
  targetAudience?: string[];
  learningOutcomes?: string[];
}

const buildInstructorData = (
  authors: InstructorDocument[] | undefined
): Instructor[] => {
  if (!authors || authors.length === 0) return [];
  return authors.map((instructor) => ({
    name: `${instructor.firstname || "Unknown"} ${instructor.lastname || ""}`.trim(),
    bio: instructor.bio || "Instructor",
    avatar: instructor.avatar || "",
    rating: instructor.rating || 0,
    students: instructor.students || 0,
    courses: instructor.courses || 0,
    description:
      instructor.bio ||
      "This instructor shares their expertise and experience to help you reach your learning goals.",
  }));
};

const buildCourse = (course: FoundCourseDocument, id: string): Course => {
  const authors = course.authors || [];
  return {
    id:
      (typeof course._id === "string" ? course._id : course._id?.toString()) ||
      id,
    thumbnail: course.thumbnail || "/images/course-images-1.png",
    title: course.title || "Untitled Course",
    subtitle: course.subtitle || "No description available",
    category: course.category?.name || "Unknown",
    price: course.price || 0,
    students: course.studentsCount || 0,
    trailer: course.trailer,
    createdBy: authors
      .map((author: InstructorDocument) =>
        `${author?.firstname || ""} ${author?.lastname || ""}`.trim()
      )
      .join(", "),
    rating: course.rating || 0,
    originalPrice: course.originalPrice || 0,
    discount: course.discount || "0%",
    timeLeft: course.timeLeft || "0 days left at this price!",
    reviews: course.reviews || 0,
    courseDetails: [
      {
        label: "Course Duration",
        value: ` ${course?.duration} hours` || "Unknown",
      },
      { label: "Course Level", value: `${course.level}` },
      { label: "Students Enrolled", value: `${course.studentsCount}` },
      { label: "Language", value: `${course.language}` },
      { label: "Subtitle Language", value: `${course.subtitleLanguage}` },
    ],
    // breadcrumb: ["Home", "Development", "Web Development", "Webflow"],
    instructors:
      course.authors?.map((author: InstructorDocument) => {
        author.name =
          `${author?.firstname || ""} ${author?.lastname || ""}`.trim();
        author.avatar = author?.avatar || "";
        return {
          name: author.name,
          avatar: author.avatar,
        };
      }) || [],
    courseDescription: course.description || "",
    whatYouWillLearn: course.learningOutcomes || [],
    thisCourseFor: course.targetAudience || [],
    courseRequirements: course.requirements || [],
  };
};

const courseIncludes = [
  "Lifetime access",
  "30-days money-back guarantee",
  "Free exercises file & downloadable resources",
  "Shareable certificate of completion",
  "Access on mobile, tablet and TV",
  "English subtitles",
  "100% online course",
];

const SingleCoursePage = async ({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ sort: string }>;
}) => {
  await connectDB();
  const { id } = await params;

  if (!id) {
    notFound();
  }

  const foundCourse = await courseModel
    .findOne({
      _id: id,
    })
    .populate("category")
    .populate("authors")
    .lean();

  if (!foundCourse) {
    notFound();
  }

  const instructorData: Instructor[] = buildInstructorData(
    (foundCourse as unknown as FoundCourseDocument).authors
  );

  const singleCourse = buildCourse(
    foundCourse as unknown as FoundCourseDocument,
    id
  );

  return (
    <section className="relative mx-auto px-4 py-8 md:px-8 lg:px-16">
      <div className="bg-base-200 absolute top-0 left-0 z-0 h-[30vh] w-screen"></div>
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-3">
        <div className="z-10 md:col-span-2">
          <SingleCourseHeader
            title={singleCourse.title}
            description={singleCourse.subtitle}
            breadcrumb={singleCourse.breadcrumb}
            instructors={singleCourse.instructors}
            createdBy={singleCourse.createdBy}
            rating={singleCourse.rating}
            reviews={singleCourse.reviews}
          />
          <div className="bg-base-100 flex w-full flex-col items-center justify-center">
            <CourseTrailer videoSrc={singleCourse?.trailer} />
            <CourseTabs
              overview={{
                courseDescription: singleCourse.courseDescription,
                whatYouWillLearn: singleCourse.whatYouWillLearn,
                thisCourseFor: singleCourse.thisCourseFor,
                courseRequirements: singleCourse.courseRequirements,
              }}
              courseId={singleCourse.id || id}
              instructors={instructorData}
              rating={singleCourse.rating}
              searchParams={searchParams}
            />
          </div>
        </div>

        <SidebarCart
          courseIncludes={courseIncludes}
          courseId={singleCourse.id || id}
          singleCourse={singleCourse}
        />
      </div>

      <RelatedCoursesSection />
    </section>
  );
};

export default SingleCoursePage;
