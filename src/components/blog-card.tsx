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

interface BlogCardProps {
  post: Blog;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <Card className="flex h-full flex-col overflow-hidden transition-all hover:shadow-lg">
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
            <time dateTime={post.date} className="text-xs">
              {new Date(post.date).toLocaleDateString('en-US', {
                month: 'short',
                day: 'numeric',
                year: 'numeric',
              })}
            </time>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
