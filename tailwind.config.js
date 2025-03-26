/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  mode:"jit",
  theme: {
    extend: {
      colors: {
        primary: "rgba(223, 105, 81, 1)",
        backgroundgray: "#F8F8F8",
        black1: "#04152d",
        black2: "#041226",
        black3: "#020c1b",
        blackLighter: "#1c4b91",
        blackLight: "#173d77",
        pink: "#f73b41",
        orange: "#f89e00",
        secondary: "#181433",
        dimWhite: "#7D7D7D",
      },
      fontFamily : {
        poppins: ['Poppins', 'sans-serif'],
      }
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px"
    }
  },
  plugins: [],
}



