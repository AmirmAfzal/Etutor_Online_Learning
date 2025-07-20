import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface InstructorInterface extends Document {
  firstname: string;
  lastname: string;
  avatar : string;
  username : string
  user: mongoose.Types.ObjectId;
  bio: string;
  rating: number;
  students: number;
  courses: ObjectId[];
  social: {
    facebook: string | null;
    instagram: string | null;
    linkedin: string | null;
    youtube: string | null;
    whatsapp: string | null;
    twitter: string | null;
  };
}

const instructorSchema = new Schema<InstructorInterface>(
  {
    firstname: { type: String, required: true },
    lastname: { type: String, required: true },
    avatar: { type: String, required: false },
    username: { type: String, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    bio: { type: String, required: true },
    rating: { type: Number, required: true, default: 0 },
    students: { type: Number, required: true, default: 0 },
    courses: [{ type: Schema.Types.ObjectId, ref: "course" }],
    social: {
      facebook: { type: String, default: null },
      instagram: { type: String, default: null },
      linkedin: { type: String, default: null },
      youtube: { type: String, default: null },
      whatsapp: { type: String, default: null },
      twitter: { type: String, default: null },
    },
  },
  {
    timestamps: true,
  }
);

const instructorModel =
  mongoose.models.instructor ||
  mongoose.model<InstructorInterface>("instructor", instructorSchema);

export default instructorModel;
