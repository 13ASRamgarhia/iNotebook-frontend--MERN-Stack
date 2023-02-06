/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'tablet': '640px',  
        'laptop': '1024px',
        'desktop': '1280px',
        'HD': '1920px',
      },
      colors: {
        transparent: "transparent",
        bgColor: "#789492",
        cardColor: "#e6ded3",
        navbarColor: "#212428",
        navbarText: "#ead7df",
        cardHeading: "#686262",
        cardBody: "#73746e",
        cardBodyLight: "#9d9d96",
      },
    },
  },
  plugins: [],
}