import mongoose from "mongoose";

import sectionModel from "../db/models/sectionModel";

export async function countLecturesOfCourse(courseId: string) {
  const result = await sectionModel.aggregate([
    { $match: { course: new mongoose.Types.ObjectId(courseId) } },
    {
      $lookup: {
        from: "lectures",
        localField: "lectures",
        foreignField: "_id",
        as: "lectureDetails",
      },
    },
    {
      $unwind: "$lectureDetails",
    },
    {
      $group: {
        _id: null,
        totalLectures: { $sum: 1 },
      },
    },
  ]);

  return result[0]?.totalLectures ?? 0;
}
