
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // This code runs only on the client, preventing SSR/hydration issues.
    const consent = localStorage.getItem('cookie_consent');
    if (consent !== 'given') {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'given');
    setShowBanner(false);
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-secondary/95 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 py-4 md:px-10">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
             <Cookie className="h-6 w-6 sm:h-8 sm:w-8 mt-1 text-primary flex-shrink-0" />
            <p className="text-sm text-secondary-foreground">
              We use cookies to enhance your browsing experience, analyze site traffic, and deliver personalized content. By clicking "Accept", you consent to our use of cookies. Read our{' '}
              <Link href="/cookie-policy" className="underline hover:text-primary">
                Cookie Policy
              </Link>{' '}
              for more details.
            </p>
          </div>
          <Button onClick={handleAccept} size="sm" className='w-full sm:w-auto flex-shrink-0'>
            Accept
          </Button>
        </div>
      </div>
    </div>
  );
}
