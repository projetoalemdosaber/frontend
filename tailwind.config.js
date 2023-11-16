/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        estudante : "url(./img/estudante.jpg)"
      },
      colors: {
        logoOrange : "rgba(234, 159, 49)",
        marrom: "#682C0E",
        laranjaMarrom: "#C24914",
        laranja: "#FC8621",
        begeCinzento: "#DAC0A3",
        begeClaro: "#EADBC8",
        begeLaranja: "#F9E0AE",
        bege: "rgb(255, 244, 230)"
      }
    },
  },
  plugins: [],
}

