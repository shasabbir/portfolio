
'use client';

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { deleteBlogPost } from '@/app/blog/actions';
import { useToast } from '@/hooks/use-toast';
import { useTransition } from 'react';
import { cn } from '@/lib/utils';
import { Badge } from './ui/badge';

interface BlogCardProps {
  post: Blog;
  imageSide?: 'left' | 'right';
}

export function BlogCard({ post, imageSide = 'left' }: BlogCardProps) {
  const { toast } = useToast();
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      const result = await deleteBlogPost(post.slug);
      if (result.success) {
        toast({
          title: 'Post Deleted',
          description: result.message,
        });
      } else {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: result.message,
        });
      }
    });
  };

  return (
    <Card className="grid overflow-hidden rounded-lg border shadow-lg transition-shadow duration-300 hover:shadow-xl md:grid-cols-2">
      <div
        className={cn(
          'relative h-64 w-full md:h-auto',
          imageSide === 'right' && 'md:order-last'
        )}
      >
        <Link href={`/blog/${post.slug}`}>
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            data-ai-hint={post.imageHint}
          />
        </Link>
      </div>
      <div className="flex flex-col justify-between p-6">
        <div>
          <div className="mb-2 flex gap-2">
            {post.tags.map((tag) => (
              <Badge key={tag} variant="secondary">
                {tag}
              </Badge>
            ))}
          </div>
          <Link href={`/blog/${post.slug}`}>
            <CardTitle className="font-headline mb-4 text-2xl hover:text-primary">
              {post.title}
            </CardTitle>
          </Link>
          <CardContent className="p-0">
            <p className="text-muted-foreground">{post.excerpt}</p>
          </CardContent>
        </div>
        <CardFooter className="mt-6 flex w-full items-center justify-between p-0 text-sm text-muted-foreground">
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
            <span className="text-xs font-medium">{post.author.name}</span>
          </div>
          <div className="flex items-center gap-1">
            <BlogForm post={post} />
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete
                    this blog post.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction
                    onClick={handleDelete}
                    disabled={isPending}
                  >
                    {isPending ? 'Deleting...' : 'Delete'}
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          </div>
        </CardFooter>
      </div>
    </Card>
  );
}
