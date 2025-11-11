import { notFound } from 'next/navigation';
import { getBlogBySlug, getBlogs } from '../actions';
import BlogPostClientPage from './blog-post-client-page';
import { isAdmin } from '@/lib/admin';

interface BlogPostPageProps {
  params: { slug: string };
}

// Pre-generate all blog post paths
export async function generateStaticParams() {
  const posts = await getBlogs();
  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  const isOwner = isAdmin(); // pass this if you show edit/delete controls
  return <BlogPostClientPage post={post} isAdmin={isOwner} />;
}
