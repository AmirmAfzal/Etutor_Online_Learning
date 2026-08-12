"use server";

import { getServerSession } from "next-auth";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import commentModel from "@/lib/db/models/commentModel";
import instructorModel from "@/lib/db/models/instructorModel";
import studentModel from "@/lib/db/models/studentModel";
import { ActionData } from "@/lib/formTypes";

interface SessionUser {
  id: string;
  email: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
  name?: string;
}

interface UserProfile {
  _id: Types.ObjectId;
  firstname?: string;
  lastname?: string;
  avatar: string;
}

export const createCommentAction = async (
  prevState: ActionData,
  formData: FormData
): Promise<ActionData> => {
  try {
    await connectDB();

    // get lecture id from search params

    const session = await getServerSession(authOptions);
    const sessionUser = session?.user as SessionUser | undefined;

    if (!sessionUser?.id) {
      return {
        message: "ERROR",
        errors: ["User not authenticated."],
      };
    }

    const data = Object.fromEntries(formData.entries()) as Record<
      string,
      FormDataEntryValue
    >;

    const commentRaw = data.comment?.toString() ?? "";
    const lectureIdRaw =
      data.lectureId?.toString() || "";

    if (!commentRaw.trim()) {
      return {
        message: "ERROR",
        errors: ["Comment text is required."],
      };
    }

    const comment = commentRaw.trim();

    const userRole = sessionUser?.role ?? "STUDENT";

    const refPathMap= {
      STUDENT: "Student",
      INSTRUCTOR: "Instructor",
      ADMIN: "Admin",
    };

    const refPath = refPathMap[userRole];

    let userProfile: UserProfile | null = null;
    try {
      if (refPath === "Student") {
        const studentResult = await studentModel
          .findOne({ user: sessionUser.id })
          .lean<UserProfile>();
        userProfile = studentResult ?? null;
      } else if (refPath === "Instructor") {
        const instructorResult = await instructorModel
          .findOne({ user: sessionUser.id })
          .lean<UserProfile>();
        userProfile = instructorResult ?? null;
      }
    } catch (e: unknown) {
      console.error("Error fetching user profile:", e);
      return {
        message: "ERROR",
        errors: ["Failed to fetch user profile."],
      };
    }

    if (!userProfile?._id) {
      console.error(
        "User profile not found in database for session user:",
        sessionUser
      );
      return {
        message: "ERROR",
        errors: ["User profile not found in database."],
      };
    }

    const userFullName =
      `${userProfile?.firstname ?? ""} ${userProfile?.lastname ?? ""}`.trim();

    const userAvatar =
      userProfile?.avatar  ?? "/default-avatar.png";

    if (!Types.ObjectId.isValid(lectureIdRaw)) {
      return {
        message: "ERROR",
        errors: ["A valid lecture ID is required."],
      };
    }

    const lecture = new Types.ObjectId(lectureIdRaw);

    const createComment = await commentModel.create({
      userId: userProfile?._id,
      comment,
      refPath,
      title: userFullName,
      lecture : lecture,
      avatar: userAvatar,
    });

    if (!createComment) {
      return {
        message: "ERROR",
        errors: ["Failed to create comment."],
      };
    }

    revalidatePath("/courses/[id]/watch");

    return {
      message: "SUCCESS",
      messageDetail: "Comment added successfully.",
      data: JSON.parse(JSON.stringify(createComment)),
      errors: [],
    };
  } catch (error: unknown) {
    console.error("Error creating comment:", error);
    return {
      message: "ERROR",
      errors: ["An unexpected error occurred. Please try again later."],
    };
  }
};
