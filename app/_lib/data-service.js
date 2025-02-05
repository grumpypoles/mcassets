import { supabase } from "./supabase";
import { notFound } from "next/navigation";

// //For Testing
// await new Promise((res)=> setTimeout(res, 3000))

/////////////
// GET

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
