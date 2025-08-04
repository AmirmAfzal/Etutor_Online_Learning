import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface CourseData {
  _id: ObjectId;
  title: string;
  subtitle: string;
  thumbnail: string;
  description: string;
  authors: ObjectId[];
  sections: ObjectId[];
  price: number;
  offer: number;
  offerEndsAt?: Date;
  language: string;
  subtitleLanguage?: string;
  studentsCount: number;
  duration: number;
  category?: ObjectId;
  tags: ObjectId[];
  video: ObjectId[];
  subCategory?: ObjectId;
  topic: string;
  level: "Beginner" | "Intermediate" | "Advanced";
  durationUnit: "Day" | "Week" | "Hour";
  trailer?: string;
  learningOutcomes?: string[];
  targetAudience?: string[];
  requirements?: string[];
}

export interface CourseInterface extends mongoose.Document, CourseData {
  _id: ObjectId;
}

const courseSchema = new Schema<CourseInterface & Document>(
  {
    title: { type: String, required: true },
    subtitle: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
    authors: [{ type: Schema.Types.ObjectId, ref: "user", required: true }],
    sections: [{ type: Schema.Types.ObjectId, ref: "section", required: true }],
    price: { type: Number, required: true },
    offer: { type: Number, required: true },
    offerEndsAt: { type: Date },
    language: { type: String, required: true },
    subtitleLanguage: { type: String },
    studentsCount: { type: Number, default: 0 },
    duration: { type: Number, default: 0 },
    category: { type: Schema.Types.ObjectId, ref: "category", default: null },
    tags: { type: [Schema.Types.ObjectId], ref: "tag", default: [] },
    video: { type: [Schema.Types.ObjectId], ref: "video", default: [] },
    subCategory: { type: Schema.Types.ObjectId, ref: "subcategory", default: null },
    topic: { type: String, default: "" },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], default: "Beginner" },
    durationUnit: { type: String, enum: ["Day", "Week", "Hour"], default: "Hour" },
    trailer: { type: String, default: "" },
    learningOutcomes: { type: [String], default: [] },
    targetAudience: { type: [String], default: [] },
    requirements: { type: [String], default: [] },
  },
  {
    timestamps: true,
  }
);

const courseModel =
  mongoose.models.course ||
  mongoose.model<CourseInterface>("course", courseSchema);

export default courseModel;
