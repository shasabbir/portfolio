
import type { Blog } from '@/types';
import Image from 'next/image';
import { Badge } from './ui/badge';
import { cn } from '@/lib/utils';

interface BlogListItemProps {
  post: Blog;
  onPostSelect: (post: Blog) => void;
}

export function BlogListItem({ post, onPostSelect }: BlogListItemProps) {
  return (
    <div
      className="group grid cursor-pointer grid-cols-3 gap-4 rounded-lg p-2 transition-colors hover:bg-muted"
      onClick={() => onPostSelect(post)}
    >
      <div className="relative col-span-1 aspect-square overflow-hidden rounded-lg">
        <Image
          src={post.imageUrl}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          data-ai-hint={post.imageHint}
        />
      </div>
      <div className="col-span-2">
        <h3 className="font-headline text-lg font-bold leading-tight group-hover:text-primary">
          {post.title}
        </h3>
        <p className="mt-1 text-sm text-muted-foreground line-clamp-2">
          {post.excerpt}
        </p>
        <div className="mt-2 flex gap-2">
          {post.tags.slice(0, 1).map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </div>
    </div>
  );
}
