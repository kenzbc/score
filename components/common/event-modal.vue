<template>
  <!--随机事件弹出框-->
  <div class="post-event-pops event-pop">
    <div class="form">
      <div class="head">
        <span class="title">{{data.title}}</span>
        <a href="javascript:" class="sign_close" @click="closeEventPop();">
          <i class="iconfont icon-iconx"></i>
        </a>
      </div>
      <div class="wrap">
        <div class="pop-img">
          <img :src="data.image_url" width="272" height="192">
          <img style="display:none;" class="img-bg" src="https://img1.famulei.com/z/6292203/p/193/1512014282222.png" width="370" height="370">
          <img style="display:none;" class="img-icon" src="https://img1.famulei.com/z/6292203/p/193/1512014252006.png">
        </div>
        <div class="desc" v-html="data.content"></div>
        <div class="button orange" v-if="data.reward_type == '1'" @click="closeEventPop()">知道了</div>
        <div class="button blue" v-if="data.reward_type == '2'" @click="closeEventPop()">知道了</div>
        <div class="button green" v-if="data.reward_type == '3'" @click="closeEventPop()">知道了</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "event-modal",
    components: {},
    props:{
      eventData:{
        type: Array,
        default:()=>[]
      }
    },
    data() {
      return {
        data:[]
      }
    },
    mounted() {
      this.data = this.eventData[0];
    },
    methods: {
      closeEventPop(){
        this.$store.commit('modules/event/removeEventPop');
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  /** 随机事件弹窗 **/
  .post-event-pops {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(0, 0, 0, .7);


    .form {
      width: 326px;
      /*height: 500px;*/
      background-color: #fff;
      border-radius: 8px;
      top: 50%;
      left: 50%;
      margin-left: -163px;
      margin-top: -250px;
      position: fixed;
      z-index: 101;
      overflow: hidden;

      .head {
        text-align: center;
        position: relative;
        padding: 24px 0 18px 0;

        .title{
          font-size:18px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:rgba(45,47,51,1);
          line-height:26px;
        }

        .sign_close{
          width: 16px;
          height: 16px;
          line-height: 32px;
          color: #D2D4D9;
          /*background-color: #0D8DFC;*/
          position: absolute;
          right: 14px;
          top: 4px;
        }
      }

      .wrap {
        box-sizing: border-box;
        padding: 0px 27px;
        text-align center;

        @-webkit-keyframes rotation{
          from {
            -webkit-transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(360deg);
          }
        }


        .pop-img{
          width:272px;
          height:192px;
          display block;
          overflow hidden;
          position: relative

          .img-bg{
            position: absolute;
            left: 50%;
            margin-left: -183px;
            top: 50%;
            margin-top: -183px;
            -webkit-transform: rotate(360deg);
            animation: rotation 3s linear infinite;
            -moz-animation: rotation 3s linear infinite;
            -webkit-animation: rotation 3s linear infinite;
            -o-animation: rotation 3s linear infinite;
          }
          .img-icon{
            width: 90px;
            position: absolute;
            z-index: 1;
            height: 90px;
            top: 50%;
            margin-top: -45px;
            left: 50%;
            margin-left: -45px;
          }

          //img{
          //    -webkit-transform: rotate(360deg);
          //    animation: rotation 3s linear infinite;
          //    -moz-animation: rotation 3s linear infinite;
          //    -webkit-animation: rotation 3s linear infinite;
          //    -o-animation: rotation 3s linear infinite;
          //}
        }

        .desc{
          margin-top:15px;
          font-size:14px;
          font-family:PingFangSC-Regular, "Microsoft YaHei";
          font-weight:400;
          color:rgba(45,47,51,1);
          line-height:26px;


          font{
            font-family:PingFangSC-Semibold, "Microsoft YaHei";
            font-weight:600;
          }

          font *{
            color inherit!important;
          }

        }




        .button{
          width:275px;
          height:36px;
          margin: 24px auto 20px auto;
          background:#676767;
          border-radius:100px;
          font-size:14px;
          font-family:PingFangSC-Medium, "Microsoft YaHei";
          font-weight:500;
          color:#FFFFFF;
          line-height:36px;
          cursor pointer;
        }
        .button.orange{
          background:#FF8863;
        }
        .button.blue{
          background:#0D8DFC;
        }
        .button.green{
          background:#A4E673;
        }
      }

    }

  }

</style>
