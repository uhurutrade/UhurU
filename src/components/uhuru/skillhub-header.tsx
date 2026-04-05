'use client';

import { LogOut } from 'lucide-react';
import { logoutUser } from '@/actions/auth';

interface SkillHubHeaderProps {
  user: {
    customerNumber?: number | string;
    email: string;
    isAdmin?: boolean;
  };
}

export default function SkillHubHeader({ user }: SkillHubHeaderProps) {
  const handleLogout = async () => {
    await logoutUser();
    window.location.href = '/services/skillhub';
  };

  return (
    <header className="w-full flex items-center justify-between py-5 px-4 md:px-10 border-b border-black/10 dark:border-white/5 bg-slate-300/80 dark:bg-slate-950/40 backdrop-blur-md sticky top-0 z-50">
      <div className="flex items-center gap-4 md:gap-10 min-w-0 flex-1 overflow-hidden">
        {/* Branding Logo Text - Identical to provided image */}
        <div className="text-2xl md:text-3xl font-black tracking-tighter flex items-center select-none font-sans pointer-events-none shrink-0">
           <span className="text-black dark:text-white">Skill</span>
           <span className="text-blue-500">Hub</span>
           <div className="w-1.5 h-1.5 md:w-2 md:h-2 bg-blue-600 rounded-full ml-1 mt-auto mb-1 animate-pulse shadow-[0_0_10px_rgba(37,99,235,0.5)]"></div>
        </div>

        {/* User context - ID and Email in a single line to the right of logo */}
        <div className="flex items-center gap-3 md:gap-6 min-w-0 overflow-hidden border-l border-black/10 dark:border-white/10 pl-4 md:pl-10 h-8 md:h-10">
          {user.customerNumber && (
            <div className="shrink-0">
              <span className="text-[12px] md:text-xs bg-blue-900/10 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-lg border border-blue-500/10 font-black tracking-tight">
                ID: {user.customerNumber.toString().padStart(4, '0')}
              </span>
            </div>
          )}
          
          <div className="min-w-0 flex items-center">
            <span className="text-[11px] md:text-xs font-mono font-bold text-black/60 dark:text-white/40 lowercase tracking-tight truncate max-w-[150px] md:max-w-none">
              {user.email}
            </span>
          </div>

          {user.isAdmin && (
            <div className="shrink-0 hidden lg:block">
              <span className="text-emerald-500 font-black text-[11px] tracking-normal px-3 py-0.5 rounded-full border border-emerald-500/10 bg-emerald-500/5">
                Admin
              </span>
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center shrink-0 ml-4">
        <button 
          onClick={handleLogout}
          className="group flex items-center gap-1.5 px-3 md:px-5 h-10 bg-black/10 dark:bg-white/5 hover:bg-red-500/10 text-black dark:text-white/60 hover:text-red-500 rounded-xl transition-all border border-black/20 dark:border-white/10 font-black text-xs tracking-tight"
        >
          <LogOut className="w-3.5 h-3.5 group-hover:scale-110 transition-transform" /> 
          <span className="hidden sm:inline">Log Out</span>
        </button>
      </div>
    </header>
  );
}
