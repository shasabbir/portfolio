'use server';
/**
 * @fileOverview Extracts publication metadata from a citation text using an AI model.
 *
 * - extractPublicationMetadata - A function that extracts publication metadata from a citation text.
 * - ExtractPublicationMetadataInput - The input type for the extractPublicationMetadata function.
 * - ExtractPublicationMetadataOutput - The return type for the extractPublicationMetadata function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractPublicationMetadataInputSchema = z.object({
  citationText: z
    .string()
    .describe('The citation text to extract metadata from.'),
});
export type ExtractPublicationMetadataInput = z.infer<
  typeof ExtractPublicationMetadataInputSchema
>;

const ExtractPublicationMetadataOutputSchema = z.object({
  title: z.string().describe('The title of the publication.'),
  authors: z.string().describe('The authors of the publication.'),
  venue: z.string().describe('The venue where the publication was published.'),
  year: z.string().describe('The year the publication was published.'),
  doi: z.string().optional().describe('The DOI of the publication.'),
  url: z.string().optional().describe('The URL of the publication.'),
  abstract: z.string().optional().describe('The abstract of the publication.'),
  publicationType: z
    .string()
    .optional()
    .describe('The type of publication (e.g., journal, conference, preprint).'),
});
export type ExtractPublicationMetadataOutput = z.infer<
  typeof ExtractPublicationMetadataOutputSchema
>;

export async function extractPublicationMetadata(
  input: ExtractPublicationMetadataInput
): Promise<ExtractPublicationMetadataOutput> {
  return extractPublicationMetadataFlow(input);
}

const prompt = ai.definePrompt({
  name: 'extractPublicationMetadataPrompt',
  input: {schema: ExtractPublicationMetadataInputSchema},
  output: {schema: ExtractPublicationMetadataOutputSchema},
  prompt: `You are an expert at extracting publication metadata from citation texts.

  Given the following citation text, extract the title, authors, venue, year, DOI, URL, abstract, and publication type.
  If any field is not available in the citation text, leave it blank.

  Citation Text: {{{citationText}}}
  Output format: JSON of ExtractPublicationMetadataOutputSchema schema. Make sure the year field is a string.
  {
    "title": "",
    "authors": "",
    "venue": "",
    "year": "",
    "doi": "",
    "url": "",
    "abstract": "",
    "publicationType": ""
  }`,
});

const extractPublicationMetadataFlow = ai.defineFlow(
  {
    name: 'extractPublicationMetadataFlow',
    inputSchema: ExtractPublicationMetadataInputSchema,
    outputSchema: ExtractPublicationMetadataOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
