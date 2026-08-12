/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/client/index.html',
    './src/client/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ono: {
          50: '#f4f8f6',
          100: '#e3eee9',
          200: '#c5ddd2',
          300: '#9cc3b3',
          400: '#6fa390',
          500: '#4e8774',
          600: '#3c6c5c',
          700: '#32574b',
          800: '#2b473e',
          900: '#263c35',
          950: '#13221e',
        },
      },
    },
  },
  plugins: [],
};
