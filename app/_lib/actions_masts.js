"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/app/_lib/auth";
import { supabase } from "@/app/_lib/supabase";
import { UploadFiles } from "../_components/UploadFiles";
import { buildFinancialData, mastTechnicalData } from "@/app/_lib/helpers";

// Error function
function handleSupabaseError(error, operation) {
  console.error(`${operation} failed:`, error);
  throw new Error(`${operation} failed. Please try again later.`);
}

//Add new mast
export async function addMast(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Upload Images
  const images = formData.getAll("image");
  const imageUrls = await UploadFiles(images, "ws_images");

  // Upload Invoices
  const invoices = formData.getAll("invoice");
  const invoiceUrls = await UploadFiles(invoices, "ws_invoices");

  // Get form data

  const technicalData = mastTechnicalData(
    formData,
    imageUrls,
    session.user.appUserId,
    "add"
  );
  const financialData = buildFinancialData(formData, invoiceUrls, "add");

  //Post form data
  const { data: technicalDataInput, error: technicalError } = await supabase
    .from("ws_masts")
    .insert(technicalData);

  if (technicalError)
    handleSupabaseError(technicalError, "Inserting technical data");

  const { data: FinancialDataInput, error: financialError } = await supabase
    .from("ws_costs")
    .insert(financialData);

  if (financialError)
    handleSupabaseError(financialError, "Inserting financial data");

  revalidatePath("/masts");
}

//Add new mast
export async function editMast(formData) {
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

 const technicalData = mastTechnicalData(
  formData,
  imageUrls,
  session.user.appUserId,
  "edit"
);

const financialData = buildFinancialData(formData, invoiceUrls, "edit");

//Post form data 

  const { data: technicalDataInput, error: technicalError } = await supabase
    .from("ws_masts")
    .update(technicalData)
    .eq("selcode", selcode);

    if (technicalError)
      handleSupabaseError(technicalError, "Updating technical data");

  const { data: FinancialDataInput, error: financialError } = await supabase
    .from("ws_costs")
    .update(financialData)
    .eq("selcode", selcode);

    if (financialError)
      handleSupabaseError(financialError, "Updating financial data");

  revalidatePath("/masts");
}

//Get all data for specific mast
export async function getMast(id) {
  const { data, error } = await supabase
    .from("ws_masts_info")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

/** Functions linked to ws_categories */

export async function duplicateCategory(copiedRow) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const selcode = "XX";
  const description = "Copied Row";

  const updateData = {
    selcode,
    description,
  };

  const { data, error } = await supabase
    .from("ws_categories")
    .insert(updateData);

  if (error) throw new Error("WS Categories could not be copied");

  revalidatePath("/account/admin/categories");
}

export async function updateCategory(params) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const id = params.id;
  const selcode = params.selcode;
  const description = params.description;

  const updateData = {
    selcode,
    description,
  };

  const { data, error } = await supabase
    .from("ws_categories")
    .update(updateData)
    .eq("id", id);

  if (error) throw new Error("WS Category data could not be updated");

  revalidatePath("/account/admin/categories");
}

export async function deleteCategory(rowId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase
    .from("ws_categories")
    .delete()
    .eq("id", rowId);

  if (error) throw new Error("WS Category record could not be deleted");

  revalidatePath("/account/admin/categories");
}

/** Functions linked to ws_disciplines */

export async function duplicateDiscipline(copiedRow) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const sport = copiedRow.sport;
  const discipline = "Copied Row";

  const updateData = {
    sport,
    discipline,
  };

  const { data, error } = await supabase
    .from("ws_disciplines")
    .insert(updateData);

  if (error) throw new Error("WS Discipline could not be copied");

  revalidatePath("/account/admin/disciplines");
}

export async function updateDiscipline(params) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const id = params.id;
  const sport = params.sport;
  const discipline = params.discipline;

  const updateData = {
    sport,
    discipline,
  };

  const { data, error } = await supabase
    .from("ws_disciplines")
    .update(updateData)
    .eq("id", id);

  if (error) throw new Error("WS Discipline data could not be updated");

  revalidatePath("/account/admin/disciplines");
}

