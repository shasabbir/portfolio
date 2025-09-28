
import { notFound } from 'next/navigation';
import { getBlogBySlug, getBlogs } from '../actions-mongodb';
import BlogPostClientPage from './blog-post-client-page';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

export async function generateStaticParams() {
  const blogs = await getBlogs();
  
  return blogs.map((blog) => ({
    slug: blog.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogBySlug(slug);

  if (!post) {
    notFound();
  }

  return <BlogPostClientPage post={post} />;
}
