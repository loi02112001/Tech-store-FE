// tailwind.config.js
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xs: '376px',
      sm: '640px',
      md: '768px',
      'md-max': { max: '767px' },
      'md-checkout': { min: '1000px' },
      lg: '1024px',
      'lg-max': { max: '1023px' },
      xl: '1200px',
      'xl-max': { max: '1199px' },
      '2xl': '1600px',
      '3xl': '1536px'
    },
    extend: {
      colors: {
        primary: {
          DEFAULT: '#ff8e29',
          hover: '#d73211'
        },
        black: {
          DEFAULT: '#212529',
          700: '#000000cc',
          900: '#212529'
        },
        white: {
          DEFAULT: '#ffffff',
          100: '#fbfbfb',
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
        },
        customBackground: {
          DEFAULT: '#f4f4f4'
        }
      },
      boxShadow: {
        DEFAULT: '0 1px 2px 0 rgba(60, 64, 67, 0.1), 0 2px 6px 2px rgba(60, 64, 67, 0.15)'
      },
      fontSize: {
        medium: ['13px', { lineHeight: '21px' }]
      },
      maxWidth: {
        md: '704px',
        lg: '925px',
        xl: '1290px',
        xxl: '1440px'
      },
      borderColor: {
        DEFAULT: '#dadada'
      },
      zIndex: {
        1: '1',
        2: '2',
        3: '3',
        4: '4',
        5: '5',
        6: '6',
        7: '7',
        8: '8',
        9: '9'
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
