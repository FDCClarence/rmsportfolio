window.tailwind = {
  ...(window.tailwind || {}),
  config: {
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        brand: "rgb(var(--brand) / <alpha-value>)",
        ink: "rgb(var(--ink) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
        canvas: "rgb(var(--canvas) / <alpha-value>)",
        "canvas-dark": "rgb(var(--canvas-dark) / <alpha-value>)",
      },
      fontFamily: {
        display: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      borderRadius: {
        DEFAULT: "0.5rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  },
};

