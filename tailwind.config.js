/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Poppins : ['Poppins', 'sans-serif'],
        Inter: ['Inter', 'sans-serif'],
      },
      colors : {
        primary : '#FF725E', //main nav color
        secondary: '#FFFFFF', //  white
        onPrimary : "#3C3C3C", // main text color
        onSecondary : "#F6F6F6",//  fields bgcolor 
        placeHolder: '#828282', // placeholder color
        secMain : '#F33434'
      }
    },
  },
  plugins: [],
}

