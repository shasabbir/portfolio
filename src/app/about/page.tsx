'use client';

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
  FlaskConical,
  GraduationCap,
  Lightbulb,
  Milestone,
  Users,
  Presentation,
  Award,
  Dna,
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
            Genomics • Proteomics • Biotechnology — focused on neurodegenerative disease research.
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
          <Card className="bg-card/50">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">
                Biography
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base leading-relaxed text-muted-foreground">
              <p>
                Researcher specializing in Alzheimer&apos;s disease and other tauopathies with
                hands-on expertise in computer-aided drug design, molecular dynamics, and wet-lab workflows.
                Experienced in identifying kinase targets and evaluating drug–target interactions using
                GROMACS/VMD and cheminformatics pipelines.
              </p>
              <p>
                Strong academic foundation (B.Sc. Biochemistry & Biotechnology, cum laude; currently M.S.
                in Biotechnology) with a track record in NGS projects and collaborative, mentor-style lab work.
              </p>
              <p>
                Seeking roles where rigorous science, data-driven decision-making, and cross-disciplinary teamwork
                translate into therapies with real patient impact.
              </p>
            </CardContent>
          </Card>

          <div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Research Skills</CardTitle>
                <FlaskConical className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Alzheimer&apos;s / Tauopathies</li>
                  <li>CADD &amp; MD (GROMACS)</li>
                  <li>Drug Design &amp; Discovery</li>
                  <li>NGS &amp; Data Analysis</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Core Competencies</CardTitle>
                <Users className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Project Management</li>
                  <li>Leadership &amp; Mentorship</li>
                  <li>Scientific Communication</li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">Public Speaking</CardTitle>
                <Presentation className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-sm font-medium">Conference-ready Presenter</div>
                <p className="text-xs text-muted-foreground">
                  Experience includes AAIC 2024/2025 and lab seminars.
                </p>
              </CardContent>
            </Card>
          </div>
        </ScrollAnimation>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        <ScrollAnimation delay={200}>
          <Card className="h-full bg-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                <Lightbulb />
                Research Philosophy
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base text-muted-foreground">
              <p>
                I pursue hypothesis-driven discovery at the interface of neurobiology and computation:
                target identification (e.g., tau kinases/GSK3β), in silico screening, and validation with
                reproducible experiments.
              </p>
              <p>
                Collaboration and mentorship are central—aligning wet-lab rigor with modern bioinformatics
                to accelerate translational outcomes.
              </p>
            </CardContent>
          </Card>
        </ScrollAnimation>

        <ScrollAnimation delay={400}>
          <Card className="h-full bg-accent/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                <GraduationCap />
                Academic Background
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4 text-base text-muted-foreground">
              <p>
                <span className="font-medium">M.S. in Biotechnology</span>, Texas Tech University, USA (Aug 2025–Present).
              </p>
              <p>
                <span className="font-medium">B.Sc. in Biochemistry &amp; Biotechnology</span>, North South University, Bangladesh (2018–2022), cum laude; CGPA 3.51/4.00.
                Undergraduate project: mutational analysis of SARS-CoV-2 genomes (Nepal).
              </p>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>

      {/* NEW: Honors, Awards & Scholarships + Certifications & Training */}
      <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
        <ScrollAnimation delay={200}>
          <Card className="h-full bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                <Award />
                Honors, Awards &amp; Scholarships
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>
                  Scholar, KL-YES Exchange Program (Texas) — U.S. Dept. of State (2013–2014)
                </li>
                <li>
                  Full Tuition Scholarship — North South University (2018)
                </li>
                <li>
                  Merit Scholarship — Board of Intermediate &amp; Secondary Education (2017)
                </li>
                <li>
                  Winner, Environmental Presentation — 2nd International Nature Summit (2016)
                </li>
                <li>
                  Quarter-Finalist, Asian English Olympics (BINUS University, Indonesia) (2016)
                </li>
              </ul>
            </CardContent>
          </Card>
        </ScrollAnimation>

        <ScrollAnimation delay={400}>
          <Card className="h-full bg-card/50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
                <Dna />
                Certifications &amp; Training
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc list-inside space-y-2 text-sm text-muted-foreground">
                <li>AAIC 2025 — Toronto, Canada</li>
                <li>AAIC 2024 — Philadelphia, USA</li>
                <li>Hands-on: Next-Generation Pathogen Sequencing — CHRF (2025)</li>
                <li>Hands-on: Computer-Aided Drug Design — ABCD Laboratory (2023)</li>
                <li>AI Tools for Academic Research — ABCD Laboratory (2024)</li>
                <li>Bioinformatics for Biotechnological Research — NIB (2021)</li>
              </ul>
            </CardContent>
          </Card>
        </ScrollAnimation>
      </div>

      <ScrollAnimation className="mt-16" delay={200}>
        <Card className="bg-card/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 font-headline text-2xl text-primary">
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
                <div className="absolute -left-[11px] mt-1.5 h-5 w-5 rounded-full border-4 border-primary bg-background ring-4 ring-primary/20"></div>
                <p className="text-sm font-semibold text-primary">Present</p>
                <h3 className="text-lg font-semibold">M.S. Candidate, Biotechnology (TTU)</h3>
                <p className="text-muted-foreground">
                  Advancing expertise in life sciences with a focus on neurodegeneration and data-driven therapeutics.
                </p>
              </div>

              <div className="mb-8 ml-4">
                <div className="absolute -left-[11px] mt-1.5 h-5 w-5 rounded-full border-4 border-primary bg-background ring-4 ring-primary/20"></div>
                <p className="text-sm font-semibold text-primary">2024–2025</p>
                <h3 className="text-lg font-semibold">Research Assistant, ABCD Laboratory</h3>
                <p className="text-muted-foreground">
                  Led tauopathy projects; identified kinase targets; ran MD simulations to assess drug stability and efficacy.
                </p>
              </div>

              <div className="ml-4">
                <div className="absolute -left-[11px] mt-1.5 h-5 w-5 rounded-full border-4 border-primary bg-background ring-4 ring-primary/20"></div>
                <p className="text-sm font-semibold text-primary">2018–2022</p>
                <h3 className="text-lg font-semibold">B.Sc., NSU (cum laude)</h3>
                <p className="text-muted-foreground">
                  Built a strong foundation in genomics, proteomics, and bioinformatics; completed NGS-driven research project.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </ScrollAnimation>
    </div>
  );
}
