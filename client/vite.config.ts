import path from "path";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";
import federation from "@originjs/vite-plugin-federation";

export default defineConfig({
  plugins: [
    react(),
    federation({
      name: "app",
      remotes: {
        remoteApp:
          "https://endearing-cat-7a823d.netlify.app/assets/remoteEntry.js",
      },
      shared: ["react", "react-dom", "tailwindcss-animate"],
    }),
  ],
  build: {
    modulePreload: false,
    target: "esnext",
    minify: true,
    cssMinify: true,
    cssCodeSplit: false,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
