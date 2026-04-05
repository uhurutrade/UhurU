import Link from "next/link";
import { Linkedin, Instagram, Send } from "lucide-react";
import Logo from "./logo";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

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


export default function Footer() {
  return (
    <footer className="w-full bg-zinc-100 dark:bg-background border-t">
      <TooltipProvider>
        <div className="container mx-auto max-w-[1800px] px-6 py-8 md:px-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 lg:gap-12">
              <div className="flex-shrink-0 scale-90 origin-left">
                <Logo />
              </div>

              <div className="flex-1 text-center text-[10px] md:text-[11px] text-foreground/70 font-medium leading-relaxed px-4 whitespace-nowrap">
                  <p>
                      © <Link href="/uhuru-statement-2024-2025" className="underline hover:text-primary transition-colors">2025</Link> All rights reserved. Uhuru Trade Ltd. Company no. 15883242 – Unit 13 Freeland Park Wareham Road. Lytchett <Link href="/rag_ucm" className="underline hover:text-primary transition-colors">Matravers</Link> – BH16 6FA Poole – UK <Link href="/privacy-policy" className="underline hover:text-primary transition-colors">Privacy Policy</Link> • <Link href="/cookie-policy" className="underline hover:text-primary transition-colors">Cookie Policy</Link>
                  </p>
              </div>

              <div className="flex items-center gap-8 flex-shrink-0">
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="https://www.linkedin.com/company/uhurutrade" aria-label="LinkedIn" prefetch={false} className="transition-transform hover:scale-125"><Linkedin className="h-4 w-4 text-foreground hover:text-primary" /></Link>
                    </TooltipTrigger>
                    <TooltipContent><p>LinkedIn</p></TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="https://www.instagram.com/uhurutrade/" aria-label="Instagram" prefetch={false} className="transition-transform hover:scale-125"><Instagram className="h-4 w-4 text-foreground hover:text-primary" /></Link>
                    </TooltipTrigger>
                    <TooltipContent><p>Instagram</p></TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="https://wa.me/447517074605" aria-label="WhatsApp" prefetch={false} className="transition-transform hover:scale-125"><WhatsAppIcon /></Link>
                    </TooltipTrigger>
                    <TooltipContent><p>WhatsApp</p></TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="https://x.com/UhurUtradeUk" aria-label="X/Twitter" prefetch={false} className="transition-transform hover:scale-125"><XIcon /></Link>
                    </TooltipTrigger>
                    <TooltipContent><p>X / Twitter</p></TooltipContent>
                  </Tooltip>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link href="https://t.me/uhurutradeuk" aria-label="Telegram" prefetch={false} className="transition-transform hover:scale-125"><Send className="h-4 w-4 text-foreground hover:text-primary" /></Link>
                    </TooltipTrigger>
                    <TooltipContent><p>Telegram</p></TooltipContent>
                  </Tooltip>
              </div>
          </div>
        </div>
      </TooltipProvider>
    </footer>
  );
}
