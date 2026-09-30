"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function registerForEvent(eventId: string) {
  try {
    const userId = "mock-user-id"; // In real app, get from session
    
    // Check capacity
    const event = await db.event.findUnique({
      where: { id: eventId },
      include: {
        _count: {
          select: { registrations: true }
        }
      }
    });

    if (!event) return { success: false, error: "Etkinlik bulunamadı." };
    if (event.capacity && event._count.registrations >= event.capacity) {
      return { success: false, error: "Etkinlik kontenjanı dolu." };
    }

    await db.eventRegistration.create({
      data: {
        eventId,
        userId
      }
    });

    revalidatePath(`/events/${event.slug}`);
    return { success: true };
  } catch (error) {
    console.error("Event registration failed:", error);
    return { success: false, error: "Kayıt işlemi başarısız oldu." };
  }
}

export async function cancelRegistration(eventId: string) {
  try {
    const userId = "mock-user-id";
    
    await db.eventRegistration.delete({
      where: {
        eventId_userId: {
          eventId,
          userId
        }
      }
    });

    const event = await db.event.findUnique({ where: { id: eventId } });
    if (event) {
      revalidatePath(`/events/${event.slug}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Event cancelation failed:", error);
    return { success: false, error: "İptal işlemi başarısız oldu." };
  }
}
