import React from 'react';
import { prisma } from '@/lib/db';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

import EditSchoolClient from './edit-school-client';

export default async function SchoolEditAdminPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const school = await prisma.school.findUnique({
    where: { id }
  });

  if (!school) notFound();

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Link href="/admin/schools" className="p-2 hover:bg-white/10 rounded-lg transition-colors text-white">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-3xl font-space font-bold tracking-tight text-white">{school.name} Düzenle</h1>
      </div>

      <div className="bg-panel border border-white/10 rounded-xl p-6">
        <EditSchoolClient school={school} />
      </div>
    </div>
  );
}
