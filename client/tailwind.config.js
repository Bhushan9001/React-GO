// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// }

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        'barlow-condensed': ['Barlow Condensed', 'sans-serif'],
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
}