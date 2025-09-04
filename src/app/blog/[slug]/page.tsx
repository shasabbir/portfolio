
import { notFound } from 'next/navigation';
import { getBlogBySlug } from '../actions';
import BlogPostClientPage from './blog-post-client-page';

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string };
}) {
  const post = await getBlogBySlug(params.slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClientPage post={post} />;
}
