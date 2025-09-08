import mongoose from "mongoose";

import courseModel from "./models/courseModel";
import userModel from "./models/userModel";
import lectureModel from "./models/lectureModel";
import studentModel from "./models/studentModel";
import subCategoryModel from "./models/subCategoryModel";
import instructorModel from "./models/instructorModel";
import videoModel from "./models/videoModel";
import tagModel from "./models/tagModel";
import categoryModel from "./models/categoryModel";
import replyModel from "@/lib/db/models/replyModel";
import commentModel from "@/lib/db/models/commentModel";

const DATABASE_URL = process.env.DATABASE_URL as string;

export async function connectDB(): Promise<void> {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(DATABASE_URL);

    const categoryCount = await categoryModel.countDocuments();
    const courseCount = await courseModel.countDocuments();
    const userCount = await userModel.countDocuments();
    const lectureCount = await lectureModel.countDocuments();
    const studentCount = await studentModel.countDocuments();
    const subCategoryCount = await subCategoryModel.countDocuments();
    const instructorCount = await instructorModel.countDocuments();
    const videoCount = await videoModel.countDocuments();
    const tagCount = await tagModel.countDocuments();
    const replyCount = await replyModel.countDocuments();
    const commentCount = await commentModel.countDocuments();

    console.log("✅ Connected to MongoDB");
    console.log("📊 Database Statistics:");
    console.log(`- Categories: ${categoryCount}`);
    console.log(`- Courses: ${courseCount}`);
    console.log(`- Users: ${userCount}`);
    console.log(`- Lectures: ${lectureCount}`);
    console.log(`- Students: ${studentCount}`);
    console.log(`- Sub Categories: ${subCategoryCount}`);
    console.log(`- Instructors: ${instructorCount}`);
    console.log(`- Videos: ${videoCount}`);
    console.log(`- Tags: ${tagCount}`);
    console.log(`- Comments: ${commentCount}`);
    console.log(`- Replies: ${replyCount}`);
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}
