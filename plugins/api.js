import createApi from '~/api'

/**
 * API接口请求统一处理
 * @description NUXT客户端与服务端内建插件
 * @param $axios http请求插件
 * @param inject
 */
export default ({$axios}, inject) => {
  // console.log(app)
  const api = createApi($axios);
  inject('api', api)
}
