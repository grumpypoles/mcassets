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



