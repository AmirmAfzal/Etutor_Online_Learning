import mongoose from "mongoose";

const DATABASE_URL = process.env.DATABASE_URL as string;

export async function connectDB(): Promise<void> {
  if (mongoose.connection.readyState >= 1) return;
  try {
    await mongoose.connect(DATABASE_URL);
    console.log("✅ Connected to MongoDB");
  } catch (error) {
    console.error("❌ MongoDB Connection Error:", error);
  }
}
