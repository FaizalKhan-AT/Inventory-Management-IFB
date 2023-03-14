import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: "Ultracare IFB",
        short_name: "Ultracare IFB",
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
        scope: "/",
        start_url: "/",
        icons: [
          {
            src: "/maskable_icon.png",
            type: "image/png",
            sizes: "393x393",
            purpose: "any maskable",
          },
          {
            src: "/icon-192.png",
            type: "image/png",
            sizes: "192x192",
          },
          {
            src: "/icon-256.png",
            type: "image/png",
            sizes: "256x256",
          },
          {
            src: "/icon-384.png",
            type: "image/png",
            sizes: "384x384",
          },
          {
            src: "/icon-512.png",
            type: "image/png",
            sizes: "512x512",
          },
        ],
      },
    }),
  ],
});
