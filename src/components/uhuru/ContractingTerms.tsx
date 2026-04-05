'use client';

import { Shield, BookOpen, CheckCircle2, AlertCircle, AlertTriangle, RefreshCw } from 'lucide-react';

export function ContractingTerms() {
  return (
    <div className="w-full bg-white text-slate-900 p-10 md:p-16 rounded-sm shadow-none font-sans print:p-0 print:m-0" id="contracting-terms-document">
      {/* Official Header */}
      <div className="border-b-4 border-slate-900 pb-10 mb-12 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 print:border-black">
        <div>
          <div className="flex items-center gap-3 mb-3">
            <div className="w-12 h-12 border-2 border-slate-900 flex items-center justify-center font-black text-slate-900 text-2xl">U</div>
            <span className="text-slate-900 font-black tracking-tighter text-3xl uppercase" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>UHURU <span className="text-slate-500">TRADE</span></span>
          </div>
          <p className="text-slate-500 text-[10px] font-mono tracking-widest uppercase">Global IT & ERP Consulting</p>
        </div>
        <div className="text-right">
          <h1 className="text-slate-900 text-3xl font-black uppercase tracking-tight mb-1" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>PROVISIONING AGREEMENT</h1>
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-[0.2em]">ID: UT-SKILLHUB-2026-X | {new Date().toLocaleDateString('en-GB')}</p>
        </div>
      </div>

      <div className="space-y-12 py-6">
        {/* Executive Summary */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="bg-slate-900 text-white px-4 py-1 text-sm font-black uppercase tracking-widest" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>01. Executive Summary</h2>
          </div>
          <p className="text-slate-700 leading-relaxed text-justify mb-4">
            <strong>Uhuru Trade Ltd</strong> provides temporary access to SkillHub Cloud Instances exclusively for educational, research, and professional development purposes. These "Vision Instances" are pre-configured environments designed to allow consultants and students to explore functional and technical capabilities of the SkillHub ERP/SCM/HCM ecosystem without the risks associated with production data.
          </p>
          <div className="p-6 bg-slate-50 border-l-4 border-slate-200">
            <p className="text-slate-500 text-sm italic leading-relaxed text-left">
              <strong>Uhuru Trade Ltd</strong> proporciona acceso temporal a instancias de SkillHub Cloud exclusivamente para fines educativos, de investigación y desarrollo profesional. Estas "instancias Vision" son entornos ya configurados que permiten explorar las capacidades del ecosistema SkillHub sin riesgos para los datos de producción.
            </p>
          </div>
        </section>

        {/* Scope of Use */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="bg-slate-900 text-white px-4 py-1 text-sm font-black uppercase tracking-widest" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>02. Permitted Use & Restrictions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-slate-900 mt-1 shrink-0" />
                <p className="text-sm text-slate-700 font-medium leading-relaxed">Access is granted for a fixed period (7/30/90 days) upon successful verification of the subscription.</p>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-slate-900 mt-1 shrink-0" />
                <p className="text-sm text-slate-700 font-medium leading-relaxed">Users may perform configurations, testing, and training exercises within the functional scope of the provided license.</p>
              </div>
            </div>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-slate-900 mt-1 shrink-0" />
                <p className="text-sm text-slate-700 font-black uppercase tracking-tighter leading-snug">Strictly prohibited: Uploading real production data, PII, or using the instance for commercial production.</p>
              </div>
              <div className="flex items-start gap-3">
                <AlertCircle className="w-4 h-4 text-slate-900 mt-1 shrink-0" />
                <p className="text-sm text-slate-700 font-medium leading-relaxed">Any attempt to bypass security measures or share credentials will result in immediate termination.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Security and Liability */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="bg-slate-900 text-white px-4 py-1 text-sm font-black uppercase tracking-widest" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>03. Liability & Data Integrity</h2>
          </div>
          <p className="text-slate-700 leading-relaxed text-justify">
            The provided instances are "sandbox" environments. <strong>Uhuru Trade Ltd</strong> does not guarantee the persistence of configurations or data uploaded by the user. Periodic maintenance, refreshes, or administrative resets may occur. Users are responsible for documenting their work externally. Uhuru Trade Ltd shall not be liable for any data loss, performance fluctuations, or service interruptions.
          </p>
        </section>

        {/* Termination */}
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="bg-slate-900 text-white px-4 py-1 text-sm font-black uppercase tracking-widest" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>04. Service Continuity</h2>
          </div>
          <p className="text-slate-700 leading-relaxed text-justify">
            Access credentials will remain active until the end of the contracted period. Upon expiration, the system will automatically revoke access and release the license to the general pool. Users wishing to continue must renew their subscription prior to the expiration date to ensure continuous access to the same instance (subject to availability).
          </p>
        </section>
      </div>

      <div className="mt-16 pt-10 border-t-2 border-slate-100 flex flex-col md:flex-row justify-between items-end md:items-center gap-10 print:border-black">
        <div className="text-[10px] text-slate-400 font-mono uppercase text-left">
          <p className="font-bold text-slate-900 mb-1 tracking-widest uppercase">© 2026 Uhuru Trade Ltd. - All Rights Reserved</p>
          <p>Unit 13 Freeland Park Wareham Road</p>
          <p>Lytchett Matravers BH16 6FA Poole – UK</p>
        </div>
        <div className="flex items-center gap-4 p-5 border-2 border-slate-900">
          <Shield className="w-8 h-8 text-slate-900" />
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 text-slate-900 text-[9px] font-black uppercase tracking-[0.3em] mb-1">
              VERIFIED CONTRACT
            </div>
            <p className="text-[10px] font-mono text-slate-500 font-bold uppercase tracking-widest leading-none">Digital Signature Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
