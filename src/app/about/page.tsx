
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Download,
  Award,
  BrainCircuit,
  Atom,
  GraduationCap,
  Lightbulb,
  Milestone,
} from 'lucide-react';
import Link from 'next/link';
import { ScrollAnimation } from '@/components/scroll-animation';

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-20">
      <ScrollAnimation asChild>
        <header className="text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            About Nuhash Gazi
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
            alt="Nuhash Gazi"
            width={600}
            height={800}
            className="rounded-lg object-cover shadow-lg"
            data-ai-hint="scientist professional"
          />
          <Button asChild className="mt-6 w-full">
            <a href="/cv.pdf" download="Nuhash_Gazi_CV.pdf">
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
                Nuhash Gazi is a leading theoretical physicist whose work
                has significantly advanced our understanding of quantum gravity
                and its connections to information theory. With a Ph.D. from
                the Massachusetts Institute of Technology, their research has
                consistently pushed the boundaries of conventional science.
              </p>
              <p>
                Their early work focused on black hole thermodynamics, leading to
                the groundbreaking "Reed Paradox," which challenged existing
                models and opened new avenues for research. In recent years,
                their focus has shifted to the intersection of artificial
                intelligence and fundamental physics, exploring how complex AI
                can help model and predict cosmological phenomena.
              </p>
              <p>
                Nuhash Gazi is a passionate advocate for science communication and
                has delivered keynote speeches at numerous international
                conferences. They are currently a tenured professor at Stanford
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

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        <ScrollAnimation delay={200}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                <Lightbulb />
                Research Philosophy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base text-muted-foreground">
              <p>
                "I believe that the most profound discoveries are made at the
                boundaries of disciplines. My work is driven by a curiosity to
                connect seemingly disparate fields—like quantum physics and
                AI—to reveal a deeper, more unified understanding of the
                universe."
              </p>
              <p>
                "Science should be a collaborative and open endeavor. I am
                committed to fostering an environment of intellectual freedom
                and rigorous debate, where the best ideas can emerge,
                regardless of their origin."
              </p>
            </CardContent>
          </Card>
        </ScrollAnimation>
        <ScrollAnimation delay={400}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                <GraduationCap />
                Teaching & Mentorship
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base text-muted-foreground">
              <p>
                As a professor at Stanford, Nuhash Gazi is dedicated to inspiring
                the next generation of scientists. They teach graduate-level
                courses in quantum field theory and computational physics.
              </p>
              <p>
                Their mentorship extends beyond the classroom. They actively advises
                a diverse group of Ph.D. students and postdoctoral fellows at
                the QAIS lab, guiding them as they embark on their own research
                journeys and empowering them to tackle science's biggest
                questions.
              </p>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>

      <ScrollAnimation className="mt-16" delay={200}>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl">
              <Milestone />
              Career Highlights
            </CardTitle>
            <CardDescription>
              A timeline of key milestones and achievements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative border-l-2 border-primary pl-6">
              <div className="mb-8 ml-4">
                <div className="absolute -left-[11px] mt-1.5 h-5 w-5 rounded-full border border-primary bg-background"></div>
                <p className="text-sm font-semibold text-primary">2021</p>
                <h3 className="text-lg font-semibold">Awarded Physics Frontier Prize</h3>
                <p className="text-muted-foreground">
                  Recognized for innovative contributions to black hole thermodynamics.
                </p>
              </div>
              <div className="mb-8 ml-4">
                <div className="absolute -left-[11px] mt-1.5 h-5 w-5 rounded-full border border-primary bg-background"></div>
                <p className="text-sm font-semibold text-primary">2018</p>
                <h3 className="text-lg font-semibold">Founded the QAIS Lab</h3>
                <p className="text-muted-foreground">
                  Established the Quantum & AI Systems lab at Stanford University.
                </p>
              </div>
              <div className="mb-8 ml-4">
                <div className="absolute -left-[11px] mt-1.5 h-5 w-5 rounded-full border border-primary bg-background"></div>
                <p className="text-sm font-semibold text-primary">2015</p>
                <h3 className="text-lg font-semibold">Published "The Reed Paradox"</h3>
                <p className="text-muted-foreground">
                  Introduced a groundbreaking theory challenging models of black hole information loss.
                </p>
              </div>
              <div className="ml-4">
                <div className="absolute -left-[11px] mt-1.5 h-5 w-5 rounded-full border border-primary bg-background"></div>
                <p className="text-sm font-semibold text-primary">2012</p>
                <h3 className="text-lg font-semibold">Ph.D. in Physics from MIT</h3>
                <p className="text-muted-foreground">
                  Completed doctoral research on quantum gravity.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </ScrollAnimation>
    </div>
  );
}
