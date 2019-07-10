import {_axiosApi, _formatParams} from './common'


/**
 * 奖励果子
 * @param axios
 * @returns {function(*=): *}
 */
let bmAddGuozi = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/bar/bm_guozi_add.php', options));

/**
 * 奖励果子
 * @param axios
 * @returns {function(*=): *}
 */
let bmCloseMember = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/bar/close_member.php', options));

/**
 * 删除评论
 * @param axios
 * @returns {function(*=): *}
 */
let bmDeal = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/bar/bm_deal.php', options));



export default (axios) => ({
  bmAddGuozi: bmAddGuozi(axios),  // 奖励果子
  bmCloseMember: bmCloseMember(axios),  // 奖励果子
  bmDeal: bmDeal(axios),  // 删除评论
})
