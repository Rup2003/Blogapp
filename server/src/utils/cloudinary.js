import dotenv from "dotenv";
dotenv.config();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises";
import { ApiError } from "./api-error.js";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export const uploadOnClodinary = async (localFilePath, folder = "uploads") => {
  try {
    if (!localFilePath) return null;

    const result = await cloudinary.uploader.upload(localFilePath, {
      folder: folder,
    });

    await fs.unlink(localFilePath);

    return result;
  } catch (error) {
    await fs.unlinkSync(localFilePath);
    throw new ApiError(500, "Failed to upload image to cloudinary");
  }
};

export const deleteOnClodinary = async (publicId) => {
  try {
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    throw new ApiError(500, "Failed to delete image from cloudinary");
  }
}