'use client';

import { useState } from 'react';
import { PublicationCard } from '@/components/publication-card';
import { PublicationForm } from '@/components/publication-form';
import { BookPlus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import type { Publication } from '@/types';

const PUBLICATIONS_PER_PAGE = 3;

interface PublicationsClientProps {
  publications: Publication[];
  isAdmin: boolean; // 👈 coming from server
}

export default function PublicationsClient({
  publications,
  isAdmin,
}: PublicationsClientProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setFilter] = useState('All');

  const publicationTypes = [
    'All',
    ...Array.from(new Set(publications.map((p) => p.publicationType))),
  ];

  const filteredPublications = publications.filter(
    (pub) => filter === 'All' || pub.publicationType === filter
  );

  const totalPages = Math.ceil(
    filteredPublications.length / PUBLICATIONS_PER_PAGE
  );
  const startIndex = (currentPage - 1) * PUBLICATIONS_PER_PAGE;
  const endIndex = startIndex + PUBLICATIONS_PER_PAGE;
  const currentPublications = filteredPublications.slice(
    startIndex,
    endIndex
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleFilterChange = (type: string) => {
    setFilter(type);
    setCurrentPage(1);
  };

  const cardColors = ['bg-card-vibe-1', 'bg-card-vibe-2', 'bg-card-vibe-3'];

  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-20">
      <header className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="flex flex-wrap items-center gap-2">
          {publicationTypes.map((type) => (
            <Button
              key={type}
              variant={filter === type ? 'default' : 'outline'}
              onClick={() => handleFilterChange(type)}
            >
              {type}
            </Button>
          ))}
        </div>

        {/* Only Nuhash/admin sees Add Publication */}
        {isAdmin && (
          <PublicationForm
            triggerButton={
              <div className="flex items-center gap-2">
                <BookPlus className="h-4 w-4" />
                Add Publication
              </div>
            }
          />
        )}
      </header>

      <main className="mt-8">
        <div className="space-y-8">
          {currentPublications.length > 0 ? (
            currentPublications.map((pub, index) => (
              <PublicationCard
                key={pub.id}
                publication={pub}
                className={cardColors[index % cardColors.length]}
              />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/50 py-12 text-center">
              <p className="font-semibold text-muted-foreground">
                No publications found for this filter.
              </p>
              <p className="text-sm text-muted-foreground">
                Try selecting a different category.
              </p>
            </div>
          )}
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
                  variant={
                    currentPage === page ? 'default' : 'outline'
                  }
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
  );
}
