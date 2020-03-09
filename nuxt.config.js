const path = require("path");

module.exports = {
  mode: "universal",
  /*
   ** Headers of the page
   */
  head: {
    title: "Visualize your tinder data | Swipestats.io",
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      {
        hid: "description",
        name: "description",
        content:
          "Upload your dating data anonymously and compare it to demographics from around the world!"
      },
      {
        hid: "og:title",
        name: "title",
        content: "Visualize your tinder data | Swipestats.io"
      },
      {
        hid: "og:description",
        name: "og:description",
        content:
          "Upload your dating data anonymously and compare it to demographics from around the world!"
      },
      {
        hid: "og:image",
        property: "og:image",
        content: "/swipestats-logo.png"
      }
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }]
  },
  /*
   ** Customize the progress-bar color
   */
  loading: {
    color: "#FE3C72"
  },
  /*
   ** Global CSS
   */
  css: [
    "~assets/scss/tailwind.scss",
    "~assets/scss/swipestats.scss",
    "~assets/scss/filepond.scss"
    //'filepond/dist/filepond.min.css',
  ],
  /*
   ** Plugins to load before mounting the App
   */
  plugins: [{ src: "~/plugins/hotjar", ssr: false }],
  /*
   ** Nuxt.js dev-modules
   */
  buildModules: ["@nuxtjs/google-analytics", "@nuxtjs/eslint-module"],
  googleAnalytics: {
    id: "UA-155039033-1"
  },
  /*
   ** Nuxt.js modules
   */
  modules: [
    "@nuxtjs/pwa",
    "nuxt-webfontloader",
    "@nuxtjs/sentry",
    "nuxt-logrocket",
    // 'nuxt-purgecss',
    "@nuxtjs/toast"
  ],
  sentry: {
    dsn: "https://86d0bff07b6b4bcd8013481479aa3b20@sentry.io/1871644", // Enter your project's DSN here
    config: {} // Additional config
  },
  logRocket: {
    logRocketId: "8zzlud/swipestatsio",
    devModeAllowed: false
  },
  toast: {
    position: "bottom-right",
    register: [
      // Register custom toasts
      {
        name: "success-parsed",
        message: "Success!! File parsed :)",
        options: {
          type: "success"
        }
      }
    ]
  },
  webfontloader: {
    google: {
      families: ["Lato:400,700"] //Loads Lato font with weights 400 and 700
    }
  },
  pwa: {
    manifest: {
      name: "Swipestats.io",
      short_name: "Swipestats",
      icons: [
        {
          src: "/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        }
      ],
      theme_color: "#fe3c72",
      background_color: "#ffffff",
      display: "standalone"
    }
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
        tailwindcss: path.resolve(__dirname, "./tailwind.config.js")
      }
    },
    purgeCSS: {
      mode: "postcss",
      whitelistPatterns: [/filepond$/],
      whitelistPatternsChildren: [/filepond$/]
    },
    // eslint-disable-next-line no-unused-vars
    extend(config, ctx) {}
  }
};
