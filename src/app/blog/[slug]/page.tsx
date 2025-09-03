
import { notFound } from 'next/navigation';
import { mockBlogs } from '@/lib/data';
import BlogPostClientPage from './blog-post-client-page';

export default function BlogPostPage({ params: { slug } }: { params: { slug: string } }) {
  const post = mockBlogs.find((p) => p.slug === slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClientPage post={post} />;
}
