import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get('email');

  if (!email) {
    return NextResponse.json({ available: false, error: 'Email required' }, { status: 400 });
  }

  // Mock implementation
  const takenEmails = ['test@test.com', 'admin@ate.gg'];
  
  if (takenEmails.includes(email.toLowerCase())) {
    return NextResponse.json({ available: false });
  }

  return NextResponse.json({ available: true });
}
