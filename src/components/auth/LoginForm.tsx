'use client';

import { useState } from 'react';
import Image from 'next/image';

import { signIn } from 'next-auth/react';
import analytics, { Events } from '@/lib/analytics';

export default function LoginForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      // Track login attempt
      analytics.trackEvent({
        category: 'authentication',
        action: Events.LOGIN_SUCCESS,
        label: email
      });

      await signIn('credentials', {
        email,
        password,
        redirect: true,
        callbackUrl: '/meetAika'
      });

      // The signIn function will handle the redirect
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to sign in');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4">
      <div className="backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl p-8 w-full max-w-md shadow-xl">
        <div className="flex justify-center mb-8">
          <Image
            src="/images/aiko_logo_white.svg"
            alt="Aiko Logo"
            width={120}
            height={40}
            priority
            className="h-8 w-auto"
          />
        </div>
        
        <div className="text-center mb-8">
          <h2 className="text-xl text-white/90">
            Enter your details to access our investor platform
          </h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="sr-only">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="appearance-none relative block w-full px-4 py-3 bg-white/10 border border-white/20 placeholder-white/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm sm:text-sm"
              placeholder="Email"
              autoComplete="email"
            />
          </div>

          <div>
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="appearance-none relative block w-full px-4 py-3 bg-white/10 border border-white/20 placeholder-white/50 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-transparent backdrop-blur-sm sm:text-sm"
              placeholder="Password"
              autoComplete="current-password"
            />
          </div>

          {error && (
            <div className="text-red-200 text-sm text-center mt-4">{error}</div>
          )}

          <div>
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full flex justify-center py-3 px-4 text-sm font-medium rounded-lg text-white bg-gradient-to-r from-blue-500 to-blue-700 hover:from-blue-600 hover:to-blue-800 focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:ring-offset-0 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {isLoading ? 'Loading...' : 'Meet Aika'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
