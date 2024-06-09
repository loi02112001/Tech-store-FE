// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D19C97',
        black: {
          DEFAULT: '#212529'
        },
        white: '#FFFFFF',
        indigo: {
          500: '#6f6f6f'
        },
        secondary: '#EDF1FF',
        blue: {
          DEFAULT: '#3874ff',
          hover: '#004DFF'
        }
      }
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '16px',
        md: '24px',
        xl: '80px'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
}
