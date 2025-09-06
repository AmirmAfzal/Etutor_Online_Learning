"use server";

import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import commentModel from "@/lib/db/models/commentModel";
import instructorModel from "@/lib/db/models/instructorModel";
import studentModel from "@/lib/db/models/studentModel";
import { ActionData } from "@/lib/formTypes";
import { getServerSession } from "next-auth";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

export const createCommentAction = async (
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
    const commentRaw = data.comment as string;
    // FIXME : fix the lectureId
    const lectureIdRaw =
      (data.lectureId as string) || "68b479971dbb5cb95ee91f4f";

    if (!commentRaw || commentRaw.trim().length === 0) {
      return {
        message: "ERROR",
        errors: ["Comment text is required."],
      };
    }
    const comment = commentRaw.trim();

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

    const userAvatar =
      userProfile.avatar ||
      (session.user as any)?.image ||
      "/default-avatar.png";
    const userId = userProfile._id;

    if (!lectureIdRaw || !Types.ObjectId.isValid(lectureIdRaw)) {
      return {
        message: "ERROR",
        errors: ["A valid lecture ID is required."],
      };
    }
    const lecture = new Types.ObjectId(lectureIdRaw);

    const createComment = await commentModel.create({
      userId: userId,
      comment: comment,
      refPath: refPath,
      title: userFullName,
      lecture: lecture, // Now a valid ObjectId
      // name: userFullName,
      avatar: userAvatar,
    });

    if (!createComment) {
      return {
        message: "ERROR",
        errors: ["Failed to create comment."],
      };
    }
    // FIXME : fix this path
    revalidatePath(
      "http://localhost:3000/courses/688a44038e96d020b5889ea2/watch"
    );

    return {
      message: "SUCCESS",
      data: JSON.parse(JSON.stringify(createComment)),
      errors: [],
    };
  } catch (error) {
    console.error("Error creating comment:", error);
    return {
      message: "ERROR",
      errors: ["An unexpected error occurred. Please try again later."],
    };
  }
};
