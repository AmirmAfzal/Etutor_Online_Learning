import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface LectureInterface extends Document {
  title: string;
  description: string;
  video: ObjectId;
  duration: number;
  course: ObjectId;
}

const lectureSchema = new Schema<LectureInterface & Document>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  video: { type: Schema.Types.ObjectId, ref: "video", required: true },
  duration: { type: Number, required: true },
  course: { type: Schema.Types.ObjectId, ref: "course", required: true },
}, {
  timestamps: true,
});

const lectureModel = mongoose.models.lecture || mongoose.model<LectureInterface>("lecture", lectureSchema);

export default lectureModel; 