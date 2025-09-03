import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface InstructorInterface extends Document {
  firstname: string;
  lastname: string;
  avatar: string;
  username: string;
  phoneCode: string;
  phoneNumber: string;
  user: mongoose.Types.ObjectId;
  title: string;
  bio: string;
  rating: number;
  students: number;
  courses: ObjectId[];
  social: {
    website: string | null;
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
    firstname: { type: String, required: false },
    lastname: { type: String, required: false },
    avatar: { type: String, required: false },
    username: { type: String, required: false },
    phoneCode: { type: String, required: false },
    phoneNumber: { type: String, required: false },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
      unique: true,
    },
    title: { type: String, required: false },
    bio: { type: String, required: false },
    rating: { type: Number, required: false, default: 0 },
    students: { type: Number, required: false, default: 0 },
    courses: [{ type: Schema.Types.ObjectId, ref: "course" }],
    social: {
      website: { type: String, default: null },
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
