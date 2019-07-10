import {JSON_PROXY_PATH, _axiosApi, _formatParams} from './common'

/**
 * 获取网站首页聚合数据
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选) {op:send 发送验证码，op:check 验证验证码是否正确  }
 * return promise对象
 */
let getIndexData = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/common/web_index.php', options));


/**
 * 获取网站首页头部当前赛事列表
 * @param type: string (可选) get,post 默认get
 * @param params: object (可选) {op:send 发送验证码，op:check 验证验证码是否正确  }
 * return promise对象
 */
let getIndexTopMatchList = (axios) =>
  (options) =>
    _axiosApi(axios, _formatParams('/services/match/web_schedule_match_index_list.php', options));


/**
 * 获得赛事页数据
 * @param options: object {method: 'post', params: {}}
 * return promise对象
 */
let all = (axios) => (options) => _axiosApi(axios, _formatParams('/services/match/web_tournament_group_list.php', options))

/**
 * 获得赛事列表数据
 * @param options: object {method: 'post', params: {}}
 * return promise对象
 */
let list = (axios) => (options) => _axiosApi(axios, _formatParams('/services/match/tournament_list.php', options))

/**
 * 周最佳阵容数据
 * @param options: object {method: 'post', params: {cacheID, tournamentID}}
 * return promise对象
 */
let weekBestGroup = (axios) => (options) => _axiosApi(axios, _formatParams('/services/gamingDatabase/player_best_lineup.php', options))

/**
 * 参赛战队
 * @param options: object {method: 'post', params: {tournamentId}}
 * return promise对象
 */
let teams = (axios) => (options) => {
  const BASE_URL = axios.defaults.baseURL
  let path = '/match/teamrank/'

  if (BASE_URL.indexOf('staging-1') != -1 || BASE_URL.indexOf('staging-2') != -1 || BASE_URL.indexOf('staging-3') != -1) {
    path = '/match/teamrank/staging/'
  }
  const API_URL = `${JSON_PROXY_PATH}${path}${options.params.tournamentId}.json`
  return axios.get(API_URL).then(resp => {
    return resp.data
  }, err => {
    throw err
  })
}

/**
 * 获得赛事阶段
 * @param options: object {method: 'post', params: {tournamentId}}
 * return promise对象
 */
let wholeSchedule = (axios) => (options) => {
  const BASE_URL = axios.defaults.baseURL
  let path = '/tr/'

  if (BASE_URL.indexOf('staging-1') != -1) {
    path = '/stag1/tr/'
  } else if (BASE_URL.indexOf('staging-2') != -1) {
    path = '/stag2/tr/'
  } else if (BASE_URL.indexOf('staging-3') != -1) {
    path = '/stag3/tr/'
  }
  const API_URL = `${JSON_PROXY_PATH}${path}${options.params.tournamentId}.json`
  return axios.get(API_URL).then(resp => {
    return resp.data
  }, err => {
    throw err
  })
}

/**
 * 赛事进度--周比赛列表
 * @param options: object {method: 'post', params: {weekId}}
 * return promise对象
 */
let weekMatchList = (axios) => (options) => {
  const BASE_URL = axios.defaults.baseURL
  let path = '/tr_round/'

  if (BASE_URL.indexOf('staging-1') != -1) {
    path = '/stag1/tr_round/'
  } else if (BASE_URL.indexOf('staging-2') != -1) {
    path = '/stag2/tr_round/'
  } else if (BASE_URL.indexOf('staging-3') != -1) {
    path = '/stag3/tr_round/'
  }
  console.log(BASE_URL)
  const API_URL = `${JSON_PROXY_PATH}${path}${options.params.weekId}.json`

  return axios.get(API_URL).then(resp => {
    return resp.data
  }, err => {
    throw err
  })
}

/**
 * 一周选手榜
 * @param options: object {method: 'post', params: {type}}
 * return promise对象
 */
let weekPlayerRank = (axios) => (options) => _axiosApi(axios, _formatParams('/services/gamingDatabase/player_week_rank.php', options))

/**
 * 看比赛-赛程数据
 * @param options: object {method: 'post', params: {date, tournament_id}}
 * return promise对象
 */
let weekSchedule = (axios) => (options) => _axiosApi(axios, _formatParams('/services/match/web_math_list.php', options))

/**
 * 比赛提醒、取消
 * @param options: object {method: 'post', params: {match_id}}
 * return promise对象
 */
let matchRemind = (axios) => (options) => _axiosApi(axios, _formatParams('/services/match/match_remind.php', options))

/**
 * 本月比赛日
 * @param options: object {method: 'post', params: {date}}
 * return promise对象
 */
let matchCalendar = (axios) => (options) => _axiosApi(axios, _formatParams('/services/match/web_calendar_match_list.php', options))



export default (axios) => ({
  getIndexData: getIndexData(axios),//获取网站首页聚合数据
  getIndexTopMatchList: getIndexTopMatchList(axios),//获取网站首页头部当前赛事列表
  all: all(axios),
  list: list(axios),
  weekBestGroup: weekBestGroup(axios),
  teams: teams(axios),
  weekPlayerRank: weekPlayerRank(axios),
  wholeSchedule: wholeSchedule(axios),
  weekMatchList: weekMatchList(axios),
  weekSchedule: weekSchedule(axios),
  matchRemind: matchRemind(axios),
  matchCalendar: matchCalendar(axios)
})
