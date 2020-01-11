const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  prefix: "",
  important: false,
  separator: ":",
  theme: {
    extend: {
      fontFamily: {
        sans: ["Lato", ...defaultTheme.fontFamily.sans]
      },
      colors: {
        tinder: "#FE3C72"
      }
    }
  },
  variants: {},
  plugins: []
};
