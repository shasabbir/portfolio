
import { BlogCard } from '@/components/blog-card';
import { BlogForm } from '@/components/blog-form';
import { getBlogs } from './actions';
import { BookPlus } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default async function BlogPage() {
  const posts = await getBlogs();
  const featuredPost = posts[0];
  const otherPosts = posts.slice(1);

  return (
    <div className="container mx-auto max-w-6xl py-12 md:py-20">
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
        {featuredPost && (
          <section className="mb-12">
            <Link href={`/blog/${featuredPost.slug}`}>
              <Card className="grid overflow-hidden rounded-lg border shadow-lg transition-shadow duration-300 hover:shadow-xl md:grid-cols-2">
                <div className="relative h-64 w-full md:h-auto">
                  <Image
                    src={featuredPost.imageUrl}
                    alt={featuredPost.title}
                    fill
                    className="object-cover"
                    data-ai-hint={featuredPost.imageHint}
                  />
                </div>
                <div className="flex flex-col justify-between p-6 md:p-8">
                  <div>
                    <div className="mb-2 flex gap-2">
                      {featuredPost.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    <CardTitle className="font-headline mb-4 text-3xl">
                      {featuredPost.title}
                    </CardTitle>
                    <p className="text-muted-foreground">
                      {featuredPost.excerpt}
                    </p>
                  </div>
                  <div className="mt-6 flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={featuredPost.author.avatar}
                          alt={featuredPost.author.name}
                        />
                        <AvatarFallback>
                          {featuredPost.author.name
                            .split(' ')
                            .map((n) => n[0])
                            .join('')}
                        </AvatarFallback>
                      </Avatar>
                      <span className="font-medium">
                        {featuredPost.author.name}
                      </span>
                    </div>
                    <span>•</span>
                    <time dateTime={featuredPost.date}>
                      {new Date(featuredPost.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </time>
                  </div>
                </div>
              </Card>
            </Link>
          </section>
        )}

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {otherPosts.map((post) => (
            <BlogCard key={post.slug} post={post} />
          ))}
        </div>
      </main>
    </div>
  );
}
