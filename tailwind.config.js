/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#eef6b8',
        panel: 'rgba(252, 255, 236, 0.9)',
        line: 'rgba(102, 118, 61, 0.12)',
        text: '#26341f',
        muted: '#6d7d4f',
        accent: '#bede3c',
        accent2: '#e1ef8a',
        accent3: '#93c84e',
      },
      boxShadow: {
        soft: '0 24px 80px rgba(80, 96, 26, 0.08)',
      },
      borderRadius: {
        xl2: '1.25rem',
        xl3: '1.75rem',
      },
      keyframes: {
        drift: {
          '0%, 100%': { transform: 'translate3d(0, 0, 0)' },
          '50%': { transform: 'translate3d(0, -8px, 0)' },
        },
        scan: {
          '0%': { transform: 'translateX(-120%) skewX(-18deg)' },
          '100%': { transform: 'translateX(120%) skewX(-18deg)' },
        },
        grain: {
          '0%': { transform: 'translate3d(0, 0, 0)' },
          '20%': { transform: 'translate3d(-2%, 3%, 0)' },
          '40%': { transform: 'translate3d(2%, -2%, 0)' },
          '60%': { transform: 'translate3d(-3%, 1%, 0)' },
          '80%': { transform: 'translate3d(1%, -3%, 0)' },
          '100%': { transform: 'translate3d(0, 0, 0)' },
        },
      },
      animation: {
        drift: 'drift 14s ease-in-out infinite',
        scan: 'scan 20s cubic-bezier(0.2, 0.8, 0.2, 1) infinite',
        grain: 'grain 14s steps(10) infinite',
      },
      backgroundImage: {
        gridlines:
          'linear-gradient(rgba(24,32,44,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(24,32,44,0.03) 1px, transparent 1px)',
      },
    },
  },
  plugins: [],
}
