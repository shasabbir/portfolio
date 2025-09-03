import type { Blog } from '@/types';
import Link from 'next/link';
import Image from 'next/image';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BlogForm } from './blog-form';
import { Button } from './ui/button';
import { Trash2 } from 'lucide-react';

interface BlogCardProps {
  post: Blog;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      <Link href={`/blog/${post.slug}`} className="flex h-full flex-col">
        <Image
          src={post.imageUrl}
          alt={post.title}
          width={600}
          height={400}
          className="aspect-video w-full object-cover"
          data-ai-hint={post.imageHint}
        />
        <CardHeader>
          <CardTitle className="font-headline text-xl leading-snug">
            {post.title}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex-grow">
          <p className="text-sm text-muted-foreground">{post.excerpt}</p>
        </CardContent>
      </Link>
      <CardFooter>
        <div className="flex w-full items-center justify-between text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarImage src={post.author.avatar} alt={post.author.name} />
              <AvatarFallback>
                {post.author.name
                  .split(' ')
                  .map((n) => n[0])
                  .join('')}
              </AvatarFallback>
            </Avatar>
            <span className="text-xs">{post.author.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <BlogForm post={post} />
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <Trash2 className="h-4 w-4 text-destructive" />
            </Button>
          </div>
        </div>
      </CardFooter>
    </Card>
  );
}
