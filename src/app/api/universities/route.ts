import { NextResponse } from 'next/server';

export async function GET() {
  const universities = [
    { id: 'alku', name: 'Alanya Alaaddin Keykubat Üniversitesi (ALKU)' },
    { id: 'au', name: 'Alanya Üniversitesi' },
  ];

  return NextResponse.json(universities);
}
