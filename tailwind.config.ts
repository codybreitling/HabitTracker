import type { Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";
import { generalColors } from "./src/app/generalStyles";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: generalColors.primary,
        secondary: generalColors.secondary,
        creme: generalColors.creme,
        white: generalColors.white,
        black: generalColors.black,
        mint: generalColors.mint,
        lightMint: generalColors.lightMint,
        darkMint: generalColors.darkMint,
        lightBlue: generalColors.lightBlue,
        darkBlue: generalColors.darkBlue,
        darkOrange: generalColors.darkOrange,
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [scrollbarHide],
};
export default config;
