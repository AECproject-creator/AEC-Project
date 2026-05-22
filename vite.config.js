import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0"
  },
  build: {
    sourcemap: false,
    chunkSizeWarningLimit: 950,
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom") || id.includes("react-router-dom")) {
            return "vendor";
          }

          if (id.includes("gsap") || id.includes("lenis") || id.includes("framer-motion")) {
            return "animation";
          }

          if (id.includes("react-icons")) {
            return "icons";
          }

          if (id.includes("three")) {
            return "three";
          }
        }
      }
    }
  }
});
