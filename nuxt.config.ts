export default defineNuxtConfig({
  devtools: { enabled: true },
  
  // Compatibility date
  compatibilityDate: '2026-01-10',
  
  // Static site generation
  nitro: {
    prerender: {
      routes: ['/']
    }
  },

  // CSS configuration
  css: ['~/assets/css/main.css'],

  // PostCSS configuration
  postcss: {
    plugins: {
      tailwindcss: {},
      autoprefixer: {},
    },
  },

  // App configuration
  app: {
    head: {
      title: 'The Recruiting Compass - Navigate Your Baseball Journey',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        { name: 'description', content: 'Helping high school baseball players and their families navigate the college recruiting process with confidence and clarity.' },
        { name: 'keywords', content: 'baseball recruiting, college baseball, high school baseball, recruiting tracker, baseball scholarship' },
        { name: 'author', content: 'The Recruiting Compass' },
        { property: 'og:title', content: 'The Recruiting Compass - Navigate Your Baseball Journey' },
        { property: 'og:description', content: 'Helping high school baseball players and their families navigate the college recruiting process with confidence and clarity.' },
        { property: 'og:type', content: 'website' },
        { property: 'og:url', content: 'https://therecruitingcompass.com' },
        { name: 'twitter:card', content: 'summary_large_image' },
        { name: 'twitter:title', content: 'The Recruiting Compass - Navigate Your Baseball Journey' },
        { name: 'twitter:description', content: 'Helping high school baseball players and their families navigate the college recruiting process.' }
      ],
      link: [
        { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
        { rel: 'preconnect', href: 'https://fonts.googleapis.com' },
        { rel: 'preconnect', href: 'https://fonts.gstatic.com', crossorigin: '' },
        { href: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap', rel: 'stylesheet' }
      ]
    }
  },

  // Runtime configuration
  runtimeConfig: {
    // Private keys (only available on server-side)
    typeformFormId: process.env.TYPEFORM_FORM_ID,
    
    // Public keys (exposed to client-side)
    public: {
      typeformUrl: 'https://form.typeform.com/to/'
    }
  }
})