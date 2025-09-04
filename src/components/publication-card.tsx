
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
import { FileText, Link as LinkIcon, Edit, BookOpen, FileCode2 } from 'lucide-react';
import Link from 'next/link';

interface PublicationCardProps {
  publication: Publication;
}

const publicationTypeIcons = {
  Journal: <BookOpen className="h-6 w-6 text-primary" />,
  Conference: <FileText className="h-6 w-6 text-primary" />,
  Preprint: <FileCode2 className="h-6 w-6 text-primary" />,
};

export function PublicationCard({ publication }: PublicationCardProps) {
  return (
    <Card className="flex flex-col">
      <div className="flex">
        <div className="flex-grow">
          <CardHeader>
             <div className="flex items-start gap-4">
                {publicationTypeIcons[publication.publicationType]}
                <div className="flex-1">
                    <CardTitle className="font-headline text-xl">
                    {publication.title}
                    </CardTitle>
                    <CardDescription>
                    {publication.authors} ({publication.year})
                    </CardDescription>
                </div>
            </div>
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
        </div>
      </div>
       <CardFooter className="mt-auto flex flex-wrap items-center justify-between gap-2 border-t pt-4">
            <div className="flex gap-2">
              <Badge variant="outline">{publication.publicationType}</Badge>
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
            </div>
          </CardFooter>
    </Card>
  );
}
