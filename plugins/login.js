import Vue from 'vue'
import Cookie from 'js-cookie'

export default ({ app, store, $axios, route, redirect, req }, inject) => {

  /**
   * 设置登录
   */
  inject('setLogin', (obj) => {


    // 新老站并存时，登录，需要同时登录老站php session
    webLogin($axios, obj);

    store.commit('modules/login/setMemberId', obj.member_id);
    store.commit('modules/login/setMemberAvatar', obj.avatar);
    store.commit('modules/login/setToken', obj.f_token);
    store.commit('modules/login/setUserInfo', obj);
    store.commit("modules/login/setLoginModal",false);

    Cookie.set('member_avatar', obj.avatar); //将服务端的token存入cookie当中
    Cookie.set('member_id', obj.member_id); //将服务端的token存入cookie当中
    Cookie.set('f_token', obj.f_token); //将服务端的token存入cookie当中
    //Cookie.set('userInfo', JSON.stringify(obj.data)); //将服务端的userInfo存入cookie当中
  });

  /**
   * 设置注销
   */
  inject('setLogout', () => {
    let params = {
      token: store.state.modules.login.f_token
    };

    // 这里只清除api接口的token
    // app.$api.member.setLogout({params}).then((res)=>{
    //   console.log('退出成功！');
    //
    //   store.commit('modules/login/removeToken');
    //   store.commit('modules/login/logout');
    //
    //   Cookie.remove('member_avatar');
    //   Cookie.remove('member_id');
    //   Cookie.remove('f_token');
    //   Cookie.remove('userInfo');
    // });


    store.commit('modules/login/removeToken');
    store.commit('modules/login/logout');

    Cookie.remove('member_avatar');
    Cookie.remove('member_id');
    Cookie.remove('f_token');
    Cookie.remove('userInfo');

    // 新老站并存时，退出登录，需要清除老站的php session
    webLogout($axios);

  });



  /**
   * 获取登录状态
   */
  inject('getLoginStatus', () => {

    //判断用户是否登录，如果没登录则弹出快速登录窗口
    if(store.state.modules.login.f_token){
      return true;
    }else{
      store.commit('modules/login/setLoginModal',true);
      return false;
    }

  });

}



function webLogin(axios, obj) {
  axios.get(window.location.origin+'/services/s.php',{params:{member_id:obj.member_id, token:obj.f_token}}).then((res)=>{
    console.log('web login');
  });
}

function webLogout(axios) {
  axios.get(window.location.origin+'/services/member/login_out.php').then((res)=>{
    console.log('web logout');

    //根据当前URL状态来跳转
    setTimeout(function () {
      var now_url = window.location.href;
      var path_name = window.location.pathname;
      if (path_name == '/follow' || path_name == '/moment_my' || path_name == '/bet_list' || path_name == '/task' || path_name == '/account' || path_name == '/message' || path_name == '/homepage') {
        window.location.href = '/index';
      } else {
        if (path_name == '/faq' && getUrlParams().type == 3) {
          window.location.href = '/faq';
        } else {
          window.location.href = now_url;
        }
      }
    }, 1000);

  });
}
