import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface LectureInterface extends Document {
  title: string;
  description: string;
  video: ObjectId;
  duration: number;
  files: string[]
  notes: string
  caption: string
  section: ObjectId;
}

const lectureSchema = new Schema<LectureInterface & Document>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  video: { type: Schema.Types.ObjectId, ref: "video", required: true },
  duration: { type: Number, required: true },
  section: { type: Schema.Types.ObjectId, ref: "section", required: true },
  files: { type: [String], required: true },
  notes: { type: String, required: true },
  caption: { type: String, required: true },
}, {
  timestamps: true,
});

const lectureModel = mongoose.models.lecture || mongoose.model<LectureInterface>("lecture", lectureSchema);

export default lectureModel; 