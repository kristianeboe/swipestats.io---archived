const path = require('path');

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: 'Visualize your tinder data | Swipestats.io',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content:
          'See how you stack up against other Tinder users across the world',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content:
          'See how you stack up against other Tinder users across the world',
      },
      {
        hid: 'og:image',
        property: 'og:image',
        content: '/swipestats-logo.png',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
  },
  /*
   ** Customize the progress-bar color
   */
  loading: { color: '#FE3C72' },
  /*
   ** Global CSS
   */
  css: [
    '~assets/scss/tailwind.scss',
    '~assets/scss/swipestats.scss',
    '~assets/scss/filepond.scss',
    //'filepond/dist/filepond.min.css',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    'nuxt-webfontloader',
    // 'nuxt-purgecss',
    '@nuxtjs/toast',
  ],
  toast: {
    position: 'bottom-right',
    register: [
      // Register custom toasts
      {
        name: 'success-parsed',
        message: 'Success!! File parsed :)',
        options: {
          type: 'success',
        },
      },
    ],
  },
  webfontloader: {
    google: {
      families: ['Lato:400,700'], //Loads Lato font with weights 400 and 700
    },
  },
  pwa: {
    manifest: {
      name: 'Swipestats.io',
      short_name: 'Swipestats',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
      theme_color: '#fe3c72',
      background_color: '#ffffff',
      display: 'standalone',
    },
  },
  /*
   ** Build configuration
   */
  build: {
    /*
     ** You can extend webpack config here
     */
    extractCSS: true,
    postcss: {
      plugins: {
        tailwindcss: path.resolve(__dirname, './tailwind.config.js'),
      },
    },
    purgeCSS: {
      mode: 'postcss',
      whitelistPatterns: [/filepond$/],
      whitelistPatternsChildren: [/filepond$/],
    },
    extend(config, ctx) {},
  },
};
