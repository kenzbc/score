<template>
  <div class="task-main">
    <div class="task-container">
      <div class="header-bg"></div>
      <div class="inner-container">
        <div class="header-wrap">{{$t('taskPage.title')}}</div>
        <div class="body-wrap cl">
          <div class="task-content fll">
            <!--没人任务-->
            <div class="piece task-piece">
              <h2 class="title">{{$t('taskPage.dailyTasks')}}</h2>
              <ul class="task-list daily">
                <li class="item" v-for="item in dataList" v-if="item.type == '1' && item.go_url_for_web != ''">
                  <svg class="icon item-icon" aria-hidden="true"><use :xlink:href="icon[item.keyword]"></use></svg>
                  <div class="task-info cl">
                    <p class="fll">
                      <span class="desc">{{item.title}}</span>
                      <span>({{item.finish}}/{{item.total_num}})</span>
                    </p>
                    <div class="reward flr">
                      <span>{{$t('global.reward')}}:</span>
                      <span class="guozi-wrap"><svg class="icon guozi" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg>
                        <strong class="text-gz">{{$t('global.fruit')}}</strong>
                        <strong class="mark">+</strong>
                        <strong>{{item.guozi}}</strong>
                      </span>
                      <span class="exp-wrap">
                        <svg class="icon exp" aria-hidden="true"><use xlink:href="#icon-jingyan"></use></svg>
                        <strong class="text-exp">{{$t('global.experience')}}</strong>
                        <strong class="mark">+</strong><strong>{{item.points}}</strong>
                      </span>
                    </div>
                  </div>
                  <svg v-if="item.status == '2'" class="icon status" aria-hidden="true"><use xlink:href="#icon-general_checkbox_on"></use></svg>
                  <a v-else class="status-btn" :href="item.go_url_for_web"><i class="iconfont icon-general__arrow_right"></i></a>
                </li>
              </ul>
            </div>

            <!--新手任务-->
            <div class="piece task-piece">
              <h2 class="title">{{$t('taskPage.newbieTask')}}</h2>
              <ul class="task-list newcome">
                <li class="item" v-for="item in dataList" v-if="item.type == '0' && item.go_url_for_web != ''">
                  <svg class="icon item-icon" aria-hidden="true"><use :xlink:href="icon[item.keyword]"></use></svg>
                  <div class="task-info cl">
                    <p class="fll"><span class="desc">{{item.title}}</span> <span>({{item.finish}}/{{item.total_num}})</span></p>
                    <div class="reward flr">
                      <span>{{$t('global.reward')}}:</span>
                      <span class="guozi-wrap">
                        <svg class="icon guozi" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg>
                        <strong class="text-gz">{{$t('global.fruit')}}</strong>
                        <strong class="mark">+</strong>
                        <strong>{{item.guozi}}</strong>
                      </span>
                      <span class="exp-wrap">
                        <svg class="icon exp" aria-hidden="true"><use xlink:href="#icon-jingyan"></use></svg>
                        <strong class="text-exp">{{$t('global.experience')}}</strong>
                        <strong class="mark">+</strong>
                        <strong>{{item.points}}</strong>
                      </span>
                    </div>
                  </div>
                  <svg v-if="item.status == '2'" class="icon status" aria-hidden="true">
                    <use xlink:href="#icon-general_checkbox_on"></use>
                  </svg>
                  <a v-else class="status-btn" :href="item.go_url_for_web">
                    <i class="iconfont icon-general__arrow_right"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>

          <div class="sidebar flr">
            <div class="piece sidebar-piece">
              <h2 class="title">{{$t('taskPage.fruitBalance')}}</h2>
              <div class="wallet">
                <span>{{$t('taskPage.fruitBalance')}}</span>
                <span>{{memberInfo.guozi1}}</span>
              </div>
              <a class="detail-btn" href="/account?status=1&amp;bank_status=3" target="_blank">查看果子明细</a>
            </div>
            <div class="piece sidebar-piece">
              <h2 class="title">{{$t('global.experience')}}</h2>
              <div class="exp-info">
                <span class="lv">Lv.{{memberInfo.rank}}</span>
                <span class="label">经验值</span>
                <span class="symbol">:</span>
                <span class="exp">{{memberInfo.next_rank_now_points}} / {{memberInfo.next_rank_need_points}}</span>
                <svg class="icon guozi" aria-hidden="true"><use xlink:href="#icon-explain"></use></svg>
              </div>
              <div class="exp-bar">
                <div class="inner-bar" :style="'width:'+(memberInfo.next_rank_now_points/memberInfo.next_rank_need_points)*100+'%'"></div>
              </div>
            </div>
            <div class="piece sidebar-piece">
              <div class="task-tip">
                <p>做任务的好处</p>
                <p>完成任务是最稳定的获取果子的途径。</p>
                <p>您可以在个人中心的【我的任务】中查看到当天还能完成的任务</p>
              </div>
            </div>
          </div>

        </div>
      </div>

    </div>

  </div>
