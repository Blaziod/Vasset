module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "custom-blue": "rgba(0, 92, 153, 0.05)",
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
