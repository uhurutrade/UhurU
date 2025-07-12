
import Header from '@/components/uhuru/header';
import Hero from '@/components/uhuru/hero';
import Features from '@/components/uhuru/features';
import Testimonials from '@/components/uhuru/testimonials';
import Footer from '@/components/uhuru/footer';

export default function Home() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <Header />
      <main className="flex-1">
        <Hero />
        <Features />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
