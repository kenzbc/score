<template>
  <div class="top-data cl">
    <div class="top-data-inner">
      <div class="avatar-wrap fll">
        <nuxt-link :to="`/data/player/${player.playerID || ''}`" target="_blank"><img class="player-avatar" :src="player.player_image_thumb" alt=""/></nuxt-link>
        <div class="rank" :class="{'rank-img': index < 3}">
          <img :src="`/images/tournament/no${index + 1}.png`" alt="" v-if="index < 3" />
          <span v-else>{{index + 1}}</span>
        </div>
      </div>
      <div class="name-kda fll">
        <p class="name"><nuxt-link :to="`/data/player/${player.playerID || ''}`" target="_blank">{{player.nickname || ''}}</nuxt-link></p>
        <p>
          <svg class="icon pos" aria-hidden="true"><use :xlink:href="player.positionID && positions[player.positionID].icon"></use></svg><span class="text">战队:</span><span class="team-name"><nuxt-link :to="`/data/team/${player.teamID || ''}`" target="_blank">{{player.team_short_name || ''}}</nuxt-link></span>
        </p>
        <kda-bar :kda="playerModeData.KDA" :kills="parseInt(playerModeData.kills || '0')" :deaths="parseInt(playerModeData.deaths || '0')" :assists="parseInt(playerModeData.assists || '0')" />
      </div>
      <img class="bg-team-logo" :src="player.team_image_thumb" alt="" />
    </div>
  </div>
</template>

<script>
  import kdaBar from "./kda-bar"

  export default {
    components: {kdaBar},
    props: {
      player: {
        type: Object,
        default: {}
      },
      playerModeData: {
        type: Object,
        default: {}
      },
      index: {
        type: Number,
        default: 0
      },
      positions: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {}
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~static/static/css/variable.styl"

  .top-data {
    width: 420px
    height: 150px
    margin 0 auto
    background: #fff;
    box-shadow: 0 8px 30px -8px rgba(64, 94, 128, 0.07);
    border-radius: 8px;
    padding-top 20px
    padding-left 22px
    .top-data-inner {
      overflow hidden
      width: 100%
      height: 100%
      position relative
    }
    .bg-team-logo {
      position absolute
      width: 160px
      height: 160px
      top -17px
      right -45px
      opacity .04
    }
    .avatar-wrap {
      width: 110px
      height: 110px
      background #fbfbfb
      border-radius 50%
      padding 2px 2px 0
      position relative

      .player-avatar {
        width: 100%
        height: 100%
        border-radius 50%
        margin-top 2px
      }
      .rank {
        width: 36px
        height: 36px
        line-height 36px
        text-align center
        font-size 18px
        font-weight 600
        color $color-gray-1
        border-radius 50%
        background #fff
        position absolute
        left 0
        bottom 0
        &.rank-img {
          width: 46px
          height: 46px
          padding 5px
          left -6px
          bottom -6px
          line-height inherit
          img {
            display block
          }
        }
      }
    }
    .name-kda {
      width: calc(100% - 110px)
      padding-left 16px
      position relative
      z-index 1
      .name {
        height: 30px;
        font-size: 25px;
        font-family: 'Industry-Bold';
        font-weight: bold;
        line-height: 30px;
        margin-bottom 6px
        margin-top 9px
      }
      .icon {
        width: 16px
        height: 16px
        margin-right 15px
        mid()
      }
      p {
        span {
          mid()
          height: 16px;
          line-height 16px
          font-size 12px
          color $color-gray-2
          position relative
        }
        .text {
          &:before {
            display block
            content ''
            width: 1px
            height: 10px
            background #EBEBED
            position absolute
            top 4px
            left -8px
          }
        }
        .team-name {
          margin-left 10px
          a {
            color $color-gray-2
          }
        }
      }
      .kda-wrap {
        margin-top 9px
        width: 218px
        .kda-num {
          margin-top 3px
          .text {
            font-size 16px
            line-height 22px
          }
        }
      }
    }
  }
</style>
