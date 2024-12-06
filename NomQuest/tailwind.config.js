/** @type {import('tailwindcss').Config} */
export default {
  content: [
      "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['Playfair Display', 'serif'], 
        serif: ['Source Sans 3', 'ui-sans-serif', 'system-ui'], 
      },
      colors: {
        primary: {
          DEFAULT: '#5e6d37',
          dark: '#546131', 
        },
        accent: {
          DEFAULT: '#bd6c24',
          dark: '#ae6321',
        },
        secondary: '#5f6d37',
        light: '#fefbde',
        dark: '#263717',
        earth: '#d29d5a',
        lava: '#613422',
        white: '#fefff1',
        danger: '#9f2f2f',
        success: '#9ACD32',
        info: '#00008B',

      },
    },
  },
  plugins: [],
}

