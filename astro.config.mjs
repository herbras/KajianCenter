import UnoCSS from "unocss/astro";
import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import removeConsole from 'vite-plugin-remove-console';
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [UnoCSS(), react(), svelte()],
  output: "server",
  vite: {
    plugins: [
      removeConsole({
        includes: ['log', 'warn', 'error'],
      })
    ]
  },
  adapter: vercel()
});