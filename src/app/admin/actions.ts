'use server';

import { prisma } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/lib/auth/session';

export async function createGameAndCrew(formData: FormData) {
  try {
    const user = await getCurrentUser();
    if (!user) return { success: false, error: 'Unauthorized' };

    // Check if SUPER_ADMIN
    const isSuperAdmin = user.roles?.some((ur: any) => ur.role.name === 'SUPER_ADMIN');
    if (!isSuperAdmin) {
      return { success: false, error: 'Sadece Super Admin yeni bir oyun/ekip oluşturabilir.' };
    }

    const gameName = formData.get('gameName') as string;
    const category = formData.get('category') as string || 'PC';
    const coverUrl = formData.get('coverUrl') as string;
    const crewName = formData.get('crewName') as string;

    if (!gameName || !crewName) {
      return { success: false, error: 'Oyun adı ve ekip adı zorunludur.' };
    }

    // Basic slugification
    const slug = gameName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
    const crewSlug = crewName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

    // Transaction to ensure both Game and Crew are created safely
    await prisma.$transaction(async (tx) => {
      // 1. Create Game
      const game = await tx.game.create({
        data: {
          name: gameName,
          slug: slug,
          category: category as any, // GameCategory enum
          isActive: true
        }
      });

      // 2. Create Crew attached to the game
      await tx.crew.create({
        data: {
          name: crewName,
          slug: crewSlug,
          gameId: game.id,
          logoUrl: coverUrl || null,
          description: `${gameName} resmi topluluk ekibi.`
        }
      });
    });

    // Revalidate public pages so the new cards appear instantly
    revalidatePath('/');
    revalidatePath('/crews');
    revalidatePath('/teams');
    revalidatePath('/admin/crews');
    revalidatePath('/admin/games');

    return { success: true };
  } catch (error: any) {
    console.error("Create error:", error);
    if (error.code === 'P2002') {
      return { success: false, error: 'Bu isimde bir oyun veya ekip zaten mevcut.' };
    }
    return { success: false, error: 'Bir veritabanı hatası oluştu.' };
  }
}
