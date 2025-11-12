'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE_NAME } from '@/lib/admin';

export async function login(formData: FormData) {
  const password = (formData.get('password') ?? '').toString();

  if (password === process.env.NUHASH_ADMIN_PASSWORD) {
    const token = process.env.NUHASH_ADMIN_TOKEN;
    if (!token) throw new Error('Missing NUHASH_ADMIN_TOKEN');

    cookies().set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // so it works on localhost
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7,
    });

    redirect('/'); // ✅ always go to home
  }

  return { error: 'Invalid password' };
}

export async function logout() {
  cookies().delete(ADMIN_COOKIE_NAME);
  redirect('/'); // ✅ always go to home
}
