import mongoose, { ObjectId, Schema, Document } from "mongoose";

export interface feedbackInterface extends Document {
  feedback: string;
  star: number;
  refPath: "Student" | "Instructor" | "Admin";
  title: string;
  avatar: string;
  courseId: ObjectId;
  userId: ObjectId;
}

const feedbackSchema = new Schema<feedbackInterface, Document>(
  {
    feedback: { type: String, required: true },
    star: { type: Number, required: true },
    refPath: {
      type: String,
      required: true,
      enum: ["Student", "Instructor", "Admin"],
    },
    title: { type: String, required: true },
    avatar: { type: String, required: true },
    courseId: { type: Schema.Types.ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, refPath: "refPath" },
  },
  {
    timestamps: true,
  }
);

const feedbackModel =
  mongoose.models.Feedback ||
  mongoose.model<feedbackInterface>("Feedback", feedbackSchema);

export default feedbackModel;
