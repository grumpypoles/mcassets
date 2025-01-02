"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/app/_lib/auth";
import { supabase } from "@/app/_lib/supabase";
import { locationTechnicalData } from "@/app/_lib/helpers";

// Error function
function handleSupabaseError(error, operation) {
  console.error(`${operation} failed:`, error);
  throw new Error(`${operation} failed. Please try again later.`);
}

//Add new location
export async function addLocation(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Get form data

  const technicalData = locationTechnicalData(
    formData,
     session.user.appUserId,
    "add"
  );

  const { data: technicalDataInput, error: technicalError } = await supabase
    .from("ws_locations")
    .insert(technicalData);

  if (technicalError)
    handleSupabaseError(technicalError, "Inserting technical data");

  revalidatePath("/locations");
}

//Edit existing location
export async function editLocation(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Set the id
  const id = formData.get("id");

  // Get form data

  const technicalData = locationTechnicalData(
    formData,
   session.user.appUserId,
    "edit"
  );

  const { data: technicalDataInput, error: technicalError } = await supabase
    .from("ws_locations")
    .update(technicalData)
    .eq("id", id);

  if (technicalError)
    handleSupabaseError(technicalError, "Inserting technical data");

  revalidatePath("/locations");
}

//Get all data for location
export async function getLocation(id) {
  const { data, error } = await supabase
    .from("ws_locations")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

/** Functions linked to ws_locations */

export async function deleteLocation(rowId) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const { error } = await supabase
    .from("ws_locations")
    .delete()
    .eq("id", rowId);

  if (error) throw new Error("WS Category record could not be deleted");

  revalidatePath("/locations");
}
