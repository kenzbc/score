<template>
  <div class="piece teams-wrap">
    <div class="top">
      <div class="tools-bar cl">
        <h2 class="fll">参赛战队</h2>
        <div class="more-btn"><nuxt-link :to="`/tournament_group?tournamentID=${tournamentId}`" target="_blank"><span>战队榜</span><i class="iconfont icon-general__arrow_right"></i></nuxt-link></div>
      </div>
      <div class="teams-list">
        <div class="scroll-wrap cl" :class="{more: teamsData.length > 16, secondary: teamsData.length > 12 && teamsData.length < 17}">
          <div class="list-item" :class="{active: index === currTeamIndex}" v-for="(item, index) in teamsData" :key="item.team_id" @click="toggleTeam(index)">
            <div class="team-logo fll">
              <img :src="item.team_image" alt="" />
            </div>
            <p class="name">{{item.team_name || ''}}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="team-detail cl">
      <div class="col team-info">
        <nuxt-link :to="`/data/team/${currTeam.team_id || ''}`" target="_blank"><img :src="currTeam.team_image" class="image" /></nuxt-link>
        <div class="name">
          <nuxt-link :to="`/data/team/${currTeam.team_id || ''}`" target="_blank"><p class="short-name">{{currTeam.team_name || ''}}</p><p>{{currTeam.team_en_name || ''}}</p></nuxt-link>
        </div>
      </div>
      <div class="col team-player">
        <div class="arrow-btn prev" :class="{disabled: currPage === 1 || players.length === 0}" @click="prevPage"><i class="iconfont icon-general__arrow_left"></i></div>
        <div class="player-list">
          <div class="wrap-scroll" :style="{width: `${playersPages * 192}px`, left: `${offsetLeft}px`, transition: 'left 0.3s'}">
            <div class="image-block" v-for="(page, i) in players" :key="i">
              <div class="player-item" v-for="item in page" :key="item.playerID">
                <nuxt-link :to="`/data/player/${item.playerID || ''}`" target="_blank">
                  <img  class="player-image" :src="item.image_thumb || '//img1.famulei.com/z/2985229/p/1711/1718353058456_100X100.png'" />
                  <div class="sub-item">
                    <div class="pop-info">{{positions[item.positionID] && positions[item.positionID || ''].pos_name}} - {{item.nickname || ''}}</div>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </div>
        </div>
        <div class="arrow-btn next" :class="{disabled: currPage === playersPages || players.length === 0}" @click="nextPage"><i class="iconfont icon-general__arrow_right"></i></div>
      </div>
      <div class="col data-chart">
        <div class="win-rate-chart">
          <circle-color :percent="currTeam.victory_rate" :size="92"  :strokeWidth="8" :trailWidth="8" trailColor="#EBEDF2" strokeColor="rgba(12, 157, 252, 1)" >
            <div>
              <p class="rate">{{currTeam.victory_rate}}%</p>
              <p class="text">胜率</p>
            </div>
          </circle-color>
          <div class="name">{{parseInt(currTeam.win || 0) + parseInt(currTeam.lose || 0)}}场 {{currTeam.win || '-'}}胜 {{currTeam.lose || '-'}}败</div>
        </div>
        <div class="kda-chart">
          <div class="draw">
            <i class="iconfont icon-KDA"></i>
            <div class="text">
              <div class="val light">{{currTeam.KDA || '-'}}</div>
              <div class="key">{{currTeam.kills || '-'}}<span class="split">/</span><span class="light">{{currTeam.deaths || '-'}}</span><span class="split">/</span>{{currTeam.assists || '-'}}</div>
            </div>
          </div>
          <div class="name">KDA</div>
        </div>
      </div>
      <div class="col data-item-col">
        <div class="data-item-row">
          <div class="data-item">
            <div class="val">{{currTeam.totalDamageDealtToChampions}}</div><div class="key">分均输出</div>
          </div>
          <div class="data-item">
            <div class="val">{{currTeam.money}}</div><div class="key">分均经济</div>
          </div>
          <div class="data-item">
            <div class="val">{{currTeam.hits}}</div><div class="key">分均补刀</div>
          </div>
        </div>
        <div class="data-item-row">
          <div class="data-item">
            <div class="val">{{currTeam.first_blood_rate}}%</div><div class="key">一血率</div>
          </div>
          <div class="data-item">
            <div class="val">{{currTeam.towers}}</div><div class="key">场均推塔</div>
          </div>
          <div class="data-item">
            <div class="val">{{currTeam.baron_rate}}%</div><div class="key">大龙控制率</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import CircleColor from "../tools/charts/circle-color.vue"

  export default {
    components: {CircleColor},
    props: {
      teamsData: {
        type: Array,
        default: []
      },
      positions: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        currTeamIndex: 0,
        currPage: 1,
        playersPageWidth: 192,
        transitionStyle: 'width 0.3s'
      }
    },
    computed: {
      tournamentId() {
        return this.$route.params.id
      },
      currTeam() {
        return this.teamsData[this.currTeamIndex] || {}
      },
      playersPages() {
        return Math.ceil(this.teamsData[this.currTeamIndex] && this.teamsData[this.currTeamIndex].players && this.teamsData[this.currTeamIndex].players.length / 6) || 0
      },
      players() {
        let list = []
        for(let i = 0; i < this.playersPages; i++) {
          list[i] = []
          for(let j = (i * 6);j < ((i + 1) * 6);j++) {
            if (this.currTeam.players[j]) list[i].push(this.currTeam.players[j])
          }
        }
        return list
      },
      offsetLeft() {
        if (this.currPage === 1) {
          return 0;
        }
        return this.playersPageWidth * (this.currPage - 1) * -1
      }
    },
    methods: {
      toggleTeam(i) {
        this.currTeamIndex = i
        this.currPage = 1
        console.log(this.players)
      },
      prevPage() {
        if (this.currPage > 1) this.currPage--
      },
      nextPage() {
        if (this.currPage < this.playersPages) this.currPage++
      }
    },
    mounted() {
//      console.log(this.teamsData)
//      console.log(this.players)
    }
  }
