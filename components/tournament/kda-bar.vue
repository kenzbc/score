<template>
  <div class="kda-wrap">
    <div class="kda-bar">
      <span class="kda-k" :style="{width: `${kRate}%`, transition: transitionStyle}"></span>
      <span class="kda-d" :style="{width: `${dRate}%`, transition: transitionStyle}"></span>
      <span class="kda-a" :style="{width: `${aRate}%`, transition: transitionStyle}"></span>
    </div>
    <div class="kda-num">
      <span class="average">{{kda || '0'}}</span>
      <span class="text">KDA</span>
      <span class="kda">{{kills}} / {{deaths}} / {{assists}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      kda: {
        type: String,
      },
      kills: {
        type: Number,
        default: 0
      },
      deaths: {
        type: Number,
        default: 0
      },
      assists: {
        type: Number,
        default: 0
      },
    },
    data() {
      return {
        transitionStyle: 'width 0.3s'
      }
    },
    computed: {
      kdaSum() {
        return this.kills + this.deaths + this.assists
      },
      kRate() {
        return this.kills > 0 ? this.kills / this.kdaSum * 100 : 0
      },
      dRate() {
        return this.deaths > 0 ? this.deaths / this.kdaSum * 100 : 0
      },
      aRate() {
        return this.assists > 0 ? this.assists / this.kdaSum * 100 : 0
      }
    }
  }
</script>

<style lang="stylus">
  .kda-bar {
    width: 100%
    height: 10px
    border-radius 5px
    overflow hidden
    span {
      display block
      height: 100%
    }
    .kda-k {
      width: 0
      float left
      background: #FFCC60
      box-shadow: 0 3px 8px -2px rgba(255,204,96, 0.2);
    }
    .kda-d {
      width: 0
      float left
      background: #8A64B1
      box-shadow: 0 3px 8px -2px rgba(255,204,96, 0.2);
    }
    .kda-a {
      width: 0
      float left
      background: #AFE685
      box-shadow: 0 3px 8px -2px rgba(255,204,96, 0.2);
    }
  }

  .kda-num {
    width: 100%
    overflow hidden
    margin-top 2px
    white-space nowrap
    span {
      display block
      float left
      height 24px
      line-height 24px
    }
    .average {
      max-width: 30%
      font-size 16px
      font-family 'Industry-Bold'
      padding-left 2px
      line-height 22px
      overflow hidden
    }
    .text {
      margin-left 8px
      font-size 12px
      font-family 'Industry-Demi'
    }
    .kda {
      width: 55%
      text-align right
      font-size 12px
      color $color-gray-1
      font-family 'Industry-Demi'
      padding-right 2px
      float right
    }
  }

</style>
