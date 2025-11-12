// src/app/blog/page.tsx
export const dynamic = 'force-dynamic';
export const revalidate = 0;

import { getBlogs } from './actions';
import BlogClientPage from './blog-client-page';
import { isAdmin } from '@/lib/admin';
import LogoutButton from '@/components/logout-button';

export default async function BlogPage() {
  const posts = await getBlogs();
  const isOwner = isAdmin();

  return (
    <>
      {/* your hero/header */}
      {isOwner && (
        <div className="container mx-auto max-w-5xl px-4 mt-4 flex justify-end">
          <LogoutButton />
        </div>
      )}
      <BlogClientPage posts={posts} isAdmin={isOwner} />
    </>
  );
}
