import { prisma } from '@/lib/db';
import { getCurrentUser } from '@/lib/auth/session';
import { redirect } from 'next/navigation';
import NotificationsClient from './notifications-client';

export default async function NotificationsPage() {
  const user = await getCurrentUser();
  if (!user) redirect('/login');

  const notifications = await prisma.notification.findMany({
    where: { userId: user.id },
    orderBy: { createdAt: 'desc' }
  });

  return <NotificationsClient initialNotifications={notifications} />;
}
