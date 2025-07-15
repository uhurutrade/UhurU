
import type {Metadata} from 'next';
import './globals.css';
import { ThemeProvider } from '@/components/theme-provider';
import { Inter, Poppins } from 'next/font/google';
import { cn } from '@/lib/utils';
import { Toaster } from "@/components/ui/toaster";
import ChatWidget from '@/components/uhuru/ChatWidget';
import CookieConsentBanner from '@/components/uhuru/CookieConsentBanner';

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
  title: {
    default: 'UhurU - Tech & Finance Solutions',
    template: `%s | UhurU`,
  },
  description: 'AI Agency • Corporate & IT Consulting • Amazon FBA Business • Smart Investments. We combine technology and finance to deliver strategic solutions tailored to your business needs.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
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
      </body>
    </html>
  );
}
