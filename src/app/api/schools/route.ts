import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const search = searchParams.get('search')?.toLowerCase() || '';

  // Mock data for schools
  const allSchools = [
    { id: '1', name: 'Alanya Lisesi' },
    { id: '2', name: 'Hasan Çolak Anadolu Lisesi' },
    { id: '3', name: 'Oba Nazmi Yılmaz Anadolu Lisesi' },
    { id: '4', name: 'Türk Telekom Anadolu Lisesi' },
    { id: '5', name: 'Alanya Mesleki ve Teknik Anadolu Lisesi' }
  ];

  const filteredSchools = search 
    ? allSchools.filter(school => school.name.toLowerCase().includes(search))
    : allSchools;

  return NextResponse.json(filteredSchools);
}
