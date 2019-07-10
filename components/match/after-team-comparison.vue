<template>
  <div class="piece after-team-comparison">
    <div class="team-data-header cl">
      <div class="header-left fll" :class="teamAKey">
        <div class="left-team fll">
          <div class="team-img mid">
            <a :href="'/data/team/' + resultData.teamID_a" target="_blank">
              <img :src="resultData[teamAKey + '_flag'] || $score.defaultScoreImg" alt="" />
            </a>
          </div>
          <span class="team-name mid"><a :href="'/data/team/' + resultData.teamID_a" target="_blank">{{resultData[teamAKey + '_name']}}</a></span><span class="win mid" v-if="getWin(resultData.teamID_a)">W</span>
        </div>
        <div class="score-wrap flr">
          <div class="line l-line mid"></div>
          <div class="kill mid">{{resultData[teamAKey + '_kill']}}</div>
        </div>
      </div>
      <div class="header-right flr" :class="teamBKey">
        <div class="score-wrap fll">
          <div class="kill mid">{{resultData[teamBKey + '_kill']}}</div>
          <div class=" line r-line mid"></div>
        </div>
        <div class="right-team flr">
          <span class="win mid" v-if="getWin(resultData.teamID_b)">W</span><span class="team-name mid"><a :href="'/data/team/' + resultData.teamID_b" target="_blank">{{resultData[teamBKey + '_name']}}</a></span>
          <div class="team-img mid">
            <a :href="'/data/team/' + resultData.teamID_b" target="_blank">
              <img :src="resultData[teamBKey + '_flag'] || $score.defaultScoreImg" alt="" />
            </a>
          </div>
        </div>
      </div>
      <div class="mid-icon"><i class="iconfont icon-tournament_kill"></i></div>
    </div>
    <div class="team-data-content">
      <div class="focus-player" :class="{'left-win': getWin(resultData.teamID_a)}">
        <div class="card-box l-card fll" :class="{mvp: getWin(resultData.teamID_a), bgx: !getWin(resultData.teamID_a)}">
          <!--<div class="fill-wrap"></div>-->
          <div class="avatar-star fll">
            <a :href="'/data/player/' + getBestPoorData(resultData.teamID_a).playerID" target="_blank">
              <img :src="getBestPoorData(resultData.teamID_a).player_image_thumb || $score.defaultPlayerImg" alt="" />
            </a>
          </div>
          <div class="name-wrap flr">
            <!--<p class="title">{{getWin(resultData.teamID_a) ? 'MVP' : '背锅侠'}}</p>-->
            <p class="nickname"><a :href="'/data/player/' + getBestPoorData(resultData.teamID_a).playerID" target="_blank">{{getBestPoorData(resultData.teamID_a).nickname}}</a></p>
          </div>
        </div>
        <div class="card-box r-card flr" :class="{mvp: getWin(resultData.teamID_b), bgx: !getWin(resultData.teamID_b)}">
          <div class="name-wrap fll">
            <!--<p class="title">{{getWin(resultData.teamID_b) ? 'MVP' : '背锅侠'}}</p>-->
            <p class="nickname"><a :href="'/data/player/' + getBestPoorData(resultData.teamID_b).playerID" target="_blank">{{getBestPoorData(resultData.teamID_b).nickname}}</a></p>
          </div>
          <div class="avatar-star flr">
            <a :href="'/data/player/' + getBestPoorData(resultData.teamID_b).playerID" target="_blank">
              <img :src="getBestPoorData(resultData.teamID_b).player_image_thumb || $score.defaultPlayerImg" alt=""/>
            </a>
          </div>
        </div>
      </div>

      <div class="bar-wrap">
        <div class="top-data cl">
          <div class="l-data fll"><img class="money-icon mid" src="/static/images/match/money.png" alt=""/><span class="money mid" v-if="resultData[teamAKey + '_money']">{{resultData[teamAKey + '_money'] | thousand}}</span></div>
          <div class="r-data flr"><span class="money mid" v-if="resultData[teamBKey + '_money']">{{resultData[teamBKey + '_money'] | thousand}}</span><img class="money-icon mid" src="/static/images/match/money.png" alt=""/></div>
          <div class="time" v-if="resultData.game_time_m">{{resultData.game_time_m}}:{{resultData.game_time_s}}</div>
        </div>
        <div class="compare-bar" v-if="resultData.blue_money == resultData.red_money">
          <div class="l-bar fll" :style="{width: '50%'}"></div>
          <div class="r-bar flr" :style="{width: '50%'}"></div>
        </div>
        <div class="compare-bar" :class="{full: resultData.blue_money == '0' || resultData.red_money == '0'}" v-else>
          <div class="l-bar fll" :class="teamAKey" :style="getBarWidth(teamAKey)"></div>
          <div class="r-bar flr" :class="teamBKey" :style="getBarWidth(teamBKey)"></div>
        </div>
        <div class="bottom-data cl">
          <div class="l-data fll cl">
            <div class="data-box fll"><img src="/static/images/match/baron.png" alt="" class="baron mid"/><span class="num mid">{{resultData[teamAKey + '_big_dargon'] || 0}}</span></div>
            <div class="data-box fll"><img src="/static/images/match/dragon.png" alt="" class="dragon mid"/><span class="num mid">{{resultData[teamAKey + '_small_dargon'] || 0}}</span></div>
            <div class="data-box fll"><img src="/static/images/match/tower.png" alt="" class="tower mid"/><span class="num mid">{{resultData[teamAKey + '_tower'] || 0}}</span></div>
          </div>
          <div class="r-data flr">
            <div class="data-box fll"><span class="num mid">{{resultData[teamBKey + '_tower'] || 0}}</span><img src="/static/images/match/tower.png" alt="" class="tower mid"/></div>
            <div class="data-box fll"><span class="num mid">{{resultData[teamBKey + '_small_dargon'] || 0}}</span><img src="/static/images/match/dragon.png" alt="" class="dragon mid"/></div>
            <div class="data-box fll"><span class="num mid">{{resultData[teamBKey + '_big_dargon'] || 0}}</span><img src="/static/images/match/baron.png" alt="" class="baron mid"/></div>
          </div>
        </div>
      </div>

      <div class="divider"></div>

      <div class="tags-wrap cl">
        <ul class="tags l-tags fll">
          <li class="tag" :class="{'dragon': tag.name == '一小龙', [tag.cName]: firstKillData[teamAKey] && firstKillData[teamAKey][tag.key] && firstKillData[teamAKey][tag.key] == 1}" v-for="(tag, index) in tags" :key="index">{{tag.name}}</li>

          <!--<li class="tag blue" :class="{blue: firstKillData.blue.firstTowerKill == 1}">一塔</li>-->
          <!--<li class="tag blue">先破路</li>-->
          <!--<li class="tag red" :class="{red: firstKillData.blue.firstBloodKill == 1}">一血</li>-->
          <!--<li class="tag red" :class="{red: firstKillData.blue.first5Kill == 1}">先五杀</li>-->
          <!--<li class="tag red" :class="{red: firstKillData.blue.first10Kill == 1}">先十杀</li>-->
          <!--<li class="tag purple" :class="{purple: firstKillData.blue.firstDragonKill == 1}">一小龙</li>-->
          <!--<li class="tag purple" :class="{purple: firstKillData.blue.firstBaronKill == 1}">一大龙</li>-->
        </ul>
        <ul class="tags r-tags flr">
          <li class="tag" :class="{'dragon': tag.name == '一小龙', [tag.cName]: firstKillData[teamBKey] && firstKillData[teamBKey][tag.key] && firstKillData[teamBKey][tag.key] == 1}" v-for="(tag, index) in tags" :key="index">{{tag.name}}</li>

          <!--<li class="tag blue" :class="{blue: firstKillData.red.firstTowerKill == 1}">一塔</li>-->
          <!--<li class="tag blue">先破路</li>-->
          <!--<li class="tag red" :class="{red: firstKillData.red.firstBloodKill == 1}">一血</li>-->
          <!--<li class="tag red" :class="{red: firstKillData.red.first5Kill == 1}">先五杀</li>-->
          <!--<li class="tag red" :class="{red: firstKillData.red.first10Kill == 1}">先十杀</li>-->
          <!--<li class="tag purple" :class="{purple: firstKillData.red.firstDragonKill == 1}">一小龙</li>-->
          <!--<li class="tag purple" :class="{purple: firstKillData.red.firstBaronKill == 1}">一大龙</li>-->
        </ul>
      </div>

      <div class="hero-wrap bans cl">
        <ul class="hero-list l-list fll">
          <li class="hero-item" v-for="v in heroList" :key="v" v-if="resultData[teamAKey + '_ban_' + v]">
            <div class="avatar hero"><img :src="resultData[teamAKey + '_ban_' + v] || $score.defaultPlayerImg" alt="" /></div>
          </li>
        </ul>
        <ul class="hero-list r-list flr">
          <li class="hero-item" v-for="v in heroList" :key="v" v-if="resultData[teamBKey + '_ban_' + v]">
            <div class="avatar hero"><img :src="resultData[teamBKey + '_ban_' + v] || $score.defaultPlayerImg" alt="" /></div>
          </li>
        </ul>
        <div class="title">Bans</div>
      </div>
      <div class="hero-wrap picks cl">
        <ul class="hero-list l-list fll">
          <li class="hero-item" v-for="v in heroList" :key="v" v-if="resultData[teamAKey + '_pick_' + v]">
            <div class="avatar hero"><img :src="resultData[teamAKey + '_pick_' + v] || $score.defaultPlayerImg" alt="" /></div>
          </li>
        </ul>
        <ul class="hero-list r-list flr">
          <li class="hero-item" v-for="v in heroList" :key="v" v-if="resultData[teamBKey + '_pick_' + v]">
            <div class="avatar hero"><img :src="resultData[teamBKey + '_pick_' + v] || $score.defaultPlayerImg" alt="" /></div>
          </li>
        </ul>
        <div class="title">Picks</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      gameData: {
        type: Object,
        default: {}
      }
    },
    data: function () {
      return {
        heroList: [1, 2, 3, 4, 5],
        tags: [
          {name: '一塔', cName: 'blue', key: 'firstTowerKill'},
          {name: '一血', cName: 'red', key: 'firstBloodKill'},
          {name: '先五杀', cName: 'red', key: 'first5Kill'},
          {name: '先十杀', cName: 'red', key: 'first10Kill'},
          {name: '一小龙', cName: 'purple', key: 'firstDragonKill'},
          {name: '一大龙', cName: 'purple', key: 'firstBaronKill'}
        ]
      };
    },
    filters:{
      thousand: function (val) {
        let _val = parseInt(val || 0);
        return _val > 999 ? (_val / 1000).toFixed(1) + 'k' : _val;
      },
    },
    computed: {
      resultData: function () {
        return this.gameData.result_list || {};
      },
      bgxData: function () {
        return this.gameData.max_beiguo || {};
      },
      mvpData: function () {
        return this.gameData.max_mvp || {};
      },
      firstKillData: function () {
        return this.gameData.dragon_list || {};
      },
      teamAKey: function () {
        return this.resultData.teamID_a == this.resultData.blue_teamID ? 'blue' : 'red';
      },
      teamBKey: function () {
        return this.resultData.teamID_b == this.resultData.red_teamID ? 'red' : 'blue';
      }
    },
    mounted() {

    },
    methods: {
      getBarWidth: function (key) {
        return {width: this.resultData[key + '_money'] == '0' ? '0%': parseFloat(this.resultData[key + '_money'] || 0) / (parseFloat(this.resultData.blue_money || 0) + parseFloat(this.resultData.red_money || 0)) * 100 + '%'};
      },
      getWin: function (teamId) {
        return this.resultData.win_teamID == teamId;
      },
      getBestPoorData: function (teamId) {
        return this.getWin(teamId) ? this.mvpData : this.bgxData;
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .after-team-comparison {
    padding 12px 0 24px
    .team-data-header {
      width: 100%
      padding 0 24px
      .header-left,
      .header-right {
        width calc((100% - 20px) / 2)
        overflow hidden
      }
      .header-left {
        .line {
          margin-right 7px
          &:before {
            right -7px
          }
        }
        .kill {
          padding-right 15px
          text-align right
        }
        &.blue {
          .kill {
            color #0D8DFC
          }
        }
        &.red {
          .kill {
            color #FF5C69
          }
        }
      }
      .header-right {
        .line {
          margin-left 7px
          &:before {
            left -7px
          }
        }
        .kill {
          padding-left 15px
        }
        &.blue {
          .kill {
            color #0D8DFC
          }
        }
        &.red {
          .kill {
            color #FF5C69
          }
        }
      }
      .line {
        width: 93px;
        height: 1px;
        background: #EBEBED
        position relative
        &:before {
          display block
          content ''
          width: 7px
          height: 7px
          border-radius 50%
          border 1px solid #EBEBED
          position absolute
          top -3px
        }
      }
      .kill {
        width: 60px
        height: 48px
        line-height 44px
        font-family: 'Industry-Bold';
        font-size 26px
      }
      .team-img {
        width: 48px
        height: 48px
      }
      .team-name {
        max-width 76px
        height: 20px;
        font-size: 17px;
        font-family: 'Industry-Bold';
        color: #2D2F33
        line-height: 18px;
        margin 0 6px
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
      }
      .win {
        width: 20px;
        height: 20px;
        background: #FAF3E6
        border-radius 50%
        text-align center
        line-height 18px
        font-family: 'Industry-Bold';
        font-size 13px
        color #CDB99C
      }
      .mid-icon {
        width: 20px
        height: 20px
        margin 0 auto
        overflow hidden
        margin-top 14px
        .iconfont {
          font-size 20px
        }
      }
    }
    .team-data-content {
      padding 0 36px
      margin-top:52px;

      .focus-player {
        width: 575px
        height: 92px
        margin 0 auto
        position relative
        background url('/static/images/match/focus_bg.png') no-repeat center;
        background-size 100%
        &.left-win {
          background url('/static/images/match/focus_bg1.png') no-repeat center;
          background-size 100%
        }
        .avatar-star {
          width: 110px
          height: 110px
          overflow hidden
          margin-top -38px
          img {
            display block
            height: 100%
            margin 0 auto
          }
        }
        .card-box {
          width: 277px
          height: 72px
          position relative
          margin-top 6px

          .name-wrap {
            margin-top 40px
            .nickname {
              max-width 98px;
              height: 16px;
              font-size: 14px;
              font-family: 'Industry-Demi';
              line-height: 16px;
              margin-top 2px
              opacity .6
              white-space nowrap
              overflow hidden
              text-overflow ellipsis
            }
          }

          &.l-card {
            border-radius: 6px 0 0 6px;
            padding-left 33px
            padding-right 21px
            text-align right
          }
          &.r-card {
            border-radius: 0 6px 6px 0;
            padding-left 21px
            padding-right 33px
            text-align left
          }
          &.bgx {
            //background: linear-gradient(90deg, rgba(142, 77, 255, 1) 0%, rgba(188, 112, 255, 1) 100%);
            //box-shadow: 0 4px 12px -2px rgba(112, 19, 254, 0.2);
            &.l-card {
              //background: linear-gradient(90deg, rgba(188, 112, 255, 1) 0%, rgba(142, 77, 255, 1) 100%);
            }
            .name-wrap {
              .title {
                height: 24px;
                font-size: 20px;
                font-weight: bold;
                color: #fff
                line-height: 24px;
              }
              .nickname {
                color: #fff
                a {
                  color #fff
                }
              }
            }
          }
          &.mvp {
            //background: linear-gradient(270deg, rgba(255, 214, 102, 1) 0%, rgba(255, 233, 122, 1) 100%);
            //box-shadow: 0 4px 12px -2px rgba(255, 204, 102, 0.3);
            &.r-card {
              //background: linear-gradient(270deg, rgba(255, 233, 122, 1) 0%, rgba(255, 214, 102, 1) 100%);
            }
            .name-wrap {
              .title {
                height: 24px;
                font-size: 26px;
                font-family: 'Industry-Bold';
                color: #876026
                line-height: 22px;
              }
              .nickname {
                color #876026
                a {
                  color #876026
                }
              }
            }
          }
        }

      }
      .bar-wrap {
        width: 100%
        margin-top 24px
        .l-data {
          padding-left 2px
        }
        .r-data {
          padding-right 2px
        }
        .top-data {
          width: 100%
          .money-icon {
            width: 24px
            height: 24px
          }
          .money {
            height: 20px;
            font-size: 17px;
            font-family: 'Industry-Bold';
            color: #2D2F33
            line-height: 18px
            margin 0 8px
          }
          .time {
            width: 40px;
            height: 16px;
            background: #F7F8FA
            border-radius: 3px;
            font-size: 12px;
            font-family: 'Industry-Demi';
            color: #A8ABB3
            line-height: 14px;
            text-align center
            margin 0 auto
            margin-top 4px
          }
        }
        .compare-bar {
          width: 100%
          height: 8px
          margin-top 12px
          border-radius 2px
          overflow hidden
          .l-bar {
            height: 100%
            border-radius: 2px 0 0 2px;
            position relative;
            &:before {
              display block
              content ''
              width: 2px
              height: 10px
              background #fff
              position absolute
              right -1px
              top -1px
              transform rotate(10deg)
            }
            &.blue {
              background: linear-gradient(135deg, rgba(13, 126, 255, 1) 0%, rgba(15, 151, 255, 1) 100%);
            }
            &.red {
              background: linear-gradient(225deg, rgba(255, 76, 106, 1) 0%, rgba(255, 107, 137, 1) 100%);
            }
          }
          .r-bar {
            height: 100%
            border-radius: 0 2px 2px 0
            &.blue {
              background: linear-gradient(135deg, rgba(13, 126, 255, 1) 0%, rgba(15, 151, 255, 1) 100%);
            }
            &.red {
              background: linear-gradient(225deg, rgba(255, 76, 106, 1) 0%, rgba(255, 107, 137, 1) 100%);
            }
          }
          &.full {
            .l-bar:before {
              display none
            }
          }
        }
        .bottom-data {
          width: 100%
          margin-top 12px
          img {
            height: 20px
          }
          .num {
            height: 20px;
            font-size: 16px;
            font-family: 'Industry-Bold';
            font-weight: bold;
            color: #2D2F33
            line-height: 18px;
            margin 0 8px
          }
          .data-box {
            + .data-box {
              margin-left 14px
            }
          }
        }
      }
      .divider {
        width: 680px;
        height: 1px;
        background: rgba(0, 0, 0, 0.06);
        margin-top 20px
        margin-left -6px
      }
      .tags-wrap {
        width: 100%
        margin-top 22px
        .tags {
          //width: 250px
          width: 195px
          margin-top -5px
          .tag {
            height: 22px;
            background: #F7F8FA
            border-radius: 3px;
            font-size: 13px;
            font-weight: 600;
            color: rgba(0, 0, 0, 0.1);
            line-height: 22px;
            padding 0 6px
            margin-top 5px
            &.blue {
              background: rgba(13, 173, 252, 0.08);
              color #33BBFF
            }
            &.red {
              background: rgba(255, 92, 160, 0.07);
              color #FF66A5
            }
            &.purple {
              background: rgba(173, 133, 255, 0.1);
              color #9C77E6
            }
          }
          &.l-tags {
            .tag {
              float left
              + .tag {
                margin-left 5px
              }
              &.dragon {
                margin-left 0
              }
            }
          }
          &.r-tags {
            .tag {
              float right
              + .tag {
                margin-right 5px
              }
              &.dragon {
                margin-right 0
              }
            }
          }
        }
      }
      .hero-wrap {
        width: 100%
        height: 36px
        margin-top 22px
        .hero-list {
          .hero-item {
            &:nth-of-type(4) {
              position relative
              &:before {
                display block
                content ''
                width: 1px;
                height: 24px;
                background: rgba(0, 0, 0, 0.1);
                position absolute
                top 6px

              }
            }
          }
          .hero {
            width: 36px
            height: 36px
          }
          &.l-list {
            .hero-item {
              float left
              + .hero-item {
                margin-left 10px
              }
              &:nth-of-type(4) {
                margin-left 21px
                &:before {
                  left -11px
                }
              }
            }
          }
          &.r-list {
            .hero-item {
              float right
              + .hero-item {
                margin-right 10px
              }
              &:nth-of-type(4) {
                margin-right 21px
                &:before {
                  right -11px
                }
              }
            }
          }
        }
        .title {
          width: 50px;
          height: 20px;
          font-size: 17px;
          font-family: 'Industry-Demi';
          color: #2D2F33
          line-height: 18px;
          text-align center
          margin 0 auto
          margin-top 8px
        }
        &.picks {
          margin-top 12px
        }
      }
    }
  }

</style>
