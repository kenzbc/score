<template>
  <div class="piece tournament-schedule">
    <div class="content">
      <piece-header title="赛事进度">
        <div class="header-bg-line"></div>
        <ul class="menu cl">
          <li class="m-item-wrap" v-for="(item, index) in (tournament.list || [])" :key="index" @click="toggleMenu(index)">
            <span class="m-item" :class="{active: tournament.current.menuIndex == index}">{{item.name || ''}}<svg class="icon" aria-hidden="true"><use xlink:href="#icon-circle_blue"></use></svg></span>
          </li>
        </ul>
      </piece-header>
      <div class="piece-main cl">
        <!--赛程列表-->
        <div class="weeks-wrap fll">
          <div class="top-box cl">
            <div class="weeks-menu-wrap" v-show="isWeeks">
              <div class="swiper-container swiper-container-horizontal weeks-swiper">
                <div class="swiper-wrapper weeks-menu">
                  <div class="swiper-slide" v-for="(item, index) in weekList" :key="index" @click="toggleWeek(index)">
                    <span class="week-item" :class="{active: tournament.current.weekIndex == index}">{{item.name || ''}}</span>
                  </div>
                </div>
              </div>
              <div class="swiper-button swiper-button-prev"><i class="iconfont icon-general__arrow_left"></i></div>
              <div class="swiper-button swiper-button-next"><i class="iconfont icon-general__arrow_right"></i></div>
            </div>
            <div class="no-weeks" v-show="!isWeeks">赛程列表</div>
          </div>
          <div class="nano ts-list-wrap">
            <div class="ts-match-list nano-content cl">
              <wholeMatchItem v-if="weekMatch.length > 0" v-for="item in weekMatch" :key="item.matchID" :match-data="item"/>
              <no-data tip="暂无比赛" v-else :show="true"/>
            </div>
            <Spin size="large" fix v-if="loading"></Spin>
          </div>
        </div>
        <!--积分排名-->
        <points-rank :ranking="ranking" />
      </div>
    </div>
  </div>
</template>

<script>

  export default {
    name: "tournament-schedule",
    props: {
      tournamentData: {
        type: Object,
        default: {}
      },
      weekMatchData: {
        type: Array,
        default: []
      },
      rankData: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        tournament: Object.assign({}, this.tournamentData),
        weekMatch: [].concat(this.weekMatchData),
        weeksSwiper: null,
        loading: false
      }
    },
    computed: {
      // 是否有周列表
      isWeeks() {
        return this.tournament.list[this.tournament.current.menuIndex] && this.tournament.list[this.tournament.current.menuIndex].round_son && this.tournament.list[this.tournament.current.menuIndex].round_son.length > 0
      },
      // 周列表
      weekList() {
        return this.isWeeks ? this.tournament.list[this.tournament.current.menuIndex].round_son : []
      },
      // 当前weekId
      weekId() {
        return this.isWeeks ? this.weekList[this.tournament.current.weekIndex].id : `p_${this.tournament.current.roundId}`
      },
      // 当前积分数据
      ranking() {
        return this.rankData[this.tournament.current.roundId] || []
      }
    },
    mounted() {
      if (this.isWeeks) this.initSwiper()
    },
    methods: {
      initSwiper() {
        if (this.weeksSwiper) {
          this.weeksSwiper.destroy(false)
          this.weeksSwiper = null
        }
        this.weeksSwiper = new Swiper('.weeks-swiper', {
          direction: 'horizontal',
          slidesPerView: 7,
          slidesPerGroup: 6,
          initialSlide: this.tournament.current.weekIndex,
          simulateTouch: false,
          navigation: {
            nextEl: '.tournament-schedule .swiper-button-next',
            prevEl: '.tournament-schedule .swiper-button-prev',
          },
          observer: true,
          observeParents: true
        })
      },
      // 切换头部菜单
      toggleMenu(i) {
        if (this.tournament.current.menuIndex == i) return
        this.tournament.current.menuIndex = i
        this.tournament.current.roundId = this.tournament.list[i].roundID
        if (this.isWeeks) setTimeout(() => {this.initSwiper()}, 0)
        this.getWeekMatch()
      },
      // 切换周
      toggleWeek(i) {
        if (this.tournament.current.weekIndex == i) return
        this.tournament.current.weekIndex = i
        this.getWeekMatch()
      },
      // 周比赛数据
      async getWeekMatch() {
        this.loading = true
        this.weekMatch = await this.$api.tournament.weekMatchList({params: {weekId: this.weekId}}) || []
        this.loading = false
      }
    },
    destroyed() {
      this.weeksSwiper && this.weeksSwiper.destroy(false)
      this.weeksSwiper = null
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~static/static/css/variable.styl"

  .tournament-schedule {
    .piece-header {
      .menu {
        .m-item-wrap {
          width: auto
          min-width 114px
          max-width 400px
          padding 0 20px
        }
      }
    }

    .piece-main {
      width: 100%
      .weeks-wrap {
        width: 641px
        border-right 1px solid $color-gray-6
        padding 16px 0
      }
      .top-box {
        width 100%
        padding-bottom 14px
        position relative
        z-index 1
        &.shadow {
          box-shadow: 0 4px 12px -3px rgba(0, 0, 0, 0.04);
        }
        .iconfont {
          font-size 16px
          display inline-block
          color $color-gray-2
        }
        .no-weeks {
          height: 26px
          line-height 26px
          text-align center
          font-size 14px
          color $color-gray-1
        }
        .weeks-menu-wrap {
          width: 532px
          height: 26px
          margin 0 auto
          position relative

          .swiper-button {
            width: 26px;
            height: 26px;
            background: $color-gray-5
            border-radius: 8px;
            text-align center
            padding-top 2px
            top 22px
            opacity 1
            padding-top 5px

            .iconfont {
              color $color-gray-2
            }
            &.swiper-button-prev {
              left -33px
            }
            &.swiper-button-next {
              right -33px
            }
            &.swiper-button-disabled {
              cursor no-drop
              pointer-events auto
              .iconfont {
                opacity .3
              }
            }
            &:not(.swiper-button-disabled) {
              &:hover {
                .iconfont {
                  opacity 1
                  color $color-gray-1
                }
              }
            }
          }
        }
        .weeks-menu {
          .week-item {
            display block
            width: 66px
            height: 26px
            margin 0 auto
            text-align center
            line-height 26px
            background #F0F1F2
            color $color-gray-1
            cursor pointer
            font-size 12px
            border-radius: 8px;
            padding 0 5px
            ellipsis()
            + .week-item {
              margin-left 10px
            }
            &.active {
              color #fff
              background $color-blue
            }
          }
        }
      }

      .ts-list-wrap {
        height calc(98px * 5 - 10px)
        overflow hidden
        position relative
      }
      .ts-match-list {
        width 100%
        padding 0 20px
      }
    }
  }
</style>
