<template>
  <div class="match-share" v-if="show">
    <div class="share-tip">复制链接以分享<div class="close-btn" @click="close();"><i class="iconfont icon-quxiao close-icon"></i></div></div>
    <div class="share-url">
      <span class="mid">分享链接：</span>
      <input class="url mid" :value="shareUrl" readonly>
      <button class="copy-btn mid share-btn-act" @click="copyUrl">复制链接</button>
    </div>
  </div>
</template>

<script>
  import Clipboard from 'clipboard'
  export default {
    name: "share-url",
    components: {},
    props:{
      show:{
        type: Boolean,
        default: false
      },
      shareUrl:{
        type: String,
        default: 'https://www.famulei.com'
      }
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {
      copyUrl(){
        var _this = this;
        var clipboard = new Clipboard('.share-btn-act', {
          text: function () {
            return _this.shareUrl;
          }
        });
        clipboard.on('success', function (e) {
          _this.$Message.success('复制成功！');
          _this.close();
        });
        clipboard.on('error', function (e) {
          // console.log(e);
          _this.$Message.error('复制失败，请手动复制！');
        });
      },
      close(){
        this.$emit("update:show",false);
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .match-share {
    position: absolute;
    top: 70px;
    z-index: 89;
    left: calc(50% - 270px);
    width: 540px;
    height: 130px;
    background: #fff;
    border: 1px solid #e7edf1;
    box-shadow: 0 6px 16px 0 rgba(5,17,25,0.08), 0 4px 32px 0 rgba(5,17,25,0.06);
    border-radius: 2px;

    .share-tip {
      width: 100%;
      height: 40px;
      line-height: 36px;
      text-align: justify;
      padding-left: 20px;
      border-bottom: 1px solid #e7edf1;
      font-size: 15px;

      .close-btn {
        width: 39px;
        height: 100%;
        line-height: 39px;
        text-align: center;
        float: right;
        cursor: pointer;

        .close-icon {
          font-size: 14px;
          color: #a5a8b2;
        }
      }
    }


    .share-url {
      height: 88px;
      padding: 26px 0 0 36px;

      .mid {
        display: inline-block;
        vertical-align: middle;
      }
      .url {
        width: 300px;
        height: 36px;
        line-height: 34px;
        background: #fafbfd;
        border: 1px solid #dde4e9;
        border-radius: 4px;
        margin: 0 15px 0 10px;
        padding: 0 15px;
        cursor: text;
      }
      .copy-btn {
        width: 90px;
        height: 36px;
        line-height: 34px;
        background: #565e74;
        color: #fff;
        border: 1px solid #42495b;
        box-shadow: 0 1px 4px 0 rgba(5,17,25,0.06);
        border-radius: 4px;
      }
    }




  }

</style>
