"use client";

import dynamic from 'next/dynamic';

const ChatWidget = dynamic(() => import('./ChatWidget'), { ssr: false });
const CookieConsentBanner = dynamic(() => import('./CookieConsentBanner'), { ssr: false });

export default function ClientWidgets() {
  return (
    <>
      <ChatWidget />
      <CookieConsentBanner />
    </>
  );
}
