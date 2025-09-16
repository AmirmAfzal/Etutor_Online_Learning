import mongoose, { Document, ObjectId , Schema } from "mongoose";

export interface PurchaseHistoryInterface extends Document {
  courses: ObjectId[];
  priceAtPurchase?: number;
  currency?: string;
  userId?: ObjectId;
}

const purchaseHistorySchema = new Schema<PurchaseHistoryInterface, Document>(
  {
    courses: [{ type: Schema.Types.ObjectId, ref: "course", required: true }],
  priceAtPurchase: { type: Schema.Types.ObjectId, ref: "PriceAtPurchase", required: true },
  currency: { type: String, required: true, default: "USD" },
  userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },

  {
    timestamps: true,
  }
);

const purchaseHistoryModel = mongoose.models.PurchaseHistory || mongoose.model<PurchaseHistoryInterface>("PurchaseHistory", purchaseHistorySchema);


export default purchaseHistoryModel;