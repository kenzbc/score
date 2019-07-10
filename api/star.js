import {_axiosApi, _formatParams} from './common'

/**获得俱乐部官方号信息**/
let getStarInfo = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/star/home.php', options));

/**获得俱乐部官方号列表数据**/
let getStarList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/star/category_list.php', options));


/**俱乐部官方号关注取消or关注**/
let setStarAttention = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/star/attention.php', options));


/**俱乐部官方号设置为最爱**/
let setStarLoved = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/star/set_loved.php', options));


/**俱乐部官方号 帖子列表**/
let getDynamicList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/star/dynamic_list.php', options));

/**俱乐部官方号 资讯列表**/
let getArticleList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/star/article_list.php', options));

/**俱乐部官方号 视频列表**/
let getVideoList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/star/video_list.php', options));

/**俱乐部官方号 签到排行榜**/
let getSignRankList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/star/star_sign_list.php', options));

/**俱乐部官方号 阵容**/
let getLineupList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/star/star_member_list.php', options));

/**俱乐部官方号 行程**/
let getTripList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/star/star_trip_list.php', options));



export default (axios) => ({
  getStarInfo:getStarInfo(axios),//获得俱乐部官方号信息
  getStarList:getStarList(axios),//获得俱乐部官方号列表数据
  setStarAttention:setStarAttention(axios),//俱乐部官方号关注取消or关注
  setStarLoved:setStarLoved(axios),//俱乐部官方号设置为最爱

  getDynamicList:getDynamicList(axios),//俱乐部官方号 帖子列表
  getArticleList:getArticleList(axios),//俱乐部官方号 资讯列表
  getVideoList:getVideoList(axios),//俱乐部官方号 视频列表
  getSignRankList:getSignRankList(axios),//俱乐部官方号 签到排行榜
  getLineupList:getLineupList(axios),//俱乐部官方号 阵容
  getTripList:getTripList(axios),//俱乐部官方号 行程
})
