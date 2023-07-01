/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'body': ['Roboto', 'sans-serif'],  // Roboto will be used as the body font
        'headings': ['Roboto', 'serif'], // Roboto will be used as the headings font
      }
    }
  },
  plugins: [require("daisyui")],
  daisyui: {
    themes: ["dark"],
  },
}