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
        description: "Configure advanced modules for finance, compliance, and reporting."
    },
    {
        title: "Workflow Automation",
        description: "Sync sales, inventory, and accounting processes across departments."
    },
    {
        title: "Third-Party Integrations",
        description: "Connect ERP/CRM systems to existing tools via APIs."
    },
    {
        title: "User Training & Support",
        description: "Offer onboarding sessions and 24/7 troubleshooting."
    }
];

const coreServices = [
    "ERP Modernization: Seamless upgrades from legacy systems (EBS) to Oracle Fusion Cloud, including data migration (FBDI/ADFdi), configuration, and training.",
    "End-to-End Implementation: Full lifecycle management for GL, AP, AR, FA, Cash Management, and Procure-to-Pay workflows.",
    "System Optimization: Troubleshooting and custom extensions for multi-org, multi-ledger environments.",
    "Compliance & Reporting: BI Publisher and FSG solutions for GDPR, MTD (Making Tax Digital), and cross-border financial compliance.",
    "Integration & Security: Secure third-party integrations, role-based access control, and workflow automation.",
    "Ongoing Support: SLA-driven maintenance and proactive enhancements."
];

const expertiseList = [
    "Modules: General Ledger (GL) | Accounts Payable (AP) | Accounts Receivable (AR) | Fixed Assets (FA) | Cash Management (CE)",
    "Tools: Oracle Fusion Cloud | EBS R11/R12 | BI Publisher | SQL/PLSQL | Unix Scripting | Oracle Data Integrator (ODI)",
    "System Optimization: Troubleshooting and custom extensions for multi-org, multi-ledger environments.",
    "Compliance & Reporting: BI Publisher and FSG solutions for GDPR, MTD (Making Tax Digital), and cross-border financial compliance.",
    "Integration & Security: Secure third-party integrations, role-based access control, and workflow automation.",
    "Ongoing Support: SLA-driven maintenance and proactive enhancements."
]

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
                  <h2 className="text-3xl font-bold font-headline">Oracle Consulting Expertise</h2>
                  <p className="mt-4 max-w-3xl mx-auto text-muted-foreground">
                    As hybrid Oracle Functional & Technical Consultants, we bridge financial workflows with cutting-edge Oracle technologies. With over 20 years of expertise, including 8+ years focused on EBS R11/R12 and Fusion Cloud, we empower businesses to streamline operations, reduce costs, and ensure compliance.
                  </p>
              </Card>
            </section>
            
            <section className='space-y-8'>
                <div className='text-center'>
                    <h2 className="text-3xl font-bold tracking-tight sm:text-4xl font-headline">
                        Core Services for Enterprises
                    </h2>
                     <p className="mt-4 text-lg text-muted-foreground max-w-3xl mx-auto">
                        Our dual expertise in finance and IT delivers solutions that are technically robust and strategically aligned with your business goals.
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
                  <CardTitle className="text-3xl font-bold font-headline">Technical & Functional Expertise</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {expertiseList.map((point, index) => (
                    <div key={index} className='flex items-start gap-3'>
                      <CheckCircle2 className="h-5 w-5 text-accent mt-1 flex-shrink-0" />
                      <p className="text-muted-foreground">{point}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </section>
            
          </div>
        </div>
      </main>
    </div>
  );
}
