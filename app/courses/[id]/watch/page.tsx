import WatchComments from "@/components/Courses/watchCourses/WatchComments";
import WatchCurriculum from "@/components/Courses/watchCourses/WatchCurriculum";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Icon from "@/components/ui/Icon";
import Image from "next/image";
import Link from "next/link";
import WriteReview from "@/components/Courses/watchCourses/WriteReview";

const curriculum = [
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

const courseStudents = [
  {
    avatar: "/images/profile-img.png",
  },
  {
    avatar: "/images/profile-img.png",
  },
];

const lactureData = {
  description: `We cover everything you need to build your first website. From creating your first page through to uploading your website to the internet. We’ll use the world’s most popular (and free) web design tool called Visual Studio Code. There are exercise files you can download and then work along with me. At the end of each video I have a downloadable version of where we are in the process so that you can compare your project with mine. This will enable you to see easily where you might have a problem. We will delve into all the good stuff such as how to create your very own mobile burger menu from scratch learning some basic JavaScript and jQuery.

If that all sounds a little too fancy - don’t worry, this course is aimed at people new to web design and who have never coded before. We’ll start right at the beginning and work our way through step by step. `,

  note: `In ut aliquet ante. Curabitur mollis tincidunt turpis, sed aliquam mauris finibus vel. Praesent eget mi in mi maximus egestas. Mauris eget ipsum in justo bibendum pellentesque. Sed id arcu in arcu ullamcorper eleifend condimentum quis diam. Phasellus tempus, urna ut auctor mattis, nisi nunc tincidunt lorem, eu egestas augue lectus sit amet sapien. Maecenas tristique aliquet massa, a venenatis augue tempor in. Aliquam turpis urna, imperdiet in lacus a, posuere suscipit augue. , Donec congue aliquam lorem nec congue. Suspendisse eu risus mattis, interdum ante sed, fringilla urna. Praesent mattis dictum sapien a lacinia. Ut scelerisque magna aliquet, blandit arcu quis, consequat purus. Suspendisse eget scelerisque felis. Integer vulputate urna laoreet purus vehicula condimentum. Donec quis luctus quam. Curabitur quis molestie ante. Nam pharetra sagittis varius. Sed ullamcorper facilisis bibendum.`,
  file: "",
};

const comments = [
  {
    name: "Theresa Webb",
    avatar: "/images/instructors/instructor-1.png",
    time: "3 weeks ago",
    star: 5,
    comment:
      "Now I know that I will spent that 5 minutes of my life with pure pleasure",
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

const watchCourse = () => {
  return (
    <section className="container mx-auto flex w-full flex-col items-start">
      <div className="bg-base-200 flex w-full flex-row items-center justify-between p-4">
        <div className="flex flex-row items-center gap-4">
          <Link
            href=""
            className="bg-base-100 flex h-10 w-10 items-center justify-center rounded-full"
          >
            <Icon
              icon="ph:arrow-left"
              className="text-base-content/80 text-lg"
            />
          </Link>

          <div className="flex flex-col gap-3">
            <span className="text-base-content/80 text-xl font-semibold">
              Complete Website Responsive Design: from Figma to Webflow to
              Website Design
            </span>
            <div className="flex flex-row items-center gap-2">
              <span className="flex items-center gap-1 text-sm">
                <Icon icon="ph:folder-open" className="text-primary text-lg" />6
                section
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Icon
                  icon="ph:play-circle"
                  className="text-secondary text-lg"
                />
                203 lectures
              </span>
              <span className="flex items-center gap-1 text-sm">
                <Icon icon="ph:clock" className="text-primary text-lg" /> 19h
                37m
              </span>
            </div>
          </div>
        </div>
        <div className="flex flex-row items-center gap-2">
          {/* daisy ui modal  */}
          <WriteReview />
          <button className="btn btn-primary">Next Lecture</button>
        </div>
      </div>
      <div className="flex w-full flex-row items-start gap-4 p-4">
        {/* img || video*/}
        <Image
          src={"/images/courses/videoPlayer.png"}
          alt=""
          width={1024}
          height={800}
          className="mt-8 w-7/12"
        />

        <div className="flex w-5/12 flex-col items-start justify-start">
          <WatchCurriculum curriculum={curriculum} />
        </div>
      </div>

      <div className="flex w-2/3 flex-col items-start justify-start px-4">
        <span className="text-base-content/80 text-xl font-semibold">
          {courseData.section} .{courseData.sectionTitle}
        </span>
        <div className="mt-4 flex w-full flex-row items-center justify-between gap-3">
          <div className="flex flex-row items-center gap-3">
            <div className="flex -space-x-2">
              {courseStudents.map((instructor, index) => (
                <Image
                  key={index}
                  src={instructor.avatar}
                  alt="students"
                  width={35}
                  height={35}
                  className="border-base-100 rounded-full border-2"
                />
              ))}
            </div>
            <span className="text-md flex flex-col items-start font-medium">
              {courseData.students}
              <span className="text-base-content/60 text-sm">
                student Watching
              </span>
            </span>
          </div>
          <div className="flex flex-row items-center gap-4">
            {/* TODO: add date */}
            <span>Last updated : </span>
            <span>Comments : </span> {/* TODO : number of comments */}
          </div>
        </div>

        <Tabs defaultValue="description" className="mt-8 w-full">
          <TabsList className="!bg-base-100 data- flex gap-6">
            <TabsTrigger
              value="description"
              className="!text-base-content/70 data-[state=active]:!bg-base-100 !border-primary !rounded-none border-0 p-6 text-lg font-semibold data-[state=active]:!border-b-2 data-[state=active]:!shadow-none"
            >
              Description
            </TabsTrigger>
            <TabsTrigger
              value="lecture notes"
              className="!text-base-content/70 data-[state=active]:!bg-base-100 !border-primary !rounded-none border-0 p-6 text-lg font-semibold data-[state=active]:!border-b-2 data-[state=active]:!shadow-none"
            >
              Lecture Notes
            </TabsTrigger>
            <TabsTrigger
              value="attach file"
              className="!text-base-content/70 data-[state=active]:!bg-base-100 !border-primary !rounded-none border-0 p-6 text-lg font-semibold data-[state=active]:!border-b-2 data-[state=active]:!shadow-none"
            >
              Attach File
            </TabsTrigger>
            <TabsTrigger
              value="comments"
              className="!text-base-content/70 data-[state=active]:!bg-base-100 !border-primary !rounded-none border-0 p-6 text-lg font-semibold data-[state=active]:!border-b-2 data-[state=active]:!shadow-none"
            >
              Comments
            </TabsTrigger>
          </TabsList>
          <TabsContent value="description">
            <div className="mt-8 flex w-full flex-col items-start gap-8">
              <span className="font-md text-base-content text-xl font-semibold">
                Lecture Description
              </span>
              <p className="text-base-content/70 text-sm">
                {lactureData.description}
              </p>
              <div className="flex w-full flex-row items-center justify-between">
                <span className="font-md text-base-content text-xl font-semibold">
                  Lecture Notes
                </span>

                <button className="!btn !btn-primary !btn-soft">
                  <Icon icon="ph:download-simple" className="text-2xl" />
                  Download Notes
                </button>
              </div>
              <p className="text-base-content/70 text-sm">{lactureData.note}</p>
            </div>

            <div className="mt-8 flex w-full flex-col items-start gap-4">
              {/* TODO: add attach file number to here */}
              <span className="text-base-content text-xl font-semibold">{`Attach File (01)`}</span>
              <div className="bg-base-200 flex w-full flex-row items-start justify-between p-6">
                <div className="flex flex-row items-center gap-2">
                  <Icon icon="ph:file-text" className="text-primary text-5xl" />
                  {/* TODO : get deta from db */}
                  <span className="font-md text-md flex flex-col">
                    Create account on webflow.pdf
                    <span className="text-base-content/60 text-sm">
                      12.6 MB
                    </span>
                  </span>
                </div>
                <button className="btn btn-primary">Download File</button>
              </div>
            </div>

            <WatchComments comments={comments} />
          </TabsContent>
          <TabsContent value="lecture notes">
            <div className="mt-8 flex w-full flex-row items-center justify-between">
              <span className="font-md text-base-content text-xl font-semibold">
                Lecture Notes
              </span>

              <button className="!btn !btn-primary !btn-soft">
                <Icon icon="ph:download-simple" className="text-2xl" />
                Download Notes
              </button>
            </div>
            <p className="text-base-content/70 mt-8 text-sm">
              {lactureData.note}
            </p>
          </TabsContent>
          <TabsContent value="attach file">
            <div className="mt-8 flex w-full flex-col items-start gap-4">
              {/* TODO: add attach file number to here */}
              <span className="text-base-content text-xl font-semibold">{`Attach File (01)`}</span>
              <div className="bg-base-200 flex w-full flex-row items-start justify-between p-6">
                <div className="flex flex-row items-center gap-2">
                  <Icon icon="ph:file-text" className="text-primary text-5xl" />
                  {/* TODO : get deta from db */}
                  <span className="font-md text-md flex flex-col">
                    Create account on webflow.pdf
                    <span className="text-base-content/60 text-sm">
                      12.6 MB
                    </span>
                  </span>
                </div>
                <button className="btn btn-primary">Download File</button>
              </div>
            </div>
          </TabsContent>
          <TabsContent value="comments">
            <WatchComments comments={comments} />
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
};

export default watchCourse;
