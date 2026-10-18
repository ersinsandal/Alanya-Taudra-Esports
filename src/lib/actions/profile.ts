'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function updateProfile(data: {
  firstName: string;
  lastName: string;
  bio: string;
  discord: string;
  birthDate?: string;
  privacyAge?: string;
  privacyGames?: string;
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
        discordUsername: data.discord,
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
        privacyAge: data.privacyAge,
        privacyGames: data.privacyGames
      },
      create: {
        userId: user.id,
        firstName: data.firstName,
        lastName: data.lastName,
        bio: data.bio,
        discordUsername: data.discord,
        birthDate: data.birthDate ? new Date(data.birthDate) : undefined,
        privacyAge: data.privacyAge || 'PUBLIC',
        privacyGames: data.privacyGames || 'PUBLIC'
      }
    });

    revalidatePath('/settings');
    revalidatePath('/dashboard');
    revalidatePath(`/u/${user.username}`);
    return { success: true };
  } catch (error) {
    console.error('Update profile error:', error);
    return { success: false, error: 'Profil güncellenirken bir hata oluştu.' };
  }
}

export async function uploadAvatar(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: 'Oturum açmadınız.' };

  try {
    const file = formData.get('avatar') as File;
    if (!file || file.size === 0) return { success: false, error: 'Dosya seçilmedi.' };

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) return { success: false, error: 'Dosya boyutu 5MB\'ı aşamaz.' };

    const allowedTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];
    if (!allowedTypes.includes(file.type)) {
      return { success: false, error: 'Sadece JPEG, PNG, WebP ve GIF formatları kabul edilir.' };
    }

    const ext = file.name.split('.').pop() || 'jpg';
    const fileName = `avatar-${user.id}-${Date.now()}.${ext}`;
    const uploadDir = path.join(process.cwd(), 'public', 'uploads', 'avatars');

    await mkdir(uploadDir, { recursive: true });

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);
    await writeFile(path.join(uploadDir, fileName), buffer);

    const avatarUrl = `/uploads/avatars/${fileName}`;

    await prisma.userProfile.update({
      where: { userId: user.id },
      data: { avatarUrl }
    });

    revalidatePath('/settings');
    revalidatePath('/dashboard');
    revalidatePath(`/u/${user.username}`);
    return { success: true, avatarUrl };
  } catch (error) {
    console.error('Upload avatar error:', error);
    return { success: false, error: 'Fotoğraf yüklenirken bir hata oluştu.' };
  }
}

export async function upsertGameProfile(data: {
  gameId: string;
  inGameName: string;
  currentRank?: string;
  mainRole?: string;
  lookingForTeam?: boolean;
}) {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: 'Oturum açmadınız.' };

  try {
    await prisma.gameProfile.upsert({
      where: {
        userId_gameId: { userId: user.id, gameId: data.gameId }
      },
      update: {
        inGameName: data.inGameName,
        currentRank: data.currentRank || null,
        mainRole: data.mainRole || null,
        lookingForTeam: data.lookingForTeam || false,
      },
      create: {
        userId: user.id,
        gameId: data.gameId,
        inGameName: data.inGameName,
        currentRank: data.currentRank || null,
        mainRole: data.mainRole || null,
        lookingForTeam: data.lookingForTeam || false,
      }
    });

    revalidatePath('/settings');
    revalidatePath(`/u/${user.username}`);
    return { success: true };
  } catch (error) {
    console.error('Upsert game profile error:', error);
    return { success: false, error: 'Oyun profili kaydedilirken bir hata oluştu.' };
  }
}

export async function deleteGameProfile(gameId: string) {
  const user = await getCurrentUser();
  if (!user) return { success: false, error: 'Oturum açmadınız.' };

  try {
    await prisma.gameProfile.delete({
      where: {
        userId_gameId: { userId: user.id, gameId }
      }
    });

    revalidatePath('/settings');
    revalidatePath(`/u/${user.username}`);
    return { success: true };
  } catch (error) {
    console.error('Delete game profile error:', error);
    return { success: false, error: 'Oyun profili silinirken bir hata oluştu.' };
  }
}
