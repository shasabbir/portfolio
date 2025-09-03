'use client';

import { useRef, useEffect, useState, forwardRef } from 'react';
import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';

interface ScrollAnimationProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  asChild?: boolean;
}

export const ScrollAnimation = forwardRef<HTMLDivElement, ScrollAnimationProps>(
  ({ children, className, delay = 0, asChild = false }, ref) => {
    const [isVisible, setIsVisible] = useState(false);
    const internalRef = useRef<HTMLDivElement>(null);
    const targetRef = (ref || internalRef) as React.RefObject<HTMLDivElement>;

    useEffect(() => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        },
        {
          rootMargin: '0px',
          threshold: 0.1,
        }
      );

      if (targetRef.current) {
        observer.observe(targetRef.current);
      }

      return () => {
        if (targetRef.current) {
          // eslint-disable-next-line react-hooks/exhaustive-deps
          observer.unobserve(targetRef.current);
        }
      };
    }, [targetRef]);
    
    const Comp = asChild ? Slot : 'div';

    return (
      <Comp
        ref={targetRef}
        className={cn(
          'transition-all duration-700 ease-out',
          isVisible
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-5',
          className
        )}
        style={{ transitionDelay: `${delay}ms` }}
      >
        {children}
      </Comp>
    );
  }
);

ScrollAnimation.displayName = 'ScrollAnimation';
