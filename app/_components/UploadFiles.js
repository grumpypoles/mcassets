"use server";

import cloudinary from "@/app/_lib/cloudinary";

export async function UploadFiles(files, folder) {
  const filtered = files.filter((file) => file && file.size > 0);
  const urls = [];

  for (const file of filtered) {
    const buffer = Buffer.from(await file.arrayBuffer());

    const url = await new Promise((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        { folder },
        (error, result) => {
          if (error) reject(error);
          else resolve(result.secure_url);
        }
      );
      stream.end(buffer);
    });

    urls.push(url);
  }

  return urls;
}
