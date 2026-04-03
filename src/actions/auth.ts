'use server';

import { prisma } from '@/lib/db';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import { SignJWT, jwtVerify } from 'jose';
import { cookies, headers } from 'next/headers';
import { randomUUID } from 'crypto';
import { sendEmail } from '@/lib/mail';
import { getResetTemplate } from '@/lib/templates/reset';

const secret = new TextEncoder().encode(process.env.JWT_SECRET || 'super-secret-key');
const ADMIN_EMAIL = 'uhurutradeuk@gmail.com';

const registerSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  password: z.string().min(8),
  companyName: z.string().optional(),
  country: z.string().min(1),
  streetAddress: z.string().min(1),
  apartment: z.string().optional(),
  city: z.string().min(1),
  county: z.string().optional(),
  postcode: z.string().min(1),
  phone: z.string().min(5),
});

export async function getCurrentUser() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session');
  
  if (!session) return null;

  try {
    const { payload } = await jwtVerify(session.value, secret);
    const user = await prisma.user.findUnique({
      where: { id: payload.userId as string },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        companyName: true,
        country: true,
        streetAddress: true,
        apartment: true,
        city: true,
        county: true,
        postcode: true,
        phone: true,
        customerNumber: true,
        subscriptionStart: true,
        subscriptionEnd: true,
        isActive: true,
        chosenPlan: true,
        isPaid: true,
        licenses: {
          select: {
            urlLink: true,
            username: true,
            password: true
          }
        }
      },
    });

    if (!user) return null;

    // AUTO-CLEANUP if expired
    if (user.isPaid && user.subscriptionEnd && new Date(user.subscriptionEnd) < new Date()) {
      // RELEASE LICENSE if any
      await prisma.license.updateMany({
        where: { userId: user.id },
        data: { userId: null, isAvailableUhuru: false, lastUserId: user.id }
      });

      await prisma.user.update({
        where: { id: user.id },
        data: {
          isPaid: false,
          chosenPlan: null,
          subscriptionStart: null,
          subscriptionEnd: null
        }
      });
      // Refresh local user object
      user.isPaid = false;
      user.chosenPlan = null;
      user.subscriptionStart = null;
      user.subscriptionEnd = null;
    }
    
    if (!user.isActive) {
      cookieStore.delete('session');
      return null;
    }

    // Refresh session for 30m inactivity logic
    const token = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('30m')
      .sign(secret);

    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 30, 
      path: '/',
    });
    
    return {
      ...user,
      isAdmin: user.email === ADMIN_EMAIL
    };
  } catch (error) {
    return null;
  }
}

export async function logoutUser() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
  return { success: true };
}

export async function updateProfile(userId: string, formData: FormData) {
  const user = await getCurrentUser();
  if (!user || (!user.isAdmin && user.id !== userId)) return { success: false, message: 'Unauthorized' };

  const rawData = Object.fromEntries(formData.entries());
  
  try {
    await prisma.user.update({
      where: { id: userId },
      data: {
        firstName: rawData.firstName as string,
        lastName: rawData.lastName as string,
        companyName: rawData.companyName as string,
        country: rawData.country as string,
        streetAddress: rawData.streetAddress as string,
        apartment: rawData.apartment as string,
        city: rawData.city as string,
        county: rawData.county as string,
        postcode: rawData.postcode as string,
        phone: rawData.phone as string,
      }
    });
    return { success: true, message: 'Profile updated successfully' };
  } catch (error) {
    return { success: false, message: 'Error updating profile' };
  }
}

export async function registerUser(formData: FormData) {
  const rawData = Object.fromEntries(formData.entries());
  const result = registerSchema.safeParse(rawData);

  if (!result.success) {
    return { success: false, errors: result.error.flatten().fieldErrors };
  }

  try {
    const hashedPassword = await bcrypt.hash(result.data.password, 6);
    
    // GENERATE CUSTOMER NUMBER (36xx)
    const lastUser = await prisma.user.findFirst({
      orderBy: { customerNumber: 'desc' },
      select: { customerNumber: true }
    });
    
    const nextNumber = lastUser?.customerNumber ? lastUser.customerNumber + 1 : 36;

    const user = await prisma.user.create({
      data: {
        ...result.data,
        password: hashedPassword,
        customerNumber: nextNumber,
      },
    });

    // AUTO-LOGIN AFTER REGISTER
    const token = await new SignJWT({ userId: user.id, email: user.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setExpirationTime('30m')
      .sign(secret);

    const cookieStore = await cookies();
    cookieStore.set('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 30, // 30 minutes
      path: '/',
    });

    return { success: true, message: 'Registration successful' };
  } catch (error: any) {
    if (error.code === 'P2002') {
      return { success: false, message: 'Email already exists' };
    }
    return { success: false, message: 'Error registering user' };
  }
}

export async function loginUser(formData: FormData) {
  const email = formData.get('email') as string;
  const password = formData.get('password') as string;

  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return { success: false, message: 'Invalid credentials' };
  }

  if (!user.isActive) {
    return { success: false, message: 'Account is inactive. Please contact support.' };
  }

  const token = await new SignJWT({ userId: user.id, email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('30m')
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 30, // 30 minutes
    path: '/',
  });

  return { success: true, message: 'Login successful' };
}

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get('email') as string;
  
  if (!email || !email.includes('@')) {
    return { success: false, message: 'Please enter a valid email address.' };
  }

  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { success: false, message: 'User not found.' };
  }

  if (!user.isActive) {
    return { success: false, message: 'Account is suspended. Please contact support.' };
  }

  const token = randomUUID();
  const expiry = new Date(Date.now() + 3600000); // 1 hour

  await prisma.user.update({
    where: { id: user.id },
    data: { resetToken: token, resetTokenExpiry: expiry },
  });

  const headerList = await headers();
  const host = headerList.get('host');
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http';
  const resetLink = `${protocol}://${host}/services/skillhub/reset-password?token=${token}`;

  await sendEmail({
    to: email,
    subject: 'Reset Password - Uhuru Trade',
    html: getResetTemplate(resetLink),
  });

  return { success: true, message: 'If the email exists, you will receive a reset link shortly.' };
}

