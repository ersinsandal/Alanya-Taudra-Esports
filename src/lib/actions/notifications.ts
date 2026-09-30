"use server";

import { revalidatePath } from "next/cache";

export async function markAsRead(notificationId: string) {
  console.log("markAsRead", notificationId);
  revalidatePath("/(platform)/notifications");
  return { success: true };
}

export async function markAllAsRead() {
  console.log("markAllAsRead");
  revalidatePath("/(platform)/notifications");
  return { success: true };
}

export async function getUnreadCount() {
  console.log("getUnreadCount");
  return 0; // Mock
}
