import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Award, BrainCircuit, Atom } from 'lucide-react';
import Link from 'next/link';
import { ScrollAnimation } from '@/components/scroll-animation';

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl py-12 md:py-20">
      <ScrollAnimation asChild>
        <header className="text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            About Dr. Evelyn Reed
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A journey through science, discovery, and innovation.
          </p>
        </header>
      </ScrollAnimation>

      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
        <ScrollAnimation className="md:col-span-1">
          <Image
            src="https://picsum.photos/600/800"
            alt="Dr. Evelyn Reed"
            width={600}
            height={800}
            className="rounded-lg object-cover shadow-lg"
            data-ai-hint="scientist professional"
          />
          <Button asChild className="mt-6 w-full">
            <a href="/cv.pdf" download="Evelyn_Reed_CV.pdf">
              <Download className="mr-2 h-4 w-4" />
              Download CV
            </a>
          </Button>
        </ScrollAnimation>

        <ScrollAnimation className="md:col-span-2" delay={200}>
          <Card>
            <CardHeader>
              <CardTitle className="font-headline text-2xl">
                Biography
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Dr. Evelyn Reed is a leading theoretical physicist whose work
                has significantly advanced our understanding of quantum gravity
                and its connections to information theory. With a Ph.D. from
                the Massachusetts Institute of Technology, her research has
                consistently pushed the boundaries of conventional science.
              </p>
              <p>
                Her early work focused on black hole thermodynamics, leading to
                the groundbreaking "Reed Paradox," which challenged existing
                models and opened new avenues for research. In recent years,
                her focus has shifted to the intersection of artificial
                intelligence and fundamental physics, exploring how complex AI
                can help model and predict cosmological phenomena.
              </p>
              <p>
                Dr. Reed is a passionate advocate for science communication and
                has delivered keynote speeches at numerous international
                conferences. She is currently a tenured professor at Stanford
                University and leads the Quantum & AI Systems (QAIS) lab.
              </p>
            </CardContent>
          </Card>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Research Interests
                </CardTitle>
                <Atom className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Quantum Gravity</li>
                  <li>AI in Physics</li>
                  <li>Cosmology</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Affiliations
                </CardTitle>
                <BrainCircuit className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium">Stanford University</div>
                <p className="text-xs text-muted-foreground">
                  Professor of Physics
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Awards</CardTitle>
                <Award className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium">Physics Frontier Prize</div>
                <p className="text-xs text-muted-foreground">2021</p>
              </CardContent>
            </Card>
          </div>
        </ScrollAnimation>
      </div>
    </div>
  );
}