export async function resetPassword(formData: FormData) {
  const token = formData.get('token') as string;
  const password = formData.get('password') as string;

  const user = await prisma.user.findFirst({
    where: {
      resetToken: token,
      resetTokenExpiry: { gt: new Date() },
    },
  });

  if (!user) {
    return { success: false, message: 'Invalid or expired link.' };
  }

  const hashedPassword = await bcrypt.hash(password, 6);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      password: hashedPassword,
      resetToken: null,
      resetTokenExpiry: null,
    },
  });

  return { success: true, message: 'Password updated successfully' };
}

// ADMIN ACTIONS
export async function getAllUsers() {
  const user = await getCurrentUser();
  if (!user?.isAdmin) throw new Error('Not authorized');

  const now = new Date();
  
  // Auto-cleanup expired subscriptions before listing
  const expiredUsers = await prisma.user.findMany({
    where: {
      isPaid: true,
      subscriptionEnd: { lt: now }
    },
    select: { id: true }
  });

  if (expiredUsers.length > 0) {
    const expiredIds = expiredUsers.map(u => u.id);
    // Release licenses
    await prisma.license.updateMany({
      where: { userId: { in: expiredIds } },
      data: { userId: null, isAvailableUhuru: false }
    });
    // Reset users
    await prisma.user.updateMany({
      where: { id: { in: expiredIds } },
      data: {
        isPaid: false
      }
    });
  }

  return await prisma.user.findMany({
    include: { licenses: { select: { id: true, purchaseOrder: true } } },
    orderBy: { createdAt: 'desc' },
  });
}

export async function updateUserDetails(userId: string, formData: FormData) {
  const admin = await getCurrentUser();
  if (!admin?.isAdmin) throw new Error('Not authorized');

  const data = Object.fromEntries(formData.entries()) as any;
  
  // Convert checkbox values
  const isPaid = formData.get('isPaid') === 'on';
  let isActive = formData.get('isActive') === 'on';

  const targetUser = await prisma.user.findUnique({ where: { id: userId }, select: { email: true } });
  if (targetUser?.email === ADMIN_EMAIL) {
    isActive = true; // Protect superadmin
  }

  // VALIDATION: If verified payment is checked, plan and date are mandatory
  const plan = formData.get('chosenPlan') as string;
  const startStr = formData.get('start') as string;
  
  if (isPaid) {
    if (!plan || !startStr) {
      return { success: false, message: 'PLAN_AND_DATE_REQUIRED: Please select a plan and start date to verify payment' };
    }
  }

  const startDate = startStr ? new Date(startStr) : null;
  let endDate = null;

  if (startDate && plan) {
    endDate = new Date(startDate);
    if (plan.includes('30 days')) {
      endDate.setDate(endDate.getDate() + 30);
    } else if (plan.includes('90 days')) {
      endDate.setDate(endDate.getDate() + 90);
    }
  }

  // LICENSE MANAGEMENT
  try {
    const currentUser = await prisma.user.findUnique({
      where: { id: userId },
      select: { isPaid: true }
    });

    if (currentUser?.isPaid && !isPaid) {
      // RELEASE LICENSE
      await prisma.license.updateMany({
        where: { userId: userId },
        data: { userId: null, isAvailableUhuru: false, lastUserId: userId }
      });
    }

    await prisma.user.update({
      where: { id: userId },
      data: {
        isActive: isActive,
        chosenPlan: plan,
        isPaid: isPaid,
        subscriptionStart: startDate,
        subscriptionEnd: endDate,
        firstName: data.firstName,
        lastName: data.lastName,
        companyName: data.companyName,
        phone: data.phone,
        country: data.country,
        city: data.city,
        streetAddress: data.streetAddress,
        postcode: data.postcode,
      }
    });
    
    return { success: true, message: 'User updated successfully' };
  } catch (error) {
    return { success: false, message: 'Error updating student details' };
  }
}

