/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: 'hsl(210, 80%, 50%)',
        accent: 'hsl(130, 60%, 45%)',
        surface: 'hsl(210, 20%, 100%)',
        bg: 'hsl(210, 20%, 95%)',
        'text-primary': 'hsl(210, 20%, 10%)',
        'text-secondary': 'hsl(210, 20%, 40%)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
      },
      boxShadow: {
        'card': '0 4px 12px hsla(210, 20%, 10%, 0.1)',
      },
      spacing: {
        'sm': '8px',
        'md': '12px',
        'lg': '16px',
      },
    },
  },
  plugins: [],
}