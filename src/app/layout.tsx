import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import SessionProvider from '@/components/providers/SessionProvider';
import ClarityProvider from '@/components/providers/ClarityProvider';
import NavigationWrapper from '@/components/layout/NavigationWrapper';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Aiko - Investor Platform',
  description: 'Access the Aiko investor platform and chat with Aika, your AI co-founder.',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    apple: [
      { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' }
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>

      <body className="antialiased bg-gradient-to-br from-blue-500 to-blue-600">
        <SessionProvider>
          <ClarityProvider />
          <NavigationWrapper />
          <main className="min-h-screen">
            {children}
          </main>
        </SessionProvider>
      </body>
    </html>
  );
}
