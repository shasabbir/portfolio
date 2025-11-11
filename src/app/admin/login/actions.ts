'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE_NAME } from '@/lib/admin';

export async function login(formData: FormData) {
  const password = formData.get('password');

  if (password === process.env.NUHASH_ADMIN_PASSWORD) {
    const token = process.env.NUHASH_ADMIN_TOKEN;
    if (!token) {
      throw new Error('Missing NUHASH_ADMIN_TOKEN');
    }

    cookies().set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: true,
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    redirect('/blog');
  }

  return { error: 'Invalid password' };
}

export async function logout() {
  cookies().delete(ADMIN_COOKIE_NAME);
  redirect('/blog');
}
