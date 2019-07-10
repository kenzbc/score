export const state = () => ({
  list:[],//全局赛事列表
});

export const mutations = {
  setTournament(state, data) {
    state.list = data;
    sessionStorage.setItem('tournamentList', JSON.stringify(data));
  }
};
