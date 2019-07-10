export const state = () => ({
  type: 'pc',
  isSideShow: true,
  screenWidth: null,
});

export const mutations = {
  setType(state, type) {
    state.type = type;
  },
  setSideShow(state, Boole) {
    state.isSideShow = Boole;
  },
  setWidth(state, num) {
    state.screenWidth = num;
  }
};
