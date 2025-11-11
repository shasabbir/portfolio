'use server';

import { z } from 'zod';
import fs from 'fs/promises';
import path from 'path';
import { revalidatePath } from 'next/cache';
import { isAdmin } from '@/lib/admin';
import type { Publication } from '@/types';

const dataFilePath = path.join(
  process.cwd(),
  'src',
  'lib',
  'publications-data.json'
);

// ---------- Helpers (local JSON instead of Mongo) ----------

async function readPublications(): Promise<Publication[]> {
  try {
    const fileContent = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(fileContent);
  } catch {
    return [];
  }
}

async function writePublications(publications: Publication[]): Promise<void> {
  await fs.writeFile(
    dataFilePath,
    JSON.stringify(publications, null, 2),
    'utf-8'
  );
}

// ---------- Validation schema ----------

const publicationSchema = z
  .object({
    title: z.string().min(1, 'Title is required.'),
    authors: z.string().optional(),
    journal: z.string().optional(),
    year: z.string().optional(),
    doi: z.string().optional(),
    url: z
      .string()
      .url('Invalid URL format.')
      .optional()
      .or(z.literal('')),
    citation: z.string().optional(),
    tags: z.string().optional(),
    publicationType: z.string().optional(),
  })
  .passthrough();

type PublicationFormState = {
  success: boolean;
  message?: string;
  formattedCitation?: string;
};

type SaveState = {
  success: boolean;
  message?: string;
};

// ---------- getPublications (used by /publications page) ----------

export async function getPublications(): Promise<Publication[]> {
  const publications = await readPublications();

  return publications.sort((a: any, b: any) => {
    const aDate = new Date(
      a.createdAt || `${a.year || '1970'}-01-01`
    ).getTime();
    const bDate = new Date(
      b.createdAt || `${b.year || '1970'}-01-01`
    ).getTime();
    return bDate - aDate;
  });
}

// ---------- handleFormatCitation (used by PublicationForm) ----------

export async function handleFormatCitation(
  _prevState: PublicationFormState,
  formData: FormData
): Promise<PublicationFormState> {
  const data = Object.fromEntries(formData.entries());
  const parsed = publicationSchema.safeParse(data);

  if (!parsed.success) {
    const firstError =
      Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    return {
      success: false,
      message: firstError || 'Invalid data for citation formatting.',
    };
  }

  const { title, authors, journal, year, doi, url } = parsed.data;

  const parts: string[] = [];
  if (authors) parts.push(authors);
  if (title) parts.push(`"${title}"`);
  if (journal) parts.push(journal);
  if (year) parts.push(year);
  if (doi) parts.push(`DOI: ${doi}`);
  if (!doi && url) parts.push(url);

  return {
    success: true,
    message: 'Citation generated.',
    formattedCitation: parts.join(', '),
  };
}

// ---------- savePublication (ONLY Nuhash/admin) ----------

export async function savePublication(
  _prevState: SaveState,
  formData: FormData
): Promise[SaveState] {
  if (!isAdmin()) {
    return {
      success: false,
      message: 'Unauthorized: only Nuhash can add publications.',
    };
  }

  const data = Object.fromEntries(formData.entries());
  const parsed = publicationSchema.safeParse(data);

  if (!parsed.success) {
    const firstError =
      Object.values(parsed.error.flatten().fieldErrors)[0]?.[0];
    return {
      success: false,
      message: firstError || 'Invalid data. Please check your inputs.',
    };
  }

  const cleaned: any = parsed.data;
  const existing = await readPublications();

  const tags = cleaned.tags
    ? String(cleaned.tags)
        .split(',')
        .map((t: string) => t.trim())
        .filter(Boolean)
    : [];

  const newPublication: Publication = {
    ...cleaned,
    id:
      cleaned.id ||
      (globalThis.crypto?.randomUUID
        ? globalThis.crypto.randomUUID()
        : Date.now().toString()),
    createdAt: new Date().toISOString(),
    tags,
  };

  existing.unshift(newPublication);
  await writePublications(existing);

  revalidatePath('/publications');

  return {
    success: true,
    message: 'Publication saved successfully.',
  };
}
