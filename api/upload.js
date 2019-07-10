import { _axiosFiles } from './common'

/**
 * 上传图片
 * @param params: object
 * return promise对象
 */
let image = (axios) => (params) => _axiosFiles(axios, '/services/common/upload_image.php', params)


export default (axios) => ({
  image: image(axios)
})
