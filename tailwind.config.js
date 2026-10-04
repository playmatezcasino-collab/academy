/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        canvas: '#F4F1EB',
        navy: {
          DEFAULT: '#12382D',
          light: '#1A4D3E',
          dark: '#0C2A20',
        },
        charcoal: '#3E4651',
        teal: {
          DEFAULT: '#B8915B',
          light: '#C9A575',
          dark: '#9A7A4A',
        },
        terracotta: {
          DEFAULT: '#6A2431',
          light: '#8A3344',
        },
        slateblue: {
          DEFAULT: '#3E4651',
          light: '#5C6675',
        },
        red: {
          DEFAULT: '#6A2431',
          dark: '#4E1A24',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'hero': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        'hero-lg': ['3.75rem', { lineHeight: '1.08', letterSpacing: '-0.025em' }],
        'hero-xl': ['4.5rem', { lineHeight: '1.05', letterSpacing: '-0.03em' }],
        'hero-2xl': ['5.5rem', { lineHeight: '1.02', letterSpacing: '-0.035em' }],
      },
      boxShadow: {
        'card': '0 1px 3px 0 rgba(31, 58, 86, 0.06), 0 1px 2px 0 rgba(31, 58, 86, 0.04)',
        'card-hover': '0 4px 12px -2px rgba(31, 58, 86, 0.08), 0 2px 6px -1px rgba(31, 58, 86, 0.05)',
        'card-lg': '0 10px 30px -8px rgba(31, 58, 86, 0.12), 0 4px 12px -4px rgba(31, 58, 86, 0.06)',
      },
    },
  },
  plugins: [],
};
