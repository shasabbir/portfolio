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

interface PublicationCardProps {
  publication: Publication;
}

export function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-xl">{publication.title}</CardTitle>
        <CardDescription>
          {publication.authors} ({publication.year})
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="italic text-muted-foreground">{publication.venue}</p>
        {publication.abstract && (
          <p className="mt-4 text-sm leading-relaxed">
            {publication.abstract}
          </p>
        )}
        {publication.citation?.apa && (
          <blockquote className="mt-4 border-l-2 pl-6 italic">
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
    </Card>
  );
}
