"use server";

import { revalidatePath } from "next/cache";

export async function createScrim(data: any) {
  console.log("createScrim", data);
  revalidatePath("/(platform)/scrims");
  return { success: true };
}

export async function requestScrim(scrimId: string, teamId: string) {
  console.log("requestScrim", scrimId, teamId);
  return { success: true };
}

export async function respondToScrimRequest(requestId: string, accept: boolean) {
  console.log("respondToScrimRequest", requestId, accept);
  return { success: true };
}

export async function completeScrim(scrimId: string, scores: any) {
  console.log("completeScrim", scrimId, scores);
  return { success: true };
}
