// tailwind.config.js

import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './Components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './contexts/**/*.{js,ts,jsx,tsx}', // Added for WebGL contexts
    './src/shaders/**/*.{glsl,vert,frag}' // Adjusted path to include shaders
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#DAA520',
          light: '#FFD700',
          dark: '#B8860B',
        },
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        gold: {
          DEFAULT: '#DAA520',
          light: '#FFD700',
          dark: '#B8860B',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 8s linear infinite',
        'levitate': 'levitate 6s ease-in-out infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'rotate': 'rotateGeometry 30s linear infinite',
        'pattern-float': 'patternFloat 20s linear infinite',
        'text-shine': 'textShine 8s linear infinite',
        'text-reveal': 'textReveal 0.5s ease forwards',
        'fade-up': 'fadeUp 0.5s ease forwards',
        'slide-in': 'slideIn 0.7s cubic-bezier(0.22, 1, 0.36, 1)',
        'floating-points': 'floating-points 2.5s ease-in-out infinite',
        'button-glow': 'button-glow 2s ease-in-out infinite',
        'fold-corner': 'fold-corner 0.5s ease-out forwards',
        'dasharray': 'dasharray 1s linear forwards',
        'filled': 'filled 0.1s linear forwards 0.95s',
        'map-pulse': 'map-pulse 3s ease-in-out infinite',
        'map-glow': 'map-glow 2s ease-in-out infinite',
        'calendar-in': 'calendar-in 0.2s ease-out',
        'calendar-out': 'calendar-out 0.2s ease-in',
        'date-hover': 'date-hover 0.2s ease-out',
        'rotate4': 'rotate4 2s linear infinite',
        'dash4': 'dash4 1.5s ease-in-out infinite',
      },
      keyframes: {
        textReveal: {
          '0%': { opacity: '0', transform: 'translateY(10px)', filter: 'blur(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)', filter: 'blur(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-20px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'floating-points': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '85%': { opacity: '0' },
          '100%': { transform: 'translateY(-55px)', opacity: '0' }
        },
        'button-glow': {
          '0%, 100%': {
            'filter': 'brightness(1) drop-shadow(0 0 10px rgba(218,165,32,0.3))'
          },
          '50%': {
            'filter': 'brightness(1.2) drop-shadow(0 0 20px rgba(218,165,32,0.5))'
          }
        },
        'fold-corner': {
          '0%': {
            transform: 'translate(0, 0)'
          },
          '100%': {
            transform: 'translate(-4px, -4px)'
          }
        },
        'dasharray': {
          'from': { 'stroke-dasharray': '0 0 0 0' },
          'to': { 'stroke-dasharray': '68 68 0 0' }
        },
        'filled': {
          'to': { 'fill': 'white' }
        },
        'map-pulse': {
          '0%, 100%': { transform: 'scale(1)', opacity: '1' },
          '50%': { transform: 'scale(1.1)', opacity: '0.8' }
        },
        'map-glow': {
          '0%, 100%': { filter: 'brightness(1)' },
          '50%': { filter: 'brightness(1.2)' }
        },
        'calendar-in': {
          '0%': { opacity: '0', transform: 'scale(0.95) translateY(-10px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
        'calendar-out': {
          '0%': { opacity: '1', transform: 'scale(1) translateY(0)' },
          '100%': { opacity: '0', transform: 'scale(0.95) translateY(-10px)' },
        },
        'date-hover': {
          '0%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.1)' },
          '100%': { transform: 'scale(1)' },
        },
        rotate4: {
          '100%': { transform: 'rotate(360deg)' },
        },
        dash4: {
          '0%': {
            'stroke-dasharray': '1, 200',
            'stroke-dashoffset': '0',
          },
          '50%': {
            'stroke-dasharray': '90, 200',
            'stroke-dashoffset': '-35px',
          },
          '100%': {
            'stroke-dashoffset': '-125px',
          },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'testimonial-gradient': 'linear-gradient(135deg, rgba(218, 165, 32, 0.05) 0%, rgba(255, 255, 255, 0.01) 50%, rgba(218, 165, 32, 0.03) 100%)',
        'testimonial-grid': `
          linear-gradient(to right, rgba(218, 165, 32, 0.1) 1px, transparent 1px),
          linear-gradient(to bottom, rgba(218, 165, 32, 0.1) 1px, transparent 1px)
        `,
        'testimonial-glow': 'radial-gradient(circle at 50% 50%, rgba(218, 165, 32, 0.08), transparent 70%)',
        'testimonial-title': 'linear-gradient(180deg, rgb(26, 26, 26) 0%, rgb(51, 51, 51) 100%)',
        'map-gradient': 'linear-gradient(180deg, transparent, rgba(255,255,255,0.05), transparent)',
      },
      transitionTimingFunction: {
        'out-bounce': 'cubic-bezier(0.22, 1.45, 0.36, 1)', // Custom transition for animations
        'bounce-custom': 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
        'custom-ease': 'cubic-bezier(0.22, 1, 0.36, 1)',
      },
      ringColor: {
        'primary-light': 'rgba(218, 165, 32, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;