
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import SubPageHeader from '@/components/uhuru/subpage-header';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import Link from 'next/link';
import { Blocks } from 'lucide-react';


export default function UhuruCoinWhitepaperPage() {
  const lastUpdated = "July 26, 2024";

  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SubPageHeader backHref="/uhuru-airdrop" backText="Back to Airdrop" />
      <main className="container mx-auto max-w-4xl px-4 py-8 md:px-6 md:py-16 lg:py-24">
        <div className="prose prose-xs prose-invert max-w-none text-muted-foreground space-y-6">
          <div className="text-center mb-8">
            <div className="flex justify-center items-center gap-3 mb-4">
              <Blocks className="h-10 w-10 text-primary" />
            </div>
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">UhuruCoin WhitePaper – A Decentralized Future for Digital Commerce and Services</h1>
          </div>
          
          <p className="text-sm italic">Last updated: {lastUpdated}</p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">1. Executive Summary</h2>
          <p>
            UhuruCoin is a digital token created by Uhuru Trade Ltd. (Company No. 15883242, registered in the United Kingdom), designed to revolutionize access to commercial, financial, and technological services on a global scale. The purpose of UhuruCoin is to democratize access to digital and financial services, making them fairer, more efficient, and transparent through blockchain technology on the Polygon (MATIC) network. UhuruCoin will be the cornerstone offering bonuses, discounts, premium access, and community participation within the ecosystem, while also laying the groundwork for future decentralized governance. Our vision is to build a self-sustaining digital economy where value is shared equitably among its participants.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">2. Introduction: Problem and Solution</h2>
          <p>The digital and financial services sector currently suffers from issues such as:</p>
          <ul className="list-disc pl-6 space-y-2">
            <li>High costs and intermediary fees</li>
            <li>Slow processes, friction, and inefficiencies</li>
            <li>Lack of transparency and unequal access due to regulatory or geographical barriers</li>
          </ul>
          <p>
            Uhuru Trade Ltd. responds with a blockchain-based platform that enables trading, digital consulting, and access to international financial opportunities securely, instantly, and without entry barriers. Through the UhuruCoin token, loyalty is rewarded, costs are reduced, and an active community is incentivized to influence the platform's future development.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">3. The UhuruCoin Token: Purpose and Utility</h2>
          <p>
            UhuruCoin is an ERC-20 standard token deployed on the Polygon (MATIC) blockchain, chosen for its efficiency, low fees, and scalability.
          </p>
          <p><strong>Primary utilities of the token:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Automatic Bonus (5%):</strong> Users receive 5% of the total amount paid for platform services back in UhuruCoin tokens.</li>
            <li><strong>Exclusive Discounts:</strong> Access to preferential rates, special content, and premium features for holders.</li>
            <li><strong>Premium Feature Access:</strong> Advanced tools, priority support, and reserved events or webinars.</li>
            <li><strong>Loyalty Rewards:</strong> Additional incentives for activities, referrals, and active membership.</li>
            <li><strong>On-Platform Payment Method:</strong> In the future, UhuruCoin will allow for direct payment of services.</li>
            <li><strong>Free Exchange and Liquidity:</strong> The token is exchangeable for USDT and other cryptocurrencies on DEXs compatible with Polygon (e.g., PolygonScan, DexTools, GeckoTerminal, DexScreener).</li>
          </ul>
          <p><i>Note: UhuruCoin does not represent shares, corporate rights, or regulated financial instruments.</i></p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">4. Tokenomics</h2>
          <p>The total supply is 1,000,000,000 UHURU (one billion units of the UhuruCoin token, with 18 decimal places). The ticker symbol for the coin is UHURU.</p>
           <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-foreground">Category</TableHead>
                <TableHead className="text-foreground">Percentage</TableHead>
                <TableHead className="text-foreground">Token Amount (UHURU)</TableHead>
                <TableHead className="text-foreground">Vesting / Notes</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-semibold text-foreground">Initial Airdrop</TableCell>
                <TableCell>15%</TableCell>
                <TableCell>150,000,000</TableCell>
                <TableCell>Free distribution, promotion, and adoption</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-foreground">Service Bonuses</TableCell>
                <TableCell>35%</TableCell>
                <TableCell>350,000,000</TableCell>
                <TableCell>Progressive release based on actual usage</TableCell>
              </TableRow>
               <TableRow>
                <TableCell className="font-semibold text-foreground">Team and Advisors</TableCell>
                <TableCell>15%</TableCell>
                <TableCell>150,000,000</TableCell>
                <TableCell>24-month vesting period</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-foreground">Marketing and Development</TableCell>
                <TableCell>20%</TableCell>
                <TableCell>200,000,000</TableCell>
                <TableCell>Promotion, partnerships, campaigns</TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-semibold text-foreground">Liquidity Fund</TableCell>
                <TableCell>15%</TableCell>
                <TableCell>150,000,000</TableCell>
                <TableCell>Ensuring liquidity on DEXs</TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <p><strong>Additional Mechanisms:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Tokens are distributed as appropriate based on participation, compliance, or contracted services.</li>
            <li>Service cancellations/refunds will deduct the value of UhuruCoin delivered to the user at the current market rate.</li>
            <li>The smart contract allows for minting and burning, providing potential for future adoption control or programmable deflation.</li>
          </ul>
          <p><strong>Token Burn Strategy:</strong> To potentially enhance token value and reward long-term holders, the smart contract includes a `burn` function. This feature could be used in the future, as governed by community proposals, to permanently remove a portion of tokens from circulation, for instance, by using a percentage of platform revenues. This creates a deflationary pressure that can benefit all token holders.</p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">5. Technology and Architecture</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Network:</strong> Polygon (MATIC)</li>
            <li><strong>Technical Standard:</strong> ERC-20</li>
            <li><strong>Decimals:</strong> 18</li>
            <li><strong>Smart Contract:</strong> <a href="https://polygonscan.com/token/0x1bAE132558bEAB063B82300857E8593E3734D1B0" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground break-all">0x1bAE132558bEAB063B82300857E8593E3734D1B0</a></li>
            <li><strong>Explorers:</strong> PolygonScan, DexTools, GeckoTerminal, DexScreener</li>
          </ul>
           <p><strong>Technical Highlights:</strong></p>
           <ul className="list-disc pl-6 space-y-2">
            <li>Minting and burning are exclusively controlled by the "owner" (Uhuru Trade Ltd.); includes a pause function for transfers in emergencies.</li>
            <li>Token recovery feature to retrieve tokens sent by user error.</li>
            <li>Compatible with standard wallets and DEXs in the Polygon/Ethereum ecosystem.</li>
            <li>Professionally backed: code based on OpenZeppelin + extension of security TokenRecover.</li>
            <li>Integrated with the platform to manage bonuses and utilities without manual intervention.</li>
          </ul>
          <p><strong>Security and Audits:</strong> Security is paramount. Although the contract is based on battle-tested OpenZeppelin libraries, it will undergo a comprehensive security audit by a reputable third-party firm before any major ecosystem expansion. The results of this audit will be made public to ensure full transparency and build community trust.</p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">6. Roadmap</h2>
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="text-foreground">Phase</TableHead>
                        <TableHead className="text-foreground">Timeline</TableHead>
                        <TableHead className="text-foreground">Key Milestones</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <TableRow>
                        <TableCell className="font-semibold text-foreground">1. Launch</TableCell>
                        <TableCell>Q3 2025</TableCell>
                        <TableCell>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Official company registration and foundation.</li>
                                <li>Deployment and public verification of the smart contract.</li>
                                <li>Public launch of airdrop campaign and usage-based bonus program.</li>
                                <li>Listing on explorers and initial DEX platforms.</li>
                                <li>Community building initiatives on social platforms.</li>
                            </ul>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-semibold text-foreground">2. Expansion & Utility</TableCell>
                        <TableCell>Q4 2025 – Q2 2026</TableCell>
                        <TableCell>
                            <ul className="list-disc pl-4 space-y-1">
                                <li>Full implementation of all digital/consulting service modules.</li>
                                <li>Full enablement of discounts/benefits via UhuruCoin.</li>
                                <li>Launch of loyalty program, referral rewards, and community incentives.</li>
                                <li>First strategic commercial and technological partnerships.</li>
                                <li>Global adoption and digital marketing campaigns.</li>
                                <li>Integration of the UhuruCoin token as a payment method for select services.</li>
                            </ul>
                        </TableCell>
                    </TableRow>
                    <TableRow>
                        <TableCell className="font-semibold text-foreground">3. Governance & Scaling</TableCell>
                        <TableCell>2026+</TableCell>
                        <TableCell>
                             <ul className="list-disc pl-4 space-y-1">
                                <li>Proposal for governance (DAO) and community voting.</li>
                                <li>Multichain integration and new digital products/services.</li>
                                <li>Development of burn/repurchase mechanisms if required by the market.</li>
                                <li>Expansion into emerging markets and related verticals.</li>
                                <li>Exploring cross-chain interoperability to expand the token's reach.</li>
                            </ul>
                        </TableCell>
                    </TableRow>
                </TableBody>
            </Table>
          
          <h2 className="mt-8 text-2xl font-semibold text-foreground">7. Management Team and Advisors</h2>
          <p>
            The UhuruCoin project is led by a team of seasoned professionals with proven track records in technology, software, consulting, and international business management. To ensure maximum transparency and foster trust with our community, the full details of our core team and advisors, including their verifiable LinkedIn profiles and professional backgrounds, will be made publicly available prior to the conclusion of our initial launch phase.
          </p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">8. Legal Framework and Regulatory Considerations</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Participation Terms:</strong> Airdrop and utility terms are effective from July 25, 2025. See the official <Link href="/airdrop-legal-terms" className="underline hover:text-foreground">terms here</Link>.</li>
            <li><strong>Disclaimer:</strong> The UhuruCoin token is a utility token and is not a share, security, financial instrument, or traditional investment. Its value depends solely on its utility and market dynamics.</li>
            <li><strong>Inherent Risks:</strong> Participating, holding, or exchanging UhuruCoin involves risks such as volatility, loss of value, or regulatory changes.</li>
            <li><strong>Right to Modify:</strong> Uhuru Trade Ltd. may modify, pause, or cancel the airdrop/utility campaign with a minimum of 7 days' public notice.</li>
            <li><strong>Data Protection:</strong> Strict compliance with UK GDPR and the Data Protection Act 2018.</li>
            <li><strong>Contact for inquiries:</strong> <a href="mailto:hello@uhurutrade.com" className="underline hover:text-foreground">hello@uhurutrade.com</a></li>
          </ul>
          
          <h2 className="mt-8 text-2xl font-semibold text-foreground">9. Corporate Information and Transparency</h2>
            <Table>
                <TableBody>
                    <TableRow><TableCell className="font-semibold text-foreground">Legal Name</TableCell><TableCell>Uhuru Trade Ltd.</TableCell></TableRow>
                    <TableRow><TableCell className="font-semibold text-foreground">Company Register</TableCell><TableCell>Companies House UK</TableCell></TableRow>
                    <TableRow><TableCell className="font-semibold text-foreground">Company Number</TableCell><TableCell>15883242</TableCell></TableRow>
                    <TableRow><TableCell className="font-semibold text-foreground">Address</TableCell><TableCell>Unit 13 Freeland Park, Wareham Road, Poole, BH16 6FA, England</TableCell></TableRow>
                    <TableRow><TableCell className="font-semibold text-foreground">Nature of Business</TableCell><TableCell>Digital sales, software development, IT and business consulting</TableCell></TableRow>
                    <TableRow><TableCell className="font-semibold text-foreground">Status</TableCell><TableCell>Active</TableCell></TableRow>
                    <TableRow><TableCell className="font-semibold text-foreground">Incorporation Date</TableCell><TableCell>August 7, 2024</TableCell></TableRow>
                    <TableRow><TableCell className="font-semibold text-foreground">UhuruCoin Contract (Polygon)</TableCell><TableCell className="break-all">0x1bAE132558bEAB063B82300857E8593E3734D1B0</TableCell></TableRow>
                    <TableRow><TableCell className="font-semibold text-foreground">Official Website</TableCell><TableCell><a href="https://uhurutrade.com" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">uhurutrade.com</a></TableCell></TableRow>
                </TableBody>
            </Table>
            <p>To verify legal, administrative, or corporate information, please consult the <a href="https://find-and-update.company-information.service.gov.uk/company/15883242" target="_blank" rel="noopener noreferrer" className="underline hover:text-foreground">Official Profile on Companies House UK</a>.</p>

          <h2 className="mt-8 text-2xl font-semibold text-foreground">10. Important Notice</h2>
          <p>
            This document does not constitute an investment offer, financial prospectus, or regulated security in any jurisdiction. Its function is to serve as an informational and technical reference. Always consult the official and updated version on our website. For any official inquiries or requests for supplementary documentation, please contact us at <a href="mailto:hello@uhurutrade.com" className="underline hover:text-foreground">hello@uhurutrade.com</a>.
          </p>

        </div>
      </main>
    </div>
  );
}
