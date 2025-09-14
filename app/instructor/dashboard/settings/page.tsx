import { getServerSession } from "next-auth";

import AccountSettings from "@/components/instructor-dashboard/settings/AccountSettings";
import Changepassword from "@/components/instructor-dashboard/settings/Changepassword";
import Notifications from "@/components/instructor-dashboard/settings/Notifications";
import SocialProfile from "@/components/instructor-dashboard/settings/SocialProfile";
import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import instructorModel from "@/lib/db/models/instructorModel";

const SettingsPage = async () => {
  await connectDB();

  const session = await getServerSession(authOptions);

  const foundInstructor = await instructorModel
    .findOne({ user: session?.user.id })
    .lean();
  const plainInstructor = JSON.parse(JSON.stringify(foundInstructor));
  return (
    <section className="bg-base-200 space-y-6 p-6">
      <AccountSettings instructor={plainInstructor} />
      <SocialProfile instructor={plainInstructor} />
      <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-2">
        <Notifications />
        <Changepassword />
      </div>
    </section>
  );
};

export default SettingsPage;
