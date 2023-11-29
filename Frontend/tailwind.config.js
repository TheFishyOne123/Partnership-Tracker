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

      'xl': {'min': '1024px'},

      'lg': {'max': '1023px'},

      'md': {'max': '767px'},

      'sm': {'max': '639px'},
    }
  }, 
  plugins: [],
}