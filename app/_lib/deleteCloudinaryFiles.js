import { v2 as cloudinary } from "cloudinary";

export async function deleteCloudinaryFile(fileUrl) {
  if (!fileUrl) return;

  try {
    // Extract the public ID from the Cloudinary URL
    // Example:
    // https://res.cloudinary.com/<cloud>/image/upload/v12345/folder/filename.webp
    // → folder/filename
    const urlParts = fileUrl.split("/");
    const filenameWithExt = urlParts[urlParts.length - 1];
    const folder = urlParts[urlParts.length - 2];

    const publicId = `${folder}/${filenameWithExt.replace(/\.[^/.]+$/, "")}`;

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(publicId);
  } catch (error) {
    console.error("Cloudinary deletion failed:", error);
  }
}