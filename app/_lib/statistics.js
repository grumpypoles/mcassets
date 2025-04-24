import { supabase } from "./supabase";
import { notFound } from "next/navigation";
import { getYear, getMonthAbbreviation } from "@/app/_lib/helpers";



/*** Assets Statistics */

export async function getAssetsStatistics(id) {
  const { data, error } = await supabase

    .from("hi_assets_web_stats_category")
    .select("*")
    .order("technical_category", { ascending: false })
    .limit(5000)
    
  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}
export async function getAssetsByYear(id) {
  const { data, error } = await supabase

    .from("hi_assets_web_annual")
    .select("year, assets_value")
    .gt("year", 2010)
    .order("year", { ascending: false })
    .limit(5000)
    
  if (error) {
    console.error(error);
    notFound();
  }

  return data;
}

export async function getAssetsReport() {
  const { data, error } = await supabase
    .from("hi_assets_web")
    .select("*")
    .order("selcode", { ascending: false })
    .limit(5000);

  //const allRows = data.length

  const newData = data.map((row) => ({
    ...row,
    year: getYear(row.finance_purchase_date),
    month: getMonthAbbreviation(row.finance_purchase_date),
  }));
  const filteredData = newData.filter((record) => record.year >= 1990);

  // //For Testing
  // await new Promise((res)=> setTimeout(res, 3000))

  if (error) {
    console.error(error);
    notFound();
  }

  return filteredData;
}