'use client';

import { ReactNode } from 'react';

interface BaseLayoutProps {
  children: ReactNode;
}

export default function BaseLayout({ children }: BaseLayoutProps) {
  return (
    <div className="min-h-screen bg-aiko-gradient">
      {children}
    </div>
  );
}
