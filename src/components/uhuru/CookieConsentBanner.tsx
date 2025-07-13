
"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Cookie } from 'lucide-react';

export default function CookieConsentBanner() {
  const [showBanner, setShowBanner] = useState(false);

  useEffect(() => {
    // This code runs only on the client.
    // The banner should only show if a choice hasn't been made yet.
    const consent = localStorage.getItem('cookie_consent');
    if (!consent) {
      setShowBanner(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookie_consent', 'accepted');
    setShowBanner(false);
  };

  const handleDecline = () => {
    localStorage.setItem('cookie_consent', 'declined');
    setShowBanner(false);
    // Here you could also add logic to disable non-essential cookies.
  };

  if (!showBanner) {
    return null;
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] bg-secondary/95 backdrop-blur-sm border-t border-border">
      <div className="container mx-auto max-w-7xl px-4 py-4 md:px-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-start gap-3">
             <Cookie className="h-6 w-6 sm:h-8 sm:w-8 mt-1 text-primary flex-shrink-0" />
            <p className="text-sm text-secondary-foreground">
              We use cookies to enhance your browsing experience and analyze site traffic. By clicking "Accept", you agree to our use of cookies. You can decline non-essential cookies. Read our{' '}
              <Link href="/cookie-policy" className="underline hover:text-primary">
                Cookie Policy
              </Link>{' '}
              for more details.
            </p>
          </div>
          <div className="flex-shrink-0 flex gap-2 w-full sm:w-auto">
            <Button onClick={handleDecline} variant="outline" className="flex-1 sm:flex-initial">
              Decline
            </Button>
            <Button onClick={handleAccept} className="flex-1 sm:flex-initial">
              Accept
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
