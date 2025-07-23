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
    "ERP Modernization & Cloud Migration: Seamless, full-lifecycle migrations from legacy systems (like Oracle EBS R11/R12) to Oracle Fusion Cloud, including comprehensive data conversion (FBDI/ADFdi), meticulous configuration, and hands-on go-live support.",
    "End-to-End Financial Module Implementation: Complete project management for core financial modules, including General Ledger (GL), Accounts Payable (AP), Accounts Receivable (AR), Fixed Assets (FA), Cash Management, and full Procure-to-Pay (P2P) and Order-to-Cash (O2C) workflows.",
    "System Optimization & Customization: Development of bespoke application extensions (CEMLI), performance troubleshooting, and strategic enhancements for complex multi-org, multi-ledger, and multi-currency environments.",
    "Advanced Compliance & Reporting: Design and development of custom BI Publisher reports, OTBI analyses, and Financial Statement Generators (FSG) to meet international standards like GDPR, Making Tax Digital (MTD), and other critical regulatory requirements.",
    "Secure Integration & Data Management: Architecture and implementation of secure third-party interfaces, robust role-based access controls, and automated data validation and conversion processes to ensure data integrity across your entire ecosystem.",
    "Proactive Ongoing Support & Maintenance: SLA-driven application support, continuous system improvements based on evolving business needs, and expert liaison with Oracle Support to ensure the long-term integrity, security, and performance of your business systems."
];

const functionalExpertiseList = [
    "General Ledger (GL) & Global Accounting Engine (AX)",
    "Accounts Payable (AP) & Accounts Receivable (AR)",
    "Fixed Assets (FA) & Cash Management (CE)",
    "Procure-to-Pay (P2P) including iProcurement",
    "Order-to-Cash (O2C)",
    "Complex Multi-Org & Intercompany Trading setups"
];

const technicalExpertiseList = [
    "Oracle Fusion Cloud & E-Business Suite (EBS) R11/12",
    "SQL / PL/SQL, Oracle Forms & Reports",
    "BI Publisher, OTBI, & Financial Statement Generators (FSG)",
    "Oracle Workflow & Application Desktop Integrator (ADI/WebAdi)",
    "Oracle Data Integrator (ODI) & File-Based Data Import (FBDI)",
    "Unix/Linux Shell Scripting (Korn/Bourne)",
    "Integration with Google BigQuery for advanced analytics"
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
                  <Card key={index} className="bg-card flex flex-col">
                    <CardHeader>
                      <div className="flex items-center gap-3">
                        <CheckCircle2 className="h-6 w-6 text-accent" />
                        <CardTitle className='font-headline text-xl'>{service.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-grow">
                      <p className="text-muted-foreground">{service.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </section>

            <section>
              <Card className="bg-secondary/50 p-8 text-center">
                  <h2 className="text-3xl font-bold font-headline">Hybrid Oracle Consulting Expertise</h2>
                  <p className="mt-4 max-w-4xl mx-auto text-muted-foreground">
                    With over 20 years of dedicated Oracle expertise, we bridge the critical gap between complex financial workflows and cutting-edge Oracle technologies. Our unique value comes from a hybrid functional-technical background, combined with over a decade of senior financial management experience prior to consulting. This means we don't just implement software; we understand the 'why' behind every business process. We speak the language of both your CFO and your IT department, delivering solutions that are not only technically robust but perfectly aligned with your strategic financial goals.
                  </p>
              </Card>
            </section>
            
            <section className='space-y-8'>
                <div className='text-center'>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                        Core Services for Enterprise Transformation
                    </h2>
                     <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        Our services cover the full project lifecycle, from strategic design to post-implementation support, ensuring a seamless transition and a powerful, unified system that drives business growth and efficiency.
                    </p>
                </div>
                
                <div className="grid gap-x-8 gap-y-4 md:grid-cols-2">
                    {coreServices.map((service, index) => (
                        <div key={index} className='flex items-start gap-3'>
                            <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                            <p className="text-muted-foreground">{service}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-headline">Functional Expertise</CardTitle>
                  <CardDescription>
                    We have a deep, hands-on understanding of the business processes that drive your organization.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {functionalExpertiseList.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">{point}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
               <Card>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold font-headline">Technical Capabilities</CardTitle>
                  <CardDescription>
                    Our proficiency spans the full spectrum of the Oracle E-Business Suite and Fusion Cloud technical stack.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-2">
                  {technicalExpertiseList.map((point, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">{point}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>

             <section>
              <Card>
                <CardHeader>
                  <CardTitle className="text-3xl font-bold font-headline">Why Partner With UhurU?</CardTitle>
                  <CardDescription>
                    We deliver more than just technology. We deliver clarity, efficiency, and a strategic foundation for growth.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground">Choosing the right partner for your ERP/CRM implementation is critical. Our two decades of specialized experience in the Oracle ecosystem, combined with a background in senior financial management, ensures we deliver solutions that provide real business value. We understand the challenges of complex, multi-national implementations and have a proven track record of successful global rollouts.</p>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground"><span className="font-semibold text-foreground">Business-First Approach:</span> We start by understanding your business challenges and goals, then architect a technical solution to meet them—not the other way around.</p>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                    <p className="text-muted-foreground"><span className="font-semibold text-foreground">Proven Methodology:</span> From fit-gap analysis and solution design to data conversion, UAT, and hypercare support, we manage every phase of the project lifecycle with precision and expertise.</p>
                  </div>
                   <div className="pt-4">
                    <p className="text-foreground">
                      <strong>Ready to unify your operations and unlock financial clarity?</strong> Contact us today to discover how our deep Oracle expertise can consolidate your systems, automate processes, and provide the robust financial backbone needed to scale your business with confidence.
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
