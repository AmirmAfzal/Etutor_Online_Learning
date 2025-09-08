import mongoose, { ObjectId, Schema, Document } from "mongoose";

export interface ReplyInterface extends Document {
  reply: string;
  refPath: "Student" | "Instructor" | "Admin";
  comment: ObjectId;
  title: string;
  avatar: string;
  userId: ObjectId;
}

const replySchema = new Schema<ReplyInterface, Document>(
  {
    reply: { type: String, required: true },
    refPath: {
      type: String,
      required: true,
      enum: ["Student", "Instructor", "Admin"],
    },
    userId: { type: Schema.Types.ObjectId, refPath: "refPath", required: true },
    comment: { type: Schema.Types.ObjectId, ref: "Comment", required: true },
    title: { type: String, required: true },
    avatar: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const replyModel =
  mongoose.models.Reply || mongoose.model<ReplyInterface>("Reply", replySchema);

export default replyModel;
