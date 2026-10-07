/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './content/**/*.{js,ts}',
  ],
  theme: {
    extend: {
      colors: {
        paper: 'var(--paper)',
        ink: 'var(--ink)',
        data: 'var(--data)',
        frontend: 'var(--frontend)',
        muted: 'var(--muted)',
        grid: 'var(--grid)',
      },
      fontFamily: {
        display: ['var(--font-schibsted)', 'sans-serif'],
        body: ['var(--font-schibsted)', 'sans-serif'],
        mono: ['var(--font-mono)'],
      },
    },
  },
  plugins: [],
};
