import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { headers } from 'next/headers';
import SessionProvider from '@/components/providers/SessionProvider';
import Navigation from '@/components/common/Navigation';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aiko - Investor Platform',
  description: 'Access the Aiko investor platform and chat with Aika, your AI co-founder.',
  icons: {
    icon: '/favicon.ico',
  },
};

function shouldShowNav(pathname: string) {
  // Add any routes that shouldn't show the navigation bar
  const excludedRoutes = ['/login'];
  return !excludedRoutes.includes(pathname);
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <body className="antialiased bg-gradient-to-br from-blue-500 to-blue-600">
        <SessionProvider>
          {shouldShowNav(headers().get('x-pathname') || '') && <Navigation />}
          <main className="min-h-screen">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
