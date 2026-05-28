import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

export async function connectDB() {
  try {
    if (mongoose.connection.readyState >= 1) return
    console.log("Connecting to MongoDB...")
    console.log("URI:", MONGODB_URI)  // ← shows the URI in terminal
    await mongoose.connect(MONGODB_URI)
    console.log("MongoDB connected!")
  } catch (error) {
    console.log("MongoDB connection error:", error.message)
    throw error
  }
}