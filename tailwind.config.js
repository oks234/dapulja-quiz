module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#43AEBE"
      },
      height: {
        "mobile-header": "8vh",
        "mobile-footer": "20vh",
        "tablet-header": "6vh",
        "tablet-footer": "16vh",
      },
      minHeight: {
        "mobile-main": "72vh",
        "tablet-main": "78vh",
        "tablet-quiz": "94vh",
      },
    },
  },
  plugins: [],
};
