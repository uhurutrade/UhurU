import fs from 'fs';

let content = fs.readFileSync('src/app/services/skillhub/dashboard/page.tsx', 'utf8');

// Colors replacement logic
content = content.replace(/bg-slate-900\/50/g, 'bg-white dark:bg-slate-900/50');
content = content.replace(/bg-slate-950\/40/g, 'bg-white dark:bg-slate-950/40');
content = content.replace(/bg-slate-900 dark:bg-primary\/5/g, 'bg-white dark:bg-primary/5');
content = content.replace(/bg-slate-900 dark:bg-primary\/10/g, 'bg-slate-200 dark:bg-primary/10');
content = content.replace(/bg-slate-950 border/g, 'bg-white dark:bg-slate-950 border');
content = content.replace(/bg-slate-900 border/g, 'bg-white dark:bg-slate-900 border');
content = content.replace(/bg-slate-900 dark:bg-primary/g, 'bg-primary dark:bg-primary');
content = content.replace(/bg-white\/5/g, 'bg-black/5 dark:bg-white/5');
content = content.replace(/bg-slate-800 hover:bg-slate-700/g, 'bg-slate-200 dark:bg-slate-800 hover:bg-slate-300 dark:hover:bg-slate-700');

// Fix text classes that were purely one color but need darker variant in light mode
content = content.replace(/(?<!dark:)text-emerald-500(?![\/\w])/g, 'text-emerald-700 dark:text-emerald-500');
content = content.replace(/(?<!dark:)text-emerald-400(?![\/\w])/g, 'text-emerald-700 dark:text-emerald-400');
content = content.replace(/(?<!dark:)text-red-500(?![\/\w])/g, 'text-red-700 dark:text-red-500');
content = content.replace(/(?<!dark:)text-red-400(?![\/\w])/g, 'text-red-600 dark:text-red-400');
content = content.replace(/(?<!dark:)text-amber-500(?![\/\w])/g, 'text-amber-700 dark:text-amber-500');
content = content.replace(/(?<!dark:)text-yellow-500(?![\/\w])/g, 'text-yellow-700 dark:text-yellow-500');

// Make text coherent. Fix text-black which shouldn't be overridden badly or things that shouldn't be white.
// "text-black dark:text-white" -> already okay
// "text-[11px] font-black font-mono" line 798 without text color? Wait, 'text-foreground' was there.

fs.writeFileSync('src/app/services/skillhub/dashboard/page.tsx', content, 'utf8');
console.log('Colors replaced in dashboard/page.tsx');
