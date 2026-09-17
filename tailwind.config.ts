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
        background: "#070A13",
        surface: "#0D1322",
        "surface-card": "#11182B",
        "surface-hover": "#172138",
        border: "#1C2640",
        "border-focus": "#2E3D66",
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
