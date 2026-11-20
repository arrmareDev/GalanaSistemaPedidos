/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#2B2218",
          green2: "#1F1810",
          green3: "#3A2E1F",
          accent: "#F3E9D2",
          terracotta: "#9A7424",
          dark: "#1A1409",
          bg: "#FBF8F1",
        },
        surface: {
          DEFAULT: "#FAF9F6",
          card: "#FFFFFF",
          warm: "#F5F2EA",
          border: "#E8E2D3",
          border2: "#D3C9B2",
        },
        ink: {
          DEFAULT: "#1A1409",
          soft: "#2B2218",
          mid: "#5C4C33",
          muted: "#99886A",
          faint: "#BFB297",
        },
        // ── Aliases para componentes ──
        galana: {
          DEFAULT: "#A8802E",
          deep: "#8A6720",
          glow: "#C09A45",
          light: "rgba(168,128,46,0.10)",
        },
        cream: {
          DEFAULT: "#FFFAF5",
          warm: "#FFF5EE",
          card: "#FFFFFF",
          border: "#F0E8DC",
          strong: "#E8D8C8",
        },
        // ── Rojo de marca (POS / catálogo) — configurable desde el panel ──
        "brand-red": {
          // Como función: cuando Tailwind pide una versión con opacidad
          // (bg-brand-red/20, etc.), arma el rgba() usando la misma
          // variable --color-brand-primary-rgb que ya usa el resto de la
          // app — antes esto usaba var() directo, que Tailwind no puede
          // combinarle una opacidad, dejando esas clases sin pintar nada.
          DEFAULT: ({ opacityValue }) =>
            opacityValue === undefined
              ? "var(--color-brand-primary, #A8802E)"
              : `rgba(var(--color-brand-primary-rgb, 168, 128, 46), ${opacityValue})`,
          dark: "var(--color-brand-primary-dark, #8A6720)",
          light: "#F8F1E0",
        },
      },
      fontFamily: {
        display: ['"Playfair Display"', "serif"],
        body: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 4px rgba(168,128,46,0.06), 0 2px 8px rgba(168,128,46,0.04)",
        "card-lg": "0 4px 20px rgba(168,128,46,0.10)",
        "green-sm": "0 2px 12px rgba(168,128,46,0.25)",
        "green-md": "0 4px 24px rgba(168,128,46,0.35)",
        "green-lg": "0 8px 40px rgba(168,128,46,0.45)",
        "red-sm":
          "0 2px 12px rgba(var(--color-brand-primary-rgb, 168, 128, 46), 0.25)",
        "red-md":
          "0 4px 24px rgba(var(--color-brand-primary-rgb, 168, 128, 46), 0.35)",
      },
      borderRadius: {
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        shimmer: "shimmer 1.5s ease-in-out infinite",
        "scroll-promo": "scroll-promo 20s linear infinite",
        "pulse-soft": "pulse-soft 2s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%,100%": { opacity: "0.5" },
          "50%": { opacity: "1" },
        },
        "scroll-promo": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        "pulse-soft": {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0.6" },
        },
      },
    },
  },
  plugins: [],
};
