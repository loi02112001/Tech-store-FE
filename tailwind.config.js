// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#D19C97',
        black: {
          DEFAULT: '#212529',
          500: '#212121',
          600: '#000000cc',
          700: '#0000008a'
        },
        indigo: {
          500: '#6f6f6f'
        },
        secondary: '#EDF1FF',
        blue: {
          DEFAULT: '#3874ff',
          hover: '#004DFF',
          100: '#05a'
        },
        white: {
          DEFAULT: '#ffffff',
          500: '#f5f5f5'
        }
      }
    },
    fontFamily: {
      sans: ['helvetica', 'sans-serif']
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
