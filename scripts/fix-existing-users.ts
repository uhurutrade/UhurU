import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const users = await prisma.user.findMany({ orderBy: { createdAt: 'asc' } });

  let nextNum = 36;
  for (const user of users) {
    const prefix = nextNum.toString().padStart(4, '0');
    // Remove any prefix from firstName if it was added by mistake
    let cleanFirstName = user.firstName;
    if (/^\d{4}\s/.test(cleanFirstName)) {
      cleanFirstName = cleanFirstName.replace(/^\d{4}\s/, '');
    }

    console.log(`Fixing ${user.email}: customerNumber=${nextNum}, firstName="${cleanFirstName}"`);
    await prisma.user.update({
      where: { id: user.id },
      data: {
        customerNumber: nextNum,
        firstName: cleanFirstName,
      },
    });
    nextNum++;
  }
  console.log('Done.');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
