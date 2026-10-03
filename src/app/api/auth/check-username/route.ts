import { NextResponse } from 'next/server';
import { prisma } from '@/lib/db';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ available: false, error: 'Username required' }, { status: 400 });
  }

  const reservedUsernames = ['admin', 'root', 'system', 'ate', 'ateesports', 'administrator'];
  
  if (reservedUsernames.includes(username.toLowerCase())) {
    return NextResponse.json({ available: false });
  }

  try {
    const existingUser = await prisma.user.findUnique({
      where: { username: username.toLowerCase() }
    });

    return NextResponse.json({ available: !existingUser });
  } catch (error) {
    return NextResponse.json({ available: false, error: 'Database check failed' }, { status: 500 });
  }
}
