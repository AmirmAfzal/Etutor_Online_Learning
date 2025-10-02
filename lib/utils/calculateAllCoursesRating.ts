import mongoose from "mongoose";

import feedbackModel from "../db/models/feedbackModel";
import courseModel from "../db/models/courseModel";

export default async function calculateAllCoursesRating(
  instructorId: string,
  month: number,
  year: number
) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59, 999);
  const daysInMonth = end.getDate();

  const courses = await courseModel
    .find({
      authors: new mongoose.Types.ObjectId(instructorId),
    })
    .select("_id");

  if (!courses.length) {
    return {
      instructorId,
      averageRating: 0,
      totalFeedbacks: 0,
      dailyStats: Array.from({ length: daysInMonth }, (_, i) => ({
        date: new Intl.DateTimeFormat("en-US", {
          month: "short",
          day: "2-digit",
        }).format(new Date(year, month - 1, i + 1)),
        averageRating: 0,
        totalFeedbacks: 0,
      })),
      ratingDistribution: {
        5: { count: 0, percent: 0 },
        4: { count: 0, percent: 0 },
        3: { count: 0, percent: 0 },
        2: { count: 0, percent: 0 },
        1: { count: 0, percent: 0 },
      },
    };
  }

  const courseIds = courses.map((c) => c._id);

  const feedbacks = await feedbackModel.aggregate([
    {
      $match: {
        course: { $in: courseIds },
        star: { $exists: true, $ne: null },
        createdAt: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: null,
        averageRating: { $avg: "$star" },
        totalFeedbacks: { $sum: 1 },
      },
    },
  ]);

  const totalFeedbacks = feedbacks.length > 0 ? feedbacks[0].totalFeedbacks : 0;
  const averageRating = feedbacks.length > 0 ? feedbacks[0].averageRating : 0;

  const dailyFeedbacks = await feedbackModel.aggregate([
    {
      $match: {
        course: { $in: courseIds },
        star: { $exists: true, $ne: null },
        createdAt: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: { day: { $dayOfMonth: "$createdAt" } },
        averageRating: { $avg: "$star" },
        totalFeedbacks: { $sum: 1 },
      },
    },
    { $sort: { "_id.day": 1 } },
  ]);

  const feedbackMap: Record<
    number,
    { averageRating: number; totalFeedbacks: number }
  > = {};
  dailyFeedbacks.forEach((item) => {
    feedbackMap[item._id.day] = {
      averageRating: item.averageRating,
      totalFeedbacks: item.totalFeedbacks,
    };
  });

  const formatter = new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "2-digit",
  });

  const dailyStats = Array.from({ length: daysInMonth }, (_, i) => {
    const date = new Date(year, month - 1, i + 1);
    const stats = feedbackMap[i + 1] || { averageRating: 0, totalFeedbacks: 0 };
    return {
      date: formatter.format(date),
      averageRating: stats.averageRating,
      totalFeedbacks: stats.totalFeedbacks,
    };
  });

  const ratingDistributionData = await feedbackModel.aggregate([
    {
      $match: {
        course: { $in: courseIds },
        star: { $exists: true, $ne: null },
        createdAt: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: "$star",
        count: { $sum: 1 },
      },
    },
  ]);

  const ratingDistribution: Record<number, { count: number; percent: number }> =
    {};
  for (let i = 1; i <= 5; i++) {
    const item = ratingDistributionData.find((r) => r._id === i);
    const count = item ? item.count : 0;
    const percent = totalFeedbacks > 0 ? (count / totalFeedbacks) * 100 : 0;
    ratingDistribution[i] = { count, percent };
  }

  return {
    instructorId: instructorId.toString(),
    averageRating,
    totalFeedbacks,
    dailyStats,
    ratingDistribution,
  };
}
