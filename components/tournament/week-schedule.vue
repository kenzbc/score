<template>
  <div class="piece week-schedule">
    <div class="tools-bar cl">
      <h2 class="fll">本周赛程</h2>
    </div>
    <div class="week-match-list">
      <div class="swiper-container swiper-container-horizontal this-week-swiper">
        <div class="swiper-wrapper this-week-match">
          <week-match-item :matchData="item" v-for="(item, index) in weekMatch" :key="item.matchID" />
        </div>
      </div>
      <div class="swiper-button swiper-button-prev"><i class="iconfont icon-general__arrow_left"></i></div>
      <div class="swiper-button swiper-button-next"><i class="iconfont icon-general__arrow_right"></i></div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tournament-week-match",
    props: {
      weekMatch: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        weekMatchSwiper: null
      }
    },
    computed: {
      currMatchIndex() {
        const index = this.weekMatch.findIndex(m => m.status == '1')
        return index == -1 ? 0 : index
      }
    },
    methods: {
      initSwiper() {
        if (this.weekMatchSwiper) {
          this.weekMatchSwiper.destroy(false)
          this.weekMatchSwiper = null
        }

        this.weekMatchSwiper = new Swiper('.this-week-swiper', {
          direction: 'horizontal',
          slidesPerView: 4,
          slidesPerGroup: 4,
          initialSlide: this.currMatchIndex,
          preventClicks: false,
          simulateTouch: false,
          navigation: {
            nextEl: '.week-schedule .swiper-button-next',
            prevEl: '.week-schedule .swiper-button-prev',
          },
          observer: true,
          observeParents: true
        })
      },
      setAppointment() {

      }
    },
    mounted() {
      if (this.weekMatch.length > 0) this.initSwiper()
    },
    destroyed() {
      this.weekMatchSwiper && this.weekMatchSwiper.destroy(false)
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~static/static/css/variable.styl"
  .week-schedule {
    //padding 14px 15px 0
  }
  .tools-bar {
    padding-bottom: 0
  }
  .week-match-list {
    width: 100%
    height: 232px
    padding: 0 14px
    position relative
    .this-week-swiper {
      width 100%
      height: 100%
      padding-top: 12px
    }
    .swiper-button {
      width: 50px
      height: 28px;
      padding-top: 2px;
      border-radius: 14px;
      border: 1px solid #f0f1f2;
      background #fff;
      position absolute
      top -5px;
      z-index 10
      opacity 1;
      text-align center

      .iconfont {
        font-size 16px;
        display inline-block;
        color: $color-gray-2
        margin-top 3px;
      }

      &.swiper-button-prev {
        left: auto
        right 82px;
      }
      &.swiper-button-next {
        right 23px
      }
      &.swiper-button-disabled {
        pointer-events: auto;
        cursor no-drop
        .iconfont {
          opacity .3
        }
      }
      &:not(.swiper-button-disabled):hover {
        box-shadow: 0 1px 5px 1px rgba(5, 11, 26, 0.1);
        .iconfont {
          opacity 1
          color $color-gray-1
        }
      }
    }
  }

</style>
