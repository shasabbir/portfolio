'use server';

import {
  extractPublicationMetadata,
  ExtractPublicationMetadataOutput,
} from '@/ai/flows/publication-citation-from-text';
import {
  formatCitation,
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
    const result = await extractPublicationMetadata({
      citationText: validatedFields.data.citation,
    });
    return { data: result };
  } catch (e) {
    return { error: 'Failed to parse citation. Please try again.' };
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
    const result = await formatCitation(data);
    return { formatted: result.formattedCitation };
  } catch (e) {
    return { error: 'Failed to format citation. Please try again.' };
  }
}
