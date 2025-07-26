import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface CourseInterface extends mongoose.Document {
  title?: string;
  subtitle?: string;
  thumbnail?: string;
  description?: string;
  authors?: ObjectId[];
  lectures?: ObjectId[];
  price?: number;
  offer?: number;
  offerEndsAt?: Date;
  language?: string;
  subtitleLanguage?: string;
  studentsCount?: number;
  duration?: number;
  category?: ObjectId;
  tags?: ObjectId[];
  video?: ObjectId[];
  subCategory?: ObjectId;
  topic?: string;
  level?: "Beginner" | "Intermediate" | "Advanced";
  durationUnit?: "Day" | "Week" | "Hour";
  trailer?: string;
  learningOutcomes?: string[];
  targetAudience?: string[];
  requirements?: string[];
}

const courseSchema = new Schema<CourseInterface & Document>(
  {
    title: { type: String, default: "" },
    subtitle: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    description: { type: String, default: "" },
    authors: { type: [Schema.Types.ObjectId], ref: "user", default: [] },
    lectures: { type: [Schema.Types.ObjectId], ref: "lecture", default: [] },
    price: { type: Number, default: 0 },
    offer: { type: Number, default: 0 },
    offerEndsAt: { type: Date, default: Date.now },
    language: { type: String, default: "English" },
    subtitleLanguage: { type: String, default: "English" },
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
