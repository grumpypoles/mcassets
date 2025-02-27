"use server";

import { supabase } from "./supabase";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import path from 'path';
import fs from 'fs';
import { auth } from "@/app/_lib/auth";
import { buildAssetsData } from "@/app/_lib/helpers";


// //For Testing
// await new Promise((res)=> setTimeout(res, 3000))

/////////////
// GET

/** Get assets info data */
export async function getAssets() {
  const { data, error } = await supabase
    .from("hi_assets")
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
    .from("hi_assets")
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

//* Asset Form Category */

//Add new asset
export async function addAsset(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");
  /*
  // Upload Images
  const images = formData.getAll("image");
  const imageUrls = await UploadFiles(images, "ws_images");

  // Upload Invoices
  const invoices = formData.getAll("invoice");
  const invoiceUrls = await UploadFiles(invoices, "ws_invoices");

  */
  const uploadDir = path.join(process.cwd(), "public", "uploads");
  const imageDir = path.join(uploadDir, "images");
  const invoiceDir = path.join(uploadDir, "invoices");
  const instructionsDir = path.join(uploadDir, "instructions");

  //Ensure directories exist
  [imageDir, invoiceDir, instructionsDir].forEach((dir) => {
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
  });

  //Handle image upload
  let imageFile = formData.get("image");
  if (!imageFile) {
    imageFile = {
      name: "AssetImageMissing.jpg",
      arrayBuffer: async () => null,
    };
  }

  const imagePath = path.join(imageDir, imageFile.name);
  const imageArrayBuffer = imageFile.arrayBuffer
    ? await imageFile.arrayBuffer()
    : null;

  if (imageArrayBuffer) {
    fs.writeFileSync(imagePath, Buffer.from(imageArrayBuffer));
  }

  //Handle invoice upload
  let invoiceFile = formData.get("invoice");
  if (!invoiceFile) {
    invoiceFile = {
      name: "0000 Missing Invoice.pdf",
      arrayBuffer: async () => null,
    };
  }

  const invoicePath = path.join(invoiceDir, invoiceFile.name);
  const invoiceArrayBuffer = invoiceFile.arrayBuffer
    ? await invoiceFile.arrayBuffer()
    : null;

  if (invoiceArrayBuffer) {
    fs.writeFileSync(invoicePath, Buffer.from(invoiceArrayBuffer));
  }

  //Handle instructions upload
  let instructionsFile = formData.get("instructions");
  if (!instructionsFile) {
    instructionsFile = {
      name: "0000 No Instructions.pdf",
      arrayBuffer: async () => null,
    };
  }

  const instructionsPath = path.join(instructionsDir, instructionsFile.name);
  const instructionsArrayBuffer = instructionsFile.arrayBuffer
    ? await instructionsFile.arrayBuffer()
    : null;

  if (instructionsArrayBuffer) {
    fs.writeFileSync(instructionsPath, Buffer.from(instructionsArrayBuffer));
  }

  // Get form data

  const newAssetData = buildAssetsData(
    formData,
    imageFile,
    instructionsFile,
    invoiceFile,
    session.user.appUserId,
    "add"
  );

  //Post form data
  const { data: technicalDataInput, error: technicalError } = await supabase
    .from("hi_assets")
    .insert(newAssetData);

  if (technicalError)
    handleSupabaseError(technicalError, "Inserting asset data");

  revalidatePath("/hiassets");
}
/*
//Edit existing board
export async function editBoard(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Upload Images
  const images = formData.getAll("image");
  const imageUrls = await UploadFiles(images, "ws_images");

  // Upload Invoices
  const invoices = formData.getAll("invoice");
  const invoiceUrls = await UploadFiles(invoices, "ws_invoices");

  // Set the selcode
  const selcode = formData.get("selcode");

  // Get form data

  const technicalData = boardTechnicalDataTechnicalData(
    formData,
    imageUrls,
    session.user.appUserId,
    "edit"
  );

  const financialData = buildFinancialData(formData, invoiceUrls, "edit");

  //Post form data

  const { data: technicalDataEdit, error: technicalError } = await supabase
    .from("ws_boards")
    .update(technicalData)
    .eq("selcode", selcode);

  if (technicalError)
    handleSupabaseError(technicalError, "Updating technical data");

  const { data: FinancialDataEdit, error: financialError } = await supabase
    .from("ws_costs")
    .update(financialData)
    .eq("selcode", selcode);

  if (financialError)
    handleSupabaseError(financialError, "Updating financial data");

  revalidatePath("/boards");
}
  */
