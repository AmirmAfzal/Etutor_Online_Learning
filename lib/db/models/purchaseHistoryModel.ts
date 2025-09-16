import mongoose, { Document, ObjectId , Schema } from "mongoose";

export interface PurchaseHistoryInterface extends Document {
  courses: ObjectId[];
}

const purchaseHistorySchema = new Schema<PurchaseHistoryInterface, Document>(
  {
    courses: [{ type: Schema.Types.ObjectId, ref: "Course", required: true }],
  },
  {
    timestamps: true,
  }
);

const purchaseHistoryModel = mongoose.models.PurchaseHistory || mongoose.model<PurchaseHistoryInterface>("PurchaseHistory", purchaseHistorySchema);


export default purchaseHistoryModel;