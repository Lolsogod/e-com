import path from "path"
import react from "@vitejs/plugin-react-swc"
import { defineConfig } from "vite"
import federation from '@originjs/vite-plugin-federation'
 
export default defineConfig({
  plugins: [
    react(),
    federation({
      name: 'app',
      remotes: {
        remoteApp: 'http://localhost:5001/assets/remoteEntry.js',
      },
      shared: [
        "lucide-react",
        "react",
        "react-dom",
        "tailwindcss-animate"
      ]
    })
  ],
  build: {
    modulePreload: false,
    target: 'esnext',
    minify: false,
    cssCodeSplit: false
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
})