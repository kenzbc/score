
export const state = () => ({
  current:{},
  list:[],
});

export const mutations = {
  setGameList(state, arr) {
    state.list = arr;
    sessionStorage.setItem('gameList', JSON.stringify(arr));
  },
  removeGameList(state) {
    state.list = null;
    sessionStorage.removeItem('gameList');
  },

  setCurrentGame(state, obj) {
    state.current = obj;
    sessionStorage.setItem('gameCurrent', JSON.stringify(obj));
  },


};
