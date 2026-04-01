import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function test() {
  console.log("Starting DB tests...");

  // 1. Find a user
  const user = await prisma.user.findFirst();
  if (user) {
    console.log("OK: Found user:", user.email);
    
    // 2. Test User Update
    const updated = await prisma.user.update({
      where: { id: user.id },
      data: { city: user.city } // Update with the same value just for test
    });
    console.log("OK: User update test passed.");
  } else {
    console.log("WARN: No users found to test update.");
  }

  // 3. Test License Insert
  const newLicense = await prisma.license.create({
    data: {
      subscription: "Test Plan",
      purchaseOrder: "00000-0",
      urlLink: "http://test.com",
      username: "testuser",
      password: "password123",
      isAvailable: true,
      isAvailableUhuru: false
    }
  });
  console.log("OK: License creation test passed. ID:", newLicense.id);

  // 4. Test License Update
  await prisma.license.update({
    where: { id: newLicense.id },
    data: { username: "updated-test" }
  });
  console.log("OK: License update test passed.");

  // 5. Cleanup
  await prisma.license.delete({
    where: { id: newLicense.id }
  });
  console.log("OK: License deletion test passed.");

  console.log("DB internal tests finished successfully.");
}

test()
  .catch(e => {
    console.error("FAIL: DB Tests failed:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
