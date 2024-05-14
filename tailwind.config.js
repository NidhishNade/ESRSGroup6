/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/js/**/*.js",

    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/tw-elements/js/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        color1: "#242424", // Dark background color
        color2: "#FFFFFF", // Light foreground color
        color3: "#1F4959", // Accent color
        color4: "#5C7C89", // Subtle background color
        color5: "#011425", // Text color
        color6: "#ff4500", // Subtext color
      },
      boxShadow: {
        custom1: "0px 0px 9px 1px #5C7C89",
        custom2: "0px 0px 9px 1px #FFFFFF",
      },
    },
  },
  darkMode: "class",
  plugins: [require("tw-elements/plugin.cjs")],
};
