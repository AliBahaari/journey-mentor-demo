/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      screens: {
        sm: '375px',
        lg: '1440px',
      },
      fontFamily: {
        sans: ['Nunito Sans', 'Sans-serif'],
      },
      backgroundColor: {
        darkBlue: 'hsl(209, 23%, 22%)',
        veryDarkBlueDarkMode: 'hsl(207, 26%, 17%)',
        // veryDarkBlueLightMode: 'hsl(200, 15%, 8%)',
        // darkGray: 'hsl(0, 0%, 52%)',
        veryLightGray: 'hsl(0, 0%, 98%)',
        white: ' hsl(0, 0%, 100%)',
      },
      colors: {
        darkBlue: 'hsl(209, 23%, 22%)',
        veryDarkBlueDarkMode: 'hsl(207, 26%, 17%)',
        // veryDarkBlueLightMode: 'hsl(200, 15%, 8%)',
        // darkGray: 'hsl(0, 0%, 52%)',
        veryLightGray: 'hsl(0, 0%, 98%)',
        white: ' hsl(0, 0%, 100%)',
      },
    },
  },
  plugins: [],
}
