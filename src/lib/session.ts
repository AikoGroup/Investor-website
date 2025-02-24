import { getServerSession } from 'next-auth';
import { authOptions } from './auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

export type UserSession = {
  user: {
    id: string;
    email: string;
    firstName?: string;
    lastName?: string;
    company?: string;
    role?: string;
    industry?: string;
    companySize?: string;
    department?: string;
    location?: string;
    timezone?: string;
  };
};

export async function getSession() {
  const session = await getServerSession(authOptions);
  return session as UserSession | null;
}

export async function requireSession() {
  const session = await getSession();
  
  if (!session?.user) {
    const headersList = await headers();
    const pathname = headersList.get('x-pathname') || '/';
    redirect(`/login?callbackUrl=${encodeURIComponent(pathname)}`);
  }
  
  return session;
}

export function extractUserInfo(session: UserSession) {
  const { user } = session;
  return {
    id: user.id,
    email: user.email,
    name: user.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : undefined,
    company: user.company,
    role: user.role,
    industry: user.industry,
    companySize: user.companySize,
    department: user.department,
    location: user.location,
    timezone: user.timezone,
  };
}
