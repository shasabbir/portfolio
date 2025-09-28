'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import type { Blog } from '@/types';
import dbConnect from '@/lib/mongodb';
import { Blog as BlogModel } from '@/lib/models';

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

// Get all blogs from MongoDB
export async function getBlogs(): Promise<Blog[]> {
  try {
    await dbConnect();
    const blogs = await BlogModel.find({}).sort({ date: -1 }).lean();
    
    return blogs.map(blog => ({
      ...blog,
      id: blog._id?.toString(),
      _id: undefined,
      date: blog.date ? blog.date.toISOString() : new Date().toISOString(),
    })) as Blog[];
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return [];
  }
}

// Get blog by slug from MongoDB
export async function getBlogBySlug(slug: string): Promise<Blog | undefined> {
  try {
    await dbConnect();
    const blog = await BlogModel.findOne({ slug }).lean();
    
    if (!blog) return undefined;
    
    return {
      ...blog,
      id: blog._id?.toString(),
      _id: undefined,
      date: blog.date ? blog.date.toISOString() : new Date().toISOString(),
    } as Blog;
  } catch (error) {
    console.error('Error fetching blog:', error);
    return undefined;
  }
}

// Save or update blog in MongoDB
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
  
  try {
    await dbConnect();
    const { title, slug, tags: tagsString, ...postData } = validatedFields.data;
    const newSlug =
      slug ||
      title
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w-]+/g, '');

    const tags = tagsString ? tagsString.split(',').map(tag => tag.trim()).filter(Boolean) : [];

    let blog;

    if (slug) {
      // Update existing post
      blog = await BlogModel.findOneAndUpdate(
        { slug },
        {
          title,
          ...postData,
          slug: newSlug,
          tags: tags.length > 0 ? tags : ['New'],
        },
        { new: true, runValidators: true }
      );
    } else {
      // Check if slug already exists
      const existingBlog = await BlogModel.findOne({ slug: newSlug });
      if (existingBlog) {
        return {
          message: 'A blog post with this title already exists.',
          success: false,
        };
      }

      // Create new post
      blog = await BlogModel.create({
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
    }

    revalidatePath('/blog');
    revalidatePath(`/blog/${newSlug}`);

    return {
      message: `Successfully ${slug ? 'updated' : 'created'} blog post.`,
      success: true,
      slug: newSlug,
    };
  } catch (error) {
    console.error('Error saving blog post:', error);
    return {
      message: 'Failed to save blog post. Please try again.',
      success: false,
    };
  }
}

// Delete blog from MongoDB
export async function deleteBlogPost(slug: string) {
  try {
    await dbConnect();
    await BlogModel.findOneAndDelete({ slug });
    
    revalidatePath('/blog');
    return {
      message: 'Successfully deleted blog post.',
      success: true,
    };
  } catch (error) {
    console.error('Error deleting blog post:', error);
    return {
      message: 'Failed to delete blog post. Please try again.',
      success: false,
    };
  }
}