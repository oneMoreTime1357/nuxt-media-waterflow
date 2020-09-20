import pkg from './package'

export default {
  mode: 'universal',
  target: 'static',
  router: {
    base: '/nuxt-media-waterflow/'
  },

  /*
  ** Headers of the page
  */
  head: {
    title: 'Nuxt waterflow project',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '视频media 瀑布流 短视频 excel' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      // { rel: 'stylesheet', type: 'text/css', href: '//ofe0v4nhm.qnssl.com/candy/css/bootstrap.min.css' },
      { rel: 'stylesheet', type: 'text/css', href: 'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/14.0.1/css/intlTelInput.css'}
    ],
    script: [
      { type:'text/javascript', src:'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js', defer: true },
      { type:'text/javascript', src:'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/13.0.3/js/intlTelInput.min.js', defer: true},
      { type:'text/javascript', src:'https://cdnjs.cloudflare.com/ajax/libs/intl-tel-input/13.0.3/js/utils.js', defer: true},
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#03AD8F' },
  env: {
    BUILD_ENV: process.env.BUILD_ENV
  },
  /*
  ** Global CSS
  */
  css: [
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    { src: '~/plugins/index', ssr: false }
  ],

  /*
  ** Nuxt.js modules
  */
  modules: [
  ],

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend(config, ctx) {
    }
  }
}
