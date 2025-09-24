import mongoose from "mongoose";

import purchaseHistoryModel from "../db/models/purchaseHistoryModel";

export async function getCourseDailyIncome(
  courseId: string,
  month: number,
  year: number
) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59, 999);
  const daysInMonth = end.getDate();

  const result = await purchaseHistoryModel.aggregate([
    {
      $match: {
        courses: new mongoose.Types.ObjectId(courseId),
        createdAt: { $gte: start, $lte: end },
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

  // formatter for 1 => "Sep 01"
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
