import Image from 'next/image';
import { ContactForm } from '@/components/contact-form';

export default function ContactPage() {
  return (
    <div className="container mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-20">
      <header className="text-center">
        <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl">
          Get in Touch
        </h1>
        <p className="mt-4 text-lg text-muted-foreground">
          I&apos;m always open to discussing new research, collaborations, or
          speaking opportunities.
        </p>
      </header>

      <div className="mt-12 grid grid-cols-1 items-center gap-12 md:grid-cols-2">
        <div className="order-2 rounded-lg bg-muted p-8 shadow-lg md:order-1">
          <ContactForm />
        </div>
        <div className="order-1 md:order-2">
          <Image
            src="https://picsum.photos/800/600"
            alt="Contact illustration"
            width={800}
            height={600}
            className="rounded-lg object-cover"
            data-ai-hint="abstract communication"
          />
        </div>
      </div>
    </div>
  );
}
