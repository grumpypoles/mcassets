import { supabase } from "./supabase";

export async function getAppUser(email) {
  const { data } = await supabase
    .from("app_users")
    .select("*")
    .eq("email", email)
    .single();

  return data;
}

export async function createAppUser(user) {
  const { data } = await supabase
    .from("app_users")
    .insert(user)
    .select()
    .single();

  return data;
}