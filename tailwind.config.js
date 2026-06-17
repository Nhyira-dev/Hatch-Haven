/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./Src/**/*.{js,ts,jsx,tsx}",
    "./Public/**/*.html"
  ],
  theme: {
    extend: {
      colors: {
        hh: {
          bg: '#FFF0F6',       // light pink background
          primary: '#FF6FA6',  // vibrant pink primary
          accent: '#FFB3D1',   // soft pink accent
          pink: '#FF92C2',     // lively light pink
          lavender: '#E9D5FF', // brighter lavender
          text: '#3B1F2B',     // darker warm text for contrast
          success: '#7AE7A3',  // slightly more vivid success
          warning: '#FFC26A',  // warmer warning
        }
      },
      fontFamily: {
        sans: ['Quicksand', 'Nunito', 'ui-sans-serif', 'system-ui'],
      },
      boxShadow: {
        'cozy': '0 8px 30px rgb(0, 0, 0, 0.04)',
        'floating': '0 10px 25px -5px rgba(0, 0, 0, 0.05), 0 8px 10px -6px rgba(0, 0, 0, 0.05)',
      }
    }
  },
  plugins: [],
}