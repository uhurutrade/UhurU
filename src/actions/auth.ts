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
        subscriptionStart: true,
        subscriptionEnd: true,
      },
    });
    
    if (!user) return null;
    
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

export async function updateProfile(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) return { success: false, message: 'Unauthorized' };

  const rawData = Object.fromEntries(formData.entries());
  
  try {
    await prisma.user.update({
      where: { id: user.id },
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
    const hashedPassword = await bcrypt.hash(result.data.password, 10);
    
    await prisma.user.create({
      data: {
        ...result.data,
        password: hashedPassword,
      },
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

  const token = await new SignJWT({ userId: user.id, email: user.email })
    .setProtectedHeader({ alg: 'HS256' })
    .setExpirationTime('2h')
    .sign(secret);

  const cookieStore = await cookies();
  cookieStore.set('session', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    maxAge: 60 * 60 * 2, // 2 hours
    path: '/',
  });

  return { success: true, message: 'Login successful' };
}

export async function requestPasswordReset(formData: FormData) {
  const email = formData.get('email') as string;
  const user = await prisma.user.findUnique({ where: { email } });

  if (!user) {
    return { success: true, message: 'If the email exists, you will receive a reset link shortly.' };
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
  const resetLink = `${protocol}://${host}/services/fusion/reset-password?token=${token}`;

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

  const hashedPassword = await bcrypt.hash(password, 10);

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

  return await prisma.user.findMany({
    orderBy: { createdAt: 'desc' },
    select: {
      id: true,
      firstName: true,
      lastName: true,
      email: true,
      companyName: true,
      subscriptionStart: true,
      subscriptionEnd: true,
      createdAt: true,
    }
  });
}

export async function updateSubscription(userId: string, start: string, end: string) {
  const admin = await getCurrentUser();
  if (!admin?.isAdmin) throw new Error('Not authorized');

  await prisma.user.update({
    where: { id: userId },
    data: {
      subscriptionStart: start ? new Date(start) : null,
      subscriptionEnd: end ? new Date(end) : null,
    }
  });
  
  return { success: true, message: 'Subscription updated successfully' };
}
