"use server";
import { ActionData } from "@/lib/formTypes";
import { connectDB } from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import studentModel from "@/lib/db/models/studentModel";
import instructorModel from "@/lib/db/models/instructorModel";
import { revalidatePath } from "next/cache";
import replyModel from "@/lib/db/models/replyModel";
import mongoose from "mongoose";
import commentModel from "@/lib/db/models/commentModel";

interface SessionUser {
  id: string;
  email?: string;
  name?: string;
  image?: string;
  role: "STUDENT" | "INSTRUCTOR" | "ADMIN";
}

interface UserProfile {
  _id: mongoose.Types.ObjectId;
  firstname?: string;
  lastname?: string;
  avatar?: string;
}

export const addReplyAction = async (
  prevState: ActionData,
  formData: FormData
): Promise<ActionData> => {
  try {
    await connectDB();

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

    const replyText = data.reply?.toString().trim();
    const commentId = data.comment?.toString();

    if (!replyText) {
      return {
        message: "ERROR",
        errors: ["Comment text is required."],
      };
    }

    if (!commentId || !mongoose.Types.ObjectId.isValid(commentId)) {
      return {
        message: "ERROR",
        errors: ["A valid comment ID is required."],
      };
    }

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
          .find({ user: sessionUser.id })
          .lean<UserProfile[]>();
        userProfile = studentResult[0] ?? null;
      } else if (refPath === "Instructor") {
        const instructorResult = await instructorModel
          .find({ user: sessionUser.id })
          .lean<UserProfile[]>();
        userProfile = instructorResult[0] ?? null;
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
      `${userProfile.firstname ?? ""} ${userProfile.lastname ?? ""}`.trim();

    const userAvatar =
      userProfile.avatar ?? sessionUser.image ?? "/default-avatar.png";

    const createReply = await replyModel.create({
      reply: replyText,
      refPath,
      title: userFullName,
      avatar: userAvatar,
      userId: userProfile._id,
      comment: commentId,
    });

    if (!createReply) {
      return {
        message: "ERROR",
        errors: ["Failed to create reply."],
      };
    }

    await commentModel.findByIdAndUpdate(commentId, {
      $push: { replies: createReply._id },
    });

    // FIXME : fix this path
    revalidatePath(
      "http://localhost:3000/courses/688a44038e96d020b5889ea2/watch"
    );

    return {
      message: "SUCCESS",
      data: JSON.parse(JSON.stringify(createReply)),
      errors: [],
    };
  } catch (error: unknown) {
    console.error("Error creating Reply:", error);
    return {
      message: "ERROR",
      errors: ["An unexpected error occurred. Please try again later."],
    };
  }
};
