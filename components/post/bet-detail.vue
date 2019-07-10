<template>
  <nuxt-link class="bet-detail" to="/p/" target="_blank">
    <div class="l-box fll">
      <i class="iconfont icon-personal__Bet"></i>
    </div>
    <div class="r-box fll">
      <p class="p1">
        <img class="mid" src="https://img1.famulei.com/m/2564381/p/188/0717231983304.png" alt="">
        <span class="title mid">123</span>
        <span class="status-label over mid">已结束</span>
        <span class="status-label close mid">已关闭</span>
        <span class="status-label beting mid">已关闭</span>
      </p>
      <p class="p2">
        <span>2人已投注11</span>
        <span class="end-time">截止： 周六 7月2日</span>
      </p>
    </div>
  </nuxt-link>
</template>

<script>
  //菠菜帖子
  export default {
    name: "bet-detail",
    components: {},
    data() {
      return {}
    },
    mounted() {

    },
    methods: {},
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .bet-detail {
    display: block;
    width: 100%;
    height: 60px;
    background: #fafafa;
    border-radius: 4px;
    margin: 0 auto;
    border-bottom: 1px dotted #f0f1f2;

    .mid {
      display: inline-block;
      vertical-align: middle;
    }

    .l-box {
      width: 60px;
      height: 60px;
      background: #16de9b;
      border-radius: 4px 0 0 4px;
      text-align: center;
      padding-top: 9px;

      .iconfont {
        font-size: 40px;
        color: #fff;
      }

    }

    .r-box {
      margin-left: 15px;
      width: calc(100% - 75px);
      overflow: hidden;
      padding-top: 3px;

      .p1 {
        margin-top: 5px;

        >>> img {
          width: 24px;
          height: 24px;
        }

        .title {
          margin-left: 10px;
          font-size: 14px;
          color: #2d2f33;
          max-width: 400px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
        }
        .status-label {
          margin-left: 10px;
          padding: 3px 8px;
          font-size: 12px;
          border-radius: 3px;
          color: #fff;

          &.over {
            background: #16de9b;
          }
          &.beting {
            background: #0d8dfc;
          }
          &.close {
            background: #a8abb3;
          }
        }
      }

      .p2 {
        margin-top: 5px;
        font-size: 12px;
        color: #a8abb3;
        white-space: nowrap;
        overflow: hidden;

        .end-time {
          margin-left: 18px;
        }
      }



    }







  }
</style>
