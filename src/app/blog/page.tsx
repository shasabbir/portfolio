import { getBlogs } from './actions';
import BlogClientPage from './blog-client-page';
import { isAdmin } from '@/lib/admin';
// (optional) import { logout } from '../admin/login/actions';

export default async function BlogPage() {
  const posts = await getBlogs();
  const isOwner = isAdmin();

  return (
    <BlogClientPage posts={posts} isAdmin={isOwner} />
  );
}
