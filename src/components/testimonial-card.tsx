
import { Card, CardContent } from '@/components/ui/card';
import { Quote } from 'lucide-react';
import Image from 'next/image';

export type Testimonial = {
  name: string;
  title: string;
  quote: string;
  image: string;
  imageHint: string;
};

interface TestimonialCardProps {
  testimonial: Testimonial;
}

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
  return (
    <Card className="h-full overflow-hidden border-0 bg-card shadow-none">
      <CardContent className="grid h-full grid-cols-1 gap-8 p-0 md:grid-cols-2">
        <div className="relative h-64 w-full md:h-full">
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            fill
            className="rounded-lg object-cover"
            data-ai-hint={testimonial.imageHint}
          />
        </div>
        <div className="relative flex flex-col justify-center p-6 md:p-0">
          <Quote className="absolute -top-4 left-0 h-16 w-16 text-muted/50" />
          <p className="z-10 text-lg leading-relaxed md:text-xl">
            {testimonial.quote}
          </p>
          <div className="mt-6">
            <h3 className="font-headline text-xl font-bold">
              - {testimonial.name}
            </h3>
            <p className="text-sm text-muted-foreground">
              {testimonial.title}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
