// import { themeConfig } from '../shared/theme'
import {resolve} from "path";

export default {
  // Disable server-side rendering: https://go.nuxtjs.dev/ssr-mode
  ssr: false,

  // Target: https://go.nuxtjs.dev/config-target
  target: 'static',

  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    titleTemplate: '%s - Venue',
    title: 'iVent Pro',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' },
      { name: 'format-detection', content: 'telephone=no' },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      {
        rel:'stylesheet', href:'https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.13.4/theme/bespin.css'
      },
      { rel:'stylesheet', href: 'https://api.reciteme.com/assets/3.3.3/css/recite.css' }
    ],

    script: [
      {
        src: "/config.js",
      },
      {
        src: 'https://player.live-video.net/1.8.0/amazon-ivs-player.min.js'
      },
      {
        src: 'https://api.reciteme.com/asset/js?key=d1ae05f17488d11ecae96767e7b74e5b7735387a'
      },
    ],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ['~/assets/main.scss'],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
    '@nuxtjs/i18n',

    // config file
    [
      '~/modules/copyFile',
      {
        from: './config.js',
        to: './static/config.js'
      }
    ],
  ],


  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    // retrieve the Partition and
    { src: '~/plugins/partition' },

    // restricted app - WAF
    { src: '~/plugins/restricted' },

    // amplify plugin
    { src: `~/plugins/amplify.js`, mode: 'client', ssr: false },

    // set up the apis connection management
    { src: '~/plugins/api' },

    // set up the sockets connection management
    { src: '~/plugins/socket'},

    // init the modules
    { src: '~/plugins/init' },

    // configure i18n
    { src: '~/plugins/i18n' },

    // set up and load the Me (Profile)
    { src: '~/plugins/me' },

    // set up and load the User (Auth - using Cognito)
    { src: '~/plugins/user' },

    { src: '~/plugins/exLibraries' },

    // vue directives injected as global directives to use in components
    // { src: '~/plugins/directives' },
  ],


  loadingIndicator: '~/static/loading.html',
  // loadingIndicator: {
  //   name: 'circle',
  //   color: '#3B8070',
  //   background: 'white'
  // },

  /**
   * Use to reorder the loading of plugins
   *
   * @param plugins
   * @return {*}
   */
  extendPlugins(plugins) {
    return plugins;
  },

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/vuetify
    '@nuxtjs/vuetify',
  ],

  alias: {
    '@': resolve(__dirname, '.'),
    '~': resolve(__dirname, '.'),

    '~modules': resolve(__dirname, './modules'),
  },



  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    // Workaround to avoid enforcing hard-coded localhost:3000: https://github.com/nuxt-community/axios-module/issues/308
    baseURL: '/',
  },

  i18n: {
    detectBrowserLanguage: {
      useCookie: true,
      cookieKey: 'i18n_redirected',
      redirectOn: 'root',  // recommended
    },
    locales: [], // ['en', 'fr', 'es'],
    defaultLocale: null, // 'en',
    strategy: 'no_prefix',
    vueI18n: {
      silentTranslationWarn: true,
      silentFallbackWarn: true,
      fallbackLocale: null, // 'en',
      messages: {
        // en: {
        //   welcome: 'Welcome',
        // },
        // fr: {
        //   welcome: 'Bienvenue',
        // },
        // es: {
        //   welcome: 'Bienvenido',
        // },
      },
    },
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
    analyze: false, // enabled this property if you need to analyse the nuxt built app.
    extend(config){
      config.externals = [
        {
          'config': 'config',
        }
      ]


      /**
       * In order to use non-precompiled Vue templates inside Pro Editor (WYSIWYG).
       * Error info: You are using the runtime-only build of Vue where the template compiler is not available
       * @link: https://dev.to/patarapolw/vue-runtime-compiler-for-arbitary-markdown-4602
       */
      config.resolve.alias.vue = 'vue/dist/vue.common'

      config.module.rules.push({
        test: /content\/.+\.md$/,
        use: {
          loader: 'raw-loader',
          options: {
            esModule: false
          }
        }
      })
    },
    transpile: ['vuetify/lib', 'tiptap-vuetify']
  },

  // Vuetify module configuration: https://go.nuxtjs.dev/config-vuetify
  //
  // @link https://codecondo.com/10-material-design-color-palette-generators-2/
  // @link https://codecrafted.net/randommaterial/
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      dark: false,
      options: {
        customProperties: true
      },
      themes: {
        light: {
          primary: '#0D0D4F', // '#79D3CA', // PRIMARY
          secondary: '#F3C452', // '#D4FCF5', //'#8CD1C9', // SECONDARY
          // accent: '#FFFFFF', // TERTIARY? ALTERNATIVE PRIMARY COLOUR
          error: '#B10C0B', // RED
          info: '#3644C9', // LIGHT BLUE
          success: '#77C054', // GREEN
          warning: '#F3C452', // YELLOW
        },
        dark: {
          primary: '#79D3CA', //#e91e63 // '#FF5722', // '#9c27b0', // '#8dd2c9', // '#0D0D4F', // PRIMARY
          secondary: '#7b1fa2', // '#D4FCF5', //'#8CD1C9', // SECONDARY
          // accent: '#40c4ff', // '#5af158', // '#FFFFFF', // TERTIARY? ALTERNATIVE PRIMARY COLOUR
          // primary: '#20163b', //'#264653',  // '#55557F', // PRIMARY
          // secondary: '#d6a9e4', // '#e9c46a', // SECONDARY
          // accent: '#762d58', // '#9C89FF', // TERTIARY? ALTERNATIVE PRIMARY COLOUR
          error: '#FFC7C2', // '#963130', // RED
          info: '#8EA4DA', // LIGHT BLUE
          success: '#2a9d8f', //'#99AD90', // GREEN
          warning: '#D5C296', // YELLOW
          anchor: '#FFFFFF',
          background: '#F8F8F8',

          dark: '#424242', // colors.grey.darken3,
        },
      },
    },
  },

  router: {
    // middleware: 'router',
    // middleware: 'isSetup',
    // extendRoutes(routes, resolve) {
    //   routes.push(
    //     // {
    //     //   name: "forgot-password",
    //     //   path: "/forgot-password",
    //     //   component: resolve(sharedNuxtDir, 'pages/forgot-password.vue')
    //     // },
    //     {
    //       name: "not-authorized",
    //       path: "/not-authorized",
    //       component: resolve(sharedNuxtDir, 'pages/not-authorized.vue')
    //     },
    //     {
    //       name: "require-new-password",
    //       path: "/require-new-password",
    //       component: resolve(sharedNuxtDir, 'pages/require-new-password.vue')
    //     },
    //     // {
    //     //   name: "sign-in",
    //     //   path: "/sign-in",
    //     //   component: resolve(sharedNuxtDir, 'pages/sign-in.vue')
    //     // },
    //     {
    //       name: "sign-up",
    //       path: "/sign-up",
    //       component: resolve(sharedNuxtDir, 'pages/sign-up.vue')
    //     },
    //     {
    //       name: "sign-up-confirm",
    //       path: "/sign-up-confirm",
    //       component: resolve(sharedNuxtDir, 'pages/sign-up-confirm.vue')
    //     },
    //   )
    // }
  },

  // @todo how does this affect venue config?
  // publicRuntimeConfig: {
  //   dailyApiKey: process.env.DAILY_API_KEY,
  //   dailyApiBaseUrl: process.env.DAILY_API_BASE_URL || 'https://api.daily.co/v1',
  // },

  server: {
    port: 3001
  }
}
