"use client";

import { usePathname } from 'next/navigation';
import dynamic from 'next/dynamic';

const ChatWidget = dynamic(() => import('./ChatWidget'), { ssr: false });
const CookieConsentBanner = dynamic(() => import('./CookieConsentBanner'), { ssr: false });

export default function ClientWidgets() {
  const pathname = usePathname();
  const isFusionPath = pathname?.startsWith('/services/skillhub');

  return (
    <>
      {!isFusionPath && <ChatWidget />}
      <CookieConsentBanner />
    </>
  );
}
