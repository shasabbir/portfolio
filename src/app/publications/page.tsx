
import Image from 'next/image';
import { PublicationCard } from '@/components/publication-card';
import { PublicationForm } from '@/components/publication-form';
import { mockPublications } from '@/lib/data';
import { BookPlus } from 'lucide-react';
import { ScrollAnimation } from '@/components/scroll-animation';

export default function PublicationsPage() {
  return (
    <>
      <section className="relative h-64 w-full overflow-hidden md:h-80">
        <Image
          src="https://ageingsocieties.unimib.it/wp-content/uploads/sites/148/2022/06/Publications.jpg"
          alt="Abstract background representing scientific research"
          fill
          className="object-cover"
          data-ai-hint="abstract research"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
        <div className="container relative mx-auto flex h-full max-w-5xl flex-col justify-end px-4 pb-12 text-background md:px-6">
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
            {mockPublications.map((pub) => (
              <PublicationCard key={pub.id} publication={pub} />
            ))}
          </div>
        </main>
      </div>
    </>
  );
}
