
import Image from 'next/image';
import { PublicationCard } from '@/components/publication-card';
import { PublicationForm } from '@/components/publication-form';
import { getPublications } from './actions-mongodb';
import { BookPlus } from 'lucide-react';
import { ScrollAnimation } from '@/components/scroll-animation';
import { Button } from '@/components/ui/button';
import type { Publication } from '@/types';
import PublicationsClient from './publications-client';

export default async function PublicationsPage() {
  const publications = await getPublications();

  return (
    <>
      <section className="relative h-64 w-full overflow-hidden md:h-80">
        <Image
          src="https://ageingsocieties.unimib.it/wp-content/uploads/sites/148/2022/06/Publications.jpg"
          alt="Abstract background representing scientific research"
          fill
          className="object-cover"
          data-ai-hint="abstract research"
          unoptimized
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="container relative mx-auto flex h-full max-w-5xl flex-col justify-end px-4 pb-12 md:px-6">
          <ScrollAnimation>
            <h1 className="font-headline text-4xl font-bold tracking-tight text-foreground md:text-5xl">
              Publications
            </h1>
            <p className="mt-2 max-w-2xl text-lg text-muted-foreground">
              A collection of my research articles, papers, and preprints,
              charting a course through the frontiers of science.
            </p>
          </ScrollAnimation>
        </div>
      </section>

      <PublicationsClient publications={publications} />
    </>
  );
}
