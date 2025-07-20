import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface StudentInterface extends Document {
  user: mongoose.Types.ObjectId;
  firstname: string;
  lastname: string;
  bio: string;
  courses: ObjectId[];
  purchases : ObjectId[]
  wishlist : ObjectId[]
}

const studentSchema = new Schema<StudentInterface>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
  }
);

const studentModel =
  mongoose.models.student ||
  mongoose.model<StudentInterface>("student", studentSchema);

export default studentModel;
