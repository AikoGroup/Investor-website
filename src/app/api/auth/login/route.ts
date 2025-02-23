import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const result = await authOptions.providers[0].authorize?.({ 
      email, 
      password,
      redirect: false
    } as any);

    if (result) {
      return NextResponse.json({ success: true });
    }

    return NextResponse.json(
      { success: false, error: 'Email or password is incorrect' },
      { status: 401 }
    );
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 401 }
    );
  }
}
