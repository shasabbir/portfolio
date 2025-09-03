
'use client';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useState } from 'react';
import { Loader2, Edit } from 'lucide-react';
import type { Blog } from '@/types';

interface BlogFormProps {
  post?: Blog;
  triggerButton?: React.ReactNode;
}

export function BlogForm({ post, triggerButton }: BlogFormProps) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsSubmitting(true);
    // Here you would typically call a server action to save the data
    await new Promise(resolve => setTimeout(resolve, 1000));
    console.log('Form submitted');
    setIsSubmitting(false);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {triggerButton ? (
          <Button>{triggerButton}</Button>
        ) : (
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <Edit className="h-4 w-4" />
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle className="font-headline">
            {post ? 'Edit Post' : 'Add New Post'}
          </DialogTitle>
          <DialogDescription>
            {post
              ? 'Make changes to your blog post.'
              : 'Create a new blog post to share your thoughts.'}
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1">
            <Label htmlFor="title">Title</Label>
            <Input id="title" name="title" defaultValue={post?.title} />
          </div>
          <div className="space-y-1">
            <Label htmlFor="excerpt">Excerpt</Label>
            <Textarea
              id="excerpt"
              name="excerpt"
              rows={3}
              defaultValue={post?.excerpt}
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="content">Content (HTML)</Label>
            <Textarea
              id="content"
              name="content"
              rows={10}
              defaultValue={post?.content}
            />
          </div>
           <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="imageUrl">Image URL</Label>
                <Input id="imageUrl" name="imageUrl" defaultValue={post?.imageUrl} />
              </div>
              <div className="space-y-1">
                <Label htmlFor="imageHint">Image Hint</Label>
                <Input id="imageHint" name="imageHint" defaultValue={post?.imageHint} />
              </div>
            </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setOpen(false)} type="button">
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {post ? 'Save Changes' : 'Create Post'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
