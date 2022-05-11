module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: "media", // or false or 'class'
  content: [
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    container: {
      padding: {
        DEFAULT: '1rem',
        sm: '2rem',
        lg: '10rem',
        xl: '14rem',
        '2xl': '18rem',
      },
    },
    extend: {},
  },
  plugins: [],
}
