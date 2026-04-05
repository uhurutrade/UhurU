'use client';

import { Shield, BookOpen, CheckCircle2, AlertCircle, AlertTriangle, RefreshCw } from 'lucide-react';

export function ContractingTerms() {
  return (
    <div className="bg-[#f8fafc] dark:bg-slate-950/40 text-slate-900 dark:text-white/90 p-8 md:p-12 border border-slate-200 dark:border-white/10 shadow-2xl rounded-3xl max-w-4xl mx-auto font-sans backdrop-blur-3xl print:shadow-none print:border-none print:bg-white print:text-black print:p-0 print:m-0" id="contracting-terms-document">
      {/* Header replicated from image */}
      <div className="bg-slate-900 dark:bg-indigo-600 -m-8 md:-m-12 p-8 md:p-12 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6 rounded-t-3xl print:bg-black print:rounded-none">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="w-12 h-12 border-2 border-white flex items-center justify-center font-black text-white text-2xl rounded-xl">U</div>
            <span className="text-white font-black tracking-tighter text-3xl uppercase" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>UHURU <span className="text-indigo-200 dark:text-indigo-200">TRADE</span></span>
          </div>
          <p className="text-indigo-200/60 text-[10px] font-mono tracking-widest uppercase">Global IT & ERP Consulting</p>
        </div>
        <div className="text-right">
          <h1 className="text-white text-3xl font-black uppercase tracking-tight mb-1" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>PROVISIONING AGREEMENT</h1>
          <p className="text-indigo-200/80 font-mono text-[10px] uppercase tracking-[0.2em]">ID: UT-SKILLHUB-2026-X | {new Date().toLocaleDateString('en-GB')}</p>
        </div>
      </div>

      <div className="space-y-12 py-6 relative">
        {/* Subtle background decoration */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/5 blur-3xl rounded-full -z-10 pointer-events-none"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-500/5 blur-3xl rounded-full -z-10 pointer-events-none"></div>

        {/* Executive Summary */}
        <section className="relative">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <Shield className="w-4 h-4 text-indigo-500" />
            </div>
            <h2 className="text-indigo-500 dark:text-indigo-400 text-xl font-black uppercase tracking-wide" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>1. Executive Summary</h2>
          </div>
          <div className="space-y-4">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-justify px-2">
              <strong className="text-slate-900 dark:text-white">Uhuru Trade Ltd</strong> provides temporary access to SkillHub Cloud Instances exclusively for educational, research, and professional development purposes. These "Vision Instances" are pre-configured environments designed to allow consultants and students to explore functional and technical capabilities of the SkillHub ERP/SCM/HCM ecosystem without the risks associated with production data.
            </p>
            <div className="p-5 bg-slate-900/5 dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/5 transition-all hover:bg-slate-900/[0.07] dark:hover:bg-white/[0.07]">
              <p className="text-slate-500 dark:text-slate-400 text-sm italic leading-relaxed text-left border-l-4 border-indigo-500/30 pl-4">
                <strong className="text-slate-700 dark:text-slate-200 not-italic">Uhuru Trade Ltd</strong> proporciona acceso temporal a instancias de SkillHub Cloud exclusivamente para fines educativos, de investigación y desarrollo profesional. Estas "instancias Vision" son entornos ya configurados que permiten explorar las capacidades del ecosistema SkillHub sin riesgos para los datos de producción.
              </p>
            </div>
          </div>
        </section>

        {/* Scope of Use */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-emerald-500" />
            </div>
            <h2 className="text-emerald-500 dark:text-emerald-400 text-xl font-black uppercase tracking-wide" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>2. Permitted Use & Restrictions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4 p-6 bg-emerald-500/[0.03] rounded-3xl border border-emerald-500/10 transition-all hover:border-emerald-500/20">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-snug">Access is granted for a fixed period (30/90 days) upon successful verification of the subscription.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-emerald-500/20 flex items-center justify-center mt-0.5 shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
                </div>
                <p className="text-sm text-slate-700 dark:text-slate-300 font-medium leading-snug">Users may perform configurations, testing, and training exercises within the functional scope of the provided license.</p>
              </div>
            </div>
            <div className="space-y-4 p-6 bg-red-500/[0.03] rounded-3xl border border-red-500/10 transition-all hover:border-red-500/20">
              <div className="flex items-start gap-3 text-red-600 dark:text-red-400">
                <div className="w-6 h-6 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 shrink-0">
                  <AlertCircle className="w-3.5 h-3.5" />
                </div>
                <p className="text-sm font-black uppercase tracking-tighter leading-snug">Strictly prohibited: Uploading real production data, PII, or using the instance for commercial production.</p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-red-500/10 flex items-center justify-center mt-0.5 shrink-0">
                  <AlertCircle className="w-3.5 h-3.5 text-red-500/40" />
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium leading-snug">Any attempt to bypass security measures or share credentials with unauthorized third parties will result in immediate termination.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Security and Liability */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-amber-500/10 flex items-center justify-center">
              <AlertTriangle className="w-4 h-4 text-amber-500" />
            </div>
            <h2 className="text-amber-500 dark:text-amber-400 text-xl font-black uppercase tracking-wide" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>3. Liability & Data Integrity</h2>
          </div>
          <div className="p-6 bg-slate-900/5 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/5 transition-all hover:bg-slate-900/[0.07] dark:hover:bg-white/[0.07]">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-justify px-2">
              The provided instances are "sandbox" environments. <strong className="text-slate-900 dark:text-white">Uhuru Trade Ltd</strong> does not guarantee the persistence of configurations or data uploaded by the user. Periodic maintenance, refreshes, or administrative resets may occur. Users are responsible for documenting their work externally. Uhuru Trade Ltd shall not be liable for any data loss, performance fluctuations, or service interruptions.
            </p>
          </div>
        </section>

        {/* Termination */}
        <section>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-indigo-500" />
            </div>
            <h2 className="text-indigo-500 dark:text-indigo-400 text-xl font-black uppercase tracking-wide" style={{ fontFamily: 'var(--font-outfit), sans-serif' }}>4. Service Continuity</h2>
          </div>
          <div className="p-6 bg-slate-900/5 dark:bg-white/5 rounded-3xl border border-slate-200 dark:border-white/5 transition-all hover:bg-slate-900/[0.07] dark:hover:bg-white/[0.07]">
            <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-justify px-2">
              Access credentials will remain active until the end of the contracted period. Upon expiration, the system will automatically revoke access and release the license to the general pool. Users wishing to continue must renew their subscription prior to the expiration date to ensure continuous access to the same instance (subject to availability).
            </p>
          </div>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-200 dark:border-white/10 flex flex-col md:flex-row justify-between items-end md:items-center gap-6 print:border-black">
        <div className="text-[10px] text-slate-400 dark:text-white/40 font-mono uppercase text-left">
          <p className="font-black text-slate-600 dark:text-white/60 mb-1">© 2026 Uhuru Trade Ltd. - All Rights Reserved</p>
          <p>Unit 13 Freeland Park Wareham Road</p>
          <p>Lytchett Matravers BH16 6FA Poole – UK</p>
        </div>
        <div className="flex items-center gap-3 p-4 bg-slate-900/[0.03] dark:bg-white/5 rounded-2xl border border-slate-200 dark:border-white/10 glass-effect">
          <Shield className="w-10 h-10 text-indigo-600 dark:text-indigo-400 opacity-80" />
          <div className="text-right">
            <div className="flex items-center justify-end gap-1 px-2 py-0.5 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20 rounded-md text-[8px] font-black uppercase tracking-[0.2em] mb-1">
              <CheckCircle2 className="w-2.5 h-2.5" /> VERIFIED CONTRACT
            </div>
            <p className="text-[10px] font-mono text-slate-400 dark:text-white/40 font-bold uppercase tracking-widest leading-none">Digital Signature Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
