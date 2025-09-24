import mongoose from "mongoose";

import purchaseHistoryModel from "../db/models/purchaseHistoryModel";

export async function getInstructorDailyIncome(
  instructorId: string,
  month: number,
  year: number
) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59, 999);
  const daysInMonth = end.getDate();

  const result = await purchaseHistoryModel.aggregate([
    {
      $match: {
        createdAt: { $gte: start, $lte: end },
      },
    },
    {
      $lookup: {
        from: "courses",
        localField: "courses",
        foreignField: "_id",
        as: "courseDocs",
      },
    },
    {
      $match: {
        "courseDocs.authors": new mongoose.Types.ObjectId(instructorId),
      },
    },
    {
      $group: {
        _id: { day: { $dayOfMonth: "$createdAt" } },
        totalIncome: { $sum: "$summary.price" },
      },
    },
    { $sort: { "_id.day": 1 } },
  ]);

  const incomeMap: Record<number, number> = {};
  result.forEach((item) => {
    incomeMap[item._id.day] = item.totalIncome;
  });

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  });

  const fullData = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month - 1, i + 1);
    return {
      day: formatter.format(date),
      income: incomeMap[i + 1] || 0,
    };
  });

  return fullData;
}
