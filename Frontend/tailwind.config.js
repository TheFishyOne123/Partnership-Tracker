/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/pages/*.{js,jsx}",
    "./src/assets/Components/*.jsx",
  ],
  theme: {
    screens: {
      "2xl": { min: "1536px" },

      bt: { max: "1583px" },

      laptop: { min: "1024", max: "1440" },

      lg: { max: "1023px" },

      md: { max: "768px" },

      sm: { max: "639px" },
    },
    extend: {
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
