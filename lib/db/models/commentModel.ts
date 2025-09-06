import mongoose, { ObjectId, Schema, Document } from "mongoose";

export interface CommentInterface extends Document {
  comment: string;
  refPath: "Student" | "Instructor" | "Admin";
  lecture: ObjectId;
  title: string;
  avatar: string;
  replies: ObjectId[];
  userId: ObjectId;
}

const commentSchema = new Schema<CommentInterface, Document>(
  {
    comment: { type: String, required: true },
    refPath: {
      type: String,
      required: true,
      enum: ["Student", "Instructor", "Admin"],
    },
    userId: { type: Schema.Types.ObjectId, required: true, refPath: "refPath" },
    title: { type: String, required: true },
    avatar: { type: String, required: true },
    lecture: { type: Schema.Types.ObjectId, ref: "lecture", required: true },
    replies: [{ type: Schema.Types.ObjectId, ref: "replies" }],
  },
  {
    timestamps: true,
  }
);

const commentModel =
  mongoose.models.Comment ||
  mongoose.model<CommentInterface>("Comment", commentSchema);

export default commentModel;
