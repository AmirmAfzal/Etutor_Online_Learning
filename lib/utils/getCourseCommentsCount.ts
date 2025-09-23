import mongoose from "mongoose";

import sectionModel from "../db/models/sectionModel";
import commentModel from "../db/models/commentModel";

export async function getCourseCommentsCount(courseId: string) {
  const id = new mongoose.Types.ObjectId(courseId);

  const sections = await sectionModel.find({ course: id }, { lectures: 1 });

  const lectureIds: mongoose.Types.ObjectId[] = [];
  sections.forEach((section) => {
    if (section.lectures && section.lectures.length > 0) {
      for (const lec of section.lectures as (
        | mongoose.Types.ObjectId
        | string
      )[]) {
        lectureIds.push(new mongoose.Types.ObjectId(lec));
      }
    }
  });

  if (lectureIds.length === 0) return 0;

  const commentsCount = await commentModel.countDocuments({
    lecture: { $in: lectureIds },
  });

  return commentsCount;
}
