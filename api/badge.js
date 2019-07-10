import {_axiosApi, _formatParams} from './common'


/**
 * 获取徽章列表
 * @param options: 参数对象集合
 * return promise对象
 */
let getBadgeList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/task/my_badge_list.php', options));


/**
 * 获取徽章详情列表
 * @param options: 参数对象集合
 * @param badge_id: Number (必选) 徽章ID
 * return promise对象
 */
let getBadgeDetailList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/task/badge_info.php', options));



/**
 * 佩戴或取消佩戴徽章
 * @param options: 参数对象集合
 * @param badge_id: Number (必选) 徽章ID
 * @param type: Number (必选) 徽章类型
 * return promise对象
 */
let setUseBadge = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/task/badge_wear.php', options));





export default (axios) => ({
  getBadgeList: getBadgeList(axios),
  getBadgeDetailList: getBadgeDetailList(axios),
  setUseBadge: setUseBadge(axios),
})
