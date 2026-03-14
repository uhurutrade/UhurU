"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function Hero() {
  // Flag para controlar la visualización del vídeo. 
  // Cambiar a true para volver a mostrarlo.
  const showVideo = false;

  return (
    <section className="w-full pt-12 md:pt-24 lg:pt-32 pb-6 md:pb-12 lg:pb-16 bg-background dark:bg-background">
      <div className={cn(
        "container mx-auto max-w-7xl px-4 md:px-10",
        showVideo ? "grid gap-8 lg:grid-cols-2 lg:gap-16" : "flex flex-col items-center text-center"
      )}>
        <div className={cn(
          "flex flex-col justify-center space-y-6",
          !showVideo ? "w-full max-w-full" : "w-full"
        )}>
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tighter font-headline leading-[1.1]">
              When we talk tech, money listens
            </h1>
            <p className={cn(
              "text-muted-foreground md:text-xl",
              showVideo ? "max-w-[600px]" : "mx-auto max-w-[900px]"
            )}>
              AI Agency • Corporate & IT Consulting • Amazon FBA Business • Smart Investments.
            </p>
          </div>
          <div className={cn(
            "flex flex-col gap-4 sm:flex-row",
            !showVideo && "justify-center"
          )}>
            <Button asChild size="lg" className="border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary">
              <Link href="/about-us">Click Us</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-transparent dark:hover:text-white">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </div>

        {showVideo && (
          <div className="group relative mx-auto flex h-[300px] w-[300px] items-center justify-center">
              <div className="h-full w-full overflow-hidden rounded-full shadow-lg transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:shadow-primary/50 border-2 border-black dark:border-white">
                  <video
                      src="/videos/UhurU.mp4?v=3"
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="h-full w-full object-cover"
                  >
                  </video>
              </div>
          </div>
        )}
      </div>
    </section>
  );
}
