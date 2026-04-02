'use client';

import { ContractingTerms } from '@/components/uhuru/ContractingTerms';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <ContractingTerms />
      <div className="p-8 flex justify-center pb-20 no-print">
        <button 
          onClick={() => window.print()}
          className="px-8 py-3 bg-slate-900 text-white text-[10px] font-black uppercase tracking-widest rounded-xl hover:bg-slate-800 transition-all flex items-center gap-3 shadow-2xl"
        >
          Download as PDF / Print
        </button>
      </div>
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
        }
      `}</style>
    </div>
  );
}
