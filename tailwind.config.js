/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cream: "#FDECEE", // Vibrant Soft Pink instead of Cream
        beige: "#EADBC8",
        blush: "#E8CFCB",
        rose: "#D9B6B0",
        brown: "#C0392B", // Romantic Red
        "dark-text": "#641E16", // Deep Red for text
        gold: "#D6B98C",
      },
      fontFamily: {
        handwritten: ["'Dancing Script'", "cursive"],
        clean: ["'Nunito'", "sans-serif"],
      },
      boxShadow: {
        'soft': '0 4px 15px -3px rgba(139, 107, 97, 0.1), 0 4px 6px -2px rgba(139, 107, 97, 0.05)',
        'paper': '2px 2px 10px rgba(0, 0, 0, 0.05)',
      },
      rotate: {
        '1': '1deg',
        '2': '2deg',
        '3': '3deg',
        '-1': '-1deg',
        '-2': '-2deg',
        '-3': '-3deg',
      }
    },
  },
  plugins: [],
}
