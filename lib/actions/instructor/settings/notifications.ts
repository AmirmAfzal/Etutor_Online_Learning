"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import instructorModel from "@/lib/db/models/instructorModel";

type ActionData<T = unknown> = {
  message: string;
  errors: string[];
  data?: T | null;
};

type NotificationsType = { [key: string]: boolean };

export async function notifications(
  prevState: ActionData<NotificationsType>,
  formData: NotificationsType
) {
  await connectDB();

  const session = await getServerSession(authOptions);

  const foundInstructor = await instructorModel.findOne({
    user: session?.user.id,
  });

  if (!foundInstructor) {
    return {
      message: "ERROR",
      errors: ["Instructor not found"],
    };
  }

  try {
    const updatedNotifications = await instructorModel.findByIdAndUpdate(
      foundInstructor._id,
      {
        notifications: {
          coursePurchased: formData.coursePurchased,
          CourseReview: formData.CourseReview,
          LectureComment: formData.LectureComment,
          LectureDownload: formData.LectureDownload,
          CommentReply: formData.CommentReply,
          ProfileVisit: formData.ProfileVisit,
          attachmentDownloaded: formData.attachmentDownloaded,
        },
      }
    );

    return {
      message: "SUCCESS",
      errors: [],
      data: JSON.parse(JSON.stringify(updatedNotifications.notifications)),
    };
  } catch (error) {
    console.error("Error updating notifications:", error);
    return {
      message: "ERROR",
      errors: [],
      data: null,
    };
  }
}
