/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1DAA4B", // vibrant neon green for dark mode
        gold: "#D4860A",
        black: "#111111",
        gray: {
          400: "#888888",
          600: "#CCCCCC",
        },
        white: "#0A0A0A",
        muted: "#111111", // deep dark background
        error: "#D85A30",
        success: "#1D9E75",
      },
      fontFamily: {
        heading: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        xl: "12px",
      },
    },
  },
  plugins: [],
}
