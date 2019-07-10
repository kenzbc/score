<template>
  <!--阿里滑块弹出框-->
  <div class="slide-pops" v-if="show">
    <div class="form">
      <div class="head">
        <span class="title">滑动验证</span>
        <a href="javascript:" class="sign_close" @click="closeVerifyModal();">
          <i class="iconfont icon-iconx"></i>
        </a>
      </div>
      <div class="wrap">
        <no-captcha :width="320" :height="40" :isReset="isResetCaptcha" @captchaCallback="captchaCallback($event)"></no-captcha>
        <div class="mt10">拖动滑块完成验证！</div>
      </div>

    </div>
  </div>
</template>

<script>
  import NoCaptcha from "./no-captcha";
  export default {
    name: "verify-modal",
    components: {NoCaptcha},
    props:{
      show:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        isResetCaptcha:false,
      }
    },
    mounted() {

    },
    methods: {
      /**
       * 阿里滑块验证callback
       * @param e
       */
      captchaCallback(e){
        this.csessionid = e.csessionid;
        this.token = e.token;
        this.scene = e.scene;
        this.sig = e.sig;

        this.loginSubmit();
      },
      closeVerifyModal(){
        this.$emit('closeVerifyModal',true);
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .slide-pops {
    display: block;
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
        padding: 0px;
        text-align center;
        height 100px;

        @-webkit-keyframes rotation{
          from {
            -webkit-transform: rotate(0deg);
          }
          to {
            -webkit-transform: rotate(360deg);
          }
        }

      }
    }
  }

</style>
