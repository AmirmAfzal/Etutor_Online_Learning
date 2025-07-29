import mongoose, { Document, Schema } from "mongoose";

interface AdvanceInformationInterface extends Document {
  requirementsTopics: string[];
  targetTopics: string[];
  topics: string[];
  description: string;
  thumbnail: string;
  video: string;
}

const advanceSchema = new Schema<AdvanceInformationInterface>(
  {
    description: { type: String, required: true },
    requirementsTopics: { type: [String], required: true },
    targetTopics: { type: [String], required: true },
    thumbnail: { type: String, required: true },
    topics: { type: [String], required: true },
    video: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

const AdvanceInfoModel =
  mongoose.models.advanceInfo ||
  mongoose.model<AdvanceInformationInterface>("advanceInfo", advanceSchema);

export default AdvanceInfoModel;
