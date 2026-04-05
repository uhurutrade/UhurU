import type {Metadata} from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter, Poppins, Outfit } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import Script from 'next/script';
import ClientWidgets from '@/components/uhuru/ClientWidgets';

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

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://uhurutrade.com'),
  title: {
    default: 'UhurU - Tech & Finance Solutions',
    template: '%s | UhurU',
  },
  description: 'AI Agency • Corporate & IT Consulting • Smart Investments • Amazon FBA Business',
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
      <body className={cn("font-body antialiased", inter.variable, poppins.variable, outfit.variable)}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange={false}
        >
          {children}
          <ClientWidgets />
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