import { defineConfig } from "vitest/config";

// Present so vitest does not walk up and load the site's vite.config.ts
// (which carries the React Router + Cloudflare plugins).
export default defineConfig({
  test: {
    include: ["test/**/*.test.ts"],
  },
});
