<template>
  <div>
    <header-sub-menus>
      <div class="more-match-nav">
        <Dropdown trigger="hover" placement="bottom-start">
          <a href="javascript:void(0)">
            <img class="curr-icon" src="https://img1.famulei.com/z/75153/p/186/1116041976272.jpg" alt="">
            <i class="iconfont icon-icon4"></i>
          </a>
          <DropdownMenu slot="list">
            <nuxt-link v-for="item in tournamentList" class="tournament-item" :to="'/match_pc?tournamentID='+item.tournamentID">
              <img class="tournament-icon" :src="item.list_image_url" alt="">
              <span>{{item.name}}</span>
            </nuxt-link>
          </DropdownMenu>
        </Dropdown>
      </div>
      <li v-for="item in headerSubMenu">
        <nuxt-link :to="item.url + matchInfo.tournamentID" :class="{active : item.active}" class="link">{{item.title}}
          <svg class="icon schdule_icon_active" aria-hidden="true">
            <use xlink:href="#icon-circle_blue"></use>
          </svg>
        </nuxt-link>
      </li>
    </header-sub-menus>


    <div class="match-container" :class="{before: matchInfo.status == '0', playing: matchInfo.status == '1', end: matchInfo.status == '2'}">

      <left-drawer
        :match-info="matchInfo"
        :ji-fen-data="jiFenData"
        :schedule-list="scheduleList"
        @refresh-handler="refPage"
        @change-schedule="changeSchedule"></left-drawer>

      <div class="match-main">
        <!--头部-->
        <header-box :match-info="matchInfo" :after-game-list="afterGameList" @after-change-game-handler="afterChangeGame"
                    @update-review="showReview"></header-box>
        <!-- 比赛直播-->
        <live-room :match-info="matchInfo" :show-menu="isShowLiveDataMenu" v-if="matchInfo.status == '1'" @change-tab-data="changeTabData"></live-room>

        <!--比赛对局列表-->
        <game-list-menu v-if="afterGameList.length > 0" :match-status="matchInfo.status" :after-game-list="afterGameList" @after-change-game-handler="afterChangeGame"></game-list-menu>
        <!--实力指数-->
        <team-comparison :team-data="beforeMatchTeamComparison" :match-info="matchInfo" v-if="matchInfo.status == '0'"></team-comparison>
        <!--近6场交战记录-->
        <game-record :games-data="beforeGameList" :match-info="matchInfo" v-if="matchInfo.status == '0'"></game-record>
        <!--对位信息-->
        <player-comparison :player-data="beforeMatchPlayerComparison" :match-info="matchInfo" v-if="matchInfo.status == '0'"></player-comparison>
        <!--赛后team数据对比-->
        <after-team-comparison :game-data="afterGameData" v-if="afterGameData.result_list && !notData && (matchInfo.status == '1' || matchInfo.status == '2')"></after-team-comparison>
        <!--赛后数据-->
        <after-classification :game-data="afterGameData" v-if="afterGameData.result_list && !notData && (matchInfo.status == '1' || matchInfo.status == '2')"></after-classification>

        <!--赛评、预测、话题、聊天-->
        <match-comments :match-info="matchInfo"></match-comments>
      </div>

      <div class="review-wrap" v-show="review.show">
        <div class="mask-layer" @click="closeMaskLayer"></div>

        <div class="before-review" v-show="review.type == 0" v-if="matchInfo.status == '2'">
          <!--实力指数-->
          <team-comparison :team-data="beforeMatchTeamComparison" :match-info="matchInfo"></team-comparison>
          <!--近6场交战记录-->
          <game-record :games-data="beforeGameList" :match-info="matchInfo"></game-record>
          <!--对位信息-->
          <player-comparison :player-data="beforeMatchPlayerComparison" :match-info="matchInfo"></player-comparison>
        </div>
        <div class="after-review" v-show="review.type == 2">
          <!--<live-data :match-status="matchInfo.status" :menu-index="liveDataMenuIndex" @change-tab-data="changeTabData" @live-change-game="liveChangeGame"></live-data>-->
        </div>
      </div>

      <right-drawer
        :win-width="$store.state.modules.device.screenWidth"
        :match-info="matchInfo"
        :replay-video-list="replayVideoList"
        :splendid-video-list="splendidVideoList"
        :bet-list="betList"
        :photo-list="photoList"
        :news-list="newsList">
      </right-drawer>
    </div>

  </div>
