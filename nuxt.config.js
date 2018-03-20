module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: ['~/assets/css/main.css'],
  /*
  ** Add axios globally
  */
  build: {
    vendor: ['axios', 'element-ui'],
    /*
    ** Run ESLINT on save
    */
    extend (config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  },
  axios: {
    proxyHeaders: false,
    credentials: false,
    baseURL: `http://localhost:5000/api/v1/`,
    requestInterceptor: (config, {store}) => {
      config.headers.common['Authorization'] = 'Bearer ' + store.state.token
      return config
    },
    retry: true
  },
  modules: [
    'bootstrap-vue/nuxt',
    '@nuxtjs/axios',
    '@nuxtjs/font-awesome'
  ],
  plugins: [
    {src: '~/plugins/jquery', ssr: false},
    {src: '~/plugins/bootstrap', ssr: false},
    {src: '~plugins/element-ui'}
  ]
}
