'use server';

import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { isAdmin } from '@/lib/admin';
import type { Publication } from '@/types';

const dataFilePath = path.join(process.cwd(), 'src', 'lib', 'publications-data.json');

async function readPublications(): Promise<Publication[]> {
  try {
    const raw = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function writePublications(items: Publication[]) {
  await fs.mkdir(path.dirname(dataFilePath), { recursive: true });
  await fs.writeFile(dataFilePath, JSON.stringify(items, null, 2), 'utf-8');
}

export async function getPublications(): Promise<Publication[]> {
  const pubs = await readPublications();
  // sort newest year first (fallback to date if present)
  return pubs.sort((a: any, b: any) => {
    const ay = Number(a.year) || 0;
    const by = Number(b.year) || 0;
    if (ay !== by) return by - ay;
    const ad = a.date ? new Date(a.date).getTime() : 0;
    const bd = b.date ? new Date(b.date).getTime() : 0;
    return bd - ad;
  });
}

const pubSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  authors: z.string().min(1, 'Authors are required'),
  venue: z.string().min(1, 'Venue is required'),
  year: z.string().min(1, 'Year is required'),
  doi: z.string().optional().default(''),
  publicationType: z.enum(['Journal', 'Conference', 'Preprint']),
  abstract: z.string().optional().default(''),
});

type PubFormState = { success: boolean; message: string };

export async function savePublication(
  prev: PubFormState,
  formData: FormData
): Promise<PubFormState> {
  // ✅ admin gate (await!)
  if (!(await isAdmin())) {
    return { success: false, message: 'Unauthorized' };
  }

  const parsed = pubSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!parsed.success) {
    const first = Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    return { success: false, message: first || 'Invalid data.' };
  }

  const pubs = await readPublications();
  const id = `${Date.now()}`;
  const now = new Date().toISOString();

  const newPub: Publication = {
    id,
    ...parsed.data,
    date: now,
    citation: '', // can be filled by handleFormatCitation
  };

  pubs.unshift(newPub);
  await writePublications(pubs);
  revalidatePath('/publications');

  return { success: true, message: 'Publication saved.' };
}

// Optional helper used by your form “Format” button
export async function handleFormatCitation(input: {
  title: string;
  authors: string;
  venue: string;
  year: string;
  doi?: string;
  citationStyle: 'APA' | 'MLA' | 'Chicago';
}) {
  try {
    const { title, authors, venue, year, doi, citationStyle } = input;
    const a = authors.trim().replace(/\s+/g, ' ');
    let formatted = '';

    switch (citationStyle) {
      case 'APA':
        formatted = `${a} (${year}). ${title}. ${venue}.${doi ? ` https://doi.org/${doi}` : ''}`;
        break;
      case 'MLA':
        formatted = `${a}. "${title}." ${venue}, ${year}.${doi ? ` DOI: ${doi}` : ''}`;
        break;
      case 'Chicago':
        formatted = `${a}. "${title}." ${venue} (${year}).${doi ? ` doi:${doi}` : ''}`;
        break;
    }
    return { formatted };
  } catch (e: any) {
    return { error: e?.message || 'Failed to format citation.' };
  }
}
