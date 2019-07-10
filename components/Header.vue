<template xmlns="http://www.w3.org/1999/html">
  <header id="header" :class="{'fixed-page' : $route.name != 'index'}" :style="styles">

    <!--PC主导航-->
    <div class="web-hedaer" :class="{'index' : $route.name == 'index'}">
      <div class="header">
        <nuxt-link to="/" class="logo"><img src="/static/images/score.png"></nuxt-link>

        <!--主导航-->
        <div class="nav">
          <ul>
            <li><a href="/">
              {{$t('headerNav.home')}}
              <svg v-if="$route.name == 'index'" class="icon header_icon_active" aria-hidden="true">
                <use xlink:href="#icon-circle_blue"></use>
              </svg>
            </a></li>
            <li class="drop-down">
              <a href="javascript:;" class="dropbtn">{{$t('headerNav.match.watchMatch')}}
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-arrow_blue"></use>
                </svg>
              </a>
              <div class="drop-down-content">
                <nuxt-link to="/schedule">{{$t('headerNav.match.matchProgress')}}</nuxt-link>
                <nuxt-link to="/tournament_list">{{$t('headerNav.match.match')}}</nuxt-link>
                <nuxt-link to="/data">{{$t('headerNav.match.matchData')}}</nuxt-link>
              </div>
            </li>
            <li><a href="/v">
              {{$t('headerNav.movie')}}
              <svg v-if="$route.name == 'v'" class="icon header_icon_active" aria-hidden="true">
                <use xlink:href="#icon-circle_blue"></use>
              </svg>
            </a></li>
            <li class="drop-down">
              <a href="/post" class="dropbtn">{{$t('headerNav.post.post')}}
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-arrow_blue"></use>
                </svg>
              </a>
              <div class="drop-down-content">
                <nuxt-link to="/moment">{{$t('headerNav.post.moment')}}</nuxt-link>
                <nuxt-link to="/follow">{{$t('headerNav.post.follow')}}</nuxt-link>
              </div>
            </li>
            <li><a href="/bet_list">
              {{$t('headerNav.bet')}}
              <svg v-if="$route.name == 'bet_list'" class="icon header_icon_active" aria-hidden="true">
                <use xlink:href="#icon-circle_blue"></use>
              </svg>
            </a></li>
            <li><a href="/star_list">
              {{$t('headerNav.star')}}
              <svg v-if="$route.name == 'star_list'" class="icon header_icon_active" aria-hidden="true">
                <use xlink:href="#icon-circle_blue"></use>
              </svg>
            </a></li>
            <li class="drop-down">
              <a href="javascript:;" class="dropbtn">{{$t('headerNav.more.more')}}
                <svg class="icon" aria-hidden="true">
                  <use xlink:href="#icon-arrow_blue"></use>
                </svg>
              </a>
              <div class="drop-down-content">
                <a :href="'https://www.famulei.com/services/lfl_redirect.php?url=http://lfl.gg'+'&f_token='+$store.state.modules.login.f_token" target="_blank">{{$t('headerNav.more.lfl')}}</a>
                <a href="https://stars.famulei.com/" target="_blank">{{$t('headerNav.more.recreation')}}</a>
                <!--<nuxt-link to="/live_list">{{$t('headerNav.more.live')}}</nuxt-link>-->
                <nuxt-link to="/faq">{{$t('headerNav.more.help')}}</nuxt-link>
              </div>
            </li>
          </ul>
        </div>

        <!--搜索-->
        <div class="header_search active" :class="{'active' : searchAct == true}" id="famulei_header_search">
          <input type="text" placeholder="搜人 / 贴子 / 圈子" v-focus v-model="searchText" maxlength="15" class="txt_cl">
          <ul class="search_slider" v-show="searchText != ''">
            <li><a :href="'/search?keyword='+searchText">搜“<span>{{searchText}}</span>”相关的人 &gt;&gt;</a></li>
            <li><a :href="'/search?keyword='+searchText">搜“<span>{{searchText}}</span>”相关贴子 &gt;&gt;</a></li>
            <li><a :href="'/search?keyword='+searchText">搜“<span>{{searchText}}</span>”相关圈子 &gt;&gt;</a></li>
          </ul>
          <a href="javascript:" class="" id="search_btn" data-href="/search?keyword=" @click="searchAct = !searchAct">
            <i class="iconfont icon-general__search gray_3"></i>
          </a>
        </div>

        <!--切换游戏-->
        <div class="game_change flr">
          <p class="game_now gray_3">
            <span v-if="Object.keys($store.state.modules.gameList.current).length > 0">
              <img :src="$store.state.modules.gameList.current.image" class="game_img">
              <span class="game_name gray_3">{{$store.state.modules.gameList.current.name}}</span>
              <i class="iconfont icon-general__arrow_bel gray_3"></i>
            </span>
          </p>
          <ul class="game_list">
            <li v-for="item in $store.state.modules.gameList.list" @click="changeGame(item.gameID)">
              <img :src="item.image">
              <span class="game_list_name">{{item.name}}</span>
            </li>
          </ul>
        </div>

        <!--未登录状态-->
        <div class="header_login" v-if="!isLogin">
          <a class="button" href="javascript:;" @click="$store.commit('modules/login/setLoginModal', true);">{{$t('global.login')}}</a>
          <nuxt-link class="button" to="/register">{{$t('global.register')}}</nuxt-link>
        </div>


        <!--登录状态后信息区域-->
        <div class="header_message flr header_v4_btn" id="famulei_header_message" v-if="isLogin"
             @mouseenter="showMessageCount">
          <i class="iconfont icon-message"></i><span class="message_icon"></span>
          <ul class="header_v4_info header_message_list" ref="msgList">
            <li><a href="/message#comment" @click="setMsgRead('comment',1)"><i class="iconfont icon-circle__comment"></i>回复<span class="header_reply_count vs_mes" v-if="msgList.reply_count > 0">{{msgList.reply_count}}</span></a></li>
            <li><a href="/message#aita" @click="setMsgRead('aita',1)"><i class="iconfont icon-personal_message__1"></i>提到<span class="header_mention_count vs_mes" v-if="msgList.mention_count">{{msgList.mention_count}}</span></a></li>
            <li><a href="/message#praise" @click="setMsgRead('praise',1)"><i class="iconfont icon-circle__good_Gray"></i>赞<span class="header_praise_count vs_mes" v-if="msgList.praise_count">{{msgList.praise_count}}</span></a></li>
            <li><a href="/message#quote" @click="setMsgRead('quote',1)"><i class="iconfont icon-quote"></i>引用<span class="header_quote_count vs_mes" v-if="msgList.quote_count">{{msgList.quote_count}}</span></a></li>
            <li><a href="/direct_messages" target="_blank" class="icon-message-area"><i class="iconfont icon-IM__chat"></i>私信<span class="header_message_count vs_mes" v-if="msgList.unread_count">{{msgList.unread_count}}</span></a></li>
            <li><a href="/message#notice" @click="setMsgRead('notice',1)"><i class="iconfont icon-personal_message__"></i>通知<span class="header_notice_count vs_mes" v-if="msgList.notice_count">{{msgList.notice_count}}</span></a></li>
          </ul>
        </div>
        <!--登录状态-->
        <div class="header_info flr header_v4_btn" id="famulei_header_avatar" v-if="isLogin">
          <img :src="$store.state.modules.login.member_avatar">
          <ul class="header_v4_info">
            <li><nuxt-link to="/homepage"><i class="iconfont icon-personal__MyHomepa"></i>我的首页</nuxt-link></li>
            <li><nuxt-link to="/moment/my"><i class="iconfont icon-personal__circle"></i>我的圈子</nuxt-link></li>
            <li><nuxt-link to="/bet"><i class="iconfont icon-personal__Bet"></i>我的菠菜</nuxt-link></li>
            <li><nuxt-link to="/badge"><i class="iconfont icon-badge"></i>我的徽章</nuxt-link></li>
            <li><nuxt-link to="/task"><i class="iconfont icon-personal__TasK"></i>任务中心</nuxt-link></li>
            <li><nuxt-link to="/setting"><i class="iconfont icon-personal__setting"></i>账号设置</nuxt-link></li>
            <li><a href="javascript:;" @click="logout()"><i class="iconfont icon-personal__Logout"></i>退出登录</a></li>
          </ul>
        </div>

        <!--切换语言-->
        <div class="header_message flr header_v4_btn">
          <a href="javascript:;" @click="changeLanguage()">
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-earth"></use>
            </svg>
          </a>
        </div>


      </div>
    </div>




    <!--手机header-->
    <div class="mobile_header">
      <div class="mobile_header1">
        <a href="javascript:;" data-type="menu" class="menu-btn" @click="mobileMenuIsShow = true"></a>
        <a href="/" class="data_logo">
          <img src="/static/images/score.png" alt="">
        </a>
        <div class="logo">
          <a href="/" class="logo-link default">
            <img src="/static/images/score.png" alt="">
          </a>
        </div>
        <!--<a href="/" class="logo"><img src="/static/images/index/score.png" alt=""></a>-->

        <a href="javascript:;" data-type="profile" class="profile-btn" v-if="!isLogin" style="background-image: url('/images/header/tx_pic.jpg')" @click="mobileUserInfoIsShow = true"></a>
        <a href="javascript:;" data-type="profile" class="profile-btn" v-else :style="'background-image: url('+$store.state.modules.login.member_avatar+')'" @click="mobileUserInfoIsShow = true"></a>

      </div>
      <div class="mobile_header-down cl">
        <div class="footer-wrap ">
          <div class="mobile_header-down-left fll">  <img src="/static/images/header/score.png" alt="">  </div>
          <div class="mobile_header-down-right flr"> <p>下载App</p> </div>
          <div class="mobile_header-down-middle flr"><a class="link-App-url" onclick="weixinShow()" href="famulei://">打开App</a></div>
        </div>
      </div>
    </div>

    <!--手机左侧抽屉导航-->
    <Drawer placement="left" class="mobile-menu-box" :closable="false" v-model="mobileMenuIsShow">
      <div class="menu-top-bg"><img style="max-width: 100%;" src="/static/images/mobile-menu-bg@2x.png"></div>
      <ul class="nav-menu">
        <Menu>
          <a href="/" class="ivu-menu-item" name="1">
            <i class="iconfont icon-shouye"></i>
            首页
          </a>
          <a href="/schedule" class="ivu-menu-item" name="2">
            <i class="iconfont icon-zhibo"></i>
            看比赛
          </a>
          <a href="/data" class="ivu-menu-item" name="3">
            <i class="iconfont icon-bigdata_icon_white"></i>
            电竞大数据
          </a>
          <a href="#" class="ivu-menu-item" name="4">
            <i class="iconfont icon-jisha"></i>
            赛事中心
          </a>
          <a href="/bet_list" class="ivu-menu-item" name="6">
            <i class="iconfont icon-iconquanzi01"></i>
            圈子
          </a>
          <a href="/bet_list" class="ivu-menu-item" name="6">
            <i class="iconfont icon-bocai1"></i>
            菠菜
          </a>
          <a href="/star_list" class="ivu-menu-item" name="8">
            <i class="iconfont icon-guanfanghaokongxin"></i>
            官方号
          </a>
          <a href="http://m.lfl.gg/" class="ivu-menu-item" name="9">
            <i class="iconfont icon-icon_LFL"></i>
            幻联赛
          </a>
          <a href="https://img1.famulei.com/download/m.html" class="ivu-menu-item" name="10">
            <i class="iconfont icon-xiazai"></i>
            客户端下载
          </a>

        </Menu>
      </ul>
    </Drawer>
    <!---->
    <Drawer :closable="false" class="sidebar-panel profile"  v-model="mobileUserInfoIsShow">
      <div class="sidebar-profile-header">
        <div class="image"><img v-if="isLogin" :src="$store.state.modules.login.member_avatar" alt=""></div>
        <div class="text" v-if="!isLogin"></div>
        <div class="userInfo" v-if="isLogin">
          <div class="nickname">十三月DEV</div>
          <div class="ext">
            <span class="rank_lv rank_lv_5"></span>
            <!---->
            <!--<span class="badge_image reply_badge"><img src="https://img1.famulei.com/z/75165/p/193/0717460927874.png" width="100%;"></span>-->
            <!---->
          </div>
          <ul class="nav-menu">
            <Menu>
              <a href="/follow" class="ivu-menu-item" name="1">
                <i class="iconfont icon-icon_5"></i>
                我的关注
              </a>
              <Submenu name="2">
                <template slot="title">
                  <i class="iconfont icon-quanzikongxin"></i>
                  我的圈子
                </template>
                <a href="/moment_my" class="ivu-menu-item" name="2-1">我关注的圈子</a>
                <a href="/moment_my#post" class="ivu-menu-item" name="2-2">我的帖子</a>
                <a href="/moment_my#reply" class="ivu-menu-item" name="2-3">我的回复</a>
              </Submenu>
              <Submenu name="3">
                <template slot="title">
                  <i class="iconfont icon-tongzhi"></i>
                  我的消息
                </template>
                <a href="/message#comment" class="ivu-menu-item" name="3-1">回复</a>
                <a href="/message#aita" class="ivu-menu-item" name="3-2">提到</a>
                <a href="/message#praise" class="ivu-menu-item" name="3-3">赞</a>
                <a href="/homepage#fans" class="ivu-menu-item" name="3-4">粉丝</a>
                <a href="/message#notice" class="ivu-menu-item" name="3-5">通知</a>
              </Submenu>

            </Menu>
          </ul>
        </div>
      </div>
      <div class="bottom-buttons">
        <a class="btn login" href="/login" v-if="!isLogin">{{$t('global.login')}}</a>
        <a class="btn reg register-link" href="/register" v-if="!isLogin">{{$t('global.register')}}</a>
        <a class="btn logout" href="javascript:;" @click="logout()" v-if="isLogin">退出</a>
      </div>
    </Drawer>







    <!--切换语言弹层-->
    <Modal v-model="changeLanguageModal"
        :title="$t('global.changeLanguageModalTitle')"
        width="300"
        cancel-text=""
        :ok-text="$t('global.close')"
        :class="'change-language-modal'">
      <Row>
        <Col span="12"><span class="item" @click="setLanguage('zh')"><img src="~/assets/images/cn.png"> 简体中文</span></Col>
        <Col span="12"><span class="item" @click="setLanguage('hk')"><img src="~/assets/images/hk.png"> 繁体中文</span></Col>
        <Col span="12"><span class="item" @click="setLanguage('en')"><img src="~/assets/images/us.png"> English (US)</span></Col>
        <!--<Col span="12"><span class="item" @click="setLanguage('kr')"><img src="~/assets/images/kr.png"> 대한민국</span></Col>-->
      </Row>
    </Modal>
    <!--登录弹层-->
    <login-modal @closeLoginModal="closeLoginModal()" :loginModalShow="loginModalShow"></login-modal>
    <!--随机事件弹层-->
    <event-modal v-if="this.$store.state.modules.event.eventPop && this.$store.state.modules.event.eventPop.length > 0"
                 :event-data="this.$store.state.event.eventPop"></event-modal>
    <!--随机徽章弹出框-->
    <badge-modal v-if="this.$store.state.modules.badge.badgePop && this.$store.state.modules.badge.badgePop.length > 0"
                 :badge-data="this.$store.state.badge.badgePop"></badge-modal>

  </header>
