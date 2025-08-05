import { error } from "console";
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI as string;
let isConnected: boolean = false;

export async function connectDB() {
  if (isConnected) {
    return;
  }
  if (!MONGO_URI) return console.log("MongoDB url not found");
  mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log("MongoDB connected successfully");
      isConnected = true;
    })
    .catch((error) => console.log(error));
}
