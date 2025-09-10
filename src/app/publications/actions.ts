'use server';

import {
  ExtractPublicationMetadataOutput,
} from '@/ai/flows/publication-citation-from-text';
import {
  FormatCitationInput,
} from '@/ai/flows/publication-display-auto-format';
import { z } from 'zod';

const parseCitationSchema = z.object({
  citation: z.string().min(10, 'Citation text is too short.'),
});

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