</script>

<style lang="stylus">
  @import "~static/static/css/variable.styl"
  .teams-wrap {
    .top {
      background #fdfdfd
      border-bottom 1px solid #F5F6F7
      position relative
    }
    .tools-bar {
      .more-btn {
        position absolute
        top 0
        right 0
        width: 98px
        height: 38px
        background: linear-gradient(135deg,rgba(250,245,237,1) 0%,rgba(252,251,247,1) 100%)
        border-radius: 0 0 0 19px
        font-size 16px
        padding-left 22px
      //cursor pointer
        span {
          mid()
          line-height 38px
          font-weight 500
          color #E0CBA6
        }
        .iconfont {
          mid()
          color #E0CBA6
          margin-left 3px
          margin-top 2px
        }
      }
    }
  }

  .teams-list {
    /*margin-top 5px*/
    padding 5px 20px 12px
    .scroll-wrap {
      white-space nowrap

      .list-item {
        width 59px
        height 84px
        float left
        border-radius 8px
        border 1px solid transparent
        margin-top 10px

        + .list-item {
          margin-left calc((100% - (59px * 12)) / 11)
        }

        &:not(.active) {
          cursor pointer
        }
        .team-logo {
          width: 59px
          height: 59px
        }
        .name {
          height 17px
          line-height 17px
          margin-top 4px
          text-align center
          font-size 14px
          font-family 'Industry-Demi'
          padding 0 5px
          white-space nowrap
          text-overflow ellipsis
          overflow hidden
        }

        &.active {
          border: 1px solid rgba(0,0,0,0.03);
        }

        &:hover, &.active {
          .team-logo {
            background transparent
            img {
              background transparent
            }
          }
          background-color rgba(0,0,0,0.03)
        }
      }

      &.more {
        .list-item {
          + .list-item {
            margin-left calc((100% - (59px * 12)) / 11)
          }
          &:nth-child(12n + 1) {
            margin-left 0
          }
        }
      }

      &.secondary {
        display -webkit-flex;
        display flex;
        justify-content space-between;
        .list-item {
          + .list-item {
            margin-left calc((100% - (59px * 16)) / 15)
          }
        }
      }
    }
  }

  .team-detail {
    padding 24px 20px 32px
    overflow hidden
    > .col {
      float left

      &.team-info {
        text-align center
        width: 140px
        position relative
        z-index 2
        .image {
          width 110px
          height 110px
          display block
          margin 0 auto
        }

        .name {
          width 100%
          p {
            ellipsis()
            width: 100%
            &:nth-of-type(1) {
              font-family 'Industry-Bold'
              font-size 22px
              height 30px
              line-height 30px
            }
            &:nth-of-type(2) {
              font-family 'Industry-Demi'
              font-size 12px
              color $color-gray-1
              height: 16px
              line-height 16px
            }
          }
        }
      }

      &.team-player {
        width 300px
        padding-left 40px
        position relative
        padding-top 8px
        user-select none

        &:before {
          content ''
          position absolute
          right 0
          top 0
          width 1px
          height 160px
          background: linear-gradient(180deg,rgba(240,241,242,0) 0%,rgba(240,241,242,1) 51%,rgba(240,241,242,0) 100%)
          border-radius 2px
          z-index 2
        }

        .arrow-btn {
          position absolute
          top 62px
          width 30px
          height 30px
          line-height 28px
          text-align center
          border-radius 50%
          background-color #fff
          border 1px solid #F0F1F2
          z-index 10
          color $color-gray-2
          cursor pointer

          .iconfont {
            display inline-block
          }

          &.disabled {
            cursor no-drop
            .iconfont {
              opacity .3
            }
          }
          &:not(.disabled) {
            &:hover {
              box-shadow 0 1px 5px 1px rgba(5,11,26,0.1)
              .iconfont {
                opacity 1
                color $color-gray-1
              }
            }
          }

          &.prev {
            left 5px
            .iconfont {
              margin-left -1px
            }
          }

          &.next {
            right 25px
            .iconfont {
              margin-left 1px
            }
          }
        }

        .player-list {
          width 192px
          height 130px
          background-color #fff
          position relative
          &:before,&:after {
            display block
            width: 300%
            height: 100%
            position absolute
            content ''
            top 0
            background #fff
            z-index 1
          }
          &:before {
            right 100%

          }
          &:after {
            left 100%
          }
          .wrap-scroll {
            position absolute
            .image-block {
              width 192px
              height: 128px
              float left
            }
          }
          .player-item {
            width 54px
            height 54px
            margin-top 10px
            margin-left 10px
            float left
            background-color rgba(0,0,0, .06)
            border-radius 50%
            position relative;
            .player-image {
              display block
              width: 52px
              height: 52px
              border-radius 50%
              margin 2px auto 0
            }
            .sub-item {
              display none
              width: 180px
              height: 32px
              text-align center
              position absolute
              bottom 68px
              left calc(50% - 90px)
              z-index 11
              .pop-info {
                display inline-block
                height: 32px
                line-height 32px
                max-width 180px
                background-color #2D2F33
                color #fff
                font-weight 400
                font-size 14px
                padding 0 20px
                box-shadow: 0 6px 20px -3px rgba(0,0,0,0.2);
                border-radius: 4px;
                font-family 'Industry-Bold'
                ellipsis()
                &:before {
                  display: block;
                  content: '';
                  width: 0;
                  height: 0;
                  border-bottom: 10px solid #373a41;
                  border-right: 10px solid transparent;
                  position: absolute;
                  bottom: -3px;
                  left: calc(50% - 5px);
                  transform: rotate(-45deg);
                }
              }
            }
            &:hover {
              .sub-item {
                display block
              }
            }
          }
        }
      }

      &.data-chart {
        margin-left 20px
        padding-top 25px
        position relative
        z-index 2
        .draw {
          width: 96px
          height 99px
          margin 0 auto
          position relative

          .text {
            position absolute
            top 30px
            width 100%
            text-align center

            .val {
              height 24px
              line-height 24px
              font-size 20px
              font-family 'Industry-Bold'
            }

            .key {
              font-size 12px
              height 18px
              line-height 18px
              margin-top 4px
              color $color-gray-2
            }
          }
        }
        .name {
          height 20px
          line-height 20px
          margin-top 7px
          text-align center
          font-size 14px
          font-weight 600
          ellipsis()
        }

        .win-rate-chart {
          width 106px
          height 136px
          float left
          padding-top 5px
          .rate {
            height: 24px;
            line-height: 24px;
            font-size: 20px;
            font-family: 'Industry-Bold',sans-serif;
            margin-top 2px
          }
          .text {
            font-size: 12px;
            height: 18px;
            line-height: 18px;
            margin-top: 4px;
            color: #a8abb3;
          }
          .name {
            margin-top 8px
          }

        }

        .kda-chart {
          width 96px
          height 136px
          float left
          margin-left 15px
          position relative

          .draw {
            .iconfont {
              font-size 96px
              opacity 1
              position absolute
              z-index 1
              color #EBEDF2
              //top: -25px
            }
            .text {
              .key {
                white-space nowrap
                overflow hidden
                font-family 'Industry-Demi'
                .split {
                  margin 0 2px
                }
                span {
                  font-family 'Industry-Demi'
                }
              }
            }
          }
        }
      }

      &.data-item-col {
        margin-left 20px
        padding-top 30px
        position relative
        z-index 2
        .data-item-row {
          overflow hidden

          + .data-item-row {
            margin-top 30px
          }

          .data-item {
            float left
            text-align center
            width 80px

            .val {
              height 21px
              line-height 21px
              font-size 17px
              font-family 'Industry-Bold'
              font-weight bold
              ellipse()
            }

            .key {
              height 18px
              line-height 18px
              font-size 13px
              color $color-gray-2
              margin-top 4px
              ellipse()
            }

            + .data-item {
              margin-left 6px
            }
          }
        }

      }
    }

  }

</style>
