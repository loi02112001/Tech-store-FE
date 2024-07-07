// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff8e29',
          hover: '#d73211',
          100: '#fff4ea',
          500: '#ff8e29',
          700: '#d73211'
        },
        black: {
          DEFAULT: '#212529',
          100: '#f5f5f5',
          300: '#0000008a',
          500: '#212121',
          700: '#000000cc',
          900: '#212529'
        },
        white: {
          DEFAULT: '#ffffff',
          100: '#ffffff',
          500: '#f5f5f5'
        },
        gray: {
          DEFAULT: '#333e48',
          500: '#333e48'
        },
        red: {
          DEFAULT: '#ed1b24',
          500: '#ed1b24',
          700: '#bf081f'
        },
        blue: {
          DEFAULT: '#288ad6'
        }
      },
      fontSize: {
        medium: ['13px', { lineHeight: '21px' }]
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
