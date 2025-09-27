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
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'publication-data.json');

async function readPublications(): Promise<Publication[]> {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch (error) {
    // If the file doesn't exist, return an empty array
    return [];
  }
}

async function writePublications(publications: Publication[]): Promise<void> {
  await fs.writeFile(dataFilePath, JSON.stringify(publications, null, 2), 'utf-8');
}

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

export async function getPublications(): Promise<Publication[]> {
  const publications = await readPublications();
  return publications.sort((a, b) => parseInt(b.year) - parseInt(a.year));
}

export async function getPublicationById(id: string): Promise<Publication | undefined> {
  const publications = await readPublications();
  return publications.find((p) => p.id === id);
}

type ParseState = {
  data?: ExtractPublicationMetadataOutput;
  error?: string;
};

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
  
  const publications = await readPublications();
  const { id, ...publicationData } = validatedFields.data;

  if (id) {
    // Update existing publication
    const publicationIndex = publications.findIndex((p) => p.id === id);
    if (publicationIndex !== -1) {
      publications[publicationIndex] = { ...publications[publicationIndex], ...publicationData, id };
    }
  } else {
    // Add new publication
    const newId = (Math.max(...publications.map(p => parseInt(p.id)), 0) + 1).toString();
    const newPublication: Publication = {
      ...publicationData,
      id: newId,
    };
    publications.unshift(newPublication);
  }

  await writePublications(publications);

  revalidatePath('/publications');

  return {
    message: `Successfully ${id ? 'updated' : 'created'} publication.`,
    success: true,
    id: id || (publications[0]?.id),
  };
}

export async function deletePublication(id: string) {
  let publications = await readPublications();
  const publicationIndex = publications.findIndex((p) => p.id === id);
  if (publicationIndex !== -1) {
    publications.splice(publicationIndex, 1);
    await writePublications(publications);
  }
  revalidatePath('/publications');
  return {
    message: 'Successfully deleted publication.',
    success: true,
  };
}
