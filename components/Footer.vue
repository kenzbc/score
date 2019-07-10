<template>
  <div>
    <footer class="footer" v-if="$store.state.modules.device.type == 'pc'">
      <div class="footer-content">
        <div class="copy">
          <a href="/index" target="_blank" class="footer_logo fll"><img src="https://www.famulei.com//images/index/score_logo.png" width="100%"></a>
          <div class="footer_info flr">
            <p class="footer_info_1">
              <a href="/about" target="_blank">关于Score</a><span>|</span>
              <a href="/join" target="_blank">入驻Score</a><span>|</span>
              <a href="//www.lagou.com/gongsi/40579.html" target="_blank">加入我们</a><span>|</span>
              <a href="/contact" target="_blank">媒体合作</a><span>|</span>
              <a href="/privacy" target="_blank">隐私协议</a><span>|</span>
              <a href="//img1.famulei.com/download/index.html" target="_blank" class="footer_download">App下载<span class="footer_download_span">NEW</span></a>
            </p>
            <p class="footer_info_2">
              <span>反馈建议：kf@famulei.com</span>
              <span>工作时间：周一至周五10:00-19:00</span>
            </p>
            <p class="footer_info_3">
              <span>© {{new Date().getFullYear()}} Famulei.com Score 上海厚翰信息科技有限公司 版权所有 </span>
              <span><a href="http://beian.miit.gov.cn/" rel="nofollow" target="_blank" class="gray_3">沪ICP备14044347号-3号</a></span>
              <span><a target="cyxyv" rel="nofollow" href="https://v.yunaq.com/certificate?domain=www.famulei.com&from=label&code=90030"><img src="https://aqyzmedia.yunaq.com/labels/label_sm_90030.png" width="70"></a></span>
            </p>


          </div>
        </div>
        <div class="qrcode">
          <div class="qrcode_img">
            <img src="/static/images/weixin_qrcode.png">
            <span>Score官方微信</span>
          </div>
          <div class="qrcode_img">
            <img src="/static/images/twocode.png">
            <span>扫码下载APP</span>
          </div>
        </div>
      </div>
    </footer>


    <div class="mobile-footer-download" v-else>
      <div class="footer-download-wrap">
        <div class="mobile_header-down-left fll"><img src="/static/images/header/score.png" alt=""></div>
        <div class="mobile_header-down-right flr"><p>下载App</p></div>
        <div class="mobile_header-down-middle flr">
          <a class="link-App-url" onclick="weixinShow()" href="famulei://">打开App</a>
        </div>
      </div>
    </div>

  </div>
</template>
<script>
  export default {
    data() {
      return {
      }
    },
    methods: {
      init() {
      }
    },
    created() {
      this.init();
    },
    mounted() {
      //判断安卓或者IOS
      if (/(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent)) { //判断iPhone|iPad|iPod|iOS
        this.$store.commit('modules/device/setType', 'ios');
      } else if (/(Android)/i.test(navigator.userAgent)) {  //判断Android
        this.$store.commit('modules/device/setType', 'android');
      }else {
        this.$store.commit('modules/device/setType', 'pc');
      }
    },
    components: {}
  }
</script>
<style lang="stylus" scoped>
  .footer {
    width: 100%;
    margin: 0 auto;
    background-color: #fff;
    padding: 80px 0;
    position: absolute;
    left: 0;
    bottom: 0;

    .footer-content{
      width: 100%;
      max-width: 1240px;
      margin: 0 auto;
      display: flex;
      justify-content: space-between;

      .copy {
        float: left;
        display: flex;
      }
    }

  }




  .footer_logo {
    display: block;
    margin-right: 20px;

    img {
      width: 100px;
      height: 100px;
      border: 1px solid #ebebed;
      border-radius: 20px;
    }
  }

  .footer_info {
    padding-top: 12px;

    p {
      line-height: 22px;
      font-size: 12px;
    }
  }

  .footer_info_1 {
    font-size: 14px;
    margin-bottom: 10px;
    color: #656973;

    span {
      display: inline-block;
      margin: 0 10px;

      &.footer_download_span {
        line-height: 18px;
        font-size: 10px;
        color: #fff;
        background-color: #ff3333;
        padding: 0 2px;
        border-radius: 4px;
        position: relative;
      }
    }
  }


  .mobile-footer-download{
    display: none
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0,0,0,0.06);
    width: 100%;

    .footer-download-wrap {
      width: 100%;
      height: 60px;
      background: #fff;
      background-image: url(/static/images/header/scorebg.png);
      background-size: cover;
      background-repeat: no-repeat;
      background-position: center;

      .link-App-url {
        display: block;
        color: #fff;
      }

      .mobile_header-down-left {
        margin-left: 10px;
        margin-top: 11px;

        img {
          height: 38px;
        }
      }
      .mobile_header-down-right {
        margin-right: 10px;

        p{
          margin-top: 15px;
          background: transparent;
          border: 1px solid #fff;
          border-radius: 15px;
          width: 76px;
          text-align: center;
          font-size: 12px;
          color: #fff;
          padding: 8px 0;
          font-family: Helvetica Neue, Helvetica, Roboto, Segoe UI, Arial, sans-serif;
        }
      }
      .mobile_header-down-middle {
        margin-right: 12px;
        margin-top: 15px;
        background: transparent;
        border: 1px solid #fff;
        border-radius: 15px;
        width: 76px;
        text-align: center;
        font-size: 12px;
        padding: 8px 0;
        font-family: Helvetica Neue, Helvetica, Roboto, Segoe UI, Arial, sans-serif;
      }
    }

  }

  .footer_info_2 span, .footer_info_3 span {
    color: #A8ABB3;
  }

  .footer_info_2 span, .footer_info_3 span {
    display: inline-block;
    margin-right: 12px;
  }

  .qrcode {
    display: flex;

    img {
      display: block;
      width: 80px;
    }

    .qrcode_img {
      margin-left: 20px;

      span {
        float: right;
        display: inline-block;
        width: 100%;
        text-align: center;
        color: #999;
        font-size: 12px;
      }
    }
  }
</style>
