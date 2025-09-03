
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel';
import {
  Github,
  Linkedin,
  Mail,
  ArrowRight,
  BrainCircuit,
  Atom,
  Sigma,
  Quote,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { GoogleScholarIcon, OrcidIcon } from '@/components/icons';
import { ScrollAnimation } from '@/components/scroll-animation';
import { TestimonialCard, Testimonial } from '@/components/testimonial-card';

const testimonials: Testimonial[] = [
  {
    name: 'Dr. Alistair Finch',
    title: 'Collaborator, Cambridge University',
    quote:
      "Evelyn's insights into quantum information were instrumental to our joint research. Her ability to bridge theoretical concepts with practical applications is unparalleled. A truly brilliant mind and a wonderful collaborator.",
    image: 'https://picsum.photos/100/100',
    imageHint: 'male scientist',
  },
  {
    name: 'Dr. Lena Petrova',
    title: 'Former Postdoc, QAIS Lab',
    quote:
      'Working under Dr. Reed was the most formative experience of my career. She fosters an environment of intense intellectual curiosity while being an incredibly supportive and patient mentor. I wouldn\'t be where I am today without her guidance.',
    image: 'https://picsum.photos/101/101',
    imageHint: 'female researcher',
  },
  {
    name: 'Prof. Kenji Tanaka',
    title: 'Conference Chair, QIP 2023',
    quote:
      "Dr. Reed's keynote was the highlight of our conference. She has a rare gift for making the most complex topics in physics accessible and exciting to a broad audience. We've received nothing but glowing feedback.",
    image: 'https://picsum.photos/102/102',
    imageHint: 'professor portrait',
  },
  {
    name: 'Dr. Sam Carter',
    title: 'Peer Reviewer, Nature Physics',
    quote:
      "Reviewing Evelyn's papers is always a pleasure. Her work is rigorous, her thinking is clear, and she consistently pushes the boundaries of her field. Her contributions are of the highest caliber.",
    image: 'https://picsum.photos/103/103',
    imageHint: 'scientist face',
  },
];

const expertiseAreas = [
  {
    icon: <Atom className="h-10 w-10 text-primary" />,
    title: 'Quantum Physics',
    description: 'Investigating the fundamental nature of reality at the subatomic level.'
  },
  {
    icon: <BrainCircuit className="h-10 w-10 text-primary" />,
    title: 'Artificial Intelligence',
    description: 'Building intelligent systems to solve complex scientific problems.'
  },
  {
    icon: <Sigma className="h-10 w-10 text-primary" />,
    title: 'Theoretical Modeling',
    description: 'Developing mathematical frameworks to describe and predict physical phenomena.'
  }
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section
        id="hero"
        className="relative w-full overflow-hidden bg-background py-20 md:py-32"
      >
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 text-center md:grid-cols-2 md:text-left">
          <ScrollAnimation>
            <div className="z-10">
              <h1 className="font-headline text-5xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
                Dr. Evelyn Reed
              </h1>
              <p className="mt-4 bg-gradient-to-r from-primary to-accent bg-clip-text text-2xl font-semibold text-transparent">
                Theoretical Physicist & AI Researcher
              </p>
              <p className="mt-6 max-w-prose text-lg leading-relaxed text-muted-foreground">
                Exploring the intersection of quantum mechanics and artificial
                intelligence to unravel the complexities of the universe and build
                smarter systems.
              </p>
              <div className="mt-8 flex justify-center gap-4 md:justify-start">
                <Button asChild size="lg">
                  <Link href="/publications">View Publications</Link>
                </Button>
                <Button asChild size="lg" variant="secondary">
                  <Link href="/contact">Get in Touch</Link>
                </Button>
              </div>
            </div>
          </ScrollAnimation>
          <ScrollAnimation delay={200} className="relative flex justify-center">
            <div className="absolute -inset-12 rounded-full bg-gradient-to-br from-primary/20 via-accent/20 to-background blur-2xl"></div>
            <Avatar className="z-10 h-64 w-64 border-4 border-background shadow-lg md:h-80 md:w-80">
              <Image
                src="https://picsum.photos/400/400"
                alt="Dr. Evelyn Reed"
                width={400}
                height={400}
                className="object-cover"
                data-ai-hint="scientist portrait"
              />
              <AvatarFallback>ER</AvatarFallback>
            </Avatar>
          </ScrollAnimation>
        </div>
      </section>

      <section id="about-snippet" className="bg-muted py-16 md:py-24">
        <ScrollAnimation className="container mx-auto max-w-4xl text-center">
          <h2 className="font-headline text-3xl font-bold md:text-4xl">
            Pioneering the Future of Science
          </h2>
          <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
            Dr. Evelyn Reed is a leading theoretical physicist whose work
            has significantly advanced our understanding of quantum gravity
            and its connections to information theory. With a Ph.D. from
            the Massachusetts Institute of Technology, her research has
            consistently pushed the boundaries of conventional science.
          </p>
           <Button asChild size="lg" className="mt-8" variant="outline">
            <Link href="/about">
              Learn More About Me <ArrowRight />
            </Link>
          </Button>
        </ScrollAnimation>
      </section>


      <section id="testimonials" className="w-full bg-background py-16 md:py-24">
        <div className="container mx-auto">
          <ScrollAnimation className="text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              What Colleagues Say
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-muted-foreground">
              Feedback from collaborators, mentees, and peers from across the scientific community.
            </p>
          </ScrollAnimation>
          <ScrollAnimation className="mt-12" delay={200}>
            <Carousel
              opts={{
                align: 'start',
                loop: true,
              }}
              className="w-full"
            >
              <CarouselContent>
                {testimonials.map((testimonial, index) => (
                  <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <TestimonialCard testimonial={testimonial} />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="absolute left-[-50px] top-1/2 -translate-y-1/2 fill-black" />
              <CarouselNext className="absolute right-[-50px] top-1/2 -translate-y-1/2 fill-black" />
            </Carousel>
          </ScrollAnimation>
        </div>
      </section>

      <section id="expertise" className="w-full bg-muted py-16 md:py-24">
        <div className="container mx-auto">
          <ScrollAnimation className="text-center">
            <h2 className="font-headline text-3xl font-bold md:text-4xl">
              Areas of Expertise
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-muted-foreground">
              Specializing in the fields that bridge the gap between the known and the unknown.
            </p>
          </ScrollAnimation>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {expertiseAreas.map((area, index) => (
              <ScrollAnimation key={area.title} delay={index * 150} className="flex flex-col items-center text-center">
                {area.icon}
                <h3 className="mt-4 font-headline text-2xl font-bold">{area.title}</h3>
                <p className="mt-2 text-muted-foreground">{area.description}</p>
              </ScrollAnimation>
            ))}
          </div>
        </div>
      </section>

      <section id="trust-panel" className="bg-background py-16">
        <ScrollAnimation className="container mx-auto">
          <h2 className="text-center font-headline text-2xl font-bold">
            Stay Connected & Verify
          </h2>
          <div className="mt-8 flex flex-wrap justify-center gap-6 md:gap-8">
            <Link
              href="#"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <OrcidIcon className="h-6 w-6" />
              <span className="font-medium">ORCID</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <GoogleScholarIcon className="h-6 w-6" />
              <span className="font-medium">Google Scholar</span>
            </Link>
            <Link
              href="#"
              className="flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
            >
              <Github className="h-6 w-6" />
              <span className="font-medium">GitHub</span>
            </Link>
            <Link
              href="#"
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
