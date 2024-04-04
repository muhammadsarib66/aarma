/** @type {import('tailwindcss').Config} */
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
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
});

// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//   ],
//   theme: {
//     extend: {
//       fontFamily: {
//         Poppins : ['Poppins', 'sans-serif'],
//         Inter: ['Inter', 'sans-serif'],
//       },
//       colors : {
//         primary : '#FF725E', //main nav color
//         secondary: '#FFFFFF', //  white
//         onPrimary : "#3C3C3C", // main text color
//         onSecondary : "#F6F6F6",//  fields bgcolor 
//         placeHolder: '#828282', // placeholder color
//         secMain : '#F33434'
//       }
//     },
//   },
//   plugins: [],
// }

