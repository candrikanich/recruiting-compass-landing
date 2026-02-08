# Landing Site - The Recruiting Compass

Marketing landing site for the baseball recruiting tracker application.

## Quick Start

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Configure environment:**
   ```bash
   cp .env.example .env
   # Edit .env with your Typeform form ID
   ```

3. **Run development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run generate
   ```

## Directory Structure

```
landing/
├── assets/
│   └── css/main.css          # Tailwind CSS with custom components
├── components/
│   └── icons/               # Reusable icon components
├── layouts/
│   └── default.vue          # Default layout
├── pages/
│   └── index.vue            # Homepage
├── public/                  # Static assets
├── app.vue                  # Root component
├── nuxt.config.ts           # Nuxt configuration
├── package.json             # Dependencies
└── tailwind.config.cjs      # Tailwind CSS configuration
```

## Configuration

### Typeform Integration

1. Get your Typeform form ID from your Typeform dashboard
2. Add it to your `.env` file:
   ```
   TYPEFORM_FORM_ID=your-form-id
   ```

### Domain Configuration

The site is configured for:
- **Landing Site**: `therecruitingcompass.com` (this site)
- **App**: `myrecruitingcompass.com` (main application)

## Development

### Styling

- Uses Tailwind CSS with custom color scheme
- Primary colors: Blue theme with baseball accent colors
- Components defined in `assets/css/main.css`
- Icons in `components/icons/`

### Build Process

- Static Site Generation (SSG) configured
- Pre-renders all pages for optimal performance
- SEO optimized meta tags

## Deployment

This site is deployed to **Vercel** via GitHub Actions. Push to `develop` for staging; use the "Deploy to Production" workflow for production. See `docs/VERCEL_SETUP.md` for setup.

### Environment Variables Required

- `TYPEFORM_FORM_ID` - Your Typeform form ID
- `NUXT_PUBLIC_SITE_URL` - Landing site domain
- `NUXT_PUBLIC_APP_URL` - Main app domain

## Features

- ✅ Mobile responsive design
- ✅ SEO optimized
- ✅ Typeform integration
- ✅ Family-focused messaging (players and parents)
- ✅ Cross-domain CTAs to main app
- ✅ Static site generation for fast loading

## Next Steps

1. Replace compass logo placeholder with actual logo
2. Add your Typeform form ID
3. Configure domain and deploy
4. Set up analytics tracking
5. Add additional pages as needed