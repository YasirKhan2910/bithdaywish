/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: "#0a0612",
        "deep-rose": "#8b1a4a",
        rose: "#d4607a",
        "soft-pink": "#f2b8c6",
        gold: "#f0c070",
        "warm-white": "#f5e8e8",
        muted: "#9e8e9e",
        glass: "rgba(255,255,255,0.05)",
      },
      fontFamily: {
        serif: ["'Playfair Display'", "Georgia", "serif"],
        script: ["'Dancing Script'", "cursive"],
        sans: ["'Inter'", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        "radial-glow":
          "radial-gradient(ellipse at center, rgba(139,26,74,0.15) 0%, transparent 70%)",
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "float-slow": "float 10s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3s ease-in-out infinite",
        "star-twinkle": "twinkle 4s ease-in-out infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "heartbeat": "heartbeat 1.5s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-15px)" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(212,96,122,0.4)" },
          "50%": { boxShadow: "0 0 40px rgba(212,96,122,0.8), 0 0 80px rgba(212,96,122,0.3)" },
        },
        twinkle: {
          "0%, 100%": { opacity: "0.3", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.2)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        heartbeat: {
          "0%, 100%": { transform: "scale(1)" },
          "14%": { transform: "scale(1.15)" },
          "28%": { transform: "scale(1)" },
          "42%": { transform: "scale(1.1)" },
          "70%": { transform: "scale(1)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
