'use server';

import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { revalidatePath } from 'next/cache';

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

  await prisma.newsPost.create({
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

  revalidatePath('/admin/news');
  revalidatePath('/');
  return { success: true };
}

export async function deleteNews(id: string) {
  const user = await getCurrentUser();
  if (!user || !user.roles?.some(r => ['SUPER_ADMIN', 'ADMIN', 'MODERATOR'].includes(r.role.name))) {
    throw new Error('Yetkisiz işlem');
  }

  await prisma.newsPost.delete({ where: { id } });
  revalidatePath('/admin/news');
  revalidatePath('/');
  return { success: true };
}
