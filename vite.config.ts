import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";
import { visualizer } from "rollup-plugin-visualizer";
import { defineConfig, loadEnv } from "vite";

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    plugins: [
      react(),
      tailwindcss(),
      visualizer({
        open: true,
      gzipSize: true,
      brotliSize: true,
    }),
  ],
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
      // Proxy handle tts
      "/api/tts": {
        target: "https://api.murf.ai/v1/speech/generate",
        changeOrigin: true,
        secure: false,
        rewrite: () => "",
        configure: (proxy) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader("api-key", env.VITE_MURF_KEY);
          });
        },
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
}});
