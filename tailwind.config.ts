import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        surface: "var(--surface)",
        "surface-card": "var(--card)",
        "surface-hover": "var(--surface-hover)",
        border: "var(--card-border)",
        "border-focus": "var(--border-focus)",
        volt: {
          300: "#4ADE80",
          400: "#00E676",
          500: "#10B981",
          600: "#059669",
        },
        titanium: {
          50: "#F4F6F9",
          100: "#E2E8F0",
          200: "#CBD5E1",
          700: "#1F293D",
          800: "#111726",
          900: "#0B0F17",
          950: "#060910",
        },
        crimson: {
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
        },
        cyan: {
          400: "#22D3EE",
          500: "#00F0FF",
        },
        ruby: {
          400: "#FF4D79",
          500: "#FF3366",
          600: "#E01B52",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "monospace"],
      },
      animation: {
        "pulse-subtle": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow-cyan": "glowCyan 2s ease-in-out infinite alternate",
      },
      keyframes: {
        glowCyan: {
          "0%": { boxShadow: "0 0 15px rgba(0, 240, 255, 0.15)" },
          "100%": { boxShadow: "0 0 25px rgba(0, 240, 255, 0.35)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
