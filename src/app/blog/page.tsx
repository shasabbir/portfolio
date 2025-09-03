
import { BlogCard } from '@/components/blog-card';
import { BlogForm } from '@/components/blog-form';
import { getBlogs } from './actions';
import { BookPlus } from 'lucide-react';

export default async function BlogPage() {
  const posts = await getBlogs();

  return (
    <div className="container mx-auto max-w-5xl py-12 md:py-20">
      <header className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left">
        <div>
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            From the Lab
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Insights, discoveries, and reflections from my work.
          </p>
        </div>
        <BlogForm
          triggerButton={
            <div className="flex items-center gap-2">
              <BookPlus className="h-4 w-4" />
              Add Post
            </div>
          }
        />
      </header>

      <main className="mt-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {posts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
