"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/app/_lib/auth";
import { supabase } from "@/app/_lib/supabase";
import { UploadFiles } from "../_components/UploadFiles";
import { buildFinancialData, sailTechnicalData } from "@/app/_lib/helpers";

// Error function
function handleSupabaseError(error, operation) {
  console.error(`${operation} failed:`, error);
  throw new Error(`${operation} failed. Please try again later.`);
}

//Add new sail
export async function addSail(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Upload Images
  const images = formData.getAll("image");
  const imageUrls = await UploadFiles(images, "ws_images");

  // Upload Invoices
  const invoices = formData.getAll("invoice");
  const invoiceUrls = await UploadFiles(invoices, "ws_invoices");

  // Get form data

  const technicalData = sailTechnicalData(
    formData,
    imageUrls,
    session.user.appUserId,
    "add"
  );
  const financialData = buildFinancialData(formData, invoiceUrls, "add");

  //Post form data
  const { data: technicalDataInput, error: technicalError } = await supabase
    .from("ws_sails")
    .insert(technicalData);

  if (technicalError)
    handleSupabaseError(technicalError, "Inserting technical data");

  const { data: FinancialDataInput, error: financialError } = await supabase
    .from("ws_costs")
    .insert(financialData);

  if (financialError)
    handleSupabaseError(financialError, "Inserting financial data");

  revalidatePath("/sails");
}

//Edit existing sail
export async function editSail(formData) {
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

  const technicalData = sailTechnicalData(
    formData,
    imageUrls,
    session.user.appUserId,
    "edit"
  );

  const financialData = buildFinancialData(formData, invoiceUrls, "edit");

  //Post form data

  const { data: technicalDataEdit, error: technicalError } = await supabase
    .from("ws_sails")
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

  revalidatePath("/sails");
}

//Get all data for specific sail
export async function getSail(id) {
  const { data, error } = await supabase
    .from("ws_sails_info")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}
