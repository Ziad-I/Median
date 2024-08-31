// src/config/env.ts
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const ENV = {
  PORT: process.env.PORT || 3000,
  MONGODB_URI: process.env.MONGODB_URI || "MONGODB_URI",
  NODE_ENV: process.env.NODE_ENV || "development",
  CLOUDINARY_URL: process.env.CLOUDINARY_URL || "CLOUDINARY_URL",
};
