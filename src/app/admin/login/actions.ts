'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { ADMIN_COOKIE_NAME } from '@/lib/admin';

export async function login(prevState: { error: string }, formData: FormData) {
  const password = String(formData.get('password') ?? '');

  if (password === process.env.NUHASH_ADMIN_PASSWORD) {
    const token = process.env.NUHASH_ADMIN_TOKEN;
    if (!token) throw new Error('Missing NUHASH_ADMIN_TOKEN');

    const cookieStore = await cookies();            // ✅ await
    cookieStore.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', // works on localhost too
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24 * 7, // 7 days
    });

    redirect('/'); // or '/blog' if you prefer
  }

  return { error: 'Invalid password' };
}

export async function logout(prevState: any, formData?: FormData) {
  const cookieStore = await cookies();              // ✅ await
  cookieStore.delete(ADMIN_COOKIE_NAME);
  const redirectTo = formData?.get('redirectTo') as string | null;
  redirect(redirectTo || '/');
}
