'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { signOut } from 'next-auth/react';
import InvestModal from './InvestModal';

const Navigation = () => {
  const pathname = usePathname();
  const [isInvestModalOpen, setIsInvestModalOpen] = useState(false);

  // Don't render navigation on login page
  if (pathname === '/login') return null;

  const isActive = (path: string) => pathname === path;

  const NavLink = ({ href, children }: { href: string; children: React.ReactNode }) => (
    <Link href={href} className="relative">
      <div className={`
        px-4 py-2 rounded-full
        ${isActive(href) ? 'text-white' : 'text-blue-100 hover:text-white'}
        transition-colors duration-300
      `}>
        {children}
        {isActive(href) && (
          <motion.div
            layoutId="activeTab"
            className="absolute inset-0 bg-white/10 rounded-full -z-10"
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
          />
        )}
      </div>
    </Link>
  );

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="
        backdrop-blur-md bg-black/10
        border-b border-white/10
        px-4 sm:px-6 lg:px-8
        transition-all duration-300
        hover:bg-black/20
      ">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image
                src="/images/aiko_logo_white.svg"
                alt="Aiko Logo"
                width={120}
                height={40}
                priority
                className="h-8 w-auto"
              />
            </Link>

            {/* Navigation Links */}
            <div className="flex items-center space-x-4">
              <NavLink href="/meetAika">
                Chat with Aika
              </NavLink>
              <NavLink href="/learn">
                Learn More
              </NavLink>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsInvestModalOpen(true)}
                className="
                  ml-4
                  px-6 py-2
                  bg-gradient-to-r from-yellow-400 to-yellow-500
                  hover:from-yellow-500 hover:to-yellow-600
                  rounded-full
                  text-gray-900
                  font-medium
                  shadow-lg
                  hover:shadow-xl
                  transition-all duration-300
                "
              >
                Express Interest
              </motion.button>
              <InvestModal isOpen={isInvestModalOpen} setIsOpen={setIsInvestModalOpen} />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => signOut({ callbackUrl: '/login' })}
                className="
                  ml-4
                  px-4 py-2
                  bg-transparent
                  hover:bg-white/10
                  rounded-full
                  text-white
                  font-medium
                  transition-all duration-300
                "
              >
                Logout
              </motion.button>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navigation;
