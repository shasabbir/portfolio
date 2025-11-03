
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
            <div className="absolute inset-0 z-0 -translate-x-4 -translate-y-4 transform-gpu scale-50">
              <svg
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
                className="h-auto w-full origin-center animate-blob-1 text-primary"
              >
                <path
                  fill="currentColor"
                  d="M441.9,134.3C471.2,192.3,441.4,269.8,392.5,324.5C343.6,379.2,275.6,411.1,208.5,416.8C141.4,422.5,75.2,402,36,353.9C-3.2,305.8,-15.5,230.1,23.1,173.1C61.7,116.1,157.6,77.8,229.3,55.3C301,32.8,348.5,26.1,388,60.9C427.5,95.7,412.6,76.3,441.9,134.3Z"
                  transformOrigin="center center"
                />
              </svg>
            </div>
            <div className="absolute inset-0 z-0 transform-gpu scale-50">
              <svg
                viewBox="0 0 500 500"
                xmlns="http://www.w3.org/2000/svg"
                className="h-auto w-full origin-center animate-blob-2 text-primary"
              >
                <path
                  fill="currentColor"
                  d="M451.3,277.6c-2.3,63.9-52,118.4-106,146.4c-54.1,28-112.5,29.4-162.3,4.2c-49.8-25.2-91-77.1-105.7-133.3C62.6,241.6,79,176.1,120,132.8c41-43.3,106.7-64.8,162.8-55.9C338.9,85.8,385.9,135,420.2,185.3C454.5,235.5,453.6,213.7,451.3,277.6z"
                  transformOrigin="center center"
                />
              </svg>
            </div>
            <div className="absolute -inset-8 z-10 bg-gradient-to-t from-primary/80 to-accent/80 blur-3xl" />
            <Avatar className="z-10 h-64 w-64 border-4 border-background md:h-80 md:w-80">
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
   <section className="py-16 bg-white">
  <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      
      {/* Card 1: 24/7 Support */}
      <ScrollAnimation>
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 flex items-center justify-center rounded-full bg-rose-400 mb-4">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M18 13V7a6 6 0 10-12 0v6M5 13h14l-1.5 9h-11L5 13z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-800">24/7 Support</h3>
          <p className="text-slate-500 text-sm mt-2 max-w-xs">
            Lorem ipsum dolor sit amet conse adipiscing elit.
          </p>
        </div>
      </ScrollAnimation>

      {/* Card 2: Take Ownership */}
      <ScrollAnimation delay={100}>
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 flex items-center justify-center rounded-full bg-green-500 mb-4">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3M12 20a8 8 0 100-16 8 8 0 000 16z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-800">Take Ownership</h3>
          <p className="text-slate-500 text-sm mt-2 max-w-xs">
            Lorem ipsum dolor sit amet conse adipiscing elit.
          </p>
        </div>
      </ScrollAnimation>

      {/* Card 3: Team Work */}
      <ScrollAnimation delay={200}>
        <div className="flex flex-col items-center">
          <div className="h-20 w-20 flex items-center justify-center rounded-full bg-orange-400 mb-4">
            <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a4 4 0 00-5-3.87M9 20H4v-2a4 4 0 015-3.87M12 4a4 4 0 110 8 4 4 0 010-8zm6 8a4 4 0 100-8 4 4 0 000 8zM6 12a4 4 0 100-8 4 4 0 000 8z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-slate-800">Team Work</h3>
          <p className="text-slate-500 text-sm mt-2 max-w-xs">
            Lorem ipsum dolor sit amet conse adipiscing elit.
          </p>
        </div>
      </ScrollAnimation>

    </div>
  </div>
</section>



      <section id="about-snippet" className="overflow-hidden bg-muted">
        <div className="grid md:grid-cols-2">
          <div className="flex items-center justify-center p-8 md:p-16">
            <ScrollAnimation className="max-w-md text-center md:text-left">
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
          </div>
          <div className="relative min-h-[300px] w-full md:min-h-0">
            <ScrollAnimation className="h-full w-full" delay={200}>
              <video
                src="https://cdn.pixabay.com/video/2024/04/20/208773_large.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-primary/20"></div>
            </ScrollAnimation>
          </div>
        </div>
      </section>

      {/* <section
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
      </section> */}

      <section id="expertise" className="w-full  py-16 md:py-24">
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
            Stay Connected &amp; Verify
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

    

    

    

    

    

    
