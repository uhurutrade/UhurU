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

            <Button asChild size="lg" variant="outline" className="border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-transparent dark:hover:text-white order-2">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}