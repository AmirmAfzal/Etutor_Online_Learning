import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface PurchaseHistoryInterface extends Document {
  date: string;

  summary: {
    courses: number;
    price: number;
    method: string;
  };
  courses: ObjectId[];
  summaryCourses: number;
  userId: ObjectId;
}

const purchaseHistorySchema = new Schema<PurchaseHistoryInterface>(
  {
    date: { type: String, required: true },

    summary: {
      courses: { type: Number, required: true },
      price: { type: Number, required: true, default: 0 },
      method: { type: String, required: true },
    },

    courses: [{ type: Schema.Types.ObjectId, ref: "course" }],


    summaryCourses: { type: Number, required: true },

    userId: { type: Schema.Types.ObjectId, ref: "user", required: true },
  },
  {
    timestamps: true,
  }
);

const purchaseHistoryModel =
  mongoose.models.PurchaseHistory ||
  mongoose.model<PurchaseHistoryInterface>(
    "PurchaseHistory",
    purchaseHistorySchema
  );

export default purchaseHistoryModel;
