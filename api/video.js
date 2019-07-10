import {_axiosApi, _formatParams} from './common'

/**
 * 获得短视频分类数据
 * @param options: object {method: 'post', params: {}}
 * return promise对象
 */
let shortTypeList = (axios) => (options) => _axiosApi(axios, _formatParams('/services/video/shortVideo_cateList.php', options))

/**
 * 获得短视频数据
 * @param options: object {method: 'post', params: {}}
 * return promise对象
 */
let shortList = (axios) => (options) => _axiosApi(axios, _formatParams('/services/video/shortVideo_list.php', options))

/**
 * 赛事详情页视频列表
 * @param options: object {method: 'post', params: {tournamentID, type, page}}
 * @param options: object {method, params}
 * @param options.method: string (get || post)
 * @param options.params: object {tournamentID, type, page}
 * @param options.params.tournamentID:
 * @param options.params.type:
 * @param options.params.page:
 * return promise对象
 */
let tournamentVideoList = (axios) => (options) => _axiosApi(axios, _formatParams('/services/match/web_tournament_video_list.php', options))



export default (axios) => ({
  shortTypeList: shortTypeList(axios),
  shortList: shortList(axios),
  tournamentVideoList: tournamentVideoList(axios)
})
