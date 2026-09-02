import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface LectureInterface extends Document {
  title: string;
  description?: string;
  video?: string;
  duration?: number;
  files?: string[];
  notes?: string;
  caption?: string;
  section?: ObjectId;
  index: number;
}

const lectureSchema = new Schema<LectureInterface & Document>(
  {
    title: { type: String, required: true },
    description: { type: String, required: false },
    video: { type: String, required: false },
    duration: { type: Number, required: false },
    section: { type: Schema.Types.ObjectId, ref: "section", required: false },
    files: { type: [String], required: false },
    notes: { type: String, required: false },
    caption: { type: String, required: false },
    index: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
);

const lectureModel =
  mongoose.models.lecture ||
  mongoose.model<LectureInterface>("lecture", lectureSchema);

export default lectureModel;
