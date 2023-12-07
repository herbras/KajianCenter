import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import UnoCSS from "unocss/astro";

import cloudflare from "@astrojs/cloudflare";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), UnoCSS()],
  output: "server",  vite: {
    build: {
      rollupOptions: {
        external: ["moment"]
      }
    }
  },
  adapter: cloudflare()
});