/* eslint-disable @typescript-eslint/no-var-requires */
// const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    container: {
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1356px'
      },
      padding: {
        DEFAULT: '12px',
        sm: '0'
      }
    },
    extend: {
      colors: {
        'color-primary': '#FFCC00',
        'color-primary-active': '#FCD535',
        'color-secondary': '#009B4D',
        'color-third': '#FAF5E9',
        'color-white': '#ffffff',
        'color-black': '#000000',
        'color-text-light': '#feffff',
        'color-text-dark': '#1e2329',
        'color-text-gray-light': '#9CA3AF',
        'color-text-gray-dark': '#6B7280',
        'color-success': '#03a66d',
        'color-info': '#17a2b8',
        'color-warning': '#ffc107',
        'color-danger': '#cf304a',
        'color-bg-dark-primary': '#1d1e23',
        'color-bg-dark-secondary': '#121215',
        'color-border-primary-light': '#374151',
        'color-border-primary-dark': '#3435391a'
      },
      fontSize: {
        10: '10px',
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        22: '22px',
        24: '24px',
        26: '26px',
        28: '28px',
        30: '30px',
        32: '32px',
        34: '34px',
        36: '36px',
        38: '38px',
        40: '40px'
      }
    }
  },
  plugins: []
}