</template>

<script>
  import Cookie from 'js-cookie'
  import {transformLanguageToId} from "../utils/language-transform";
  import LoginModal from './login-modal.vue'
  import EventModal from "./common/event-modal";
  import BadgeModal from "./common/badge-modal";

  export default {
    name: "Header",
    components: {
      BadgeModal,
      EventModal,
      LoginModal
    },
    props: {
      styles: {
        type: Object,
        default: null
      }
    },
    data() {
      return {
        mobileMenuIsShow:false,
        mobileUserInfoIsShow:false,

        changeLanguageModal: false,
        loginModalShow: false,
        searchAct:false,
        searchText:'',

        msgList:'',
        screenWidth: null
      }
    },
    computed: {
      listenLoginModal() {
        return this.$store.state.modules.login.isLoginModalShow;
      },
      isLogin(){
        if(this.$store.state.modules.login.f_token){
          return true;
        }else{
          return false;
        }
      }
    },
    // 监听,当路由发生变化的时候执行
    watch:{
      listenLoginModal:function(newVal,oldVal){
        this.loginModalShow = newVal;
      },
      screenWidth (val) {
        if (!this.timer) {
          this.screenWidth = val;
          this.timer = true;
          setTimeout(()=> {
            // that.screenWidth = that.$store.state.canvasWidth
            // console.log(this.screenWidth);
            this.$store.commit('modules/device/setWidth', this.screenWidth);
            this.timer = false
          }, 500)
        }
      }
    },
    mounted() {
      this.initGameList();//初始化游戏列表

      //初始化屏幕滚动事件
      $(window).scroll(function() {
        if($(document).scrollTop() >= 65) {
          // console.log($(document).scrollTop())
          $("#header").addClass("fixed").slideDown();
        } else {
          $("#header").removeClass("fixed");
        }
      });

      //判断安卓或者IOS
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
        this.$store.commit('modules/device/setType', 'ios');
      } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
        this.$store.commit('modules/device/setType', 'android');
      }else {
        this.$store.commit('modules/device/setType', 'pc');
      }

      //初始化屏幕宽度监听
      this.screenWidth = document.body.clientWidth;
      window.onresize = () => {
        return (() => {
          this.screenWidth = document.body.clientWidth;
        })()
      }

    },
    methods: {

      //切换赛事比赛
      matchChange(tournamentID,short_name,image_thumb){
        this.getIndexTopMatchList(tournamentID);
        console.log(tournamentID);
        console.log(short_name);
        console.log(image_thumb);
      },
      //初始化游戏列表
      initGameList(){
        // https://img1.famulei.com/dev/game/game_list.json
        if(sessionStorage.getItem('gameList') instanceof Array && sessionStorage.getItem('gameList').length > 0){
          this.$store.commit('modules/gameList/setGameList', JSON.parse(sessionStorage.getItem('gameList')));
          this.$store.commit('modules/gameList/setCurrentGame', JSON.parse(sessionStorage.getItem('gameCurrent')));
        }else{
          sessionStorage.removeItem('gameCurrent');
          sessionStorage.removeItem('gameList');
          this.$api.global.getGameList().then((res)=>{
            this.$store.commit('modules/gameList/setGameList', res.data);
            if(res.data && res.data.length > 0){
              res.data.forEach((item)=>{
                if(item.gameID == this.$store.state.modules.apiParams.gameId){
                  this.$store.commit('modules/gameList/setCurrentGame', item);
                  return;
                }
              })
            }
          });
        }
      },
      //切换游戏
      changeGame(gameId){
        this.$store.commit('modules/apiParams/setGameId',gameId);
        let gameList = this.$store.state.modules.gameList.list;
        gameList.forEach((item)=>{
          if(item.gameID == gameId){
            this.$store.commit('modules/gameList/setCurrentGame', item);
            window.location.href = window.location.href;
            return;
          }
        });
        window.location.reload();
      },

      //退出登录
      logout() {
        //this.userInfo = null
       this.$setLogout();
      },
      //显示更改语言弹窗
      changeLanguage() {
        this.changeLanguageModal = true
      },
      //设置语言
      setLanguage(language) {
        this.$store.commit('modules/locales/setLanguage', language);
        this.$i18n.locale = language;
        Cookie.set("language", language);
        Cookie.set("languageId", transformLanguageToId(language));
        this.changeLanguageModal = false;
        window.location.reload();
      },
      //获取用户消息数量
      async showMessageCount(){
        let msgRes = await this.$api.member.getMessageCount();
        this.msgList = msgRes.data;
      },
      //设置消息已读
      async setMsgRead(type, page){
        let params = {
          message_type: type,
          page: page,
          limit: 10
        };
        //let res = await this.$scoreApi.setMsgRead({params});
      },
      //关闭登录弹层
      closeLoginModal() {
        this.$store.commit("modules/login/setLoginModal",false);
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .login_btn {
    display: inline-block;
    line-height: 26px;
    color: #0d8dfc;
    background-color: #fff;
    border: 1px solid #0d8dfc;
    border-radius: 24px;
    padding: 0 17px;
    margin-left: 10px;
  }

  .login_btn:hover {
    background-color #eaf6ff;
  }

  header {
    width: 100%;
    background-color: #fff;
    position relative;
    z-index 100
    top: 0;

    &.fixed{
      position fixed;
    }

    &.fixed-page{
      border-bottom: 1px solid #f8f8f8
      position fixed;
    }

    .web-hedaer {
      min-width 845px;
      &.index{
        box-shadow:0px 2px 4px 0px rgba(0,0,0,0.04),0px 0px 0px 1px rgba(0,0,0,0.03);
      }
    }

    .header {
      width: 100%;
      max-width: 1260px;
      position: relative;
      margin: 0 auto;
      display flex
      align-items center
      justify-content space-between
      z-index 50;

      .logo {
        width 110px;
        height: 50px;

        img {
          width 110px;
          height: 50px;
        }
      }

    //导航
      .nav {
        flex-grow 1;
        padding-left: 10px;

        li {
          float: left;
        }

        li a, .dropbtn {
          display: inline-block;
          color: #2d2f33;
          text-align: center;
          line-height: 50px;
          padding: 0px 14px;
          text-decoration: none;
          position relative;
          font-size: 16px;
        }
        .icon {
          display: block;
          width: 10px;
          height: 10px;
          color: #a8abb3;
          position: absolute;
          right: 6px;
          top: 14px;
        }

        li a:hover, .drop-down:hover, .dropbtn {

        }
        li a.active .icon {
          color: #0d8dfc;
        }
        .drop-down {
          display: inline-block;
        }

        .drop-down-content {
          display: none;
          position: absolute;
          background-color: #fff;
          box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
          border-radius: 0 0 4px 4px;
          padding: 0 5px 5px 5px;
        }

        .drop-down-content a {
          display: block;
          text-align: left;
          width: 100%;
          font-size: 16px;
          border-radius: 4px;
          line-height: 36px;
          padding-left: 15px;

        }

        .header_icon_active {
          display: block;
          width: 12px;
          height: 12px;
          color: #0d8dfc;
          position: absolute;
          right: 4px;
          top: 13px;
        }
        .drop-down-content a:hover {
          background-color: #0c82fb;
          color #fff;
        }

        .drop-down:hover .drop-down-content {
          display: block;
        }
      }

    //搜索
      /*搜索*/
      .header_search {
        width: 44px;
        height: 36px;
        line-height: 36px;
        color: #ccc;
        background-color: #fff;
        border-radius: 24px;
        margin: 0;
        padding-left: 14px;
        position: relative;
        z-index: 1;
        transition: width 0.5s;
      }
      .header_search.active{
        width 200px;
        background-color: #f7f7f9;

        input{
          width: 160px;
        }
      }
      #search_btn {
        position: absolute;
        right: 14px;
        top: 0;
      }
      .header_search a i {
        font-size: 20px;
      }
      .header_search a:hover i {
        color: #0d8dfc
      }
      .header_search input {
        width: 0;
        height: 32px;
        text-align: center;
        color: #A8ABB3;
        background-color: #F7F8FA;
        transition: width 0.5s;
      }
      .header_search input::-webkit-input-placeholder {
        color: #A8ABB3;
      }
      .header_search input:-moz-placeholder {
        color: #A8ABB3;
      }
      .header_search input::-moz-placeholder {
        color: #A8ABB3;
      }
      .header_search input:-ms-input-placeholder {
        color: #A8ABB3;
      }
      .web_header_right .header_search_hover {
        width: 200px;
        background-color: #f7f7f9;
      }
      .web_header_right .header_search_hover input {
        width: 160px;
      }
      /*search下拉*/
      .search_slider {
        width: 172px;
        background-color: #fff;
        position: absolute;
        top: 32px;
        left: 12px;
        box-shadow: 0 0 16px rgba(0, 0, 0, 0.1);
      }
      .search_slider li {
        width: 100%;
        font-size: 14px;
        text-indent: 0.6em;
        line-height: 24px;
      }
      .search_slider li a {
        display: block;
        color: #999;
      }
      .search_slider li a span {
        color: #39c;
      }
      .search_slider li:hover {
        background-color: #eee;
      }

    //导航右侧切换游戏
      /*切换游戏*/
      .game_change {
        position: relative;
        padding: 8px 0 8px 18px;
      }
      .game_change:hover .game_list {
        display block;
      }
      .game_change .game_now {
        line-height: 20px;
      }
      .game_change .game_now img {
        display: block;
        width: 20px;
        height: 20px;
        margin-right: 8px;
        float: left;
      }
      .game_change .game_now i {
        font-size: 12px;
        margin-left 4px;
      }
      .game_change .game_list {
        display: none;
        background: #fff;
        border-radius: 4px;
        box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.03), 0 2px 8px 0 rgba(0, 0, 0, 0.08);
        position: absolute;
        right: -45px;
        top: 36px;
        z-index 2;
        padding: 5px;
        z-index 2;
      }
      .game_change .game_list li {
        width: 150px;
        line-height: 20px;
        border-radius: 4px;
        cursor: pointer;
        padding: 8px 6px;
      }
      .game_change .game_list li:hover {
        color: #fff;
        background: #0D8DFC;
      }
      .game_change .game_list li.active {
        background: #F0F1F2;
      }
      .game_change .game_list li.active:hover {
        color: #2D2F33;
      }
      .game_change .game_list li img {
        display: block;
        width: 20px;
        height: 20px;
        float: left;
        margin-right: 10px;
      }

    //导航右侧登录
      .header_login {

        a.button {
          display: inline-block;
          line-height: 26px;
          color: #0d8dfc;
          background-color: #fff;
          border: 1px solid #0d8dfc;
          border-radius: 24px;
          padding: 0 17px;
          margin-left: 10px;
        }
        a.button:hover {
          background: #EDF7FF;
        }
        .change-language-btn {
          margin-left: 15px;
          width: 18px;
          height: 18px;
        }
      }
    }

  }


  .header_info, .header_message {
    height: 36px;
    line-height: 36px;
    font-size: 14px;
    color: #a8abb3;
    position: relative;
  }
  .header_message {
    padding: 0px 0 0 18px;
  }

  .header_info {
    padding: 0px 0 0 18px;
  }

  .header_info:hover .header_v4_info,.header_message:hover .header_v4_info{
    display block;
  }
  .header_info, .header_message{

    .header_v4_info {
      display: none;
      position: absolute;
      right: -20px;
      top: 36px;
      background: #fff;
      border-radius: 4px;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px 0 rgba(0,0,0,0.08);
      padding: 5px;
    }
    .header_v4_btn {
      position: relative;
      z-index: 2;
      cursor: pointer;
    }

    img {
      display: block;
      width: 36px;
      height: 36px;
      border-radius: 50%;
    }

    .header_v4_info {

      .vs_mes {
        display: none;
        width: 16px;
        height: 16px;
        line-height: 16px;
        background-color: #ff5c5c;
        border-radius: 50%;
        display: inline-block;
        color: #fff;
        font-size: 12px;
        margin-left: 4px;
        vertical-align: text-bottom;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-indent: 0;
      }

      li{
        & a:hover {
          color: #fff;
          background-color: #0d8dfc;
        }
        & a:hover i {
          color: #fff;
        }
        a{
          display: block
          width: 128px;
          height: 36px;
          line-height: 36px;
          text-align: left;
          color: #2d2f33;
          background-color: #fff;
          border-radius: 4px;
          padding: 0 6px;

          i {
            color: #656973;
            font-size: 18px;
            vertical-align: middle;
            margin-right: 10px;
          }
        }
      }
    }

  }


  .change-language-modal {

    .ivu-modal-body {

      .item {
        display flex;
        align-items center;
        cursor pointer;
        line-height 24px;
        font-size: 14px;

        img {
          width 16px
          height: 16px
          margin-right: 6px
        }
      }
      .item:hover {
        color: #7f828b;
      }
    }
  }




  .mobile_header {
    display: none;
  }






  // ＜ 1240
  @media screen and (max-width: 1240px) {
    .header_search{
      display none;
    }
    .index-wrap{
      width: 1000px;
    }
    .left-slide{
      display none;
    }
  }

  @media screen and (max-width: 767px) {
    .web-hedaer{
      display: none;
    }
    .all-match-btn{
       display none
    }

    .header-match {
      margin-top:41px;

      .header-match-content {
        .match-scroll{
          position relative;
          width: calc(100% - 80px);
          left: 0px;
        }
      }

    }

    header{
      position: relative;


    }


    .mobile_header {
      display: block;
      .menu-btn {
        position: absolute;
        height: 30px;
        width: 30px;
        top: 5px;
        left: 8px;
        bottom: 8px;
        display: block;
        border-radius: 50%;
        text-align: center;
      }
      .menu-btn:before {
        content: '\e652';
        font-family: "iconfont";
        line-height: 30px;
        font-size: 10px;
        color: #a5a8b2;
      }
      .logo {
        display: inline-block;
        height: 100%;
        .logo-link.default {
          height: 100%;
          margin-top: 0;
          img {
            display: block;
            width: 90px;
            height: auto;
          }
        }
      }
      .mobile_header1{
        position: fixed;
        left: 0;
        top: 0px;
        z-index: 100;
        display: block;
        width: 100%;
        height: 40px;
        background-color: #fff;
        text-align: center;
        box-shadow: 0px 2px 4px 0px rgba(0,0,0,0.04), 0px 0px 0px 1px rgba(0,0,0,0.03);

        .data_logo {
          display: none;

          img {
            width: 90px;
            display: block;
          }
        }
      }

      .profile-btn {
        position: absolute;
        top: 5px;
        right: 8px;
        bottom: 8px;
        height: 30px;
        width: 30px;
        display: block;
        border-radius: 50%;
        background-position: center;
        background-size: cover;
        /* box-shadow: 0 0 0 1px #666; */
        background-image: url(/images/header/sidebar-profile-logo.png);
        background-size: cover;
      }
    }
    .mobile_header-down {
      position: fixed;
      left: 0;
      bottom: 0;
      z-index: 100;
      background: rgba(0,0,0,0.06);
      width: 100%;

      .footer-wrap {
        width: 100%;
        height: 60px;
        background: #fff;
        background-image: url(/static/images/header/scorebg.png);
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;

        .mobile_header-down-left {
          margin-left: 10px;
          margin-top: 11px;
          img {
            height: 38px;
          }
        }
        .mobile_header-down-right {
          margin-right: 10px;

          p {
            margin-top: 15px;
            background: transparent;
            border: 1px solid #fff;
            border-radius: 15px;
            width: 76px;
            text-align: center;
            font-size: 12px;
            color: #fff;
            padding: 8px 0;
            font-family: Helvetica Neue, Helvetica, Roboto, Segoe UI, Arial, sans-serif;
          }
        }
        .mobile_header-down-middle {
          margin-right: 12px;
          margin-top: 15px;
          background: transparent;
          border: 1px solid #fff;
          border-radius: 15px;
          width: 76px;
          text-align: center;
          font-size: 12px;
          padding: 8px 0;
          font-family: Helvetica Neue, Helvetica, Roboto, Segoe UI, Arial, sans-serif;

          .link-App-url {
            display: block;
            color: #fff;
          }
        }
      }
    }



    .mobile-menu-box{

      /deep/ .ivu-drawer-content{
        position relative;

        /deep/ .ivu-menu-item{
          padding: 8px 24px;
        }
        /deep/ .ivu-menu-submenu-title{
          padding: 8px 24px;
        }
      }

      .iconfont{
        color #0D8DFC
      }


      .menu-top-bg{
        width 100%;
        background #fff url("/images/mobile-menu-bg@2x.png") no-repeat top;
        background-size: 100%;
        position absolute;
        top:0;
        left 0;
        z-index 10;
      }

      .nav-menu {
        width: 100%;
        height 100%;
        padding-top: 120px;
        transition-duration: 0.5s;
        overflow-y: auto;
        position: relative;
        z-index 8;

      }






    }



    .sidebar-panel.profile {

      /deep/ .ivu-drawer-content{
        position relative;
        background-color: #1c1c1a;
        background: -webkit-linear-gradient(top, #1c1c1a, #37260f);

        /deep/ .ivu-menu-item{
          padding: 8px 24px;
          color:#fff;
        }
        /deep/ .ivu-menu-submenu-title{
          padding: 8px 24px;
        }
        /deep/ .ivu-menu-light{
          background none;
        }

        /deep/ .ivu-menu-submenu-title,.ivu-menu-submenu-title:hover{
          color:#fff;
        }
      }


      .sidebar-profile-header {
        padding: 30px 0;

        .image {
          background-size: cover;
          background-image: url(/static/images/score_logo.png);
          width: 90px;
          height: 90px;
          margin: 0 auto;
          overflow: hidden;
          border-radius: 50%;
        }
        .text {
          background-size: 150px;
          background-image: url(/images/header/sidebar-profile-logo-text.png);
          background-repeat no-repeat;
          background-position: center;
          height: 50px;
        }

        .userInfo {
          margin-top: 5px;

          .ext,.nickname {
            text-align: center;
            color: #fff;
            height: 30px;
            line-height: 30px;
            font-size: 16px;

            span {
              margin: 0 3px;
            }
          }

          .nav-menu {
            width: 100%;
            padding-top: 10px;
            transition-duration: 0.5s;
            overflow-y: auto;
            margin-top: 0;
          }
          .nav-menu > li {
            overflow: hidden;
          }
          .sidebar-panel .nav-menu > li a {
            display: block;
            padding: 0 35px;
            font-size: 16px;
            height: 36px;
            line-height: 36px;
            margin-bottom: 10px;
            color: #fff;
            position: relative;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .nav-menu > li > a .iconfont {
            display: inline-block;
            margin-right: 15px;
            font-size: 20px;
            vertical-align: middle;
            margin-top: -3px;
          }
          .nav-menu > li ul {
            opacity: 0;
            height: 0;
            transition-duration: 0.3s;
            margin: 0;
          }
          .nav-menu > li.circle ul li a {
            margin-bottom: 5px;
            padding-left: calc(50px + 1em);
          }

        }


      }

      .bottom-buttons {
        margin-top: 100px;

        .btn {
          width: 200px;
          margin: 20px auto;
          color: #fff;
          border-radius: 20px;
          border: 1px solid #fff;
          height: 42px;
          line-height: 42px;
          padding: 0;
          font-size: 16px;
          text-align: center;
          display block;
        }
        .btn.login {
          border-color: #0d8dfc;
          background-color: #0d8dfc;
        }
      }

    }



  }


</style>
