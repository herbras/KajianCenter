import UnoCSS from "unocss/astro";
import { defineConfig } from 'astro/config';
import svelte from "@astrojs/svelte";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  integrations: [svelte(), UnoCSS()],
  output: "server",
  adapter: vercel()
});
