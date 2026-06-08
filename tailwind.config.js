/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        honey: {
          50: '#FFFBF0',
          100: '#FFF3CC',
          200: '#FFE280',
          300: '#FFD040',
          400: '#F5B800',
          500: '#D99E00',
          600: '#B07D00',
          700: '#7A5700',
        },
        dark: '#1A1510',
        cream: '#FBF7EE',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}