</template>

<script>
  export default {
    name: "task",
    middleware:'user-auth',//页面需要登录才能访问
    components: {},
    data() {
      return {
        icon: {
          bet: '#icon-bocai3',
          sign_star: '#icon-guanfanghao',
          comment: '#icon-circle__comment',
          praise: '#icon-circle__good_Gray',
          login: '#icon-login',
          share_dynamic: '#icon-news',
          share_fantasy: '#icon-share-51',
          read_news: '#icon-task_article',
          qq: '#icon-qq',
          sina: '#icon-weibo',
          WeChat: '#icon-wechat',
          groupBet: '#icon-bocai3'
        },
        memberInfo:{}
      }
    },
    head() {
      return this.$seo(
        `任务中心-Score-电竞玩家赛事社区`,
        `每日任务,获取果子,赛高,Score,电竞,玩家赛事,社区,LOL,英雄联盟,pubg,绝地求生,赛事视频,文字直播`,
        `完成任务是最稳定的获取果子的途径，您可以在个人中心的【我的任务】中查看到当天还能完成的任务。`,
        {
          script: [],
          link: []
        }
      );
    },
    async asyncData({app, $axios, store, error}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
      let [res, userRes] = await Promise.all([
        app.$api.task.getTaskCenter(),
        app.$api.member.getUserInfo({params:{broadcast_id:store.state.modules.login.member_id}})
      ])

      return {
        dataList: res.data,
        memberInfo: userRes.data
      }

    },
    mounted() {
      console.log('dataList='+this.dataList);
      console.log('userInfo='+this.memberInfo);
      if(Object.keys(this.memberInfo).length > 0){
        this.$store.commit('modules/login/setUserInfo', this.memberInfo);
      }
    },
    methods: {

    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .task-main {
    max-width: 990px;
    margin: 0 auto;
    width: 100%;
    zoom: 1;
    padding-top: 0px;
    display flex;
    flex-wrap wrap;
    justify-content space-between;
  }


  .task-container {
    width: 1024px
    margin 0 auto
    padding-bottom 43px
    margin-bottom 50px
    position relative

    .header-bg {
      width: 100%
      height: calc(100% - 130px)
      position absolute
      top 130px
      background:linear-gradient(180deg,#fff,#fcfcfc);

      &:before,
      &:after {
        display block
        content ''
        width: 24px
        height: 100%
        position absolute
        top 0
        background #F5F6F7
      }

      &:before {
        left 0
      }

      &:after {
        right 0
      }
    }

    .inner-container {
      background-image url('/static/images/task/header_bg.png')
      background-repeat no-repeat
      background-position 0 0
      background-size 100% 175px
      position relative
    }
  }
  .header-wrap {
    width 100%
    color #fff
    font-size 24px
    padding 47px 0 0 50px
  }
  .body-wrap {
    width 940px
    margin 0 auto
    padding-top 24px
    .piece {
      background:rgba(255,255,255,1);
      box-shadow:0px 8px 36px -6px rgba(0,86,184,0.06);
      border-radius:8px;

      .title {
        height: 44px;
        line-height: 44px;
        position: relative;
        font-size: 15px;
        color: #2D2F33;
        padding-left: 10px;
        border-bottom: 1px solid #F0F1F2;
        &:before {
          display: block;
          content: '';
          width: 4px;
          height: 12px;
          background: #0d8dfc;
          position: absolute;
          top: 16px;
          left: 0;
        }
      }

      &.task-piece {
        width:590px;
        padding 0 20px
        min-height: 100px

        +.task-piece {
          margin-top 20px
        }
      }
      &.sidebar-piece {
        width: 330px
        padding 0 17px
        padding-bottom 20px

        +.sidebar-piece {
          margin-top 16px
        }

        .wallet {
          width: 100%
          height: 71px
          background-image url('/static/images/task/wallet_bg.png')
          background-repeat no-repeat
          background-position center
          background-size cover
          margin 20px auto 9px
          color #fff
          line-height 67px
          font-size 14px

          span {
            &:nth-of-type(1) {
              float left
              margin-left 68px
            }
            &:nth-of-type(2) {
              float right
              margin-right 20px
              font-size 20px
            }
          }
        }
        .detail-btn {
          display block
          width 290px
          height 36px
          border-radius 18px
          border 1px solid #EBEBED
          margin 0 auto
          color #656973
          text-align center
          line-height 34px
          transition-duration .3s

          &:hover {
            background: #F0F1F2;
            border: 1px solid #D0D3D9;
          }
        }

        .exp-info {
          margin-top 20px
          span {
            display inline-block
            vertical-align middle
            font-size 12px
            color: #A8ABB3
          }
          .lv {
            min-width: 38px
            height: 17px
            line-height 16px
            text-align center
            color #fff
            padding 0 8px
            background: linear-gradient(135deg,rgba(25,167,255,1),rgba(5,138,255,1));
            border-radius 3px
          }
          .label {
            margin-left 3px
          }
          .exp {
            margin-left 3px
            strong {
              color: #a8abb3;
              font-weight: normal;
              margin-top: -5px;
              display: inline-block;
              padding: 0 1px;
            }
          }
          .icon {
            width: 14px
            height: 14px
            color: #A8ABB3
            margin-left 2px
            display inline-block
            vertical-align middle
          }
        }

        .exp-bar {
          width: 290px
          height: 16px
          background: #EBEBED
          border-radius: 3px
          overflow hidden
          margin-top 10px
          margin-bottom 6px
          .inner-bar {
            height: 100%
            width: 100px
            background: linear-gradient(-135deg,rgba(26,151,235,1),rgba(19,127,242,1));
            border-radius: 3px;
          }
        }

        .task-tip {
          padding 0 3px
          p {
            color #656973
            font-size 14px
            line-height 24px
            padding-top 16px
            &:nth-of-type(1) {
              font-size 16px
              color #2D2F33
              font-weight 600
            }
          }

        }
      }
    }

    .task-list {
      width: 100%

      .item {
        height 57px

        +.item {
          border-top: 1px solid rgba(240,241,242,1);
        }
        .icon {
          width: 20px
          height: 20px
          vertical-align middle
        }
        .item-icon {
          display inline-block
          color: #0D8DFC
          margin-top -53px
        }
        .task-info {
          display inline-block
          width: 90%
          height: 100%
          padding-top 17px
          margin-left 3px
          p {
            font-size 14px
            color #656973
            height: 20px
            line-height 20px
            max-width 60%
            overflow: hidden
            white-space nowrap
            .desc {
              color #2D2F33
            }
          }
          .reward {
            span {
              display inline-block
              width 65px
              font-size 12px
              color #A8ABB3
              overflow hidden
              white-space nowrap

              &:nth-of-type(1) {
                width auto
                padding-right 3px
              }
            }
            strong {
              color #A8ABB3
              font-weight normal
              display inline-block
              &.mark {
                margin-top -1px
              }
            }

            .text-gz,
            .text-exp {
              display none
            }

            .icon {
              margin-right 5px
            }
          }
        }
        .status-btn {
          display block
          height: 20px
          line-height 19px;
          padding 1px 3px 3px
          margin-top 18px
          float right
          border-radius 50%
          background #F5F6F7

          .iconfont {
            font-size 14px
            color #A8ABB3
          }
        }
        .status {
          float right
          margin-top 18px
        }
      }
    }
  }


  @media screen and (max-width: 1024px) {
    .task-container {
      width: 100%

      .header-bg {
        &:before,
        &:after {
          width: calc((100% - 640px) / 2)
        }
      }

      .inner-container {
        background-position top center
        background-size 900px 175px
      }
    }

    .header-wrap {
      width 590px
      margin 0 auto
      padding 47px 0 0 10px
    }

    .body-wrap {
      width: 100%

      .task-content {
        float none
        .task-piece {
          margin 0 auto
        }
      }
      .sidebar {
        display none
      }
    }
  }

  @media screen and (max-width: 600px) {
    .task-container {
      padding-bottom 20px
      margin-bottom 0
      .header-bg {
        height: calc(100% - 115px)
        top 115px

        &:before,
        &:after {
          display none
        }
      }

      .inner-container {
        background-image url('/static/images/task/header_bg_s.png')
        background-size 767px 144px
      }
    }

    .header-wrap {
      width 100%
      padding 37px 0 0 6%
    }

    .body-wrap {
      width: 100%
      padding-top 28px

      .task-content {
        float none
        .task-piece {
          width: 95%
          padding 0 18px
        }
      }

      .task-list {
        width: 100%

        .item {
          height 61px

          .task-info {
            width: 78%
            padding-top 8px
            margin-left 8px
            p {
              float none
              max-width 100%
              .desc {
                margin-right 5px
              }
            }
            .reward {
              float none
              margin-top 5px

              span {

                &:nth-of-type(1) {
                  padding-right 5px
                }
              }
              .guozi-wrap {
                strong {
                  color #FFBA52
                }
              }
              .exp-wrap {
                strong {
                  color #4B9CE3
                }
              }
              .text-gz,
              .text-exp {
                display inline
                margin-right 4px
              }
              .icon {
                display none
              }
            }
          }
          .status-btn,
          .status {
            margin-top 20px
          }
        }
      }
    }
  }


</style>
