/** @type {import('tailwindcss').Config} */
export default {
  content: ["index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#083d88",
        "secondary": "#0098d1",
        "tertiary": "#9cb1cf",
      },
    },
    fontFamily: {
      Fruitiger: ["Fruitiger", "sans-serif"],
      Roboto: ["Roboto", "sans-serif"],
    },
    container: {
      center: true,
      padding: "2rem"
    },
    screens: {
      sm: "640px",
      md: "768px",
    },
  },
  plugins: [],
}

