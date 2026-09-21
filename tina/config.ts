import { defineConfig } from 'tinacms';

export default defineConfig({
  branch: process.env.TINA_BRANCH || process.env.HEAD || 'main',
  clientId: process.env.TINA_CLIENT_ID || null,
  token: process.env.TINA_TOKEN || null,
  build: {
    outputFolder: 'admin',
    publicFolder: 'public',
  },
  media: {
    tina: {
      mediaRoot: 'uploads',
      publicFolder: 'public',
    },
  },
  schema: {
    collections: [
      {
        label: 'Homepage',
        name: 'home',
        path: 'src/content/home',
        format: 'json',
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => '/',
        },
        fields: [
          {
            type: 'string',
            name: 'heroBody',
            label: 'Hero Body',
            ui: { component: 'textarea', description: 'The H1 "Computer Repairs Brisbane" is locked and not editable here — it drives real Google rankings, see SEO-BASELINE.md before ever changing it.' },
          },
          { type: 'string', name: 'introBody', label: 'Intro Strip Text', ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'services',
            label: 'What We Fix (cards)',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title }) },
            fields: [
              { type: 'string', name: 'icon', label: 'Icon (emoji)' },
              { type: 'string', name: 'title', label: 'Title' },
              { type: 'string', name: 'body', label: 'Body', ui: { component: 'textarea' } },
            ],
          },
          {
            type: 'object',
            name: 'whyUs',
            label: 'Why Choose Reboot (items)',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.title }) },
            fields: [
              { type: 'string', name: 'title', label: 'Title' },
              { type: 'string', name: 'body', label: 'Body', ui: { component: 'textarea' } },
            ],
          },
          { type: 'string', name: 'ctaHeading', label: 'Closing CTA Heading' },
          { type: 'string', name: 'ctaBody', label: 'Closing CTA Body' },
        ],
      },
      {
        label: 'About Page',
        name: 'about',
        path: 'src/content/about',
        format: 'json',
        ui: {
          allowedActions: { create: false, delete: false },
          router: () => '/about',
        },
        fields: [
          { type: 'string', name: 'heroHeading', label: 'Hero Heading' },
          { type: 'string', name: 'heroBody', label: 'Hero Body', ui: { component: 'textarea' } },
          {
            type: 'object',
            name: 'sections',
            label: 'Body Sections',
            list: true,
            ui: { itemProps: (item) => ({ label: item?.heading }) },
            fields: [
              { type: 'string', name: 'heading', label: 'Heading' },
              { type: 'string', name: 'body', label: 'Body', ui: { component: 'textarea' } },
              {
                type: 'string',
                name: 'bullets',
                label: 'Bullet Points (optional)',
                list: true,
              },
            ],
          },
          { type: 'string', name: 'ctaHeading', label: 'Closing CTA Heading' },
          { type: 'string', name: 'ctaBody', label: 'Closing CTA Body' },
        ],
      },
    ],
  },
});
