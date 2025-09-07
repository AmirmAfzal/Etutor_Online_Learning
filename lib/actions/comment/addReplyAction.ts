"use server";
import { ActionData } from "@/lib/formTypes";
import { connectDB } from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import studentModel from "@/lib/db/models/studentModel";
import instructorModel from "@/lib/db/models/instructorModel";
import { revalidatePath } from "next/cache";
import replyModel from "@/lib/db/models/replyModel";
import mongoose, { Types } from "mongoose";
import commentModel from "@/lib/db/models/commentModel";

export const addReplyAction = async (
  prevState: ActionData,
  formData: FormData
): Promise<ActionData> => {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    if (!session || !session.user || !session.user.id) {
      return {
        message: "ERROR",
        errors: ["User not authenticated."],
      };
    }

    const data = Object.fromEntries(formData.entries());
    const replyText = data.reply as string;
    const commentId = data.comment as string;

    if (!replyText || replyText.trim().length === 0) {
      return {
        message: "ERROR",
        errors: ["Comment text is required."],
      };
    }
    const reply = replyText.trim();

    if (!commentId || !mongoose.Types.ObjectId.isValid(commentId)) {
      return {
        message: "ERROR",
        errors: ["A valid comment ID is required."],
      };
    }

    const userRole = (session.user as any)?.role || "student";
    const refPathMap: Record<string, "Student" | "Instructor" | "Admin"> = {
      student: "Student",
      instructor: "Instructor",
      admin: "Admin",
    };
    const refPath = refPathMap[userRole.toString().toLowerCase()] || "Student";

    let userProfile: any = null;
    try {
      if (refPath === "Student") {
        const studentResult = await studentModel
          .find({ user: session.user.id })
          .lean();
        userProfile = studentResult.length > 0 ? studentResult[0] : null;
      } else if (refPath === "Instructor") {
        const instructorResult = await instructorModel
          .find({ user: session.user.id })
          .lean();
        userProfile = instructorResult.length > 0 ? instructorResult[0] : null;
      }
    } catch (e) {
      console.error("Error fetching user profile:", e);
      return {
        message: "ERROR",
        errors: ["Failed to fetch user profile."],
      };
    }

    if (!userProfile || !userProfile._id) {
      console.error(
        "User profile not found in database for session user:",
        session.user
      );
      return {
        message: "ERROR",
        errors: ["User profile not found in database."],
      };
    }

    const userFullName =
      `${userProfile.firstname || ""} ${userProfile.lastname || ""}`.trim();

    const userAvatar: string =
      userProfile.avatar ||
      (session.user as any)?.image ||
      "/default-avatar.png";

    const userId: mongoose.Types.ObjectId = userProfile._id;

    const createReply = await replyModel.create({
      reply: replyText,
      refPath: refPath,
      title: userFullName,
      avatar: userAvatar,
      userId: userId,
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
  } catch (error) {
    console.error("Error creating Reply:", error);
    return {
      message: "ERROR",
      errors: ["An unexpected error occurred. Please try again later."],
    };
  }
};
