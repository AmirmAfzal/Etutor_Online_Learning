import mongoose, { Document,  Schema } from "mongoose";


export interface UserInterface extends mongoose.Document {
  name: string;
  email : string;
  password: string;
  role: "ROOT" | "ADMIN" | "MEMBER"
}

const userSchema = new Schema<UserInterface & Document>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true, select: false },
    role: {type: String , required: true , enum : ["ROOT" , "ADMIN" , "MEMBER"] , default : "MEMBER"},
  },
  {
    timestamps: true,
  }
);

const userModel =
  mongoose.models.user || mongoose.model<UserInterface>("user", userSchema);

export default userModel;
