import { nextui } from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        wiggle: "wiggle 1s linear infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 50%": { transform: "rotate(-5deg)" },
          "25%": { transform: "rotate(5deg)" },
          "100%": {transform: "rotate(0deg)"}
        },
      },
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
