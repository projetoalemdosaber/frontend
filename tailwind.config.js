/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        logoOrange : "rgba(234, 159, 49)",
        logoPink: "rgba(253, 176, 143)",
        logoGreen: "rgba(114, 121, 46)",
        logoRed: "rgba(229, 84, 60)"
      }
    },
  },
  plugins: [],
}

