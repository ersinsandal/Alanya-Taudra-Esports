import { Metadata } from 'next';
import { prisma } from '@/lib/db';
import { mockSchools, mockUniversities } from '@/lib/data/mock-schools';
import SchoolsClient from './schools-client';
import { getCurrentUser } from '@/lib/auth/session';

export const metadata: Metadata = {
  title: 'Eğitim Kurumları | ATE Digital Arena',
};

export default async function SchoolsPage() {
  const user = await getCurrentUser();
  let schools: any[] = [];
  let universities: any[] = [];

  // Turkish alphabet sort: numbers first, then A-Z with tr-TR locale (Ç,Ğ,İ,Ö,Ş,Ü handled correctly)
  const trSort = (a: any, b: any) => {
    const aName = a.name || '';
    const bName = b.name || '';
    const aIsNum = /^\d/.test(aName);
    const bIsNum = /^\d/.test(bName);
    if (aIsNum && !bIsNum) return -1;
    if (!aIsNum && bIsNum) return 1;
    return aName.localeCompare(bName, 'tr-TR', { sensitivity: 'base' });
  };

  try {
    schools = await prisma.school.findMany({
      include: { _count: { select: { profiles: true } } }
    });
    if (schools.length === 0) schools = mockSchools;
    schools.sort(trSort);
    
    universities = await prisma.university.findMany({
      include: { _count: { select: { profiles: true } } }
    });
    if (universities.length === 0) universities = mockUniversities;
    universities.sort(trSort);
  } catch (error) {
    console.warn("Schools DB fetch failed, using fallback");
    schools = mockSchools;
    universities = mockUniversities;
  }

  return (
    <>
      <div className="text-center mt-12 mb-8">
        <h1 className="text-4xl font-heading font-black text-white uppercase tracking-tight mb-4">
          EĞİTİM KURUMLARI
        </h1>
        <p className="text-xl text-secondary max-w-2xl mx-auto">
          Alanya'nın e-spor ekosistemindeki liseler ve üniversiteler
        </p>
      </div>

      {schools.length === 0 && universities.length === 0 ? (
        <div className="container mx-auto px-4 py-12 text-center text-secondary">
          Şu an kayıtlı bir eğitim kurumu bulunmuyor.
        </div>
      ) : (
        <SchoolsClient schools={schools} universities={universities} user={user} />
      )}
    </>
  );
}
