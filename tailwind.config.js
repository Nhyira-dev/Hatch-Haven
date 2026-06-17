/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./Src/**/*.{js,ts,jsx,tsx}",
    "./Public/**/*.{html}"
  ],
  theme: {
    extend: {
      colors: {
        hh: {
          bg: '#FFF8F2',
          primary: '#A7D8C9',
          accent: '#FFD6A5',
          pink: '#F8C8DC',
          lavender: '#D8C8F8',
          text: '#5C5C5C',
          success: '#A8E6A3',
          warning: '#FFD166',
        }
      },
      fontFamily: {
        sans: ['Quicksand', 'Nunito', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'cozy': '0 8px 30px rgb(0, 0, 0, 0.04)',
        'floating': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      }
    },
  },
  plugins: [],
}