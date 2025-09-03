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
} from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { GoogleScholarIcon, OrcidIcon } from '@/components/icons';

const featuredWork = [
  {
    icon: <BookOpen className="h-8 w-8 text-accent" />,
    title: 'Recent Publication',
    description:
      'The Role of Quantum Entanglement in Neural Information Processing.',
    link: '/publications',
  },
  {
    icon: <FlaskConical className="h-8 w-8 text-accent" />,
    title: 'Ongoing Research',
    description:
      'Developing a novel framework for analyzing complex biological systems.',
    link: '#',
  },
  {
    icon: <FileText className="h-8 w-8 text-accent" />,
    title: 'Latest Blog Post',
    description: 'Bridging the Gap Between Theoretical Physics and AI.',
    link: '/blog/bridging-the-gap',
  },
];

export default function Home() {
  return (
    <div className="flex flex-col">
      <section
        id="hero"
        className="relative w-full bg-primary/10 py-20 md:py-32"
      >
        <div className="container mx-auto grid grid-cols-1 items-center gap-12 md:grid-cols-2">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <h1 className="font-headline text-4xl font-bold tracking-tight text-primary-foreground md:text-5xl lg:text-6xl">
              Dr. Evelyn Reed
            </h1>
            <p className="mt-4 text-lg text-muted-foreground md:text-xl">
              Theoretical Physicist & AI Researcher
            </p>
            <p className="mt-6 max-w-prose text-base leading-relaxed">
              Exploring the intersection of quantum mechanics and artificial
              intelligence to unravel the complexities of the universe and build
              smarter systems.
            </p>
            <div className="mt-8 flex gap-4">
              <Button asChild size="lg">
                <Link href="/publications">View Publications</Link>
              </Button>
              <Button asChild size="lg" variant="secondary">
                <Link href="/contact">Get in Touch</Link>
              </Button>
            </div>
          </div>
          <div className="relative flex justify-center">
            <Avatar className="h-64 w-64 border-4 border-background shadow-lg md:h-80 md:w-80">
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
              <Card key={index} className="flex flex-col">
                <CardHeader className="flex flex-row items-center gap-4">
                  {item.icon}
                  <CardTitle className="font-headline text-xl">
                    {item.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-grow">
                  <p className="text-muted-foreground">{item.description}</p>
                </CardContent>
                <div className="p-6 pt-0">
                  <Button asChild variant="link" className="p-0">
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

      <section id="trust-panel" className="bg-muted py-16">
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
