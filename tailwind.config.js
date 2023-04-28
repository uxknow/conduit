/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      xl: "1140px",
    },
    extend: {
      fontFamily: {
        titillium: ["Titillium Web", "sans-serif"],
        sourceSerif: ["Source Serif Pro", "serif"],
      },
      colors: {
        lightGreen: "#5CB85C",
        fruitSalad: '#449d44',
        darklightGreen: "#3d8b3d",
        softBlue: "#66afe9",
        whiteSmoke: "#f3f3f3",
        veryLightGray: "#ccc",
        midGray: "#687077",
        darkGray: "#aaaaaa",
        montana: "#373a3c",
        silver: "#bbb",
        gainsboro: "#ddd",
        aluminium: "#818a91",
        darkCharcoal: "#333",
        nobel: "#999",
      },
      spacing: {
        navItem: "0.425rem",
        userBadge: "0.3rem",
        profileContainer: "7rem",
      },
      boxShadow: {
        banner:
          "inset 0 8px 8px -8px rgba(0, 0, 0, 0.3), inset 0 -8px 8px -8px rgba(0, 0, 0, 0.3)",
      },
      dropShadow: {
        bannerLogo: "0px 1px 3px rgba(0, 0, 0, 0.3);",
      },
      fontSize: {
        bannerLogo: "3.5rem",
      },
    },
  },
  plugins: [],
};
