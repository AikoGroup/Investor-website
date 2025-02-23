import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { sign } from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import type { User } from '@/types/auth';

const AUTH_FILE_PATH = path.join(process.cwd(), 'src/config/auth.json');

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log('Login attempt for:', email);

    // Read the auth file
    const authData = JSON.parse(fs.readFileSync(AUTH_FILE_PATH, 'utf-8'));
    console.log('Found users:', authData.users.map(u => u.email));
    
    // Find user by email
    const user = authData.users.find((u: User) => u.email === email);
    console.log('User found:', user ? 'yes' : 'no');
    
    if (!user) {
      console.log('User not found');
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Verify password
    const isValidPassword = await bcrypt.compare(password, user.password);
    console.log('Password valid:', isValidPassword);
    
    if (!isValidPassword) {
      console.log('Invalid password');
      return NextResponse.json(
        { success: false, error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Create JWT token
    const token = sign(
      { userId: user.id, email: user.email },
      process.env.NEXTAUTH_SECRET || 'default-secret-key',
      { expiresIn: '24h' }
    );

    // Create response with user data
    const response = NextResponse.json({ 
      success: true,
      user: {
        id: user.id,
        email: user.email,
        firstName: user.firstName
      }
    });

    // Set cookie in response
    response.cookies.set('auth-token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 60 * 60 * 24 // 24 hours
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { success: false, error: 'Authentication failed' },
      { status: 401 }
    );
  }
}