export async function reassignStudentLicense(userId: string) {
  const admin = await getCurrentUser();
  if (!admin?.isAdmin) throw new Error('Not authorized');

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user?.isPaid) return { success: false, message: 'STUDENT_NOT_PAID' };

    // 1. UNASSIGN ALL Current Licenses for this user
    await prisma.license.updateMany({
      where: { userId: userId },
      data: { userId: null, isAvailableUhuru: false, lastUserId: userId }
    });

    // 2. FIND NEW LICENSE (Working=true, Assigned=false)
    const candidates = await prisma.license.findMany({
      where: { isAvailable: true, isAvailableUhuru: false }
    });

    if (candidates.length === 0) {
       return { success: false, message: 'NO_LICENSES_AVAILABLE' };
    }

    // Prioritize licenses that HAVEN'T been used by this user lately
    const preferred = candidates.filter(l => l.lastUserId !== userId);
    const source = preferred.length > 0 ? preferred : candidates;
    
    // Pick ANY from the source randomly
    const chosen = source[Math.floor(Math.random() * source.length)];

    await prisma.license.update({
      where: { id: chosen.id },
      data: { userId: userId, isAvailableUhuru: true }
    });

    return { success: true, message: 'License reassigned successfully' };
  } catch (error) {
    console.error('Reassign error:', error);
    return { success: false, message: 'Error reassigning license' };
  }
}

// LICENSE ACTIONS
export async function getAllLicenses() {
  const admin = await getCurrentUser();
  if (!admin?.isAdmin) throw new Error('Not authorized');

  return await prisma.license.findMany({
    include: { assignedTo: { select: { email: true, firstName: true, lastName: true, customerNumber: true, id: true } } },
    orderBy: { subscription: 'asc' }
  });
}

export async function upsertLicense(formData: FormData) {
  const admin = await getCurrentUser();
  if (!admin?.isAdmin) throw new Error('Not authorized');

  const id = formData.get('id') as string;
  const isAvailable = formData.get('isAvailable') === 'on';
  let userId = formData.get('userId') as string || null;
  let isAvailableUhuru = formData.get('isAvailableUhuru') === 'on';

  // If MARKED AS NOT WORKING, unassign ANY student from it
  if (!isAvailable) {
    userId = null;
    isAvailableUhuru = false;
  }

  const data = {
    subscription: formData.get('subscription') as string,
    purchaseOrder: formData.get('purchaseOrder') as string,
    expiryDate: formData.get('expiryDate') ? new Date(formData.get('expiryDate') as string) : null,
    urlLink: formData.get('urlLink') as string,
    username: formData.get('username') as string,
    password: formData.get('password') as string,
    isAvailable,
    isAvailableUhuru,
    userId,
  };

  if (id) {
    await prisma.license.update({ where: { id }, data });
  } else {
    await prisma.license.create({ data });
  }

  return { success: true };
}

export async function deleteLicense(id: string) {
  const admin = await getCurrentUser();
  if (!admin?.isAdmin) throw new Error('Not authorized');

  await prisma.license.delete({ where: { id } });
  return { success: true };
}
export async function syncAllLicensesStatus() {
  const admin = await getCurrentUser();
  if (!admin?.isAdmin) throw new Error('Not authorized');

  try {
    const licenses = await prisma.license.findMany();
    
    for (const license of licenses) {
      if (!license.urlLink) continue;

      let isWorking = false;
      try {
        const controller = new AbortController();
        const timeout = setTimeout(() => controller.abort(), 10000);
        
        const response = await fetch(license.urlLink, { 
          signal: controller.signal,
          headers: { 'User-Agent': 'Mozilla/5.0' } // Simulation to avoid some simple blocks
        });
        
        const text = await response.text();
        isWorking = text.toLowerCase().includes('signin');
        clearTimeout(timeout);
      } catch (err) {
        isWorking = false;
      }

      // Update if status changed or if NOT working to ensure consistency
      // Rule: If NOT working, MUST be unassigned
      if (!isWorking) {
        await prisma.license.update({
          where: { id: license.id },
          data: {
            isAvailable: false,
            isAvailableUhuru: false,
            userId: null
          }
        });
      } else {
        // If it WAS down and now it is UP, we just mark as working 
        // (but we don't automatically assign anyone back)
        await prisma.license.update({
          where: { id: license.id },
          data: { isAvailable: true }
        });
      }
    }
    
    return { success: true, message: 'All licenses synced successfully' };
  } catch (error) {
    console.error('Sync error:', error);
    return { success: false, message: 'Error syncing licenses' };
  }
}
