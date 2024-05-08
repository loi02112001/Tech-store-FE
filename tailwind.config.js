// tailwind.config.js
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    container: {
      center: true,
      padding: {
        DEFAULT: "16px",
        md: "24px",
        xl: "80px",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
}
