import Cookie from 'js-cookie' //npm install js-cookie --save

export const state = () => ({
  gameId: '1', //当前游戏类型
  timeZone: '8', //当前时区
  languageId: '1', //默认语言ID 这个是后台定义的
});

export const mutations = {
  /**设置默认游戏类型**/
  setGameId(state, gameId) {
    state.gameId = gameId;
    Cookie.set('gameId',gameId);
  },
  /**设置默认时区**/
  setTimeZone(state, timeZone) {
    state.timeZone = timeZone;
    Cookie.set('timeZone',timeZone);
  },
  /**设置默认语言ID**/
  setLanguageId(state, languageId) {
    state.languageId = languageId;
    Cookie.set('languageId',languageId);
  },
};
