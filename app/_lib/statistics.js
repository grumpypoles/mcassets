import { supabase } from "./supabase";
import { notFound } from "next/navigation";

/////////////
// GET

/** Sports by discipline */

export async function getDisciplineStats(id) {
  const { data, error } = await supabase
    .from("ws_tow_summary")
    .select(`
      category,
      counter,
      total_duration
    `)
    .order("category", { ascending: true });

  // Handle the error if any
  if (error) {
    console.error(error);
    return notFound(); // Assuming notFound is a valid error handling function in your app
  }

  // Ensure that data exists before proceeding
  if (!data) {
    console.error("No data returned.");
    return [];
  }

   return data; // Return both newData and statsData if needed
}






