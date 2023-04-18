import { defineConfig } from 'astro/config';
import tailwindIntegration from '@astrojs/tailwind';

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwindIntegration(), react()]
});