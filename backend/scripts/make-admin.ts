import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../src/models/User.js";

dotenv.config({
  path: "backend/.env",
});

const ADMIN_EMAIL = "bprasun44@gmail.com";

async function makeAdmin(): Promise<void> {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error(
        "MONGODB_URI is not defined in backend/.env"
      );
    }

    await mongoose.connect(mongoURI);

    console.log("MongoDB connected successfully");

    const user = await User.findOneAndUpdate(
      { email: ADMIN_EMAIL },
      { $set: { role: "admin" } },
      { new: true }
    );

    if (!user) {
      console.error(`User not found: ${ADMIN_EMAIL}`);
      return;
    }

    console.log("Admin account updated successfully");
    console.log(`Email: ${user.email}`);
    console.log(`Role: ${user.role}`);
  } catch (error) {
    console.error("Failed to make admin:", error);
  } finally {
    await mongoose.disconnect();
  }
}

void makeAdmin();