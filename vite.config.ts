import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import checker from "vite-plugin-checker";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    checker({
      typescript: true,
    }),
  ],
  //@ts-ignore
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./testSetup.js",
  },
});
