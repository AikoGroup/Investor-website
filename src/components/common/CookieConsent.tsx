'use client';

import { useState, useEffect } from 'react';
import analytics from '@/lib/analytics';

export default function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // Check if user has already given consent
    const consent = localStorage.getItem('cookieConsent');
    if (!consent) {
      setShowBanner(true);
    } else {
      // If consent was previously given, initialize analytics
      if (consent === 'granted') {
        analytics.setConsent(true);
      }
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'granted');
    analytics.setConsent(true);
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookieConsent', 'declined');
    analytics.setConsent(false);
    setShowBanner(false);
  };

  if (!showBanner) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white/10 backdrop-blur-lg border-t border-white/20 p-4 z-50">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-white text-sm">
          <p>
            We use cookies and similar technologies to help personalise content, 
            enhance your experience, and analyse our traffic. By clicking "Accept",
            you consent to our use of cookies.
          </p>
        </div>
        <div className="flex gap-4">
          <button
            onClick={handleDecline}
            className="px-4 py-2 text-sm text-white hover:text-blue-200 transition-colors"
          >
            Decline
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm bg-white text-blue-600 rounded-full hover:bg-blue-50 transition-colors"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
