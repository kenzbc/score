export const state = () => ({
  badgePop:[],//全局徽章随机弹窗
});

export const mutations = {
  /**保存全局徽章随机事件弹窗 vuex**/
  setBadgePop(state, badgePopData) {
    state.badgePop = badgePopData;
  },
  removeBadgePop(state) {
    state.badgePop = null;
  },
};
