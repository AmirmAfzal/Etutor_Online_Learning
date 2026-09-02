import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import InstructorOverview from "@/components/instructor-dashboard/InstructorOverview";
import Banner from "@/components/instructor-dashboard/Banner";
import RecentActivity from "@/components/instructor-dashboard/RecentActivity";
import Statistic from "@/components/instructor-dashboard/earning/Statistic";
import EarningView from "@/components/instructor-dashboard/EarningView";
import CourseRating from "@/components/instructor-dashboard/CourseRating";
import CourseOverview from "@/components/instructor-dashboard/CourseOverview";
import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import instructorModel from "@/lib/db/models/instructorModel";
import courseModel from "@/lib/db/models/courseModel";

export const dynamic = "force-dynamic";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    redirect("/auth/signin");
  }

  await connectDB();
  const instructor = await instructorModel.findOne({ user: session.user.id });
  if (!instructor) {
    redirect("/auth/signin");
  }

  const courseCount = await courseModel.countDocuments({
    authors: instructor._id,
  });

  return (
    <section className="bg-base-200 space-y-6 p-4">
      <InstructorOverview
        courseCount={courseCount}
        studentCount={instructor.students || 0}
      />
      <Banner />
      <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="col-span-1 h-auto w-full md:col-span-4">
          <RecentActivity />
        </div>
        <div className="col-span-1 h-auto w-full md:col-span-5">
          <Statistic stroke="#564FFD" fill="#EBEBFF" height={320} />
        </div>
        <div className="col-span-1 h-auto w-full md:col-span-3">
          <EarningView />
        </div>
        <div className="col-span-1 h-auto w-full md:col-span-5">
          <CourseRating />
        </div>
        <div className="col-span-1 h-auto w-full md:col-span-7">
          <CourseOverview />
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;
