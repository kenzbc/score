import {_axiosApi, _formatParams} from './common'


/**
 * 获得圈子列表数据
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getCircleList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/circle/web_circle_list.php', options))

/**
 * 圈子首页右侧数据
 * @param axios
 * @returns {function(*=): *}
 */
let getCircleInfo = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/circle/circle_info.php', options))



/**
 * 分享帖子时选择的圈子列表
 * @param axios
 * @returns {function(*=): *}
 */
let getSelectCircleList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/circle/select_circle_list.php', options))



/**
 * 加入圈子
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let setJoinCircleAttention = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/member/attention_circle.php', options))


/**
 * 退出圈子
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let setCancelCircleAttention = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/member/cancel_attention_circle.php', options))




export default (axios) => ({
  getSelectCircleList: getSelectCircleList(axios),  // 分享帖子时选择的圈子列表
  getCircleList: getCircleList(axios),  // 获得圈子列表数据
  getCircleInfo: getCircleInfo(axios),  // 圈子首页右侧数据
  setJoinCircleAttention: setJoinCircleAttention(axios),  // 加入圈子
  setCancelCircleAttention: setCancelCircleAttention(axios),  // 退出圈子
})
