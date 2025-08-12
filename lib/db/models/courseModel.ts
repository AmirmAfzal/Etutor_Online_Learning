import mongoose, { Document, ObjectId, Schema } from "mongoose";

import { Instructor } from "@/lib/actions/instructor/create-course/findInstructors";

export interface CourseData {
  _id: ObjectId;
  title: string;
  subtitle: string;
  category?: ObjectId;
  subCategory?: ObjectId;
  topic: string;
  language: string;
  subtitleLanguage?: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  duration?: number;
  durationUnit: "Day" | "Week" | "Hour";
  thumbnail?: string;
  description?: string;
  authors?: ObjectId[];
  sections?: ObjectId[];
  price?: number;
  offer?: number;
  offerEndsAt?: Date;
  studentsCount?: number;
  tags?: ObjectId[];
  video?: ObjectId[];
  trailer?: string;
  learningOutcomes?: string[];
  targetAudience?: string[];
  requirements?: string[];
  welcomeMessage?: string;
  congratulationsMessage?: string;
  instructors?: Instructor[];
  status?: "draft" | "published" | "archived";
}

export interface CourseInterface extends mongoose.Document, CourseData {
  _id: ObjectId;
}

const courseSchema = new Schema<CourseInterface & Document>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "category", default: null },
    subCategory: {
      type: Schema.Types.ObjectId,
      ref: "subcategory",
      default: null,
    },
    topic: { type: String, required: true },
    language: { type: String, required: true },
    subtitleLanguage: { type: String },
    level: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      default: "Beginner",
    },
    duration: { type: Number, default: 0 },
    durationUnit: {
      type: String,
      enum: ["Day", "Week", "Hour"],
      default: "Hour",
    },
    thumbnail: { type: String, default: "" },
    description: { type: String, default: "" },
    authors: { type: [Schema.Types.ObjectId], ref: "instructors", default: [] },
    sections: { type: [Schema.Types.ObjectId], ref: "section", default: [] },
    price: { type: Number, default: 0 },
    offer: { type: Number, default: 0 },
    offerEndsAt: { type: Date },
    studentsCount: { type: Number, default: 0 },
    tags: { type: [Schema.Types.ObjectId], ref: "tag", default: [] },
    video: { type: [Schema.Types.ObjectId], ref: "video", default: [] },
    trailer: { type: String, default: "" },
    learningOutcomes: { type: [String], default: [] },
    targetAudience: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
    welcomeMessage: { type: String },
    congratulationsMessage: { type: String },
    instructors: { type: Schema.Types.Mixed, default: [] },
    status: {
      type: String,
      enum: ["draft", "published", "archived"],
      default: "draft",
    },
  },
  {
    timestamps: true,
  }
);

const courseModel =
  mongoose.models.course ||
  mongoose.model<CourseInterface>("course", courseSchema);

export default courseModel;
