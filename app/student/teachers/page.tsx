import React from "react";
import TeacherCard from "@/components/Student/TeacherCard";
import Search from "@/components/Student/Search";
import TeacherSelect from "@/components/TeacherSelect";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import instructorModel from "@/lib/db/models/instructorModel";

interface InstructorData {
  name: string;
  title: string;
  image: string;
  rating: number;
  students: number;
}

interface Props {
  searchParams: Promise<{ query?: string }>;
}

const TeachersPage = async ({ searchParams }: Props) => {
  try {
    await connectDB();

    const resolvedSearchParams = await searchParams;
    const query = resolvedSearchParams.query?.toLowerCase();

    const foundCourses = await courseModel.find().populate("authors");
    const allAuthors = foundCourses.flatMap((course) =>
      course.authors.map((author: string) => author.toString())
    );
    //  TODO : foundCourses[0].authors is not a good way to get all instructors, it should be a separate query
    const instructors = foundCourses[0].authors;

    const instructorData: InstructorData[] = instructors.map((instructor: any) => ({
      name: `${instructor.firstname} ${instructor.lastname}`,
      title: instructor.bio || "Instructor",
      image:
        instructor.avatar || "/images/student-dashboard/Teacher-default.jpg",
      rating: instructor.rating,
      students: instructor.students,
    }));

    const filteredTeachers = query
      ? instructorData.filter(
          (teacher) =>
            teacher.name.toLowerCase().includes(query) ||
            teacher.title.toLowerCase().includes(query)
        )
      : instructorData;

    // Debug logs
    console.log("Resolved Search Params:", resolvedSearchParams);
    console.log("Query:", query);
    console.log("Found Courses:", foundCourses);
    console.log("All Authors:", allAuthors);
    console.log("Instructors Query Result:", instructors);
    console.log("Instructor Data:", instructorData);
    console.log("Filtered Teachers:", filteredTeachers);

    return (
      <>
        <div className="mb-6 flex flex-col gap-4">
          <div className="text-base-content/80 mb-4 text-xl font-semibold">
            Instructors
            <span className="text-base-content/80">
              {`(${filteredTeachers.length})`}
            </span>
          </div>
          <div className="flex flex-row gap-2">
            <div className="flex flex-1 items-center gap-2">
              <Search action="/student/teachers" />
            </div>
            <TeacherSelect />
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {filteredTeachers.map((teacher, i) => (
            <TeacherCard key={i} {...teacher} />
          ))}
        </div>
      </>
    );
  } catch (error) {
    console.error("Error connecting to database or fetching data:", error);
    return <div>Error loading instructors. Please try again later.</div>;
  }
};

export default TeachersPage;
