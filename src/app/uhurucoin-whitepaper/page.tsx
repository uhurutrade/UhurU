
import SubPageHeader from '@/components/uhuru/subpage-header';
import Link from 'next/link';

export default function UhuruCoinWhitepaperPage() {
  const lastUpdated = "July 26, 2024";

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SubPageHeader backHref="/uhurucoin" backText="Back to UhuruCoin" />
      <main className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-16 lg:py-24">
        <div className="prose prose-xs prose-invert max-w-none text-muted-foreground space-y-6">
          <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">UhuruCoin (UHURU) Whitepaper</h1>

          <p className="text-sm italic">Last updated: {lastUpdated}</p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">1. Abstract</h2>
          <p>
            This document outlines the vision, tokenomics, and technical architecture of UhuruCoin (UHURU), the native utility and loyalty token of the UhurU Trade Ltd. ecosystem. UHURU is designed to create a symbiotic relationship between our company and our community, rewarding loyalty and enabling shared success.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">2. Introduction: The UhurU Vision</h2>
          <p>
            UhurU Trade Ltd. is dedicated to empowering businesses through integrated technology and financial solutions. We believe in transparency, innovation, and community. UhuruCoin is the manifestation of these values, a digital asset that aligns the interests of our clients with our own growth trajectory.
          </p>

           <h2 className="mt-8 text-2xl font-semibold text-foreground">3. Tokenomics</h2>
          <p>
            The economic model of UHURU is designed for sustainable growth and long-term value.
          </p>
           <ul className="list-disc pl-6 space-y-2">
            <li><strong>Total Supply:</strong> [To be defined]</li>
            <li><strong>Token Distribution:</strong> [Details on allocation for community, team, treasury, etc.]</li>
            <li><strong>Utility:</strong> [Details on using UHURU for services, governance, etc.]</li>
          </ul>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">4. Roadmap</h2>
          <p>
            Our development roadmap is structured in phases to ensure steady progress and milestone achievement.
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Phase 1:</strong> Launch & Airdrop</li>
            <li><strong>Phase 2:</strong> Service Integration & Loyalty Program</li>
            <li><strong>Phase 3:</strong> Community Governance & DAO</li>
            <li><strong>Phase 4:</strong> Ecosystem Expansion</li>
          </ul>
          
          <h2 className="mt-8 text-2xl font-semibold text-foreground">5. Disclaimer</h2>
          <p>
            This whitepaper is for informational purposes only and does not constitute an offer to sell, a solicitation of an offer to buy, or a recommendation for any security or financial instrument. Please consult with your financial advisor before making any investment decisions.
          </p>
        </div>
      </main>
    </div>
  );
}
