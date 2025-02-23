import { NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';
import { sign } from 'jsonwebtoken';
import type { User } from '@/types/auth';

const AUTH_FILE_PATH = path.join(process.cwd(), 'src/config/auth.json');

export async function POST(request: Request) {
  try {
    const { email, password, firstName } = await request.json();

    // Read the auth file
    const authData = JSON.parse(fs.readFileSync(AUTH_FILE_PATH, 'utf-8'));
    
    // Check if user already exists
    if (authData.users.some((u: User) => u.email === email)) {
      return NextResponse.json(
        { success: false, error: 'User already exists' },
        { status: 400 }
      );
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = {
      id: crypto.randomUUID(),
      email,
      firstName,
      password: hashedPassword
    };

    // Add user to auth file
    authData.users.push(newUser);
    fs.writeFileSync(AUTH_FILE_PATH, JSON.stringify(authData, null, 2));

    // Create JWT token
    const token = sign(
      { userId: newUser.id, email: newUser.email },
      process.env.NEXTAUTH_SECRET || 'default-secret-key',
      { expiresIn: '24h' }
    );

    // Create response with user data
    const response = NextResponse.json({ 
      success: true,
      user: {
        id: newUser.id,
        email: newUser.email,
        firstName: newUser.firstName
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
    console.error('Registration error:', error);
    return NextResponse.json(
      { success: false, error: 'Registration failed' },
      { status: 500 }
    );
  }
}
