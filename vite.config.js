import path, { resolve } from "path";
import { defineConfig } from "vite";
import { fileURLToPath } from "url";
import { libInjectCss } from "vite-plugin-lib-inject-css";
import react from "@vitejs/plugin-react";

const __filename = fileURLToPath(import.meta.url);

const __dirname = path.dirname(__filename);

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), libInjectCss()],
  build: {
    lib: {
      entry: resolve(__dirname, "lib/main.js"),
      fileName: "main",
      name: "cool-props-monitoring",
      formats: ["es"],
    },
    copyPublicDir: false,
    rollupOptions: {
      external: ["react", "react-dom"],     
      output: {        
        globals: {
          react: "React",
          "react-dom": "ReactDOM",
        },
      },
    },
  },
});
