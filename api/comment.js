import {_axiosApi, _formatParams} from './common'

/**
 * 添加评论
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let add = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/dynamic_comment_insert.php', options))

/**
 * 评论列表
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let list = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/dynamic_comment_list.php', options))

/**
 * 热门评论列表
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let hotsList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/dynamic_comment_all_hot_list.php', options))

/**
 * 评论回复列表
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let replyList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/dynamic_comment_reply_list.php', options))

/**
 * 评论点赞
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let praise = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/dynamic_comment_praise.php', options))

/**
 * 取消评论点赞
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let unPraise = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/dynamic_comment_praise_cancel.php', options))

/**
 * 文字直播列表
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let textLiveList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/dynamic_text_live.php', options))

/**
 * 设置评论喜欢或不喜欢
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let like = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/dynamic_comment_dislike.php', options))

/**
 * AMA评论列表
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let amaList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/ama_comment_list.php', options))

/**
 * AMA评论推荐、删除、禁言1小时、取消推荐
 * @param options: object (可选) {method: 'post', params: {}}
 * return promise对象
 */
let edit = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/dynamic/ama_op.php', options))


export default (axios) => ({
  add: add(axios),  // 添加评论
  list: list(axios),  // 评论列表
  hotsList: hotsList(axios),  // 热门评论列表
  replyList: replyList(axios),  // 评论回复列表
  praise: praise(axios),  // 评论点赞
  unPraise: unPraise(axios),  // 取消评论点赞
  textLiveList: textLiveList(axios),  // 文字直播列表
  like: like(axios),  // 设置评论喜欢或不喜欢
  amaList: amaList(axios),  // AMA评论列表
  edit: edit(axios)  // AMA评论推荐、删除、禁言1小时、取消推荐
})
