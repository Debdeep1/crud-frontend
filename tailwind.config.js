/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#0079FF",
          error: "FC2947",
          "base-100": "#ffffff",
        },
      },
      "light",
    ],
  },

  plugins: [daisyui],
};
