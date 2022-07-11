/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        "3xl": "1700px",
        "4xl": "1900px",
        "5xl": "2100px",
      },
    },
  },
  plugins: [],
};
