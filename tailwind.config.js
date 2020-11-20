module.exports = {
  purge: [
    "./content/**/*.md",
    "./components/**/*.js",
    "./pages/**/*.js",
    "./pages/**/*.mdx",
  ],
  darkMode: false,
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
