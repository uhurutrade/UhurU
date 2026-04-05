"use client";

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { ArrowRight } from 'lucide-react';

export default function Hero() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <section className="relative w-full pt-10 md:pt-16 lg:pt-20 pb-8 md:pb-12 bg-background dark:bg-background overflow-visible">
      <div className="container mx-auto max-w-7xl px-4 md:px-10 flex flex-col items-center text-center relative overflow-visible">
        <div className="flex flex-col justify-center space-y-6 w-full max-w-full relative">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter font-headline leading-[1.1]">
              When we talk tech, money listens
            </h1>
            <p className="text-muted-foreground md:text-xl mx-auto max-w-[900px]">
              AI Agency • Corporate & IT Consulting • Smart Investments • Amazon FBA Business
            </p>
          </div>
          
          <div className="flex flex-col gap-2 items-center justify-center mt-4">
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center relative z-20 w-full">
              <Button asChild size="lg" className="border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary order-1">
                <Link href="/about-us">Click Us</Link>
              </Button>

              <Button asChild size="lg" variant="outline" className="border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-transparent dark:hover:text-white order-2">
                <Link href="/contact">Contact</Link>
              </Button>
            </div>

            {/* Pricing Badges Row - below buttons */}
            <div className="flex flex-row items-end justify-center gap-6 sm:gap-10 mt-8 flex-wrap">

              {/* £18 - 7 Days */}
              <Link href="/services/skillhub" className="group z-30 block">
                <div
                  className="flex flex-col items-center cursor-pointer transition-all duration-500 ease-in-out"
                  style={{ transform: 'rotate(-14deg)' }}
                  onMouseEnter={e => { 
                    e.currentTarget.style.transform = 'rotate(-5deg) scale(1.12) translateY(-10px)';
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.transform = 'rotate(-14deg)';
                  }}
                >
                  <span className="text-primary dark:text-primary font-black text-3xl md:text-4xl lg:text-[43px] tracking-tighter drop-shadow-none dark:drop-shadow-[0_4px_10px_rgba(59,130,246,0.3)]">£18</span>
                  <span className="text-black dark:text-white font-black text-[10px] md:text-[11px] lg:text-[12px] tracking-normal mt-0.5 whitespace-nowrap">7 Days Access</span>
                  <span className="text-primary dark:text-primary font-black text-[10px] md:text-[11px] lg:text-[12px] tracking-normal mt-0.5">Oracle Fusion</span>
                </div>
              </Link>

              {/* £59 - 30 Days */}
              <Link href="/services/skillhub" className="group z-30 block">
                <div
                  className="flex flex-col items-center cursor-pointer transition-all duration-500 ease-in-out"
                  style={{ transform: 'rotate(-10deg)' }}
                  onMouseEnter={e => { 
                    e.currentTarget.style.transform = 'rotate(-3deg) scale(1.12) translateY(-10px)';
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.transform = 'rotate(-10deg)';
                  }}
                >
                  <span className="text-primary dark:text-primary font-black text-3xl md:text-4xl lg:text-[43px] tracking-tighter drop-shadow-none dark:drop-shadow-[0_4px_10px_rgba(59,130,246,0.3)]">£59</span>
                  <span className="text-black dark:text-white font-black text-[10px] md:text-[11px] lg:text-[12px] tracking-normal mt-0.5 whitespace-nowrap">30 Days Access</span>
                  <span className="text-primary dark:text-primary font-black text-[10px] md:text-[11px] lg:text-[12px] tracking-normal mt-0.5">Oracle Fusion</span>
                </div>
              </Link>

              {/* £147 - 90 Days */}
              <Link href="/services/skillhub" className="group z-30 block">
                <div
                  className="flex flex-col items-center cursor-pointer transition-all duration-500 ease-in-out"
                  style={{ transform: 'rotate(-7deg)' }}
                  onMouseEnter={e => { 
                    e.currentTarget.style.transform = 'rotate(-1deg) scale(1.12) translateY(-10px)';
                  }}
                  onMouseLeave={e => { 
                    e.currentTarget.style.transform = 'rotate(-7deg)';
                  }}
                >
                  <span className="text-primary dark:text-primary font-black text-3xl md:text-4xl lg:text-[43px] tracking-tighter drop-shadow-none dark:drop-shadow-[0_4px_10px_rgba(59,130,246,0.3)]">£147</span>
                  <span className="text-black dark:text-white font-black text-[10px] md:text-[11px] lg:text-[12px] tracking-normal mt-0.5 whitespace-nowrap">90 Days Access</span>
                  <span className="text-primary dark:text-primary font-black text-[10px] md:text-[11px] lg:text-[12px] tracking-normal mt-0.5">Oracle Fusion</span>
                </div>
              </Link>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}