/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        // 保留 campus 命名作为技术标识，配色调整为温暖适老化风格
        campus: {
          bg: "#FBF6EE",        // 温暖米白
          ink: "#3A2E26",       // 深暖棕（正文）
          muted: "#7A6B5E",     // 暖灰（次要文字）
          green: "#5BA17A",     // 柔和绿（可信 / 成功）
          greenSoft: "#E6F1EA",
          blue: "#4A8FA8",      // 柔和蓝（信息）
          blueSoft: "#E6F0F4",
          orange: "#E8893A",    // 暖橙（主色，温暖醒目）
          orangeSoft: "#FBE9D5",
          coral: "#E26D5C"      // 暖珊瑚（紧急 / 提醒）
        }
      },
      boxShadow: {
        soft: "0 16px 42px rgba(58, 46, 38, 0.08)",
        lift: "0 18px 50px rgba(232, 137, 58, 0.18)"
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Microsoft YaHei", "sans-serif"]
      },
      fontSize: {
        // 适老化：基础字号略放大
        sm: ["0.9rem", { lineHeight: "1.6" }],
        base: ["1.05rem", { lineHeight: "1.7" }]
      }
    }
  },
  plugins: []
};
