import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    colors: {
      blue: "#16abf8",
    },
    extend: {},
  },
  plugins: [flowbite.plugin()],
};
