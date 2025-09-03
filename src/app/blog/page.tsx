
import { getBlogs } from './actions';
import BlogClientPage from './blog-client-page';

export default async function BlogPage() {
  const posts = await getBlogs();

  return <BlogClientPage posts={posts} />;
}
