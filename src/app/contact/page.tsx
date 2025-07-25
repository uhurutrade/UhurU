
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import SubPageHeader from '@/components/uhuru/subpage-header';
import { Linkedin, Instagram, Send, Mail, Phone } from 'lucide-react';
import Link from 'next/link';

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" className="h-6 w-6">
        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"/>
    </svg>
)

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" className="h-7 w-7">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.46 3.48 1.34 4.94l-1.38 5.02 5.14-1.35c1.41.81 3.02 1.26 4.68 1.26h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m4.84 12.13c-.28.42-.98.79-1.37.84-.39.05-.83.05-1.27-.08-1.12-.34-2.5-1.1-4.13-2.65-1.95-1.85-3.23-4.14-3.3-4.24-.07-.1-.68-1.04-.68-1.9 0-.85.5-1.28.68-1.45s.34-.23.51-.23.34-.02.51.13c.17.15.68.79.76.92.08.13.11.3.03.46l-.34.59c-.08.13-.17.23-.34.39-.17.15-.34.3-.51.46-.2.2-.42.44-.2.81.22.37.98 1.63 2.11 2.69s2.08 1.61 2.5 1.76c.42.15.68.13.84-.03s.68-.78.85-.98c.17-.2.34-.15.59-.05l1.37.64c.25.12.42.18.49.28.07.1.07.51-.18.93Z"/>
    </svg>
)

const AmazonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="white" className="h-7 w-7">
       <path d="M21.02,15.71a2.2,2.2,0,0,1-1.21.68,2.7,2.7,0,0,1-1.3.19,3.58,3.58,0,0,1-3.1-1.57c-1.13,1.3-3.13,2.44-5.38,2.44a5.3,5.3,0,0,1-4.66-2.58,2.5,2.5,0,0,1-.37-.77,2.12,2.12,0,0,1,0-.65,2.7,2.7,0,0,1,.19-1,1.93,1.93,0,0,1,2-1.36H8.2a1.69,1.69,0,0,1,1.17-.58v-.09A3.33,3.33,0,0,1,7,8.22a3.49,3.49,0,0,1-2.19-2.28c-.12-.24-.15-.56-.15-.76s0-.41.06-.57a1.44,1.44,0,0,1,1.18-1h15.2a1.42,1.42,0,0,1,1.18,1c.06.16.06.31.06.57s-.03.52-.15.76A3.49,3.49,0,0,1,20,8.22a3.33,3.33,0,0,1-2.39,2.13v.09a1.69,1.69,0,0,1,1.17.58h1.09a1.93,1.93,0,0,1,2,1.36,2.7,2.7,0,0,1,.19,1,2.12,2.12,0,0,1,0,.65A2.5,2.5,0,0,1,21.02,15.71ZM15.35,17.43a2.33,2.33,0,0,0,1.94,1c.71,0,1.34-.18,1.34-.73,0-.51-.62-1-1.34-1-.77,0-1.89.6-1.94,1.7Zm-8.4,0A2.33,2.33,0,0,0,8.89,17.4c.72,0,1.34-.5,1.34-1s-.62-1-1.34-1c-.71.05-1.94.6-1.94,1.73Z"/>
    </svg>
)

export default function ContactPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/" backText="Back to Home" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-4xl px-4 md:px-10">
          <h1 className="text-center text-4xl font-bold tracking-tighter sm:text-5xl font-headline text-foreground mb-8">
            Contact
          </h1>
          <Card className="bg-card shadow-lg">
            <CardContent className="p-8">
              <p className="mb-6 text-lg text-muted-foreground">Find us at:</p>
              <div className="flex">
                <div className="w-1 bg-foreground mr-8 rounded-full"></div>
                <div className="space-y-6 flex-grow">
                  <div>
                    <h2 className="text-2xl font-bold font-headline text-foreground">UhurU Trade Ltd.</h2>
                    <p className="text-muted-foreground mt-1 text-base">
                      Unit 13 Freeland Park Wareham Road. Lytchett Matravers BH16 6FA Poole – UK
                    </p>
                  </div>
                  <div className="flex items-center gap-4">
                    <Mail className="h-5 w-5 text-foreground" />
                    <a href="mailto:hello@uhurutrade.com" className="text-foreground hover:underline">
                      hello@uhurutrade.com
                    </a>
                  </div>
                  <div className="flex items-center gap-4">
                    <Phone className="h-5 w-5 text-foreground" />
                    <a href="tel:+447517074605" className="text-foreground hover:underline">
                      +44 7517 074605
                    </a>
                  </div>
                  <div>
                    <p className="text-muted-foreground mt-8 text-base">
                      And if you want to discover even more about us and become part of our community, we invite you to join our social networks. There, we regularly share interesting articles, market analysis, and exclusive content you won&apos;t want to miss. It&apos;s the perfect place to stay up-to-date with our news and connect with other technology and finance enthusiasts!
                    </p>
                    <div className="mt-6 flex flex-wrap gap-4">
                      <TooltipProvider>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href="https://x.com/UhurUtradeUk" aria-label="X/Twitter" prefetch={false} className="rounded-full bg-black p-2 flex items-center justify-center h-10 w-10 hover:opacity-80 transition-opacity"><XIcon /></Link>
                          </TooltipTrigger>
                          <TooltipContent><p>X / Twitter</p></TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href="https://www.linkedin.com/company/uhurutrade" aria-label="LinkedIn" prefetch={false} className="rounded-full bg-blue-600 p-2 flex items-center justify-center h-10 w-10 hover:opacity-80 transition-opacity"><Linkedin className="h-7 w-7 text-white"/></Link>
                          </TooltipTrigger>
                          <TooltipContent><p>LinkedIn</p></TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href="https://www.instagram.com/uhurutrade/" aria-label="Instagram" prefetch={false} className="rounded-full bg-pink-600 p-2 flex items-center justify-center h-10 w-10 hover:opacity-80 transition-opacity"><Instagram className="h-7 w-7 text-white"/></Link>
                          </TooltipTrigger>
                          <TooltipContent><p>Instagram</p></TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href="https://t.me/uhurutradeuk" aria-label="Telegram" prefetch={false} className="rounded-full bg-sky-500 p-2 flex items-center justify-center h-10 w-10 hover:opacity-80 transition-opacity"><Send className="h-7 w-7 text-white"/></Link>
                          </TooltipTrigger>
                          <TooltipContent><p>Telegram</p></TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href="https://wa.me/447517074605" aria-label="WhatsApp" prefetch={false} className="rounded-full bg-green-500 p-2 flex items-center justify-center h-10 w-10 hover:opacity-80 transition-opacity"><WhatsAppIcon /></Link>
                          </TooltipTrigger>
                          <TooltipContent><p>WhatsApp</p></TooltipContent>
                        </Tooltip>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <Link href="https://www.amazon.co.uk/dp/B0DN2PJR65" aria-label="Amazon" prefetch={false} className="rounded-full bg-orange-500 p-2 flex items-center justify-center h-10 w-10 hover:opacity-80 transition-opacity"><AmazonIcon /></Link>
                          </TooltipTrigger>
                          <TooltipContent><p>Amazon</p></TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
