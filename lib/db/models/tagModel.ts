import mongoose, { Document, Schema } from "mongoose";

export interface TagInterface extends Document {
  name: string;
  description: string;
}

const tagSchema = new Schema<TagInterface & Document>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
}, {
  timestamps: true,
});

const tagModel = mongoose.models.tag || mongoose.model<TagInterface>("tag", tagSchema);

export default tagModel; 