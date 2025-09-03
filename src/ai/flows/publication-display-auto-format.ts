'use server';

/**
 * @fileOverview Automatically formats publication metadata into APA, MLA, or Chicago styles.
 *
 * - formatCitation - A function that formats publication metadata.
 * - FormatCitationInput - The input type for the formatCitation function.
 * - FormatCitationOutput - The return type for the formatCitation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const FormatCitationInputSchema = z.object({
  title: z.string().describe('The title of the publication.'),
  authors: z.string().describe('The authors of the publication.'),
  venue: z.string().describe('The venue where the publication was published.'),
  year: z.string().describe('The year the publication was published.'),
  doi: z.string().optional().describe('The DOI of the publication.'),
  url: z.string().optional().describe('The URL of the publication.'),
  citationStyle: z
    .enum(['APA', 'MLA', 'Chicago'])
    .describe('The citation style to use (APA, MLA, or Chicago).'),
});
export type FormatCitationInput = z.infer<typeof FormatCitationInputSchema>;

const FormatCitationOutputSchema = z.object({
  formattedCitation: z.string().describe('The formatted citation.'),
});
export type FormatCitationOutput = z.infer<typeof FormatCitationOutputSchema>;

export async function formatCitation(input: FormatCitationInput): Promise<FormatCitationOutput> {
  return formatCitationFlow(input);
}

const formatCitationPrompt = ai.definePrompt({
  name: 'formatCitationPrompt',
  input: {schema: FormatCitationInputSchema},
  output: {schema: FormatCitationOutputSchema},
  prompt: `You are an expert in creating citations for publications.

  Given the following information about a publication, format the citation in the {{{citationStyle}}} style.

  Title: {{{title}}}
  Authors: {{{authors}}}
  Venue: {{{venue}}}
  Year: {{{year}}}
  DOI: {{{doi}}}
  URL: {{{url}}}

  Formatted Citation:`,
});

const formatCitationFlow = ai.defineFlow(
  {
    name: 'formatCitationFlow',
    inputSchema: FormatCitationInputSchema,
    outputSchema: FormatCitationOutputSchema,
  },
  async input => {
    const {output} = await formatCitationPrompt(input);
    return output!;
  }
);
