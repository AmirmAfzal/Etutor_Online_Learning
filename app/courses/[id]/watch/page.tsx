import { Types } from "mongoose";

import WatchCurriculum from "@/components/Courses/watchCourses/WatchCurriculum";
import WatchHeader from "@/components/Courses/watchCourses/WatchHeader";
import WatchPlayer from "@/components/Courses/watchCourses/WatchPlayer";
import WatchDetails from "@/components/Courses/watchCourses/WatchDetails";
import WatchTabs from "@/components/Courses/watchCourses/WatchTabs";
import { connectDB } from "@/lib/db/db";
import sectionModel from "@/lib/db/models/sectionModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import studentModel from "@/lib/db/models/studentModel";
import { redirect } from "next/navigation";
import courseProgressModel from "@/lib/db/models/courseProgressModel";
import courseModel from "@/lib/db/models/courseModel";

interface CurriculumItem {
  title: string;
  lectures: number;
  duration: string;
  content: {
    _id: string;
    title: string;
    info: string;
    type: string;
  }[];
}

interface Props {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ lectureId: string; section: string }>;
}

interface LectureType {
  _id: Types.ObjectId;
  title: string;
  description: string;
  video: string;
  duration: number;
  files: string | string[];
  notes: string;
  caption: string;
}
interface CourseType {
  title: string;
  duration: number;
  sections: Types.ObjectId[];
}
interface SectionType {
  _id: Types.ObjectId;
  title: string;
  lectures: LectureType[];
  course: CourseType;
}

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

const WatchCourse = async (props: Props) => {
  await connectDB();

  const session = await getServerSession(authOptions);

  const { id } = await props.params;
  const searchParams = await props.searchParams;

  if (!Types.ObjectId.isValid(id)) {
    return <div>Invalid Course ID</div>;
  }

  const studentCourses = await studentModel
    .findOne({ user: session?.user?.id, courses: new Types.ObjectId(id) })
    .populate("courses")
    .lean();

  const foundSections = await sectionModel
    .find({ course: id })
    .populate("lectures")
    .populate("course")
    .lean<SectionType[]>();

  if (!foundSections || foundSections.length === 0) {
    return (
      <div className="font-md flex h-screen items-center justify-center text-lg">
        Course not found or has no sections.
      </div>
    );
  }

  const course: CourseType = foundSections[0]?.course as CourseType;
  const lectures: LectureType[] = foundSections.flatMap(
    (section) => section.lectures
  );

  const { lectureId, section: sectionParam } = searchParams;

  let currentLecture: LectureType | undefined;
  let currentSection: SectionType | undefined;

  // Set the default lecture if lectureId is not provided
  if (!lectureId) {
    currentSection = foundSections[0];
    currentLecture = currentSection?.lectures[0];
  } else {
    // Find the lecture from search params
    if (sectionParam) {
      const sectionIndex = parseInt(sectionParam, 10) - 1; // Convert to 0-based index
      const targetSection = foundSections[sectionIndex];

      if (targetSection) {
        currentSection = targetSection;
        currentLecture = targetSection.lectures.find(
          (lecture) => lecture._id.toString() === lectureId
        );
      }
    }

    // Fallback if lecture is not found in the specified section
    if (!currentLecture) {
      currentLecture = lectures.find(
        (lecture) => lecture._id.toString() === lectureId
      );
    }
  }

  // If a lecture is still not found, return an error
  if (!currentLecture) {
    return (
      <div className="font-md flex items-center justify-center text-lg">
        Lecture not found. Please select a valid lecture.
      </div>
    );
  }

  // Find the section for the current lecture if not already set
  if (!currentSection) {
    currentSection = foundSections.find((section) =>
      section.lectures.some(
        (l) => l._id.toString() === currentLecture?._id.toString()
      )
    );
  }

  if (currentLecture) {
    await courseProgressModel.findOneAndUpdate(
      {
        user: session?.user.id,
        course: id,
        lecture: currentLecture._id,
      },
      {
        user: session?.user.id,
        course: id,
        lecture: currentLecture._id,
        completed: true,
        completedAt: new Date(),
      },
      { upsert: true, new: true, runValidators: true }
    );
  }

  const completedLectures = await courseProgressModel
    .find({
      user: session?.user?.id,
      course: id,
      completed: true,
    })
    .lean();

  const completionPercentage = lectures.length
    ? Math.min(
        100,
        Math.round((completedLectures.length / lectures.length) * 100)
      )
    : 0;



  const curriculum: CurriculumItem[] = foundSections.map((section) => {
    const totalSectionDuration = section.lectures.reduce(
      (sum, lecture) => sum + lecture.duration,
      0
    );
    return {
      title: section.title,
      lectures: section.lectures.length,
      duration: convertMinutesToHoursAndMinutes(totalSectionDuration),
      content: section.lectures.map((lecture) => ({
        _id: lecture._id.toString(),
        title: lecture.title,
        info: convertMinutesToHoursAndMinutes(lecture.duration),
        type: "video",
      })),
    };
  });

  const courseData = {
    section: currentSection
      ? foundSections.findIndex((s) => s._id === currentSection._id) + 1
      : 0,
    sectionTitle: currentLecture.title,
    students: 122, // FIXME: student number
  };

  if (!studentCourses) {
    redirect(`/courses/${id}`);
  }

  if (!session) {
    redirect(`/auth/signin`);
  }

  return (
    <section className="container mx-auto w-full px-4 py-6">
      <WatchHeader
        params={{ id }}
        searchParams={searchParams}
        title={course?.title ?? "The course does not have a title"}
        sectionsCount={foundSections.length}
        lecturesCount={lectures.length}
        totalDuration={convertMinutesToHoursAndMinutes(course?.duration ?? 0)}
      />

      <div className="mt-6 flex w-full flex-col items-start gap-4 lg:flex-row lg:gap-6">
        <WatchPlayer videoSrc={currentLecture.video} />
        <div className="w-full lg:w-5/12">
          <WatchCurriculum
            completionPercentage={completionPercentage}
            curriculum={curriculum}
            courseId={id}
            currentLectureId={currentLecture._id.toString()}
            currentSectionIndex={
              currentSection
                ? foundSections.findIndex((s) => s._id === currentSection._id) +
                  1
                : 0
            }
          />
        </div>
      </div>

      <WatchDetails
        sectionNumber={courseData.section}
        sectionTitle={courseData.sectionTitle}
        currentLecture={currentLecture}
        watchingStudents={courseData.students}
      />

      <div className="lg:w-2/3">
        <WatchTabs currentLecture={currentLecture} />
      </div>
    </section>
  );
};

export default WatchCourse;
