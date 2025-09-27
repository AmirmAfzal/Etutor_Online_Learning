"use server";

import { getServerSession } from "next-auth";

import { authOptions } from "@/lib/auth/authOptions";
import { connectDB } from "@/lib/db/db";
import instructorModel, {
  InstructorInterface,
} from "@/lib/db/models/instructorModel";

export async function getUserNotifications() {
  await connectDB();
  const session = await getServerSession(authOptions);

  const foundInstructor = (await instructorModel
    .findOne({
      user: session?.user.id,
    })
    .lean()) as InstructorInterface | null;

  if (!foundInstructor) {
    return {
      coursePurchased: false,
      CourseReview: false,
      LectureComment: false,
      LectureDownload: false,
      CommentReply: false,
      ProfileVisit: false,
      attachmentDownloaded: false,
    };
  }

  return JSON.parse(JSON.stringify(foundInstructor.notifications));
}
