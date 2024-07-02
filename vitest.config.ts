import { defineConfig } from "vitest/config";
import vue from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vue()],
  test: {
    environment: "happy-dom",
    alias: {
      "~": "/",
    },
    setupFiles: ["./vitest-config/setup.ts"],
  },
});
