import mongoose from "mongoose";

import purchaseHistoryModel from "@/lib/db/models/purchaseHistoryModel";

export async function getCourseRevenue(courseId: string, coursePrice: number) {
  const id = new mongoose.Types.ObjectId(courseId);

  const purchaseCount = await purchaseHistoryModel.countDocuments({
    courses: id,
  });

  const totalRevenue = purchaseCount * coursePrice;

  return {
    courseId: id,
    coursePrice,
    purchaseCount,
    totalRevenue,
  };
}
