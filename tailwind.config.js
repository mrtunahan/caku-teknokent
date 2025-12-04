/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#005696', // GOSB Ana Mavi
        'brand-light': '#009fe3', // GOSB Açık Mavi
        'brand-dark': '#003366', // GOSB Lacivert
        'caku-red': '#e3000b',   // ÇAKÜ Kırmızısı
      },
    },
  },
  plugins: [],
}