<template>
  <div class="piece bet-wrap">
    <div class="tools-bar cl">
      <h2 class="fll">比赛竞猜</h2>
      <div class="more flr">
        <nuxt-link to="/bet_list" target="_blank">更多</nuxt-link>
      </div>
    </div>
    <div class="match-list">
      <div class="list-item" :class="{active: i === index}" v-for="(match, i) in matches" :key="match.match_id" v-if="index < 5" @click="selectMatch(i)">
        <div class="join">{{match.match_start_time | dateFormat('X', 'MM-DD HH:mm')}} {{match.match_start_time | weekDay('X')}}</div>
        <div class="team-vs">
          <div class="left-team fll">
            <div class="team-logo">
              <img :src="match.team_image_thumb_a" alt="" />
            </div>
            <p class="team-name">{{match.match_team_a || ''}}</p>
          </div>
          <div class="left-team flr">
            <div class="team-logo">
              <img :src="match.team_image_thumb_b" alt="" />
            </div>
            <p class="team-name">{{match.match_team_b || ''}}</p>
          </div>
          <div class="vs-label">VS</div>
        </div>
      </div>
    </div>
    <div class="bet-item-list-wrap">
      <div class="nav-btn prev" :class="{disabled: currPage === 1 || bets.length === 0}" @click="prevPage"></div>
      <div class="nav-btn next" :class="{disabled: currPage === pages || bets.length === 0}" @click="nextPage"></div>
      <div class="bet-item-list">
        <div class="wrap-scroll cl" :style="{width: `${scrollWrapWidth}px`, left: `${offsetLeft}px`, transition: 'left 0.3s'}">
          <div class="bet-item" :data-bet-id="bet.bet_id" :data-index="index" v-for="(bet, index) in bets" :key="bet.bet_id" v-if="bet.items && bet.items.length < 5">
            <div class="bet-item-inner">
              <div class="title cl">
                <p>{{bet.title}}</p>
                <div class="desc">
                  <span>{{bet.people_num}} 人已投注 {{bet.total_price}}</span><span class="date">{{bet.bet_end_time_txt}}</span>
                  <span class="betted-list-btn"></span>
                </div>
              </div>
              <div class="option-list cl">
                <div class="option-item" :class="{isbet: betItem.is_bet && betItem.is_bet == 1}" v-for="betItem in (bet.items || [])" :key="betItem.bet_item_id">
                  <span class="name" :title="betItem.item_name || ''"><i class="icon iconfont">&#xe6d5;</i>{{betItem.item_name || ''}}</span><span class="odds">赔率：{{betItem.odds || ''}}</span>
                </div>
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
    name: "tournament-bet",
    props: {
      betData: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        index: 0,
        count: this.betData.count || 0,
        matches: [].concat(this.betData.list || []),
        betBoxWidth: 455,
        currPage: 1
      }
    },
    computed: {
      match() {
        return this.matches[this.index] || {}
      },
      bets() {
        return this.match.bet_list || []
      },
      pages() {
        return Math.ceil(this.bets.length / 2)
      },
      scrollWrapWidth () {
        return this.bets.length * this.betBoxWidth
      },
      offsetLeft() {
        if (this.currPage === 1) {
          return 0;
        }
        return this.betBoxWidth * 2 * (this.currPage - 1) * -1
      }
    },
    mounted() {
//      console.log(this.matches)
    },
    methods: {
      selectMatch(i) {
        this.index = i
        this.currPage = 1
      },
      prevPage() {
        if (this.currPage > 1) this.currPage--
      },
      nextPage() {
        if (this.currPage < this.pages) this.currPage++
      }
    },
    destroyed() {

    }
  }
</script>

