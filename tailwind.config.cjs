/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      primary: "#C8553D",
      lightPrimary: "#D27360",
      bgColor: '#212738',
      white: "#FFFFFF",
      yellow: "#F28F3B"
    },
    extend: {},
  },
  plugins: [],
}