'use server';

import {
  ExtractPublicationMetadataOutput,
} from '@/ai/flows/publication-citation-from-text';
import {
  FormatCitationInput,
} from '@/ai/flows/publication-display-auto-format';
import { z } from 'zod';
import { revalidatePath } from 'next/cache';
import type { Publication } from '@/types';
import dbConnect from '@/lib/mongodb';
import { Publication as PublicationModel } from '@/lib/models';

const publicationSchema = z.object({
  title: z.string().min(1, 'Title is required.'),
  authors: z.string().min(1, 'Authors are required.'),
  venue: z.string().min(1, 'Venue is required.'),
  year: z.string().min(1, 'Year is required.'),
  publicationType: z.enum(['Journal', 'Conference', 'Preprint'], {
    errorMap: () => ({ message: 'Please select a publication type.' }),
  }),
  doi: z.string().optional(),
  url: z.string().optional(),
  pdf: z.string().optional(),
  abstract: z.string().optional(),
  id: z.string().optional(),
});

type FormState = {
  message: string;
  success: boolean;
  id?: string;
};

const parseCitationSchema = z.object({
  citation: z.string().min(10, 'Citation text is too short.'),
});

type ParseState = {
  data?: ExtractPublicationMetadataOutput;
  error?: string;
};

// Get all publications from MongoDB
export async function getPublications(): Promise<Publication[]> {
  try {
    await dbConnect();
    const publications = await PublicationModel.find({}).sort({ year: -1 }).lean();
    
    return publications.map(pub => ({
      ...pub,
      id: pub._id.toString(),
      _id: undefined,
    })) as Publication[];
  } catch (error) {
    console.error('Error fetching publications:', error);
    return [];
  }
}

// Get publication by ID from MongoDB
export async function getPublicationById(id: string): Promise<Publication | undefined> {
  try {
    await dbConnect();
    const publication = await PublicationModel.findById(id).lean();
    
    if (!publication) return undefined;
    
    return {
      ...publication,
      id: publication._id.toString(),
      _id: undefined,
    } as Publication;
  } catch (error) {
    console.error('Error fetching publication:', error);
    return undefined;
  }
}

// Save or update publication in MongoDB
export async function savePublication(
  prevState: FormState,
  formData: FormData
): Promise<FormState> {
  const validatedFields = publicationSchema.safeParse(
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
    const { id, ...publicationData } = validatedFields.data;

    let publication;

    if (id) {
      // Update existing publication
      publication = await PublicationModel.findByIdAndUpdate(
        id,
        publicationData,
        { new: true, runValidators: true }
      );
    } else {
      // Create new publication
      publication = await PublicationModel.create(publicationData);
    }

    revalidatePath('/publications');

    return {
      message: `Successfully ${id ? 'updated' : 'created'} publication.`,
      success: true,
      id: publication._id.toString(),
    };
  } catch (error) {
    console.error('Error saving publication:', error);
    return {
      message: 'Failed to save publication. Please try again.',
      success: false,
    };
  }
}

// Delete publication from MongoDB
export async function deletePublication(id: string) {
  try {
    await dbConnect();
    await PublicationModel.findByIdAndDelete(id);
    
    revalidatePath('/publications');
    return {
      message: 'Successfully deleted publication.',
      success: true,
    };
  } catch (error) {
    console.error('Error deleting publication:', error);
    return {
      message: 'Failed to delete publication. Please try again.',
      success: false,
    };
  }
}

// AI-related functions remain the same
export async function handleParseCitation(
  prevState: ParseState,
  formData: FormData
): Promise<ParseState> {
  const validatedFields = parseCitationSchema.safeParse({
    citation: formData.get('citation'),
  });

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors.citation?.[0],
    };
  }

  try {
    const response = await fetch(
      new URL(
        '/api/extractPublicationMetadataFlow',
        process.env.NEXT_PUBLIC_API_URL
      ),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          citationText: validatedFields.data.citation,
        }),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const result = await response.json();
    return { data: result };
  } catch (e: any) {
    return { error: e.message || 'Failed to parse citation. Please try again.' };
  }
}

type FormatState = {
  formatted?: string;
  error?: string;
};

export async function handleFormatCitation(
  data: FormatCitationInput
): Promise<FormatState> {
  if (!data.title || !data.authors || !data.venue || !data.year) {
    return { error: 'Missing required fields to format citation.' };
  }

  try {
    const response = await fetch(
      new URL(
        '/api/formatCitationFlow',
        process.env.NEXT_PUBLIC_API_URL
      ),
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.message);
    }
    const result = await response.json();
    return { formatted: result.formattedCitation };
  } catch (e: any) {
    return { error: e.message || 'Failed to format citation. Please try again.' };
  }
}