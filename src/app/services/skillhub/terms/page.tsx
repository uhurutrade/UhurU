'use client';

import { ContractingTerms } from '@/components/uhuru/ContractingTerms';
import SubPageHeader from '@/components/uhuru/subpage-header';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#e5e5e5] dark:bg-slate-950 text-foreground flex flex-col relative overflow-hidden font-sans transition-colors duration-500">
      <SubPageHeader backHref="/services/skillhub" backText="Back to Login" />
      
      {/* Background Orbs */}
      <div className="absolute top-0 -left-10 w-96 h-96 bg-indigo-500/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse pointer-events-none"></div>
      <div className="absolute -bottom-20 -right-10 w-96 h-96 bg-purple-600/20 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000 pointer-events-none"></div>

      <div className="flex-1 w-full max-w-5xl mx-auto z-10 px-4 py-12 md:py-20 lg:py-24">
        <ContractingTerms />
        
        <div className="mt-12 flex justify-center pb-20 no-print">
          <button 
            type="button"
            onClick={() => window.print()}
            className="group px-10 py-5 bg-slate-900 dark:bg-white text-white dark:text-slate-900 text-xs font-black uppercase tracking-[0.2em] rounded-2xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.2)] dark:shadow-[0_20px_50px_rgba(255,255,255,0.05)]"
          >
            <FileText className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            Download PDF
          </button>
        </div>
      </div>
      
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; color: black !important; }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
        }
      `}</style>
    </div>
  );
}
