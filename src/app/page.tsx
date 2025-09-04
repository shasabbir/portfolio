
'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Linkedin,
  Mail,
  ArrowRight,
  BrainCircuit,
  Atom,
  Sigma,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { GoogleScholarIcon, OrcidIcon } from '@/components/icons';
import { ScrollAnimation } from '@/components/scroll-animation';
import { TestimonialCard, Testimonial } from '@/components/testimonial-card';
import { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { Dna, FlaskConical, TestTube } from 'lucide-react';

const testimonials: Testimonial[] = [
  {
    name: 'Dr. Alistair Finch',
    title: 'Collaborator, Cambridge University',
    quote:
      "Nuhash's insights into quantum information were instrumental to our joint research. Their ability to bridge theoretical concepts with practical applications is unparalleled. A truly brilliant mind and a wonderful collaborator.",
    image: 'https://picsum.photos/400/600',
    imageHint: 'male scientist',
  },
  {
    name: 'Dr. Lena Petrova',
    title: 'Former Postdoc, QAIS Lab',
    quote:
      "Working under Nuhash Gazi was the most formative experience of my career. They foster an environment of intense intellectual curiosity while being an incredibly supportive and patient mentor. I wouldn't be where I am today without their guidance.",
    image: 'https://picsum.photos/401/601',
    imageHint: 'female researcher',
  },
  {
    name: 'Prof. Kenji Tanaka',
    title: 'Conference Chair, QIP 2023',
    quote:
      "Nuhash Gazi's keynote was the highlight of our conference. They have a rare gift for making the most complex topics in physics accessible and exciting to a broad audience. We've received nothing but glowing feedback.",
    image: 'https://picsum.photos/402/602',
    imageHint: 'professor portrait',
  },
  {
    name: 'Dr. Sam Carter',
    title: 'Peer Reviewer, Nature Physics',
    quote:
      "Reviewing Nuhash's papers is always a pleasure. Their work is rigorous, their thinking is clear, and they consistently push the boundaries of their field. Their contributions are of the highest caliber.",
    image: 'https://picsum.photos/403/603',
    imageHint: 'scientist face',
  },
];

const expertiseAreas = [
  {
    icon: <TestTube className="h-10 w-10 text-primary" />,
    title: "Alzheimer's Disease",
    description:
      'Strong background in researching and understanding Alzheimer\'s Disease.',
  },
  {
    icon: <FlaskConical className="h-10 w-10 text-primary" />,
    title: 'Drug Design & Discovery',
    description: 'Experienced in the design and discovery of novel therapeutic drugs.',
  },
  {
    icon: <Dna className="h-10 w-10 text-primary" />,
    title: 'NGS & Data Analysis',
    description:
      'Adept at next-generation sequencing (NGS) and analyzing complex biological data.',
  },
];

export default function Home() {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());

    const handleSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    api.on('select', handleSelect);

    return () => {
      api.off('select', handleSelect);
    };
  }, [api]);

  return (
    <div className="flex flex-col">
      <section
        id="hero"
        className="relative w-full overflow-hidden bg-background py-20 md:py-32"
      >
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 px-4 text-center md:grid-cols-2 md:px-6 md:text-left">
          <ScrollAnimation>
            <div className="z-10">
              <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
                GAZI SALAH UDDIN NUHASH
              </h1>
              <p className="mt-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-semibold text-transparent">
                Life Sciences Researcher
              </p>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground">
                Driven, ambitious and self-motivated researcher with a strong background in Alzheimer&apos;s Disease, drug design and discovery, and next-generation sequencing.
              </p>
              <div className="mt-8 flex justify-center gap-4 md:justify-start">
                <Button asChild size="lg">
                  <Link href="/publications">View Publications</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </ScrollAnimation>
          <ScrollAnimation delay={200} className="relative flex justify-center">
            <div className="absolute -inset-12 rounded-full bg-gradient-to-br from-primary/10 via-secondary/10 to-background blur-2xl"></div>
            <Avatar className="z-10 h-64 w-64 border-4 border-background shadow-lg md:h-80 md:w-80">
              <Image
                src="https://i.postimg.cc/50FkXX3x/nuhash.jpg"
                alt="GAZI SALAH UDDIN NUHASH"
                width={400}
                height={400}
                className="object-cover"
                data-ai-hint="scientist portrait"
                unoptimized
              />
              <AvatarFallback>NG</AvatarFallback>
            </Avatar>
          </ScrollAnimation>
        </div>
      </section>

      <section id="about-snippet" className="bg-muted py-16 md:py-24">
        <ScrollAnimation className="container mx-auto max-w-4xl px-4 text-center md:px-6">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            A Passion for Discovery
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Academically distinguished life sciences graduate with exceptional leadership abilities, adept at public speaking, teamwork, and effective communication. Looking to pursue further opportunities and make a difference within my field and harness my potential.
          </p>
          <Button asChild size="lg" className="mt-8" variant="outline">
            <Link href="/about">
              Learn More About Me <ArrowRight />
            </Link>
          </Button>
        </ScrollAnimation>
      </section>

      <section
        id="testimonials"
        className="w-full overflow-hidden bg-background py-16 md:py-24"
      >
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation className="text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              What Colleagues Say
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-muted-foreground">
              Feedback from collaborators, mentees, and peers from across the
              scientific community.
            </p>
          </ScrollAnimation>
          <ScrollAnimation className="mt-12" delay={200}>
            <Carousel setApi={setApi}
              opts={{
                align: 'center',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent className="-ml-4 md:-ml-8">
                {testimonials.map((testimonial, index) => (
                  <CarouselItem
                    key={index}
                    className={cn('pl-4 md:pl-8 basis-full md:basis-4/5', {
                      'is-active': index === current,
                      'is-prev': index === current - 1 || (current === 0 && index === testimonials.length -1),
                      'is-next': index === current + 1 || (current === testimonials.length - 1 && index === 0),
                    })}
                  >
                    <TestimonialCard testimonial={testimonial} />
                  </CarouselItem>
                ))}
              </CarouselContent>
              <div className="mt-8 flex justify-center gap-4 md:justify-end">
                <CarouselPrevious className="static -translate-y-0" />
                <CarouselNext className="static -translate-y-0" />
              </div>
            </Carousel>
          </ScrollAnimation>
        </div>
      </section>

      <section id="expertise" className="w-full bg-muted py-16 md:py-24">
        <div className="container mx-auto px-4 md:px-6">
          <ScrollAnimation className="text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Areas of Expertise
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-muted-foreground">
              Specializing in fields that advance our understanding of complex diseases and therapeutic interventions.
            </p>
          </ScrollAnimation>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {expertiseAreas.map((area, index) => (
              <ScrollAnimation
                key={area.title}
                delay={index * 150}
                className="flex flex-col items-center text-center"
              >
                {area.icon}
                <h3 className="mt-4 font-headline text-2xl font-bold">
                  {area.title}
                </h3>
                <p className="mt-2 text-muted-foreground">{area.description}</p>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section id="trust-panel" className="bg-background py-16">
        <ScrollAnimation className="container mx-auto px-4 md:px-6">
          <h2 className="text-center font-headline text-2xl font-bold">
            Stay Connected & Verify
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-6 md:gap-8">
            <Link
              href="https://orcid.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <OrcidIcon className="h-6 w-6" />
              <span className="font-medium">ORCID</span>
            </Link>
            <Link
              href="https://scholar.google.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <GoogleScholarIcon className="h-6 w-6" />
              <span className="font-medium">Google Scholar</span>
            </Link>
            <Link
              href="https://www.linkedin.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <Linkedin className="h-6 w-6" />
              <span className="font-medium">LinkedIn</span>
            </Link>
            <Link
              href="/contact"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <Mail className="h-6 w-6" />
              <span className="font-medium">Email</span>
            </Link>
          </div>
        </ScrollAnimation>
      </section>
    </div>
  );
}
