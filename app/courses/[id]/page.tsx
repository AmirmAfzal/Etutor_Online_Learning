import { notFound } from "next/navigation";

import SingleCourseHeader from "@/components/Courses/SingleCourseHeader";
import CourseTabs from "@/components/Courses/CourseTabs";
import RelatedCoursesSection from "@/components/Courses/RelatedCoursesSection";
import SidebarCart from "@/components/Courses/SidebarCart";
import CourseTrailer from "@/components/Courses/CourseHero";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";

type CurriculumContentItem = {
  title: string;
  info: string;
  type: "video" | "file";
};

type CurriculumSection = {
  title: string;
  lectures: number;
  duration: string;
  content: CurriculumContentItem[];
};

type Course = {
  _id?: string;
  id?: string;
  thumbnail: string;
  name: string;
  title?: string;
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
  createdBy?: string;
  curriculum?: CurriculumSection[];
};

type Instructor = {
  name: string;
  bio: string;
  avatar: string;
  rating: number;
  students: number;
  courses: number;
  description: string;
};

type InstructorDocument = {
  firstname?: string;
  lastname?: string;
  bio?: string;
  avatar?: string;
  rating?: number;
  students?: number;
  name?: string;
};

type CourseAuthor = {
  name?: string;
};

type FoundCourseDocument = {
  _id?: { toString: () => string } | string;
  thumbnail?: string;
  title?: string;
  description?: string;
  category?: { name?: string } | null;
  price?: number;
  studentsCount?: number;
  authors?: (CourseAuthor & InstructorDocument)[];
  originalPrice?: number;
  discount?: string;
  timeLeft?: string;
};

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
    name: course.title || "Untitled Course",
    title: course.title || "Untitled Course",
    description: course.description || "No description available",
    category: course.category?.name || "Unknown",
    price: course.price || 0,
    students: course.studentsCount || 0,
    createdBy:
      authors.map((author) => author.name || "Unknown").join(", ") || "Unknown",
    rating: 5,
    originalPrice: course.originalPrice || 0,
    discount: course.discount || "0%",
    timeLeft: course.timeLeft || "0 days left at this price!",
    reviews: 244455,
    courseDetails: [
      { label: "Course Duration", value: "6 Month" },
      { label: "Course Level", value: "Beginner" },
      { label: "Students Enrolled", value: "69,419,618" },
      { label: "Language", value: "Mandarin" },
      { label: "Subtitle Language", value: "English" },
    ],
    breadcrumb: ["Home", "Development", "Web Development", "Webflow"],
    instructors: [
      { name: "Dianne Russell", avatar: "/images/profile-img.png" },
      { name: "Kristin Watson", avatar: "/images/profile-img.png" },
    ],
    courseDescription:
      "This course provides a comprehensive guide to designing and developing responsive websites. Learn the secrets of good design and how to turn your ideas into reality using Figma and Webflow.",
    whatYouWillLearn: [
      "How to design a complete website in Figma",
      "How to create a responsive website in Webflow",
      "How to export assets from Figma to Webflow",
      "How to use Webflow CMS for dynamic content",
      "How to publish and host your website on Webflow",
    ],
    thisCourseFor: [
      "Anyone who wants to learn Web Design",
      "Anyone who wants to learn Figma",
      "Anyone who wants to learn Webflow",
      "Anyone who wants to create responsive websites",
    ],
    courseRequirements: [
      "Basic computer skills",
      "A computer with internet access",
      "Willingness to learn and practice",
      "No prior design or coding experience required",
    ],
  };
};

// Fake data that would come from a database

const fakeCourses = {
  curriculum: [
    {
      title: "Getting Started",
      lectures: 4,
      duration: "51m",
      content: [
        {
          title: "What's is Webflow?",
          info: "07:31",
          type: "video",
        },
        {
          title: "Sign up in Webflow",
          info: "07:31",
          type: "video",
        },
        {
          title: "Webflow Terms & Conditions",
          info: "5.3 MB",
          type: "file",
        },
        { title: "Teaser of Webflow", info: "07:31", type: "video" },
        { title: "Practice Project", info: "5.3 MB", type: "file" },
      ],
    },
    {
      title: "Secret of Good Design",
      lectures: 52,
      duration: "5h 49m",
      content: [],
    },
    {
      title: "Practice Design Like an Artist",
      lectures: 43,
      duration: "53m",
      content: [],
    },
    {
      title: "Web Development (webflow)",
      lectures: 137,
      duration: "10h 6m",
      content: [],
    },
    {
      title: "Secrets of Making Money Freelancing",
      lectures: 21,
      duration: "38m",
      content: [],
    },
    {
      title: "Advanced",
      lectures: 39,
      duration: "91m",
      content: [],
    },
  ],
};

const studentsComments = [
  {
    name: "Alice Johnson",
    avatar: "/images/profile-img.png",
    star: 4,
    time: "2 days ago",
    comment:
      "This course was amazing! I learned so much about web design and Figma.",
  },
  {
    name: "Bob Smith",
    avatar: "/images/profile-img.png",
    star: 5,
    time: "1 week ago",
    comment:
      "The instructors were very knowledgeable and the content was well-organized.",
  },
  {
    name: "Charlie Brown",
    avatar: "/images/profile-img.png",
    star: 3,
    time: "3 days ago",
    comment: "Good course but could use more examples.",
  },
];

const relatedCourses = [
  {
    thumbnail: "/images/course-1.jpg",
    name: "Web Design Masterclass",
    category: "Web Design",
    price: 49.99,
    students: 1200,
    rating: 4.5,
  },
  {
    thumbnail: "/images/course-2.jpg",
    name: "Figma for Beginners",
    category: "Design",
    price: 39.99,
    students: 800,
    rating: 4.7,
  },
  {
    thumbnail: "/images/course-3.jpg",
    name: "Advanced Webflow Techniques",
    category: "Development",
    price: 59.99,
    students: 500,
    rating: 4.8,
  },
];

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

const SingleCoursePage = async ({ params }: { params: { id: string } }) => {
  await connectDB();
  const { id } = params;

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
            description={singleCourse.description}
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
              curriculum={fakeCourses.curriculum}
              instructors={instructorData}
              rating={singleCourse.rating}
              studentsComments={studentsComments}
            />
          </div>
        </div>

        <SidebarCart
          fakeSidebarCart={fakeSidebarCart}
          courseId={singleCourse.id || id}
          singleCourse={singleCourse}
        />
      </div>

      <RelatedCoursesSection courses={relatedCourses} />
    </section>
  );
};

export default SingleCoursePage;
