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
          DEFAULT: '#5B3DF5',
          50:  '#EEE9FE',
          100: '#D9CEFD',
          200: '#B49DFB',
          300: '#8F6CF9',
          400: '#6A3BF7',
          500: '#5B3DF5',
          600: '#4320E3',
          700: '#3318B0',
          800: '#23107D',
          900: '#13084A',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 0.55s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'slide-right': 'slideRight 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'cursor': 'typing-cursor 1s step-end infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideRight: {
          '0%': { opacity: '0', transform: 'translateX(-12px)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
        'typing-cursor': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
      },
      backgroundImage: {
        'gradient-accent': 'linear-gradient(135deg, #4320E3 0%, #5B3DF5 50%, #7C5FF7 100%)',
      },
      boxShadow: {
        'glow-accent': '0 0 40px -8px rgba(91, 61, 245, 0.4)',
        'glow-accent-sm': '0 0 20px -4px rgba(91, 61, 245, 0.3)',
      },
    },
  },
  plugins: [],
}
