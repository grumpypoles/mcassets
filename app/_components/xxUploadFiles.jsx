"use server";

import cloudinary from "@/app/_lib/cloudinary"; 


export async function xxUploadFiles(files, folder) {

  
  const filteredFiles = files.filter((file) => file.name !== "");
  const uploadedUrls = [];
  
  
  for (const file of filteredFiles) {
    const fileBuffer = await file.arrayBuffer();
    const fileArray = Array.from(new Uint8Array(fileBuffer));
    const fileData = Buffer.from(fileArray);
    
    // Convert to base64
    const fileBase64 = fileData.toString("base64");
    

    // Upload to Cloudinary
    const result = await cloudinary.uploader.upload(
      `data:image/png;base64,${fileBase64}`,
      {
        folder
      }
    );

    uploadedUrls.push(result.secure_url);
  }

  return uploadedUrls;
}
