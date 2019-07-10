<!--交手记录-->
<template>
  <div class="piece game-record-box" v-if="gameList.length > 0">
    <div class="top-bar"><span>近 6 场交战记录</span></div>
    <div class="win-lose cl">
      <div class="left-team fll">
        <span class="team-img">
          <img :src="matchInfo.team_a_image_thumb || $score.defaultScoreImg" alt="" />
        </span>
        <p class="team-name">{{matchInfo.team_a_short_name}}</p>
        <div class="line"></div>
        <div class="team-win"><span class="count">{{gamesData.team_a_win_count}}</span><span>WIN</span></div>
      </div>
      <div class="right-team flr">
        <div class="team-win"><span class="count">{{gamesData.team_b_win_count}}</span><span>WIN</span></div>
        <div class="line"></div>
        <p class="team-name">{{matchInfo.team_b_short_name}}</p>
        <span class="team-img">
          <img :src="matchInfo.team_b_image_thumb || $score.defaultScoreImg" alt="" />
        </span>
      </div>
      <div class="mid-vs">VS</div>
    </div>
    <div class="game-list cl">
      <div class="game-item mid" :class="{'b-t': item.win_team_id == matchInfo.teamID_a, 'r-t': item.win_team_id == matchInfo.teamID_b}" v-for="(item, index) in gameList" :key="item.matchID" v-if="index < 6">
        <div class="m-team">{{item.win_team_name }}</div>
        <div class="m-date">{{item.start_time }}</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      gamesData: {
        type: Object,
        default: {}
      },
      matchInfo: {
        type: Object,
        default: {}
      },
    },
    filters:{
      sToMs: function (val) {
        if(val < 0){
          return '00:00'
        }
        var _val = parseInt(val || 0);
        var minute = Math.floor(_val / 60);
        var second = _val % 60;
        minute = minute < 10 ? '0' + minute : minute;
        second = second < 10 ? '0' + second : second;
        return minute + ':' + second;
      },
    },
    computed: {
      gameList () {
        return this.gamesData.list || []
      }
    },
    data: function () {
      return {};
    }
  };
</script>

<style lang="stylus" scoped>
  .game-record-box {
    .win-lose {
      width: 100%
      padding 23px 46px
      .team-img {
        width: 36px
        height: 36px
        mid()
      }
      .team-name {
        width: 80px
        height: 20px;
        font-size: 17px;
        font-family: 'Industry-Bold';
        color: #2D2F33
        line-height: 18px;
        ellipsis()
        mid()
      }
      .line {
        width: 83px;
        height: 1px;
        background #EBEBED
        mid()
      }
      .team-win {
        width: 102px

        height: 26px;
        font-size: 17px;
        font-family: 'Industry-Bold';
        color: #2D2F33
        mid()
        span {
          font-family: 'Industry-Bold';
        }
        .count {
          font-size: 22px;
          margin-right 8px

        }
      }
      .left-team {
        display: flex;
        justify-content: center;
        align-items: center;

        .team-name {
          padding-left 5px
        }
        .team-win {
          text-align right
          padding-right 30px
        }
      }
      .right-team {
        display: flex;
        justify-content: center;
        align-items: center;

        .team-name {
          text-align right
          padding-right 5px
        }
        .team-win {
          padding-left 30px
        }
      }
      .mid-vs {
        width: 26px
        height: 26px
        border-radius 50%
        background #F5F6F7
        font-size: 13px;
        font-family: 'Industry-Bold';
        color: #656973
        line-height: 24px
        margin 0 auto
        text-align center
        margin-top 5px
      }
    }
    .game-list {
      width: 100%
      //padding 0 16px
      padding-bottom 16px
      text-align center
    }
    .game-item {
      //width: calc((100% - 82px) / 6)
      width: 109px
      height: 60px
      text-align center
      background: rgba(168, 171, 179, 0.06);
      padding-top 12px
      border-radius 6px
      + .game-item {
        margin-left 10px
      }
      .m-team {
        height: 20px;
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        color #A8ABB3
      }
      .m-date {
        margin-top 1px
        height: 17px;
        font-size: 12px;
        font-weight: 600;
        line-height: 17px;
        color rgba(168, 171, 179, .5);
      }
      &.b-t {
        background: rgba(13, 141, 252, 0.04)
        .m-team {
          color #0D8DFC
        }
        .m-date {
          color rgba(13, 141, 252, 0.4);
        }
      }
      &.r-t {
        background: rgba(255, 92, 105, 0.04);
        .m-team {
          color #FF5C69
        }
        .m-date {
          color rgba(255, 92, 105, 0.4);
        }
      }
    }
  }
</style>
