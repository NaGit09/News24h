import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from "path"
import tailwindcss from "@tailwindcss/vite"
// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "src"),
    },
  },
  server: {
    proxy: {
      // Proxy handle rss
      "/api/rss": {
        target: "https://cdn.24h.com.vn/upload",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\/rss/, "/rss"),
      },
      // Proxy handle article
      "/api": {
        target: "https://www.24h.com.vn/",
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/api\//, ""),
      },
    },
  },
});
