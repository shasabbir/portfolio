import { notFound } from 'next/navigation';
import { mockBlogs } from '@/lib/data';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BlogForm } from '@/components/blog-form';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import Link from 'next/link';

export async function generateStaticParams() {
  return mockBlogs.map((post) => ({
    slug: post.slug,
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = mockBlogs.find((p) => p.slug === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="container mx-auto max-w-3xl py-12 md:py-20">
      <header className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="font-headline mb-4 text-4xl font-bold tracking-tight md:text-5xl">
            {post.title}
          </h1>
          <div className="flex items-center gap-2">
            <BlogForm post={post} />
            <Button variant="ghost" size="icon" asChild>
              <Link href="/blog">
                <Trash2 className="text-destructive" />
              </Link>
            </Button>
          </div>
        </div>
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>
                {post.author.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <span>{post.author.name}</span>
          </div>
          <span>•</span>
          <time dateTime={post.date}>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</time>
        </div>
        <div className="mt-4 flex gap-2">
          {post.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <Image
        src={post.imageUrl}
        alt={post.title}
        width={1200}
        height={630}
        className="mb-8 rounded-lg object-cover"
        data-ai-hint={post.imageHint}
      />

      <div
        className="prose prose-lg mx-auto max-w-none dark:prose-invert"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
}
