import AccountSettings from "@/components/instructor-dashboard/settings/AccountSettings";
import Changepassword from "@/components/instructor-dashboard/settings/Changepassword";
import Notifications from "@/components/instructor-dashboard/settings/Notifications";
import SocialProfile from "@/components/instructor-dashboard/settings/SocialProfile";

const SettingsPage = () => {
  return (
    <section className="bg-base-200 space-y-6 p-6">
      <AccountSettings />
      <SocialProfile />
      <div className="container mx-auto grid grid-cols-1 gap-6 md:grid-cols-2">
        <Notifications />
        <Changepassword />
      </div>
    </section>
  );
};

export default SettingsPage;
