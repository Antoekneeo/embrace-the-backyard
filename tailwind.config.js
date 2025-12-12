/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3A5A40',
        accent: '#A3B18A',
        tan: '#C2A773',
        sand: '#EFE7DA',
        dark: '#1F2421',
      },
    },
  },
  plugins: [],
}