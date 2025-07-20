import mongoose, { Document, Schema } from "mongoose";

export interface CategoryInterface extends Document {
  name: string;
  description: string;
}

const categorySchema = new Schema<CategoryInterface & Document>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
}, {
  timestamps: true,
});

const categoryModel = mongoose.models.category || mongoose.model<CategoryInterface>("category", categorySchema);

export default categoryModel; 