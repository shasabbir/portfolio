
'use client';

import { useState } from 'react';
import type { Blog } from '@/types';
import { ScrollAnimation } from '@/components/scroll-animation';
import Image from 'next/image';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { BlogListItem } from '@/components/blog-list-item';
import { BlogForm } from '@/components/blog-form';
import { BookPlus } from 'lucide-react';

export default function BlogClientPage({ posts: initialPosts }: { posts: Blog[] }) {
  const [posts, setPosts] = useState(initialPosts);
  const [featuredPost, setFeaturedPost] = useState(posts[0]);

  const sidePosts = posts.filter(p => p.slug !== featuredPost.slug).slice(0, 3);
  const otherPosts = posts.filter(p => p.slug !== featuredPost.slug).slice(3);
  
  const handlePostSelect = (post: Blog) => {
    setFeaturedPost(post);
  };

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-20">
      <ScrollAnimation asChild>
        <header className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div className="flex-1">
            <p className="font-semibold uppercase tracking-wider text-primary">
              From the Lab
            </p>
            <h1 className="font-headline mt-2 text-4xl font-bold tracking-tight md:text-5xl">
              Popular Articles
            </h1>
          </div>
          <p className="max-w-xs text-sm text-muted-foreground">
            Nuhash Gazi has been using the collective knowledge and
            experience to protect nature.
          </p>
        </header>
      </ScrollAnimation>

      <main className="mt-12">
        <ScrollAnimation>
          <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
            <section className="lg:col-span-2">
              {featuredPost && (
                <div>
                  <Link href={`/blog/${featuredPost.slug}`}>
                    <div className="group overflow-hidden rounded-lg">
                      <div className="relative aspect-[4/3] w-full overflow-hidden rounded-lg">
                        <Image
                          src={featuredPost.imageUrl}
                          alt={featuredPost.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={featuredPost.imageHint}
                        />
                      </div>
                      <div className="py-4">
                        <div className="mb-2 flex gap-2">
                          {featuredPost.tags.map((tag) => (
                            <Badge key={tag} variant="secondary">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                        <h2 className="font-headline text-2xl font-bold group-hover:text-primary">
                          {featuredPost.title}
                        </h2>
                      </div>
                    </div>
                  </Link>
                </div>
              )}

              <div className="mt-8 flex items-center justify-end">
                  <BlogForm
                      triggerButton={
                      <div className="flex items-center gap-2">
                          <BookPlus className="h-4 w-4" />
                          Add Post
                      </div>
                      }
                  />
              </div>
            </section>

            <aside className="space-y-6 lg:col-span-1">
              {sidePosts.map((post, index) => (
                <ScrollAnimation key={post.slug} delay={index * 150}>
                  <BlogListItem post={post} onPostSelect={handlePostSelect} />
                </ScrollAnimation>
              ))}
            </aside>
          </div>
        </ScrollAnimation>

        {otherPosts.length > 0 && (
          <>
            <ScrollAnimation asChild>
              <div className="mt-16 md:mt-24">
                <p className="font-semibold uppercase tracking-wider text-primary">
                  More Insights
                </p>
                <h2 className="font-headline mt-2 text-3xl font-bold tracking-tight md:text-4xl">
                  Latest From the Lab
                </h2>
              </div>
            </ScrollAnimation>

            <div className="mt-8 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {otherPosts.map((post, index) => (
                <ScrollAnimation key={post.slug} delay={index * 150}>
                  <Link href={`/blog/${post.slug}`}>
                    <div className="group overflow-hidden rounded-lg">
                      <div className="relative aspect-square w-full overflow-hidden rounded-lg">
                        <Image
                          src={post.imageUrl}
                          alt={post.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-105"
                          data-ai-hint={post.imageHint}
                        />
                      </div>
                      <div className="py-4">
                         <h3 className="font-headline mb-2 text-lg font-bold leading-tight group-hover:text-primary">
                            {post.title}
                        </h3>
                        <time className="text-sm text-muted-foreground" dateTime={post.date}>
                          {new Date(post.date).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                    </div>
                  </Link>
                </ScrollAnimation>
              ))}
            </div>
          </>
        )}
      </main>
    </div>
  );
}
