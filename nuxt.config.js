const isDev = process.env.NODE_ENV == "production" ? false : true;

module.exports = {
  globalName: 'score',
  port:3000,
  dev: isDev,  //这个很重要，true为开发模式(nuxt自己实现热加载)，false为生产模式
  devtools: !isDev, //配置是否允许 vue-devtools 调试

  buildDir: 'nuxt-dist', //Build 发布目录

  //缓存配置
  cache: {
    max: 1000,//缓存组件的最大数目，当第 1001 个组件被添加至缓存中时， 第一个被缓存的组件会从缓存中移除。
    maxAge: 900000//缓存时间，单位毫秒, 默认是 15 分钟。
  },
  parallel: true,

  /*
  ** Headers of the page
  */
  head: {
    title: `Score-陪你做电竞的记录者,伐木累_最宠粉的电竞幻联赛社区！`,
    meta: [
      {charset: 'utf-8'},
      {'http-equiv': 'pragma', content: 'no-cache'},
      {'http-equiv': 'cache-control', content: 'no-cache'},
      {'http-equiv': 'expires', content: '0'},
      {content: 'telephone=no', name: 'format-detection'},
      {name: 'viewport', content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0,user-scalable=no'},
      {name: 'renderer', content: `webkit|ie-comp|ie-stand`},
      {hid: 'keywords', name: 'keywords', content: `赛高,Score,电竞,玩家赛事,社区,LOL,英雄联盟,pubg,绝地求生,赛事视频,文字直播,韩服战绩查询`},
      {hid: 'description', name: 'description', content: `Score,用数据诠释赛事,用专业阐述观点,为热爱电竞的你提供最专业、快速、全面的赛事服务,无论你是喜欢电竞资讯还是赛事数据,当你打开Score会发现,这里就是电竞硬核玩家的乐园。`},
    ],
    script: [
      {src: '/static/lib/jquery-3.3.1.min.js'},
      {src: '/static/lib/blueimp-md5-2.10.0/js/md5.min.js'},
      {src: '/static/lib/swiper-4.5.0/js/swiper.min.js'},
      {src: '/static/lib/accordion.js'},
      {src: '//at.alicdn.com/t/font_1084121_7fws688dllv.js'},
      {src: '/static/lib/cropperjs-1.5.1/cropper.min.js'},
      {src: '/static/lib/layer-3.1.1/layer.js'},
      {src: '/static/lib/jquery-nanoscroller/js/jquery.nanoscroller.min.js'}
    ],
    link: [
      {rel: 'icon', type: 'image/x-icon', href: '/favicon.ico'},
      {rel: 'stylesheet', href: '/static/lib/iview-3.3.3/styles/iview.css'},
      {rel: 'stylesheet', href: '/static/lib/font-awesome-4.7.0/css/font-awesome.min.css'},
      {rel: 'stylesheet', href: '/static/lib/swiper-4.5.0/css/swiper.min.css'},
      {rel: 'stylesheet', href: '//at.alicdn.com/t/font_1084121_7fws688dllv.css'},
      {rel: 'stylesheet', href: '/static/lib/cropperjs-1.5.1/cropper.min.css'},
      {rel: 'stylesheet', href: '/static/lib/jquery-nanoscroller/css/nanoscroller.css'},
    ]
  },

  /*
  ** Customize the progress-bar color
  */
  loading: {color: '#218ff2'},
  //loading: '~/components/loading.vue',//自定义Loading页面

  //页面的过渡效果
  transition: {
    name: 'page',
    mode: 'out-in',
    beforeEnter (el) {
      console.log('Before enter...');
    }
  },

  /*
  ** Global CSS
  */
  css: [
    'video.js/dist/video-js.css'
  ],

  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
    {src: "~/plugins/route.js"},
    {src: "~/plugins/global.js"},
    {src: "~/plugins/axios.js"},
    {src: "~/plugins/api.js"},
    {src: "~/plugins/login.js"},
    {src: "~/plugins/i18n.js"},
    {src: "~/plugins/iview.js"},
    {src: "~/components/global.js"},
    {src: "~/plugins/moment.js"},
    {src: "~/plugins/components-client.js", mode: 'client'},
  ],
  generate: {},
  //配置路由中间件
  router: {
    middleware: 'i18n',
    // middleware: ['userAuth'],
    // base:"/en/"
    // base:"/"
  },

  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://github.com/nuxt-community/axios-module#usage
    '@nuxtjs/axios'
    // '@nuxtjs/proxy'
  ],

  proxy: {
    '/services/': {
      // target: 'https://dev-api.famulei.com'
      target: 'https://dev-api.famulei.com'
      // target: 'https://api-v2.famulei.com'
      //pathRewrite: { '^/services/' : ''}
    },
    '/img1json/': {
      target: 'https://img1.famulei.com',
      pathRewrite: { '^/img1json/' : ''}
    }
  },

  // router: {
  //   middleware: ['userAuth'],
  // },

  /*
  ** Axios module configuration
  */
  axios: {
    proxy: true,
    retry: { retries: 3 }
    // See https://github.com/nuxt-community/axios-module#options
  },

  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extractCSS: {allChunks: true},
    extend(config, {isDev, isClient}) {

    },
    // postcss: [
    //   require('postcss-px2rem')({
    //     remUnit: 75 // 转换基本单位
    //   })
    // ],
    vendor: ['axios'],
    // publicPath: 'https://img1.famulei.com', //默认: '/_nuxt/' 客户端CDN发布使用
    publicPath: '/static/', //web自己的地址访问
  }
};
