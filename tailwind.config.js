/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          DEFAULT: '#6D4AFF',
          50:  '#F0ECFF',
          100: '#DDD5FF',
          200: '#BEADFF',
          300: '#9E85FF',
          400: '#7F5DFF',
          500: '#6D4AFF',
          600: '#5535E8',
          700: '#3F22C4',
          800: '#2C169A',
          900: '#1A0D6E',
        },
        ink: {
          DEFAULT: '#07071a',
          50:  '#f8f8ff',
          100: '#eeeeff',
          200: '#d0d0f0',
          300: '#a8a8d8',
          400: '#7878b8',
          500: '#555590',
          600: '#3c3c70',
          700: '#282858',
          800: '#141440',
          900: '#07071a',
          950: '#03030d',
        },
      },
      fontFamily: {
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-display)', 'var(--font-inter)', 'system-ui', 'sans-serif'],
        mono:    ['ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      animation: {
        'fade-up':     'fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in':     'fadeIn 0.4s ease forwards',
        'slide-right': 'slideRight 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'cursor':      'blinkCursor 1s step-end infinite',
        'shimmer':     'shimmer 2.5s linear infinite',
      },
      keyframes: {
        fadeUp: {
          '0%':   { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%':   { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%':   { opacity: '0', transform: 'translateX(-10px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        blinkCursor: {
          '0%, 100%': { opacity: '1' },
          '50%':      { opacity: '0' },
        },
        shimmer: {
          '0%':   { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
    },
  },
  plugins: [],
}