</template>

<script>
  export default {
    name: "",
    components: {
    },
    data() {
      return {
        headerSubMenu: [
          {title: '赛事主页', url: '/match_pc?tournamentID=', active: false},
          {title: '战队数据', url: '/tournament_group?tournamentID=', active: false},
          {title: '选手数据', url: '/tournament_player?tournamentID=', active: false},
          {title: '英雄数据', url: '/tournament_hero?tournamentID=', active: false}
        ],
        tournamentList:[],

        matchId: '',

        photoList:[],
        betList:[],
        newsList:[],
        replayVideoList:[],
        splendidVideoList:[],


        jsonHost: '//img1.famulei.com',
        hostname: "https://www.famulei.com",

        matchInfo: {
          loading: true
        }, // 比赛信息
        tips: {}, // 评论气泡数量
        jiFenData: {},
        beforeMatchData: {}, // 赛前数据
        beforeGameList: {}, // 交战记录
        beforeMatchTeamComparison: {}, // 实力指数
        beforeMatchPlayerComparison: [], // 对位信息
        afterGameList: [], // 赛后对局列表
        afterGameData: {}, // 赛后详情数据
        activeAfterResultId: '',
        review: {
          type: -1,
          show: false, // 显示赛前分析、比赛复盘
        },
        liveDataMenuIndex: 1,
        isShowLiveDataMenu: true, // 是否显示比赛进行中实时数据tab菜单

        //左侧列表
        scheduleList: [],
        isLoadSchedule: true,
        isLiveChangeGame: false, // 是否切换live对局
        gameIndex: 0,
        liveVideoSrc: '',
        notData: false, // 是否有数据
        liveId: ''
      }
    },
    async asyncData({app, $axios, error, store, params, query}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
      console.log(params.pageNo);

      let [matchInfo, matchCmsList] = await Promise.all([
        app.$api.match.getMatchInfo({params:{matchID:params.id}}),
        app.$api.match.getMatchCmsList({params:{matchID:params.id}}),
      ]);

      return {
        matchInfo: matchInfo.data,
        photoList: matchInfo.data.picture.picture_list,//图集
        betList: matchInfo.data.bet_list,//菠菜
        replayVideoList: matchInfo.data.video_list,//视频
        splendidVideoList: matchInfo.data.splendid_video_list,//精彩集锦视频

        newsList: matchCmsList.data.list,
      }

    },
    computed: {
      // 赛后局数列表菜单
      afterGameMenu: function () {
        return this.afterGameList.map(function (item, index) {
          return {
            index: index,
            name: 'GAME ' + (index + 1)
          };
        });
      },
      teamInfo: function () {
        return {
          teamA: {
            id: this.matchInfo.teamID_a
          },
          teamB: {
            id: this.matchInfo.teamID_b
          }
        };
      }
    },
    created() {
      this.$root.$on('refresh-data', (e)=>{
        this.refreshData();
      });
    },
    mounted() {
      this.$store.commit('modules/device/setSideShow', false);
      this.tournamentList = JSON.parse(sessionStorage.getItem('tournamentList'));
      this.matchId = this.matchInfo.matchID;
      this.roundId = this.matchInfo.roundID;

      if(this.matchInfo.status == '0'){
        this.getBeforeMatchData();
      }else{
        this.getAfterGameList();
      }
      this.getJiFenData(this.roundId);
      this.getScheduleList(this.roundId);
    },
    computed: {
      // 赛后局数列表菜单
      afterGameMenu: function () {
        return this.afterGameList.map(function (item, index) {
          return {
            index: index,
            name: 'GAME ' + (index + 1)
          };
        });
      },
      teamInfo: function () {
        return {
          teamA: {
            id: this.matchInfo.teamID_a
          },
          teamB: {
            id: this.matchInfo.teamID_b
          }
        };
      }
    },
    methods: {
      refreshData: function () {
        this.getMatchInfo();
        this.getNewsList();
      },
      refPage: function (matchId) {
        this.isLoadSchedule = false;
        this.refreshData();
      },
      afterChangeGame: function (data) {
        console.log(data);
        this.activeAfterResultId = data;
        this.getAfterGameDetailsData();

        // if (!this.afterGameData[data]) {
        //   this.getAfterGameDetailsData();
        // }
      },
      liveChangeGame: function (data) {
        this.isLiveChangeGame = data;
      },
      changeLiveRoom: function (data) {
        this.liveVideoSrc = data;
      },
      // 比赛详情
      async getMatchInfo() {
        this.$api.match.getMatchInfo({params:{matchID:this.$route.params.id}}).then((res)=> {
          if (res.code == '200') {

            this.matchInfo = res.data;
            this.photoList = res.data.picture.picture_list;//图集
            this.betList = res.data.bet_list;//菠菜
            this.replayVideoList = res.data.video_list;//视频
            this.splendidVideoList = res.data.splendid_video_list;//精彩集锦视频
          } else {
            this.$Message.warning(res.message, 'tip1');
          }
        });

      },
      /**资讯列表**/
      async getNewsList () {

        this.$api.match.getMatchCmsList({params:{matchID:this.$route.params.id}}).then((res)=> {
          if (res.code == 200) {
            this.newsList = res.data.list;
          } else {
            this.$Message.warning(res.message, 'tip1');
          }
        });
      },
      // 赛前数据
      getBeforeMatchData: function () {
        var href = this.jsonHost + '/match_pre/' + this.matchId + '.json';
        // var href = 'https://api.myjson.com/bins/yz1ra';
        // var href = 'https://img1.famulei.com/match_pre/7447.json';
        this.$api.match.matchPreDataJson({params: {matchId: this.matchId}}).then((res)=>{
          if (res.code == 200) {
            this.beforeMatchData = res.data || {};
            this.beforeGameList = this.beforeMatchData.match_record || {};
            this.beforeMatchTeamComparison = this.beforeMatchData.strength_index || {};
            this.beforeMatchPlayerComparison = this.beforeMatchData.match_data || [];
          }
        })

      },
      // 赛后局数列表
      getAfterGameList: function () {
        // var href = 'https://img1.famulei.com/stag1/match/resultlist/7426.json';
        // if (this.liveId) href =  'https://img1.famulei.com/match/resultlist/' + this.liveId + '.json'; // 测试使用线上数据
        this.$api.match.matchResultListJson({params: {matchId: this.matchId}}).then((res)=>{
          if (res.code == 200) {
            this.afterGameList = res.data || [];
            if (this.afterGameList.length > 0) {
              this.activeAfterResultId = this.afterGameList[0].resultID;
              this.getAfterGameDetailsData();
            } else {
              this.notData = true;
            }
          } else {
            this.notData = true;
          }
        })
      },
      // 赛后数据详情
      getAfterGameDetailsData: function () {
        // var href = 'https://img1.famulei.com/stag1/match/result/' + this.activeAfterResultId + '.json';
        // if (this.liveId) href =  'https://img1.famulei.com/match/resultlist/' + this.liveId + '.json'; // 测试使用线上数据

        this.$api.match.matchResult({params:{resultId:this.activeAfterResultId}}).then((res)=>{
          if (res.code == 200) {
            this.afterGameData = res.data || {};
          } else {
            this.notData = true;
          }
        }).catch((err)=> {
          console.log('error: ' + err.status);
          this.notData = true;
        });

      },
      // 赛前分析、比赛复盘
      showReview: function (type) {
        this.review.show = true;
        this.review.type = type;
        if (type == 0) this.getBeforeMatchData();
      },
      changeTabData: function (index) {
        this.isShowLiveDataMenu = false;
        this.liveDataMenuIndex = index;
        this.showReview(2);
      },
      closeMaskLayer: function () {
        this.review.show = false;
        this.isShowLiveDataMenu = true;
        if (this.matchInfo.status == '1') this.liveDataMenuIndex = 1;
      },
      /**资讯列表**/
      getNewsList: function () {
        this.$api.match.getMatchCmsList({params:{'matchID': this.matchId, 'limit': 100}}).then((res)=>{
          if (res.code == 200) {
            this.newsList = res.data.list;
          } else {
            // global_tips(res.message, 'tip1');
          }
        })
      },
      /**左侧赛程列表**/
      getScheduleList: function (roundId) {

        let params = {
          round_id: roundId
        };
        this.$api.match.getMatchScheduleList({params}).then((res)=> {
          if (res.code == 200) {

            var month_list = [];
            for (var item in res.data) {
              month_list.push({
                month: item,
                day: res.data[item]
              });
            }
            this.scheduleList = month_list;

          } else {
            // global_tips(res.message, 'tip1');
          }
        }).catch(function (err) {
          console.log('error: ' + err.status);
        });
      },
      // 左侧栏队伍积分
      getJiFenData: function (roundId) {
        var _this = this;

        var href = this.jsonHost + '/match_round_points/' + roundId + '.json';
//        var href = 'https://img1.famulei.com/match_round_points/staging/1.json';
        this.$api.match.matchRoundPointsJson({params:{roundId:roundId}}).then((res)=>{
          this.jiFenData = res || [];
        })
      },
      changeSchedule: function (roundId) {
        this.getJiFenData(roundId);
        this.getScheduleList(roundId);
      }
    },
    destroyed() {
      this.$store.commit('modules/device/setSideShow', true);
    }
  }
