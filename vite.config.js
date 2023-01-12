// vite.config.js
import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
  base: '/dist/index/html/',
  plugins: [
    svelte({
      /* plugin options */
    })
  ]
});