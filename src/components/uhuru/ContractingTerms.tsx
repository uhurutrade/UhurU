'use client';

import React from 'react';
import { Shield, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export function ContractingTerms() {
  return (
    <div className="bg-white text-slate-900 p-8 md:p-12 border border-slate-200 shadow-2xl rounded-sm max-w-4xl mx-auto font-serif" id="contracting-terms-document">
      {/* Header replicated from image */}
      <div className="bg-[#0f172a] -m-8 md:-m-12 p-8 md:p-12 mb-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <div className="w-10 h-10 border-2 border-white flex items-center justify-center font-black text-white text-xl">U</div>
            <span className="text-white font-black tracking-tighter text-2xl uppercase">UHURU <span className="text-blue-400">TRADE</span></span>
          </div>
          <p className="text-blue-400/60 text-[10px] font-mono tracking-widest uppercase">Global IT & ERP Consulting</p>
        </div>
        <div className="text-right">
          <h1 className="text-white text-3xl font-black uppercase tracking-tight mb-1">PROVISIONING AGREEMENT</h1>
          <p className="text-blue-400/80 font-mono text-[10px] uppercase tracking-[0.2em]">ID: UT-FUSION-2026-X | {new Date().toLocaleDateString('en-GB')}</p>
        </div>
      </div>

      <div className="space-y-10 py-6">
        {/* Executive Summary */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-emerald-500 text-xl font-bold uppercase tracking-wide border-b-2 border-emerald-500/20 pb-1">1. Executive Summary</h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-justify mb-4">
            Uhuru Trade Ltd provides temporary access to Oracle Fusion Cloud Instances exclusively for educational, research, and professional development purposes. These "Vision Instances" are pre-configured environments designed to allow consultants and students to explore functional and technical capabilities of the Oracle ERP/SCM/HCM Cloud ecosystem without the risks associated with production data.
          </p>
          <p className="text-slate-400 text-sm italic leading-relaxed text-left border-l-2 border-slate-100 pl-4">
            Uhuru Trade Ltd proporciona acceso temporal a instancias de Oracle Fusion Cloud exclusivamente para fines educativos, de investigación y desarrollo profesional. Estas "instancias Vision" son entornos ya configurados que permiten explorar las capacidades del ecosistema Oracle sin riesgos para los datos de producción.
          </p>
        </section>

        {/* Scope of Use */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-emerald-500 text-xl font-bold uppercase tracking-wide border-b-2 border-emerald-500/20 pb-1">2. Permitted Use & Restrictions</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-3">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-700">Access is granted for a fixed period (30/90 days) upon successful verification of the subscription.</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-700">Users may perform configurations, testing, and training exercises within the functional scope of the provided license.</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-start gap-2 text-red-600">
                <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
                <p className="text-sm font-bold">Strictly prohibited: Uploading real production data, PII (Personally Identifiable Information), or using the instance for commercial commercial production.</p>
              </div>
              <div className="flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 mt-0.5 shrink-0" />
                <p className="text-sm text-slate-700">Any attempt to bypass security measures or share credentials with unauthorized third parties will result in immediate termination without refund.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Security and Liability */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-emerald-500 text-xl font-bold uppercase tracking-wide border-b-2 border-emerald-500/20 pb-1">3. Liability & Data Integrity</h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-justify mb-4">
            The provided instances are "sandbox" environments. Uhuru Trade Ltd does not guarantee the persistence of configurations or data uploaded by the user. Periodic maintenance, refreshes, or administrative resets may occur. Users are responsible for documenting their work externally. Uhuru Trade Ltd shall not be liable for any data loss, performance fluctuations, or service interruptions inherent to the cloud provider's infrastructure.
          </p>
        </section>

        {/* Termination */}
        <section>
          <div className="flex items-center gap-3 mb-4">
            <h2 className="text-emerald-500 text-xl font-bold uppercase tracking-wide border-b-2 border-emerald-500/20 pb-1">4. Service Continuity</h2>
          </div>
          <p className="text-slate-600 leading-relaxed text-justify">
            Access credentials will remain active until the end of the contracted period. Upon expiration, the system will automatically revoke access and release the license to the general pool. Users wishing to continue must renew their subscription prior to the expiration date to ensure continuous access to the same instance (subject to availability).
          </p>
        </section>
      </div>

      <div className="mt-12 pt-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-4">
        <div className="text-[10px] text-slate-400 font-mono uppercase text-center md:text-left">
          <p>© 2026 Uhuru Trade Ltd. - All Rights Reserved</p>
          <p>Unit 13 Freeland Park Wareham Road, Lytchett Matravers BH16 6FA Poole – UK</p>
        </div>
        <div className="flex items-center gap-2 opacity-50 grayscale hover:grayscale-0 transition-all cursor-crosshair">
          <Shield className="w-8 h-8 text-blue-950" />
          <div className="text-right">
            <p className="text-[8px] font-black uppercase tracking-widest text-blue-900">VERIFIED CONTRACT</p>
            <p className="text-[10px] font-serif italic text-slate-400">Digital Signature Active</p>
          </div>
        </div>
      </div>
    </div>
  );
}
