import AccountSettingsForm from "@/components/Student/student-settings/AccountSettingsForm";
import PasswordSettingsForm from "@/components/Student/student-settings/PasswordSettingsForm";

const StudentSettingsPage = async () => {
  const userId = "USER_ID_FROM_AUTH";

  return (
    <div className="bg-base-100 max-w-5xl">
      <h3 className="mb-6 text-lg font-semibold">Account settings</h3>
      <AccountSettingsForm userId={userId} />

      <h3 className="mb-6 text-lg font-semibold">Change Password</h3>
      <PasswordSettingsForm />
    </div>
  );
};

export default StudentSettingsPage;
