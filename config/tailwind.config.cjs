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
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        glow: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0.7 },
        }
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        glow: 'glow 3s ease-in-out infinite',
      },
    },
  },
  plugins: [],
} 