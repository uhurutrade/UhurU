'use client';

import { ContractingTerms } from '@/components/uhuru/ContractingTerms';
import SubPageHeader from '@/components/uhuru/subpage-header';
import { FileText } from 'lucide-react';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white text-slate-900 flex flex-col items-center relative overflow-x-hidden font-sans transition-all duration-300">
      
      {/* Minimalistic floating print button */}
      <button 
        type="button"
        onClick={() => window.print()}
        className="fixed bottom-8 right-8 z-50 w-14 h-14 bg-black text-white rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all no-print group"
        title="Print or Save as PDF"
      >
        <FileText className="w-6 h-6 group-hover:-translate-y-1 transition-transform" />
      </button>

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
            padding: 40px !important;
            margin: 0 auto !important;
            width: 100% !important;
            max-width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}
