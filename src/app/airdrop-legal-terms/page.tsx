
import SubPageHeader from '@/components/uhuru/subpage-header';
import Link from 'next/link';

export default function AirdropLegalTermsPage() {
  const lastUpdated = "July 25, 2025";

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SubPageHeader backHref="/uhuru-airdrop" backText="Back to Airdrop" />
      <main className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-16 lg:py-24">
        <div className="prose prose-xs prose-invert max-w-none text-muted-foreground">
          <h1 className="mb-6 text-3xl font-bold text-foreground md:text-4xl">Legal Terms for UHURU Token Airdrop</h1>

          <p className="text-sm italic">Last updated: {lastUpdated}</p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">1. Introduction &amp; Acceptance</h2>
          <p>
            These Legal Terms ("Terms") govern your participation in the UHURU Token Airdrop ("Airdrop") operated by Uhuru Trade Ltd., a company registered in the United Kingdom (Company No. 15883242), with its registered office at Unit 13 Freeland Park, Wareham Road, Lytchett Matravers, BH16 6FA Poole, UK ("we", "our", or "us").
          </p>
          <p>
            By participating in the Airdrop, you confirm that you have read, understood, and agree to be bound by these Terms, along with our <Link href="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link> and <Link href="/cookie-policy" className="underline hover:text-foreground">Cookie Policy</Link>.
          </p>
          <p>
            If you do not agree to these Terms, you must not participate in the Airdrop.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">2. Eligibility &amp; Verification</h2>
          <p>To be eligible:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>You must follow the steps outlined on uhurutrade.com/uhuru-airdrop, which may include actions like joining our social media accounts.</li>
            <li>You must provide a valid Polygon (MATIC) wallet address.</li>
            <li>You must be at least 18 years old and not reside in a jurisdiction that prohibits participation in cryptocurrency airdrops.</li>
          </ul>
          <p>We reserve the right to:</p>
           <ul className="list-disc pl-6 space-y-2">
            <li>Verify submitted data (including IP addresses, wallet activity, and social media engagement) to prevent fraud or abuse.</li>
            <li>Disqualify participants suspected of using multiple accounts, false identities, or automated tools.</li>
            <li>Refuse distribution to any user at our sole discretion.</li>
          </ul>
          <p>
            Only one claim per individual is allowed. Attempts to receive multiple distributions using different identities/accounts will result in disqualification.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">3. Token Distribution</h2>
          <p>UHURU tokens will be distributed:</p>
           <ul className="list-disc pl-6 space-y-2">
            <li>Free of charge as part of the airdrop campaign to qualified users.</li>
            <li>Automatically, as a 5% bonus of the total value of any paid service contracted through our platform, including deposits or prepayments.</li>
          </ul>
           <p>Once tokens are sent:</p>
           <ul className="list-disc pl-6 space-y-2">
            <li>They become the full property of the recipient.</li>
            <li>In the case of service cancellation and refund, the equivalent market value (at refund time) of the distributed UHURU tokens will be deducted from the amount returned.</li>
          </ul>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">4. Token Ownership &amp; Redemption</h2>
          <p>Once received, UHURU tokens:</p>
           <ul className="list-disc pl-6 space-y-2">
              <li>Belong exclusively to the recipient.</li>
              <li>May be exchanged at any time for USDT, through compatible DEXs and platforms such as PolygonScan, DexTools, GeckoTerminal, or DexScreener.</li>
              <li>Do not represent shares, securities, or financial instruments, and are not an investment product.</li>
           </ul>
          
          <h2 className="mt-8 text-2xl font-semibold text-foreground">5. Limitations, Rights &amp; Cancellation</h2>
           <p>Uhuru Trade Ltd. retains the right to:</p>
           <ul className="list-disc pl-6 space-y-2">
            <li>Modify, pause, or cancel the airdrop campaign at any time, with a minimum 7-day public notice posted on uhurutrade.com.</li>
            <li>Withhold or reverse token distribution in case of fraudulent behavior, breach of these Terms, or legal requirements.</li>
          </ul>
          <p>
            Participation is at your own risk. We make no guarantees as to the current or future value, listing, or usability of the UHURU token. The Airdrop is offered on an “as is” basis.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">6. Data &amp; Compliance</h2>
          <p>
            We collect and process your personal data in accordance with the UK GDPR and the Data Protection Act 2018. This includes:
          </p>
           <ul className="list-disc pl-6 space-y-2">
            <li>Data you submit via the Airdrop form.</li>
            <li>Technical data such as IP address, browser information, and device metadata.</li>
          </ul>
           <p>
            Your data will only be used to manage your participation and prevent abuse. Full details are available in our <Link href="/privacy-policy" className="underline hover:text-foreground">Privacy Policy</Link>.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">7. Contact</h2>
          <p>
            For any questions regarding the Airdrop or these Terms, please contact:
            <br />
            📧 <a href="mailto:hello@uhurutrade.com" className="underline hover:text-foreground">hello@uhurutrade.com</a>
          </p>
        </div>
      </main>
    </div>
  );
}
