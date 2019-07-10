<template>
  <header class="star-header">
    <div class="top">
      <a class="logo" href="/"></a>
      <!-- 登陆状态增加 signed -->
      <div class="actions-wrap signed">
        <!-- 未登录 -->
        <span v-if="!$store.state.modules.login.f_token">
          <a href="javascript:;" @click="$store.commit('modules/login/setLoginModal', true);" class="login">登录</a>
          <nuxt-link to="/register" class="register">注册</nuxt-link>
        </span>

        <!-- 已登录 -->
        <div class="change-star-btn" v-if="$store.state.modules.login.f_token">
          <a href="javascript:;" class="change-star gray_3">
            <i class="iconfont icon-general__change"></i>
            切换官方号
          </a>
          <div class="change-star-wrap ">
            <nuxt-link class="item" v-for="item in starList"
                       :to="'/star?star_id='+item.id"
                       :class="{'love' : item.is_loved == '1'}"
                       :title="item.name">
              <img :src="item.list_image_url">
              <span class="name"></span>
            </nuxt-link>

            <nuxt-link to="/star_list" class="item add-more" target="_blank"></nuxt-link>
          </div>
        </div>
        <a href="/message#comment" target="_blank" class="message" v-if="$store.state.modules.login.f_token">
          <i class="iconfont icon-message gray_3"></i>
          <span class="message_icon"></span>
        </a>
        <div class="header_info flr header_v4_btn" v-if="$store.state.modules.login.f_token">
          <img :src="$store.state.modules.login.member_avatar">
          <ul class="header_v4_info">
            <li><nuxt-link to="/homepage"><i class="iconfont icon-personal__MyHomepa"></i>我的首页</nuxt-link></li>
            <li><nuxt-link to="/moment_my"><i class="iconfont icon-personal__circle"></i>我的圈子</nuxt-link></li>
            <li><nuxt-link to="/bet_list?type=2"><i class="iconfont icon-personal__Bet"></i>我的菠菜</nuxt-link></li>
            <li><nuxt-link to="/task"><i class="iconfont icon-personal__TasK"></i>任务中心</nuxt-link></li>
            <li><nuxt-link to="/account"><i class="iconfont icon-personal__setting"></i>账号设置</nuxt-link></li>
            <li><nuxt-link to="/logout"><i class="iconfont icon-personal__Logout"></i>退出登录</nuxt-link></li>
          </ul>
        </div>
      </div>
      <div class="clear"></div>
    </div>


    <div class="nav-wrap white">
      <div class="star-nav cl">
        <nuxt-link :to="{path:'/star',query:{star_id:this.$route.query.star_id}}" class="logo fll">
          <img :src="starInfo.list_image_url" alt="">
        </nuxt-link>
        <div class="star-nav-item fll" id="star_header_nav">
          <nuxt-link class="nav-item"
                     :to="{path:'/star', query:{star_id:this.$route.query.star_id}}"
                     :class="{'active' : this.$route.path == '/star'}">
            首页<svg class="icon header_icon_active" aria-hidden="true"><use xlink:href="#icon-circle_blue"></use></svg>
          </nuxt-link>
          <nuxt-link class="nav-item"
                     :to="{path:'/star/rank',query:{star_id:this.$route.query.star_id}}"
                     :class="{'active' : this.$route.path == '/star/rank'}">
            签到榜<svg class="icon header_icon_active" aria-hidden="true"><use xlink:href="#icon-circle_blue"></use></svg>
          </nuxt-link>
          <nuxt-link class="nav-item"
                     :to="{path:'/star/lineup',query:{star_id:this.$route.query.star_id}}"
                     :class="{'active' : this.$route.path == '/star/lineup'}">
            阵容<svg class="icon header_icon_active" aria-hidden="true"><use xlink:href="#icon-circle_blue"></use></svg>
          </nuxt-link>
          <nuxt-link class="nav-item star_header_trip"
                     :to="{path:'/star/trip',query:{star_id:this.$route.query.star_id}}"
                     :class="{'active' : this.$route.path == '/star/trip'}">
            行程<svg class="icon header_icon_active" aria-hidden="true"><use xlink:href="#icon-circle_blue"></use></svg>
          </nuxt-link>

          <a v-if="starInfo.is_star_shop == '1'" class="nav-item star_header_trip" :href="starInfo.star_shop" target="_blank">
            官方旗舰店
          </a>

          <a v-for="nav in moreNav" :href="nav.link" target="_blank" class="nav-item">{{nav.name}}</a>
        </div>
        <div class="header_search flr">
          <input type="text" placeholder="搜人 / 贴子 / 圈子" maxlength="15" class="txt_cl" id="star_search">
          <a href="javascript:search();" id="search_btn"><i class="iconfont icon-general__search gray_3"></i></a>
        </div>
      </div>
    </div>

  </header>
