import UnoCSS from "unocss/astro";
import { defineConfig } from 'astro/config';
import vercel from "@astrojs/vercel/serverless";

import react from "@astrojs/react";

import svelte from "@astrojs/svelte";

// https://astro.build/config
export default defineConfig({
  integrations: [UnoCSS(), react(), svelte()],
  output: "server",
  adapter: vercel()
});