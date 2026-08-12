import React from "react";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import CourseCard from "@/components/Student/CourseCardStudent";
import Search from "@/components/Student/Search";
import CoursesSelect from "@/components/Student/CoursesSelect";
import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import studentModel from "@/lib/db/models/studentModel";
import sectionModel from "@/lib/db/models/sectionModel";
import courseProgressModel from "@/lib/db/models/courseProgressModel";

interface CourseData {
  id?: string;
  _id: string;
  title: string;
  subtitle: string;
  thumbnail: string;
  progress?: string;
  status?: string;
  author: string[];
  views: number;
  createdAt?: Date;
}

interface Student {
  _id: string;
  user: string;
  courses: CourseData[];
}

interface Props {
  searchParams: Promise<{ query?: string; sorted?: string; status?: string }>;
}
async function getCourseProgress(courseId: string, userId: string | undefined) {
  const sections = await sectionModel.find({ course: courseId }).lean();
  const allLectures = sections.flatMap((s) =>
    s.lectures.map((lec: string) => String(lec))
  );

  if (allLectures.length === 0) {
    return { status: "NotStarted", progress: 0 };
  }

  const progresses = await courseProgressModel
    .find({
      user: userId,
      course: courseId,
      lecture: { $in: allLectures },
    })
    .lean();

  const completedLectures = new Set(
    progresses.filter((p) => p.completed).map((p) => String(p.lecture))
  );

  const completedCount = completedLectures.size;
  const totalCount = allLectures.length;
  const percent = Math.round((completedCount / totalCount) * 100);

  let status = "Ongoing";
  if (percent === 0) status = "Not Started";
  else if (percent === 100) status = "Completed";

  return { status, progress: percent };
}

const StudentCoursesPage = async (props: Props) => {
  await connectDB();
  const searchParams = await props.searchParams;
  const query = searchParams.query?.toLowerCase();

  const session = await getServerSession(authOptions);
  if (!session?.user?.id) {
    return redirect("/auth/signin");
  }

  const student = await studentModel
    .findOne({ user: session.user.id })
    .populate<{ courses: CourseData[] }>({
      path: "courses",
      match: query
        ? {
            $or: [
              { title: { $regex: query, $options: "i" } },
              { subtitle: { $regex: query, $options: "i" } },
            ],
          }
        : {},
    })
    .lean<Student | null>();

  if (!student) {
    return redirect("/auth/signin");
  }

  const courses: CourseData[] = student.courses || [];

  switch (searchParams.sorted) {
    case "MostViewed":
      courses.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
      break;
    case "Latest":
      courses.sort(
        (a, b) =>
          new Date(b.createdAt ?? 0).getTime() -
          new Date(a.createdAt ?? 0).getTime()
      );
      break;
    case "oldest":
      courses.sort(
        (a, b) =>
          new Date(a.createdAt ?? 0).getTime() -
          new Date(b.createdAt ?? 0).getTime()
      );
      break;
    default:
      courses.sort((a, b) => (b.views ?? 0) - (a.views ?? 0));
  }

  let mappedCoursesWithStatus = await Promise.all(
    courses.map(async (course) => {
      const { status, progress } = await getCourseProgress(
        course._id,
        session?.user?.id
      );

      return {
        id: course._id,
        name: course.title,
        subtitle: course.subtitle,
        image: course.thumbnail,
        progress: `${progress}%`,
        status,
      };
    })
  );

  if (searchParams.status && searchParams.status !== "AllCourses") {
    mappedCoursesWithStatus = mappedCoursesWithStatus.filter(
      (course) => course.status === searchParams.status
    );
  }

  const mappedCourses = mappedCoursesWithStatus;

  return (
    <>
      <div className="mb-6 space-y-4">
        <div className="flex flex-col items-start sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-2">
            <h2 className="text-base-content text-lg font-semibold sm:text-xl">
              Courses
            </h2>
            <span className="text-base-content/60 text-sm sm:text-base">
              ({mappedCourses.length})
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="flex flex-1">
            <Search action="/student/courses" />
          </div>
          <CoursesSelect />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {mappedCourses.map((course) => (
          <CourseCard
            id={course.id}
            key={course.id}
            title={course.name}
            subtitle={course.subtitle}
            image={course.image}
            progress={course.progress}
          />
        ))}
      </div>
    </>
  );
};

export default StudentCoursesPage;
