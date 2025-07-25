
import SubPageHeader from '@/components/uhuru/subpage-header';
import Link from 'next/link';

export default function AirdropLegalTermsPage() {
  const lastUpdated = "July 18, 2024";

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SubPageHeader backHref="/uhuru-airdrop" backText="Back to Airdrop" />
      <main className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-16 lg:py-24">
        <div className="prose prose-xs prose-invert max-w-none text-muted-foreground">
          <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">Legal Terms for UHURU Token Airdrop</h1>

          <p className="text-sm italic">Last updated: {lastUpdated}</p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">1. Introduction & Acceptance</h2>
          <p>
            These Legal Terms for Token Airdrop ("Terms") govern your participation in the UHURU Coin Airdrop ("Airdrop") offered by Uhuru Trade Ltd. ("we", "our", or "us"). By submitting the airdrop form, you acknowledge that you have read, understood, and agree to be bound by these Terms, as well as our general <Link href="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link> and <Link href="/cookie-policy" className="underline hover:text-foreground">Cookie Policy</Link>. If you do not agree to these terms, do not participate in the Airdrop.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">2. Eligibility</h2>
          <p>
            To be eligible for the Airdrop, you must meet all the requirements stated on the Airdrop page, which may include following social media accounts and joining community channels. You must also provide a valid Polygon (MATIC) network wallet address. We reserve the right to disqualify any participant who does not meet the eligibility criteria or is found to be engaging in fraudulent activities, such as using multiple accounts. Participants are responsible for ensuring their participation does not violate any local laws or regulations.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">3. Token Distribution</h2>
          <p>
            The distribution of UHURU tokens is at our sole discretion. Successful completion of the required steps does not guarantee receipt of tokens. The quantity of tokens distributed may vary. We will announce the distribution schedule through our official channels. You are responsible for the security of your wallet and private keys. We are not responsible for any loss of tokens.
          </p>
          
          <h2 className="mt-8 text-2xl font-semibold text-foreground">4. No Financial Value or Advice</h2>
          <p>
            The UHURU tokens distributed in this Airdrop are provided free of charge as a reward for community support. The tokens are not an investment, security, or financial instrument. Participation in this Airdrop does not constitute an offer of securities. The information provided does not constitute financial, investment, or legal advice. You should conduct your own research and consult with professional advisors before making any financial decisions.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">5. Limitation of Liability & Disclaimer</h2>
          <p>
            To the fullest extent permissible by law, Uhuru Trade Ltd. disclaims all liability for any direct, indirect, incidental, or consequential damages arising out of your participation in the Airdrop. The Airdrop is provided on an "as is" and "as available" basis without warranties of any kind. We do not guarantee the value, utility, or long-term viability of the UHURU token.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">6. Changes and Termination</h2>
          <p>
            We reserve the right to modify, suspend, or terminate the Airdrop and these Terms at any time without prior notice. It is your responsibility to review these Terms periodically for changes.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">7. Contact</h2>
          <p>
            If you have any questions about these Terms, please contact us at: <a href="mailto:hello@uhurutrade.com" className="underline hover:text-foreground">hello@uhurutrade.com</a>.
          </p>
        </div>
      </main>
    </div>
  );
}
