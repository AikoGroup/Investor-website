'use client';

import { useEffect } from 'react';
import Script from 'next/script';
import { usePathname, useSearchParams } from 'next/navigation';
import analytics, { ClarityTags } from '@/lib/analytics';
import CookieConsent from '@/components/common/CookieConsent';

export default function ClarityProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Wait for clarity script to load before initializing
    const timer = setInterval(() => {
      if (typeof (window as any).clarity !== 'undefined') {
        analytics.init();
        clearInterval(timer);
      }
    }, 100);

    // Set up page view tracking
    const handleRouteChange = () => {
      const title = document.title;
      const referrer = document.referrer;

      // Track page view
      analytics.trackPageView({
        path: pathname,
        title,
        referrer
      });

      // Set navigation context
      analytics.setTag(ClarityTags.PAGE_TYPE, pathname.split('/')[1] || 'home');
      
      // Check for special pages that might need session upgrade
      if (pathname.includes('/invest') || pathname.includes('/schedule')) {
        analytics.upgradeSession('high_value_page');
      }

      // Track user if available
      const userId = localStorage.getItem('userId');
      const userRole = localStorage.getItem('userRole');
      if (userId) {
        analytics.identifyUser({
          id: userId,
          role: userRole || undefined
        });
      }
    };

    // Track initial page view
    handleRouteChange();

    // Set up error tracking
    const handleError = (event: ErrorEvent) => {
      analytics.trackEvent({
        category: 'authentication',
        action: 'error_occurred',
        label: event.message
      });
    };

    // Add error listener
    window.addEventListener('error', handleError);

    // Cleanup
    return () => {
      clearInterval(timer);
      window.removeEventListener('error', handleError);
    };
  }, [pathname, searchParams]);

  return (
    <>
      <Script
        id="microsoft-clarity"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "qecuvif3cp");
          `,
        }}
      />
      <CookieConsent />
    </>
  );
}
