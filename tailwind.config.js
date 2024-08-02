/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B111B",
        "dash-text": "#424851",
        "list-hover": "#18212C",
        selected: "#F4F5F5",
      },
    },
  },
  plugins: [],
};
