const JSON_PROXY_PATH = '/img1json'  // JSON请求的代理url前缀

/**
 * 接口调用（内部方法）
 * @param axios: axios (必选)
 * @param params: object (必选)
 * return promise对象
 */
let _axiosApi = (request, data) => {
  return request[data.TYPE](data.API_URL, data.PARAMS).then(resp => {
    return resp.data
  }, err => {
    throw err
  })
}

/**
 * 文件上传接口调用
 * @param _URL
 * @param params
 * @returns {Q.Promise<any>}
 * @private
 */
let _axiosFiles = (request, _URL, params) => {
  return request.post(_URL, params).then(resp => {
    return resp.data
  }, err => {
    throw err
  })
}

/**
 * 封装接口参数params
 * @param type: string
 * @param url: string
 * @param params: object
 * return Object
 */
let _formatParams = (url, options) => {
  const API_URL = typeof url === 'string' ? url : ''
  const TYPE = options && options.method ? options.method : 'get'
  const _params = options && options.params && Object.prototype.toString.call(options.params) === '[object Object]' ? options.params : {}
  let PARAMS = {}
  if (TYPE === 'post') {
    for (let key in _params) {
      PARAMS[key] = _params[key]
    }
  } else {
    PARAMS.params = _params
  }

  return {
    TYPE,
    API_URL,
    PARAMS
  }
}


export {
  JSON_PROXY_PATH,
  _formatParams,
  _axiosApi,
  _axiosFiles
}
