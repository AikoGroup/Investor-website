import { NextResponse } from 'next/server';
import { signIn } from 'next-auth/react';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const result = await signIn('credentials', {
      email,
      password,
      redirect: false
    });

    if (!result?.error) {
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
