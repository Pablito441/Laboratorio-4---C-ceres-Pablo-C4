import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL, {
      user: process.env.MONGO_USER,
      pass: process.env.MONGO_PASS,
      dbName: process.env.MONGO_DB_NAME,
    });
    console.log("Conectado a MongoDB");
  } catch (err) {
    console.error("Error al conectarse a MongoDB:", err);
    process.exit(1);
  }
};
