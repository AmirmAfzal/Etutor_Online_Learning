import mongoose, { ObjectId, Schema, Document } from "mongoose";

export interface FeedbackInterface extends Document {
  feedback: string;
  star: number;
  refPath: "Student" | "Instructor" | "Admin";
  title: string;
  avatar: string;
  course: ObjectId;
  userId: ObjectId;
}

const feedbackSchema = new Schema<FeedbackInterface, Document>(
  {
    feedback: { type: String, required: true },
    star: { type: Number, required: false },
    refPath: {
      type: String,
      required: true,
      enum: ["Student", "Instructor", "Admin"],
    },
    title: { type: String, required: true },
    avatar: { type: String, required: true },
    course: { type: Schema.Types.ObjectId, required: true },
    userId: { type: Schema.Types.ObjectId, required: true, refPath: "refPath" },
  },
  {
    timestamps: true,
  }
);

const feedbackModel =
  mongoose.models.Feedback ||
  mongoose.model<FeedbackInterface>("Feedback", feedbackSchema);

export default feedbackModel;