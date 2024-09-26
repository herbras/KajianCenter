import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import UnoCSS from "unocss/astro";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), UnoCSS()],
  vite: {
    build: {
      rollupOptions: {
        external: ["moment"]
      }
    }
  },
  output: "server",
  adapter: vercel()
});