import {JSON_PROXY_PATH, _axiosApi, _formatParams} from './common'

/**
 * 获得赛事阶段
 * @param options: object {method: 'post', params: {tournamentId}}
 * return promise对象
 */
let getGameList = (axios) => (options) => {
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
  const API_URL = `${JSON_PROXY_PATH}${path}game/game_list.json`;

  return axios.get(API_URL).then(resp => {
    return resp.data
  }, err => {
    throw err
  })
}





export default (axios) => ({
  getGameList:getGameList(axios),//获取游戏类型列表
})

