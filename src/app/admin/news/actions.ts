'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';
import { createAuditLog } from '@/lib/services/audit';

export async function createNews(formData: FormData) {
  const user = await getCurrentUser();
  if (!user || !user.roles?.some(r => ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'].includes(r.role.name))) {
    throw new Error('Yetkisiz işlem');
  }

  const title = formData.get('title') as string;
  const category = formData.get('category') as any;
  const link = formData.get('link') as string;
  const coverImage = formData.get('coverImage') as string;
  const status = formData.get('status') as string;

  if (!title || !link) {
    throw new Error('Başlık ve link zorunludur');
  }

  const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + Date.now();

  const post = await prisma.newsPost.create({
    data: {
      title,
      slug,
      body: link, // we store the external link in body
      coverImage: coverImage || null,
      category: category || 'ATE',
      isDraft: status === 'Taslak',
      authorId: user.id,
      publishDate: status === 'Yayında' ? new Date() : null,
    }
  });

  await createAuditLog({
    actorId: user.id,
    action: `Yeni haber yayınlandı: "${title}" (${status})`,
    targetType: 'Haberler',
    targetId: post.id,
    metadata: { title, category, status }
  });

  revalidatePath('/admin/news');
  revalidatePath('/');
  revalidatePath('/admin/audit-logs');
  return { success: true };
}

export async function deleteNews(id: string) {
  const user = await getCurrentUser();
  if (!user || !user.roles?.some(r => ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'].includes(r.role.name))) {
    throw new Error('Yetkisiz işlem');
  }

  const post = await prisma.newsPost.findUnique({ where: { id }, select: { title: true } });

  await prisma.newsPost.delete({ where: { id } });

  await createAuditLog({
    actorId: user.id,
    action: `Haber silindi: "${post?.title || id}"`,
    targetType: 'Haberler',
    targetId: id,
    metadata: { title: post?.title }
  });

  revalidatePath('/admin/news');
  revalidatePath('/');
  revalidatePath('/admin/audit-logs');
  return { success: true };
}
