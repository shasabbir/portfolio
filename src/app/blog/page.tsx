
import { getBlogs } from './actions-mongodb';
import BlogClientPage from './blog-client-page';

export default async function BlogPage() {
  const posts = await getBlogs();

  return <BlogClientPage posts={posts} />;
}
