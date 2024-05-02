// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        white: {
          DEFAULT: "#ffffff",
          overlay: "rgba(255,255,255,0.5)",
        },
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
