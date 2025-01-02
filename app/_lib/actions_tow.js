"use server";

import { revalidatePath } from "next/cache";
import { auth } from "@/app/_lib/auth";
import { supabase } from "@/app/_lib/supabase";
import { towTechnicalData, towRecData } from "@/app/_lib/helpers";

// Error function
function handleSupabaseError(error, operation) {
  console.error(`${operation} failed:`, error);
  throw new Error(`${operation} failed. Please try again later.`);
}

//Add new location
export async function addTow(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Get form data

  const technicalData = towTechnicalData(
    formData,
    session.user.appUserId,
    "add"
  );

  const recData = towRecData(formData, session.user.appUserId, "add");

  //Post form data
  const { data: technicalDataInput, error: technicalError } = await supabase
    .from("ws_tow")
    .insert(technicalData);

  if (technicalError)
    handleSupabaseError(technicalError, "Inserting technical data");

  const { data: recDataInput, error: recError } = await supabase
    .from("recreations")
    .insert(recData);

  if (recError) handleSupabaseError(recError, "Inserting recreational data");

  revalidatePath("/tow");
}

//Edit existing location
export async function editTow(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  // Set the id
  const id = formData.get("id");
  const date = formData.get("date");
  const activity = formData.get("sport");

  console.log(date, activity);
  // Get form data

  const technicalData = towTechnicalData(
    formData,
    session.user.appUserId,
    "edit"
  );

  const recData = towRecData(formData, session.user.appUserId, "edit");

  const { data: technicalDataInput, error: technicalError } = await supabase
    .from("ws_tow")
    .update(technicalData)
    .eq("id", id);

  if (technicalError)
    handleSupabaseError(technicalError, "Inserting technical data");

  const { data: recDataInput, error: recError } = await supabase
    .from("recreations")
    .update(recData)
    .eq("date", date)
    .eq("activity", activity);

  if (recError) handleSupabaseError(recError, "Inserting recreational data");

  revalidatePath("/tow");
}

//Get all data for location
export async function getSpots() {
  const { data, error } = await supabase.from("ws_locations").select("spot");

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

//Get all data for disciplines
export async function getDisciplinesList() {
  const { data, error } = await supabase
    .from("ws_disciplines")
    .select("discipline")
    .order("discipline", { ascending: true });

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

//Get all data for wind strength
export async function getWindStrength() {
  const { data, error } = await supabase
    .from("ws_wind_strength")
    .select("strength")
    .order("strength", { ascending: true });

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

//Get all data for wind directions
export async function getWindDirections() {
  const { data, error } = await supabase
    .from("ws_wind_direction")
    .select("direction");

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}
//Get all data for swell
export async function getSwellSize() {
  const { data, error } = await supabase.from("ws_swell").select("swell");

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

//Get all data for sail summary
export async function getSailsSummary() {
  const { data, error } = await supabase
    .from("ws_sails_summary")
    .select("full_description")
    .eq("is_active", true)
    .order("full_description", { ascending: false });

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

//Get all data for sail summary
export async function getBoardsSummary() {
  const { data, error } = await supabase
    .from("ws_boards_summary")
    .select("full_description")
    .eq("is_active", true)
    .order("full_description", { ascending: false });

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

//Get all data for sail summary
export async function getRatings() {
  const { data, error } = await supabase
    .from("ws_ratings")
    .select("rating")
    .order("rating", { ascending: false });

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

/** Functions delete session */

export async function deleteSession(rowId, date, sport) {
 
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  //Delete from Tow
  const { error } = await supabase.from("ws_tow").delete().eq("id", rowId);
  if (error) throw new Error("WS Session record could not be deleted");

  //Delete from Recreation
  const { recError } = await supabase
    .from("recreations")
    .delete()
    .eq("date", date)
    .eq("activity", sport);
  if (recError) throw new Error("WS Session record could not be deleted");

  revalidatePath("/tow");
}

// Get data linked to location info
export async function getTowSpot(id) {
  const { data, error } = await supabase
    .from("ws_tow")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getLocationMap(mapSpot) {
  const { data, error } = await supabase
    .from("ws_locations")
    .select("id")
    .eq("spot", mapSpot)
    .single();

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

//Get all data for location
export async function getSpecificSession(id) {
  const { data, error } = await supabase
    .from("ws_tow")
    .select("*")
    .eq("id", id);

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}
