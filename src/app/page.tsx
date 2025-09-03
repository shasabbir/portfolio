
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Github,
  Linkedin,
  Mail,
  FileText,
  BookOpen,
  FlaskConical,
  BrainCircuit,
  Atom,
  Sigma,
  ArrowRight,
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { GoogleScholarIcon, OrcidIcon } from '@/components/icons';

const featuredWork = [
  {
    icon: <BookOpen className="h-8 w-8 text-primary" />,
    title: 'Recent Publication',
    description:
      'The Role of Quantum Entanglement in Neural Information Processing.',
    link: '/publications',
  },
  {
    icon: <FlaskConical className="h-8 w-8 text-primary" />,
    title: 'Ongoing Research',
    description:
      'Developing a novel framework for analyzing complex biological systems.',
    link: '#',
  },
  {
    icon: <FileText className="h-8 w-8 text-primary" />,
    title: 'Latest Blog Post',
    description: 'Bridging the Gap Between Theoretical Physics and AI.',
    link: '/blog/bridging-the-gap',
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
          <div className="relative flex justify-center">
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
          </div>
        </div>
      </section>

      <section id="about-snippet" className="bg-muted py-16 md:py-24">
        <div className="container mx-auto max-w-4xl text-center">
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
        </div>
      </section>


      <section id="featured-work" className="w-full py-16 md:py-24">
        <div className="container mx-auto">
          <h2 className="text-center font-headline text-3xl font-bold md:text-4xl">
            Featured Work
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-muted-foreground">
            A glimpse into my recent explorations, projects, and thoughts at the
            forefront of science and technology.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {featuredWork.map((item, index) => (
              <Card key={index} className="flex transform flex-col transition-transform duration-300 hover:scale-105 hover:shadow-xl">
                <CardHeader className="flex flex-row items-start gap-4">
                  {item.icon}
                  <div className="flex-1">
                    <CardTitle className="font-headline text-xl">
                      {item.title}
                    </CardTitle>
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="link" className="p-0 font-semibold">
                    <Link href={item.link}>
                      Learn More <span aria-hidden="true">→</span>
                    </Link>
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="expertise" className="w-full bg-muted py-16 md:py-24">
        <div className="container mx-auto">
          <h2 className="text-center font-headline text-3xl font-bold md:text-4xl">
            Areas of Expertise
          </h2>
          <p className="mx-auto mt-4 max-w-3xl text-center text-muted-foreground">
            Specializing in the fields that bridge the gap between the known and the unknown.
          </p>
          <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            {expertiseAreas.map((area) => (
              <div key={area.title} className="flex flex-col items-center text-center">
                {area.icon}
                <h3 className="mt-4 font-headline text-2xl font-bold">{area.title}</h3>
                <p className="mt-2 text-muted-foreground">{area.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="trust-panel" className="bg-background py-16">
        <div className="container mx-auto">
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
        </div>
      </section>
    </div>
  );
}
