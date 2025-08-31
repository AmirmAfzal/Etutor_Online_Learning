import WatchCurriculum from "@/components/Courses/watchCourses/WatchCurriculum";
import WatchHeader from "@/components/Courses/watchCourses/WatchHeader";
import WatchPlayer from "@/components/Courses/watchCourses/WatchPlayer";
import WatchDetails from "@/components/Courses/watchCourses/WatchDetails";
import WatchTabs from "@/components/Courses/watchCourses/WatchTabs";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import { Types } from "mongoose";

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

// students avatars rendered inside WatchDetails for simplicity

const lactureData = {
  description: `We cover everything you need to build your first website. From creating your first page through to uploading your website to the internet. We'll use the world's most popular (and free) web design tool called Visual Studio Code. There are exercise files you can download and then work along with me. At the end of each video I have a downloadable version of where we are in the process so that you can compare your project with mine. This will enable you to see easily where you might have a problem. We will delve into all the good stuff such as how to create your very own mobile burger menu from scratch learning some basic JavaScript and jQuery.

If that all sounds a little too fancy - don't worry, this course is aimed at people new to web design and who have never coded before. We'll start right at the beginning and work our way through step by step. `,

  note: `In ut aliquet ante. Curabitur mollis tincidunt turpis, sed aliquam mauris finibus vel. Praesent eget mi in mi maximus egestas. Mauris eget ipsum in justo bibendum pellentesque. Sed id arcu in arcu ullamcorper eleifend condimentum quis diam. Phasellus tempus, urna ut auctor mattis, nisi nunc tincidunt lorem, eu egestas augue lectus sit amet sapien. Maecenas tristique aliquet massa, a venenatis augue tempor in. Aliquam turpis urna, imperdiet in lacus a, posuere suscipit augue. , Donec congue aliquam lorem nec congue. Suspendisse eu risus mattis, interdum ante sed, fringilla urna. Praesent mattis dictum sapien a lacinia. Ut scelerisque magna aliquet, blandit arcu quis, consequat purus. Suspendisse eget scelerisque felis. Integer vulputate urna laoreet purus vehicula condimentum. Donec quis luctus quam. Curabitur quis molestie ante. Nam pharetra sagittis varius. Sed ullamcorper facilisis bibendum.`,
  file: "",
};

interface Course {
  title?: string;
  section?: string;
  duration: number;
}

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
  // Validate that the input is a non-negative number.
  if (typeof totalMinutes !== "number" || totalMinutes < 0) {
    return "Invalid input";
  }

  // Calculate the hours and remaining minutes.
  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;

  // Build the output string based on the calculated values.
  let output = "";

  if (hours > 0) {
    output += `${hours}h`;
  }

  if (minutes > 0) {
    // Add a comma and space if there are already hours in the string.
    if (output !== "") {
      output += ", ";
    }
    output += `${minutes}min`;
  }

  // If the total time is zero, return "0min".
  if (output === "") {
    return "0min";
  }

  return output;
};

const WatchCourse = async ({ params }: { params: { id: string } }) => {
  await connectDB();
  const { id } = params;

  if (!Types.ObjectId.isValid(id)) {
    return <div>Invalid Course ID</div>;
  }

  const foundCourses = await courseModel.findById(id).lean<Course>();
  console.log(foundCourses);

  return (
    <section className="container mx-auto w-full px-4 py-6">
      <WatchHeader
        title={foundCourses?.title ?? "The course does not have a title"}
        sectionsCount={foundCourses?.section?.length ?? 0}
        lecturesCount={203}
        totalDuration={convertMinutesToHoursAndMinutes(
          foundCourses?.duration ?? 0
        )}
      />

      <div className="mt-6 flex w-full flex-col items-start gap-4 lg:flex-row lg:gap-6">
        <WatchPlayer />
        <div className="w-full lg:w-5/12">
          <WatchCurriculum curriculum={curriculum} />
        </div>
      </div>

      <WatchDetails
        sectionNumber={courseData.section}
        sectionTitle={courseData.sectionTitle}
        watchingStudents={courseData.students}
        commentsCount={comments.length}
      />

      <div className="lg:w-2/3">
        <WatchTabs lecture={lactureData} comments={comments} />
      </div>
    </section>
  );
};

export default WatchCourse;
