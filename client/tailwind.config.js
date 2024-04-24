/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      maxWidth: {
        "5%": "5%",
        "33%": "33%",
        "40%": "40%",
        "45%": "45%",
        "60%": "60%",
        "70%": "70%",
        "80%": "80%",
        "85%": "85%",
        "90%": "90%",
      },
      maxHeight: {
        "20%": "20%",
        "60%": "60%",
        "80%": "80%",
        "90%": "90%",
      },
      width: {
        "10%": "10%",
        "20%": "20%",
        "30%": "30%",
        "40%": "40%",
        "50%": "50%",
        "60%": "60%",
        "70%": "70%",
        "80%": "80%",
        "90%": "90%",
      },
    },
  },
  plugins: [],
};
