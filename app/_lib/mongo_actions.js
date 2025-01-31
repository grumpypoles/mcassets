"use server";

import { revalidatePath } from "next/cache";
import connectDB from "@/app/_config/database";
import AssetCategories from "@/app/_models/HI_Categories";
import AssetLocations from "@/app/_models/HI_Locations";
import HIAssets from "@/app/_models/HI_Assets";
import mongoose from "mongoose";

//Get all data for specific assets
export async function getAssetsList(id) {
  await connectDB();

  try {
    // Ensure the id is valid for MongoDB ObjectId
    if (!mongoose.Types.ObjectId.isValid(id)) {
      throw new Error("Invalid ID format");
    }

    // Query the MongoDB collection using the model

    const data = await HIAssets.findById(id).lean();
    // console.log("Query Result:", data);
    if (!data) {
      throw new Error("Asset not found");
    }

    return data;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to retrieve asset");
  }
}

// Category Actions

export async function getCategoryList() {
  await connectDB();
  const json_category_Data = await AssetCategories.find({}).sort({ _id: 1 }).lean();
  return json_category_Data.map((category) => ({
    ...category,
    _id: category._id.toString(),
  }));
}

export async function updateCategory(params) {
  await connectDB();

  const { _id, description } = params;

  if (!_id) throw new Error("Category ID is required");

  try {
    const updatedCategory = await AssetCategories.findByIdAndUpdate(
      _id,
      { description },
      { new: true, runValidators: true }
    );

    if (!updatedCategory) {
      throw new Error("Category not found or could not be updated");
    }

    // Trigger revalidation only if the update is successful
    revalidatePath("/account/admin/categories");

    return updatedCategory;
  } catch (error) {
    throw new Error(`Failed to update category: ${error.message}`);
  }
}

export async function duplicateCategory(params) {
  await connectDB();

  
  const description = "New Category";

  const updateData = { description };

  try {
    const result = await AssetCategories.create(updateData);

    if (!result) {
      throw new Error("Asset category could not be duplicated");
    }

    // Trigger revalidation only if the update is successful
    revalidatePath("/account/admin/categories");
    return result;
  } catch (error) {
    console.error("Error duplicating category:", error);
    throw new Error("An error occurred while duplicating the category");
  }
}

// Location Actions

export async function getLocationList() {
  await connectDB();
  const json_location_Data = await AssetLocations.find({}).sort({ _id: 1 }).lean();
  return json_location_Data.map((location) => ({
    ...location,
    _id: location._id.toString(),
  }));
}

export async function updateLocation(params) {
 await connectDB();

  const { _id, description } = params;

  if (!_id) throw new Error("Location ID is required");

  try {
    const updatedLocation = await AssetLocations.findByIdAndUpdate(
      _id,
      { description },
      { new: true, runValidators: true }
    );

    if (!updatedLocation) {
      throw new Error("Location not found or could not be updated");
    }

    // Trigger revalidation only if the update is successful
    revalidatePath("/account/admin/locations");

    return updatedLocation;
  } catch (error) {
    throw new Error(`Failed to update locations: ${error.message}`);
  }
}

export async function duplicateLocation(params) {
 await connectDB();

  
  const description = "New Location";

  const updateData = { description };

  try {
    const result = await AssetLocations.create(updateData);

    if (!result) {
      throw new Error("Asset location could not be duplicated");
    }

    // Trigger revalidation only if the update is successful
    revalidatePath("/account/admin/locations");
  } catch (error) {
    console.error("Error duplicating location:", error);
    throw new Error("An error occurred while duplicating the location");
  }
}
