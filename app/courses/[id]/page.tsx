import Image from "next/image";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Icon from "@/components/ui/Icon";
import TruncatedText from "@/components/Courses/TruncatedText";

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
        { title: "What's is Webflow?", info: "07:31" },
        { title: "Sign up in Webflow", info: "07:31" },
        { title: "Webflow Terms & Conditions", info: "5.3 MB" },
        { title: "Teaser of Webflow", info: "07:31" },
        { title: "Practice Project", info: "5.3 MB" },
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

export default function CoursePage() {
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
                        {/* TODO:rating icon */}
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

              <div className="bg-success/20 w-full p-4 pl-10">
                <span className="text-base-content/80 text-xl font-medium">
                  What you will learn in this course
                </span>
                <div className="mt-4">
                  <ul className="grid grid-cols-2 gap-6 pl-5">
                    {fakeCourses.whatYouWillLearn.map((item, index) => (
                      // TODO: add checkbox icon
                      <li key={index} className="text-base-content/70 text-sm">
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
                      // TODO: add right icon
                      <li key={index} className="text-base-content/70 text-sm">
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
                  <ul className="flex list-disc flex-col items-start gap-3 pl-5">
                    {fakeCourses.courseRequirements.map((item, index) => (
                      <li key={index} className="text-base-content/70 text-sm">
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* TODO: Add icon  */}
              <div className="mt-12 w-full">
                <span className="text-base-content/80 mb-4 block text-2xl font-semibold">
                  Curriculum
                </span>
                <Accordion type="single" collapsible className="w-full">
                  {fakeCourses.curriculum.map((section, index) => (
                    <AccordionItem
                      key={index}
                      value={`section-${index + 1}`}
                      className="bg-base-100 border-base-content/10 border transition-all duration-150 hover:translate-y-[-1px]"
                    >
                      <AccordionTrigger className="min-h-[72px] px-6">
                        <div className="flex w-full flex-row items-start justify-between gap-3">
                          <span className="text-base-content/80 font-semibold">
                            {section.title}
                          </span>
                          <div className="flex flex-wrap gap-5">
                            <span className="text-base-content/60 flex items-center gap-2 text-sm">
                              <Icon
                                icon="ph:play-circle-duotone"
                                className="text-secondary"
                              />
                              {section.lectures} Lectures
                            </span>
                            <span className="text-base-content/60 flex items-center gap-2 text-sm">
                              <Icon
                                icon="ph:clock"
                                className="text-primary text-lg"
                              />
                              {section.duration}
                            </span>
                          </div>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent>
                        <ul className="px-4">
                          {section.content.map((item, idx) => (
                            <li
                              key={idx}
                              className="flex items-center gap-2 py-1 text-sm"
                            >
                              {item.title}
                              <span className="ml-auto text-xs">
                                {item.info}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </div>

            <div className="mt-12 w-full space-y-3">
              <span className="text-base-content/80 mb-4 block text-2xl font-semibold">
                Course instructors{` (${Instructors.length})`}
              </span>
              {Instructors.map((instructor, index) => (
                <div key={index} className="border-base-300 w-full border p-4">
                  <div className="flex flex-row items-center gap-4">
                    <Image
                      width={64}
                      height={64}
                      src={instructor.avatar}
                      alt={instructor.name}
                      className="border-base-300 mb-6 w-2/5 rounded-full border"
                    />
                    <div className="flex flex-col gap-2">
                      <span className="text-base-content/80 font-semibold">
                        {instructor.name}
                      </span>
                      <span className="text-base-content/60 text-sm">
                        {instructor.bio}
                      </span>

                      <div className="text-base-content/80 flex flex-row items-center justify-between gap-4 text-sm font-semibold">
                        <span>
                          {instructor.rating}
                          <span className="text-base-content/60 ml-1">
                            Course rating
                          </span>
                        </span>
                        <span>
                          {instructor.students.toLocaleString()}
                          <span className="text-base-content/60 ml-1">
                            Students
                          </span>
                        </span>
                        <span>
                          {instructor.courses}
                          <span className="text-base-content/60 ml-1">
                            Courses
                          </span>
                        </span>
                      </div>
                      <div className="mt-4">
                        <TruncatedText
                          text={instructor.description}
                          maxLength={150}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* side bar cart */}
        <div className="md:col-span-1">
          <div className="border-primary bg-base-300 sticky top-24 flex flex-col gap-4 border p-6">
            {/* TODO: CART */}
          </div>
        </div>
      </div>
    </section>
  );
}
