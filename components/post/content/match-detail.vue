<template>
  <a href="/match?matchID=2960">
    <div class="list-items-match">
      <div class="items-match-top">web赛事主页阶段</div>
      <div class="items-match-middle">
        <div class="items-match-left">
          <img class="match-left-img" src="https://img1.famulei.com/z/953482/p/183/1410554957045_100X100.png" alt="">
          <p class="match-left-name industry-bold">JFB5</p>
        </div>
        <div class="items-match-cont">
          <!-- 未开始的-->
          <p class="tems-match-cont-vs Industry-Demi">VS</p>

          <p class="items-match-cont-time Industry-Demi">10-18 02:00</p>
        </div>
        <div class="items-match-right">
          <img class="match-left-img" src="https://img1.famulei.com/z/953482/p/183/1410561027908_100X100.png" alt="">
          <p class="match-left-name industry-bold">JFB6</p>
        </div>
      </div>
    </div>
  </a>
</template>

<script>
  // 赛事类型的帖子
  export default {
    name: "match-detail",
    components: {},
    props:{
      data:{
        type: Object,
        default: ()=>{}
      }
    },
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
  .list-items-match{
    margin-top: 10px;
    width: 320px;
    min-height: 110px;
    background: #fff;
    border: 1px solid #f0f1f2;
    box-shadow: 0 2px 4px 0 rgba(0,0,0,0.03);
    border-radius: 6px;

    .items-match-top {
      width: 300px;
      margin: 10px auto 0;
      text-align: center;
      font-size: 12px;
      color: #a8abb3;
      background: #f7f8fa;
      border-radius: 8px;
      height: 22px;
      line-height: 22px;
    }

    .items-match-middle {
      text-align: center;
      margin-top: 11px;
      display flex;
      justify-content space-between;

      .match-left-img {
        border-radius: 50%;
        height: 40px;
        width: 40px;
      }
      .match-left-name {
        font-size: 14px;
        color: #2d2f33;
        line-height: 14px;
        text-align: center;
      }

      .items-match-left {
        margin-left: 26px;
      }
      .items-match-cont {
        display: inline-block;

        .tems-match-cont-vs {
          margin-top: 5px;
          display: inline-block;
          height: 30px;
          width: 30px;
          text-align: center;
          line-height: 30px;
          background: #f0f1f2;
          border-radius: 50%;
          font-size: 13px;
          color: #656973;
          margin-bottom: 6px;
        }
        .items-match-cont-time {
          font-size: 12px;
          color: #a8abb3;
        }
      }
      .items-match-right {
        margin-right: 26px;
      }

    }

  }


</style>
