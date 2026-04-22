import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        gold: {
          DEFAULT: "#FFE81F",
          dim: "#B8A000",
          glow: "rgba(255,232,31,0.15)",
        },
        sith: {
          DEFAULT: "#FF2222",
          dim: "#991414",
          glow: "rgba(255,34,34,0.15)",
        },
        jedi: {
          DEFAULT: "#4DACFF",
          dim: "#1A78CC",
          glow: "rgba(77,172,255,0.15)",
        },
        force: {
          DEFAULT: "#00D4AA",
          glow: "rgba(0,212,170,0.15)",
        },
        space: {
          DEFAULT: "#030712",
          lighter: "#080f1f",
          surface: "#0d1526",
        },
        era: {
          republic: "#6D28D9",
          highrepublic: "#0EA5E9",
          empire: "#EF4444",
          newrepublic: "#3B82F6",
          firstorder: "#374151",
        },
      },
      fontFamily: {
        display: ["var(--font-orbitron)", "monospace"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      backgroundImage: {
        "space-gradient":
          "radial-gradient(ellipse at 50% 0%, rgba(77,172,255,0.08) 0%, transparent 60%), radial-gradient(ellipse at 100% 100%, rgba(109,40,217,0.06) 0%, transparent 50%), #030712",
        "gold-shimmer":
          "linear-gradient(90deg, transparent 0%, rgba(255,232,31,0.4) 50%, transparent 100%)",
        "sith-gradient": "linear-gradient(135deg, #1a0000 0%, #3d0000 100%)",
        "jedi-gradient": "linear-gradient(135deg, #001a33 0%, #00336b 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-glow": "pulseGlow 2.5s ease-in-out infinite",
        shimmer: "shimmer 3s linear infinite",
        "spin-slow": "spin 20s linear infinite",
        "fade-in": "fadeIn 0.6s ease forwards",
        "slide-up": "slideUp 0.6s ease forwards",
        "warp-in": "warpIn 1s ease forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseGlow: {
          "0%, 100%": {
            boxShadow: "0 0 20px rgba(255,232,31,0.2), 0 0 40px rgba(255,232,31,0.05)",
          },
          "50%": {
            boxShadow: "0 0 40px rgba(255,232,31,0.4), 0 0 80px rgba(255,232,31,0.15)",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        warpIn: {
          "0%": { opacity: "0", transform: "scaleX(0.3) scaleY(1.5)" },
          "60%": { opacity: "1", transform: "scaleX(1.05) scaleY(0.97)" },
          "100%": { opacity: "1", transform: "scaleX(1) scaleY(1)" },
        },
      },
      boxShadow: {
        gold: "0 0 20px rgba(255,232,31,0.3), 0 0 60px rgba(255,232,31,0.1)",
        "gold-lg": "0 0 40px rgba(255,232,31,0.5), 0 0 100px rgba(255,232,31,0.2)",
        sith: "0 0 20px rgba(255,34,34,0.3), 0 0 60px rgba(255,34,34,0.1)",
        jedi: "0 0 20px rgba(77,172,255,0.3), 0 0 60px rgba(77,172,255,0.1)",
        glass: "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.05)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
