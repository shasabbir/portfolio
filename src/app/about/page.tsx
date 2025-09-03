
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
  FlaskConical,
  Dna,
  GraduationCap,
  Lightbulb,
  Milestone,
  Users,
  Presentation,
} from 'lucide-react';
import Link from 'next/link';
import { ScrollAnimation } from '@/components/scroll-animation';

export default function AboutPage() {
  return (
    <div className="container mx-auto max-w-5xl px-4 py-12 md:px-6 md:py-20">
      <ScrollAnimation asChild>
        <header className="text-center">
          <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
            About GAZI SALAH UDDIN NUHASH
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            A journey through life sciences, discovery, and innovation.
          </p>
        </header>
      </ScrollAnimation>

      <div className="mt-12 grid grid-cols-1 gap-12 md:grid-cols-3">
        <ScrollAnimation className="md:col-span-1">
          <Image
            src="https://i.postimg.cc/50FkXX3x/nuhash.jpg"
            alt="GAZI SALAH UDDIN NUHASH"
            width={600}
            height={800}
            className="rounded-lg object-cover shadow-lg"
            data-ai-hint="scientist professional"
            unoptimized
          />
          <Button asChild className="mt-6 w-full">
            <a href="/cv.pdf" download="Gazi_Salah_Uddin_Nuhash_CV.pdf">
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
                Driven, ambitious and self-motivated researcher
                with a strong background in Alzheimer&apos;s Disease,
                drug design and discovery, cell culture,
                next-generation sequencing (NGS) and data analysis.
              </p>
              <p>
                Academically distinguished life sciences graduate with exceptional leadership abilities, adept at public speaking, teamwork, and effective communication.
              </p>
              <p>
                Looking to pursue further opportunities and make a difference within my field and harness my potential.
              </p>
            </CardContent>
          </Card>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Research Skills
                </CardTitle>
                <FlaskConical className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Alzheimer&apos;s Disease</li>
                  <li>Drug Design</li>
                  <li>Cell Culture</li>
                  <li>NGS</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  Core Competencies
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                    <li>Leadership</li>
                    <li>Teamwork</li>
                    <li>Communication</li>
                </ul>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Public Speaking</CardTitle>
                <Presentation className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium">Adept Presenter</div>
                <p className="text-xs text-muted-foreground">Engaging and effective communicator.</p>
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
                "I am driven by a curiosity to unravel the complexities of neurodegenerative diseases and a passion for developing innovative therapeutic strategies. I believe in a collaborative, multi-disciplinary approach to solve the most pressing challenges in medical science."
              </p>
              <p>
                "My goal is to contribute to a research environment that fosters intellectual freedom, rigorous scientific inquiry, and a shared commitment to making a tangible impact on patient lives."
              </p>
            </CardContent>
          </Card>
        </ScrollAnimation>
        <ScrollAnimation delay={400}>
          <Card className="h-full">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl">
                <GraduationCap />
                Academic Background
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base text-muted-foreground">
              <p>
                As a distinguished graduate in the life sciences, I have built a strong academic foundation that equips me to tackle complex biological questions. My training has provided me with hands-on experience in cutting-edge laboratory techniques and data analysis methods.
              </p>
              <p>
                I am committed to lifelong learning and mentorship, aiming to inspire and collaborate with the next generation of scientists to collectively advance our understanding of human health and disease.
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
              Career Aspirations
            </CardTitle>
            <CardDescription>
              A timeline of key milestones and achievements.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative border-l-2 border-primary pl-6">
              <div className="mb-8 ml-4">
                <div className="absolute -left-[11px] mt-1.5 h-5 w-5 rounded-full border border-primary bg-background"></div>
                <p className="text-sm font-semibold text-primary">Present</p>
                <h3 className="text-lg font-semibold">Seeking New Opportunities</h3>
                <p className="text-muted-foreground">
                  Looking to apply my skills in a challenging research role to make a significant impact in the field of life sciences.
                </p>
              </div>
              <div className="mb-8 ml-4">
                <div className="absolute -left-[11px] mt-1.5 h-5 w-5 rounded-full border border-primary bg-background"></div>
                <p className="text-sm font-semibold text-primary">Graduate Studies</p>
                <h3 className="text-lg font-semibold">Distinguished Life Sciences Graduate</h3>
                <p className="text-muted-foreground">
                  Completed rigorous academic and practical training, graduating with distinction.
                </p>
              </div>
              <div className="ml-4">
                <div className="absolute -left-[11px] mt-1.5 h-5 w-5 rounded-full border border-primary bg-background"></div>
                <p className="text-sm font-semibold text-primary">Foundation</p>
                <h3 className="text-lg font-semibold">Developed Strong Research Background</h3>
                <p className="text-muted-foreground">
                  Built a solid foundation in Alzheimer's Disease, drug design, cell culture, and NGS.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </ScrollAnimation>
    </div>
  );
}
