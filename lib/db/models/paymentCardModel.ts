import mongoose, { Document, ObjectId, Schema } from "mongoose";

export interface PaymentCardInterface extends Document {
  bank: string;
  name: string;
  cardNumber: string;
  expiration: string;
  instructor: ObjectId;
  student: ObjectId;
}

const paymentCardSchema = new Schema<PaymentCardInterface & Document>(
  {
    bank: { type: String, required: true },
    name: { type: String, required: true },
    cardNumber: { type: String, required: true },
    expiration: { type: String, required: true },
    instructor: { type: Schema.Types.ObjectId, required: false, default: null },
    student: { type: Schema.Types.ObjectId, required: false, default: null },
  },
  {
    timestamps: true,
  }
);

const paymentCardModel =
  mongoose.models.paymentCard ||
  mongoose.model<PaymentCardInterface>("paymentCard", paymentCardSchema);

export default paymentCardModel;
