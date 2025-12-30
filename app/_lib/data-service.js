"use server";

import { supabase } from "./supabase";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import path from "path";
import fs from "fs";
import { auth } from "@/app/_lib/auth";
import { buildAssetsData } from "@/app/_lib/helpers";
import { UploadFiles } from "@/app/_components/UploadFiles";

// //For Testing
// await new Promise((res)=> setTimeout(res, 3000))

// Error function
function handleSupabaseError(error, operation) {
  console.error(`${operation} failed:`, error);
  throw new Error(`${operation} failed. Please try again later.`);
}

//* Asset Form */

//Add new asset

export async function addAsset(formData, userId) {
  // Upload Images
  const images = formData.getAll("image");

  const DEFAULT_IMAGE_URL = [
    "https://res.cloudinary.com/dvmnwyia5/image/upload/v1744856489/AssetImageMissing_grnv21.webp",
  ];

  const hasValidImages =
    images.length > 0 && images.some((file) => file && file.size > 0);

  const imageUrls = hasValidImages
    ? await UploadFiles(images, "ass_images")
    : DEFAULT_IMAGE_URL;

  // Upload Invoices
  const invoices = formData.getAll("invoice");

  const DEFAULT_INVOICE_URL = [
    "https://res.cloudinary.com/dvmnwyia5/image/upload/v1744857211/0000_Missing_Invoice_o2rk5e.pdf",
  ];

  const hasValidInvoices =
    invoices.length > 0 && invoices.some((file) => file && file.size > 0);

  const invoiceUrls = hasValidInvoices
    ? await UploadFiles(invoices, "ass_invoices")
    : DEFAULT_INVOICE_URL;

  // Upload Instructions
  const instructions = formData.getAll("instructions");

  const DEFAULT_INSTRUCTION_URL = [
    "https://res.cloudinary.com/dvmnwyia5/image/upload/v1744856593/0000_No_Instructions_qlrtx8.pdf",
  ];

  const hasValidInstructions =
    instructions.length > 0 &&
    instructions.some((file) => file && file.size > 0);

  const instructionUrls = hasValidInstructions
    ? await UploadFiles(instructions, "ass_instructions")
    : DEFAULT_INSTRUCTION_URL;

  //Temporary userId
  userId = userId || 5;

  // const imageName = "[https://res.cloudinary.com/dvmnwyia5/image/upload/v1744856489/AssetImageMissing_grnv21.webp"]
  // const invoiceName  = ["https://res.cloudinary.com/dvmnwyia5/image/upload/v1744857211/0000_Missing_Invoice_o2rk5e.pdf"]
  // const instructionName = ["https://res.cloudinary.com/dvmnwyia5/image/upload/v1744856593/0000_No_Instructions_qlrtx8.pdf"]

  // Get form data
  const newAssetData = buildAssetsData(
    formData,
    { name: imageUrls },
    { name: instructionUrls },
    { name: invoiceUrls },
    userId,
    "add"
  );

  // Post form data
  const { data: technicalDataInput, error: technicalError } = await supabase
    .from("hi_assets_web")
    .insert(newAssetData);

  if (technicalError)
    handleSupabaseError(technicalError, "Inserting asset data");

  revalidatePath("/hiassets");
}

//Edit existing asset
export async function editAsset(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Helper function to determine if a file is valid
  const isValidFile = (file) =>
    file && file.size > 0 && file.name !== "undefined";

  // Upload Image if it exists
  const imageFile = formData.get("image");
  const imageUrls = isValidFile(imageFile)
    ? await UploadFiles([imageFile], "images")
    : [];
  const imageName =
    imageUrls.length > 0
      ? path.basename(imageUrls[0])
      : formData.get("image_reference"); // Use the existing image reference if no new image is uploaded
  // Upload Invoice if it exists
  const invoiceFile = formData.get("invoice");
  const invoiceUrls = isValidFile(invoiceFile)
    ? await UploadFiles([invoiceFile], "invoices")
    : [];
  const invoiceName =
    invoiceUrls.length > 0
      ? path.basename(invoiceUrls[0])
      : formData.get("invoice_reference"); // Use the existing invoice reference if no new invoice is uploaded

  // Upload Instruction if it exists
  const instructionFile = formData.get("instructions");
  const instructionUrls = isValidFile(instructionFile)
    ? await UploadFiles([instructionFile], "instructions")
    : [];
  const instructionName =
    instructionUrls.length > 0
      ? path.basename(instructionUrls[0])
      : formData.get("instructions_reference");

  // Set the selcode
  const selcode = formData.get("selcode");

  // Get form data

  // Get form data
  const newAssetData = buildAssetsData(
    formData,
    { name: imageName },
    { name: instructionName },
    { name: invoiceName },
    session.user.appUserId,
    "edit"
  );

  //Post form data

  const { data: FinancialDataEdit, error: financialError } = await supabase
    .from("hi_assets_web")
    .update(newAssetData)
    .eq("selcode", selcode);

  if (financialError)
    handleSupabaseError(financialError, "Updating asset data");

  revalidatePath("/hiassets");
}

/////////////
// GET

/** Get assets info data */
export async function getAssets() {
  const { data, error } = await supabase
    .from("hi_assets_web")
    .select("*")
    // .range(0, 5)

    .order("selcode", { ascending: false });

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

/**Get all data for specific asset */
export async function getAssetsList(id) {
  const { data, error } = await supabase
    .from("hi_assets_web")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

/** Get  hi_categories data */
export async function getCategories() {
  const { data, error } = await supabase
    .from("hi_categories")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

/** Get  hi_location data */
export async function getLocations() {
  const { data, error } = await supabase
    .from("hi_locations")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

/** Get  users data */
export async function getAppUser(email) {
  const { data, error } = await supabase
    .from("app_users")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

export async function getAccessType() {
  const { data, error } = await supabase
    .from("unique_access_types")
    .select("*");

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

/////////////
// CREATE
export async function createAppUser(newAppUser) {
  const { data, error } = await supabase.from("app_users").insert([newAppUser]);

  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }

  return data;
}

/////////////
// DUPLICATE

export async function duplicateCategory(copiedRow) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const description = "Copied Row";

  const updateData = {
    description,
  };

  const { data, error } = await supabase
    .from("hi_categories")
    .insert(updateData);

  if (error) throw new Error("Assets Categories could not be copied");

  revalidatePath("/account/admin/categories");
}

export async function duplicateLocation(copiedRow) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const description = "Copied Row";

  const updateData = {
    description,
  };

  const { data, error } = await supabase
    .from("hi_locations")
    .insert(updateData);

  if (error) throw new Error("Assets Location could not be copied");

  revalidatePath("/account/admin/location");
}

/////////////
// UPDATES

/* Category */

export async function updateCategory(params) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const id = params.id;
  const description = params.description;

  const updateData = {
    description,
  };

  const { data, error } = await supabase
    .from("hi_categories")
    .update(updateData)
    .eq("id", id);

  if (error) throw new Error("Asset Category data could not be updated");

  revalidatePath("/account/admin/categories");
}

/* Location */

export async function updateLocation(params) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const id = params.id;
  const description = params.description;

  const updateData = {
    description,
  };

  const { data, error } = await supabase
    .from("hi_locations")
    .update(updateData)
    .eq("id", id);

  if (error) throw new Error("Asset Location data could not be updated");

  revalidatePath("/account/admin/locations");
}
