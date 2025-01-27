/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors:{
        mycolor1:"#fff34f",
        mycolor2:"#002f5e",
      }
    },
  },
  plugins: [],
}

