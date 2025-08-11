import mongoose, { Document, Schema, Types } from "mongoose";

export interface UserInterface extends mongoose.Document {
  _id : Types.ObjectId;
  name: string;
  email: string;
  password: string;
  role: "ADMIN" | "INSTRUCTOR" | "STUDENT";
}

const userSchema = new Schema<UserInterface & Document>(
  {
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: {
      type: String,
      required: true,
      enum: ["ADMIN", "INSTRUCTOR", "STUDENT"],
      default: "STUDENT",
    },
  },
  {
    timestamps: true,
  }
);

const userModel =
  mongoose.models.user || mongoose.model<UserInterface>("user", userSchema);

export default userModel;
