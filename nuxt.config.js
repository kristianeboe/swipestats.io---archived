const path = require('path');

module.exports = {
  mode: 'universal',
  /*
   ** Headers of the page
   */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: process.env.npm_package_description || '',
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
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [],
  /*
   ** Nuxt.js dev-modules
   */
  devModules: [],
  /*
   ** Nuxt.js modules
   */
  modules: [
    '@nuxtjs/pwa',
    'nuxt-webfontloader',
    'nuxt-purgecss',
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
    },
    extend(config, ctx) {},
  },
};
