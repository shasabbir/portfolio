
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
    <div className="testimonial-card-wrapper transition-transform duration-500">
      <Card className="testimonial-card h-full overflow-hidden border-0 bg-card shadow-none transition-all duration-500">
        <CardContent className="grid h-full grid-cols-1 gap-4 p-0 md:grid-cols-2 md:gap-8">
          <div className="image-container relative h-64 w-full md:h-full">
            <Image
              src={testimonial.image}
              alt={testimonial.name}
              fill
              className="rounded-lg object-cover"
              data-ai-hint={testimonial.imageHint}
            />
          </div>
          <div className="quote-container relative flex flex-col justify-center p-6 md:p-0">
            <Quote className="absolute -top-4 left-0 h-12 w-12 text-muted/50 md:h-16 md:w-16" />
            <p className="z-10 text-base leading-relaxed md:text-xl">
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
      <Card className="testimonial-card-inactive absolute inset-0 flex h-full flex-col justify-between rounded-lg bg-primary p-6 text-primary-foreground shadow-lg transition-all duration-500">
        <div>
          <Image
            src={testimonial.image}
            alt={testimonial.name}
            width={80}
            height={80}
            className="rounded-lg object-cover"
            data-ai-hint={testimonial.imageHint}
          />
        </div>
        <div>
          <h3 className="font-headline text-xl font-bold">- {testimonial.name}</h3>
          <p className="text-sm opacity-80">{testimonial.title}</p>
        </div>
      </Card>
    </div>
  );
}
