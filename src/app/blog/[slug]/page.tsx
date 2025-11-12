import { notFound } from 'next/navigation';
import { getBlogBySlug, getBlogs } from '../actions';
import BlogPostClientPage from './blog-post-client-page';
import { isAdmin } from '@/lib/admin';

interface BlogPostPageProps {
  // ⬇️ params is a Promise in Next 15+
  params: Promise<{ slug: string }>;
}

// (optional) keep this if you prebuild slugs
export async function generateStaticParams() {
  const posts = await getBlogs();
  return posts.map((post) => ({ slug: post.slug }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  // ⬇️ await it before using
  const { slug } = await params;

  const post = await getBlogBySlug(slug);
  if (!post) {
    notFound();
  }

  const isOwner = await isAdmin();
  return <BlogPostClientPage post={post} isAdmin={isOwner} />;
}