</script>

<style lang="stylus">
  $color-gray = #2D2F33
  $color-gray-1 = #656973
  $color-gray-2 = #A8ABB3
  $color-gray-3 = #D2D4D9
  $color-gray-4 = #EBEBED
  $color-gray-5 = #F0F1F2
  $color-gray-6 = #F5F6F7
  $color-gray-7 = #F7F8FA
  $color-gray-8 = #FAFAFA
  $color-gray-9 = rgba(0, 0, 0, 0.04)

  $color-blue = #0D8DFC
  $c-blue = #0D8DFC
  $c-red = #FF5C69

  ellipsis() {
    white-space nowrap
    overflow hidden
    text-overflow ellipsis
  }

  mid() {
    display inline-block
    vertical-align middle
  }

  .more-match-nav{
    height: 36px;
    color: #a8abb3;
    padding: 0 12px;
    cursor: pointer;
    display: flex;
    align-items: center;
    float: right;
    position: relative;


    &:hover{

      .iconfont{
        transform: rotate(270deg);
        -webkit-transform: rotate(270deg);
      }

      .match-more-list{
        z-index: 1;
        opacity: 1;
        height: 286px;
      }
    }

    img{
      display: inline-block;
      vertical-align: middle;
      height: 20px;
      width: 20px;
    }
    .iconfont{
      display: inline-block;
      vertical-align: middle;
      transform: rotate(90deg);
      -webkit-transform: rotate(90deg);
    }

    .tournament-item{
      display: block;
      height: 40px;
      overflow: hidden;
      padding: 0 10px;
      border-radius: 3px;
      white-space: nowrap;
      text-overflow: ellipsis;

      &:hover,&.active{
        background-color: #3683f7;
        color: #fff;
      }

      img {
        display: inline-block;
        vertical-align: middle;
        height: 20px;
        width: 20px;
      }

      span {
        display: inline-block;
        vertical-align: middle;
        line-height: 40px;
        max-width: 195px;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }

  }



  .match-container {
    max-width 1370px
    margin 0 auto
    padding 50px 0
    display flex;
    justify-content space-between;
    &.before {
      .header-box {
        padding-bottom 16px
      }
    }
    &.playing {
      .header-box {
        padding-bottom 20px
      }
    }
    .top-bar {
      height: 41px
      line-height 40px
      border-bottom 1px solid #F0F1F2
      margin 0 12px
      position relative
      span {
        font-size: 15px;
        font-weight: 600;
        color: #2D2F33
        margin-left 10px
      }
      &:before {
        display block
        content ''
        width: 4px;
        height: 12px;
        background: #0D8DFC
        position absolute
        left 0
        top 15px
      }
    }
    .piece {
      width: 100%;
      background: #fff;
      box-shadow: 0 0 0 1px rgba(235, 235, 237, 1);
      border-radius: 2px;
      + .piece {
        margin-top: 10px;
      }
    }

    .link-btn {
      display inline-block
      width: 90px;
      height: 26px;
      border-radius: 13px;
      border: 1px solid $color-blue;
      color $color-blue
      text-align center
      line-height 24px
      cursor pointer
      font-size 13px
      + .link-btn {
        margin-left 5px
      }
      a {
        display block
        width 100%
        height: 100%
        color $color-blue
      }
      &.live {
        color #fff
        background: linear-gradient(135deg, rgba(13, 126, 255, 1) 0%, rgba(15, 151, 255, 1) 100%);
        font-family 'Industry-Bold'
        line-height 22px
        cursor default
      }
      &:not(.live):hover {
        background #edf7ff
      }
    }
    .avatar {
      width: 40px
      height: 40px
      border-radius 50%
      overflow hidden
      margin 0 auto
      background url('/static/images/tx_pic.jpg') no-repeat center
      background-size cover
      //border 1px solid #eee
      img {
        display block
        width: 100%
        height: 100%
      }
    }

    .team-img,
    .base-img {
      margin 0 auto
      /*background url('/static/images/default_score.png') no-repeat center*/
      background-size cover
      img {
        display block
        width: 100%
        height: 100%
      }
    }
    .property-img {
      margin 0 auto
      background url('/static/images/match/goods_none.png') no-repeat center
      background-size cover
      img {
        display block
        width: 100%
        height: 100%
      }
    }

    .com-box {
      width: 362px
      margin 0 auto
      + .com-box {
        margin-top 10px
      }
      .row {
        width: 100%
        + .row {
          margin-top 2px
        }
      }
      .mid-title {
        width: 150px
        height: 20px
        line-height 20px
        margin 0 auto
        text-align center
        font-size 13px
      }
      .result {
        height: 20px;
        color: #A8ABB3
        font-family: 'Industry-Bold';
        line-height: 18px;
        .val {
          font-size: 16px;
          font-family: 'Industry-Bold';
        }
        .kda {
          font-family: 'Industry-Bold';
          margin 0 3px
          font-size 13px
        }
      }
      .data-bar {
        width: 180px;
        height: 5px;
        background: #F7F8FA
        .rate-bar {
          height: 100%
          background #D2D4D9
        }
        &.l-bar {
          border-radius: 2px 0 0 2px;
          .rate-bar {
            border-radius: 2px 0 0 2px;
          }
        }
        &.r-bar {
          border-radius: 0 2px 2px 0;
          .rate-bar {
            border-radius: 0 2px 2px 0;
          }
        }
      }
      &.l-max {
        .l-r {
          color #2D2F33
        }
        .l-bar {
          .rate-bar {
            background: linear-gradient(135deg, rgba(13, 126, 255, 1) 0%, rgba(15, 151, 255, 1) 100%);
          }
        }
      }
      &.r-max {
        .r-r {
          color #2D2F33
        }
        .r-bar {
          .rate-bar {
            background: linear-gradient(225deg, rgba(255, 76, 106, 1) 0%, rgba(255, 107, 137, 1) 100%)
          }
        }
      }

      &.small {
        width: 100%
        + .com-box {
          margin-top 12px
        }
        .data-bar {
          width: 154px
        }
      }
      &.large {
        width: 100%
        .row + .row {
          margin-top 4px
        }
        .mid-title {
          font-size 15px
          font-weight 600
        }
        .result {
          font-size 18px
        }
        .data-bar {
          width: 333px
          height: 8px
        }
      }
    }
  }


  .left-slide-drawer {
    //display none;
    flex-shrink: 0;
    .drawer-btn{
      display none
    }
    .match-schedule {
      height 100%
      .top-bar {
        border-bottom none
      }
      .match-left-sidebar {
        height calc(100% - 50px)
        .match-left-schedule {
          height calc(100% - 126px)
          overflow-y: auto;
        }
      }
    }

  }

  .left-sidebar {
    width 260px;
    flex-shrink: 0;
    .top-bar {
      border-bottom none
    }
    .match-left-schedule {
      height calc(100vh - 226px)
      overflow-y: auto;
    }
  }

  .right-slide-drawer {
    width: 330px;
    flex-shrink: 0;

    .drawer-btn {
      display none
    }

    .toggle-tab {
      display flex
      width: 100%
      height: 51px
      border-bottom 1px solid rgba(0, 0, 0, 0.06);
      background #fff
      flex-shrink 0
      align-items center
      .item {
        height: 26px;
        line-height 26px;
        text-align center;
        background: #F0F1F2;
        color: #656973;
        border-radius: 8px;
        font-size: 12px;
        font-family: 'PingFangSC-Medium';
        font-weight: 500;
        margin-left: 8px;
        cursor pointer;
        padding 0 10px

        &.active {
          background: #0D8DFC;
          color: #FFFFFF
        }
      }
    }

    .slide-main {
      width: 100%
      height: 100%
      background #fff
      box-shadow: 0 0 0 1px rgba(0,0,0,0.06);
      border-radius: 2px;
      .toggle-tab {
        &.show {
          display flex
        }
      }
      &.wide {
        background transparent
        box-shadow none
        .block {
          box-shadow: 0 0 0 1px rgba(0,0,0,0.06);
          + .block {
            margin-top 12px
          }
        }
      }
    }
  }


  .match-main {
    width: 740px
    margin 0 20px;
    flex-shrink 0;
    .not-data {
      width: 100%
      padding 30px
      img {
        display block
        width: 100%
      }
    }
  }

  .review-wrap {
    width: 100%
    height: 100%
    position: fixed;
    top: 0;
    left: 0;
    z-index: 100;

    .mask-layer {
      width: 100%
      height: 100%
      background: rgba(0, 0, 0, 0.5)
    }
    .before-review {
      width: 780px
      height: 95%
      padding 20px 0
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      z-index 1
      background #F5F6F7
      overflow-y scroll
      .piece {
        width: 740px
        margin 0 auto
      }
    }
    .after-review {
      position absolute
      top 50%
      left 50%
      transform translate(-50%, -50%)
      z-index 1
    }
  }



  /*320-767*/
  @media screen and (min-width: 320px) and (max-width: 767px) {

    .match-container{
      width: 1050px;

      .match-main{
        margin:0;
      }
    }
    .left-sidebar {
      display none;
    }
    .right-sidebar {
      width: 270px;
    }


  }

  /*768-1023*/
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    .left-sidebar {
      display none;
    }

    .left-slide-drawer {
      display inline-block;
      width 260px;
      height 100%;
      position fixed;
      z-index 30;
      top: 50px;
      left 0;

      .drawer-btn {
        position absolute;
        z-index -1;
        top: 200px;
        right: -22px;
        width: 22px;
        height: 80px;
        background: #fff;
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.06), 0px 0px 0px 1px rgba(0, 0, 0, 0.04);
        border-radius: 0px 10px 10px 0px;
        display flex
        align-items center;
        justify-content center;
        cursor pointer;

        .iconfont {
          color: #A8ABB3;
        }
      }

      .drawer-main {
        width 100%;
        height 100%;
        background: #fff;
        box-shadow: 3px 3px 8px 0px rgba(0, 0, 0, 0.04);
        position absolute;
        top: 0;
      }
    }

    .right-slide-drawer {
      width 280px;
      height calc(100% - 101px);
      position fixed;
      z-index 10;
      background #fff;
      top: 101px;
      right 0;

      .drawer-btn {
        position absolute;
        z-index -1;
        top: 200px;
        left: -22px;
        width: 22px;
        height: 80px;
        background: #fff;
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.06), 0px 0px 0px 1px rgba(0, 0, 0, 0.04);
        border-radius: 10px 0px 0px 10px;
        display flex
        align-items center;
        justify-content center;
        cursor pointer;

        .iconfont {
          color: #A8ABB3;
        }
      }

      .slide-main {}
    }

    .match-tab-chat {
      .chat-list {
        .chat-message {
          max-width: 201px;
        }
      }
    }
  }

  /*1024-1129*/
  @media screen and (min-width: 1024px) and (max-width: 1129px) {
    .match-container{
      width: 1050px;
    }
    .left-sidebar {
      display none;
    }
    .right-slide-drawer {
      width: 270px;
      flex-shrink: 0;


    }
  }

  /*1130-1410*/
  @media screen and (min-width: 1130px) and (max-width: 1410px) {
    .match-container{
      width: 1090px;
    }
    .left-sidebar {
      display none;
    }
    .left-slide-drawer {
      display inline-block;
      width 260px;
      height 100%;
      position fixed;
      z-index 30;
      top:50px;
      left 0;

      .drawer-btn{
        position absolute;
        z-index -1;
        top: 200px;
        right:-22px;
        width:22px;
        height:80px;
        background:#fff;
        box-shadow:0px 4px 10px 0px rgba(0,0,0,0.06),0px 0px 0px 1px rgba(0,0,0,0.04);
        border-radius:0px 10px 10px 0px;
        display flex
        align-items center;
        justify-content center;
        cursor pointer;

        .iconfont{
          color: #A8ABB3;
        }
      }

      .drawer-main{
        width 100%;
        height 100%;
        background:#fff;
        box-shadow:3px 3px 8px 0px rgba(0,0,0,0.04);
        position absolute;
        top:0;
      }



    }




    .right-sidebar {
      width: 330px;
    }
  }

</style>
