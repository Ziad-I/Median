// src/config/env.ts
import dotenv from "dotenv";
import path from "path";

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, "../../.env") });

export const ENV = {
  NODE_ENV: process.env.NODE_ENV || "development",
  BACKEND_PORT: process.env.BACKEND_PORT || 3000,
  BACKEND_URL: process.env.BACKEND_URL || "http://localhost:3000",
  FRONTEND_PORT: process.env.FRONTEND_PORT || 8000,
  FRONTEND_URL: process.env.FRONTEND_URL || "http://localhost:8000",
  MONGODB_URI: process.env.MONGODB_URI || "MONGODB_URI",
  CLOUDINARY_URL: process.env.CLOUDINARY_URL || "CLOUDINARY_URL",
  ACCESS_TOKEN_SECRET: process.env.ACCESS_TOKEN_SECRET || "ACCESS_TOKEN_SECRET",
  MAILTRAP_HOST: process.env.MAILTRAP_HOST || "sandbox.smtp.mailtrap.io",
  MAILTRAP_PORT: process.env.MAILTRAP_PORT || "2525",
  MAILTRAP_USER: process.env.MAILTRAP_USER || "user",
  MAILTRAP_PASSWORD: process.env.MAILTRAP_PASSWORD || "password",
  ACCESS_TOKEN_EXPIRATION_TIME:
    process.env.ACCESS_TOKEN_EXPIRATION_TIME || "300",
  REFRESH_TOKEN_SECRET:
    process.env.REFRESH_TOKEN_SECRET || "REFRESH_TOKEN_SECRET",
  REFRESH_TOKEN_EXPIRATION_TIME:
    process.env.REFRESH_TOKEN_EXPIRATION_TIME || "7d",
  RESET_PASSWORD_TOKEN_SECRET:
    process.env.RESET_PASSWORD_TOKEN_SECRET || "RESET_PASSWORD_TOKEN_SECRET",
  RESET_PASSWORD_TOKEN_EXPIRATION_TIME:
    process.env.RESET_PASSWORD_TOKEN_EXPIRATION_TIME || "1h",
};
