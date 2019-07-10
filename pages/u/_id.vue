<template>
  <div class="homepage-main">
    <div class="homepage-header">
      <!--个人主页背景图-->
      <div class="background" :style="'background-image: url('+ userInfo.background +'?x-oss-process=image/resize,m_fill,w_990,h_155,limit_0);'"></div>
<!--      <img :src="userInfo.background" class="background">-->
      <!--个人主页用户信息-->
      <div class="info">
        <div class="avatar-box">
          <img :src="userInfo.avatar || '/static/images/header/tx_pic.jpg'" class="avatar">
          <img src="/static/images/member/v.png" class="vip-icon" v-show="userInfo.type == '1'">
          <img src="/static/images/member/staff.png" class="vip-icon" v-show="userInfo.type == '2'">
        </div>
        <div class="info-details">
          <p class="flex align-center">
            <span class="username">{{userInfo.nickname || '--'}}</span>
            <span class="lv-label">Lv.{{userInfo.rank || 0}}</span>
            <span class="sex male" v-show="userInfo.sex == '1'">
              <i class="iconfont icon-male1"></i>
            </span>
            <span class="sex female" v-show="userInfo.sex == '2'">
              <i class="iconfont icon-female1"></i>
            </span>
            <img :src="userInfo.badge_image" class="badge-icon" v-if="userInfo.badge_image">
          </p>
          <p class="row motto">{{userInfo.demo || ''}}</p>
        </div>
<!--        <a class="edit-btn flr" href="/account">{{=score.languagePackage.currPackage['EditPersonalInfo']}}</a>-->
<!--        <div class="h-tool-bar">-->
<!--          <span class="h-btn chat-btn mid"><i class="iconfont icon-IM__chat"></i></span><span class="h-btn follow-btn mid {{= (it.is_attention != '3' && it.is_attention != '1') ? 'islike' : ''}}" data-member_id="{{=it.member_id}}" data-attention_status="{{=it.is_attention}}">{{=it.is_attention == '3' ? score.languagePackage.currPackage['Friends'] : it.is_attention == '1' ? score.languagePackage.currPackage['Followed'] : score.languagePackage.currPackage['Follow']}}</span>-->
<!--        </div>-->
      </div>

      <div class="menu-box flex justify_between">

        <ul class="menu">
          <li class="item active" data-tab="tab-article" v-if="userInfo.is_dynamic_article == '1'">原创</li>
          <li class="item" data-tab="tab-post">贴子</li>
          <li class="item" data-tab="tab-photo">相册</li>
          <li class="item" data-tab="tab-qa">问答</li>
          <li class="item" data-tab="tab-bet">菠菜组合</li>
