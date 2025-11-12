// src/lib/admin.ts
import 'server-only';
import { cookies } from 'next/headers';

export const ADMIN_COOKIE_NAME = 'nuhash_admin';

export async function isAdmin(): Promise<boolean> {
  // Next 15+ — cookies() must be awaited
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return !!token && token === process.env.NUHASH_ADMIN_TOKEN;
}
