import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

// The sitemap is generated from the route list at build time, and Cloudflare
// Pages rebuilds on every push — so adding a page or editing content publishes
// an updated sitemap.xml automatically. Nothing to maintain by hand.
//
// `site` must stay on the www host: that is the canonical the homepage declares
// and the hostname that holds the rankings. A sitemap listing the apex would
// contradict the canonical tags.
export default defineConfig({
  site: 'https://www.rebootyourcomputer.com.au',
  outDir: './dist',
  publicDir: './public',
  integrations: [
    sitemap({
      // The 404 page has no business in a sitemap.
      filter: (page) => !page.includes('/404'),
      changefreq: 'weekly',
      lastmod: new Date(),
    }),
  ],
  vite: {
    ssr: {
      external: ['tinacms'],
    },
  },
});
