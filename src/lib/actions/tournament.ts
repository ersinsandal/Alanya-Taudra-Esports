"use server";

import { db } from "@/lib/db";
import { revalidatePath } from "next/cache";

export async function registerTeam(tournamentId: string, teamId: string) {
  try {
    // In a real app, verify user is captain of the team, team has enough members, etc.
    await db.tournamentTeam.create({
      data: {
        tournamentId,
        teamId,
        status: "REGISTERED"
      }
    });

    const tournament = await db.tournament.findUnique({ where: { id: tournamentId } });
    if (tournament) {
      revalidatePath(`/tournaments/${tournament.slug}`);
    }
    
    return { success: true };
  } catch (error) {
    console.error("Failed to register team:", error);
    return { success: false, error: "Kayıt işlemi başarısız oldu." };
  }
}

export async function checkIn(tournamentId: string, teamId: string) {
  try {
    await db.tournamentTeam.update({
      where: {
        tournamentId_teamId: {
          tournamentId,
          teamId
        }
      },
      data: {
        checkedIn: true,
        checkedInAt: new Date()
      }
    });

    const tournament = await db.tournament.findUnique({ where: { id: tournamentId } });
    if (tournament) {
      revalidatePath(`/tournaments/${tournament.slug}`);
    }

    return { success: true };
  } catch (error) {
    console.error("Failed to check in:", error);
    return { success: false, error: "Check-in işlemi başarısız oldu." };
  }
}
