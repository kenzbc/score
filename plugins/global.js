// plugins/global.js
import Vue from 'vue'
import datefilters from '~/filters/date-filters';
import cdnfilters from '~/filters/cdn-filters';
import stringFileters from '~/filters/string-filters';
import mixin from '~/mixins'

// 注册日期过滤器
Object.keys(datefilters).forEach(key => {
  Vue.filter(key, datefilters[key])
});

// 注册CDN工具过滤器
Object.keys(cdnfilters).forEach(key => {
  Vue.filter(key, cdnfilters[key])
});

// 注册string工具过滤器
Object.keys(stringFileters).forEach(key => {
  Vue.filter(key, stringFileters[key])
});

// 全局mixin
Vue.mixin(mixin);

// 注册一个全局自定义指令 `v-focus`
Vue.directive('focus', {
  // 当被绑定的元素插入到 DOM 中时 focus
  inserted: function (el) {
    // 聚焦元素
    el.focus()
  }
})

// 是否移动端
// if (process.browser) {
//   if (!Vue.hasOwnProperty('isMobile')) {
//     Vue.prototype.isMobile = window.innerWidth < 768 ? 1 : 0
//   }
// }


