"use server";

import { supabase } from "./supabase";
import { notFound } from "next/navigation";
import { revalidatePath } from "next/cache";
import { auth } from "@/app/_lib/auth";

// //For Testing
// await new Promise((res)=> setTimeout(res, 3000))

/////////////
// GET

/** Get assets info data */
export async function getAssets(id) {
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