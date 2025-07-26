import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface CourseInterface extends mongoose.Document {
  title: string;
  subtitle : string
  thumbnail: string;
  description: string;
  authors: ObjectId[];
  lectures: ObjectId[];
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
}

const courseSchema = new Schema<CourseInterface & Document>(
  {
    title: { type: String, required: true },
    thumbnail: { type: String, required: true },
    description: { type: String, required: true },
    authors: [{ type: Schema.Types.ObjectId, ref: "user", required: true }],
    lectures: [{ type: Schema.Types.ObjectId, ref: "lecture", required: true }],
    price: { type: Number, required: true },
    offer: { type: Number, required: true },
    offerEndsAt: { type: Date },
    language: { type: String, required: true },
    subtitleLanguage: { type: String },
    studentsCount: { type: Number, default: 0 },
    duration: { type: Number, required: true },
    category: { type: Schema.Types.ObjectId, ref: "category" },
    tags: [{ type: Schema.Types.ObjectId, ref: "tag" }],
    video: [{ type: Schema.Types.ObjectId, ref: "video" }],
    subCategory: { type: Schema.Types.ObjectId, ref: "subcategory", required: true },
    topic: { type: String, required: true },
    level: { type: String, enum: ["Beginner", "Intermediate", "Advanced"], required: true },
    durationUnit: { type: String, enum: ["Day", "Week", "Hour"], required: true },
    trailer: { type: String },
    learningOutcomes: [{ type: String }],
    targetAudience: [{ type: String }],
    requirements: [{ type: String }],
  },
  {
    timestamps: true,
  }
);

const courseModel =
  mongoose.models.course ||
  mongoose.model<CourseInterface>("course", courseSchema);

export default courseModel;
