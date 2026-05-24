import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        'signal-accent': 'rgb(var(--signal-accent) / <alpha-value>)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
