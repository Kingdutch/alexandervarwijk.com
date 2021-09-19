module.exports = {
  purge: [
    './content/**/*.md',
    './components/**/*.js',
    './pages/**/*.js',
    './pages/**/*.mdx',
  ],
  darkMode: 'media',
  plugins: [require('@tailwindcss/typography')],
};
