
import type { Publication } from '@/types';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FileText, Link as LinkIcon, Edit } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

interface PublicationCardProps {
  publication: Publication;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <Card className="overflow-hidden">
      <div className="grid grid-cols-1 md:grid-cols-4">
        <div className="md:col-span-1">
          {publication.imageUrl && (
            <Image
              src={publication.imageUrl}
              alt={publication.title}
              width={300}
              height={400}
              className="h-full w-full object-cover"
              data-ai-hint={publication.imageHint}
            />
          )}
        </div>
        <div className="flex flex-col md:col-span-3">
          <CardHeader>
            <CardTitle className="font-headline text-xl">
              {publication.title}
            </CardTitle>
            <CardDescription>
              {publication.authors} ({publication.year})
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-grow space-y-4">
            <p className="italic text-muted-foreground">{publication.venue}</p>
            {publication.abstract && (
              <p className="text-sm leading-relaxed">
                {publication.abstract}
              </p>
            )}
            {publication.citation?.apa && (
              <blockquote className="border-l-2 pl-6 italic">
                {publication.citation.apa}
              </blockquote>
            )}
          </CardContent>
          <CardFooter className="flex flex-wrap items-center justify-between gap-2">
            <div className="flex gap-2">
              {publication.doi && (
                <Badge variant="secondary">DOI: {publication.doi}</Badge>
              )}
            </div>
            <div className="flex gap-2">
              {publication.pdf && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={publication.pdf}>
                    <FileText className="mr-2 h-4 w-4" />
                    PDF
                  </Link>
                </Button>
              )}
              {publication.url && (
                <Button variant="outline" size="sm" asChild>
                  <Link href={publication.url}>
                    <LinkIcon className="mr-2 h-4 w-4" />
                    Link
                  </Link>
                </Button>
              )}
              <Button variant="ghost" size="sm">
                <Edit className="mr-2 h-4 w-4" />
                Edit
              </Button>
            </div>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
}
