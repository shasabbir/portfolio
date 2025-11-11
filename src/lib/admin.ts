// src/lib/admin.ts
import { cookies } from 'next/headers';

export const ADMIN_COOKIE_NAME = 'nuhash_admin';

export function isAdmin() {
  const cookieStore = cookies();
  const token = cookieStore.get(ADMIN_COOKIE_NAME)?.value;
  return !!token && token === process.env.NUHASH_ADMIN_TOKEN;
}
