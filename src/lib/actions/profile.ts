'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';

export async function updateProfile(data: {
  firstName: string;
  lastName: string;
  bio: string;
  discord: string;
}) {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: 'Oturum açmadınız.' };

  try {
    await prisma.userProfile.upsert({
      where: { userId: user.id },
      update: {
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        discordUsername: data.discord
      },
      create: {
        userId: user.id,
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        discordUsername: data.discord
      }
    });

    revalidatePath('/settings');
    revalidatePath('/dashboard');
    return { success: true };
  } catch (error) {
    console.error('Update profile error:', error);
    return { success: false, error: 'Profil güncellenirken bir hata oluştu.' };
  }
}
