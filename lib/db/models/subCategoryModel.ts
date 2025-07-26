import mongoose, { Document, Schema } from "mongoose";

export interface SubCategoryInterface extends Document {
  name: string;
  description: string;
  category: mongoose.Types.ObjectId; // Reference to parent category
}

const subCategorySchema = new Schema<SubCategoryInterface & Document>({
  name: { type: String, required: true, unique: true },
  description: { type: String },
  category: { type: Schema.Types.ObjectId, ref: "category", required: true },
}, {
  timestamps: true,
});

const subCategoryModel = mongoose.models.subcategory || mongoose.model<SubCategoryInterface>("subcategory", subCategorySchema);

export default subCategoryModel; 