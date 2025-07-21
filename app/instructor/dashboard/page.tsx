import InstructorOverview from "@/components/instructor-dashboard/InstructorOverview";
import Bannar from "@/components/instructor-dashboard/Bannar";
import RecentActivity from "@/components/instructor-dashboard/RecentActivity";
import Revenue from "@/components/instructor-dashboard/RevenueView";
import EarningView from "@/components/instructor-dashboard/EarningView";
import CourseRating from "@/components/instructor-dashboard/CourseRating";
import CourseOverview from "@/components/instructor-dashboard/CourseOverview";

const DashboardPage = () => {
  return (
    <section className="bg-base-200 space-y-6 p-4">
      <InstructorOverview />
      <Bannar />
      <div className="container mx-auto grid grid-cols-12 gap-6">
        <div className="col-span-4 h-auto w-full">
          <RecentActivity />
        </div>
        <div className="col-span-5 h-auto w-full">
          <Revenue />
        </div>
        <div className="col-span-3 h-auto w-full">
          <EarningView />
        </div>
        <div className="col-span-5 h-auto w-full">
          <CourseRating />
        </div>
        <div className="col-span-7 h-auto w-full">
          <CourseOverview />  
        </div>
      </div>
    </section>
  );
};

export default DashboardPage;