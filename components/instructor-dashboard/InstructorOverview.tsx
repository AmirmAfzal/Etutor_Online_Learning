import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import { connectDB } from "@/lib/db/db";
import instructorModel from "@/lib/db/models/instructorModel";
import { authOptions } from "@/lib/auth/authOptions";
import courseModel from "@/lib/db/models/courseModel";
import studentModel from "@/lib/db/models/studentModel";
import purchaseHistoryModel from "@/lib/db/models/purchaseHistoryModel";

import Icon from "../ui/Icon";

export async function calculateInstructorIncome(instructorId: string) {
  const result = await purchaseHistoryModel.aggregate([
    {
      $lookup: {
        from: "courses",
        localField: "courses",
        foreignField: "_id",
        as: "courseDetails",
      },
    },
    { $unwind: "$courseDetails" },

    {
      $match: {
        "courseDetails.authors": instructorId,
      },
    },

    {
      $group: {
        _id: instructorId,
        totalIncome: { $sum: "$courseDetails.price" },
        totalCoursesSold: { $sum: 1 },
      },
    },
  ]);

  if (result.length === 0)
    return {
      totalIncome: 0,
      totalCoursesSold: 0,
      instructorShare: 0,
      siteShare: 0,
    };
  const totalIncome = result[0].totalIncome;

  return {
    ...result[0],
    instructorShare: totalIncome * 0.8,
    siteShare: totalIncome * 0.2,
  };
}

const InstructorOverview = async () => {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    redirect("/auth/signin");
  }
  const instructor = await instructorModel.findOne({ user: session.user.id });
  const student = await studentModel.findOne({ user: session.user.id });
  const courses = await courseModel.find().lean();

  const courseInstructorCount = () => {
    let count = 0;
    courses.map((course) => {
      course.instructors.map((courseInstructor: { name: string }) => {
        if (
          courseInstructor.name.toLowerCase() ===
          `${instructor?.firstname} ${instructor?.lastname}`.toLowerCase()
        ) {
          count++;
        }
      });
    });
    return count;
  };

  const income = await calculateInstructorIncome(instructor._id);

  const overviewData = [
    {
      icon: "ph:play-circle-duotone",
      name: "Enrolled Courses",
      value: String(student?.courses?.length || 0),
      bg: "bg-[#FFEEE8]",
      color: "text-[#FF6636]",
    },
    {
      icon: "ph:check-square-offset-duotone",
      name: "Active Courses",
      value: String(instructor?.courses?.length || 0),
      bg: "bg-[#EBEBFF]",
      color: "text-[#564FFD]",
    },
    {
      icon: "ph:users-duotone",
      name: "Course Instructors",
      value: String(courseInstructorCount()),
      bg: "bg-[#FFF2E5]",
      color: "text-[#FD8E1F]",
    },
    {
      icon: "ph:trophy-duotone",
      name: "Completed Courses",
      value: "951",
      bg: "bg-[#E1F7E3]",
      color: "text-[#23BD33]",
    },
    {
      icon: "ph:user-circle-duotone",
      name: "Students",
      value: String(instructor?.students || 0),
      bg: "bg-[#FFF0F0]",
      color: "text-[#E34444]",
    },
    {
      icon: "ph:notepad-duotone",
      name: "Online Courses",
      value: String(instructor?.courses?.length || 0),
      bg: "bg-[#E1F7E3]",
      color: "text-[#23BD33]",
    },
    {
      icon: "ph:credit-card-duotone",
      name: "USD Total Earning",
      value: `$${income.instructorShare.toLocaleString("en-US")}`,
      bg: "bg-[#F5F7FA]",
      color: "text-[#1D2026]",
    },
    {
      icon: "ph:stack-duotone",
      name: "Course Sold",
      value: income.totalCoursesSold,
      bg: "bg-[#EBEBFF]",
      color: "text-[#564FFD]",
    },
  ];
  return (
    <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
      {overviewData.map((data) => (
        <div
          key={data.name}
          className="bg-base-100 flex flex-row items-center gap-4 p-4"
        >
          <div
            className={`flex h-16 w-16 items-center justify-center ${data.bg}`}
          >
            <Icon
              icon={data.icon}
              className={data.color}
              width="32"
              height="32"
            />
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-semibold">{data.value}</p>
            <p className="text-base-content/80 text-xs">{data.name}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default InstructorOverview;
