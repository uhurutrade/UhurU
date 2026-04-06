'use client';

import { Shield } from 'lucide-react';

import Logo from '@/components/uhuru/logo';

export function ContractingTerms() {
  return (
    <div className="w-full bg-white text-slate-900 p-8 md:p-12 rounded-sm shadow-none font-sans print:p-10 print:m-0" id="contracting-terms-document">
      {/* Official Header */}
      <div className="border-b-2 border-slate-900 pb-4 mb-6 flex flex-col md:flex-row justify-between items-start md:items-end gap-4 print:border-black">
        <div>
          <div className="flex items-center gap-2 mb-2 scale-[1.2] origin-left text-black">
             {/* Instead of the custom box, we use the official Logo hardcoded to black to ensure print compliance */}
             <div className="font-headline text-2xl font-bold tracking-wider w-20 flex items-center gap-1" translate="no">
                 <div className="relative">
                     <div className="text-black print:text-black">UHU</div>
                     <div className={`absolute left-0 right-0 h-0.5 bg-black print:bg-black -bottom-1`}></div>
                 </div>
                 <div className="relative">
                     <div className="text-black print:text-black">RU</div>
                     <div className={`absolute left-0 right-0 h-0.5 bg-black print:bg-black -top-1`}></div>
                 </div>
             </div>
          </div>
        </div>
        <div className="text-right">
          <p className="text-slate-500 font-mono text-[8px] uppercase tracking-[0.2em] mb-1">ID: UT-SKILLHUB-2026.1 | EFFECTIVE DATE: 06/04/2026</p>
          <h1 className="text-slate-900 text-lg font-black tracking-tight leading-tight" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>SkillHub Managed Training Service Provisioning Agreement</h1>
        </div>
      </div>

      <div className="space-y-4 py-2">
        
        {/* 01. PARTIES AND SERVICE DEFINITION */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-widest mb-1.5 border-b border-slate-200 pb-1">01. PARTIES AND SERVICE DEFINITION</h2>
          <div className="text-[9px] text-slate-800 leading-snug text-justify space-y-1.5">
            <p>This Agreement is entered into between <strong>Uhuru Trade Ltd.</strong> ("the Provider"), registered at Unit 13 Freeland Park, Wareham Road, Lytchett Matravers, BH16 6FA, Poole – UK, and the individual or entity acquiring the service ("the User").</p>
            <p>SkillHub is a managed training service that provides temporary access to remote educational environments ("Lab Instances") based on Oracle Fusion Cloud Release 13. The User acknowledges that Uhuru Trade Ltd. acts solely as a Technical Facilitator providing a pre-configured training platform for educational purposes. The Provider is not an affiliate, partner, or official representative of Oracle Corp.</p>
          </div>
        </section>

        {/* 02. LIMITED USE AND EDUCATIONAL PURPOSE */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-widest mb-1.5 border-b border-slate-200 pb-1">02. LIMITED USE AND EDUCATIONAL PURPOSE</h2>
          <div className="text-[9px] text-slate-800 leading-snug text-justify space-y-1.5">
            <p>Access is granted for a fixed term as a professional training service subject to the following conditions:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li><strong>Strictly Educational:</strong> Use is limited exclusively to self-study, research, and professional development. Use for live commercial operations, production data processing, or business-critical consultancy is strictly prohibited.</li>
              <li><strong>Prohibition of Real Data & PII:</strong> Users are strictly prohibited from uploading real production data, actual financial records, or Personally Identifiable Information (PII). As these are sandbox environments, the Provider does not guarantee the privacy, confidentiality, or persistence of any data uploaded.</li>
              <li><strong>Non-Transferability:</strong> Access credentials are personal and non-transferable. Sub-leasing, selling access, or conducting paid training sessions using these credentials will result in immediate termination.</li>
            </ul>
          </div>
        </section>

        {/* 03. SYSTEM INTEGRITY AND SECURITY */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-widest mb-1.5 border-b border-slate-200 pb-1">03. SYSTEM INTEGRITY AND SECURITY</h2>
          <div className="text-[9px] text-slate-800 leading-snug text-justify space-y-1.5">
            <p>Any breach of the following protocols will result in immediate termination of the service without the right to a refund:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li><strong>Credentials & Security:</strong> Sharing credentials with third parties is prohibited. Users are forbidden from attempting to change Master/Admin passwords or modifying high-level security and license profiles.</li>
              <li><strong>Technical Scope:</strong> Access is provided at the functional (UI) level only. This service does not include SQL database access, server-level OS access, or network infrastructure control.</li>
            </ul>
          </div>
        </section>

        {/* 04. AVAILABILITY, MAINTENANCE, AND SERVICE RECOVERY */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-widest mb-1.5 border-b border-slate-200 pb-1">04. AVAILABILITY, MAINTENANCE, AND SERVICE RECOVERY</h2>
          <div className="text-[9px] text-slate-800 leading-snug text-justify space-y-1.5">
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li><strong>Infrastructure Maintenance:</strong> Standard unavailability of 1 to 2 days per week for global updates and maintenance is expected and is considered a standard feature of the service; therefore, it is not subject to compensation.</li>
              <li><strong>System Refreshes:</strong> The infrastructure owner may restore the instance to its "clean" state at any time without prior notice. Any configuration created by the User will be permanently lost. External documentation of work is the User’s sole responsibility.</li>
              <li><strong>Service Credit Policy:</strong> If the instance suffers a total outage preventing functional use for more than 48 consecutive hours within a single week (excluding scheduled maintenance), Uhuru Trade Ltd. will compensate the User by adding the equivalent number of inactive days to the end of the current subscription period. This "Service Credit" constitutes the sole and exclusive remedy available.</li>
            </ul>
          </div>
        </section>

        {/* 05. LIMITATION OF LIABILITY */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-widest mb-1.5 border-b border-slate-200 pb-1">05. LIMITATION OF LIABILITY</h2>
          <div className="text-[9px] text-slate-800 leading-snug text-justify">
            <p>To the maximum extent permitted by the laws of England and Wales: Uhuru Trade Ltd. provides the service on an "as is" and "as available" basis. The Provider shall not be liable for any loss of data, loss of profits, business interruption, or indirect damages. No warranty is provided that the functions contained in the instance will be uninterrupted or error-free.</p>
          </div>
        </section>

        {/* 06. DELIVERY AND REFUND POLICY */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-widest mb-1.5 border-b border-slate-200 pb-1">06. DELIVERY AND REFUND POLICY</h2>
          <div className="text-[9px] text-slate-800 leading-snug text-justify space-y-1.5">
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li><strong>Provisioning:</strong> Access credentials will be delivered via email within 24 hours of payment verification.</li>
              <li><strong>No Refunds:</strong> Due to the immediate digital nature and consumption of the service, all sales are final once credentials have been dispatched, except as specifically permitted under the Service Credit Policy in Clause 04.</li>
            </ul>
          </div>
        </section>

        {/* 07. JURISDICTION AND LAW */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-widest mb-1.5 border-b border-slate-200 pb-1">07. JURISDICTION AND LAW</h2>
          <div className="text-[9px] text-slate-800 leading-snug text-justify">
            <p>This Agreement is governed by and construed in accordance with the laws of England and Wales. Any disputes arising under or in connection with these terms shall be subject to the exclusive jurisdiction of the courts of the United Kingdom.</p>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <div className="mt-6 pt-4 border-t-2 border-slate-900 flex justify-between items-center print:border-black">
        <div className="text-[8px] text-slate-500 font-mono text-left leading-normal">
          <p>© 2026 Uhuru Trade Ltd. · Unit 13 Freeland Park, Wareham Road, Lytchett Matravers, BH16 6FA Poole – UK · hello@uhurutrade.com · www.uhurutrade.com</p>
        </div>
        <div className="flex items-center gap-3 p-2 border-2 border-slate-900">
          <Shield className="w-5 h-5 text-slate-900" />
          <div className="text-right">
            <div className="flex items-center justify-end text-slate-900 text-[7px] font-black uppercase tracking-[0.3em] mb-0.5">
              VERIFIED
            </div>
            <p className="text-[7px] font-mono text-slate-500 font-bold uppercase tracking-widest leading-none">Accepted Digitally</p>
          </div>
        </div>
      </div>
    </div>
  );
}
