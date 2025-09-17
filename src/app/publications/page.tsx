
'use client';

import Image from 'next/image';
import { useState } from 'react';
import { PublicationCard } from '@/components/publication-card';
import { PublicationForm } from '@/components/publication-form';
import { mockPublications } from '@/lib/data';
import { BookPlus } from 'lucide-react';
import { ScrollAnimation } from '@/components/scroll-animation';
import { Button } from '@/components/ui/button';

const PUBLICATIONS_PER_PAGE = 3;

export default function PublicationsPage() {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(mockPublications.length / PUBLICATIONS_PER_PAGE);

  const startIndex = (currentPage - 1) * PUBLICATIONS_PER_PAGE;
  const endIndex = startIndex + PUBLICATIONS_PER_PAGE;
  const currentPublications = mockPublications.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const cardColors = [
    'bg-card-vibe-1',
    'bg-card-vibe-2',
    'bg-card-vibe-3',
  ];

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

      <div className="container mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-20">
        <header className="flex items-center justify-end">
          <PublicationForm
            triggerButton={
              <div className="flex items-center gap-2">
                <BookPlus className="h-4 w-4" />
                Add Publication
              </div>
            }
          />
        </header>

        <main className="mt-8">
          <div className="space-y-8">
            {currentPublications.map((pub, index) => (
              <PublicationCard key={pub.id} publication={pub} className={cardColors[index % cardColors.length]} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="mt-12 flex justify-center space-x-2">
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? 'default' : 'outline'}
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                )
              )}
              <Button
                variant="outline"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
          )}
        </main>
      </div>
    </>
  );
}
