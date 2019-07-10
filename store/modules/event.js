export const state = () => ({
  eventPop:[],//全局随机事件
});

export const mutations = {
  /**保存全局随机事件弹窗 vuex**/
  setEventPop(state, eventPopData) {
    state.eventPop = eventPopData;
  },
  removeEventPop(state) {
    state.eventPop = null;
  },
};
