/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      xl: "1200px",
    },
    extend: {
      fontFamily: {
        titillium: ["Titillium Web", "sans-serif"],
      },
      colors: {
        green: '#5CB85C'
      },
      spacing: {
        navItem: '0.425rem'
      }
    },
  },
  plugins: [],
};
