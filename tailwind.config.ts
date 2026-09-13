import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#1C2624",
        inksoft: "#5B6B67",
        beige: "#F5F1E8",
        card: "#FFFFFF",
        teal: "#1F6F5C",
        tealdark: "#134C40",
        accent: "#C98A3D",
        accentsoft: "#F3E3CC",
        line: "#E2DED3",
        danger: "#B3492E",
      },
      fontFamily: {
        serif: ["Fraunces", "serif"],
        sans: ["IBM Plex Sans", "sans-serif"],
      },
      borderRadius: {
        card: "16px",
      },
    },
  },
  plugins: [],
};
export default config;
