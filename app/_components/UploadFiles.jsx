"use server";

import cloudinary from "@/app/_lib/cloudinary"; 

export async function UploadFiles(files, folder) {

  
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



// //Add new sundry
// export async function addSundry(formData) {
//   const session = await auth();
//   if (!session) throw new Error("You must be logged in");
//   //Upload Images
//   const images = formData.getAll("image").filter((img) => img.name !== "");
//   const imageUrls = [];
//   for (const imageFile of images) {
//     const imageBuffer = await imageFile.arrayBuffer();
//     const imageArray = Array.from(new Uint8Array(imageBuffer));
//     const imageData = Buffer.from(imageArray);
//     // Convert to base64
//     const imageBase64 = imageData.toString("base64");
//     // Make request to cloudinary
//     const result = await cloudinary.uploader.upload(
//       `data:image/png;base64,${imageBase64}`,
//       {
//         folder: "ws_images",
//       }
//     );
//     imageUrls.push(result.secure_url);
//   }
//   //Upload Invoices
//   const invoices = formData.getAll("invoice").filter((inv) => inv.name !== "");
//   const invoiceUrls = [];
//   for (const invoiceFile of invoices) {
//     const invoiceBuffer = await invoiceFile.arrayBuffer();
//     const invoiceArray = Array.from(new Uint8Array(invoiceBuffer));
//     const invoiceData = Buffer.from(invoiceArray);
//     // Convert to base64
//     const invoiceBase64 = invoiceData.toString("base64");
//     // Make request to cloudinary
//     const resultInvoice = await cloudinary.uploader.upload(
//       `data:invoice/png;base64,${invoiceBase64}`,
//       {
//         folder: "ws_invoices",
//       }
//     );
//     invoiceUrls.push(resultInvoice.secure_url);
//   }