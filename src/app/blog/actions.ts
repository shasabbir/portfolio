
'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import type { Blog } from '@/types';
import dbConnect from '@/lib/mongodb';
import { Blog as BlogModel } from '@/lib/models';

async function connectToDatabase() {
  await dbConnect();
}


const blogSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  excerpt: z.string().min(1, 'Excerpt is required.'),
  content: z.string().min(1, 'Content is required.'),
  imageUrl: z.string().url('Invalid URL.').min(1, 'Image URL is required.'),
  imageHint: z.string().min(1, 'Image hint is required.'),
  tags: z.string().optional(),
  slug: z.string().optional(),
});

type FormState = {
  message: string;
  success: boolean;
  slug?: string;
};

export async function getBlogs(): Promise<Blog[]> {
    await connectToDatabase();
    const blogs = await (BlogModel as any).find({}).lean();
    return blogs
      .map((blog: any) => ({ ...blog, id: blog._id.toString() }) as Blog)
      .sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
    await connectToDatabase();
    const blog = await (BlogModel as any).findOne({ slug }).lean();
    return blog ? { ...blog, id: blog._id.toString() } as Blog : undefined;
}

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
  
  await connectToDatabase();
  const { title, slug, tags: tagsString, ...postData } = validatedFields.data;
  const newSlug =
    slug ||
    title
      .toLowerCase()
      .trim()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]+/g, '');

  const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean) : [];

  try {
    let savedBlog;

    if (slug) {
      // Update existing post
      savedBlog = await (BlogModel as any).findOneAndUpdate(
        { slug },
        { 
          title, 
          ...postData, 
          slug: newSlug, 
          tags: tags.length > 0 ? tags : ['New']
        },
        { new: true }
      );
    } else {
      // Add new post
      const newPost = new (BlogModel as any)({
        ...postData,
        title,
        slug: newSlug,
        date: new Date(),
        author: {
          name: 'GAZI SALAH UDDIN NUHASH',
          avatar: 'https://i.postimg.cc/50FkXX3x/nuhash.jpg',
        },
        tags: tags.length > 0 ? tags : ['New'],
      });
      savedBlog = await newPost.save();
    }

    revalidatePath('/blog');
    revalidatePath(`/blog/${newSlug}`);

    return {
      message: `Successfully ${slug ? 'updated' : 'created'} blog post.`,
      success: true,
      slug: savedBlog.slug,
    };
  } catch (error) {
    return {
      message: 'Failed to save blog post. Please try again.',
      success: false,
    };
  }
}

export async function deleteBlogPost(slug: string) {
  await connectToDatabase();
  
  try {
    await (BlogModel as any).findOneAndDelete({ slug });
    revalidatePath('/blog');
    return {
      message: 'Successfully deleted blog post.',
      success: true,
    };
  } catch (error) {
    return {
      message: 'Failed to delete blog post. Please try again.',
      success: false,
    };
  }
}
