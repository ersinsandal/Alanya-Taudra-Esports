'use server';
import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';
import { MediaType } from '@prisma/client';
import { createAuditLog } from '@/lib/services/audit';

export async function createMedia(formData: FormData) {
  const user = await getCurrentUser();
  if (!user || !user.roles?.some(r => ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'].includes(r.role.name))) {
    throw new Error('Yetkisiz işlem');
  }

  const title = formData.get('title') as string;
  const type = formData.get('type') as MediaType;
  const url = formData.get('url') as string;
  const description = formData.get('description') as string;

  if (!title || !url) throw new Error('Başlık ve URL zorunludur');

  const item = await prisma.mediaItem.create({
    data: {
      title,
      type,
      url,
      description
    }
  });

  await createAuditLog({
    actorId: user.id,
    action: `Yeni medya içeriği eklendi: "${title}" (${type})`,
    targetType: 'Medya',
    targetId: item.id,
    metadata: { title, type, url }
  });

  revalidatePath('/admin/media');
  revalidatePath('/');
  revalidatePath('/admin/audit-logs');
  return { success: true };
}
