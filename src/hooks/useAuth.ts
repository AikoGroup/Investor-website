import { useSession } from 'next-auth/react';
import type { UserSession } from '@/lib/session';

export function useAuth() {
  const { data: session, status } = useSession();
  const loading = status === 'loading';

  return { 
    user: (session?.user || null) as UserSession['user'] | null,
    loading,
    session: session as UserSession | null
  };
}
