/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "selector",

  theme: {
    extend: {
      fontFamily: {
        Poppins: "Poppins,sans-serif",
      },
      screens: {
        xs: "400px",
      },
    },
  },
  plugins: [],
};
