import mongoose from "mongoose";

// MongoDB connection
export const connectDB = async () => {
  try { 
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  } catch (err) {
    console.error('Error connecting to MongoDB:', err.message);
  }
};