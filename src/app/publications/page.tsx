export const dynamic = 'force-dynamic';
export const revalidate = 0;

import Image from 'next/image';
import { getPublications } from './actions-mongodb';
import PublicationsClient from './publications-client';
import { ScrollAnimation } from '@/components/scroll-animation';
import { isAdmin } from '@/lib/admin';
import LogoutButton from '@/components/logout-button';

export default async function PublicationsPage() {
  const publications = await getPublications();
  const isOwner = isAdmin(); // reads admin cookie on the server

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


{isOwner && (
        <div className="container mx-auto max-w-5xl px-4 mt-4 flex justify-end">
          <LogoutButton redirectTo="/publications"/>
        </div>
      )}
      <PublicationsClient publications={publications} isAdmin={isOwner} />
    </>
  );
}
