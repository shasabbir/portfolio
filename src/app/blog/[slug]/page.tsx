
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '../actions';
import BlogPostClientPage from './blog-post-client-page';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClientPage post={post} />;
}
