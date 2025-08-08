import AccountSettingsForm from "@/components/Student/student-settings/AccountSettingsForm";
import PasswordSettingsForm from "@/components/Student/student-settings/PasswordSettingsForm";
import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import studentModel, { StudentInterface } from "@/lib/db/models/studentModel";
import userModel, { UserInterface } from "@/lib/db/models/userModel";
import _ from "lodash";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const StudentSettingsPage = async () => {
  const userId = "USER_ID_FROM_AUTH";
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/auth/signin");
  const foundUser: UserInterface | null = await userModel.findOne({
    _id: session?.user.id,
  });

  if (!foundUser) return redirect("/auth/signin");
  const foundStudent: StudentInterface | null = await studentModel.findOne({
    user: foundUser._id,
  });
  if (!foundStudent) return redirect("/auth/signin");

  return (
    <div className="bg-base-100 mt-6 max-w-5xl">
      <h3 className="mb-6 text-lg font-semibold">Account settings</h3>
      <AccountSettingsForm
        _id={foundUser._id.toString()}
        firstName={foundStudent.firstname}
        lastName={foundStudent.lastname}
        email={foundUser.email}
        title={foundStudent.bio}
        username={foundStudent.username}
      />

      <h3 className="mb-6 text-lg font-semibold">Change Password</h3>
      <PasswordSettingsForm />
    </div>
  );
};

export default StudentSettingsPage;
