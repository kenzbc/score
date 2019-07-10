import Vue from 'vue'

import vueStarScore from 'vue-star-score'

import VueVideoPlayer from 'vue-video-player/dist/ssr'
import 'videojs-contrib-hls'

import WangEditor from 'wangeditor'
// import vuePerfectScrollbar from 'vue-perfect-scrollbar'




Object.defineProperty(Vue.prototype, '$wangEditor', { value: WangEditor });

Vue.use(VueVideoPlayer);
Vue.component('vueStarScore', vueStarScore);
// Vue.component('vuePerfectScrollbar', vuePerfectScrollbar);
