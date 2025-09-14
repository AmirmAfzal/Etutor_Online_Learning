import { notFound } from "next/navigation";

import SingleCourseHeader from "@/components/Courses/SingleCourseHeader";
import CourseTabs from "@/components/Courses/CourseTabs";
import RelatedCoursesSection from "@/components/Courses/RelatedCoursesSection";
import SidebarCart from "@/components/Courses/SidebarCart";
import CourseTrailer from "@/components/Courses/CourseHero";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";

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
  duration?: string;
  studentsCount?: number;
  authors?: InstructorDocument[];
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
    avatar:
      instructor.avatar || "/images/student-dashboard/Teacher-default.jpg",
    rating: instructor.rating || 5,
    students: instructor.students || 0,
    courses: 12,
    description:
      "John is a seasoned web designer with over 10 years of experience in creating stunning websites. He specializes in Figma and Webflow, helping students turn their design ideas into reality.",
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
    createdBy: authors
      .map((author: InstructorDocument) =>
        `${author?.firstname || ""} ${author?.lastname || ""}`.trim()
      )
      .join(", "),
    rating: 5,
    originalPrice: course.originalPrice || 0,
    discount: course.discount || "0%",
    timeLeft: course.timeLeft || "0 days left at this price!",
    reviews: 244455,
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
        author.avatar =
          author?.avatar || "/images/student-dashboard/Teacher-default.jpg";
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




const fakeSidebarCart = {
  includes: [
    "Lifetime access",
    "30-days money-back guarantee",
    "Free exercises file & downloadable resources",
    "Shareable certificate of completion",
    "Access on mobile, tablet and TV",
    "English subtitles",
    "100% online course",
  ],
};

const SingleCoursePage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
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
    <section className="container mx-auto px-4 py-8 md:px-8 lg:px-16">
      <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-3">
        <div className="md:col-span-2">
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
            <CourseTrailer />
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

            />
          </div>
        </div>

        <SidebarCart
          fakeSidebarCart={fakeSidebarCart}
          courseId={singleCourse.id || id}
          singleCourse={singleCourse}
        />
      </div>

      <RelatedCoursesSection />
    </section>
  );
};

export default SingleCoursePage;
