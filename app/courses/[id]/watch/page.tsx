import WatchCurriculum from "@/components/Courses/watchCourses/WatchCurriculum";
import WatchHeader from "@/components/Courses/watchCourses/WatchHeader";
import WatchPlayer from "@/components/Courses/watchCourses/WatchPlayer";
import WatchDetails from "@/components/Courses/watchCourses/WatchDetails";
import WatchTabs from "@/components/Courses/watchCourses/WatchTabs";
import { connectDB } from "@/lib/db/db";
import { Types } from "mongoose";
import sectionModel from "@/lib/db/models/sectionModel";

type CurriculumItem = {
  title: string;
  lectures: number;
  duration: string;
  content: {
    title: string;
    info: string;
    type: string;
  }[];
};

type Comment = {
  name: string;
  avatar: string;
  time: string;
  star: number;
  comment: string;
  ADMIN: boolean;
  replies?: Comment[];
};

const curriculum: CurriculumItem[] = [
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
      { title: "Teaser of Webflow", info: "07:31", type: "video" },
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
];

const courseData = {
  section: 2,
  sectionTitle: "Sign up in WebFlow",
  students: 122,
};

const comments: Comment[] = [
  {
    name: "Theresa Webb",
    avatar: "/images/instructors/instructor-1.png",
    time: "3 weeks ago",
    star: 5,
    comment:
      "Now I know that I will spent that 5 minutes of my life with pure pleasure and joy. I am so happy that I found this course. It is really amazing and I will recommend it to all my friends.",
    ADMIN: false,
    replies: [
      {
        name: "John Doe",
        avatar: "/images/instructors/instructor-3.png",
        time: "2 weeks ago",
        star: 4,
        comment: "Totally agree with you!",
        ADMIN: false,
      },
      {
        name: "Admin",
        avatar: "/images/instructors/instructor-3.png",
        time: "1 week ago",
        star: 5,
        comment: "Thanks for your feedback!",
        ADMIN: true,
      },
    ],
  },
  {
    name: "Jane Smith",
    avatar: "/images/instructors/instructor-3.png",
    time: "1 week ago",
    star: 4,
    comment: "I enjoyed it too!",
    ADMIN: false,
  },
];

const convertMinutesToHoursAndMinutes = (totalMinutes: number) => {
  if (typeof totalMinutes !== "number" || totalMinutes < 0) {
    return "Invalid input";
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  let output = "";

  if (hours > 0) {
    output += `${hours}h`;
  }
  if (minutes > 0) {
    if (output !== "") {
      output += ", ";
    }
    output += `${minutes}min`;
  }
  if (output === "") {
    return "0min";
  }
  return output;
};

interface LectureType {
  _id: Types.ObjectId;
  title: string;
  description: string;
  videoUrl: string;
  duration: number;
}
interface SectionType {
  _id: Types.ObjectId;
  title: string;
  lectures: LectureType[];
}
interface CourseType {
  title: string;
  duration: number;
  sections: Types.ObjectId[];
}

const WatchCourse = async ({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: Promise<{ lectureId?: string }>;
}) => {
  await connectDB();
  const { id } = params;

  if (!Types.ObjectId.isValid(id)) {
    return <div>Invalid Course ID</div>;
  }

  const foundSections = await sectionModel
    .find({ course: id })
    .populate("lectures")
    .populate("course")
    .lean<SectionType[]>();

  if (!foundSections || foundSections.length === 0) {
    return <div>Course not found or has no sections.</div>;
  }

  const course: CourseType = foundSections[0]?.course as CourseType;
  const lectures: LectureType[] = foundSections.flatMap(
    (section) => section.lectures
  );

  const { lectureId } = await searchParams;
  const currentLecture = lectureId
    ? lectures.find((lecture) => lecture._id.toString() === lectureId)
    : lectures[0];

  if (!currentLecture) {
    return <div>Lecture not found. Please select a valid lecture.</div>;
  }

  const currentSection = foundSections.find((section) =>
    section.lectures.some(
      (l) => l._id.toString() === currentLecture._id.toString()
    )
  );

  return (
    <section className="container mx-auto w-full px-4 py-6">
      <WatchHeader
        title={course?.title ?? "The course does not have a title"}
        sectionsCount={foundSections.length}
        lecturesCount={lectures.length}
        totalDuration={convertMinutesToHoursAndMinutes(course?.duration ?? 0)}
      />

      <div className="mt-6 flex w-full flex-col items-start gap-4 lg:flex-row lg:gap-6">
        <WatchPlayer />
        <div className="w-full lg:w-5/12">
          <WatchCurriculum curriculum={curriculum} />
        </div>
      </div>

      <WatchDetails
        sectionNumber={
          currentSection
            ? foundSections.findIndex((s) => s._id === currentSection._id) + 1
            : 0
        }
        sectionTitle={currentLecture.title}
        currentLecture={currentLecture}
        watchingStudents={courseData.students}
        commentsCount={comments.length}
      />

      <div className="lg:w-2/3">
        <WatchTabs
          lecture={currentLecture}
          currentLecture={currentLecture}
          comments={comments}
        />
      </div>
    </section>
  );
};

export default WatchCourse;
