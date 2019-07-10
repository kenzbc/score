import {_axiosApi, _formatParams} from './common'

/**
 * 帖子页，新帖列表
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getPostPageListData = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/dynamic_see_list.php', options));

/**
 * 帖子页，热帖列表
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getPostPageHotList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/bar/hot.php', options));

/**
 * 帖子页，右侧圈子推荐 和 活跃用户
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getPostSlideList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/bar/web_bar_content_slide.php', options));

/**
 * 我关注的帖子
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getFollowPostList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/home.php', options));

/**
 * 帖子关注页，右侧我关注的选手
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getAttentionTeamList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/member/member_attention_list.php', options));




/**
 * 举报用户
 * @param member_id: string (必选) 举报人member_id
 * @param report_type: string (必选) 举报类型： 1帖子 2 评论 3私信
 * @param report_reason: string (必选) 举报理由 1不友善行为 2垃圾或有害信息 3涉嫌侵权 4不实信息 5其他
 * @param reason_desc: string (可选) 举报理由补充
 * @param broadcast_id: string (必选) 举报对象member_id
 * @param upload_image: string (可选) 上传图片地址 私信举报时使用 多图以逗号分隔
 * @param object_id: string (必选) 举报帖子或评论id,私信举报时为被举报人member_id
 * return promise对象
 */
let setReport = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/common/report_member.php', options));



/**
 * 动态正文
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let details = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/dynamic_info.php', options))

/**
 * 发布动态
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let add = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/dynamic_add.php', options))

/**
 * 动态删除
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let del = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/dynamic_delete.php', options))

/**
 * 动态列表
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let dynamicList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/new_dynamic_list.php', options))

/**
 * 动态收藏
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let collect = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/dynamic_collect.php', options))

/**
 * 取消动态收藏
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let unCollect = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/cancel_dynamic_collect.php', options))

/**
 * 动态点赞
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let praise = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/dynamic_praise.php', options))

/**
 * 取消动态点赞
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let unPraise = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/dynamic_praise_cancel.php', options))

/**
 * 动态置顶
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let top = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/set_dynamic_top.php', options))

/**
 * 取消动态置顶
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let unTop = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/cancel_dynamic_top.php', options))

/**
 * 文章列表
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let articleList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/article_list.php', options))

/**
 * 推荐文章列表
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let recArticleList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/rec_article_list.php', options))

/**
 * 保存文章
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let save = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/save_article.php', options))

/**
 * 钻石打赏列表
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let diamondRewardList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/diamond_reward_list.php', options))

/**
 * 钻石打赏记录
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let diamondRewardLog = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/diamond_reward_log.php', options))

/**
 * 钻石打赏
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let diamondReward = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/diamond_reward.php', options))

/**
 * 投票
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let vote = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/vote_add.php', options))

/**
 * 圈子下的帖子列表
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let circleDynamicList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/circle_dynamic_list.php', options))

/**
 * 圈子下的热帖列表
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let circleHotDynamicList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/circle_hot_dynamic_list.php', options))

/**
 * 圈子下的明星帖子列表
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let circleStarDynamicList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('services/circle/circle_star_list.php', options))

/**
 * AMA帖子列表
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let amaList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/ama_list.php', options))






export default (axios) => ({
  getPostPageListData: getPostPageListData(axios), //帖子页，新帖列表
  getPostPageHotList: getPostPageHotList(axios), //帖子页，热帖列表
  getPostSlideList: getPostSlideList(axios), //帖子页，右侧圈子推荐 和 活跃用户
  getFollowPostList: getFollowPostList(axios), //我关注的帖子
  getAttentionTeamList: getAttentionTeamList(axios), //帖子关注页，右侧我关注的选手

  setReport: setReport(axios),//举报


  details: details(axios),  // 动态详情
  add: add(axios),  // 发布动态
  del: del(axios),  // 删除动态
  dynamicList: dynamicList(axios),  // 动态列表
  collect: collect(axios),  // 动态收藏
  unCollect: unCollect(axios),  // 动态收藏
  praise: praise(axios),  // 动态点赞
  unPraise: unPraise(axios),  // 取消动态点赞
  top: top(axios),  // 动态置顶
  unTop: unTop(axios),  // 取消动态置顶
  articleList: articleList(axios),  // 文章列表
  recArticleList: recArticleList(axios),  // 推荐文章列表
  save: save(axios),  // 文章保存
  diamondRewardList: diamondRewardList(axios),  // 钻石打赏列表
  diamondRewardLog: diamondRewardLog(axios),  // 钻石打赏记录
  diamondReward: diamondReward(axios),  // 钻石打赏
  vote: vote(axios),  // 投票
  circleDynamicList: circleDynamicList(axios),  // 圈子下帖子列表
  circleHotDynamicList: circleHotDynamicList(axios),  // 圈子下热帖列表
  circleStarDynamicList: circleStarDynamicList(axios),  // 圈子下的明星帖子列表
  amaList: amaList(axios),  // AMA帖子列表



})
