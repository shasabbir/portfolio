
import type { Config } from 'tailwindcss';

const { fontFamily } = require('tailwindcss/defaultTheme');

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        body: ['var(--font-inter)', ...fontFamily.sans],
        headline: ['var(--font-literata)', ...fontFamily.serif],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
          'vibe-1': 'hsl(var(--card-vibe-1))',
          'vibe-2': 'hsl(var(--card-vibe-2))',
          'vibe-3': 'hsl(var(--card-vibe-3))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          '1': 'hsl(var(--chart-1))',
          '2': 'hsl(var(--chart-2))',
          '3': 'hsl(var(--chart-3))',
          '4': 'hsl(var(--chart-4))',
          '5': 'hsl(var(--chart-5))',
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0',
          },
          to: {
            height: 'var(--radix-accordion-content-height)',
          },
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)',
          },
          to: {
            height: '0',
          },
        },
        'blob-1-animation': {
          '0%': {
            transform: 'scale(1) rotate(0deg)',
            color: 'hsl(var(--primary) / 0.7)',
          },
          '25%': {
            transform: 'scale(1.1) rotate(20deg)',
            color: 'hsl(var(--secondary) / 0.7)',
          },
          '50%': {
            transform: 'scale(1) rotate(0deg)',
            color: 'hsl(var(--accent) / 0.7)',
          },
          '75%': {
            transform: 'scale(0.9) rotate(-20deg)',
             color: 'hsl(var(--secondary) / 0.7)',
          },
          '100%': {
            transform: 'scale(1) rotate(0deg)',
            color: 'hsl(var(--primary) / 0.7)',
          },
        },
        'blob-2-animation': {
          '0%': {
            transform: 'scale(1) rotate(0deg)',
            color: 'hsl(var(--accent) / 0.7)',
          },
           '25%': {
            transform: 'scale(0.9) rotate(-30deg)',
             color: 'hsl(var(--secondary) / 0.7)',
          },
          '50%': {
            transform: 'scale(1.1) rotate(0deg)',
            color: 'hsl(var(--primary) / 0.7)',
          },
          '75%': {
            transform: 'scale(1) rotate(30deg)',
            color: 'hsl(var(--secondary) / 0.7)',
          },
          '100%': {
            transform: 'scale(1) rotate(0deg)',
            color: 'hsl(var(--accent) / 0.7)',
          },
        },
        'dna-spin': {
            '0%': { transform: 'rotateY(0deg)' },
            '100%': { transform: 'rotateY(360deg)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'blob-1': 'blob-1-animation 15s infinite ease-in-out',
        'blob-2': 'blob-2-animation 20s infinite ease-in-out',
        'dna-spin': 'dna-spin 15s linear infinite',
      },
        container: {
        center: true,
        padding: { DEFAULT: '1rem', md: '2rem', lg: '2.5rem' },
        screens: { '2xl': '80rem' }, // ~1280px; bump if you want wider
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
