import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ available: false, error: 'Username required' }, { status: 400 });
  }

  // Basic mock implementation. Would normally query database and reserved lists here.
  const reservedUsernames = ['admin', 'root', 'system', 'ate', 'ateesports'];
  
  if (reservedUsernames.includes(username.toLowerCase())) {
    return NextResponse.json({ available: false });
  }

  return NextResponse.json({ available: true });
}
