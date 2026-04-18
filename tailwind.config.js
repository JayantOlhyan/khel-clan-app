/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#1D6A36",
        gold: "#D4860A",
        black: "#1A1A1A",
        gray: {
          400: "#888888", // Light Gray
          600: "#4A4A4A", // Body Gray
        },
        white: "#FFFFFF",
        muted: "#F2F7F4", // Muted Green BG
        error: "#D85A30",
        success: "#1D9E75",
      },
      fontFamily: {
        heading: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      borderRadius: {
        xl: "12px", // Card border-radius (mobile)
      },
    },
  },
  plugins: [],
}
