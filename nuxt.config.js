import colors from 'vuetify/es5/util/colors'

export default {
  loading: true,
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - vimu',
    title: 'vimu',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'vimu is the modern way to analyse your music. It provides a rich toolbox for researchers, students and enthusiasts.' },
      { name: 'format-detection', content: 'telephone=no' }
    ],
    htmlAttrs: { lang: 'en' },
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ],
    script: [
      {
      },
    ],
  },

  publicRuntimeConfig: {
    pocketbaseURL: process.env.POCKETBASE_URL,
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
    '~/assets/rete.scss',
    '~/assets/content.scss'
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    '~/plugins/axios.ts',
    { src: '~/plugins/infinite-scroll.ts', mode: 'client' },
    { src: '~/plugins/pocketbase.ts' }
  ],

  router: {
    middleware: 'auth'
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    '@nuxt/typescript-build',
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/vuetify',
    '@nuxt/content',
    '@nuxtjs/sitemap',
    '@nuxt/image',
    'cookie-universal-nuxt',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: process.env.API_URL,
    progress: false
  },

  vuetify: {
    treeShake: true,
    customVariables: ['~/assets/variables.scss'],
    defaultAssets: { font: false, icons: 'mdi' },
    theme: {
      light: true,
      themes: {
        light: {
          primary: '#000000',
          accent: '#2962FF',
          secondary: '#FFC629',
          info: colors.teal.lighten1,
          warning: colors.amber.base,
          error: colors.red.accent3,
          success: colors.green.accent4,
        }
      }
    }
  },

  content: {
    markdown: {
      remarkAutolinkHeadings: {
        behavior: 'wrap',
        linkProperties: { ariaHidden: 'true', tabIndex: -1, class: 'content-heading-link' },
      }
    }
  },

  sitemap: {
    hostname: process.env.APP_URL,
    exclude: [
      '/dashboard/**',
      '/oauth'
    ],
    routes: [
      '/docs/tutorials/get-started',
      '/docs/dashboard',
      '/docs/dashboard/files',
      '/docs/dashboard/shared',
      '/docs/dashboard/scores',
      '/docs/editor',
      '/docs/editor/overview',
      '/docs/editor/node-panel',
      '/docs/editor/output-panel',
      '/docs/editor/plot-panel',
      '/docs/editor/details-panel',
      '/docs/editor/menu',
      '/docs/account',
      '/docs/account/general',
      '/docs/account/editor',
      '/docs/account/subscription',
    ]
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    babel: {
      "presets": [
        "@babel/preset-env",
      ],
      "plugins": [
        ["@babel/transform-runtime"]
      ]
    },
    transpile: [
      'rete-area-plugin',
      'osmd-audio-player',
      'pocketbase'
    ],
  },

  server: {
    host: "0.0.0.0",
    port: process.env.PORT || 3000,
  },
}
