'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import type { Blog } from '@/types';
import fs from 'fs/promises';
import path from 'path';
import { isAdmin } from '@/lib/admin';

const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'blog-data.json');

async function readBlogs(): Promise<Blog[]> {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

async function writeBlogs(blogs: Blog[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(blogs, null, 2), 'utf-8');
}

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  excerpt: z.string().min(1, 'Excerpt is required.'),
  content: z.string().min(1, 'Content is required.'),
 imageUrl: z.string().min(1, 'Image URL is required.'),

  imageHint: z.string().min(1, 'Image hint is required.'),
  tags: z.string().optional(),
  slug: z.string().optional(),
});

export type FormState = {
  message: string;
  success: boolean;
  slug?: string;
};

export async function getBlogs(): Promise<Blog[]> {
  const blogs = await readBlogs();
  return blogs.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
  );
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  const blogs = await readBlogs();
  return blogs.find((p) => p.slug === slug);
}

// ✅ server action used by BlogForm
export async function saveBlogPost(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // Hard protection: only Nuhash/admin can create or edit
  if (!isAdmin()) {
    return {
      message: 'Unauthorized: only Nuhash can manage blog posts.',
      success: false,
    };
  }

  const validatedFields = blogSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    const firstError =
      Object.values(
        validatedFields.error.flatten().fieldErrors
      )[0]?.[0];
    return {
      message: firstError || 'Invalid data. Please check your inputs.',
      success: false,
    };
  }

  const blogs = await readBlogs();
  const { title, slug, tags: tagsString, ...postData } =
    validatedFields.data;

  const newSlug =
    slug ||
    title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');

  const tags = tagsString
    ? tagsString
        .split(',')
        .map((tag) => tag.trim())
        .filter(Boolean)
    : [];

  if (slug) {
    // Update existing post
    const index = blogs.findIndex((p) => p.slug === slug);
    if (index !== -1) {
      blogs[index] = {
        ...blogs[index],
        title,
        ...postData,
        slug,
        tags,
      };
    }
  } else {
    // Create new post
    const newPost: Blog = {
      ...postData,
      title,
      slug: newSlug,
      date: new Date().toISOString(),
      author: {
        name: 'GAZI SALAH UDDIN NUHASH',
        avatar: 'https://i.postimg.cc/50FkXX3x/nuhash.jpg',
      },
      tags: tags.length > 0 ? tags : ['New'],
    };
    blogs.unshift(newPost);
  }

  await writeBlogs(blogs);

  revalidatePath('/blog');
  revalidatePath(`/blog/${newSlug}`);

  return {
    message: `Successfully ${slug ? 'updated' : 'created'} blog post.`,
    success: true,
    slug: newSlug,
  };
}

// ✅ delete also admin-only
export async function deleteBlogPost(slug: string) {
  if (!isAdmin()) {
    return {
      message: 'Unauthorized: only Nuhash can delete blog posts.',
      success: false,
    };
  }

  const blogs = await readBlogs();
  const index = blogs.findIndex((p) => p.slug === slug);

  if (index !== -1) {
    blogs.splice(index, 1);
    await writeBlogs(blogs);
  }

  revalidatePath('/blog');

  return {
    message: 'Successfully deleted blog post.',
    success: true,
  };
}
