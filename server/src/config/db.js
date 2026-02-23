import mongoose from "mongoose";

export async function connectDB() {
  try {
    console.log("Connecting to MongoDB...");
    console.log("URI:", process.env.MONGODB_URI);

    await mongoose.connect(process.env.MONGODB_URI);

    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("MongoDB error ❌:", error.message);
    process.exit(1);
  }
}