import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface CourseInterface extends mongoose.Document {
  title: string;
  subtitle: string;
  thumbnail: string;
  description: string;
  authors: ObjectId[];
  sections: ObjectId[];
  price: number;
  offer: number;
  offerEndsAt: Date;
  language: string;
  subtitleLanguage: string;
  studentsCount: number;
  duration: number;
  category: ObjectId;
  tags: ObjectId[];
  video: ObjectId[];
  subCategory: ObjectId;
  topic: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  durationUnit: "Day" | "Week" | "Hour";
  trailer?: string;
  learningOutcomes?: string[];
  targetAudience?: string[];
  requirements?: string[];
  // Added for publish step
  welcomeMessage?: string;
  congratulationsMessage?: string;
  instructors?: Array<{
    id: number;
    profile: string;
    name: string;
    skill: string;
  }>;
}

const courseSchema = new Schema<CourseInterface & Document>(
  {
    title: { type: String, required: true },
    thumbnail: { type: String },
    description: { type: String },
    authors: [
      { type: Schema.Types.ObjectId, ref: "instructor", required: true },
    ],
    sections: [{ type: Schema.Types.ObjectId, ref: "section", required: true }],
    price: { type: Number },
    offer: { type: Number },
    offerEndsAt: { type: Date },
    language: { type: String, required: true },
    subtitleLanguage: { type: String },
    studentsCount: { type: Number, default: 0 },
    duration: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "category" },
    tags: [{ type: Schema.Types.ObjectId, ref: "tag" }],
    video: [{ type: Schema.Types.ObjectId, ref: "video" }],
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "subcategory",
      required: true,
    },
    topic: { type: String, required: true },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: true,
    },
    durationUnit: {
      type: String,
      enum: ["Day", "Week", "Hour"],
      required: true,
    },
    trailer: { type: String },
    learningOutcomes: [{ type: String }],
    targetAudience: [{ type: String }],
    requirements: [{ type: String }],
    // Fields updated by publish step
    welcomeMessage: { type: String },
    congratulationsMessage: { type: String },
    instructors: [
      {
        id: { type: Number, required: true },
        profile: { type: String, required: true },
        name: { type: String, required: true },
        skill: { type: String, required: true },
        _id: false,
      },
    ],
  },
  {
    timestamps: true,
  }
);

const courseModel =
  mongoose.models.course ||
  mongoose.model<CourseInterface>("course", courseSchema);

export default courseModel;
