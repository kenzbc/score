import {_axiosApi, _formatParams, JSON_PROXY_PATH} from './common'


/**
 * 获取赛事信息 新
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选)
 * return promise对象
 */
let getMatchInfo = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/match/match_info_new.php', options));


/**
 * 比赛资讯列表
 * @param axios
 * @returns {function(*=): *}
 */
let getMatchCmsList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/match/match_cms_list.php', options));


/**
 * 获取赛评/预测列表
 * @param axios
 * @returns {function(*=): *}
 */
let getMatchForecastList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/match/match_forecast_list.php', options));


/**
 * 预测比赛输赢
 * @param axios
 * @returns {function(*=): *}
 */
let setMatchForecast = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/match/match_forecast.php', options));


/**
 * 预测（赛评）回复
 * @param axios
 * @returns {function(*=): *}
 */
let getForecastComment = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/match/forecast_comment.php', options));


/**
 * 预测（赛评）的回复列表
 * @param axios
 * @returns {function(*=): *}
 */
let getForecastCommentList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/match/forecast_comment_list.php', options));


/**
 * 预测（赛评）内容点赞
 * @param axios
 * @returns {function(*=): *}
 */
let setForecastPraise = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/match/forecast_praise.php', options));


/**
 * 预测（赛评）内容点赞取消
 * @param axios
 * @returns {function(*=): *}
 */
let setForecastPraiseCancel = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/match/forecast_praise_cancel.php', options));


/**
 * 赛后评论
 * @param axios
 * @returns {function(*=): *}
 */
let getMatchComment = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/match/match_comment.php', options));


/**
 * 想看预约
 * @param axios
 * @returns {function(*=): *}
 */
let setMatchRemind = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/match/match_remind.php', options));



/**
 * 话题列表
 * @param axios
 * @returns {function(*=): *}
 */
let getMatchTopicList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/match/match_topic_list.php', options));


/**
 * 左侧赛程列表
 * @param axios
 * @returns {function(*=): *}
 */
let getMatchScheduleList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/match/round_match_new_list.php', options));


/**
 * 赛前数据
 * @param options: object {method: 'post', params: {tournamentId}}
 * return promise对象
 */
let matchPreDataJson = (axios) => (options) => {
  const BASE_URL = axios.defaults.baseURL;
  let path = '/';

  if (BASE_URL.indexOf('staging-1') != -1) {
    path = '/stag1/'
  } else if (BASE_URL.indexOf('staging-2') != -1) {
    path = '/stag2/'
  } else if (BASE_URL.indexOf('staging-3') != -1) {
    path = '/stag3/'
  } else if (BASE_URL.indexOf('dev') != -1) {
    path = '/dev/'
  }
  const API_URL = `${JSON_PROXY_PATH}${path}match_pre/${options.params.matchId}.json`;

  return axios.get(API_URL).then(resp => {
    return resp.data
  }, err => {
    throw err
  })
}

/**
 * 赛后局数列表
 * @param options: object {method: 'post', params: {tournamentId}}
 * return promise对象
 */
let matchResultListJson = (axios) => (options) => {
  const BASE_URL = axios.defaults.baseURL;
  let path = '/';

  if (BASE_URL.indexOf('staging-1') != -1) {
    path = '/stag1/'
  } else if (BASE_URL.indexOf('staging-2') != -1) {
    path = '/stag2/'
  } else if (BASE_URL.indexOf('staging-3') != -1) {
    path = '/stag3/'
  } else if (BASE_URL.indexOf('dev') != -1) {
    path = '/dev/'
  }
  const API_URL = `${JSON_PROXY_PATH}${path}match/resultlist/${options.params.matchId}.json`;

  return axios.get(API_URL).then(resp => {
    return resp.data
  }, err => {
    throw err
  })
}

/**
 * 左侧栏队伍积分
 * @param options: object {method: 'post', params: {tournamentId}}
 * return promise对象
 */
let matchRoundPointsJson = (axios) => (options) => {
  const BASE_URL = axios.defaults.baseURL;
  let path = '/';

  if (BASE_URL.indexOf('staging-1') != -1) {
    path = '/stag1/'
  } else if (BASE_URL.indexOf('staging-2') != -1) {
    path = '/stag2/'
  } else if (BASE_URL.indexOf('staging-3') != -1) {
    path = '/stag3/'
  } else if (BASE_URL.indexOf('dev') != -1) {
    path = '/dev/'
  }
  const API_URL = `${JSON_PROXY_PATH}${path}match_round_points/${options.params.roundId}.json`;

  return axios.get(API_URL).then(resp => {
    return resp.data
  }, err => {
    throw err
  })
}


/**
 * 赛后数据详情
 * @param options: object {method: 'post', params: {tournamentId}}
 * return promise对象
 */
let matchResult = (axios) => (options) => {
  const BASE_URL = axios.defaults.baseURL;
  let path = '/';

  if (BASE_URL.indexOf('staging-1') != -1) {
    path = '/stag1/'
  } else if (BASE_URL.indexOf('staging-2') != -1) {
    path = '/stag2/'
  } else if (BASE_URL.indexOf('staging-3') != -1) {
    path = '/stag3/'
  } else if (BASE_URL.indexOf('dev') != -1) {
    path = '/dev/'
  }
  const API_URL = `${JSON_PROXY_PATH}${path}/match/result/${options.params.resultId}.json`;

  return axios.get(API_URL).then(resp => {
    return resp.data
  }, err => {
    throw err
  })
}


export default (axios) => ({
  getMatchInfo: getMatchInfo(axios),  // 获取赛事信息
  getMatchCmsList: getMatchCmsList(axios),  // 获取赛事资讯列表
  getMatchForecastList: getMatchForecastList(axios),  // 获取赛评/预测列表
  setMatchForecast: setMatchForecast(axios), //预测比赛输赢
  getForecastComment: getForecastComment(axios), //预测（赛评）回复
  getForecastCommentList: getForecastCommentList(axios),  // 获取预测评论列表
  setForecastPraise: setForecastPraise(axios), //预测（赛评）内容点赞
  setForecastPraiseCancel: setForecastPraiseCancel(axios), //预测（赛评）内容点赞取消
  getMatchComment: getMatchComment(axios), //赛后评论
  setMatchRemind: setMatchRemind(axios), //想看预约
  getMatchTopicList: getMatchTopicList(axios),  // 获取新帖/热帖列表
  getMatchScheduleList: getMatchScheduleList(axios),  // 左侧赛程列表

  matchPreDataJson: matchPreDataJson(axios), //赛前数据
  matchResultListJson: matchResultListJson(axios), //赛后数据
  matchRoundPointsJson: matchRoundPointsJson(axios), //左侧栏队伍积分
  matchResult: matchResult(axios), //赛后数据详情
})
