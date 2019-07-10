import {_axiosApi, _formatParams} from './common'



/**
 * 获取我的钱包
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getMyBank = (axios) => (options) => _axiosApi(axios, _formatParams('/services/userCenter/my_bank.php', options));






export default (axios) => ({
  getMyBank: getMyBank(axios), //我的钱包
})
