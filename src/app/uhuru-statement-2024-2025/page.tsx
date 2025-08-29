
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import SubPageHeader from '@/components/uhuru/subpage-header';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { FileText, Sigma, Scale, GanttChartSquare, Landmark, CalendarClock, KeyRound } from 'lucide-react';

const KeyFigure = ({ title, value, isLoss = false }: { title: string, value: string, isLoss?: boolean }) => (
  <div className="flex flex-col items-center justify-center rounded-lg border bg-card p-4 text-center">
    <dt className="text-sm font-medium text-muted-foreground">{title}</dt>
    <dd className={`text-2xl font-bold ${isLoss ? 'text-destructive' : 'text-foreground'}`}>{value}</dd>
  </div>
);


export default function UhuruStatementPage() {
  return (
    <div className="min-h-dvh bg-background text-foreground">
      <SubPageHeader backHref="/" backText="Back to Home" />
      <main className="container mx-auto max-w-5xl px-4 py-8 md:px-6 md:py-16 lg:py-24">
        <div className="space-y-12">
          <header className="text-center">
            <div className="flex justify-center mb-4">
              <FileText className="h-12 w-12 text-primary" />
            </div>
            <h1 className="text-3xl font-bold text-foreground md:text-4xl font-headline">
              Financial Statement – Uhuru Trade Ltd
            </h1>
            <p className="mt-2 text-muted-foreground">Period covered: 7 August 2024 – 31 August 2025</p>
          </header>

          <Card>
            <CardHeader>
               <div className="flex items-center gap-3 justify-center text-center">
                    <CardTitle className="font-headline text-2xl">Executive Summary</CardTitle>
               </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg text-foreground mb-4 text-center flex items-center justify-center gap-2"><KeyRound className="h-5 w-5" /> Key Financial Figures</h3>
                  <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4">
                      <KeyFigure title="Total Revenue" value="£137.24" />
                      <KeyFigure title="Total Expenses" value="£1,263.99" isLoss />
                      <KeyFigure title="Operating Loss" value="-£1,126.12" isLoss />
                      <KeyFigure title="Net Loss" value="-£1,125.74" isLoss />
                      <KeyFigure title="Capital Gain" value="£0.38" />
                      <KeyFigure title="Assets" value="£160.39" />
                      <KeyFigure title="Share Capital" value="£1,296.25" />
                      <KeyFigure title="Retained Earnings" value="-£1,135.90" isLoss />
                  </div>
                </div>

                 <div>
                  <h3 className="font-semibold text-lg text-foreground mb-4 text-center flex items-center justify-center gap-2"><CalendarClock className="h-5 w-5" /> Regulatory Deadlines</h3>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
                    <div className="p-3 bg-muted/50 rounded-lg border">
                      <p className="font-medium text-foreground">Companies House</p>
                      <p className="text-sm text-muted-foreground">7 May 2026</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg border">
                      <p className="font-medium text-foreground">HMRC Period 1</p>
                      <p className="text-sm text-muted-foreground">6 August 2026</p>
                    </div>
                    <div className="p-3 bg-muted/50 rounded-lg border">
                      <p className="font-medium text-foreground">HMRC Period 2</p>
                      <p className="text-sm text-muted-foreground">31 August 2026</p>
                    </div>
                  </div>
                </div>
                 <Alert>
                    <Landmark className="h-4 w-4" />
                    <AlertTitle>Conclusion</AlertTitle>
                    <AlertDescription className="space-y-2">
                        <p>Uhuru Trade Ltd completed its first year of operations with limited revenue but significant initial investment in marketing and infrastructure. The company recorded a net loss of £1,125.74, reflecting startup costs.</p>
                        <p>Despite this, the company maintains a sound equity position (£1,296.25 share capital vs £160.39 assets) and remains solvent. Importantly, tax losses of £1,117.33 have been carried forward, which can be offset against future profits to reduce tax liabilities.</p>
                        <p>This financial position highlights the foundation for future growth, with startup costs absorbed and tax efficiency opportunities available.</p>
                    </AlertDescription>
                </Alert>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-3">
                <GanttChartSquare className="h-6 w-6 text-primary" />
                <CardTitle className="font-headline text-2xl">Companies House Documents</CardTitle>
              </div>
              <CardDescription>Official filing for the period 7 Aug 2024 - 31 Aug 2025</CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <h3 className="font-semibold mb-2 text-lg text-foreground">Profit and Loss Statement</h3>
                <Table>
                  <TableHeader><TableRow><TableHead>Concept</TableHead><TableHead className="text-right">Amount (£)</TableHead></TableRow></TableHeader>
                  <TableBody>
                    <TableRow><TableCell>Amazon Sales</TableCell><TableCell className="text-right">137.24</TableCell></TableRow>
                    <TableRow className="font-bold bg-muted/20"><TableCell>TOTAL REVENUE</TableCell><TableCell className="text-right">137.24</TableCell></TableRow>
                    <TableRow><TableCell>Purchases (Alibaba.com)</TableCell><TableCell className="text-right">598.11</TableCell></TableRow>
                    <TableRow className="font-bold bg-muted/20"><TableCell>GROSS PROFIT</TableCell><TableCell className="text-right text-destructive">-460.87</TableCell></TableRow>
                    <TableRow><TableCell>Advertising & Marketing</TableCell><TableCell className="text-right">382.11</TableCell></TableRow>
                    <TableRow><TableCell>Professional Services</TableCell><TableCell className="text-right">28.37</TableCell></TableRow>
                    <TableRow><TableCell>Hosting Services</TableCell><TableCell className="text-right">56.51</TableCell></TableRow>
                    <TableRow><TableCell>Postal Services</TableCell><TableCell className="text-right">120.44</TableCell></TableRow>
                    <TableRow><TableCell>Bank Fees (Wise Bank)</TableCell><TableCell className="text-right">8.47</TableCell></TableRow>
                    <TableRow><TableCell>Bank Fees (Revolut Bank)</TableCell><TableCell className="text-right">43.19</TableCell></TableRow>
                    <TableRow><TableCell>IT & Software</TableCell><TableCell className="text-right">26.16</TableCell></TableRow>
                    <TableRow className="font-bold bg-muted/20"><TableCell>TOTAL OPERATING EXPENSES</TableCell><TableCell className="text-right">665.25</TableCell></TableRow>
                    <TableRow className="font-bold bg-primary/10"><TableCell>OPERATING PROFIT/(LOSS)</TableCell><TableCell className="text-right text-destructive">-1,126.12</TableCell></TableRow>
                     <TableRow><TableCell>Capital Gains</TableCell><TableCell className="text-right">0.38</TableCell></TableRow>
                    <TableRow className="font-bold bg-primary/20"><TableCell>NET PROFIT/(LOSS) BEFORE TAX</TableCell><TableCell className="text-right text-destructive">-1,125.74</TableCell></TableRow>
                  </TableBody>
                </Table>
              </div>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                    <h3 className="font-semibold mb-2 text-lg text-foreground">Balance Sheet</h3>
                    <Table>
                      <TableHeader><TableRow><TableHead>Account / Item</TableHead><TableHead className="text-right">Amount (£)</TableHead></TableRow></TableHeader>
                      <TableBody>
                        <TableRow><TableCell>Wise Bank GBP Account</TableCell><TableCell className="text-right">0.15</TableCell></TableRow>
                        <TableRow><TableCell>Wise Bank EUR Account</TableCell><TableCell className="text-right">122.32</TableCell></TableRow>
                        <TableRow><TableCell>Revolut Bank GBP Account</TableCell><TableCell className="text-right">13.04</TableCell></TableRow>
                        <TableRow><TableCell>Revolut Bank EUR Account</TableCell><TableCell className="text-right">24.88</TableCell></TableRow>
                        <TableRow className="font-bold bg-muted/20"><TableCell>TOTAL ASSETS</TableCell><TableCell className="text-right">160.39</TableCell></TableRow>
                        <TableRow><TableCell>CURRENT LIABILITIES</TableCell><TableCell className="text-right">0.00</TableCell></TableRow>
                        <TableRow><TableCell>SHARE CAPITAL</TableCell><TableCell className="text-right">1,296.25</TableCell></TableRow>
                        <TableRow><TableCell>RETAINED EARNINGS</TableCell><TableCell className="text-right text-destructive">-1,135.90</TableCell></TableRow>
                        <TableRow className="font-bold bg-muted/20"><TableCell>TOTAL EQUITY</TableCell><TableCell className="text-right">160.39</TableCell></TableRow>
                        <TableRow className="font-bold bg-primary/20"><TableCell>TOTAL LIABILITIES & EQUITY</TableCell><TableCell className="text-right">160.39</TableCell></TableRow>
                      </TableBody>
                    </Table>
                </div>
                <div>
                  <h3 className="font-semibold mb-2 text-lg text-foreground">Capital Contributions Schedule</h3>
                  <Table>
                    <TableHeader><TableRow><TableHead>Contributor</TableHead><TableHead>Amount (£)</TableHead><TableHead>Notes</TableHead></TableRow></TableHeader>
                    <TableBody>
                      <TableRow><TableCell>Director and Majority Shareholder</TableCell><TableCell>907.19</TableCell><TableCell>Adjusted to reflect actual share capital</TableCell></TableRow>
                      <TableRow><TableCell>Third-party Contribution</TableCell><TableCell>388.82</TableCell><TableCell>Adjusted to reflect actual share capital</TableCell></TableRow>
                      <TableRow><TableCell>Uhuru Trade Ltd</TableCell><TableCell>0.01</TableCell><TableCell>Adjusted to reflect actual share capital</TableCell></TableRow>
                      <TableRow className="font-bold bg-primary/20"><TableCell>TOTAL SHARE CAPITAL</TableCell><TableCell>1,296.25</TableCell><TableCell></TableCell></TableRow>
                    </TableBody>
                  </Table>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                    <Scale className="h-6 w-6 text-primary" />
                    <CardTitle className="font-headline text-2xl">HMRC Period 1 Documents</CardTitle>
                </div>
                <CardDescription>7 Aug 2024 - 6 Aug 2025</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                    <h3 className="font-semibold mb-2 text-lg text-foreground">CT600 Form - Period 1</h3>
                    <Table>
                        <TableHeader><TableRow><TableHead>Box</TableHead><TableHead className="text-right">Amount (£)</TableHead></TableRow></TableHeader>
                        <TableBody>
                            <TableRow><TableCell>Box 1: Turnover</TableCell><TableCell className="text-right">136.86</TableCell></TableRow>
                            <TableRow><TableCell>Box 3: Cost of sales</TableCell><TableCell className="text-right">597.48</TableCell></TableRow>
                            <TableRow><TableCell>Box 5: Gross profit</TableCell><TableCell className="text-right text-destructive">-460.62</TableCell></TableRow>
                            <TableRow><TableCell>Box 7: Other operating expenses</TableCell><TableCell className="text-right">657.09</TableCell></TableRow>
                            <TableRow><TableCell>Box 14: Profit/(Loss) before tax</TableCell><TableCell className="text-right text-destructive">-1,117.33</TableCell></TableRow>
                            <TableRow><TableCell>Box 16: Other income</TableCell><TableCell className="text-right">0.38</TableCell></TableRow>
                            <TableRow><TableCell>Box 25: Total tax charge</TableCell><TableCell className="text-right">0.00</TableCell></TableRow>
                            <TableRow><TableCell>Box 30: Share capital</TableCell><TableCell className="text-right">1,296.25</TableCell></TableRow>
                            <TableRow><TableCell>Box 392: Losses carried forward</TableCell><TableCell className="text-right text-destructive">1,117.33</TableCell></TableRow>
                        </TableBody>
                    </Table>
                </div>
                 <div>
                    <h3 className="font-semibold mb-2 text-lg text-foreground">Capital Gains Report</h3>
                    <p className="text-sm text-muted-foreground">Net capital gain: <span className="font-bold text-foreground">£0.38</span></p>
                    <p className="text-xs text-muted-foreground">Source: Disposal of shares in Luxembourg fund (ISIN: LU0852473015).</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                 <div className="flex items-center gap-3">
                    <Sigma className="h-6 w-6 text-primary" />
                    <CardTitle className="font-headline text-2xl">HMRC Period 2 Documents</CardTitle>
                 </div>
                <CardDescription>7 Aug 2025 - 31 Aug 2025</CardDescription>
              </CardHeader>
              <CardContent>
                 <h3 className="font-semibold mb-2 text-lg text-foreground">CT600 Form - Period 2</h3>
                 <Table>
                    <TableHeader><TableRow><TableHead>Box</TableHead><TableHead className="text-right">Amount (£)</TableHead></TableRow></TableHeader>
                    <TableBody>
                        <TableRow><TableCell>Box 1: Turnover</TableCell><TableCell className="text-right">0.38</TableCell></TableRow>
                        <TableRow><TableCell>Box 7: Other operating expenses</TableCell><TableCell className="text-right">1.28</TableCell></TableRow>
                        <TableRow><TableCell>Box 14: Profit/(Loss) before tax</TableCell><TableCell className="text-right text-destructive">-0.90</TableCell></TableRow>
                        <TableRow><TableCell>Box 25: Total tax charge</TableCell><TableCell className="text-right">0.00</TableCell></TableRow>
                    </TableBody>
                 </Table>
              </CardContent>
            </Card>
          </div>

          <Card className="mt-12">
            <CardHeader><CardTitle className="font-headline text-2xl">Important Notes</CardTitle></CardHeader>
            <CardContent>
                <ul className="list-disc list-inside space-y-2 text-muted-foreground">
                    <li>All figures are presented in British Pounds (GBP).</li>
                    <li>Exchange rate used: 0.85 EUR/GBP where applicable.</li>
                    <li>Share capital adjusted from £1,700.10 to £1,296.25 to reflect actual capital position.</li>
                    <li>All documents prepared using HMRC official exchange rates where available and applicable.</li>
                </ul>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
    
