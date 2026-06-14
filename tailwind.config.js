/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        space: {
          black: '#03040a',
          deep: '#070b16',
          midnight: '#0b1330',
          panel: '#0d142b',
        },
        electric: {
          DEFAULT: '#3b82f6',
          light: '#60a5fa',
        },
        neon: {
          cyan: '#22d3ee',
          purple: '#a855f7',
          pink: '#f472b6',
        },
      },
      fontFamily: {
        display: ['"Orbitron"', 'sans-serif'],
        body: ['"Rajdhani"', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 20px rgba(34, 211, 238, 0.5)',
        'glow-purple': '0 0 25px rgba(168, 85, 247, 0.55)',
        'glow-blue': '0 0 25px rgba(59, 130, 246, 0.55)',
        panel: '0 8px 32px rgba(0,0,0,0.45)',
      },
      animation: {
        'spin-slow': 'spin 8s linear infinite',
        'spin-slower': 'spin 16s linear infinite',
        'spin-reverse': 'spin-reverse 12s linear infinite',
        float: 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2.4s ease-in-out infinite',
        twinkle: 'twinkle 3s ease-in-out infinite',
        'gradient-x': 'gradient-x 8s ease infinite',
        'scan-line': 'scan-line 2.5s linear infinite',
        'bar-bounce': 'bar-bounce 1.2s ease-in-out infinite',
      },
      keyframes: {
        'spin-reverse': {
          from: { transform: 'rotate(360deg)' },
          to: { transform: 'rotate(0deg)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        'pulse-glow': {
          '0%,100%': { opacity: 0.6, transform: 'scale(1)' },
          '50%': { opacity: 1, transform: 'scale(1.08)' },
        },
        twinkle: {
          '0%,100%': { opacity: 0.2 },
          '50%': { opacity: 1 },
        },
        'gradient-x': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        'scan-line': {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100%)' },
        },
        'bar-bounce': {
          '0%,100%': { transform: 'scaleY(0.3)' },
          '50%': { transform: 'scaleY(1)' },
        },
      },
    },
  },
  plugins: [],
}
