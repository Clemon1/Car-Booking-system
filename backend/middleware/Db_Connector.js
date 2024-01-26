import mongoose from "mongoose";

export const DbConnect = async (url) => {
  try {
    await mongoose.connect(url);
    console.log("Connected to database");
  } catch (error) {
    console.log("Failed to connect to database");
  }
};
