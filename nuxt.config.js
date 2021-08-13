export default {
  // Disable server-side rendering (https://go.nuxtjs.dev/ssr-mode)
  ssr: false,
  mode: 'spa',
  server: {
    port: 3000,
    host: '0.0.0.0',
  },
  publicRuntimeConfig: {
    previewUrl:
      process.env.PREVIEW_URL ||
      'https://core.staging.becookies.tech/script.js',
  },

  // <script id="becookies.tech-scripts" async="" src="https://cookie.ghbank.co.th/script.js" data-id="61136fd2b28678b88b56a1ad" charset="utf-8"></script>
  head: {
    title: 'beCOOKIES',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.svg' }],
    script: [
      {
        id: 'becookies.tech-scripts',
        async: '',
        src: 'https://cookie.ghbank.co.th/script.js',
        'data-id': '61136fd2b28678b88b56a1ad',
        charset: 'utf-8',
      },
    ],
  },

  // Global CSS (https://go.nuxtjs.dev/config-css)
  css: ['@/assets/style/main.css'],

  // Plugins to run before rendering page (https://go.nuxtjs.dev/config-plugins)
  plugins: [
    '@/plugins/axios',
    '@/plugins/lang',
    '@/plugins/api',
    '@/plugins/base-component',
    '@/plugins/select',
    '@/plugins/toggle',
    '@/plugins/modal',
    '@/plugins/model',
    '@/plugins/notification',
    '@/plugins/vue-color',
    '@/plugins/apexCharts',
  ],

  loading: false,

  // Auto import components (https://go.nuxtjs.dev/config-components)
  components: false,

  // Modules for dev and build (recommended) (https://go.nuxtjs.dev/config-modules)
  buildModules: [
    // https://go.nuxtjs.dev/tailwindcss
    '@nuxtjs/tailwindcss',
  ],

  // Modules (https://go.nuxtjs.dev/config-modules)
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/proxy',
    'nuxt-i18n',
  ],

  // Axios module configuration (https://go.nuxtjs.dev/config-axios)
  axios: {
    baseURL:
      process.env.NODE_ENV == 'production'
        ? '/'
        : process.env.API || 'https://dev.becookies.tech',
    credentials: true,
    proxy: true, //process.env.NODE_ENV !== 'production',
  },

  proxy: {
    '/api': {
      target: process.env.API || 'https://dev.becookies.tech',
      // process.env.NODE_ENV == 'production'
      //   ? '/'
      //   : 'https://core.staging.becookies.tech',
      pathRewrite: { '^/api': '/api' },
    },
  },

  i18n: {
    // locales: ['th', 'en'],
    defaultLocale: 'th',
    locales: [
      { code: 'th', iso: 'th-TH', dir: 'ltr' },
      { code: 'en', iso: 'en-US', dir: 'ltr' },
    ],
    vueI18n: {
      messages: {
        th: require('./locales/th.json'),
        en: require('./locales/en.json'),
      },
    },
  },

  // Build Configuration (https://go.nuxtjs.dev/config-build)
  build: {},
}
