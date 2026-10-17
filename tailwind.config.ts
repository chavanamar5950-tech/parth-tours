import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: { DEFAULT: "#0B2545", 800: "#10315A", 900: "#071A33", 50: "#EEF2F8", 100: "#D9E2F0", 200: "#B3C4DD" },
        gold: { DEFAULT: "#C9962F", light: "#E3B85A", dark: "#8A6416", 50: "#FBF5E6" },
        ivory: "#FAF7F1",
        ink: { DEFAULT: "#1F2933", soft: "#52606D" },
        wa: { DEFAULT: "#128A4B", dark: "#0E6F3C" },
      },
      fontFamily: {
        sans: ['"Inter Variable"', "system-ui", "-apple-system", "Segoe UI", "Roboto", "sans-serif"],
        display: ['"Fraunces Variable"', "Georgia", "serif"],
      },
      boxShadow: {
        card: "0 1px 2px rgba(11,37,69,.06), 0 8px 24px -12px rgba(11,37,69,.18)",
        lift: "0 2px 4px rgba(11,37,69,.08), 0 18px 36px -16px rgba(11,37,69,.28)",
      },
      borderRadius: { xl: "0.875rem", "2xl": "1.25rem" },
      keyframes: {
        rise: { from: { opacity: "0", transform: "translateY(10px)" }, to: { opacity: "1", transform: "none" } },
      },
      animation: { rise: "rise .6s ease-out both" },
    },
  },
  plugins: [],
} satisfies Config;
