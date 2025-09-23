import mongoose, { ObjectId, Schema } from "mongoose";

export interface MessageInterface extends Document {
  instructor: ObjectId;
  student: ObjectId;
  message: string;
  sender: "STUDENT" | "INSTRUCTOR";

}

const messageSchema = new Schema<MessageInterface>(
  {
    instructor: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Instructor'
    },
    student: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Student'
    },
    message: { type: String, required: true, min: 5 },
    sender: { type: String, required: true, enum: ["STUDENT", "INSTRUCTOR"] },

  },
  {
    timestamps: true,
  }
);

const messageModel =
  mongoose.models.Message ||
  mongoose.model<MessageInterface>("Message", messageSchema);

export default messageModel;