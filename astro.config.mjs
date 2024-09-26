import UnoCSS from "unocss/astro";
import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";

import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
<<<<<<< HEAD
  integrations: [svelte(), UnoCSS()]
=======
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
>>>>>>> 16204fcfdcac25386c96a42c0d8856c346a648ae
});