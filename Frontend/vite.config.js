import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import { LocalApi } from "./utills";
import { ProductionApi } from "./utills";
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "https://baggagebugs-81tp.onrender.com/api/v1",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api/, ""),
      },
    },
  },
  plugins: [tailwindcss()],
});
