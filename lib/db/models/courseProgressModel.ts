import mongoose, { Schema, Document, Types } from "mongoose";

export interface CourseProgressInterface extends Document {
  user: Types.ObjectId;
  course: Types.ObjectId;
  lecture: Types.ObjectId;
  completed: boolean;
  completedAt?: Date;
}

const courseProgressSchema = new Schema<CourseProgressInterface & Document>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    course: { type: Schema.Types.ObjectId, ref: "Course", required: true },
    lecture: { type: Schema.Types.ObjectId, ref: "Lecture", required: true },
    completed: { type: Boolean, default: false },
    completedAt: { type: Date },
  },
  {
    timestamps: true,
  }
);

const courseProgressModel =
  mongoose.models.courseProgress ||
  mongoose.model<CourseProgressInterface>(
    "courseProgress",
    courseProgressSchema
  );

export default courseProgressModel;