<!--          <li class="item" data-tab="tab-collection">{{=score.languagePackage.currPackage['MyBookmark']}}</li>-->
        </ul>
        <ul class="stars">
          <li class="item" data-tab="tab-article" v-if="userInfo.is_dynamic_article == '1'"><span class="mid count article">{{userInfo.dynamic_article_count || '0'}}</span><span class="mid">原创</span></li>
          <li class="item" data-tab="tab-post"><span class="mid count post">{{userInfo.bar_count || '0'}}</span><span class="mid">贴子</span></li>
          <li class="item" data-tab="tab-follow"><span class="mid count follow ">{{userInfo.attention_count || '0'}}</span><span class="mid">关注</span></li>
          <li class="item" data-tab="tab-fans"><span class="mid count fans">{{userInfo.fans_count || '0'}}</span><span class="mid">粉丝</span></li>
        </ul>
      </div>

    </div>

    <!--主内容-->
    <div class="homepage-body">
      <!--中心切换-->
      <div class="homepage-content">
        <!--文章-->
        <div class="tab tab-article active">
          <div class="post-list-wrap">
            <div class="score-loading top show">
              <img class="score-icon" src="/images/index/score_loading.gif" alt="">
            </div>
            <ul class="article-list post-wrap index_article_list cl"></ul>
            <div class="score-loading bottom">
              <img class="score-icon" src="/images/index/score_loading.gif" alt="">
            </div>
            <div class="load-more star_article_list_more">加载更多</div>
          </div>
        </div>
        <!--贴子-->
        <div class="tab tab-post">
          <div class="select-scroll-wrapper">
            <ul class="select-box" style="width: 510px;">
              <li class="item active" data-type="">全部</li>
              <li class="item" data-type="original">原创</li>
              <li class="item" data-type="bet">组合菠菜</li>
              <li class="item" data-type="picture">图片</li>
              <li class="item" data-type="video">视频</li>
              <li class="item" data-type="sound">语音</li>
              <li class="item" data-type="vote">投票</li>
            </ul>
          </div>
          <div class="post-list-wrap">
            <div class="score-loading top show">
              <img class="score-icon" src="/images/index/score_loading.gif" alt="">
            </div>
            <ul class="post-list post-wrap index_article_list cl"></ul>
            <div class="score-loading bottom">
              <img class="score-icon" src="/images/index/score_loading.gif" alt="">
            </div>
            <div class="load-more star_article_list_more">加载更多</div>
          </div>
        </div>
        <!--相册-->
        <div class="tab tab-photo">
          <div class="tab-photo-list cl"></div>
          <div class="score-loading show">
            <img class="score-icon" src="/images/index/score_loading.gif" alt="">
          </div>
        </div>
        <!--问答-->
        <div class="tab tab-qa">
          <ul class="select-box">
            <li class="item active" data-sort="1">最新</li>
            <li class="item" data-sort="2">最热</li>
          </ul>
          <div class="qa-list-wrap">
            <div class="score-loading top show">
              <img class="score-icon" src="/images/index/score_loading.gif" alt="">
            </div>
            <ul class="qa-list index_article_list"></ul>
            <div class="score-loading bottom">
              <img class="score-icon" src="/images/index/score_loading.gif" alt="">
            </div>
            <div class="load-more star_article_list_more">加载更多</div>
          </div>
        </div>
        <!--菠菜-->
        <div class="tab tab-bet">
          <div class="score-loading top show">
            <img class="score-icon" src="/images/index/score_loading.gif" alt="">
          </div>
          <div class="tab-bet-list cl"></div>
          <div class="score-loading bottom">
            <img class="score-icon" src="/images/index/score_loading.gif" alt="">
          </div>
          <div class="load-more star_article_list_more">加载更多</div>
        </div>
        <!--我的收藏-->
        <div class="tab tab-collection">
          <div class="score-loading top show">
            <img class="score-icon" src="/images/index/score_loading.gif" alt="">
          </div>
          <ul class="tab-collection-list post-wrap index_article_list cl"></ul>
          <div class="score-loading bottom">
            <img class="score-icon" src="/images/index/score_loading.gif" alt="">
          </div>
          <div class="load-more star_article_list_more">加载更多</div>
        </div>
        <!--关注-->
        <div class="tab tab-follow">
          <div class="title-row">
            <h3 class="star-title fll">关注</h3>
            <span class="follow-num flr">共 {{userInfo.attention_count || 0}} 人</span>
            <em class="star-line line-l"></em>
            <em class="star-line line-r"></em>
          </div>
          <div class="tab-follow-list cl"></div>
          <div class="score-loading show">
            <img class="score-icon" src="/images/index/score_loading.gif" alt="">
          </div>
        </div>
        <!--粉丝-->
        <div class="tab tab-fans">
          <div class="title-row">
            <h3 class="star-title fll">粉丝</h3>
            <span class="fans-num flr">共 {{userInfo.fans_count || 0}} 人</span>
            <em class="star-line line-l"></em>
            <em class="star-line line-r"></em>
          </div>
          <div class="tab-fans-list cl"></div>
          <div class="score-loading show">
            <img class="score-icon" src="/images/index/score_loading.gif" alt="">
          </div>
        </div>
      </div>
      <!--右侧精华贴&图集-->
      <div class="homepage-sidebar">
        <div class="score_slide_wrap">
          <h4 class="score_slide_title">精华贴</h4>
          <ul class="essence-post-list">
            <li>
              <div class="score-loading show">
                <img class="score-icon" src="/images/index/score_loading.gif" alt="">
              </div>
            </li>
          </ul>
        </div>
        <div class="slide-photo-wrap"></div>
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "homepage",
    components: {
      // momentSon
    },
    data() {
      return {
        userInfo:{},
        // dynamicShow:'0',
        // category_id:'-1',
        // categoryList:[],
      }
    },
    watch:{
      // categoryList(newVal, oldVal){
      //
      // },
      // deep: true
    },
    async asyncData({app, $axios, error, query}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。

      let res = await app.$api.circle.getCircleList({category_id:'-1'});
      return {
        categoryList: res.data.category_list,
        dataList: res.data.data_list
      }

    },
    fetch() {
      // 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。
    },
    head() {
      // 配置当前页面的 Meta 标签
      return this.$seo(
        `个人主页`,
        `明星圈子,互动社区,主播互动`,
        `Score,致力于为电竞玩家提供专业、快速、全面的赛事信息及专业化的数据查询功能，是电竞玩家赛事互动平台。在这里，还可以关注你喜爱电竞选手，为他打CALL`,
        {
          script: [],
          link: []
        }
      );
    },
    mounted() {
      this.getDynamicDetail();
    },
    methods: {
      //获取用户详情
      async getDynamicDetail(){
        let res = await this.$api.member.getUserInfo({params:{broadcast_id:'75165'}});
        if(res.code == '200'){
          this.userInfo = res.data;
        }
      },

    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .homepage-main {
    max-width: 990px
    width 100%
    margin 0 auto
    .homepage-header {
      width 100%
      box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.03), 0 2px 4px 0 rgba(0, 0, 0, 0.04);
      border-radius: 0 0 2px 2px;
      .background {
        width: 100%
        height: 155px
        background-repeat no-repeat
        background-position center
        background-size cover
      }
      .show-banner {
        width: 30px
        cursor pointer
      }
      .info {
        position relative
        height: 83px
        background #fff
        .avatar-box {
          width: 95px
          height: 95px
          border: 5px solid #fff;
          border-radius: 50%
          position absolute
          top -25px
          left 20px
          background #fff;
          .avatar{
            width 100%
            height 100%
            border-radius 50%
          }
          .vip-icon {
            display block
            width: 28px
            height: 28px
            border-radius 50%
            color #e1c99c
            position absolute
            bottom 0
            right 0
          }
        }
        .info-details {
          margin-left 130px
          padding-top 12px
          .username {
            font-size: 18px;
            font-weight 600
            margin-top -2px
          }
          .lv-label {
            height: 16px
            line-height 16px
            text-align center
            font-size 12px
            color #fff
            margin 0 5px
            padding 0 5px
            background-image: linear-gradient(-135deg, #058AFF 0%, #19A7FF 100%)
            border-radius: 3px;
          }
          .sex {
            width: 16px
            height: 16px
            border-radius 50%
            text-align center
            .iconfont {
              display inline-block
              font-size 12px
              color: #fff
            }
            &.male {
              background #0D8DFC
            }
            &.female {
              background #FF4C97
            }
          }
          .badge-icon{
            width 16px
            height 16px
            margin-left 6px
          }
          .motto {
            font-size: 14px;
            color: #656973
            margin-top 12px
            max-width 600px
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          }
        }
        .edit-btn {
          height: 30px
          line-height 28px
          text-align center
          font-size: 13px;
          color: #0D8DFC;
          border: 1px solid #0D8DFC;
          border-radius: 20px;
          margin 25px 20px 0 0
          padding 0 15px;
          cursor pointer
          &:hover {
            background: #EDF7FF;
          }
        }
        .h-tool-bar {
          margin 25px 20px 0 0
          .chat-btn {
            width: 30px
            height: 30px
            border: 1px solid #0D8DFC;
            border-radius 50%
            text-align center
            padding-top 5px
            cursor pointer
            &:hover {
              background #edf7ff
            }
            .iconfont {
              color: #0D8DFC;
              font-size 18px
            }
          }
          .follow-btn {
            width: 80px
            height: 30px
            line-height 28px
            border: 1px solid #0D8DFC;
            border-radius: 15px;
            font-size: 13px;
            background: #0D8DFC
            color: #FFF;
            text-align: center;
            cursor pointer
            margin-left 10px
            &:hover {
              background: #077EE6;
            }
            &.islike {
              background #fff
              border: 1px solid #0D8DFC
              color: #0D8DFC
              &:hover {
                background: #EDF7FF;
              }
            }
          }
        }
      }
      .menu-box {
        height: 52px
        background: #FAFAFA;
        .menu {
          height: 100%
          margin-left 20px
          .item {
            float: left
            padding 0 15px
            height: 100%
            line-height 52px
            font-size: 16px;
            color: #656973;
            cursor pointer
            &.active {
              font-size: 20px;
              color: #2D2F33;
              font-weight 600;
            }
          }
        }
        .stars {
          margin-top 18px
          .item {
            float: left
            padding 0 20px
            cursor pointer
            +.item {
              position relative
              &:before {
                display block
                content ''
                width: 1px
                height: 16px
                position absolute
                left 0
                background: #EBEBED
              }
            }
            &.active {
              span {
                color: #0d8dfc !important
              }
            }
            span {
              font-size: 14px;
              color: #A8ABB3;
              &.count {
                font-size: 16px;
                color: #2D2F33;
                font-weight 600;
                margin-right 6px;
              }
            }
          }
        }
      }
    }
    .homepage-body {
      margin-top 20px
      padding-bottom 30px
      .video-layer {
        display block
        position absolute
        width: 100%
        height: 100%
        top: 0
        left: 0
        z-index 1
        background-color: rgba(0,0,0, .3);
        background-image url('/images/homepage/play.png')
        background-repeat no-repeat
        background-size 60px
        background-position center
        opacity .7
        transition: background-color .3s, opacity .3s;
        &:hover {
          opacity 1
          background-color: rgba(0,0,0, 0);
        }
      }
    }
    .homepage-content {
      width: 640px
      background #fff
      box-shadow: 0 0 0 1px #EBEBED;
      border-radius: 2px;
      &.full {
        width: 100%;
      }
      &.cl-style {
        box-shadow none
        background transparent
      }
      .tab {
        display none
        width 100%
        &.active {
          display block
        }
        .null-item {
          padding 100px 0
          .tip {
            width: 130px
          }
        }
        .title-row {
          height: 40px
          line-height 40px
          margin 0 12px;
          position relative
          border-bottom 1px solid #F0F1F2;
          &:before {
            content: '';
            display: block;
            width: 4px;
            height: 12px;
            background: #0D8DFC;
            position: absolute;
            left: 0;
            top: 14px;
          }
          h3 {
            margin-left 10px
            font-size 14px
            height: 40px
            line-height 40px
          }
          .follow-num,
          .fans-num {
            color: #a8abb3
            font-size 12px
          }
          .star-line {
            display none
            content ''
            width: 1px
            height: 100%
            background #F0F1F2
            position absolute
            top 75px
            &.line-l {
              left 32%
            }
            &.line-r {
              right 34%
            }
          }
        }
        .status-label {
          margin-left 10px
          padding 3px 8px
          font-size: 12px;
          border-radius 3px
          color: #FFFFFF;
          &.beting {
            background: #0D8DFC;
          }
          &.over {
            background: #16DE9B;
          }
          &.close {
            background: #A8ABB3;
          }
          &.expire {
            background: #FF5C69;
          }
        }
        .type-label {
          display block
          padding 3px 8px
          color #fff
          font-size 16px
          position absolute
          right 0
          bottom 0
          border-radius 6px 0 6px 0
          &.gif {
            background: #0D8DFC;
          }
          &.lang {
            background: #16DE9B;
          }
          &.video {
            background: rgba(0,0,0,0.68);
          }
          &.num {
            background #000
          }
        }
        &.tab-article,
        &.tab-post,
        &.tab-collection {
          .select-scroll-wrapper {
            background #fafafa
          }
          .star_dynamic_main {
            .forward-box {
              width: 596px
              margin 0 auto
            }
            //帖子
            .forward-post {
              display block
              background: #FAFAFA;
              .img-wrap {
                width: 120px
                height: 120px
                float left
                img {
                  width: 100%
                  border-radius: 4px 0 0 4px;
                }
              }
              .post-conent {
                width: calc(100% - 120px)
                height: 120px
                background: #FAFAFA;
                float left
                overflow hidden
                padding 8px 15px
                h2 {
                  font-size: 16px;
                  color: #656973;
                  text-overflow ellipsis
                  overflow hidden
                  white-space nowrap
                }
                p {
                  color: #A8ABB3;
                  height: 44px
                  line-height: 22px;
                  margin-top 8px
                  overflow hidden
                }
                .author {
                  margin-top 15px
                  white-space nowrap
                  text-overflow ellipsis
                  overflow hidden
                }
                img {
                  width: 18px
                  height: 18px
                  border-radius 50%
                }
                span {
                  font-size: 12px;
                  color: #656973;
                  margin-left 8px
                }
              }
            }
            //单场菠菜
            .forward-bet {
              display block
              width: 100%
              height: 60px
              background: #FAFAFA;
              border-radius: 4px;
              margin 0 auto;
              .l-box {
                width: 60px
                height: 60px
                background: #16DE9B;
                border-radius: 4px 0 0 4px;
                text-align: center;
                padding-top: 9px;
                .iconfont {
                  font-size 40px
                  color: #fff;
                }
              }
              .r-box {
                margin-left 15px
                width calc(100% - 75px)
                overflow hidden
                padding-top 3px
                .p1 {
                  margin-top 5px
                  img {
                    width: 24px
                    height: 24px
                  }
                  .title {
                    margin-left 10px
                    font-size: 14px;
                    color: #2D2F33;
                    max-width 400px
                    white-space nowrap
                    overflow hidden
                    text-overflow ellipsis
                  }
                }
                .p2 {
                  margin-top 5px
                  font-size: 12px;
                  color: #A8ABB3;
                  white-space nowrap
                  overflow hidden
                  .end-time {
                    margin-left 18px
                  }
                }
              }
            }
            //组合菠菜
            .forward-bet-group {
              display block
              .item {
                width: 100%
                height: 156px
                border: 1px solid #F0F1F2;
                border-radius 4px;
                background: #fff;
                box-shadow: 0 3px 6px 0 rgba(0,0,0,0.04);
                .bet-details {
                  width: calc(100% - 147px)
                  padding 12px 20px
                  .user-icon {
                    width: 20px
                    height: 20px
                    border-radius 50%
                    background-repeat no-repeat
                    background-position center
                    background-size cover
                  }
                  .username {
                    font-size: 14px;
                    color: #A8ABB3;
                    margin-left 10px
                  }
                  .bet-title {
                    white-space nowrap
                    overflow hidden
                  }
                  .status-label {
                    margin-left 0
                    margin-right 8px
                  }
                  h2 {
                    margin 10px 0
                    font-size 16px
                    color: #2D2F33;
                    margin-right 10px
                    max-width 300px
                    overflow: hidden;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                  }
                  .brackets {
                    font-size 14px
                    color: #a8abb3;
                    margin 0 2px
                  }
                  .num {
                    font-size: 16px;
                    color: #A8ABB3;
                  }
                  .content {
                    font-size: 14px;
                    color: #656973;
                    text-align: justify;
                    line-height: 22px;
                    margin-bottom 10px
                    min-height 45px

                    max-height 45px
                    overflow hidden
                    text-overflow ellipsis
                  }
                  .expiry {
                    font-size: 12px;
                    color: #A8ABB3;
                    .date {
                      margin-left 10px
                    }
                  }
                }
                .win-rate {
                  width: 147px
                  height: 100%
                  position relative
                  &:after {
                    display: block;
                    content: '';
                    width: 1px;
                    height: 80px;
                    background: #f0f1f2;
                    position: absolute;
                    top: 38px;
                    left: 0;
                  }
                  span {
                    display block
                    position absolute
                    top 0
                    right 0
                    background-image: linear-gradient(-225deg, #F0CC84 0%, #F7DD99 100%);
                    border-radius: 0 0 0 4px;
                    font-size: 12px;
                    color: #FFFFFF;
                    height: 20px
                    line-height 20px
                    padding 0 6px
                  }
                  >p {
                    font-size: 12px;
                    color: #A8ABB3;
                    text-align center
                  }
                  .charts {
                    width: 78px
                    height: 78px
                    margin 36px auto 12px
                    .value-key {
                      width: 100%
                      text-align center
                      position absolute
                      top 32px
                      left 0
                      font-size: 16px;
                      color: #2D2F33;
                      font-weight 600
                      &.zero {
                        top: 24px
                        font-size: 14px;
                        color: #FF5C69;
                        line-height: 16px;
                        font-weight 600
                      }
                    }
                  }
                }
              }
            }
          }
          /*红包样式*/
          .list-items-redenvolope{
            margin:10px 0 0 0
            .items-redenvolope-cont{
              width: 343px
              height:140px
              background: url("/images/banner/Post_luckymoney@2x.png") no-repeat
              background-size:100% 100%
              .redenvolope-cont-top{
                .redenvolope-top-left{
                  margin:11px 0 0 12px
                  .redenvolope-avatar{
                    height: 32px
                    width: 32px
                    border-radius:50%
                    background: #FFFFFF;
                    border: 2px solid #FFDD8D;
                  }
                  .redenvolope-name{
                    margin-left: 8px
                    display: inline-block
                    font-size: 14px;
                    color: #FFDD8D;
                  }
                }
                .redenvolope-top-right{
                  margin:17px 12px 0 0
                  .redenvolope-type{
                    display: inline-block
                    font-size: 14px;
                    color: #FFFFFF;
                    margin-right: 6px
                  }
                  .redenvolope-type-img{
                    height: 18px
                    width: 18px
                    border-radius: 4px;
                  }
                }
              }
              .redenvolope-cont-middle{
                margin: 40px 0 0 0
                font-size: 16px;
                color: #FFDD8D;
                text-align: center
              }
            }
          }


          /* 音频部分显示*/
          .list-items-radio{
            cursor pointer
            margin-top: 10px
            width: 328px
            height:60px
            border-radius: 8px;
            .cubeshape {
              width: 100%;
              height: 60px;
              position relative

              .item-cube {
                position: absolute;
                width: 100%
                height: 100%
                background: url("/images/banner/radio.png") no-repeat;
                background-size: 100% 100%
                transition opacity .3s, z-index .3s, visibility .3s;
                &.items-radio-first {
                  z-index 1
                  visibility visible
                  opacity 1
                  .radio-left{
                    margin:15px 0 0 16px
                    .radio-icon{
                      font-size: 13px
                      color: #fff
                    }
                    .radio-text{
                      margin-top: 16px
                      margin-left: 9px
                      font-size: 14px;
                      color: #FFFFFF;
                    }
                  }
                  .radio-right{
                    margin-top: 14px
                    margin-right: 20px
                    font-size: 14px;
                    line-height: 20px
                    color: #FFFFFF;
                  }
                }
                &.items-radio-second {
                  z-index -1
                  visibility hidden
                  opacity 0
                  .items-radio-left {
                    margin:15px 0 0 16px
                    .icon-player{
                      font-size 12px
                      color: #fff
                    }
                  }
                  .items-radio-right{}
                }
              }

              &.turn {
                .item-cube {
                  &.items-radio-first {
                    z-index -1
                    visibility hidden
                    opacity 0
                  }
                  &.items-radio-second {
                    z-index 1
                    visibility visible
                    opacity 1
                  }
                }
              }

              &.rotate {
                animation: rotate-y 0.3s;
              }
            }

            .audiojs {
              width: 98%
              .scrubber {
                width: 60%
              }
              .reset-play {
                right 21%
              }
            }
          }


          // 视频
          .video-block {
            width: 240px
            height: 160px
            border-radius 4px
            overflow hidden
            position relative;
          }


          /*赛事样式*/
          .list-items-match{
            margin-top:10px
            width: 320px
            height:110px
            background: #FFFFFF;
            border: 1px solid #F0F1F2;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.03);
            border-radius: 6px;
            .items-match-top{
              width:300px
              margin: 10px auto 0
              text-align: center
              font-size: 12px;
              color: #A8ABB3;
              background: #F7F8FA;
              border-radius: 8px;
              height: 22px
              line-height: 22px
            }
            .items-match-middle{
              text-align: center
              margin-top: 11px
              .items-match-left{
                margin-left: 26px
              }
              .items-match-right{
                margin-right: 26px
              }
              .items-match-left,.items-match-right{
                .match-left-img{
                  height: 40px
                  width: 40px
                }
                .match-left-name{
                  font-size: 14px;
                  color: #2D2F33;
                  line-height: 14px
                  text-align: center
                }
              }
              .items-match-cont{
                display: inline-block
                .tems-match-cont-vs{
                  margin-top: 5px
                  display:inline-block
                  height: 30px
                  width: 30px
                  text-align: center
                  line-height: 30px
                  background: #F0F1F2;
                  border-radius:50%
                  font-size: 13px;
                  color: #656973;
                  margin-bottom: 6px
                }
                .items-match-cont-score{
                  margin-top: 8px
                  font-size: 18px;
                  color: #2D2F33;
                  margin-bottom: 12px
                }
                .items-match-cont-time{
                  font-size: 12px;
                  color: #A8ABB3;
                }
              }
            }
          }


          /*幻联赛房间显示*/
          .list-items-room{
            cursor: pointer;
            margin-top: 10px
            width: 351px
            height:130px
            background: #FFFFFF;
            border: 1px solid #F0F1F2;
            box-shadow: 0 2px 4px 0 rgba(0,0,0,0.03);
            border-radius: 4px;
            .items-room-top{
              height: 50px
              background-size:100% 100%
              border-radius: 4px 4px 0 0;
              .room-type-bg1{
                background: #0D8DFC;
              }
              .week-bg{
                background: #ff1a65;

              }
              .new-people-bg{
                background: #29a7ff;

              }
              .day-bg{
                background: #00cfd7;

              }
              .star-people-bg{
                background: #fe892c;

              }
              .active-bg{
                background: #ffbb2a;

              }
              .dunai-bg{
                background: #b00000;

              }
              .solo-bg1{
                background: #373a41;

              }
              .room-top-left{
                .room-top-type{
                  margin: 8px 0 0 10px
                  height: 34px
                  width: 34px
                  line-height: 34px
                  text-align: center
                  border-radius:50%
                  font-size: 12px;
                  color: #F3F5F7;
                  .memeber-ava{
                    height: 34px
                    width: 34px
                    border-radius 50%
                  }
                }
                .room-top-name{
                  margin-left:54px
                  .room-top-title{
                    width: 200px
                    overflow: hidden
                    white-space:nowrap
                    text-overflow ellipsis
                    margin-top: 8px
                    font-size: 15px;
                    color: #FFFFFF;
                    line-height:20px
                  }
                  .room-top-desc{
                    width: 200px
                    overflow: hidden
                    white-space:nowrap
                    text-overflow ellipsis
                    font-size: 10px;
                    color: #FFFFFF;
                    line-height:20px
                  }
                  .roo-color{
                    color: black;
                  }
                }
              }
              .room-top-right{
                margin: 8px 12px 0 0
                .room-top-people{
                  font-size: 15px;
                  color: #FFFFFF;
                  line-height: 21px
                }
                .room-top-num{
                  text-align: right
                  font-size: 10px;
                  color: #FFFFFF;
                }

              }
            }
            .items-room-middle{
              margin:7px 10px 0
              .room-score{
                font-size: 16px;
                color: #2D2F33;
                line-height: 22px
              }
              .room-score1{
                font-size: 16px;
                color: #B89868;
                line-height: 22px
              }
              .room-score-text{
                font-size: 12px;
                color: #A8ABB3;
                line-height: 17px
              }
              .icon-menpiao{
                font-size: 12px
                color: #0D8DFC
                vertical-align:middle
                display: inline-block
                margin-bottom: 2px
              }
              .icon-list-guozi{
                height: 11px
                width: 11px
                vertical-align:-1px
              }
              .room-middle-first{
                display: inline-block
                width:23%
                text-align: center
              }
              .room-middle-second{
                display: inline-block
                width:23%
                text-align: center
              }
              .room-middle-third{
                display: inline-block
                width:23%
                text-align: center
              }
              .room-middle-four{
                display: inline-block
                width:27%
                text-align: center
              }
            }
            .items-room-bottom{
              margin:8px 0 0 10px
              .room-bottom-left{
                padding: 0 6px
                height: 18px
                line-height: 18px
                text-align: center
                font-size: 12px;
                color: #FFFFFF;
                background: #0D8DFC;
                border-radius: 4px;
              }
              .room-bottom-right{
                line-height: 18px
                margin-left:8px
                .icon-time{
                  color: #A8ABB3
                  font-size: 12px
                  vertical-align -1px
                }
                .room-bottom-time{
                  margin-left 7px
                  font-size: 12px;
                  color: #A8ABB3;
                }
              }
            }
          }


          .type-label {
            border-radius 4px 0 4px 0
            font-size 12px;
          }
        }
        &.tab-photo {
          padding 13px 13px 30px
          .add-date {
            clear both
            font-size: 24px;
            color: #2D2F33;
            padding 25px 8px 10px
          }
          .item {
            width: 241px
            height: 241px
            border-radius 6px
            padding 3px
            overflow hidden
            position relative
            cursor pointer
            float: left
            .photo {
              border-radius 6px
              width: 100%
              height: 100%
            }
            .type-label {
              right: 3px
              bottom: 3px
            }
            .video-layer {
              width: calc(100% - 6px)
              height: calc(100% - 6px)
              border-radius 6px;
              top 3px;
              left: 3px;
            }
          }
        }
        &.tab-bet {
          .item {
            width: 100%
            height: 156px
            background: #FFFFFF;
            box-shadow: 0 0 0 1px #EBEBED;
            border-radius: 2px;
            +.item {
              margin-top 12px
            }
            .bet-details {
              width: 475px
              padding 14px 24px
              .user-icon {
                width: 20px
                height: 20px
                border-radius 50%
                background-repeat no-repeat
                background-position center
                background-size cover
              }
              .username {
                font-size: 14px;
                color: #A8ABB3;
                margin-left 10px
              }
              .bet-title {
                white-space nowrap
                overflow hidden
              }
              h2 {
                margin 10px
                font-size 16px
                color: #2D2F33;
                margin-right 10px
                max-width 325px
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
              }
              a {
                &:hover {
                  h2 {
                    color: #4B9CE3
                  }
                }
              }
              .brackets {
                font-size 14px
                color: #a8abb3;
                margin 0 2px
              }
              .num {
                font-size: 16px;
                color: #A8ABB3;
              }
              .content {
                font-size: 14px;
                color: #656973;
                text-align: justify;
                line-height: 22px;
                margin-bottom 10px
                height 45px
                overflow hidden
              }
              .expiry {
                font-size: 12px;
                color: #A8ABB3;
                .date {
                  margin-left 10px
                }
              }
            }
            .win-rate {
              width: 165px
              height: 100%
              position relative
              &:after {
                display block
                content ''
                width: 1px
                height: 80px
                background: #F0F1F2;
                position absolute
                top 38px
                left 0
              }
              span {
                display block
                position absolute
                top 0
                right 0
                background-image: linear-gradient(-225deg, #F0CC84 0%, #F7DD99 100%);
                border-radius: 0 0 0 4px;
                font-size: 12px;
                color: #FFFFFF;
                height: 20px
                line-height 20px
                padding 0 6px
              }
              >p {
                font-size: 12px;
                color: #A8ABB3;
                text-align center
              }
              .charts {
                width: 84px
                height: 84px
                margin 36px auto 10px
                .value-key {
                  width: 100%
                  text-align center
                  position absolute
                  top 34px
                  left 0
                  font-size: 16px;
                  color: #2D2F33;
                  font-weight 600
                  &.zero {
                    top: 28px
                    font-size: 14px;
                    color: #FF5C69;
                    line-height 16px
                    font-weight 600
                  }
                }
                &.en {
                  .value-key {
                    &.zero {
                      top: 34px
                    }
                  }
                }
              }
            }
            .status-label {
              margin-left 0;
            }
          }
          .load-more {
            background #fff
            width: 100%
            margin-left 0
          }
        }
        &.tab-follow, &.tab-fans {
          .tab-follow-list,
          .tab-fans-list {
            padding 15px 12px
          }
          .item {
            overflow hidden
            width calc(100% / 3)
            float left
            padding 15px 20px
            .user-icon {
              width: 70px
              height: 70px
              border-radius 50%
              border: 1px solid rgba(0,0,0,0.04)
              position relative
              float left
              .avatar {
                display block
                width: 100%
                border-radius 50%
              }
              .sign-icon {
                display block
                width: 22px
                height: 22px
                border-radius 50%
                //color #e1c99c
                position absolute
                bottom 0
                right 0
              }
            }
            .user-info {
              float left
              padding-left 12px
              width calc(100% - 70px)
              overflow hidden
              .nickname {
                font-size: 16px;
                color: #2D2F33;
                font-weight 600
                margin-top 2px
                white-space nowrap
              }
              .demo {
                font-size: 12px;
                color: #A8ABB3;
                min-height 16px
                line-height 16px
                margin-top 5px
                white-space nowrap
                text-overflow ellipsis
                overflow hidden
              }
              .status {
                display block
                width: 70px
                line-height: 23px
                background: #0D8DFC
                border-radius 20px
                font-size: 12px;
                color: #FFFFFF;
                text-align: center;
                margin-top 5px
                cursor pointer
                &:hover {
                  background: #077EE6;
                }
                &.islike {
                  background #fff
                  border: 1px solid #0D8DFC
                  color: #0D8DFC
                  &:hover {
                    background: #EDF7FF;
                  }
                }
              }
            }
          }
        }
        &.tab-follow {
          .tab-follow-list {
            .status {
              &.he {
                cursor default !important
              }
            }
          }
        }
      }
      .select-box {
        width: 100%
        height: 50px
        background: #FAFAFA;
        //box-shadow: 0 0 0 1px #F5F6F7;
        padding-top 12px;
        padding-left 15px;
        .item {
          width: 60px
          height: 26px
          line-height 26px
          background: #F0F1F2;
          border-radius: 8px;
          font-size: 12px;
          color: #656973;
          float: left
          text-align center
          cursor pointer
          +.item {
            margin-left 10px;
          }
          &.active {
            background: #0D8DFC;
            color #fff;
          }
        }
        .other {
          float right
          font-size: 12px;
          color: #A8ABB3;
          padding 6px 16px 0 0
          .iconfont {
            font-size 12px
          }
          span {
            margin-right 10px
            vertical-align bottom
          }
          .num {
            display inline
            font-style normal
          }
        }
      }
      .load-more {
        display none
        cursor pointer
        &.show {
          display block
          margin-bottom 15px
        }
        &:hover {
          color: #4B9CE3;
        }
      }

    }
    .homepage-sidebar {
      width: 330px
      .score_slide_title {
        border-bottom 1px solid #F0F1F2;
      }
      .essence-post-list {
        padding 12px;
        .item {
          width 100%;
          height: 54px
          background: #F7F8FA;
          border-radius: 8px;
          padding 0 10px 0 12px;
          cursor pointer;
          +.item {
            margin-top 13px
          }
          a {
            //display block
            //width 100%
            &:hover {
              color: #4B9CE3;
            }
          }
          h2 {
            width 100%;
            font-size: 15px;
            padding-top 10px
            text-align justify
            white-space nowrap
            overflow hidden
            text-overflow ellipsis
            font-weight normal
          }
          p {
            width 100%;
            font-size: 13px;
            color: #A8ABB3;
            margin-top 6px;
            text-align justify
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
          }
        }
        .null-item {
          padding 40px 0
          .tip {
            width: 100%
            >img {
              width: 120px
              margin 0 auto;
              margin-bottom 20px;
            }
          }
        }
      }
      .photo-box {
        padding 10px
        .photo-item {
          float: left;
          width: 100px
          height: 100px
          margin-top 5px
          margin-left 5px
          cursor pointer;
          position relative;
          .video-layer {
            background-size: 35px;
          }
          &:nth-child(1) {
            width: 205px
            height: 205px
            margin-left 0
            margin-top 0
            .video-layer {
              background-size: 60px;
            }
          }
          &:nth-child(2) {
            margin-top 0
          }
          &:nth-child(4) {
            margin-left 0
          }
          >img {
            width: 100%
          }
        }
      }
    }
  }


  @media all and (max-width: 768px) {


  }

</style>
