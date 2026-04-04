import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        cyan: "hsl(var(--cyan))",
        purple: "hsl(var(--purple))",
        "neon-green": "hsl(var(--neon-green))",
        "neon-red": "hsl(var(--neon-red))",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        orbitron: ["var(--font-orbitron)", "monospace"],
        space: ["var(--font-space-mono)", "monospace"],
        syne: ["var(--font-syne)", "sans-serif"],
      },
      animation: {
        "fade-up": "fadeUp 0.7s ease forwards",
        blink: "blink 1.4s ease-in-out infinite",
        float: "float 4s ease-in-out infinite",
        scan: "scan 2s ease-in-out infinite",
        marquee: "marquee 22s linear infinite",
        "modal-in": "modalIn 0.35s cubic-bezier(0.34, 1.56, 0.64, 1) forwards",
        "orb-drift-1": "orbDrift1 20s ease-in-out infinite",
        "orb-drift-2": "orbDrift2 25s ease-in-out infinite",
        "orb-drift-3": "orbDrift1 15s ease-in-out infinite reverse",
      },
      keyframes: {
        fadeUp: {
          from: { opacity: "0", transform: "translateY(32px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.3" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        scan: {
          "0%": { top: "0", opacity: "0" },
          "10%": { opacity: "1" },
          "90%": { opacity: "1" },
          "100%": { top: "100%", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        modalIn: {
          from: { opacity: "0", transform: "scale(0.92) translateY(20px)" },
          to: { opacity: "1", transform: "scale(1) translateY(0)" },
        },
        orbDrift1: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(-60px, 50px)" },
        },
        orbDrift2: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "50%": { transform: "translate(50px, -60px)" },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
