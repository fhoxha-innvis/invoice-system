/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.html", "./src/**/*.{js,jsx,ts,tsx,vue}"],
  theme: {
    fontFamily: {
      roboto: ["Roboto"],
      chillax: ["Chillax"],
    },
    extend: {},
  },
  plugins: [require("@tailwindcss/forms")],
}

