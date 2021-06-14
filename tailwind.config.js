const colors = require('tailwindcss/colors')

const defaultTheme = require('tailwindcss/defaultTheme');
const { readBuilderProgram } = require('typescript');

const fontFamily = defaultTheme.fontFamily;
fontFamily['sans'] = [
  'Roboto', // <-- Roboto is a default sans font now
  'system-ui',
  // <-- you may provide more font fallbacks here
];

module.exports = {
  purge: [],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      transparent: 'transparent',
      black: '#303030',
      white: '#FAFAFA',
      gray: '#424242',
      grayText: 'rgba(255,255,255,0.7)',
      green: '#2A9D8F',
      green: {
        100: '#D5FAE8',
        200: '#ADF5D8',
        300: '#7EE1C3',
        400: '#58C4AD',
        500: '#2A9D8F',
        600: '#1E8783',
        700: '#156B71',
        800: '#0D4F5B',
        900:'#083A4B'
      },
      red : '#E09F7D',
    fontFamily: {
      sans: ['Lato','Helvetica','sans-serif'],
      serif: ['Merriweather', 'serif'],
      'Lato': '"Lato", Helvetica, Arial, sans-serif',
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
}}