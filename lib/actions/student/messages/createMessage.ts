"use server";

import { ActionData } from "@/lib/formTypes";
import { connectDB } from "@/lib/db/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth/authOptions";
import messageModel from "@/lib/db/models/messageModel";
import studentModel from "@/lib/db/models/studentModel";
import instructorModel from "@/lib/db/models/instructorModel";
import { Types } from "mongoose";
import { revalidatePath } from "next/cache";

interface SessionUser {
  id: string;
  role: "STUDENT" | "INSTRUCTOR";
}

interface UserProfile {
  _id: Types.ObjectId;
  firstname?: string;
  lastname?: string;
  avatar?: string;
}

const DEFAULT_AVATAR = "/default-avatar.png";

export const createMessageAction = async (
  prevState: ActionData,
  formData: FormData
): Promise<ActionData> => {
  try {
    await connectDB();

    const session = await getServerSession(authOptions);
    const sessionUser = session?.user as SessionUser | undefined;

    if (!sessionUser?.id || !sessionUser?.role) {
      return {
        message: "ERROR",
        errors: ["User not authenticated or role not found."],
      };
    }

    const messageRaw = formData.get("message")?.toString() ?? "";

    if (!messageRaw.trim()) {
      return {
        message: "ERROR",
        errors: ["Message text is required."],
      };
    }

    const sanitizedMessage = messageRaw.trim();

    let userProfile: UserProfile | null = null;
    let senderId: Types.ObjectId | null = null;

    if (sessionUser.role === "STUDENT") {
      const studentResult = await studentModel
        .findOne({ user: sessionUser.id })
        .lean<UserProfile>();
      if (studentResult) {
        userProfile = studentResult;
        senderId = studentResult._id;
      }
    } else if (sessionUser.role === "INSTRUCTOR") {
      const instructorResult = await instructorModel
        .findOne({ user: sessionUser.id })
        .lean<UserProfile>();
      if (instructorResult) {
        userProfile = instructorResult;
        senderId = instructorResult._id;
      }
    }

    if (!userProfile || !senderId) {
      console.error("User profile not found for session user:", sessionUser);
      return {
        message: "ERROR",
        errors: ["User profile not found in database."],
      };
    }

    const userFullName =
      `${userProfile.firstname ?? ""} ${userProfile.lastname ?? ""}`.trim();
    const userAvatar = userProfile.avatar ?? DEFAULT_AVATAR;


    // FIXME : fix student , instructor id
    const messageData = {
      message: sanitizedMessage,
      name: userFullName,
      avatar: userAvatar,
      sender: sessionUser.role,
      student: sessionUser.role === "STUDENT" ? senderId : new Types.ObjectId(),
      instructor:
        sessionUser.role === "INSTRUCTOR" ? senderId : new Types.ObjectId(),
    };

    const createMessage = await messageModel.create(messageData);

    if (!createMessage) {
      return {
        message: "ERROR",
        errors: ["Failed to create message."],
      };
    }

    console.log(
      "Message sent successfully",
      JSON.parse(JSON.stringify(createMessage))
    );

    revalidatePath("student/messages")

    return {
      message: "SUCCESS",
      data: JSON.parse(JSON.stringify(createMessage)),
      errors: [],
    };
  } catch (error: unknown) {
    console.error("Error creating message:", error);
    return {
      message: "ERROR",
      errors: ["An unexpected error occurred. Please try again later."],
    };
  }
};
