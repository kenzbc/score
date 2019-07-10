import { cookieToJson } from '~/utils/cookie-utils'

export default {
  async fetch({app, store, params}) {

  },
  //系统初始化时
  nuxtServerInit({commit, state}, {req}) {
    let cookie = req.headers.cookie;
    if(cookie){
      cookie = cookie.replace(/\s+/g,"");
    }
    //console.log("cookie="+cookie)

    /**保存gameId vuex**/
    // let userInfo = cookieToJson(cookie).userInfo;
    // if(userInfo){
    //   userInfo = JSON.parse(decodeURI(userInfo).replace(/%2C+/g,","));
    //   cookieToJson(cookie).userInfo ? commit('modules/login/setUserInfo', JSON.stringify(userInfo)) : '';
    // }

    /**保存gameId vuex**/
    cookieToJson(cookie).gameId ? commit('modules/apiParams/setGameId', cookieToJson(cookie).gameId) : '1';

    /**保存languageId vuex**/
    cookieToJson(cookie).languageId ? commit('modules/apiParams/setLanguageId', cookieToJson(cookie).languageId) : '1';

    /**保存timeZone vuex**/
    cookieToJson(cookie).timeZone ? commit('modules/apiParams/setTimeZone', cookieToJson(cookie).timeZone) : '8';

    /**保存token vuex**/
    cookieToJson(cookie).f_token ? commit('modules/login/setToken', cookieToJson(cookie).f_token) : '';

    /**保存memberId vuex**/
    cookieToJson(cookie).member_id ? commit('modules/login/setMemberId', cookieToJson(cookie).member_id) : '';

    /**保存memberAvatar vuex**/
    cookieToJson(cookie).member_avatar ? commit('modules/login/setMemberAvatar', cookieToJson(cookie).member_avatar) : '';

    /**保存language vuex**/
    cookieToJson(cookie).language ? commit('modules/locales/setLanguage', cookieToJson(cookie).language) : '';

  },
  async getTournament({ commit, state }, params) {
    if (!state.tournament) return;
    return this.$axios.post('/user/profile').then(resp => {
      // commit('SET_USER', resp.data.data)
    }, err => {
      console.log(err)
    })

    // commit(SET_G_TOURNAMENT)
  },
}

