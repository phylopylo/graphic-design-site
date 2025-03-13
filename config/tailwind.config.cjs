const path = require('path');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    path.resolve(__dirname, '../src/**/*.{js,jsx,ts,tsx}'),
    path.resolve(__dirname, '../index.html'),
  ],
  theme: {
    extend: {
      colors: {
        mist: {
          50: '#f8f9fc',
          100: '#f0f2fa',
          200: '#e6eaf7',
          300: '#d1d9f0',
          400: '#b3c2e7',
          500: '#8fa4db',
          600: '#6b86cf',
          700: '#4e69b9',
          800: '#3d519b',
          900: '#324180',
        },
        dream: {
          50: '#fdf8fc',
          100: '#faf0f9',
          200: '#f7e6f6',
          300: '#f0d1ef',
          400: '#e7b3e5',
          500: '#db8fd8',
          600: '#cf6bc8',
          700: '#b94eb2',
          800: '#9b3d94',
          900: '#80327a',
        },
        ethereal: {
          50: '#f8fcfb',
          100: '#f0faf7',
          200: '#e6f7f3',
          300: '#d1efe9',
          400: '#b3e5dc',
          500: '#8fdbc8',
          600: '#6bcfb4',
          700: '#4eb99c',
          800: '#3d9b81',
          900: '#32806a',
        },
        background: '#fcfaff',
        surface: '#ffffff',
        text: {
          primary: '#1a1625',
          secondary: '#4a4558',
          subtle: '#6e6a7c',
        },
        accent: {
          light: '#e6d8ff',
          DEFAULT: '#9f7aea',
          dark: '#805ad5',
        },
      },
      fontFamily: {
        sans: ['Inter var', 'system-ui', 'sans-serif'],
        display: ['Cormorant Garamond', 'serif'],
        accent: ['Playfair Display', 'serif'],
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(159, 122, 234, 0.05)',
        'glow': '0 0 15px -3px rgba(159, 122, 234, 0.15)',
        'ethereal': '0 4px 20px -8px rgba(159, 122, 234, 0.25)',
        'inner-glow': 'inset 0 2px 15px -3px rgba(159, 122, 234, 0.15)',
        'sparkle': '0 0 2px #fff, 0 0 4px #fff, 0 0 6px #fff, 0 0 10px rgba(159, 122, 234, 0.5)',
      },
      keyframes: {
        float: {
          '0%, 100%': { 
            transform: 'translateY(0) rotate(0deg)',
            opacity: 0.2,
          },
          '50%': { 
            transform: 'translateY(-20px) rotate(10deg)',
            opacity: 0.5,
          }
        },
        glow: {
          '0%, 100%': { 
            opacity: 0.3,
            filter: 'blur(120px)',
          },
          '50%': { 
            opacity: 0.5,
            filter: 'blur(100px)',
          }
        },
        shimmer: {
          '0%': { 
            backgroundPosition: '200% 0',
            opacity: 0.5,
          },
          '100%': { 
            backgroundPosition: '-200% 0',
            opacity: 0.3,
          }
        },
        pulse: {
          '0%, 100%': { 
            transform: 'scale(1)',
            opacity: 0.8,
          },
          '50%': { 
            transform: 'scale(1.05)',
            opacity: 1,
          }
        },
        sparkle: {
          '0%, 100%': {
            transform: 'scale(0) rotate(0deg)',
            opacity: 0,
          },
          '50%': {
            transform: 'scale(1) rotate(180deg)',
            opacity: 1,
          }
        },
        ping: {
          '75%, 100%': {
            transform: 'scale(2)',
            opacity: 0,
          }
        },
        'gradient-shift': {
          '0%, 100%': {
            'background-position': '0% 50%',
          },
          '50%': {
            'background-position': '100% 50%',
          },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
        shimmer: 'shimmer 8s linear infinite',
        pulse: 'pulse 4s ease-in-out infinite',
        sparkle: 'sparkle 2s ease-in-out infinite',
        ping: 'ping 1s cubic-bezier(0, 0, 0.2, 1) infinite',
        'gradient-shift': 'gradient-shift 8s ease infinite',
      },
      transitionDelay: {
        '2000': '2000ms',
        '3000': '3000ms',
        '4000': '4000ms',
      },
      backgroundSize: {
        '200%': '200%',
        '400%': '400%',
      },
      backdropBlur: {
        xs: '2px',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
} 