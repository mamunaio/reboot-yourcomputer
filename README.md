# Reboot Your Computer — Astro + TinaCMS

Fast, visually distinctive computer repair website built with Astro and TinaCMS visual editor.

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Environment

Create a `.env.local` file with TinaCMS credentials (you'll get these when setting up Tina Cloud):

```
TINA_CLIENT_ID=your_client_id
TINA_TOKEN=your_token
```

### 3. Run Locally

**For development with TinaCMS visual editor:**
```bash
npm run tina:dev
```

**For standard Astro development:**
```bash
npm run dev
```

The site will open at `http://localhost:3000`.

### 4. Build for Production

```bash
npm run build
```

Output goes to `/dist/`.

## Project Structure

```
reboot-astro/
├── src/
│   ├── pages/          # Astro pages (Homepage, Services, Contact, About)
│   ├── layouts/        # Layout components (header, footer, etc.)
│   ├── styles/         # Global CSS with Design 1 theming
│   └── components/     # Reusable components (if needed later)
├── public/             # Static assets (favicon, images, etc.)
├── tina/               # TinaCMS configuration
└── dist/               # Production build (generated)
```

## Pages

- **Home** (`/`) — Hero, services grid, why us section, CTA
- **Services** (`/services`) — Detailed service descriptions
- **About** (`/about`) — Company story and values
- **Contact** (`/contact`) — Contact form and phone/email

## Design Details

**Design System:** Vibrant Modern (Design 1)
- **Hero:** Red to dark red to blue gradient with decorative circles
- **Accent Color:** Red (#DC2626)
- **Secondary:** Orange (#F97316), Blue (#0284C7)
- **Typography:** Space Grotesk (display), Inter (body)
- **Cards:** Gradient top bar, hover lift effects

## TinaCMS Setup

TinaCMS allows visual editing of content without touching code. To set it up:

1. Create a Tina Cloud account at https://tina.io
2. Add your project
3. Set `TINA_CLIENT_ID` and `TINA_TOKEN` in `.env.local`
4. Run `npm run tina:dev`
5. Visit `http://localhost:3000/admin` to edit content

## Deployment

### Option 1: Cloudflare Pages

1. Push code to GitHub
2. Connect repository to Cloudflare Pages
3. Build command: `npm run build`
4. Output directory: `dist`
5. Cloudflare auto-deploys on every push

### Option 2: Netlify

1. Push code to GitHub
2. Connect to Netlify
3. Build command: `npm run build`
4. Publish directory: `dist`

## Key Files

- `src/styles/global.css` — All styling, color tokens, responsive design
- `src/layouts/Layout.astro` — Header, footer, base HTML structure
- `src/pages/index.astro` — Homepage with hero, services, why us sections
- `tina/config.ts` — TinaCMS visual editor configuration

## Phone Number

The phone number **07 3155 2002** appears only on the contact page (`src/pages/contact.astro`). It's not in the site header, so you can change it in one place if needed.

## Contact

- Phone: 07 3155 2002
- Email: info@rebootyourcomputer.com.au
- Website: https://rebootyourcomputer.com.au
