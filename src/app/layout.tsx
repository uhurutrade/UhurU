import type {Metadata} from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter, Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';
import dynamic from 'next/dynamic';

const ChatWidget = dynamic(() => import('@/components/uhuru/ChatWidget'), { ssr: false });
const CookieConsentBanner = dynamic(() => import('@/components/uhuru/CookieConsentBanner'), { ssr: false });

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://uhurutrade.com'),
  title: {
    default: 'UhurU - Tech & Finance Solutions',
    template: '%s | UhurU',
  },
  description: 'AI Agency • Corporate & IT Consulting • Amazon FBA Business • Smart Investments',
  keywords: ['AI Agency', 'Oracle Fusion Consulting', 'Redbook', 'IT Consulting', 'Amazon FBA', 'Smart Investments', 'FIN & SCM'],
  openGraph: {
    title: 'UhurU - Tech & Finance Solutions',
    description: 'Empowering your business through AI, Oracle Fusion expertise, and cutting-edge IT consulting.',
    url: 'https://uhurutrade.com',
    siteName: 'UhurU',
    images: [
      {
        url: '/logo.png', // Fallback global open graph image
        width: 1200,
        height: 630,
        alt: 'UhurU Tech & Finance Solutions Logo',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UhurU - Tech & Finance Solutions',
    description: 'Empowering your business through AI, Oracle Fusion expertise, and cutting-edge IT consulting.',
    images: ['/logo.png'],
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn("font-body antialiased", inter.variable, poppins.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
          <ChatWidget />
          <CookieConsentBanner />
          <Toaster />
        </ThemeProvider>
        {/* Google Analytics Scripts */}
        <Script
          strategy="afterInteractive"
          src="https://www.googletagmanager.com/gtag/js?id=G-STSEF2HYH1"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-STSEF2HYH1');
          `}
        </Script>
      </body>
    </html>
  );
}