import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'default-accent': 'rgb(var(--default-accent) / <alpha-value>)',
        'signal-accent': 'rgb(var(--signal-accent) / <alpha-value>)',
        'editorial-accent': 'rgb(var(--editorial-accent) / <alpha-value>)',
        'journal-accent': 'rgb(var(--journal-accent) / <alpha-value>)',
        'studio-accent': 'rgb(var(--studio-accent) / <alpha-value>)',
        'studio-dark-accent': 'rgb(var(--studio-dark-accent) / <alpha-value>)',
        'outrank-classic-accent': 'rgb(var(--outrank-classic-accent) / <alpha-value>)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