<style lang="stylus" scoped>
  @import "~static/static/css/variable.styl"
  .bet-wrap {
    .tools-bar {}

    .match-list {
      width 100%
      margin-top 9px
      padding 5px 21px 15px
      overflow hidden
      border-bottom 1px solid #F5F6F7

      .list-item {
        user-select none
        width 180px
        height 100px
        float left
        background-color #FFFFFF
        border-radius 6px
        border: 1px solid rgba(245,246,247,1)
        box-shadow:0 3px 14px -4px rgba(38,79,127,0.05)
        position relative
        transform translateY(0)
        transition-duration .3s

        &:before {
          content ''
          display block
          position absolute
          right 0
          top 0
          bottom 0
          left 0
          border 1px solid #ebedf2
          border-radius 6px
          transition-duration .3s
        }

        &:not(.active) {
          cursor pointer
          &:hover {
            box-shadow 0 4px 20px -4px rgba(38, 79, 127, 0.05), 0 4px 20px -4px rgba(38, 79, 127, 0.05)
            transform translateY(-5px)
          }
        }

        + .list-item {
          margin-left 12px
        }

        &.active {
          &:before {
            border 2px solid $color-blue
          }
        }

        .team-logo {
          width: 36px
          height: 36px
        }
        .team-vs {
          padding 0 20px
          overflow hidden
          .team-name {
            text-align center
            font-size 14px
            font-family 'Industry-Demi'
          }
          p {
            width: 36px
            ellipsis()
          }
        }
        .vs-label {
          width: 30px
          height: 30px
          border-radius 50%
          background #F0F1F2
          margin 13px auto
          line-height 28px
          text-align center
          font-size 13px
          color $color-gray-1
          font-family 'Industry-Demi'
        }
        .join {
          background-color #F5F6F7
          width: 150px
          height 22px
          line-height 22px
          text-align center
          color $color-gray-1
          font-size 12px
          margin 10px auto 3px
          border-radius 12px
          font-family 'Industry-Demi'
        }

      }
    }
    .bet-item-list-wrap {
      height 150px
      padding 21px 40px 20px
      background #fff
      position relative

      .nav-btn {
        position absolute
        width: 30px
        height 30px
        line-height 30px
        top 58px
        font-family 'iconfont'
        color $color-gray-2
        font-size 26px
        cursor pointer
        user-select none
        transition-duration .3s
        border-radius 50%

        &.disabled {
          cursor no-drop
          opacity .3
        }

        &:not(.disabled):hover {
          background-color #f5f6f7
          color $color-gray-1
        }

        &:before {
          content '\e6b2'
          margin-left 2px
        }

        &.prev {
          left 12px
          transform rotate(0deg)
        }

        &.next {
          right 12px
          transform rotate(180deg)
        }
      }

      .bet-item-list {
        overflow hidden
        position relative
        height 100%

        .wrap-scroll {
          position absolute
        }

        .bet-item {
          width 455px
          float left
          .bet-item-inner {
            width 430px
            margin 0 auto
          }
          .title {
            width: 100%
            padding 0 2px
            p {
              font-size 14px
              height 20px
              line-height 20px
              font-weight 600
              float left
            }
            .desc {
              font-size 12px
              height 16px
              line-height 16px
              color $color-gray-2
              float right
              span {
                mid()
              }
              .date {
                margin-left 12px
              }
              .betted-list-btn {
                width: 16px
                height: 16px
                background url('/images/tournament/bet_more.png') no-repeat center
                background-size 16px 16px
                margin-left 8px
                cursor pointer
              }
            }
          }

          .option-list {
            user-select none

            .option-item {
              cursor pointer
              margin-top 10px
              width 210px
              height 34px
              line-height 32px
              float left
              background-color #fff
              border 1px solid #EBEBED
              border-radius 16px
              overflow hidden
              transition-duration .3s

              span {
                display block
              }

              .icon {
                color #fff
                display none
              }

              .name {
                padding-left 12px
                padding-right 5px
                width calc(100% - 100px)
                font-size 14px
                font-weight 400
                ellipsis()
                float left
                .icon {
                  margin-right 10px
                  color $color-blue
                  font-size 14px
                }
              }

              .odds {
                width 100px
                background-color #F8F9FA
                position relative
                text-align center
                color $color-gray-1
                font-size 14px
                float right
                &:after {
                  content ''
                  display block
                  position absolute
                  top 0
                  bottom 0
                  left -5px
                  background-color #F8F9FA
                  width 10px
                  transform skewX(-10deg)
                  border-left 1px solid #EEEFF0
                }
              }

              &:nth-child(2n) {
                margin-left 10px
              }

              &:not(.isbet):hover {
                background: #F5F6F7;
                border: 1px solid #E6E7E8;
              }

              &.isbet {
              //cursor inherit
                .icon {
                  display inline
                }
              }
            //&.active {
            //    background-color #FFEB79
            //    color #8C6600
            //    border-color #FFD651
            //    font-weight bold
            //
            //    .odds {
            //        background-color #FFde79
            //        color #8C6600
            //
            //        &:after {
            //            content ''
            //            display block
            //            position absolute
            //            top 0
            //            bottom 0
            //            left -5px
            //            background-color #ffde79
            //            width 10px
            //            transform skewX(-10deg)
            //            border-left 1px solid #FFD651
            //        }
            //    }
            //}
            }
          }
        }
      }
    }
  }

</style>
