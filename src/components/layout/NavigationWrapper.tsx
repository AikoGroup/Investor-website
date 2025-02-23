'use client';

import { usePathname } from 'next/navigation';
import Navigation from '@/components/common/Navigation';

function shouldShowNav(pathname: string) {
  // Add any routes that shouldn't show the navigation bar
  const excludedRoutes = ['/login'];
  return !excludedRoutes.includes(pathname);
}

export default function NavigationWrapper() {
  const pathname = usePathname();
  
  if (!shouldShowNav(pathname || '')) {
    return null;
  }

  return <Navigation />;
}
