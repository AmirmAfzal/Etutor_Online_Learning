import mongoose from "mongoose";

import Icon from "@/components/ui/Icon";
import { connectDB } from "@/lib/db/db";
import courseModel from "@/lib/db/models/courseModel";
import purchaseHistoryModel from "@/lib/db/models/purchaseHistoryModel";
import sectionModel from "@/lib/db/models/sectionModel";

interface Props {
  courseId: string;
}

const CourseInformation = async ({ courseId }: Props) => {
  await connectDB();
  const course = await courseModel.findById(courseId);
  const purchaseHistories = await purchaseHistoryModel.find();

  const studentsEnrolledCount = () => {
    return purchaseHistories.reduce((total, purchase) => {
      const matchingCourses = purchase.courses.includes(String(course._id));
      matchingCourses && total++;
      return total;
    }, 0);
  };

  const setCourseLanguage = () => {
    switch (course.language) {
      case "en":
        return "English";
      case "fa":
        return "Farsi";

      default:
        return "English";
    }
  };

  async function countLecturesOfCourse(courseId: string) {
    const result = await sectionModel.aggregate([
      { $match: { course: new mongoose.Types.ObjectId(courseId) } }, // همه Sectionهای دوره
      { 
        $lookup: {
          from: "lectures",
          localField: "lectures",
          foreignField: "_id",
          as: "lectureDetails",
        }
      },
      {
        $unwind: "$lectureDetails"
      },
      {
        $group: {
          _id: null,
          totalLectures: { $sum: 1 }
        }
      }
    ]);

    return result[0]?.totalLectures ?? 0;
  }

  const lectureCount = await countLecturesOfCourse(course._id);

  const information = [
    {
      id: 1,
      icon: "ph:play-circle-duotone",
      name: "Lecture (219.3 GB)",
      value: lectureCount,
      bg: "bg-[#FFEEE8]",
      color: "text-[#FF6636]",
    },
    {
      id: 2,
      icon: "ph:chat-circle-dots-duotone",
      name: "Total Commends",
      value: "51, 429",
      bg: "bg-[#EBEBFF]",
      color: "text-[#564FFD]",
    },
    {
      id: 3,
      icon: "ph:users-duotone",
      name: "Students enrolled",
      value: String(studentsEnrolledCount()),
      bg: "bg-[#FFF0F0]",
      color: "text-[#E34444]",
    },
    {
      id: 4,
      icon: "ph:chart-bar-horizontal-duotone",
      name: "Course level",
      value: course.level,
      bg: "bg-[#E1F7E3]",
      color: "text-[#23BD33]",
    },
    {
      id: 5,
      icon: "ph:notepad-duotone",
      name: "Course Language",
      value: setCourseLanguage(),
      bg: "bg-[#F5F7FA]",
      color: "text-[#1D2026]",
    },
    {
      id: 6,
      icon: "ph:notebook-duotone",
      name: "Attach File (14.4 GB)",
      value: "142",
      bg: "bg-[#FFF2E5]",
      color: "text-[#FD8E1F]",
    },
    {
      id: 7,
      icon: "ph:clock-duotone",
      name: "Hours",
      value: course.duration,
      bg: "bg-[#EBEBFF]",
      color: "text-[#564FFD]",
    },
    {
      id: 8,
      icon: "ph:trophy-duotone",
      name: "Students viewed",
      value: "76,395,167",
      bg: "bg-[#F5F7FA]",
      color: "text-[#1D2026]",
    },
  ];

  return (
    <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
      {information.map((item) => (
        <div key={item.id} className="bg-base-100 flex flex-row gap-4 p-4">
          <div
            className={`flex h-16 w-16 items-center justify-center ${item.bg}`}
          >
            <Icon
              icon={item.icon}
              className={`${item.color}`}
              width="28"
              height="28"
            />
          </div>
          <div className="flex flex-col justify-center gap-2">
            <p className="text-xl">{item.value}</p>
            <p className="text-base-content/70 text-xs">{item.name}</p>
          </div>
        </div>
      ))}
    </section>
  );
};

export default CourseInformation;
