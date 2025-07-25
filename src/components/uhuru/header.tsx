
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet';
import { Menu, Linkedin, Instagram, Send } from 'lucide-react';
import Logo from './logo';
import { Tooltip, TooltipProvider, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { ThemeToggle } from '../theme-toggle';
import { cn } from '@/lib/utils';


const AmazonIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-foreground hover:text-primary">
        <path d="M15.5,15.5c-2,1-4.5,1-6,0"/>
        <path d="M7.5,10.5c0,0,1,1,4.5,1s4.5-1,4.5-1"/>
        <path d="M4.6,18.7c-1.3-1.6-2-3.7-1.9-5.9c0-4.6,3.8-8.3,8.3-8.3s8.3,3.7,8.3,8.3c0,2.2-0.7,4.3-1.9,5.9"/>
        <path d="M12,12.5L14,9"/>
    </svg>
)

const WhatsAppIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-foreground hover:text-primary" fill="none">
        <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.79.46 3.48 1.34 4.94l-1.38 5.02 5.14-1.35c1.41.81 3.02 1.26 4.68 1.26h.01c5.46 0 9.91-4.45 9.91-9.91S17.5 2 12.04 2m4.84 12.13c-.28.42-.98.79-1.37.84-.39.05-.83.05-1.27-.08-1.12-.34-2.5-1.1-4.13-2.65-1.95-1.85-3.23-4.14-3.3-4.24-.07-.1-.68-1.04-.68-1.9 0-.85.5-1.28.68-1.45s.34-.23.51-.23.34-.02.51.13c.17.15.68.79.76.92.08.13.11.3.03.46l-.34.59c-.08.13-.17.23-.34.39-.17.15-.34.3-.51.46-.2.2-.42.44-.2.81.22.37.98 1.63 2.11 2.69s2.08 1.61 2.5 1.76c.42.15.68.13.84-.03s.68-.78.85-.98c.17-.2.34-.15.59-.05l1.37.64c.25.12.42.18.49.28.07.1.07.51-.18.93Z" stroke="none" fill="currentColor"/>
    </svg>
)

const XIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-5 w-5 text-foreground hover:text-primary">
        <path d="M18 6 6 18"></path>
        <path d="m6 6 12 12"></path>
    </svg>
)

const SocialLinks = ({ isMobile = false }: { isMobile?: boolean }) => (
  <TooltipProvider>
    <div className={cn(
      "flex items-center gap-4",
      isMobile ? "flex-col items-start" : "flex-row items-center"
    )}>
        {isMobile && (
          <>
            <Link href="/uhurucoin" className="text-lg font-medium text-foreground hover:text-primary">UhuruCoin</Link>
            <Link href="/ai-chat" className="text-lg font-medium text-foreground hover:text-primary">AI Chat</Link>
            <Link href="/about-us" className="text-lg font-medium text-foreground hover:text-primary">About Us</Link>
            <Link href="/contact" className="text-lg font-medium text-foreground hover:text-primary">Contact</Link>
            <div className="pt-4" />
          </>
        )}
        <a href="mailto:hello@uhurutrade.com" className="text-base text-foreground hover:text-primary">
          hello@uhurutrade.com
        </a>
        <div className={cn(
            "flex items-center gap-4",
            isMobile && "flex-wrap justify-start"
        )}>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="https://www.instagram.com/uhurutrade/" aria-label="Instagram" prefetch={false}><Instagram className="h-5 w-5 text-foreground hover:text-primary" /></Link>
              </TooltipTrigger>
              <TooltipContent><p>Instagram</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="https://wa.me/447517074605" aria-label="WhatsApp" prefetch={false}><WhatsAppIcon /></Link>
              </TooltipTrigger>
              <TooltipContent><p>WhatsApp</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="https://www.linkedin.com/company/uhurutrade" aria-label="LinkedIn" prefetch={false}><Linkedin className="h-5 w-5 text-foreground hover:text-primary" /></Link>
              </TooltipTrigger>
              <TooltipContent><p>LinkedIn</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="https://x.com/UhurUtradeUk" aria-label="X/Twitter" prefetch={false}><XIcon /></Link>
              </TooltipTrigger>
              <TooltipContent><p>X / Twitter</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="https://www.amazon.co.uk/dp/B0DN2PJR65" aria-label="Amazon" prefetch={false}><AmazonIcon /></Link>
              </TooltipTrigger>
              <TooltipContent><p>Amazon</p></TooltipContent>
            </Tooltip>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link href="https://t.me/uhurutradeuk" aria-label="Telegram" prefetch={false}><Send className="h-5 w-5 text-foreground hover:text-primary" /></Link>
              </TooltipTrigger>
              <TooltipContent><p>Telegram</p></TooltipContent>
            </Tooltip>
        </div>
    </div>
  </TooltipProvider>
);

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-zinc-100 dark:bg-background border-border/40 dark:bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto flex h-24 max-w-7xl items-center justify-between px-4 md:px-10">
        <div className="flex-1 flex justify-start">
            <Link href="/" className="flex items-center" prefetch={false}>
            <Logo />
            </Link>
        </div>

        <div className="hidden md:flex flex-1 justify-center items-center gap-4">
          <Link href="/uhurucoin" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            UhuruCoin
          </Link>
          <Link href="/ai-chat" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
            AI Chat
          </Link>
        </div>

        <div className="hidden md:flex flex-1 justify-end items-center gap-4">
          <SocialLinks />
          <ThemeToggle />
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggle />
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle navigation menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <div className="grid gap-6 py-6">
                <Link href="/" className="flex items-center" prefetch={false}>
                  <Logo />
                </Link>
                <div className="flex flex-col items-start gap-4">
                  <SocialLinks isMobile={true} />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
