import React from "react";
import { Icon } from "@iconify/react";
import CourseCard from "@/components/Student/CourseCardStudent";
import { connectDB } from "@/lib/db/db";
import studentModel from "@/lib/db/models/studentModel";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StudentCoursesPage from "./courses/page";
import TeachersPage from "./teachers/page";
import MessagesPage from "./messages/page";
import WishlistPage from "./wishlist/page";
import PurchaseHistoryPage from "./purchase-history/page";
import { Settings } from "lucide-react";
import StudentSettingsPage from "./settings/page";
import StudentProfile from "@/components/Student/StudentProfile";
import Link from "next/link";

interface CourseData {
  title: string;
  subtitle: string;
  image: string;
  thumbnail?: string;
  progress?: string;
}

interface Student {
  user: string;
  _id: string;
  bio: string;
  avatar: string;
  firstname: string;
  lastname: string;
  courses: CourseData[];
}

interface StudentProfile {
  name: string;
  job: string;
  image: string;
  _id: string;
}

// const tabLinks = [
//   { label: "Dashboard", href: "/student" },
//   { label: "Courses", href: "/student/courses" },
//   { label: "Teachers", href: "/student/teachers" },
//   { label: "Message", href: "/student/messages" },
//   { label: "Wishlist", href: "/student/wishlist" },
//   { label: "Purchase History", href: "/student/purchase-history" },
//   { label: "Settings", href: "/student/settings" },
// ];

