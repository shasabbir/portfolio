
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import { mockBlogs } from '@/lib/data';
import type { Blog } from '@/types';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  excerpt: z.string().min(1, 'Excerpt is required.'),
  content: z.string().min(1, 'Content is required.'),
  imageUrl: z.string().url('Invalid URL.').min(1, 'Image URL is required.'),
  imageHint: z.string().min(1, 'Image hint is required.'),
  slug: z.string().optional(),
});

type FormState = {
  message: string;
  success: boolean;
  slug?: string;
};

export async function saveBlogPost(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = blogSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    const firstError = Object.values(validatedFields.error.flatten().fieldErrors)[0]?.[0];
    return {
      message: firstError || 'Invalid data. Please check your inputs.',
      success: false,
    };
  }

  const { title, slug, ...postData } = validatedFields.data;
  const newSlug =
    slug ||
    title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');

  if (slug) {
    // Update existing post
    const postIndex = mockBlogs.findIndex((p) => p.slug === slug);
    if (postIndex !== -1) {
      mockBlogs[postIndex] = { ...mockBlogs[postIndex], title, ...postData, slug };
    }
  } else {
    // Add new post
    const newPost: Blog = {
      ...postData,
      title,
      slug: newSlug,
      date: new Date().toISOString(),
      author: { // Using a default author for new posts
        name: 'Dr. Evelyn Reed',
        avatar: 'https://picsum.photos/100/100',
      },
      tags: ['New', 'AI'], // Default tags for new posts
    };
    mockBlogs.unshift(newPost);
  }

  revalidatePath('/blog');
  revalidatePath(`/blog/${newSlug}`);

  return {
    message: `Successfully ${slug ? 'updated' : 'created'} blog post.`,
    success: true,
    slug: newSlug,
  };
}

export async function deleteBlogPost(slug: string) {
  const postIndex = mockBlogs.findIndex((p) => p.slug === slug);
  if (postIndex !== -1) {
    mockBlogs.splice(postIndex, 1);
  }
  revalidatePath('/blog');
  return {
    message: 'Successfully deleted blog post.',
    success: true,
  };
}
