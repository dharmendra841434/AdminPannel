// tailwind.config.js
module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      spacing: {
        72: "15rem",
      },
      colors: {
        doc: "#10407F",
        gold: "#FFD500",
        background: "#F8FAFB",
        greenBtn: "#28A879",
        redBtn: "#EA1A4F",
        greyText: "#98A9BC",
        darkBlue: "#091336",
        hoverSideBar: "#D8E4FB52",
        borderColor: "#005FF8",
        yellowColor: "#FFD500",
        sideBarBtn: "#005FF8",
        media: "#ADBFDF",
      },
      borderRadius: {
        normal: "5px",
      },
    },
    fontFamily: {
      "SF-Pro": ["SF-Pro", "sans-serif"],
    },
  },
  variants: {
    extend: {
      fontFamily: ["hover", "focus"],
    },
    dropShadows: {
      "3xl": "0 35px 35px rgba(0, 0, 0, 0.25)",
    },
  },
  plugins: [],
  corePlugins: {
    fontFamily: true,
  },
};
