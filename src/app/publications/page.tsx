import { PublicationCard } from '@/components/publication-card';
import { PublicationForm } from '@/components/publication-form';
import { mockPublications } from '@/lib/data';
import { BookPlus } from 'lucide-react';

export default function PublicationsPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 md:py-20">
      <header className="flex flex-col items-center justify-between gap-4 md:flex-row">
        <div className="text-center md:text-left">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            Publications
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A collection of my research articles, papers, and preprints.
          </p>
        </div>
        <PublicationForm
          triggerButton={
            <div className="flex items-center gap-2">
              <BookPlus className="h-4 w-4" />
              Add Publication
            </div>
          }
        />
      </header>

      <main className="mt-12">
        <div className="space-y-8">
          {mockPublications.map((pub) => (
            <PublicationCard key={pub.id} publication={pub} />
          ))}
        </div>
      </main>
    </div>
  );
}
