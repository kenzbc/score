export const STORAGE_KEY = 'userInfo';

export const state = () => ({
  isLoginModalShow: false, //是否显示快速登录窗口
  f_token: '', //用户登录token 默认情况下以此判断是否登录
  member_id: '',
  member_avatar: '',
  userInfo: '',
});

export const mutations = {
  /**设置是否显示快速登录窗口**/
  setLoginModal(state, isLoginModalShow) {
    state.isLoginModalShow = isLoginModalShow
  },
  /**设置登录Token**/
  setToken(state, token) {
    state.f_token = token
  },
  /**设置当前登录会员ID**/
  setMemberId(state, memberId) {
    state.member_id = memberId
  },
  /**设置当前登录会员头像**/
  setMemberAvatar(state, memberAvatar) {
    state.member_avatar = memberAvatar
  },
  /**移除登录数据**/
  removeToken(state) {
    state.userInfo = null;
    state.f_token = null;
    state.member_id = null;
    state.member_avatar = null;
  },
  /**更新用户信息到 store 和 sessionStorage**/
  setUserInfo(state, userInfo) {
    state.userInfo = userInfo
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(userInfo))  //添加到sessionStorage
  },
  /**移除用户信息在 store 和 sessionStorage**/
  logout(state) {
    state.userInfo = null;
    sessionStorage.removeItem(STORAGE_KEY);  //删除sessionStorage
  },
};
