import mongoose from "mongoose";

import feedbackModel from "../db/models/feedbackModel";

export default async function calculateCourseRating(
  courseId: string,
  month: number,
  year: number
) {
  const start = new Date(year, month - 1, 1);
  const end = new Date(year, month, 0, 23, 59, 59, 999);
  const daysInMonth = end.getDate();

  const feedbacks = await feedbackModel.aggregate([
    {
      $match: {
        course: new mongoose.Types.ObjectId(courseId),
        star: { $exists: true, $ne: null },
        createdAt: { $gte: start, $lte: end },
      },
    },
    {
      $group: {
        _id: "$course",
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
        course: new mongoose.Types.ObjectId(courseId),
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
      averageRating: Number(stats.averageRating.toFixed(1)),
      totalFeedbacks: stats.totalFeedbacks,
    };
  });

  const ratingDistributionData = await feedbackModel.aggregate([
    {
      $match: {
        course: new mongoose.Types.ObjectId(courseId),
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

  if (feedbacks.length > 0) {
    return {
      courseId: feedbacks[0]._id.toString(),
      averageRating,
      totalFeedbacks,
      dailyStats,
      ratingDistribution,
    };
  } else {
    return {
      courseId: courseId.toString(),
      averageRating: 0,
      totalFeedbacks: 0,
      dailyStats,
      ratingDistribution: {
        5: { count: 0, percent: 0 },
        4: { count: 0, percent: 0 },
        3: { count: 0, percent: 0 },
        2: { count: 0, percent: 0 },
        1: { count: 0, percent: 0 },
      },
    };
  }
}
