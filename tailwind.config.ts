import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        cyber: {
          bg: "#080810",
          card: "#0e0e1a",
          border: "#1e1e35",
          cyan: "#00e5ff",
          purple: "#a855f7",
          pink: "#ec4899",
          glow: "#7c3aed",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(rgba(0,229,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(0,229,255,0.03) 1px, transparent 1px)",
        "hero-gradient":
          "radial-gradient(ellipse at 60% 0%, rgba(124,58,237,0.15) 0%, transparent 60%), radial-gradient(ellipse at 0% 80%, rgba(0,229,255,0.08) 0%, transparent 50%)",
      },
      backgroundSize: {
        grid: "40px 40px",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-flicker": "glow 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glow: {
          "0%": { boxShadow: "0 0 5px rgba(0,229,255,0.3)" },
          "100%": { boxShadow: "0 0 20px rgba(0,229,255,0.6), 0 0 40px rgba(0,229,255,0.2)" },
        },
      },
      boxShadow: {
        "cyber-cyan": "0 0 20px rgba(0,229,255,0.3)",
        "cyber-purple": "0 0 20px rgba(168,85,247,0.3)",
        "card-hover": "0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(0,229,255,0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
