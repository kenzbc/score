<template>
  <div class="share-wrap">
    <div class="close-btn" @click="modalClose()"><i class="iconfont icon-quxiao"></i></div>
    <h3 class="share-title">分享</h3>
    <ul class="share-list">
      <li data-cmd="weixin" class="s-btn wechat"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-wechat1"></use></svg></li>
      <li data-cmd="weibo" class="s-btn weibo"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-weibo1"></use></svg></li>
      <li data-cmd="qzone" class="s-btn qzone"><svg class="icon" aria-hidden="true"><use xlink:href="#icon-qq1"></use></svg></li>
      <li class="s-btn forward-button-btn score"><img src="~/static/static/images/score_icon.png" alt="" /></li>
    </ul>
    <input type="text" :value="postLink" class="share-input" id="" disabled="false">
    <div class="btn-wrap cl">
      <div class="score-btn copy fll" id="share_copy" @click="copyLink()">复制链接</div>
      <div class="score-btn cancel flr" @click="modalClose()">取消</div>
    </div>
  </div>
</template>

<script>

  export default {
    data() {
      return {
        host: 'https://www.famulei.com/p/'
      }
    },
    props: {
      dynamicId: String
    },
    computed: {
      postLink() {
        return this.host + this.dynamicId
      }
    },
    mounted() {
//      console.log(this.toolbarData)
    },
    methods: {
      // 复制链接
      copyLink() {
        console.log('复制链接')
        this.$emit('update:maskShow', false)
      },
      // 取消分享
      modalClose() {
        console.log('关闭分享')
        this.$emit('update:maskShow', false)
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .share-wrap {
    /*display: none;*/
    padding: 15px 30px;
    position fixed
    z-index 120
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    background #fff
    box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px 0 rgba(0,0,0,0.08);
    border-radius 4px
    .close-btn {
      width 22px
      height: 22px
      text-align center
      cursor pointer
      color: #0D8DFC;
      position: absolute;
      right: 5px;
      top: 5px;
    }
    .share-title {
      line-height: 40px;
      font-size: 16px;
      text-align: center;
      margin-bottom: 10px;
      font-weight 400
    }
    .share-list {
      text-align: center;
      margin-bottom: 15px;
      .s-btn {
        display: inline-block;
        width: 36px;
        height: 36px;
        margin 0;
        padding 0;
        line-height normal;
        cursor pointer
        + .s-btn {
          margin-left 18px
        }
        .icon, img {
          display block
          width: 100%
          height: 100%
        }
      }
    }
    .share-input {
      width: 230px;
      line-height: 36px;
      border: 1px solid #f0f1f2;
      border-radius: 4px;
      padding: 0 10px;
      color: #656973
      background #fff
    }
    .btn-wrap {
      width 100%
      padding-top 12px
      text-align center
      .score-btn {
        width: 110px;
        line-height: 34px;
        text-align: center;
        border-radius: 20px;
        cursor pointer
        &.copy {
          color: #fff;
          background: #0d8dfc;
          border: 1px solid #0d8dfc;
        }
        &.cancel {
          color: #656973;
          border: 1px solid #ebebed;
        }
      }
    }
  }

  @media screen and (max-width: 1200px) {

  }

  @media screen and (max-width: 768px) {

  }

  @media screen and (max-width: 600px) {

  }
</style>
