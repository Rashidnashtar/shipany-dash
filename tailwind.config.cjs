module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "main-blue": "var(--main-blue)",
        "secandary-blue": "var(--secandary-blue)",
        "main-gray": "var(--main-gray)",
        "main-border": "var(--main-border)",
        "main-red": "var(--main-red)",
        "secandary-red": "var(--secandary-red)",
        "main-yellow": "var(--main-yellow)",
        "main-bold": "var(--main-bold)",
        "main-skyblue": "var(--main-skyblue)",
        "main-gradient": "var(--main-gradient)",
        "main-bg-color": "var(--main-bg-color)",
        "main-transparent": "var(--main-trasparent)",
      },
      inset: {
        "-100%": "-100%",
        "280px": "280px",
      },
      width: {
        "280px": "280px",
      },
    },
  },
  plugins: [],
};
