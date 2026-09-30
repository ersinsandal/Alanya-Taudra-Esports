import { prisma } from '@/lib/db';
import ReportsClient from './reports-client';

export default async function ReportsAdminPage() {
  const reports = await prisma.report.findMany({
    include: {
      reporter: true
    },
    orderBy: { createdAt: 'desc' }
  });

  return <ReportsClient initialReports={reports} />;
}
