"use server";

import { ActionData } from "@/lib/formTypes";
import { connectDB } from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import studentModel from "@/lib/db/models/studentModel";
import instructorModel from "@/lib/db/models/instructorModel";
import { Types } from "mongoose";
import feedbackModel from "@/lib/db/models/feedbackModel";
import { revalidatePath } from "next/cache";

interface SessionUser {
  id: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
}

interface UserProfile {
  _id: Types.ObjectId;
  firstname: string;
  lastname: string;
  avatar?: string;
}

export const addFeedbackAction = async (
  prevState: ActionData,
  formData: FormData
): Promise<ActionData> => {
  try {

    await connectDB();

    const session = await getServerSession(authOptions);

    const sessionUser = session?.user as SessionUser | undefined;

    if (!sessionUser?.id) {
      console.warn("⚠️ No session user found");
      return { message: "ERROR", errors: ["User not authenticated."] };
    }

    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      FormDataEntryValue
    >;

    const feedbackRaw = data.feedback?.toString() ?? "";
    const courseIdRaw = data.courseId?.toString() ?? "";
    const starRaw = data.star?.toString() ?? "5";


    if (!feedbackRaw.trim()) {
      console.warn("⚠️ Feedback text missing");
      return { message: "ERROR", errors: ["Feedback text is required."] };
    }

    if (!Types.ObjectId.isValid(courseIdRaw)) {
      console.warn("⚠️ Invalid course ID:", courseIdRaw);
      return { message: "ERROR", errors: ["A valid course ID is required."] };
    }

    const feedback = feedbackRaw.trim();
    const star = parseInt(starRaw, 10);
    const course = new Types.ObjectId(courseIdRaw);

    const userRole = sessionUser.role ?? "STUDENT";

    const refPathMap: Record<SessionUser["role"], string> = {
      STUDENT: "Student",
      INSTRUCTOR: "Instructor",
      ADMIN: "Admin",
    };

    const refPath = refPathMap[userRole];

    let userProfile: UserProfile | null = null;

    try {
      if (refPath === "Student") {
        userProfile = await studentModel
          .findOne({ user: sessionUser.id })
          .lean<UserProfile | null>();
      } else if (refPath === "Instructor") {
        userProfile = await instructorModel
          .findOne({ user: sessionUser.id })
          .lean<UserProfile | null>();
      } else if (refPath === "Admin") {
        userProfile = {
          _id: new Types.ObjectId(sessionUser.id),
          firstname: "Admin",
          lastname: "",
          avatar: "/default-avatar.png",
        };
      }
    } catch (e) {
      console.error("❌ Error fetching user profile:", e);
      return { message: "ERROR", errors: ["Failed to fetch user profile."] };
    }

    if (!userProfile?._id) {
      console.error("❌ User profile not found in DB for:", sessionUser);
      return { message: "ERROR", errors: ["User profile not found in database."] };
    }

    const userFullName = `${userProfile.firstname ?? ""} ${userProfile.lastname ?? ""}`.trim();
    const userAvatar = userProfile.avatar ?? "/default-avatar.png";



    const createFeedback = await feedbackModel.create({
      userId: userProfile._id,
      feedback,
      star,
      refPath,
      title: userFullName,
      course,
      avatar: userAvatar,
    });


    if (!createFeedback) {
      console.error("❌ Failed to create feedback");
      return { message: "ERROR", errors: ["Failed to create feedback."] };
    }

    revalidatePath(`/courses/${courseIdRaw}/watch`);

    return {
      message: "SUCCESS",
      data: JSON.parse(JSON.stringify(createFeedback)),
      errors: [],
    };
  } catch (error) {
    console.error("❌ Error creating feedback:", error);
    return {
      message: "ERROR",
      errors: ["An unexpected error occurred. Please try again later."],
    };
  }
};
