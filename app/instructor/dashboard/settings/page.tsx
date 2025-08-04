import AccountSettings from "@/components/instructor-dashboard/settings/AccountSettings";
import Changepassword from "@/components/instructor-dashboard/settings/Changepassword";
import Notifications from "@/components/instructor-dashboard/settings/Notifications";
import SocialProfile from "@/components/instructor-dashboard/settings/SocialProfile";

type Props = {};

const SettingsPage = (props: Props) => {
  return (
    <section className="bg-base-200 space-y-6 p-6">
      <AccountSettings />
      <SocialProfile />
      <div className="container mx-auto grid grid-cols-2 gap-6">
        <Notifications />
        <Changepassword />
      </div>
    </section>
  );
};

export default SettingsPage;
