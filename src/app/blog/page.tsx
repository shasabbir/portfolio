import { BlogCard } from '@/components/blog-card';
import { mockBlogs } from '@/lib/data';

export default function BlogPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 md:py-20">
      <header className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          From the Lab
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          Insights, discoveries, and reflections from my work.
        </p>
      </header>

      <main className="mt-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {mockBlogs.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
