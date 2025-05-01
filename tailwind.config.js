/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        // => @media (min-width: 500px)
        "max-xl": { max: "1279px" },
        // => @media (max-width: 1279px)
        "max-lg": { max: "1023px" },
        // => @media (max-width: 1023px)
        "max-md": { max: "767px" },
        // => @media (max-width: 767px)
        "max-sm": { max: "638px" },
        // => @media (max-width: 576px)
        "max-xs": { max: "500px" },
        // => @media (max-width: 500px)
        "max-ws": { max: "400px" },
        // => @media (max-width: 400px)
        "minmax-sm": { min: "501px", max: "638px" },
        // => @media (min-width: 640px and max-width: 767px)
        "minmax-md": { min: "638px", max: "767px" },
        // => @media (min-width: 768px and max-width: 1023px)
        "minmax-lg": { min: "768px", max: "1023px" },
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.8s ease-out forwards",
      },
    },
  },
  plugins: [],
};
