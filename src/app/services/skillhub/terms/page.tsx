'use client';

import { ContractingTerms } from '@/components/uhuru/ContractingTerms';
import SubPageHeader from '@/components/uhuru/subpage-header';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center relative overflow-x-hidden font-sans transition-all duration-300">
      
      {/* Document Header Controls */}
      <div className="w-full no-print bg-slate-900 border-b border-blue-500/20 px-6 py-4 flex flex-col md:flex-row items-center justify-between gap-4 sticky top-0 z-50 shadow-2xl">
        <SubPageHeader backHref="/services/skillhub" backText="Back to Login" />
        <button 
          type="button"
          onClick={() => window.print()}
          className="group px-8 py-3 bg-blue-600 text-white text-[10px] font-black uppercase tracking-[0.2em] rounded-xl hover:scale-105 active:scale-95 transition-all flex items-center gap-4 shadow-xl"
        >
          <FileText className="w-4 h-4 group-hover:rotate-12 transition-transform" />
          Download as PDF
        </button>
      </div>

      <div className="w-full h-full flex-1 z-10 py-10 px-4 md:px-10 lg:px-20 print:p-0 print:m-0">
        <div className="w-full max-w-none print:max-w-none shadow-none border-none dark:bg-white dark:text-slate-900">
          <ContractingTerms />
        </div>
      </div>
      
      <style jsx global>{`
        @media print {
          .no-print { display: none !important; }
          body, html { 
            background: white !important; 
            color: black !important; 
            margin: 0 !important; 
            padding: 0 !important;
            width: 100% !important;
          }
          * { -webkit-print-color-adjust: exact !important; print-color-adjust: exact !important; }
          #contracting-terms-document { 
            box-shadow: none !important; 
            border: none !important; 
            border-radius: 0 !important;
            padding: 0 !important;
            margin: 0 !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
