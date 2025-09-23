import { connectDB } from "../db/db";
import courseModel from "../db/models/courseModel";
import purchaseHistoryModel from "../db/models/purchaseHistoryModel";

export async function studentsEnrolledCount(courseId: string) {
  await connectDB();

  const course = await courseModel.findById(courseId);
  const purchaseHistories = await purchaseHistoryModel.find();

  return purchaseHistories.reduce((total, purchase) => {
    const matchingCourses = purchase.courses.includes(String(course._id));

    if (matchingCourses) {
      total++;
    }

    return total;
  }, 0);
}
