import fs from 'fs';

let content = fs.readFileSync('src/app/services/skillhub/dashboard/page.tsx', 'utf8');

content = content.replace(/text-black dark:text-black dark:text-white/g, 'text-black dark:text-white');
content = content.replace(/text-black dark:text-white dark:text-black dark:text-white\/40/g, 'text-black dark:text-white/40');

fs.writeFileSync('src/app/services/skillhub/dashboard/page.tsx', content, 'utf8');
console.log('Duplicates Fixed');
