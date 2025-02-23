import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { verify } from 'jsonwebtoken';
import fs from 'fs';
import path from 'path';
import type { User } from '@/types/auth';

const AUTH_FILE_PATH = path.join(process.cwd(), 'src/config/auth.json');

export async function GET() {
  try {
    const cookieStore = await cookies();
    const token = await cookieStore.get('auth-token');
    console.log('Session check - token found:', !!token);

    if (!token) {
      return NextResponse.json({ user: null });
    }

    const decoded = verify(token.value, process.env.NEXTAUTH_SECRET || 'default-secret-key') as { userId: string; email: string };
    
    // Read the auth file to get user details
    const authData = JSON.parse(fs.readFileSync(AUTH_FILE_PATH, 'utf-8'));
    const user = authData.users.find((u: User) => u.id === decoded.userId);

    if (!user) {
      return NextResponse.json({ user: null });
    }

    return NextResponse.json({
      user: {
        id: user.id,
        email: user.email,
        name: user.firstName,
        firstName: user.firstName,
        lastName: user.lastName,
        company: user.company,
        role: user.role,
        industry: user.industry,
        companySize: user.companySize,
        department: user.department,
        location: user.location,
        timezone: user.timezone,
        interests: user.interests,
        expertise: user.expertise,
        businessGoals: user.businessGoals,
        preferences: user.preferences
      }
    });
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json({ user: null });
  }
}
