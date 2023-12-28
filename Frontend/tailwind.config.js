/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/pages/*.{js,jsx}",
    "./src/assets/Components/*.jsx"
  ],
  theme: {
    screens: {
      '2xl': {'min': '1536px'},

      'xl': {'min': '1025px'},

      'lg': {'max': '1024px'},

      'md': {'max': '768px'},

      'sm': {'max': '639px'},
    },
    extend: {
      backdropBlur: {
        xs: '2px',
      }
    }
  }, 
  plugins: [],
}