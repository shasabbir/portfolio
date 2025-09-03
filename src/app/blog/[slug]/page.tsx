
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '../actions';
import BlogPostClientPage from './blog-post-client-page';

export default async function BlogPostPage({ params: { slug } }: { params: { slug: string } }) {
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClientPage post={post} />;
}
