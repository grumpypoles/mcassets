import { supabase } from "./supabase";
import { notFound } from "next/navigation";

// //For Testing
// await new Promise((res)=> setTimeout(res, 3000))


/////////////
// GET


/** Get location info data */
export async function getSessions(id) {
  const { data, error } = await supabase
  .from("ws_tow")
  .select("*")
    .eq("app_user_id", id)
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}



/** Get location info data */
export async function getLocations(id) {
  const { data, error } = await supabase
  .from("ws_locations")
  .select("*")
    .eq("app_user_id", id)
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}




/** Get masts info data */
export async function getMasts(id) {
  const { data, error } = await supabase
    .from("ws_masts_info")
    .select("*")
    .eq("app_user_id", id)
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}


/** Get sails info data */
export async function getSails(id) {
  const { data, error } = await supabase
    .from("ws_sails_info")
    .select("*")
    // .range(0, 5)
    .eq("app_user_id", id)
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

/** Get boards info data */
export async function getBoards(id) {
  const { data, error } = await supabase
    .from("ws_boards_info")
    .select("*")
    // .range(0, 5)
    .eq("app_user_id", id)
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}


/** Get boards info data */
export async function getBooms(id) {
  const { data, error } = await supabase
    .from("ws_booms_info")
    .select("*")
    // .range(0, 5)
    .eq("app_user_id", id)
    .order("id", { ascending: false });

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}


/** Get boards info data */
export async function getSundries(id) {
  const { data, error } = await supabase
    .from("ws_sundry_info")
    .select("*")
    // .range(0, 5)
    .eq("app_user_id", id)
    .order("type", { ascending: false });

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}



/** Get  ws_categories data */
export async function getCategories() {
  const { data, error } = await supabase
    .from("ws_categories")
    .select("*")
    .order("id", { ascending: false });

  // //For Testing
  // await new Promise((res)=> setTimeout(res, 3000))

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

/** Get  ws_disciplines data */
export async function getDisciplines() {
  const { data, error } = await supabase
    .from("ws_disciplines")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}



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

export async function getCountries() {
  try {
    const res = await fetch(
      "https://restcountries.com/v2/all?fields=name,flag"
    );
    const countries = await res.json();
    return countries;
  } catch {
    throw new Error("Could not fetch countries");
  }
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
// UPDATE



// The updatedFields is an object which should ONLY contain the updated data

/////////////
// DELETE


/** TO BE DELETED  */