export async function deleteDiscipline(rowId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase
    .from("ws_disciplines")
    .delete()
    .eq("id", rowId);

  if (error) throw new Error("WS Discipline record could not be deleted");

  revalidatePath("/account/admin/disciplines");
}

/** Functions linked to ws_wind_strength */

export async function duplicateWindPower(copiedRow) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const sport = copiedRow.sport;
  const strength = "Copied Row";

  const updateData = {
    sport,
    strength,
  };

  const { data, error } = await supabase
    .from("ws_wind_strength")
    .insert(updateData);

  if (error) throw new Error("Wind strength could not be copied");

  revalidatePath("/account/admin/windpower");
}

export async function updateWindPower(params) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const id = params.id;
  const sport = params.sport;
  const strength = params.strength;

  const updateData = {
    sport,
    strength,
  };

  const { data, error } = await supabase
    .from("ws_wind_strength")
    .update(updateData)
    .eq("id", id);

  if (error) throw new Error("Wind strength data could not be updated");

  revalidatePath("/account/admin/windpower");
}

export async function deleteWindPower(rowId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase
    .from("ws_wind_strength")
    .delete()
    .eq("id", rowId);

  if (error) throw new Error("Wind strength record could not be deleted");

  revalidatePath("/account/admin/windpower");
}

/** Functions linked to ws_wind_direction */

export async function duplicateWindDirection(copiedRow) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const direction = "Copied Row";

  const updateData = {
    direction,
  };

  const { data, error } = await supabase
    .from("ws_wind_direction")
    .insert(updateData);

  if (error) throw new Error("Wind direction could not be copied");

  revalidatePath("/account");
}

export async function updateWindDirection(params) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const id = params.id;
  const direction = params.direction;

  const updateData = {
    direction,
  };

  const { data, error } = await supabase
    .from("ws_wind_direction")
    .update(updateData)
    .eq("id", id);

  if (error) throw new Error("Wind direction data could not be updated");

  revalidatePath("/account");
}

export async function deleteWindDirection(rowId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase
    .from("ws_wind_direction")
    .delete()
    .eq("id", rowId);

  if (error) throw new Error("Wind direction record could not be deleted");

  revalidatePath("/account");
}

/** Functions linked to sw_swell */

export async function duplicateSwell(copiedRow) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const swell = "Copied Row";

  const updateData = {
    swell,
  };

  const { data, error } = await supabase.from("ws_swell").insert(updateData);

  if (error) throw new Error("Ocean swell could not be copied");

  revalidatePath("/account");
}

export async function updateSwell(params) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const id = params.id;
  const swell = params.swell;

  const updateData = {
    swell,
  };

  const { data, error } = await supabase
    .from("ws_swell")
    .update(updateData)
    .eq("id", id);

  if (error) throw new Error("Ocean swell data could not be updated");

  revalidatePath("/account");
}

export async function deleteSwell(rowId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase.from("ws_swell").delete().eq("id", rowId);

  if (error) throw new Error("Ocean swell record could not be deleted");

  revalidatePath("/account");
}

/** Functions linked to sw_sport */

export async function duplicateSport(copiedRow) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const sport = "Copied Row";

  const updateData = {
    sport,
  };

  const { data, error } = await supabase.from("ws_sport").insert(updateData);

  if (error) throw new Error("Sport could not be copied");

  revalidatePath("/account");
}

export async function updateSport(params) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const id = params.id;
  const sport = params.sport;

  const updateData = {
    sport,
  };

  const { data, error } = await supabase
    .from("ws_sport")
    .update(updateData)
    .eq("id", id);

  if (error) throw new Error("Sport data could not be updated");

  revalidatePath("/account");
}

export async function deleteSport(rowId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase.from("ws_sport").delete().eq("id", rowId);

  if (error) throw new Error("Sport record could not be deleted");

  revalidatePath("/account");
}
