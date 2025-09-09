import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

import InstructorOverview from "@/components/instructor-dashboard/InstructorOverview";
import Bannar from "@/components/instructor-dashboard/Bannar";
import RecentActivity from "@/components/instructor-dashboard/RecentActivity";
import RevenueView from "@/components/instructor-dashboard/RevenueView";
import EarningView from "@/components/instructor-dashboard/EarningView";
import CourseRating from "@/components/instructor-dashboard/CourseRating";
import CourseOverview from "@/components/instructor-dashboard/CourseOverview";
import { authOptions } from "@/lib/auth/authOptions";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);
  if (!session?.user.id) {
    redirect("/auth/signin");
  }

  return (
    <section className="bg-base-200 space-y-6 p-4">
      <InstructorOverview />
      <Bannar />
      <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-12">
        <div className="col-span-1 h-auto w-full md:col-span-4">
          <RecentActivity />
        </div>
        <div className="col-span-1 h-auto w-full md:col-span-5">
          <RevenueView stroke="#564FFD" fill="#EBEBFF" height={320} />
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
