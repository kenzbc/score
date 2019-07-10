<template>
  <div class="subscribe-dialog" v-if="show" @click="close()">

    <div class="dialog-body">
      <div class="schdule-mask-bottom">
        <div class="mask-bottom-title">{{matchInfo.tournament_name }} {{matchInfo.round_name }}</div>
        <div class="mask-bottom-team clearfix">
          <div class="bottom-team-a fll">
            <img class="bottom-team-a-img" :src="matchInfo.team_a_image" alt="">
            <p class="bottom-team-a-name">{{matchInfo.team_a_short_name}}</p></div>
          <div class="mask-bottom-vs"><p class="vs-top">VS</p>
            <p class="mask-match-time">{{matchInfo.start_time | dateFormat('x','MM-DD HH:mm')}} {{matchInfo.homesite}}</p></div>
          <div class="bottom-team-b flr">
            <img class="bottom-team-b-img" :src="matchInfo.team_b_image" alt="">
            <p class="bottom-team-b-name">{{matchInfo.team_b_short_name}}</p></div>
          <div class="bottom-line"></div>
          <div class="bottom-erweima clearfix">
            <div class="erweima-left fll"><img class="bottom-erweima-img" src="/static/images/twocode.png" alt=""></div>
            <div class="erweima-right fll"><p class="erweima-right-top">预约成功</p>
              <p class="erweima-right-middle">扫描二维码，下载Score App</p>
              <p class="erweima-right-bottom">开赛前30分钟，将收到推送提醒</p></div>
          </div>
        </div>
      </div>
    </div>


  </div>
</template>

<script>
  // 预约想看 弹窗
  export default {
    name: "subscribe-dialog",
    components: {},
    props:{
      show:{
        type:Boolean,
        default:false
      },
      matchInfo: {
        type: Object,
        default: {}
      },
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {
      /**关闭弹层**/
      close:function(){
        this.$emit('close', true);
      },
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .subscribe-dialog{
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0,0,0,0.7);
    position: fixed;
  }

  .dialog-body {
    line-height: 1;
    margin: auto;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 320px;
    height: 430px;
    background: url(/static/images/banner/backgroiund.png) no-repeat;
    background-size: 100% 100%;
    border-radius: 4px;
    z-index: 1000;


    .schdule-mask-bottom {
      margin: 0 8px;
      margin-top: 104px;
      text-align: center;

      .mask-bottom-title {
        display: inline-block;
        font-size: 12px;
        color: #656973;
        background: #f7f8fa;
        border-radius: 16px;
        height: 23px;
        line-height: 23px;
        width: 270px;
        text-align: center;
        margin: 18px auto 12px;
      }
      .mask-bottom-team {
        width: 100%;
        text-align: center;
        position: relative;

        .bottom-team-a {
          margin-left: 20px;

          .bottom-team-a-img {
            height: 50px;
            width: 50px;
          }
          .bottom-team-a-name {
            margin-top: 4px;
            font-size: 16px;
            color: #2d2f33;
            text-align: center;
            width: 50px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-family: 'Industry-Demi',sans-serif;
          }
        }

        .mask-bottom-vs {
          width: 136px;
          display: inline-block;

          .vs-top {
            margin-top: 7px;
            display: inline-block;
            font-size: 16px;
            color: #656973;
            background: #f0f1f2;
            height: 36px;
            width: 36px;
            text-align: center;
            line-height: 36px;
            border-radius: 50%;
            font-family: 'Industry-Demi',sans-serif;
          }
          .mask-match-time {
            margin-top: 15px;
            font-size: 12px;
            color: #a8abb3;
            text-align: center;
          }
        }

        .bottom-team-b {
          margin-right: 20px;

          .bottom-team-b-img {
            height: 50px;
            width: 50px;
          }
          .bottom-team-b-name {
            margin-top: 4px;
            font-size: 16px;
            color: #2d2f33;
            text-align: center;
            width: 50px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-family: 'Industry-Demi',sans-serif;
          }
        }

        .bottom-line {
          position: absolute;
          left: 17px;
          bottom: 114px;
          height: 1px;
          width: 270px;
          background: #f0f1f2;
        }

        .bottom-erweima {
          margin: 44px auto 0;
          display: inline-block;

          .erweima-left {
            .bottom-erweima-img {
              width: 90px;
              height: 90px;
            }
          }
          .erweima-right {
            margin-left: 10px;
            text-align: left;

            .erweima-right-top {
              font-weight: bold;
              height: 30px;
              line-height: 30px;
              font-size: 16px;
              color: #333;
            }
            .erweima-right-middle {
              margin-top: 5px;
              font-size: 12px;
              color: #333;
            }
            .erweima-right-bottom {
              margin-top: 10px;
              font-size: 12px;
              color: #333;
            }
          }
        }
      }


    }

  }

</style>
