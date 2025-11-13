'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';
import type { Blog } from '@/types';
import { isAdmin } from '@/lib/admin';

const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'blog-data.json');

async function readBlogs(): Promise<Blog[]> {
  try {
    const raw = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writeBlogs(blogs: Blog[]) {
  await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
  await fs.writeFile(dataFilePath, JSON.stringify(blogs, null, 2), 'utf-8');
}

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  excerpt: z.string().min(1, 'Excerpt is required.'),
  content: z.string().min(1, 'Content is required.'),
  // accept relative /images/... or absolute http(s)
  imageUrl: z
    .string()
    .min(1, 'Image URL is required.')
    .refine(v => v.startsWith('/images/') || /^https?:\/\//i.test(v), 'Invalid image URL.'),
  imageHint: z.string().min(1, 'Image hint is required.'),
  tags: z.string().optional(),         // comma separated
  slug: z.string().optional(),         // present on edit
});

export type FormState = {
  message: string;
  success: boolean;
  slug?: string;
};

export async function getBlogs(): Promise<Blog[]> {
  const blogs = await readBlogs();
  return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  const blogs = await readBlogs();
  return blogs.find(p => p.slug === slug);
}

export async function saveBlogPost(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  // ✅ admin gate (await!)
  if (!(await isAdmin())) {
    return { message: 'Unauthorized', success: false };
  }

  const parsed = blogSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    return { message: first || 'Invalid data.', success: false };
  }

  const blogs = await readBlogs();
  const { title, slug, tags: tagsString, ...rest } = parsed.data;

  const newSlug =
    slug ||
    title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');

  const tags = (tagsString || '')
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);

  if (slug) {
    // update
    const idx = blogs.findIndex(p => p.slug === slug);
    if (idx !== -1) {
      blogs[idx] = { ...blogs[idx], title, ...rest, slug, tags };
    }
  } else {
    // create
    const newPost: Blog = {
      title,
      slug: newSlug,
      excerpt: rest.excerpt || '',
      content: rest.content || '',
      imageUrl: rest.imageUrl || '',
      imageHint: rest.imageHint || '',
      date: new Date().toISOString(),
      author: {
        name: 'GAZI SALAH UDDIN NUHASH',
        avatar: 'https://i.postimg.cc/50FkXX3x/nuhash.jpg',
      },
      tags: tags.length ? tags : ['New'],
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

export async function deleteBlogPost(slug: string) {
  // admin gate
  if (!(await isAdmin())) {
    return { success: false, message: 'Unauthorized' };
  }

  const blogs = await readBlogs();
  const idx = blogs.findIndex(p => p.slug === slug);
  if (idx !== -1) {
    blogs.splice(idx, 1);
    await writeBlogs(blogs);
  }

  revalidatePath('/blog');
  return { success: true, message: 'Successfully deleted blog post.' };
}
