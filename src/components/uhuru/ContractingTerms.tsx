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
          <h1 className="text-slate-900 text-lg font-black uppercase tracking-tight mb-1" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>PROVISIONING AGREEMENT</h1>
          <p className="text-slate-500 font-mono text-[8px] uppercase tracking-[0.2em]">ID: UT-SKILLHUB-2026.1 | {new Date().toLocaleDateString('en-GB')}</p>
        </div>
      </div>

      <div className="space-y-4 py-2">
        
        {/* 01. PARTIES AND NATURE OF SERVICE */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-widest mb-1.5 border-b border-slate-200 pb-1">01. Parties and Nature of Service</h2>
          <div className="text-[9px] text-slate-800 leading-snug text-justify space-y-1.5">
            <p>This Agreement is entered into between <strong>Uhuru Trade Ltd.</strong> ("the Provider"), registered at Unit 13 Freeland Park, Wareham Road, Lytchett Matravers, BH16 6FA, Poole – UK, and the individual or entity acquiring the subscription ("the User").</p>
            <p>SkillHub is a service providing temporary access to Software-as-a-Service (SaaS) environments known as "Vision Instances" or "Sandboxes" of Oracle Fusion Cloud Release 13. The User acknowledges that Uhuru Trade Ltd. acts solely as a facilitator of access for educational and professional development purposes and is not the owner, developer, or official technical support for Oracle Corp.</p>
          </div>
        </section>

        {/* 02. LIMITED LICENSE AND EXCLUSIVE PURPOSE */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-widest mb-1.5 border-b border-slate-200 pb-1">02. Limited License and Exclusive Purpose</h2>
          <div className="text-[9px] text-slate-800 leading-snug text-justify space-y-1.5">
            <p>Access is granted under a temporary subscription model subject to the following strict conditions:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li><strong>Educational Purpose Only:</strong> Strictly limited to self-study, research, and professional training. Live business management or consulting is prohibited.</li>
              <li><strong>Prohibition of Real Data & PII:</strong> Users agree NOT to upload real production data, actual financial records, or Personally Identifiable Information under any circumstances. Constant privacy is not guaranteed on shared instances.</li>
              <li><strong>Non-Resale Clause:</strong> Sub-leasing, selling, or paid training sessions using these specific individual credentials is prohibited.</li>
            </ul>
          </div>
        </section>

        {/* 03. SYSTEM INTEGRITY AND SECURITY */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-widest mb-1.5 border-b border-slate-200 pb-1">03. System Integrity and Security</h2>
          <div className="text-[9px] text-slate-800 leading-snug text-justify space-y-1.5">
            <p>Any violation of the following security protocols will result in immediate termination of the account without the right to a refund:</p>
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li><strong>Credentials:</strong> Sharing access credentials with third parties is strictly prohibited.</li>
              <li><strong>Security Modifications:</strong> The User is prohibited from attempting to change Master Passwords, modifying high-level security profiles, or bypassing license restrictions.</li>
              <li><strong>Technical Access Level:</strong> Functional access only. It does not include SQL database access, server-level access, or network infrastructure control.</li>
            </ul>
          </div>
        </section>

        {/* 04. AVAILABILITY, MAINTENANCE, AND COMPENSATION */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-widest mb-1.5 border-b border-slate-200 pb-1">04. Availability, Maintenance, and Compensation</h2>
          <div className="text-[9px] text-slate-800 leading-snug text-justify space-y-1.5">
            <ul className="list-disc list-inside space-y-1 pl-1">
              <li><strong>Scheduled Maintenance:</strong> Standard unavailability of 1 to 2 days per week for Oracle updates is expected and is not subject to compensation.</li>
              <li><strong>System Refreshes:</strong> Oracle may restore the instance to its "clean" state at any time. Any configuration or data created by the User will be permanently lost. External backups are the User's sole responsibility.</li>
              <li><strong>Service Interruption Compensation:</strong> In the event the instance suffers a total outage preventing functional use for over 48 consecutive hours within a single week (excluding scheduled maintenance), Uhuru Trade Ltd. will compensate by adding the equivalent number of inactive days to the end of the subscription period. This constitutes the sole exclusive remedy.</li>
            </ul>
          </div>
        </section>

        {/* 05. LIMITATION OF LIABILITY */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-widest mb-1.5 border-b border-slate-200 pb-1">05. Limitation of Liability</h2>
          <div className="text-[9px] text-slate-800 leading-snug text-justify">
            <p>To the maximum extent permitted by UK laws: Uhuru Trade Ltd. shall not be liable for any loss of data, loss of profits, business interruption, or indirect damages. No warranty is provided that the functions contained in the instance will be uninterrupted or error-free.</p>
          </div>
        </section>

        {/* 06. DELIVERY AND REFUND POLICY */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-widest mb-1.5 border-b border-slate-200 pb-1">06. Delivery & Refund Policy</h2>
          <div className="text-[9px] text-slate-800 leading-snug text-justify space-y-1.5">
            <p><strong>Provisioning:</strong> Credentials delivered via email within 24 hours of payment verification.</p>
            <p><strong>No Refunds:</strong> Due to the digital consumption of the service, no refunds will be issued once credentials have been dispatched, except as specifically permitted under Clause 04.</p>
          </div>
        </section>

        {/* 07. JURISDICTION AND LAW */}
        <section>
          <h2 className="text-[10px] font-black uppercase tracking-widest mb-1.5 border-b border-slate-200 pb-1">07. Jurisdiction and Law</h2>
          <div className="text-[9px] text-slate-800 leading-snug text-justify">
            <p>This Agreement is governed by the laws of England and Wales. Any disputes arising shall be subject to the exclusive jurisdiction of the United Kingdom courts.</p>
          </div>
        </section>

      </div>

      {/* FOOTER */}
      <div className="mt-6 pt-4 border-t-2 border-slate-900 flex justify-between items-center print:border-black">
        <div className="text-[8px] text-slate-500 font-mono text-left leading-normal">
          <p>© 2026 Uhuru Trade Ltd. · Unit {33-20 === 13 ? '13' : '13'} Freeland Park, Wareham Road, Lytchett Matravers, BH16 6FA Poole – UK · hello@uhurutrade.com</p>
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
