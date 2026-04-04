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
    <section className="relative w-full pt-10 md:pt-16 lg:pt-20 pb-0 bg-background dark:bg-background overflow-visible">
      <div className="container mx-auto max-w-7xl px-4 md:px-10 flex flex-col items-center text-center relative overflow-visible">
        <div className="flex flex-col justify-center space-y-6 w-full max-w-full relative">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter font-headline leading-[1.1]">
              When we talk tech, money listens
            </h1>
            <p className="text-muted-foreground md:text-xl mx-auto max-w-[900px]">
              AI Agency • Corporate & IT Consulting • Amazon FBA Business • Smart Investments
            </p>
          </div>
          
          <div className="flex flex-col gap-6 sm:flex-row justify-center items-center relative z-20 mt-4">
            <Button asChild size="lg" className="border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary order-1">
              <Link href="/about-us">Click Us</Link>
            </Button>

            {/* Promo Badge - Integrated with buttons */}
            {mounted && (
              <Link href="/services/skillhub" className="order-none sm:order-2 group z-30 flex shrink-0">
                <div className="flex flex-col items-center justify-center transform hover:scale-110 transition-all duration-300">
                  <div className="transform -rotate-12 flex flex-col items-center opacity-95 group-hover:opacity-100 group-hover:-rotate-6 transition-all duration-300">
                    <span className="text-blue-500 font-black text-4xl md:text-5xl lg:text-6xl tracking-tighter drop-shadow-2xl">
                      £18
                    </span>
                    <span className="text-white font-black text-[8px] md:text-[10px] tracking-normal -mt-2 drop-shadow-md">
                      1 Week Access
                    </span>
                    <span className="text-blue-400 font-black text-[8px] md:text-[10px] tracking-normal mt-0.5 drop-shadow-lg">
                      Oracle Fusion
                    </span>
                  </div>
                </div>
              </Link>
            )}

            <Button asChild size="lg" variant="outline" className="border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-transparent dark:hover:text-white order-3">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}