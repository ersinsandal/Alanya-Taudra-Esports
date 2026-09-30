"use server";

import { revalidatePath } from "next/cache";

export async function createTeam(data: any) {
  console.log("createTeam", data);
  revalidatePath("/(platform)/teams");
  return { success: true };
}

export async function invitePlayer(teamId: string, userId: string) {
  console.log("invitePlayer", teamId, userId);
  return { success: true };
}

export async function removePlayer(teamId: string, userId: string) {
  console.log("removePlayer", teamId, userId);
  return { success: true };
}

export async function respondToInvite(inviteId: string, accept: boolean) {
  console.log("respondToInvite", inviteId, accept);
  revalidatePath("/(platform)/dashboard");
  return { success: true };
}

export async function applyToTeam(teamId: string, message: string) {
  console.log("applyToTeam", teamId, message);
  return { success: true };
}

export async function respondToApplication(applicationId: string, accept: boolean) {
  console.log("respondToApplication", applicationId, accept);
  return { success: true };
}

export async function updateTeam(teamId: string, data: any) {
  console.log("updateTeam", teamId, data);
  return { success: true };
}

export async function deleteTeam(teamId: string) {
  console.log("deleteTeam", teamId);
  return { success: true };
}

export async function toggleLFT(gameProfileId: string) {
  console.log("toggleLFT", gameProfileId);
  return { success: true };
}
