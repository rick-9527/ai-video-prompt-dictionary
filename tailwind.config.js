/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#090A0F",
        panel: "#11131A",
        panelSoft: "#171A23",
        line: "#262B38",
        cyan: "#4DD7F7",
        mint: "#63E6BE",
        amber: "#F7C66A",
      },
      fontFamily: {
        sans: [
          "Inter",
          "Microsoft YaHei",
          "PingFang SC",
          "Hiragino Sans GB",
          "Arial",
          "sans-serif",
        ],
      },
      boxShadow: {
        panel: "0 18px 60px rgba(0, 0, 0, 0.28)",
      },
    },
  },
  plugins: [],
};