</template>

<script>
  export default {
    name: "star-header",
    components: {},
    props:{
      moreNav:{
        type: Array,
        default: ()=>[]
      },
      starInfo:{
        type: Object,
        default: ()=>{}
      }
    },
    data() {
      return {
        starList:[]
      }
    },
    mounted() {
      this.$api.star.getStarList().then((res)=>{
        this.starList = res.data.attention_list;
      })
    },
    methods: {},
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .star-header {
    width: 100%;
    background: #FFFFFF;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px 0 rgba(0,0,0,0.04);
    /*height: 150px;*/
    position: fixed;
    z-index: 100;
    top: 0;
    left: 0;
    right: 0;
    -webkit-transform: translateZ(0);

    .top {
      height: 34px;
      background: #FCFCFC;
      box-shadow: 0 0 0 1px rgba(0,0,0,0.04);
      position: relative;
      z-index: 7;


      .logo {
        display: block;
        width: 80px;
        height: 34px;
        background-image: url("/static/images/star/score.png");
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
        overflow: hidden;
        float: left;
      }

      .actions-wrap {
        float: right;
        position: relative;
        margin: 0 10px;
        color:  #A8ABB3;

        .avatar {
          display: none;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          margin: 5px 0 0 10px;

          img {
            width: 100%;
            height: 100%;
            border-radius: 50%;
          }
        }

        &.signed {
          /*padding-right: 100px;*/
          position: relative;
        }


        a {
          display: inline-block;
        }

      }


      .actions-wrap {

        .message {
          height: 36px;
          line-height: 24px;
          padding: 5px 10px;
          position: relative;

          .iconfont{
            font-size: 14px;
          }
        }
      }
    }


    .nav-wrap{}
  }

  .star-background {
    position: fixed;
    left: 0;
    right: 0;
    top: 50px;
    bottom: 0;
    width: 100%;
    height: 100%;
    background-repeat: no-repeat;
    background-attachment: fixed;
    background-position: center top;
    background-size: cover;
    z-index: -1;
  }

  .star-header-fixed {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 150px;
  }


  .star-header .top .actions-wrap a.login,
  .star-header .top .actions-wrap a.register {
    /*margin-right: 15px;*/
    margin-top: 3px;
  }
  .star_header_trip{
    display: none;
  }
  .message_icon {
    width: 7px;
    height: 7px;
    background-color: #ff5c5c;
    border-radius: 50%;
    display: inline-block;
    position: absolute;
    right: 8px;
    top: 8px;
  }


  .star-header .top .actions-wrap .message:hover .iconfont {
    color: #0D8DFC;
  }
  .header_v4_btn {
    height: 34px;
    padding: 5px 0 0 10px;
    position: relative;
    z-index: 2;
    cursor: pointer;
  }
  .header_info {

    img {
      display: block;
      width: 24px;
      height: 24px;
      border-radius: 50%;
    }

  }

  .header_v4_info {
    height: 0;
    position: absolute;
    right: -8px;
    /*top: 34px;*/
    bottom: 0;
    background: #fff;
    border-radius: 4px;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px 0 rgba(0,0,0,0.08);
    transition-duration: .5s;
    opacity: 0;
    visibility:hidden;
    overflow: hidden;
    padding: 5px;

    &:hover {
      .header_v4_info {
        opacity: 1;
        height: 230px;
        bottom: -230px;
        transition-duration: .3s;
        visibility: visible;

        li{

          a{
            display: block;
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

            &:hover{
              color: #fff;
              background-color: #0D8DFC;

              i{
                color: #fff;
              }
            }
          }
        }
      }
    }
  }



  .star-header .top .actions-wrap a.my,
  .star-header .top .actions-wrap a.change-star,
  .star-header .top .actions-wrap .avatar,
  .star-header .top .actions-wrap.signed a.login,
  .star-header .top .actions-wrap.signed a.register {
    /*display: none;*/
  }
  .signed a.login,.signed a.register{
    display: inline-block;
    line-height: 26px;
    color: #0d8dfc;
    background-color: #fff;
    border: 1px solid #0d8dfc;
    border-radius: 24px;
    padding: 0 17px;
    margin-left: 10px;
  }

  .star-header .top .actions-wrap.signed a.my,
  .star-header .top .actions-wrap.signed a.change-star,
  .star-header .top .actions-wrap.signed .avatar {
    display: inline-block;
  }
  .change-star .iconfont{
    vertical-align: top;
    margin-right: 4px;
  }
  .star-header .top .actions-wrap .link-btn .iconfont {
    color: #adadad;
    margin-right: 2px;
    font-size: 12px;
  }

  .star-header .top .actions-wrap .my-btn {
    margin-left: 10px;
  }

  .star-header .top .actions-wrap .my-btn,
  .star-header .top .actions-wrap .change-star-btn {
    /*width: 110px;*/
    display: inline-block;
    height: 34px;
    line-height: 34px;
    vertical-align: top;
    position: relative;
    z-index: 3;
    padding: 0 10px;
  }

  .star-header .top .actions-wrap .my-btn:hover,
  .star-header .top .actions-wrap .change-star-btn:hover {
    /*background-color: #333;*/
  }

  .star-header .top .actions-wrap .caret {
    transform: rotate(0deg);
    transition-duration: .3s;
  }

  .star-header .top .actions-wrap .my-btn:hover .my .caret,
  .star-header .top .actions-wrap .change-star-btn:hover .change-star .caret {
    transform: rotate(180deg);
  }

  .star-header .top .actions-wrap .my-btn .wrap {
    position: absolute;
    width: 100%;
    height: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    overflow: hidden;
    background-color: #333;
    transition-duration: .5s;
    border-radius: 0 0 5px 5px;
    z-index: 3;
    visibility: hidden;
  }

  .star-header .top .actions-wrap .change-star-btn .change-star-wrap {
    position: absolute;
    width: 400px;
    height: 0;
    bottom: 0;
    right: 0;
    opacity: 0;
    overflow: hidden;
    transition-duration: .5s;
    padding: 10px;
    background: #FFFFFF;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px 0 rgba(0,0,0,0.08);
    border-radius: 4px;
    z-index: 3;
    visibility: hidden;
  }
  .star-header .top .actions-wrap .change-star-btn:hover .change-star-wrap {
    opacity: 1;
    height: 200px;
    bottom: -200px;
    transition-duration: .3s;
    visibility: visible;
  }
  .star-header .top .actions-wrap .my-btn .wrap ul li {
    display: block;
    height: 50px;
    line-height: 50px;
    background-color: #424242;
    text-align: center;
  }

  .star-header .top .actions-wrap .my-btn .wrap ul li:hover {
    background-color: #383838;
  }

  .star-header .top .actions-wrap .change-star-btn .change-star-wrap .item {
    display: block;
    float: left;
    /*width: calc((100% - (20px * 5)) / 5);*/
    width: 54px;
    height: 82px;
    margin: 10px 10px 0 10px;
    transition: none;
    -webkit-transition: none;
    -transition: none;
    -ms-transition: none;
    -moz-transition: none;
    transition-duration: 0s;
    position: relative;
  }

  .star-header .top .actions-wrap .change-star-btn .change-star-wrap .item.love:before {
    content: '';
    position: absolute;
    top: 35px;
    right: -6px;
    width: 20px;
    height: 20px;
    background-image: url("/static/images/star/love.png");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
  }
  .star-header .top .actions-wrap .change-star-btn .change-star-wrap .item img {
    width: 54px;
    height: 54px;
    border: 1px solid rgba(0,0,0,0.04);
    border-radius: 50%;
  }

  .star-header .top .actions-wrap .change-star-btn .change-star-wrap .item.add-more {
    position: relative;
  }

  .star-header .top .actions-wrap .change-star-btn .change-star-wrap .item.add-more:before {
    content: '';
    display: block;
    border-radius: 50%;
    position: relative;
    left: 0;
    top: 0;
    width: 54px;
    height: 54px;
    background-image: url("/static/images/star/user_rank_follow_add.png");
    background-repeat: no-repeat;
    background-position: center;
    background-size: 24px 24px;
    border: 1px solid rgba(0,0,0,0.04);
  }

  .star-header .top .actions-wrap .change-star-btn .change-star-wrap .item .name {
    display: block;
    height: 28px;
    line-height: 28px;
    overflow: hidden;
    text-align: center;
  }

  .star-header .top .actions-wrap .my-btn:hover .wrap {
    opacity: 1;
    transition-duration: .3s;
    visibility: visible;
    height: 300px;
    bottom: -300px;
  }

  .star-header .top .actions-wrap .change-star-btn .change-star-wrap::-webkit-scrollbar {
    width: 5px;
    height: 2px;
  }

  /*å®šä¹‰æ»šåŠ¨æ¡è½¨é“ å†…é˜´å½±+åœ†è§’*/
  .star-header .top .actions-wrap .change-star-btn .change-star-wrap::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
    background-color: #F5F5F5;
  }

  /*å®šä¹‰æ»‘å— å†…é˜´å½±+åœ†è§’*/
  .star-header .top .actions-wrap .change-star-btn .change-star-wrap::-webkit-scrollbar-thumb {
    -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, .3);
    background-color: #555;
  }


  .star-header .top .actions-wrap .change-star-btn:hover .change-star-wrap.scroll {
    overflow-y: scroll;
  }

  .star-header .top .actions-wrap .nav-btn-wrap {
    display: none;
    width: 90px;
    height: 60px;
    background-color: #333;
    border-radius: 0 0 5px 5px;
    position: absolute;
    top: 0;
    right: 0;
    z-index: 2;
    line-height: 50px;
    margin: 0;
    text-align: center;
    transition-duration: .5s;
  }

  .star-header .top .actions-wrap.signed .nav-btn-wrap {
    display: block;
  }

  .star-header .top .actions-wrap.signed .nav-btn-wrap .nav-btn {

  }

  .star-header .top .actions-wrap .nav-btn-wrap .nav-btn:before {
    content: '';
    position: absolute;
    bottom: 0;
    background-image: url(/static/images/star/star_header_arrow_down.png);
    background-position: center;
    background-repeat: no-repeat;
    background-size: 10px;
    left: 0;
    transition-duration: .5s;
    transform: rotate(0deg);
    height: 30px;
    width: 100%;
    display: block;
  }

  .star-header .top .actions-wrap .nav-btn-wrap:hover .nav-btn:before {
    transform: rotate(180deg);
  }

  .star-header .top .actions-wrap .nav-btn-wrap ul {
    max-height: 0;
    opacity: 0;
    /*transition-duration: 1s;*/
    -webkit-perspective: 400px;
    -moz-perspective: 400px;
    -ms-perspective: 400px;
    -o-perspective: 400px;
    perspective: 400px;
  }

  .star-header .top .actions-wrap .nav-btn-wrap:hover {
    overflow: inherit;
    height: auto;
    padding-bottom: 30px;
  }

  .star-header .top .actions-wrap .nav-btn-wrap:hover ul {
    opacity: 1;
    max-height: 1000px;
  }

  .star-header .top .actions-wrap .nav-btn-wrap ul li {
    opacity: 0;
    background-color: #424242;
    -webkit-transform: rotateY(90deg);
    -moz-transform: rotateY(90deg);
    -ms-transform: rotateY(90deg);
    -o-transform: rotateY(90deg);
    transform: rotateY(90deg);
    -webkit-transition: opacity .4s, -webkit-transform .5s;
    -moz-transition: opacity .4s, -moz-transform .5s;
    -ms-transition: opacity .4s, -ms-transform .5s;
    -o-transition: opacity .4s, -o-transform .5s;
    transition: opacity .4s, transform .5s;
  }

  .star-header .top .actions-wrap .nav-btn-wrap:hover ul li {
  }

  .star-header .top .actions-wrap .nav-btn-wrap ul li:hover {
    background-color: #383838;
  }

  .star-header .top .actions-wrap .nav-btn-wrap:hover ul li {
    opacity: 1;
    -webkit-transform: none;
    -moz-transform: none;
    -ms-transform: none;
    -o-transform: none;
    transform: none;
  }

  /* CSS3 delays for transition effects */
  .star-header .top .actions-wrap .nav-btn-wrap:hover ul li:nth-child(1) {
    -webkit-transition-delay: 0s;
    -moz-transition-delay: 0s;
    -ms-transition-delay: 0s;
    -o-transition-delay: 0s;
    transition-delay: 0s;
  }

  .star-header .top .actions-wrap .nav-btn-wrap:hover ul li:nth-child(2) {
    -webkit-transition-delay: 50ms;
    -moz-transition-delay: 50ms;
    -ms-transition-delay: 50ms;
    -o-transition-delay: 50ms;
    transition-delay: 50ms;
  }

  .star-header .top .actions-wrap .nav-btn-wrap:hover ul li:nth-child(3) {
    -webkit-transition-delay: 100ms;
    -moz-transition-delay: 100ms;
    -ms-transition-delay: 100ms;
    -o-transition-delay: 100ms;
    transition-delay: 100ms;
  }

  .star-header .top .actions-wrap .nav-btn-wrap:hover ul li:nth-child(4) {
    -webkit-transition-delay: 150ms;
    -moz-transition-delay: 150ms;
    -ms-transition-delay: 150ms;
    -o-transition-delay: 150ms;
    transition-delay: 150ms;
  }

  .star-header .top .actions-wrap .nav-btn-wrap:hover ul li:nth-child(5) {
    -webkit-transition-delay: 200ms;
    -moz-transition-delay: 200ms;
    -ms-transition-delay: 200ms;
    -o-transition-delay: 200ms;
    transition-delay: 200ms;
  }

  .star-header .top .actions-wrap .nav-btn-wrap:hover ul li:nth-child(6) {
    -webkit-transition-delay: 250ms;
    -moz-transition-delay: 250ms;
    -ms-transition-delay: 250ms;
    -o-transition-delay: 250ms;
    transition-delay: 250ms;
  }

  .star-header .nav-wrap {
    width: 100%;
    /*background-color: #fff;*/
    height: 56px;
    position: relative;
    /*box-shadow: 0 0 8px 1px #bfbfbf;*/
    overflow: hidden;
    transition-duration: .5s;
  }

  /*.star-header .nav-wrap.black {*/
  /*background-color: rgba(9, 9, 9, 0.95);*/
  /*color: #fff;*/
  /*}*/

  .star-header .nav-wrap.white {
    /*background-color: rgba(255, 255, 255, .95);*/
    /*box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px 0 rgba(0,0,0,0.04);*/
  }


  .star-header.fixed .nav-wrap {
    /*background-color: rgba(255, 255, 255, .95);*/
  }

  .star-header .nav-wrap .star-nav {
    width 100%;
    max-width: 1240px;
    /*line-height: 36px;*/
    padding: 10px 0;
    margin: 0 auto;
    position: relative;
  }

  .star-header .nav-wrap .star-nav .nav-item {
    display: inline-block;
    line-height: 36px;
    font-size: 16px;
    color: #656973;
    padding: 0 18px;
    position: relative;
  }
  .header_icon_active{
    display: none;
  }
  .star-header .nav-wrap .star-nav .nav-item.active{
    color: #2D2F33;
  }
  .star-header .nav-wrap .star-nav .nav-item.active .header_icon_active {
    display: block;
    width: 12px;
    height: 12px;
    color: #0d8dfc;
    position: absolute;
    right: 4px;
    top: 6px;
  }
  .star-header .nav-wrap .star-nav .nav-item a:before {
    content: '';
    left: 50%;
    transition-duration: .3s;
    width: 0;
    background-color: #fddc00;
    position: absolute;
    height: 5px;
    bottom: -5px;
  }

  .star-header .nav-wrap .star-nav .nav-item a:hover:before,
  .star-header .nav-wrap .star-nav .nav-item.active a:before {
    width: 100%;
    left: 0;
  }


  .star-header .nav-wrap .star-nav .logo {
    display: inline-block;
    height: 36px;
    width: 36px;
    margin-right: 12px;
  }


  .star-header .nav-wrap .star-nav .logo img {
    display: block;
    width: 100%;
    height: 100%;
    position: relative;
    z-index: 6;
  }
  .header_search {
    width: 200px;
    height: 36px;
    line-height: 36px;
    color: #A8ABB3;
    background-color: #F7F8FA;
    border-radius: 24px;
    margin: 0;
    position: relative;
    z-index: 1;
    transition: width 0.5s;
  }
  #search_btn {
    position: absolute;
    right: 14px;
    top: -1px;
  }
  .header_search a i {
    font-size: 20px;
  }
  .header_search a:hover i{
    color: #0d8dfc
  }
  .header_search input {
    display: block;
    width: 100%;
    height: 100%;
    font-size: 14px;
    color: #A8ABB3;
    background-color: #F7F8FA;
    border-radius: 24px;
    padding-left: 20px;
    transition: width 0.5s;
  }
  .header_search.open {
    width: 280px;
  }
  .header_search input::-webkit-input-placeholder {
    color: #A8ABB3;
  }

  .bor-btn {
    display: block;
    color: #000;
    width: 100%;
    height: 40px;
    line-height: 45px;
    text-align: center;
    position: relative;
    z-index: 2;
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
    -transition: all 0.2s;
    -ms-transition: all 0.2s;
    -moz-transition: all 0.2s;
    border-radius: 5px;
  }

  .bor-btn:before,
  .bor-btn:after {
    transition: all 0.2s;
    -webkit-transition: all 0.2s;
    -transition: all 0.2s;
    -ms-transition: all 0.2s;
    -moz-transition: all 0.2s;
  }

  .bor-btn:before {
    content: '';
    position: absolute;
    top: 0;
    height: 40px;
    width: 100%;
    display: block;
    background-color: #fddc00;
    border-radius: 5px;
    z-index: -1;
  }

  .bor-btn:after {
    content: '';
    position: absolute;
    bottom: -5px;
    height: 10px;
    width: 100%;
    display: block;
    background-color: #f0d100;
    border-radius: 2px 2px 5px 5px;
    z-index: -2;
  }

  .bor-btn:active {
    line-height: 50px;
  }

  .bor-btn:active:before {
    top: 5px;
  }

  .bor-btn:active:after {
    background-color: #fddc00;
  }

  .bor-btn:hover:before {
    background-color: #ffbd00;
  }

  .bor-btn:hover:after {
    background-color: #f2b300;
  }

  .codeImg {
    display: none;
    position: fixed;
    width: 290px;
    height: 330px;
    left: 50%;
    top: 50%;
    margin-left: -145px;
    margin-top: -165px;
    z-index: 99;
    border: 5px solid #000;
    text-align: center;
    background-color: #fff;
  }

  .codeImg .desc {
    height: 80px;
    padding: 10px 0;
    font-weight: bold;
    line-height: 30px;
    font-size: 16px;
  }

  .codeImg img {
    height: 194px;
    width: auto;
    display: block;
    margin: auto;
  }

  .codeImg .bottom {
    height: 50px;
    line-height: 50px;
    font-size: 16px;
  }

  .codeImg .close {
    opacity: 1;
    position: absolute;
    padding: 12px 15px;
    display: block;
    z-index: 100;
    width: 9px;
    height: 9px;
    top: 0;
    right: 0;
    background-image: url("/static/images/star/star_2dCode_close.png");
    background-position: center;
    background-size: 9px;
    background-repeat: no-repeat;
  }

  .audio_h5 {
    padding: 10px;
  }

  .audio_h5 .iconfont {
    font-size: 18px;
  }

  .load-more-btn {
    color: #3399cc;
    width: 100%;
    border-radius: 5px;
    display: block;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    height: 40px;
    line-height: 40px;
    text-align: center;
    margin-top: 20px;
    outline: none;
  }

  .load-more-btn[disabled] {
    background-color: #efefef;
    color: #d6d6d6;
  }

  .pic_big_wrap {
    margin-top: 8px;
  }


  @media all and (max-width:768px){
    .star-header{

      .change-star-btn{
        display none!important;
      }

      .nav-wrap{
        height: initial;

        .star-nav{
          display: flex;
          overflow: auto;

          .logo{
            flex-shrink: 0;
          }

          .star-nav-item{
            width: initial;
            flex-shrink: 0;
          }
          .header_search{
            display none;
          }
        }
      }

    }
  }
</style>
