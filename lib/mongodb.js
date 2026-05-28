import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

export async function connectDB() {
  if (!MONGODB_URI) {
    throw new Error("Missing MONGODB_URI environment variable")
  }

  try {
    if (mongoose.connection.readyState >= 1) return
    console.log("Connecting to MongoDB...")
    await mongoose.connect(MONGODB_URI, {
      serverSelectionTimeoutMS: 10000,
    })
    console.log("MongoDB connected!")
  } catch (error) {
    console.log("MongoDB connection error:", error.message)
    throw error
  }
}