import Image from "next/image";

import Icon from "@/components/ui/Icon";

import CourseCard from "@/components/CourseCard";
import Curriculum from "@/components/Courses/Curriculum";
import CourseInstructors from "@/components/Courses/CourseInstructors";
import Comments from "@/components/Courses/Comments";
import CourseRating from "@/components/Courses/CourseRating";

// Fake data that would come from a database

const fakeCourses = {
  breadcrumb: ["Home", "Development", "Web Development", "Webflow"],
  title:
    "Complete Website Responsive Design: from Figma to Webflow to Website Design",
  description:
    "Learn how to design beautiful websites using Figma, Adobe XD or Sketch, and code them into responsive websites that work on all devices.",
  instructors: [
    {
      name: "Dianne Russell",
      avatar: "/images/profile-img.png",
    },
    {
      name: "Kristin Watson",
      avatar: "/images/profile-img.png",
    },
  ],
  createdBy: "Dianne Russell , Kristin Watson",
  rating: 4.8,
  reviews: 244455,
  courseDescription: `It gives you a huge self-satisfaction when you look at your work and say, "I made this!". I love that feeling after I'm done working on something. When I lean back in my chair, look at the final result with a smile, and have this little "spark joy" moment. It's especially satisfying when I know I just made $5,000.

I do! And that's why I got into this field. Not for the love of Web Design, which I do now. But for the LIFESTYLE! There are many ways one can achieve this lifestyle. This is my way. This is how I achieved a lifestyle I've been fantasizing about for five years. And I'm going to teach you the same. Often people think Web Design is complicated. That it needs some creative talent or knack for computers. Sure, a lot of people make it very complicated. People make the simplest things complicated. Like most subjects taught in the universities. But I don't like complicated. I like easy. I like life hacks. I like to take the shortest and simplest route to my destination. I haven't gone to an art school or have a computer science degree. I'm an outsider to this field who hacked myself into it, somehow ending up being a sought-after professional. That's how I'm going to teach you Web Design. So you're not demotivated on your way with needless complexity. So you enjoy the process because it's simple and fun. So you can become a Freelance Web Designer in no time.

For example, this is a Design course but I don't teach you Photoshop. Because Photoshop is needlessly complicated for Web Design. But people still teach it to web designers. I don't. I teach Figma – a simple tool that is taking over the design world. You will be designing a complete website within a week while others are still learning how to create basic layouts in Photoshop.
`,
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
  curriculum: [
    {
      title: "Getting Started",
      lectures: 4,
      duration: "51m",
      content: [
        {
          title: "What's is Webflow?",
          info: "07:31",
          type: "video" as "video",
        },
        {
          title: "Sign up in Webflow",
          info: "07:31",
          type: "video" as "video",
        },
        {
          title: "Webflow Terms & Conditions",
          info: "5.3 MB",
          type: "file" as "file",
        },
        { title: "Teaser of Webflow", info: "07:31", type: "video" as "video" },
        { title: "Practice Project", info: "5.3 MB", type: "file" as "file" },
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

const Instructors = [
  {
    name: "John Doe",
    bio: "Web Design Expert",
    avatar: "/images/instructors/instructor-1.png",
    students: 354355,
    rating: 4.8,
    courses: 12,
    description:
      "John is a seasoned web designer with over 10 years of experience in creating stunning websites. He specializes in Figma and Webflow, helping students turn their design ideas into reality.",
  },
  {
    name: "Jane Smith",
    bio: "Figma Specialist",
    avatar: "/images/instructors/instructor-2.png",
    students: 254321,
    rating: 4.9,
    courses: 8,
    description:
      "Jane is a talented Figma designer with a passion for creating user-friendly interfaces. She has worked with various clients to bring their visions to life.",
  },
];

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
    name: "Alice Johnson",
    avatar: "/images/profile-img.png",
    star: 3,
    time: "2 days ago",
    comment:
      "This course was amazing! I learned so much about web design and Figma.",
  },
  {
    name: "Alice Johnson",
    avatar: "/images/profile-img.png",
    star: 5,
    time: "2 days ago",
    comment:
      "This course was amazing! I learned so much about web design and Figma.",
  },
];

const RelatedCourses = [
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
    thumbnail: "/images/course-2.jpg",
    name: "Figma for Beginners",
    category: "Design",
    price: 39.99,
    students: 800,
    rating: 4.7,
  },
  {
    thumbnail: "/images/course-2.jpg",
    name: "Figma for Beginners",
    category: "Design",
    price: 39.99,
    students: 800,
    rating: 4.7,
  },
];

const CoursePage = () => {
  return (
    <section className="container mx-auto px-4 py-8 md:px-8 lg:px-16">
      <div className="mx-auto grid max-w-5xl grid-cols-1 gap-12 md:grid-cols-3">
        <div className="md:col-span-2">
          <div className="bg-base-200 w-full">
            <div className="flex max-w-7xl items-center justify-center">
              <div className="mt-12 mb-6 w-full px-2">
                <span className="text-base-content/70 mb-4 flex items-center gap-2 text-sm">
                  {fakeCourses.breadcrumb.join(" > ")}
                </span>
                <h1 className="mb-4 text-3xl font-bold">{fakeCourses.title}</h1>
                <p className="text-base-content/70 mb-6 font-medium">
                  {fakeCourses.description}
                </p>
                <div className="mb-6 flex items-center gap-4">
                  <div className="flex w-full flex-row items-center justify-between">
                    <div className="flex flex-row items-center gap-2">
                      <div className="flex -space-x-2">
                        {fakeCourses.instructors.map((instructor, index) => (
                          <Image
                            key={index}
                            src={instructor.avatar}
                            alt={instructor.name}
                            width={40}
                            height={40}
                            className="border-base-100 rounded-full border-2"
                          />
                        ))}
                      </div>
                      <p className="text-base-content/60 flex flex-col text-sm">
                        Created by:
                        <span className="text-base-content/80 font-medium">
                          {fakeCourses.createdBy}
                        </span>
                      </p>
                    </div>
                    <div className="flex flex-row items-center gap-2">
                      <span className="flex items-center gap-1">
                        {/* TODO: add icons to number of reviews */}
                        <Icon icon="ph:star-fill" className="text-primary" />
                        {fakeCourses.rating}(
                        {fakeCourses.reviews.toLocaleString()} reviews)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-base-100 flex w-full flex-col items-center justify-center">
            {/* this image will be replaced with a video*/}
            <Image
              src="/images/courses/Trailer.jpg"
              alt="trailer"
              width={1024}
              height={800}
              className="mt-8 h-auto w-full max-w-2xl object-cover"
            />
            <div className="flex w-full flex-col items-center justify-center">
              <div className="border-base-300 mt-8 flex w-full max-w-5xl flex-row items-center justify-between border-b p-2 font-medium">
                <span className="text-base-content/70 border-primary border-b-2">
                  Overview
                </span>
                <span className="text-base-content/70">Curriculum</span>
                <span className="text-base-content/70">Instructors</span>
                <span className="text-base-content/70">Review</span>
              </div>

              <div className="p-4">
                <span className="text-base-content/80 text-2xl font-medium">
                  Description
                </span>
                {fakeCourses.courseDescription
                  .split(/\n\s*\n|\n/)
                  .filter(Boolean)
                  .map((para, idx) => (
                    <p
                      key={idx}
                      className="text-base-content/70 mt-4 mb-4 text-sm"
                    >
                      {para}
                    </p>
                  ))}
              </div>

              <div className="bg-success/10 w-full p-4 pl-10">
                <span className="text-base-content/80 text-xl font-medium">
                  What you will learn in this course
                </span>
                <div className="mt-4">
                  <ul className="grid grid-cols-2 gap-6 pl-5">
                    {fakeCourses.whatYouWillLearn.map((item, index) => (
                      <li
                        key={index}
                        className="text-base-content/70 flex items-start gap-2 text-sm"
                      >
                        <Icon
                          icon="ph:check-circle-fill"
                          className="text-success text-lg"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12 w-full">
                <span className="text-base-content/80 text-2xl font-medium">
                  Who this course is for :
                </span>
                <div className="mt-4">
                  <ul className="flex flex-col items-start gap-3 pl-5">
                    {fakeCourses.thisCourseFor.map((item, index) => (
                      <li
                        key={index}
                        className="text-base-content/70 flex items-start gap-2 text-sm"
                      >
                        <Icon
                          icon="ph:arrow-right"
                          className="text-primary text-lg"
                        />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-12 w-full">
                <span className="text-base-content/80 text-2xl font-medium">
                  Course requirements
                </span>
                <div className="mt-4">
                  <ul className="ml-5 flex list-disc flex-col items-start gap-3 pl-5">
                    {fakeCourses.courseRequirements.map((item, index) => (
                      <li key={index} className="text-base-content/70 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <Curriculum curriculum={fakeCourses.curriculum} />
              <CourseInstructors instructors={Instructors} />
              <CourseRating rating={fakeCourses.rating} />
              <Comments studentsComments={studentsComments} />
            </div>
          </div>
        </div>

        {/* side bar cart */}
        <div className="md:col-span-1">
          <div className="bg-base-100 sticky top-8 flex flex-col gap-1 p-4 shadow">
            <div className="flex w-full flex-row items-center justify-between">
              <span className="text-base-content/80 mb-1 text-lg font-medium">
                $49.00
                <span className="text-base-content/50 ml-1 text-xs line-through">
                  $26.00
                </span>
              </span>
              <button className="btn btn-soft btn-primary text-xs">
                56% Off
              </button>
            </div>
            <span className="text-error ml-1 flex flex-row items-start gap-1 text-xs">
              <Icon icon="ph:alarm" className="text-sm" />2 days left at this
              price!
            </span>
            <div className="divider divider-base-300 w-full"></div>

            <div className="flex w-full flex-col gap-1 text-xs text-nowrap">
              <div className="flex flex-row items-center justify-between gap-1">
                <span className="flex items-center gap-1">
                  <Icon
                    icon="ph:clock-duotone"
                    className="text-base-content/60 text-sm"
                  />
                  Course Duration
                </span>
                <span className="text-base-content/60">6 Month</span>
              </div>
              <div className="flex items-center justify-between gap-1">
                <span className="flex items-center gap-1">
                  <Icon
                    icon="ph:chart-bar-duotone"
                    className="text-base-content/60 text-sm"
                  />
                  Course Level
                </span>
                <span className="text-base-content/60">Beginner</span>
              </div>
              <div className="flex items-center justify-between gap-1">
                <span className="flex items-center gap-1">
                  <Icon
                    icon="ph:users-duotone"
                    className="text-base-content/60 text-sm"
                  />
                  Students Enrolled
                </span>
                <span className="text-base-content/60">69,419,618</span>
              </div>
              <div className="flex items-center justify-between gap-1">
                <span className="flex items-center gap-1">
                  <Icon
                    icon="ph:notebook-duotone"
                    className="text-base-content/60 text-sm"
                  />
                  Language
                </span>
                <span className="text-base-content/60">Mandarin</span>
              </div>
              <div className="flex items-center justify-between gap-1">
                <span className="flex items-center gap-1">
                  <Icon
                    icon="ph:notepad-duotone"
                    className="text-base-content/60 text-sm"
                  />
                  Subtitle Language
                </span>
                <span className="text-base-content/60">English</span>
              </div>
            </div>

            <div className="divider divider-base-300 my-1 w-full"></div>

            <div className="flex flex-col items-center gap-1">
              <button className="btn btn-primary w-full text-xs">
                Add To cart
              </button>
              <button className="btn btn-soft btn-primary w-full text-xs">
                Buy Now
              </button>
              <div className="flex w-full flex-row items-center justify-between">
                <button className="btn btn-ghost border-base-300 w-1/2 border text-xs">
                  Add to Wishlist
                </button>
                <button className="btn btn-ghost border-base-300 w-1/2 border text-xs">
                  Gift course
                </button>
              </div>
              <span className="text-base-content/60 text-xs">
                Note: all course have 30-days money-back guarantee
              </span>
            </div>

            <div className="divider divider-base-300 my-1 w-full"></div>

            <div>
              <span className="text-base-content/80 text-md font-medium">
                This course includes:
              </span>
              <ul className="text-base-content/60 mt-2 space-y-2 text-xs">
                <li className="flex items-center gap-1">
                  <Icon icon="ph:clock" className="text-primary text-sm" />
                  Lifetime access
                </li>
                <li className="flex items-center gap-1">
                  <Icon
                    icon="ph:currency-dollar"
                    className="text-primary text-sm"
                  />
                  30-days money-back guarantee
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="ph:file-text" className="text-primary text-sm" />
                  Free exercises file & downloadable resources
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="ph:trophy" className="text-primary text-sm" />
                  Shareable certificate of completion
                </li>
                <li className="flex items-center gap-1">
                  <Icon
                    icon="ph:device-mobile"
                    className="text-primary text-sm"
                  />
                  Access on mobile, tablet and TV
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="ph:calendar" className="text-primary text-sm" />
                  English subtitles
                </li>
                <li className="flex items-center gap-1">
                  <Icon icon="ph:stack" className="text-primary text-sm" />
                  100% online course
                </li>
              </ul>
            </div>

            {/* TODO: Add share buttons */}
          </div>
        </div>
      </div>

      <div className="border-base-300 mt-12 w-full border-t">
        <div className="flex flex-row items-center justify-between gap-4 p-6">
          <span className="text-base-content/80 text-2xl font-semibold">
            Related Courses
          </span>

          <button className="btn btn-soft btn-primary mt-6">
            view All <Icon icon="ph:arrow-right" className="ml-2 text-lg" />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 p-6 md:grid-cols-3 lg:grid-cols-4">
          {RelatedCourses.map((course, index) => (
            <CourseCard
              key={index}
              thumbnail={course.thumbnail}
              name={course.name}
              category={course.category}
              price={course.price}
              rating={course.rating}
              students={course.students}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CoursePage;
