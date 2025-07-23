import type { Metadata } from 'next';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle2 } from 'lucide-react';
import SubPageHeader from '@/components/uhuru/subpage-header';

export const metadata: Metadata = {
  title: 'ERP and CRM Implementation Services | UhurU',
  description: 'Expert ERP & CRM implementation and consulting. We specialize in Oracle Financials (Fusion Cloud, EBS R11/R12) to streamline finance, accounting, and compliance.',
};


const erpServices = [
    {
        title: "Oracle Financials Specialization",
        description: "We configure advanced modules for finance, compliance, and reporting, leveraging deep expertise in GL, AP, AR, FA, and Cash Management."
    },
    {
        title: "End-to-End Workflow Automation",
        description: "We streamline and sync your entire Procure-to-Pay and Order-to-Cash cycles, integrating sales, inventory, and accounting processes."
    },
    {
        title: "Seamless Third-Party Integrations",
        description: "We connect your ERP/CRM systems with any existing tools and legacy platforms via robust APIs and data conversion strategies."
    },
    {
        title: "Comprehensive User Training & Support",
        description: "We offer tailored onboarding sessions, detailed documentation, and ongoing SLA-driven support to empower your teams and resolve issues fast."
    }
];

const coreServices = [
    "ERP Modernization: Seamless migrations and full lifecycle implementations from legacy systems (EBS) to Oracle Fusion Cloud, including data conversion (FBDI/ADFdi), configuration, and go-live support.",
    "End-to-End Financial Module Implementation: Full management for General Ledger (GL), Accounts Payable (AP), Accounts Receivable (AR), Fixed Assets (FA), Cash Management, and Procure-to-Pay workflows.",
    "System Optimization & Customization: Bespoke application extensions, performance troubleshooting, and enhancements for complex multi-org, multi-ledger, and multi-currency environments.",
    "Advanced Compliance & Reporting: Development of custom BI Publisher reports and Financial Statement Generators (FSG) for international standards like GDPR, MTD (Making Tax Digital), and other regulatory requirements.",
    "Secure Integration & Data Management: Design and implementation of secure third-party interfaces, robust role-based access controls, and automated data validation and conversion processes.",
    "Proactive Ongoing Support: SLA-driven maintenance, continuous system improvements, and expert liaison with Oracle Support to ensure the long-term integrity and security of your business systems."
];

const expertiseList = [
    {
        title: "Functional & Business Process Expertise",
        description: "General Ledger (GL), Accounts Payable (AP), Accounts Receivable (AR), Fixed Assets (FA), Cash Management (CE), Procure-to-Pay (P2P), Order-to-Cash (O2C), iProcurement, Multi-Org & Intercompany Trading."
    },
    {
        title: "Technical Toolset & Development",
        description: "Oracle Fusion Cloud & EBS R11/R12, SQL/PLSQL, Oracle Forms & Reports, BI Publisher, Oracle Workflow, Oracle Data Integrator (ODI), Unix/Linux Scripting (Korn/Bourne Shell), and Google BigQuery for advanced analytics."
    }
];

export default function ErpCrmPage() {
  return (
    <div className="flex min-h-dvh flex-col bg-background text-foreground">
      <SubPageHeader backHref="/#features" backText="Back to Services" />
      <main className="flex-1 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto max-w-5xl px-4 md:px-10">
          <div className="space-y-16">
            
            <section className="text-center">
              <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl font-headline text-foreground">
                ERP & CRM Implementation
              </h1>
              <p className="mx-auto mt-4 max-w-3xl text-lg text-muted-foreground">
                Struggling with fragmented business systems? We implement tailored ERP & CRM platforms for unified, efficient, and scalable operations.
              </p>
            </section>

            <section>
              <div className="grid gap-8 md:grid-cols-2">
                {erpServices.map((service, index) => (
                  <Card key={index} className="bg-card">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-accent" />
                        <CardTitle className='font-headline text-xl'>{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <Card className="bg-secondary/50 p-8 text-center">
                  <h2 className="text-3xl font-bold font-headline">Hybrid Oracle Consulting Expertise</h2>
                  <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                    With over 20 years of dedicated Oracle expertise, we bridge the critical gap between complex financial workflows and cutting-edge Oracle technologies. Our unique hybrid functional-technical background, combined with senior financial management experience, allows us to deliver solutions that are not only technically robust but perfectly aligned with your strategic business goals.
                  </p>
              </Card>
            </section>
            
            <section className='space-y-8'>
                <div className='text-center'>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                        Core Services for Enterprise Transformation
                    </h2>
                     <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        Our services cover the full project lifecycle, ensuring a seamless transition and a powerful, unified system that drives business growth and efficiency.
                    </p>
                </div>
                
                <div className="grid gap-6 md:grid-cols-2">
                    {coreServices.map((service, index) => (
                        <div key={index} className='flex items-start gap-3'>
                            <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                            <p className="text-muted-foreground">{service}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold font-headline">Our Technical & Functional Capabilities</CardTitle>
                  <CardDescription>
                    Our proficiency spans the full spectrum of Oracle E-Business Suite and Fusion Cloud, from high-level functional design to deep technical implementation.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {expertiseList.map((point, index) => (
                    <div key={index} className='flex items-start gap-4'>
                      <CheckCircle2 className="h-8 w-8 text-accent mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-foreground text-lg">{point.title}</h4>
                        <p className="text-muted-foreground">{point.description}</p>
                      </div>
                    </div>
                  ))}
                  <div className="pt-4">
                    <p className="text-foreground">
                      <strong>Ready to unify your operations?</strong> Contact us to discover how our deep Oracle expertise can consolidate your systems, automate processes, and provide the financial clarity needed to scale your business.
                    </p>
                  </div>
                </CardContent>
              </Card>
            </section>
            
          </div>
        </div>
      </main>
    </div>
  );
}
