import mongoose, { Document, Schema } from "mongoose";

export interface ContactInterface extends mongoose.Document {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const contactSchema = new Schema<ContactInterface & Document>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String, required: true },
    message: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const contactModel =
  mongoose.models.contact ||
  mongoose.model<ContactInterface>("contact", contactSchema);

export default contactModel;
