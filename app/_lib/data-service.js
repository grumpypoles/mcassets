"use server";

import { UploadFiles } from "@/app/_components/UploadFiles";
import { auth } from "@/app/_lib/auth";
import { buildAssetsData } from "@/app/_lib/helpers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { notFound } from "next/navigation";
import path from "path";
import { supabase } from "./supabase";
import { deleteCloudinaryFile } from "./deleteCloudinaryFiles";
// //For Testing
// await new Promise((res)=> setTimeout(res, 3000))

// Error function
function handleSupabaseError(error, operation) {
  console.error(`${operation} failed:`, error);
  throw new Error(`${operation} failed. Please try again later.`);
}
const DEFAULT_IMAGE_URL = [
  "https://res.cloudinary.com/dvmnwyia5/image/upload/v1744856489/AssetImageMissing_grnv21.webp",
];

const DEFAULT_INVOICE_URL = [
  "https://res.cloudinary.com/dvmnwyia5/image/upload/v1744857211/0000_Missing_Invoice_o2rk5e.pdf",
];

const DEFAULT_INSTRUCTION_URL = [
  "https://res.cloudinary.com/dvmnwyia5/image/upload/v1744856593/0000_No_Instructions_qlrtx8.pdf",
];

//* Asset Form */

//Add new asset

export async function addAsset(formData, userId) {
  // Upload Images
  const images = formData.getAll("image");

  const hasValidImages =
    images.length > 0 && images.some((file) => file && file.size > 0);

  const imageUrls = hasValidImages
    ? await UploadFiles(images, "ass_images")
    : DEFAULT_IMAGE_URL;

  // Upload Invoices
  const invoices = formData.getAll("invoice");

  const hasValidInvoices =
    invoices.length > 0 && invoices.some((file) => file && file.size > 0);

  const invoiceUrls = hasValidInvoices
    ? await UploadFiles(invoices, "ass_invoices")
    : DEFAULT_INVOICE_URL;

  // Upload Instructions
  const instructions = formData.getAll("instructions");

  const hasValidInstructions =
    instructions.length > 0 &&
    instructions.some((file) => file && file.size > 0);

  const instructionUrls = hasValidInstructions
    ? await UploadFiles(instructions, "ass_instructions")
    : DEFAULT_INSTRUCTION_URL;

  //Temporary userId
  userId = userId || 5;

  // Get form data
  const newAssetData = buildAssetsData(
    formData,
    { name: imageUrls },
    { name: instructionUrls },
    { name: invoiceUrls },
    userId,
    "add",
  );

  // Post form data
  const { data: technicalDataInput, error: technicalError } = await supabase
    .from("hi_assets_web")
    .insert(newAssetData);

  if (technicalError)
    handleSupabaseError(technicalError, "Inserting asset data");

  // Refresh the grid page
  revalidatePath("/hiassets");

  // Navigate the user to the grid
  redirect("/hiassets");
}
//* Asset Form */

//Edit existing asset

export async function editAsset(formData) {
  // Helper: check if a new file was uploaded
  const isValidFile = (file) =>
    file && file.size > 0 && file.name !== "undefined";

  // -----------------------------
  // Helper: process a single file group
  // -----------------------------
  async function processFile({
    formKey,
    referenceKey,
    defaultUrl,
    cloudFolder,
  }) {
    const newFile = formData.get(formKey);
    const existingUrl = formData.get(referenceKey);
    const hasNewFile = isValidFile(newFile);

    // CASE 3: No new file → keep existing
    if (!hasNewFile) return existingUrl;

    const isExistingDefault = existingUrl === defaultUrl;

    // CASE 1: Existing is DEFAULT → upload new, no delete
    if (isExistingDefault) {
      const uploaded = await UploadFiles([newFile], cloudFolder);
      return uploaded[0]; // full URL
    }

    // CASE 2: Existing is NOT default → delete old, upload new
    await deleteCloudinaryFile(existingUrl);

    const uploaded = await UploadFiles([newFile], cloudFolder);
    return uploaded[0];
  }

  // -----------------------------
  // Process each file group
  // -----------------------------
  const imageUrl = await processFile({
    formKey: "image",
    referenceKey: "image_reference",
    defaultUrl: DEFAULT_IMAGE_URL,
    cloudFolder: "ass_images",
  });

  const invoiceUrl = await processFile({
    formKey: "invoice",
    referenceKey: "invoice_reference",
    defaultUrl: DEFAULT_INVOICE_URL,
    cloudFolder: "ass_invoices",
  });

  const instructionUrl = await processFile({
    formKey: "instructions",
    referenceKey: "instructions_reference",
    defaultUrl: DEFAULT_INSTRUCTION_URL,
    cloudFolder: "ass_instructions",
  });

  // -----------------------------
  // Build updated asset data
  // -----------------------------
  const selcode = formData.get("selcode");

  const updatedAssetData = buildAssetsData(
    formData,
    { name: [imageUrl] },
    { name: [instructionUrl] },
    { name: [invoiceUrl] },
    5, // or session.user.appUserId when auth is enabled
    "edit",
  );

  // -----------------------------
  // Update Supabase
  // -----------------------------
  const { data, error } = await supabase
    .from("hi_assets_web")
    .update(updatedAssetData)
    .eq("selcode", selcode);

  if (error) handleSupabaseError(error, "Updating asset data");

  revalidatePath("/hiassets");
  redirect("/hiassets");
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
  redirect("/account/admin/categories");
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
  redirect("/account/admin/location");
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
  redirect("/account/admin/categories");
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
  redirect("/account/admin/locations");
}
