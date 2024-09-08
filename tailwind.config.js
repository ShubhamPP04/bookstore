// tailwind.config.js
module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      backgroundColor: {
        'app-bg': '#EFEDE2',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
