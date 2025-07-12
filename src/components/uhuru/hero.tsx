"use client";

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Logo from './logo';

export default function Hero() {

  return (
    <section className="w-full pt-12 md:pt-24 lg:pt-32 pb-6 md:pb-12 lg:pb-16 bg-background dark:bg-background">
      <div className="container mx-auto grid max-w-7xl gap-8 px-4 md:px-10 lg:grid-cols-2 lg:gap-16">
        <div className="flex flex-col justify-center space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none font-headline">
              When we talk tech, money listens
            </h1>
            <p className="max-w-[600px] text-muted-foreground md:text-xl">
              AI Agency • Corporate & IT Consulting • Amazon FBA Business • Smart Investments
            </p>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-primary">
              <Link href="/about-us">Click Us</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-2 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:bg-transparent dark:hover:text-white">
              <Link href="/contact">Contact</Link>
            </Button>
          </div>
        </div>
        <div className="group relative mx-auto flex h-[300px] w-[300px] items-center justify-center">
            <div className="h-full w-full overflow-hidden rounded-full shadow-lg transition-transform duration-500 ease-in-out group-hover:scale-110 group-hover:shadow-primary/50">
                <video
                    src="https://videos.pexels.com/video-files/3209828/3209828-hd_1920_1080_25fps.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                    className="h-full w-full object-cover"
                >
                </video>
            </div>
            <div className="absolute transition-transform duration-500 ease-in-out group-hover:scale-110">
                <Logo isHero={true} />
            </div>
        </div>
      </div>
    </section>
  );
}
