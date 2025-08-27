import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface StudentInterface extends Document {
  user: mongoose.Types.ObjectId;
  firstname: string;
  lastname: string;
  username: string;
  avatar: string;
  bio: string;
  courses: ObjectId[];
  purchases: ObjectId[];
  wishlist: ObjectId[];
}

const studentSchema = new Schema<StudentInterface>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    firstname: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: false,
      unique: true,
      default: "",
    },
    bio: {
      type: String,
      required: false,
      default: "",
    },
    courses: [
      {
        type: Schema.Types.ObjectId,
        ref: "course",
      },
    ],
    purchases: [
      {
        type: Schema.Types.ObjectId,
        ref: "course",
      },
    ],
    wishlist: [
      {
        type: Schema.Types.ObjectId,
        ref: "course",
      },
    ],
  },
  {
    timestamps: true,
  }
);

const studentModel =
  mongoose.models.student ||
  mongoose.model<StudentInterface>("student", studentSchema);

export default studentModel;
