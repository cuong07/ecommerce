/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    keyframes: {
      "slide-right": {
        "0%": {
          transform: "translateX(-500px);",
        },
        "100%": {
          transform: "translateX(0);",
        },
      },
      "slide-left": {
        "0%": {
          transform: "translateX(500px);",
        },
        "100%": {
          transform: "translateX(0);",
        },
      },
      "slide-left2": {
        "0%": {
          transform: "translateX(-100px);",
        },
        "100%": {
          transform: "translateX(0);",
        },
      },
    },
    animation: {
      "slide-right":
        "slide-right 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
      "slide-left":
        "slide-left 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
      "slide-left2":
        "slide-left2 0.5s cubic-bezier(0.250, 0.460, 0.450, 0.940) both;",
    },
  },
  plugins: [],
};
