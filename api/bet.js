import {_axiosApi, _formatParams} from './common'


/**
 * 获取单场菠菜 导航列表
 * @param options: object (可选)
 * return promise对象
 */
let getBetSingleListNav = (axios) => (options) => _axiosApi(axios, _formatParams('/services/bet/web_bet_list.php', options))

/**
 * 获取单场菠菜列表
 * @param options: object (可选)
 * return promise对象
 */
let getBetSingleList = (axios) => (options) => _axiosApi(axios, _formatParams('/services/bet/bet_single_list.php', options))

/**
 * 获取组合菠菜列表
 * @param options: object (可选)
 * return promise对象
 */
let getBetGroupList = (axios) => (options) => _axiosApi(axios, _formatParams('/services/bet/group_bet_home.php', options))

/**
 * 获取 我的单场菠菜列表
 * @param options: object (可选)
 * return promise对象
 */
let getMyBetSingleList = (axios) => (options) => _axiosApi(axios, _formatParams('/services/bet/my_bet_single_list.php', options))

/**
 * 获取 我的组合菠菜列表
 * @param options: object (可选)
 * return promise对象
 */
let getMyBetGroupFollowList = (axios) => (options) => _axiosApi(axios, _formatParams('/services/bet/my_group_bet_follow_list.php', options))

/**
 * 菠菜投注
 * @param options: {
 *    bet_id: Number (必选) 菠菜ID
 *    bet_item_id: Number (必选) 菠菜投注项ID
 *    price: Number (必选) 出价果子数量
 * }
 * return promise对象
 */
let setBet = (axios) => (options) => _axiosApi(axios, _formatParams('/services/bet/member_bet.php', options))


/**
 * 组合菠菜投注
 * @param options: {
 *    bet_group_id: Number (必选) 组合菠菜ID
 * }
 * return promise对象
 */
let setFollowGroupBet = (axios) => (options) => _axiosApi(axios, _formatParams('/services/bet//group_follow.php', options))

/**
 * 组合菠菜创建
 * @param options: {
 *    bet_id: Number (必选) 菠菜ID
 *    bet_item_id: Number (必选) 菠菜投注项ID
 *    price: Number (必选) 出价果子数量
 * }
 * return promise对象
 */
let addGroupBet = (axios) => (options) => _axiosApi(axios, _formatParams('/services/bet/group_bet_add.php', options))

/**
 * 获取菠菜投注项
 * @param options: 参数对象集合
 * @param bet_item_id: Number (必选) 菠菜投注项ID
 * return promise对象
 */
let getBetItem = (axios) => (options) => _axiosApi(axios, _formatParams('/services/bet/bet_select_item.php', options))


/**
 * 获取菠菜的赛事列表
 * @param options: 参数对象集合
 * return promise对象
 */
let getBetNavBar = (axios) => (options) => _axiosApi(axios, _formatParams('/services/bet/bet_navbar.php', options))



/**
 * 获取菠菜的赛事列表
 * @param options: 参数对象集合
 * return promise对象
 */
let getMemberBetList = (axios) => (options) => _axiosApi(axios, _formatParams('/services/bet/member_bet_list.php', options))


/*-------------------暂时缺接口--------------------*/
/**
 * 获取菠菜投注列表
 * @param options: 参数对象集合
 * return promise对象
 */
// let getBetRankList = (axios) => (options) => _axiosApi(axios, _formatParams('/services/bet/bet_rank_list.php', options))

/*-------------------结束--------------------*/


export default (axios) => ({
  getBetSingleListNav: getBetSingleListNav(axios),
  getBetSingleList: getBetSingleList(axios),
  getBetGroupList: getBetGroupList(axios),
  getMyBetSingleList: getMyBetSingleList(axios),
  getMyBetGroupFollowList: getMyBetGroupFollowList(axios),
  setBet: setBet(axios),
  setFollowGroupBet: setFollowGroupBet(axios),
  addGroupBet: addGroupBet(axios),
  getBetItem: getBetItem(axios),
  getBetNavBar:getBetNavBar(axios),
  // getBetRankList: getBetRankList(axios),  // 暂时缺接口
  getMemberBetList: getMemberBetList(axios)  //
})