const StudentDashboard = async ({
  searchParams,
}: {
  searchParams: Promise<{ query?: string }>;
}) => {
  await connectDB();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return redirect("/auth/signin");
  }
  const student = await studentModel
    .findOne({ user: session.user.id })
    .populate<{ courses: CourseData[] }>("courses")
    .lean<Student | null>();
  if (!student) {
    return redirect("/auth/signin");
  }

  const studentProfile: StudentProfile = {
    name: `${student.firstname} ${student.lastname}`,
    job: student.bio,
    image: student.avatar || "/images/student-dashboard/profile-student.jpg",
    _id: student._id,
  };

  const foundCourses: CourseData[] = student.courses || [];
  const courses: CourseData[] = foundCourses.map((course) => ({
    title: course.title,
    subtitle: course.subtitle,
    image: course.thumbnail || "/images/course-images-01.png",
    progress: course.progress || "0%",
  }));

  //  {tabLinks.map((tab) => (
  //               <Link
  //                 key={tab.href}
  //                 href={tab.href}
  //                 className={`cursor-pointer px-4 py-2 font-medium ${pathname === tab.href ? "border-primary text-base-content/80 border-b-3 font-bold" : "text-base-content/50"}`}
  //                 prefetch={false}
  //               >
  //                 {tab.label}
  //               </Link>
  //             ))}

  return (
    <>
      <StudentProfile {...studentProfile} />
      <Tabs defaultValue="dashboard" className="mt-8 w-full">
        <TabsList className="!bg-base-100 flex items-center justify-between">
          <Link href="/student">
            <TabsTrigger
              value="dashboard"
              className="!text-base-content/70 data-[state=active]:!bg-base-100 !border-primary !rounded-none border-0 p-5 text-xl font-semibold data-[state=active]:!border-b-2 data-[state=active]:!shadow-none"
            >
              Dashboard
            </TabsTrigger>
          </Link>
          <Link href="/student/courses">
            <TabsTrigger
              value="courses"
              className="!text-base-content/70 data-[state=active]:!bg-base-100 !border-primary !rounded-none border-0 p-5 text-xl font-semibold data-[state=active]:!border-b-2 data-[state=active]:!shadow-none"
            >
              Courses
            </TabsTrigger>
          </Link>
          <Link href="/student/teachers">
            <TabsTrigger
              value="teachers"
              className="!text-base-content/70 data-[state=active]:!bg-base-100 !border-primary !rounded-none border-0 p-5 text-xl font-semibold data-[state=active]:!border-b-2 data-[state=active]:!shadow-none"
            >
              Teachers
            </TabsTrigger>
          </Link>
          <Link href="/student/messages">
            <TabsTrigger
              value="message"
              className="!text-base-content/70 data-[state=active]:!bg-base-100 !border-primary !rounded-none border-0 p-5 text-xl font-semibold data-[state=active]:!border-b-2 data-[state=active]:!shadow-none"
            >
              Messages
            </TabsTrigger>
          </Link>
          <Link href="/student/wishlist">
            <TabsTrigger
              value="wishlist"
              className="!text-base-content/70 data-[state=active]:!bg-base-100 !border-primary !rounded-none border-0 p-5 text-xl font-semibold data-[state=active]:!border-b-2 data-[state=active]:!shadow-none"
            >
              Wishlist
            </TabsTrigger>
          </Link>
          <Link href="/student/purchase-history">
            <TabsTrigger
              value="purchase-history"
              className="!text-base-content/70 data-[state=active]:!bg-base-100 !border-primary !rounded-none border-0 p-5 text-xl font-semibold data-[state=active]:!border-b-2 data-[state=active]:!shadow-none"
            >
              Purchase-history
            </TabsTrigger>
          </Link>
          <Link href="/student/settings">
            <TabsTrigger
              value="settings"
              className="!text-base-content/70 data-[state=active]:!bg-base-100 !border-primary !rounded-none border-0 p-5 text-xl font-semibold data-[state=active]:!border-b-2 data-[state=active]:!shadow-none"
            >
              Settings
            </TabsTrigger>
          </Link>
        </TabsList>
        <TabsContent value="dashboard">
          <div className="mt-8 flex w-full flex-col items-start">
            <h3 className="text-base-content/80 mt-2 mb-2 text-lg font-medium sm:mt-0 sm:mb-4 sm:text-2xl">
              Dashboard
            </h3>
            {/* TODO : connect to db */}
            <div className="mt-8 mb-8 grid w-full grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4">
              <div className="bg-primary/10 flex flex-row items-start gap-4 p-2 sm:p-6">
                <div className="bg-base-100 flex items-center gap-2 p-2">
                  <Icon
                    icon="ph:play-circle-fill"
                    className="text-primary text-4xl md:text-5xl"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-base-content/80 text-xl font-medium md:text-2xl">
                    957
                  </span>
                  <span className="text-base-content/60 text-xs text-nowrap md:text-sm">
                    Enrolled Courses
                  </span>
                </div>
              </div>
              <div className="bg-secondary/10 flex flex-row items-start gap-4 p-4 sm:p-6">
                <div className="bg-base-100 flex items-center gap-2 p-2">
                  <Icon
                    icon="ph:check-square-offset-duotone"
                    className="text-secondary text-4xl md:text-5xl"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-base-content/80 text-xl font-medium md:text-2xl">
                    6
                  </span>
                  <span className="text-base-content/60 text-xs text-nowrap md:text-sm">
                    Active Courses
                  </span>
                </div>
              </div>
              <div className="bg-success/10 flex flex-row items-start gap-4 p-4 sm:p-6">
                <div className="bg-base-100 flex items-center gap-2 p-2">
                  <Icon
                    icon="ph:trophy-duotone"
                    className="text-success text-4xl md:text-5xl"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-base-content/80 text-xl font-medium md:text-2xl">
                    951
                  </span>
                  <span className="text-base-content/60 text-xs text-nowrap md:text-sm">
                    Completed Courses
                  </span>
                </div>
              </div>
              <div className="bg-primary/10 flex flex-row items-start gap-4 p-4 sm:p-6">
                <div className="bg-base-100 flex items-center gap-2 p-2">
                  <Icon
                    icon="ph:users-duotone"
                    className="text-primary text-4xl md:text-5xl"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <span className="text-base-content/80 text-xl font-medium md:text-2xl">
                    241
                  </span>
                  <span className="text-base-content/60 text-xs text-nowrap md:text-sm">
                    Course Instructors
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="mb-4 flex flex-row items-center justify-between">
            <h3 className="text-base-content text-lg font-semibold">
              Let’s start learning, Kevin
            </h3>
            <div className="flex flex-row items-center gap-2">
              <Icon
                icon="ph:arrow-left-light"
                className="text-primary bg-primary/10 p-2 text-4xl transition-all duration-300 hover:translate-y-[-2px] hover:cursor-pointer"
              />
              <Icon
                icon="ph:arrow-right-light"
                className="text-primary bg-primary/10 p-2 text-4xl transition-all duration-300 hover:translate-y-[-2px] hover:cursor-pointer"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {courses.map((course, i) => (
              <CourseCard
                key={i}
                title={course.title}
                subtitle={course.subtitle}
                image={course.image}
                progress={course.progress}
              />
            ))}
          </div>
        </TabsContent>
        <TabsContent value="courses">
          <StudentCoursesPage searchParams={searchParams} />
        </TabsContent>
        <TabsContent value="teachers">
          <TeachersPage searchParams={searchParams} />
        </TabsContent>
        <TabsContent value="message">
          <MessagesPage />
        </TabsContent>
        <TabsContent value="wishlist">
          <WishlistPage />
        </TabsContent>
        <TabsContent value="purchase-history">
          <PurchaseHistoryPage />
        </TabsContent>
        <TabsContent value="settings">
          <StudentSettingsPage />
        </TabsContent>
      </Tabs>
    </>
  );
};

export default StudentDashboard;
