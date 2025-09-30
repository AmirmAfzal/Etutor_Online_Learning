import mongoose from "mongoose";

import commentModel from "../db/models/commentModel";

export async function getInstructorDailyComments(
  instructorId: string,
  month: number,
  year: number
) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59, 999);
  const daysInMonth = end.getDate();

  const result = await commentModel.aggregate([
    {
      $match: {
        createdAt: { $gte: start, $lte: end },
      },
    },
    {
      $lookup: {
        from: "lectures",
        localField: "lecture",
        foreignField: "_id",
        as: "lecture",
      },
    },
    { $unwind: "$lecture" },
    {
      $lookup: {
        from: "sections",
        localField: "lecture.section",
        foreignField: "_id",
        as: "section",
      },
    },
    { $unwind: "$section" },
    {
      $lookup: {
        from: "courses",
        localField: "section.course",
        foreignField: "_id",
        as: "course",
      },
    },
    { $unwind: "$course" },
    {
      $match: {
        "course.authors": new mongoose.Types.ObjectId(instructorId),
      },
    },
    {
      $group: {
        _id: { day: { $dayOfMonth: "$createdAt" } },
        totalComments: { $sum: 1 },
      },
    },
    { $sort: { "_id.day": 1 } },
  ]);

  const commentMap: Record<number, number> = {};
  result.forEach((item) => {
    commentMap[item._id.day] = item.totalComments;
  });

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  });

  const fullData = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month - 1, i + 1);
    return {
      day: formatter.format(date),
      comments: commentMap[i + 1] || 0,
    };
  });

  return fullData;
}
