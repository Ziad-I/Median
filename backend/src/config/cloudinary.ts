import { v2 as cloudinary } from "cloudinary";
import { ENV } from "./env";

cloudinary.config(ENV.CLOUDINARY_URL);

const cloudinaryUploadImage = async (base64Image: string) => {
  try {
    const result = await cloudinary.uploader.upload(base64Image, {
      folder: "articles/images",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading to Cloudinary", error);
    throw new Error("Image upload failed");
  }
};

export default cloudinaryUploadImage;
