import mongoose from "mongoose";

import "@/lib/db/models/replyModel";
import "@/lib/db/models/commentModel";
import "@/lib/db/models/feedbackModel";
import "./models/courseModel";
import "./models/userModel";
import "./models/lectureModel";
import "./models/studentModel";
import "./models/subCategoryModel";
import "./models/instructorModel";
import "./models/videoModel";
import "./models/tagModel";
import "./models/categoryModel";

const DATABASE_URL = process.env.DATABASE_URL;

export async function connectDB(): Promise<void> {
  if (mongoose.connection.readyState >= 1) return;

  if (!DATABASE_URL) {
    throw new Error('Invalid/Missing environment variable: "DATABASE_URL"');
  }

  try {
    await mongoose.connect(DATABASE_URL);
  } catch (error) {
    console.error("MongoDB connection error:", error);
  }
}
