<template>
  <div class="swiper-slide item-box">
    <div class="match-item" :class="{playing: item.status == '1', end: item.status == '2', 'home-site': item.homesite_a == '1' || item.homesite_b == '1'}">
      <a :href="'/match/' + item.matchID" target="_blank">
        <div class="date" v-if="item.status == '1'">比赛进行中</div>
        <div class="date" v-else>
          <span>{{item.start_time || ''}}</span>
          <span class="d-week">{{item.start_date || ''}}</span>
          <span class="games" v-if="item.game_count">Bo{{item.game_count}}</span>
        </div>

        <div class="match-info cl">
          <div class="left-team">
            <div class="team-logo">
              <img :src="item.team_a_image_thumb" alt=""/>
            </div>
            <p class="team-name">{{item.team_a_name || ''}}</p>
            <p class="place" :class="{home: item.homesite_a == '1'}" v-if="item.homesite_a == '1' || item.homesite_b == '1'">{{item.homesite_a == '1' ? '主场' : '客场'}}</p>
          </div>

          <div class="mid-box">
            <div class="score-wrap cl">
              <div class="score-l fll">
                <div class="top-bg"></div>
                <div class="bottom-bg"></div>
                <span class="score" :class="{'t-win': item.status != '0' && (parseInt(item.team_a_win || 0) > parseInt(item.team_b_win || 0))}">{{item.status != '0' ? item.team_a_win || '' : '-'}}</span>
              </div>
              <div class="score-r flr">
                <div class="top-bg"></div>
                <div class="bottom-bg"></div>
                <span class="score" :class="{'t-win': item.status != '0' && (parseInt(item.team_b_win || 0) > parseInt(item.team_a_win || 0))}">{{item.status != '0' ? item.team_b_win || '' : '-'}}</span>
              </div>
            </div>
            <div class="status-wrap">
              <span class="match-status" :class="{realtime: item.status == '1' && item.is_real_time}">{{item.status == '1' ? '实时数据' : item.status == '2' ? '已结束' : '未开始'}}</span>
            </div>
            <p v-if="item.homesite_a == '1' || item.homesite_b == '1'">{{item.homesite || ''}}</p>
          </div>

          <div class="right-team">
            <div class="team-logo">
              <img :src="item.team_b_image_thumb" alt=""/>
            </div>
            <p class="team-name">{{item.team_b_name || ''}}</p>
            <p class="place" :class="{home: item.homesite_b == '1'}" v-if="item.homesite_a == '1' || item.homesite_b == '1'">{{item.homesite_b == '1' ? '主场' : '客场'}}</p>
          </div>
        </div>
      </a>
      <div class="link-wrap">
        <div v-if="item.status == '0'" class="link-btn">
          <nuxt-link :to="`/match/${item.matchID}`">赛事前瞻</nuxt-link>
        </div>
        <div v-if="item.status == '0'" class="link-btn" :class="{like: item.is_remind == 1}" @click="setRemind(item.matchID)">{{item.is_remind == 1 ? '已预约' : '直播预约'}}</div>

        <div v-if="item.status == '1'" class="link-btn">
          <nuxt-link :to="`/match/${item.matchID}`">看直播</nuxt-link>
        </div>

        <div v-if="item.status == '2'" class="link-btn" :class="{'no-data': item.is_have_video_link != '1'}">
          <nuxt-link :to="`/match/${item.matchID}?isVideo=1`" v-if="item.is_have_video_link == '1'">视频</nuxt-link>
          <span v-else>视频更新中</span>
        </div>

        <div v-if="item.status == '2'" class="link-btn" :class="{'no-data': item.is_publist != 1}">
          <nuxt-link :to="`/match/${item.matchID}`" v-if="item.is_publist == 1">战报</nuxt-link>
          <span v-else>数据更新中</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "week-match-item",
    props: {
      matchData: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        item: Object.assign({}, this.matchData),
        params: {
          match_id: this.matchData.matchID
        }
      }
    },
    mounted() {
//      console.log(this.matchData)
    },
    methods: {
      setRemind(matchId) {
        this.$api.tournament.matchRemind({params: {match_id: matchId}}).then(resp => {
          console.log(resp)
          this.item.is_remind = this.item.is_remind == 1 ? 0 : 1
        })
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~static/static/css/variable.styl"
  .item-box {
    width 240px
    height: 100%
    float left
    .match-item {
      width: 220px
      height: 200px
      margin 0 auto
      background: #fff
      box-shadow: 0 4px 28px -4px rgba(38, 80, 128, 0.06);
      border-radius: 6px;
      border: 1px solid #F5F6F7
      padding 18px 15px 0
      position relative

      &:before {
        display none
        content ''
        position absolute
        top 0
        left 0
        width: 100%
        height 4px
        background: linear-gradient(135deg, rgba(13, 126, 255, 1), rgba(15, 151, 255, 1));
        border-radius: 3px 3px 0 0;
      }

      .date {
        width: 180px
        height: 28px
        color: $color-gray-1
        font-family 'Industry-Demi'
        border-radius 14px
        background #F5F6F7
        text-align center
        line-height 28px
        font-size 13px
        margin 0 auto
        .d-week {
          font-size 12px
        }
        .d-week, .games {
          margin-left 8px
        }
      }

      .match-info {
        width 100%
        margin-top 25px
        .left-team,
        .right-team {
          width: 58px
          float left
          text-align center
          .team-logo {
            width 44px
            height 44px
            margin 0 auto
            img {
              display block
              width: 100%
              height: 100%
            }
          }

          .team-name {
            width: 100%
            height: 20px
            line-height 20px
            font-family 'Industry-Bold'
            ellipsis()
          }
          .place {
            font-size 12px
            color $color-gray-2
            margin-top 4px
            &.home {
              color #0D8DFC
            }
          }
        }
        .mid-box {
          width: calc(100% - 58px * 2)
          float left
          padding-top 5px

          .status-wrap {
            width: 100%
            height: 18px
            margin-top 7px
            .match-status {
              display block
              width: 62px
              height: 18px
              margin 0 auto
              border-radius 9px
              line-height 18px
              color $color-gray-2
              font-size 12px
              text-align center
              &.realtime {
                background: linear-gradient(135deg, #0D7EFF, #0F97FF);
                color #fff
              }
            }
          }

          p {
            text-align center
            font-size 12px
            margin-top 4px
            color $color-gray
          }
        }
      }

      .link-wrap {
        margin-top 22px
        text-align center
      }
      .link-btn {
        display inline-block
        width: 78px;
        height: 26px;
        border-radius: 13px;
        border: 1px solid $color-blue;
        color $color-blue
        text-align center
        line-height 24px
        cursor pointer
        font-size 12px
        + .link-btn {
          margin-left 5px
        }
        a {
          display block
          width 100%
          height: 100%
          color $color-blue
        }
        &.like {
          background $color-blue
          color #fff
          &:hover {
            background #077ee6
          }
        }
        &:not(.like):hover {
          background #edf7ff
        }
        &.no-data {
          opacity .3
          cursor default
          &:hover {
            background transparent
            border: 1px solid $color-blue;
          }
        }
      }

      &.playing {
        background-color #FAFBFD
        background-image: linear-gradient(-45deg, rgba(255, 255, 255, 1) 25%, transparent 25%, transparent 50%, rgba(255, 255, 255, 1) 50%, rgba(255, 255, 255, 1) 75%, transparent 75%, transparent);
        background-size: 50px 50px;
        /*animation: reverse progress-bar-stripes 0.80s linear infinite, animate-positive 2s;*/
        animation: progress-bar-stripes 0.80s linear infinite;
        &:before {
          display block
        }
        .date {
          background: #EBF5FF
          color $color-blue
        }
        .link-btn {
          width: 160px
        }
      }
      &.end {
        .date {
          color $color-gray-2
        }
      }
      &.home-site {
        .match-info {
          margin-top 16px
        }
        .link-wrap {
          margin-top 15px
        }
      }
    }
  }

  @-webkit-keyframes progress-bar-stripes {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 50px 0;
    }
  }

  @-o-keyframes progress-bar-stripes {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 50px 0;
    }
  }

  @keyframes progress-bar-stripes {
    from {
      background-position: 0 0;
    }
    to {
      background-position: 50px 0;
    }
  }
</style>
