<template>
  <div class="match-item" :class="{playing: matchData.status == '1', end: matchData.status == '2'}">
    <a :href="`/match/${matchData.matchID}`" target="_blank">
      <div class="bo" v-if="matchData.game_count">Bo{{matchData.game_count}}</div>
      <div class="left-wrap fll">
        <p class="time">{{matchData.match_time || ''}}</p>
        <p class="date">
          <!--<span>{{=tournamentHomePage.filterDate(matchData.match_date || '')}}</span>-->
          <span>{{matchData.match_date}}</span>
          <span>{{matchData.homesite || ''}}</span>
        </p>
      </div>
      <div class="mid-wrap fll">
        <div class="left-team fll">
          <div class="team-logo">
            <img :src="matchData.team_image_thumb_a" alt="" />
          </div>
          <div class="np">
            <p class="team-name">{{matchData.team_short_name_a || ''}}</p>
            <p class="place" :class="{home: matchData.homesite_a == '1'}" v-if="matchData.homesite_a == '1' || matchData.homesite_b == '1'">{{matchData.homesite_a == '1' ? '主场' : '客场'}}</p>
          </div>
        </div>
        <div class="score-wrap cl fll">
          <div class="score-l fll">
            <div class="top-bg"></div>
            <div class="bottom-bg"></div>
            <span class="score" :class="{'t-win': matchData.status != '0' && (parseInt(matchData.team_a_win || 0) > parseInt(matchData.team_b_win || 0))}">{{matchData.status != '0' ? matchData.team_a_win || '' : '-'}}</span>
          </div>
          <div class="score-r flr">
            <div class="top-bg"></div>
            <div class="bottom-bg"></div>
            <span class="score" :class="{'t-win': matchData.status != '0' && (parseInt(matchData.team_b_win || 0) > parseInt(matchData.team_a_win || 0))}">{{matchData.status != '0' ? matchData.team_b_win || '' : '-'}}</span>
          </div>
        </div>
        <div class="right-team flr">
          <div class="np">
            <p class="team-name">{{matchData.team_short_name_b || ''}}</p>
            <p class="place" :class="{home: matchData.homesite_b == '1'}" v-if="matchData.homesite_a == '1' || matchData.homesite_b == '1'">{{matchData.homesite_b == '1' ? '主场' : '客场'}}</p>
          </div>
          <div class="team-logo">
            <img :src="matchData.team_image_thumb_b" alt="" />
          </div>
        </div>

      </div>
    </a>
    <div class="right-wrap fll">
      <div v-if="matchData.status == '0'" class="link-btn">
        <nuxt-link :to="`/match/${matchData.matchID}`">赛事前瞻</nuxt-link>
      </div>
      <div v-if="matchData.status == '0'" class="link-btn" :class="{like: matchData.is_remind == 1}" @click="setRemind(matchData.matchID)">{{matchData.is_remind == 1 ? '已预约' : '直播预约'}}</div>

      <div v-if="matchData.status == '1'" class="link-btn">
        <nuxt-link :to="`/match/${matchData.matchID}`">
          <svg class="icon item-icon" aria-hidden="true"><use xlink:href="#icon-jisha"></use></svg>
          <p>比赛进行中</p>
        </nuxt-link>
      </div>

      <div v-if="matchData.status == '2'" class="link-btn" :class="{'no-data': matchData.is_have_video_link != '1'}">
        <nuxt-link :to="`/match/${matchData.matchID}?isVideo=1`" v-if="matchData.is_have_video_link == '1'">视频</nuxt-link>
        <span v-else>更新中</span>
      </div>

      <div v-if="matchData.status == '2'" class="link-btn" :class="{'no-data': matchData.is_publist != 1}">
        <nuxt-link :to="`/match/${matchData.matchID}`" v-if="matchData.is_publist == 1">战报</nuxt-link>
        <span v-else>更新中</span>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "whole-match-item",
    props: {
      matchData: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
      }
    },
    mounted() {
//      console.log(this.matchData)
    },
    methods: {
      setRemind(matchId) {
        this.$api.tournament.matchRemind({params: {match_id: matchId}}).then(resp => {
          console.log(resp)
          this.matchData.is_remind = this.matchData.is_remind == 1 ? 0 : 1
        })
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~static/static/css/variable.styl"
  .match-item {
    width: 100%
    height: 88px
    background: #fff;
    box-shadow: 0 3px 14px -4px rgba(38, 79, 127, 0.05);
    border-radius: 6px;
    border: 1px solid #F5F6F7;
    position relative

    + .match-item {
      margin-top 10px
    }

    &:before {
      display none
      content ''
      position absolute
      top 0
      left 0
      width: 6px
      height 100%
      background: linear-gradient(135deg, rgba(13, 126, 255, 1), rgba(15, 151, 255, 1));
      border-radius: 4px 0 0 4px;
    }
    .bo {
      width: 40px
      height: 19px
      border-radius 6px 0 8px 0
      text-align center
      line-height 18px
      font-size 12px
      color $color-gray-2
      font-family 'Industry-Demi'
      background #F5F6F7
      position absolute
      top 0
      left 0
    }
    .left-wrap {
      width: 116px
      height: 100%
      text-align center
      padding 20px 10px 0
      overflow hidden
      .time {
        font-size 20px
        height: 24px
        line-height 24px
        font-family 'Industry-Bold'
      }
      .date {
        font-size 12px
        height: 16px
        line-height 16px
        margin-top 4px
        white-space nowrap
        overflow hidden
        color $color-gray-2
        span {
          font-family 'Industry-Demi'
        }
      }
    }

    .mid-wrap {
      width calc(100% - 116px * 2)
      height: 100%
      position relative
      padding 0 18px
      padding-top 20px

      &:before,
      &:after {
        display block
        content ''
        width: 1px;
        height: 52px;
        background: rgba(0, 0, 0, 0.04);
        position absolute
        top 18px
      }
      &:before {
        left 0
      }
      &:after {
        right 0
      }

      .left-team, .right-team {
        width calc((100% - 60px) / 2)
      }
      .right-team {
        text-align right
      }
      .team-logo {
        mid()
        width: 46px
        height: 46px
        margin 0
      }
      .np {
        mid()
        width: 80px
        text-align center
        margin-top -2px

        p {
          width: 100%
        }
        .team-name {
          height: 24px
          font-size 17px
          font-family 'Industry-Bold'
          color $color-gray
          ellipsis()
        }
        .place {
          font-size 12px
          color $color-gray-2
          &.home {
            color $color-blue
          }
        }
      }
      .score-wrap {
        width: 60px
        margin 0
        padding 6px 1px
      }
    }

    .right-wrap {
      width: 116px
      height: 100%
      .link-btn {
        display block
        width: 76px
        height: 26px
        border-radius 13px
        line-height 24px
        text-align center
        border: 1px solid rgba(235, 235, 237, 1);
        color $color-gray-1
        margin 0 auto
        font-size 13px
        margin-top 14px
        a {
          display block
          width: 100%
          height: 100%
          color $color-gray-1
        }
        .icon {
          width: 24px
          height: 24px
          margin-bottom 1px
        }
        p {
          font-size 12px
        }
        + .link-btn {
          margin-top 8px
        }
        &.appointment.like {
          background $color-blue
          border: 1px solid $color-blue
          color #fff
          &:hover {
            background #077EE6;
          }
        }

        &:not(.like):hover {
          background: #F0F1F2;
          border: 1px solid #D0D3D9;
          a {
            color: $color-gray-1
          }
        }
        &.nodata {
          opacity .6
          cursor default
          &:hover {
            background transparent
            border: 1px solid rgba(235, 235, 237, 1);
          }
        }
      }
    }

    &.end {
      .left-wrap {
        .time {
          color $color-gray-2
        }
      }
    }
    &.playing {
      background-color #FAFBFD
      background-image: linear-gradient(-45deg, rgba(255, 255, 255, 1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 75%, transparent 75%, transparent);
      background-size: 50px 50px;
      animation: reverse progress-bar-stripes 0.80s linear infinite, animate-positive 2s;
      &:before {
        display block
      }
      .bo {
        background $color-blue
        color #fff
      }
      .left-wrap {
        .time {
          color $color-blue
        }
      }
      .link-btn {
        width: 96px;
        height: 68px;
        background: rgba(101, 105, 115, 0.1);
        border-radius: 8px;
        border 0
        line-height inherit
        margin-top 9px
        padding-top 12px
        a {
          display block
        }
        &:not(.like):hover {
          background: rgba(101, 105, 115, 0.2);
          border 0
        }
        .icon, p {
          color $color-blue
        }
      }
    }
    &:not(.playing):hover {
      background rgba(80, 143, 199, .05);
      .team-logo {
        background transparent
        img {
          background transparent
        }
      }
    }
  }
</style>
