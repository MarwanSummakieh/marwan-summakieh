import type { Config } from "tailwindcss";

export default {
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
        border: "hsl(var(--border))",
        ring: "hsl(var(--ring))",
        primary: "hsl(var(--primary))",
        muted: { foreground: "hsl(var(--muted-foreground))" },
        // MarwanOS brand
        wall: "var(--wall)",
        "wall-2": "var(--wall-2)",
        concrete: "var(--concrete)",
        "concrete-2": "var(--concrete-2)",
        line: "var(--line)",
        "line-strong": "var(--line-strong)",
        chalk: "var(--chalk)",
        "chalk-dim": "var(--chalk-dim)",
        "chalk-mute": "var(--chalk-mute)",
        tag: "var(--tag)",
        "tag-deep": "var(--tag-deep)",
        violet: "var(--violet)",
        indigo: "var(--indigo)",
        teal: "var(--teal)",
        sky: "var(--sky)",
        pink: "var(--pink)",
        peach: "var(--peach)",
        cream: "var(--cream)",
        ink: "var(--ink)",
        halo: "var(--halo)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-geist-sans)"],
        mono: ["var(--font-geist-mono)"],
        display: ["var(--font-display)", "var(--font-geist-sans)", "system-ui", "sans-serif"],
        marker: ["var(--font-geist-mono)"],
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        wiggle: "wiggle 3s ease-in-out infinite",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
