"use server";

import { auth, signIn, signOut } from "@/app/_lib/auth";
import { addAsset as addAssetInternal } from "@/app/_lib/data-service";

// Add Asset (wrapper server action)
export async function addAssetAction(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const userId = session.user.appUserId;
  return await addAssetInternal(formData, userId);
}

// Sign in with Google
export async function signInAction() {
  await signIn("google", { redirectTo: "/account" });
}

// Sign out
export async function signOutAction() {
  await signOut({ redirectTo: "/" });
}

// Update Profile
export async function updateProfileAction(formData) {
  const session = await auth();
  if (!session) throw new Error("You must be logged in");

  const access_type = formData.get("access_type");
  const activeResult = formData.get("is_active");
  const is_active = activeResult === "on";

  const updateData = { access_type, is_active };

  const { error } = await supabase
    .from("app_users")
    .update(updateData)
    .eq("id", session.user.appUserId);

  if (error) throw new Error("App user could not be updated");

  revalidatePath("/account/profile");
}


