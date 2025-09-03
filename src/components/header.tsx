
'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Github, Linkedin, Menu, Rss } from 'lucide-react';
import { cn } from '@/lib/utils';
import { GoogleScholarIcon, OrcidIcon } from './icons';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/publications', label: 'Publications' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

function NavMenuLinks({ isMobile = false }: { isMobile?: boolean }) {
  const pathname = usePathname();
  return (
    <>
      {navLinks.map((link) => (
        <Button
          key={link.href}
          variant="ghost"
          asChild
          className={cn(
            'transition-colors',
            pathname === link.href
              ? 'text-primary hover:text-primary'
              : 'text-muted-foreground hover:text-foreground',
            isMobile && 'w-full justify-start text-lg'
          )}
        >
          <Link href={link.href}>{link.label}</Link>
        </Button>
      ))}
    </>
  );
}

function SocialIcons() {
    return (
        <>
            <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="ORCID">
                    <OrcidIcon className="h-5 w-5" />
                </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="Google Scholar">
                    <GoogleScholarIcon className="h-5 w-5" />
                </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="GitHub">
                    <Github className="h-5 w-5" />
                </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="LinkedIn">
                    <Linkedin className="h-5 w-5" />
                </Link>
            </Button>
            <Button variant="ghost" size="icon" asChild>
                <Link href="#" aria-label="RSS Feed">
                    <Rss className="h-5 w-5" />
                </Link>
            </Button>
        </>
    )
}

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between px-4 md:px-6">
        {/* Left side: Logo/Name */}
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="font-bold sm:inline-block">Dr. Evelyn Reed</span>
          </Link>
        </div>

        {/* Center: Desktop Navigation */}
        <nav className="hidden flex-1 items-center justify-center space-x-1 md:flex">
          <NavMenuLinks />
        </nav>

        {/* Right side: Social Icons */}
        <div className="hidden items-center justify-end space-x-2 md:flex">
          <SocialIcons />
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
                <span className="sr-only">Toggle Menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="left">
              <div className="flex flex-col space-y-4 p-4">
                <Link href="/" className="mb-4">
                  <span className="font-bold text-xl">Dr. Evelyn Reed</span>
                </Link>
                <div className="flex flex-col space-y-2">
                    <NavMenuLinks isMobile={true} />
                </div>
                <div className="flex flex-wrap gap-2 border-t pt-4">
                  <SocialIcons />
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
