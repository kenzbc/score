<template>
  <div class="match-schedule" :class="{'border': size != 'small'}">
    <div class="top-bar">
      <span>赛程表</span>
    </div>

    <!--左侧栏-->
    <div class="match-left-sidebar">
      <!--队伍积分列表-->
      <div class="match-left-wrap">
        <div class="match-left-item">队伍积分<i class="iconfont icon-general__arrow_right"></i></div>
        <div class="match-left-pop" v-show="groupMenu.length > 0">
          <ul class="group">
            <li class="group-item gray_3" :class="{active: index == tabBarMenu.activeIndex}" v-for="(val , index) in groupMenu" :key="val" @click="toggleTabMenu(val, index)">{{val}}积分</li>
          </ul>
          <div class="group-table">
            <div class="th">
              <span class="td" v-for="(th, index) in tabBarMenu.list" :key="index">{{th.name}}</span>
            </div>
            <ul class="tbody">
              <li class="tr" v-for="(tr, tr_index) in currTab">
                <span class="td" v-if="tr.sorting < 3"><img :src="'/static/images/no'+ tr.sorting +'.png'" class="index_img"/></span>
                <span class="td" v-else>{{tr.sorting}}</span>
                <span class="td"><a :href="'/data/team/'+tr.teamID"><img :src="tr.image_thumb || $score.defaultScoreImg" class="team_img"/>{{tr.short_name || ''}}</a></span>
                <span class="td">{{tr.win || 0}}/{{tr.los || 0}}</span>
                <span class="td">{{tr.win}}</span>
                <span class="td">{{tr.j_win}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--赛程列表-->
      <div class="match-left-wrap">
        <div class="match-left-item"><span class="tournament_name">{{matchInfo.tournament_name}}</span><span
          class="round_name">{{roundName}}</span><i class="iconfont icon-general__arrow_right"></i></div>
        <div class="match-left-pop match-left-pop-round">
          <ul class="match-left-round">
            <li class="item" :class="{active: item.roundID == roundId}" v-for="item in matchInfo.round_list" :key="item.roundID" @click="toggleRound(item.roundID, item.name)">{{item.name}}</li>
          </ul>
        </div>
      </div>
      <!--日历列表-->
      <div class="match-left-schedule nano" ref="scheduleList">
        <div class="nano-content">
          <ul class="schedule-list" v-for="(month,index) in ReScheduleList">
            <li class="match-month" v-html="month.month"></li>
            <li class="match-day" v-for="day in month.day">
              <div class="match-day-left" :class="{ active : day.isCurrDay }" :ref="{ activeDay : day.isCurrDay }">
                <span class="date day">{{day.start_time_string}}</span>
                <span class="date week">{{day.week}}</span>
              </div>
              <div class="match-day-right">

                <div class="match-game" :class="{ active : matchInfo.matchID == match.match_id }" v-for="match in day.match" v-on:click="matchLink(match.match_id)">
                  <div class="match-game-left">
                    <p class="team"><img class="team-icon" :src="match.team_a_image_thumb || $score.defaultScoreImg"><span class="team-name">{{ match.team_a_short_name }}</span></p>
                    <p class="team"><img class="team-icon" :src="match.team_b_image_thumb || $score.defaultScoreImg"><span class="team-name">{{ match.team_b_short_name }}</span></p>
                  </div>
                  <div class="match-game-right">
                    <span class="play-date" v-if="match.status == '0'">{{ match.time }}</span>
                    <button class="match-live-btn" v-if="match.status == '1'">LIVE</button>
                    <div class="result-score" v-if="match.status == '2'"><strong :class="{win: parseInt(match.team_a_win) > parseInt(match.team_b_win)}">{{match.team_a_win }}</strong><strong :class="{win: parseInt(match.team_a_win) < parseInt(match.team_b_win)}">{{ match.team_b_win }}</strong></div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
          <div class="not-data" v-show="ReScheduleList.length == 0">
            <div class="center-cont">
              <img class="not-icon" src="/static/images/no_data.png" alt="" />
              <p class="not-tip">暂无数据</p>
            </div>
          </div>
        </div>

      </div>
    </div>

  </div>
</template>


<script>
  export default {
    name: 'schedule-slide',
    props: {
      size: {
        type: String,
        default: ''
      },
      matchInfo: {
        type: Object,
        default: ()=>{}
      },
      scheduleList: {
        type: Array,
        default: ()=>[]
      },
      jiFenData: {
        type: Object,
        default: ()=>{}
      },
      roundName: {
        type: String,
        default: ''
      }
    },
    data: function () {
      return {
        tabBarMenu: {
          activeIndex: 0,
          list: [
            {key: 'tr_index', name: '积分排名', index: 0},
            {key: 'short_name', name: '战队', index: 1},
            {key: 'win_los', name: '胜负', index: 2},
            {key: 'win', name: '积分', index: 3},
            {key: 'j_win', name: '净胜分', index: 4}
          ],
        },
      };
    },
    watch: {
      ReScheduleList: function (val) {
//
      },
    },
    created: function () {},
    mounted() {
      var _this = this;
      setTimeout(function () {
        $(_this.$refs.scheduleList).nanoScroller();
        _this.scrollSchedule();
      }, 300);
    },
    computed: {
      roundId: function () {
        return this.matchInfo.roundID || '';
      },
      groupMenu: function () {
        return this.getGroupsMenu();
      },
      currTab: function () {
        return this.jiFenData[this.groupMenu[this.tabBarMenu.activeIndex]];
      },
      ReScheduleList: function () {
        for (var month in this.scheduleList) {
          for (var day in this.scheduleList[month].day) {
            this.scheduleList[month].day[day].isCurrDay = false;
            for (var i = 0; i < this.scheduleList[month].day[day].match.length; i++) {
              if (this.scheduleList[month].day[day].match[i].match_id == this.matchInfo.matchID) {
                this.scheduleList[month].day[day].isCurrDay = true;
              }
            }
          }
        }

//        console.log(this.scheduleList);
        return this.scheduleList || {};
      }

    },
    methods: {
      getGroupsMenu: function () {
        return Object.keys(this.jiFenData);
      },
      toggleTabMenu: function (item, index) {
        this.tabBarMenu.activeIndex = index;
      },
      // 切换赛事列表比赛
      toggleRound: function (roundId, name) {
        this.$emit('change-schedule', roundId);
        this.$emit('update:roundName', name);
      },
      //跳转match页面
      matchLink: function (match_id) {
        //700原本计划不刷新页面，只刷接口
        // this.$emit('refresh-handler', match_id);
        // for (var month in this.scheduleList) {
        //   for (var day in this.scheduleList[month].day) {
        //     this.scheduleList[month].day[day].isCurrDay = false;
        //     for (var i = 0; i < this.scheduleList[month].day[day].match.length; i++) {
        //       if (this.scheduleList[month].day[day].match[i].match_id == this.getMatchId()) {
        //         this.scheduleList[month].day[day].isCurrDay = true;
        //       }
        //     }
        //   }
        // }

        //现在暂时改成刷新页面
        window.location.href = window.location.protocol + '//' + window.location.host + '/match/' + match_id;
      },
      //左侧滚动条滚动到当前赛事
      scrollSchedule:function(val){
        if ($(this.$refs.scheduleList).find('.active').eq(0).length == 0) return;
        $(this.$refs.scheduleList).nanoScroller({scrollTo: $(this.$refs.scheduleList).find('.active').eq(0)});
      }
    }
  };
</script>


<style lang="stylus" scoped>
  .match-schedule {
    width: 100%;
    //height: 100%;
    background: rgba(255, 255, 255, 1);
    border-radius: 2px;

    &.border {
      box-shadow: 0px 0px 0px 1px rgba(235, 235, 237, 1);
    }

    .match-left-wrap{
      position relative
      z-index 2
      padding 0 12px
      margin-bottom 8px
      &:hover{
        .match-left-pop{
          visibility inherit
        }
      }
      .match-left-item{
        height:34px;
        background:rgba(247,248,250,1);
        border-radius:17px;
        cursor pointer
        padding 0 14px
        display flex
        justify-content space-between;
        align-items center;

        &:hover{
          //color #fff
          //background:rgba(13,141,252,1);
          background #EBEBED
        }
        .tournament_name{
          max-width 60%
          height 34px
          line-height 34px
          overflow hidden
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 1;
          line-clamp: 1;
          -webkit-box-orient: vertical;
        }
        .round_name{

        }
      }
      .match-left-pop{
        visibility hidden
        background #fff
        box-shadow:0px 0px 0px 1px rgba(0,0,0,0.06);
        border-radius:4px;
        position absolute
        left calc(100% - 4px)
        top 0
        padding 12px
        &.match-left-pop-round{
          padding 5px
        }
        .group{
          .group-item{
            display inline-block
            min-width 60px
            height:26px;
            line-height 26px
            background:rgba(240,241,242,1);
            border-radius:8px;
            padding 0 8px
            margin 0 6px
            cursor pointer
            text-align center
            &.active,&:hover{
              color #fff
              background #0D8DFC
            }
          }
        }
        .group-table{
          width 320px

          .th,.tr {
            width 100%
            display flex;
            justify-content space-between;

            .td {
              line-height 40px
              font-size 12px
              text-align center
              position relative
              .index_img{
                width 22px
                height 22px
              }
              .team_img{
                width 30px
                height 30px
                position absolute
                left 10px
                top 5px
              }
              &:nth-of-type(1) {
                width: 20%
              }
              &:nth-of-type(2) {
                width: 35%
              }
              &:nth-of-type(3) {
                width: 15%
              }
              &:nth-of-type(4) {
                width: 15%
              }
              &:nth-of-type(5) {
                width: 15%
              }
            }
          }
          .tbody{
            max-height 470px
            overflow-y auto
            .tr{
              background:rgba(250,250,250,1);
              border-radius:8px;
              margin-bottom 8px
            }
          }
        }
        .match-left-round{
          width 104px
          line-height 36px
          text-align left
          li{
            background #F0F1F2
            border-radius:6px;
            padding 0 13px
            margin-bottom 4px
            cursor pointer
            &:hover{
              color #fff
              background #0D8DFC
            }
            &:last-child{
              margin-bottom 0
            }
          }
        }
      }
    }
    .match-left-schedule{
      position relative
      .schedule-list{
        .match-month {
          height: 36px;
          line-height: 36px;
          text-align: center;
          font-size: 14px;
          box-shadow:0px 3px 8px -2px rgba(0,0,0,0.04);
          position relative
        }
        .match-day{
          display flex;

          .match-day-left{
            width 50px
            background rgba(250,251,252,1);
            border-bottom 1px solid #ebebec
            padding-top 14px
            &.active{
              color #fff
              background #2D2F33
            }
            .date{
              display block
              width 100%
              text-align center
            }
            .day{
              line-height 24px
              font-size 20px
              font-weight bold
              font-family Industry-Bold
              margin-bottom 2px
            }
            .week{
              font-size 12px
            }
          }
          .match-day-right{
            flex 1
            .match-game{
              height: 64px;
              width: 100%;
              background: #FFF;
              border-bottom: 1px solid #EBEBEC;
              cursor pointer
              padding 6px 12px
              &:hover{
                background #f5f6f7
              }
              &.active{
                color #fff
                background:rgba(77,82,92,1);
                .match-game-right {
                  .result-score{
                    strong {
                      color #fff
                    }
                  }
                  .play-date{
                    color #fff
                  }
                }
              }
              .match-game-left{
                width: 70%;
                float: left;
                .team{
                  height 26px
                  line-height 26px
                  font-size 13px
                  flex flex;
                  justify-content space-between;

                  .team-name{
                    font-family: 'Industry-Demi'
                  }
                  .team-icon{
                    width 24px
                    height 24px
                    margin-right 6px
                  }
                }

              }
              .match-game-right{
                width: 30%;
                height: 100%;
                text-align: right;
                position: relative;
                float: right;
                .result-score{
                  strong{
                    display: block;
                    height: 26px;
                    line-height 26px
                    color #A5A8B2
                    font-size: 16px;
                    font-family:Industry-Bold;
                    &.win{
                      color #FFA646
                    }
                  }
                }
                .play-date{
                  display inline-block
                  width 100%
                  line-height 52px
                  text-align right
                  font-size 13px
                  font-family:Industry-Bold;
                  font-weight:bold;
                  color #A8ABB3
                }
                .match-live-btn{
                  height: 18px;
                  background:linear-gradient(90deg,rgba(13,126,255,1) 0%,rgba(15,151,255,1) 100%);
                  border-radius: 2px;
                  color: #fff;
                  font-size: 12px;
                  border: 0;
                  padding 0 6px
                  margin-top 16px
                }
              }
            }
          }
        }
      }
      .nano-pane {
        background: rgba(255, 255, 255, 0);
        width: 7px;
        right: 0px;
        .nano-slider {
          background: #000;
          opacity: 0.2;
        }
      }
    }
    .not-data {
      width: 100%
      height: 100%
      position absolute
      top 0
      left 0
      background #fff
      .center-cont {
        position absolute
        top 50%
        left 50%
        transform translate(-50%, -55%)
        text-align center
      }
      .not-icon {
        width: 110px
      }
      .not-tip {
        margin-top 10px
        font-size 14px
        text-align center
        color #a8abb3
      }
    }
  }

</style>
