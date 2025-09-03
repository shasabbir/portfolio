'use server';

import { z } from 'zod';
import { revalidatePath } from 'next/cache';

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
};

export async function saveBlogPost(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = blogSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      message: validatedFields.error.flatten().fieldErrors.title?.[0] || 'Invalid data.',
      success: false,
    };
  }

  const { title, slug } = validatedFields.data;
  const newSlug =
    slug ||
    title.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '');

  console.log('Saving blog post:', { ...validatedFields.data, slug: newSlug });
  // In a real app, you'd save this to a database.
  // For now, we just log it.

  revalidatePath('/blog');
  revalidatePath(`/blog/${newSlug}`);

  return {
    message: `Successfully ${slug ? 'updated' : 'created'} blog post.`,
    success: true,
  };
}

export async function deleteBlogPost(slug: string) {
  console.log('Deleting blog post:', slug);
  // In a real app, you'd delete this from a database.
  revalidatePath('/blog');
  return {
    message: 'Successfully deleted blog post.',
    success: true,
  };
}
