import mongoose, { Document, ObjectId, Schema } from "mongoose";

import { LectureInterface } from "@/lib/db/models/lectureModel";

export interface SectionInterface extends Document {
  title: string;
  description: string;
  lectures: (ObjectId | LectureInterface)[];
  course: ObjectId;
  duration: number;
  index: number;
}

const sectionSchema = new Schema<SectionInterface & Document>({
  title: { type: String, required: true },
  description: { type: String, required: true },
  lectures: [{ type: Schema.Types.ObjectId, ref: "lecture", required: true }],
  course: { type: Schema.Types.ObjectId, ref: "course", required: true },
  duration: { type: Number, required: true, default: 0 },
  index: { type: Number, required: true },
}, {
  timestamps: true,
});

const sectionModel = mongoose.models.section || mongoose.model<SectionInterface>("section", sectionSchema);

export default sectionModel;
