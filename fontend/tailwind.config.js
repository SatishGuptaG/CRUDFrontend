/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      Roboto: ["Roboto", "sans-serif"],
      Poppins: ['Poppins', "sans-serif"],
    },
    extend: {
      screens: {
        "1000px": "1050px",
        "1100px": "1110px",
        "800px": "800px",
        "1300px": "1300px",
        "400px":"400px"
      },
      // colors: {
      //   primary: '#007bff',  // Your main brand color
      //   'primary-dark': '#0056b3',
      //   'success': '#28a745',
      //   'danger': '#dc3545',
      //   'gray-light': '#f8f9fa',
      // },
    },
  },
  darkMode: 'class',
  plugins: [],
};