
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Quote } from 'lucide-react';

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
    <Card className="h-full transform-gpu transition-transform duration-300 hover:-translate-y-2 hover:shadow-xl">
      <CardHeader className="flex-row items-center gap-4">
        <Avatar className="h-14 w-14 border">
          <AvatarImage
            src={testimonial.image}
            alt={testimonial.name}
            data-ai-hint={testimonial.imageHint}
          />
          <AvatarFallback>
            {testimonial.name
              .split(' ')
              .map((n) => n[0])
              .join('')}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="font-semibold">{testimonial.name}</h3>
          <p className="text-sm text-muted-foreground">{testimonial.title}</p>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative">
          <Quote className="absolute -top-2 left-0 h-8 w-8 text-muted-foreground/20" />
          <p className="pl-2 text-base italic text-muted-foreground">
            {testimonial.quote}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
