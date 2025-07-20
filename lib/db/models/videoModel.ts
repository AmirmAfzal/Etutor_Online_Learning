import mongoose, { Document, Schema } from "mongoose";

export interface VideoInterface extends Document {
  url: string;
  title: string;
  duration: number;
  publicId: string;
}

const videoSchema = new Schema<VideoInterface & Document>({
  url: { type: String, required: true },
  title: { type: String, required: true },
  duration: { type: Number, required: true },
  publicId: { type: String, required: true, unique: true },
}, {
  timestamps: true,
});

const videoModel = mongoose.models.video || mongoose.model<VideoInterface>("video", videoSchema);

export default videoModel; 