<template>
  <!--分享动态弹出框-->
  <Modal :value="show" width="360" class="share-modal" @on-visible-change="getFaultModalStatusChange">
    <p slot="header" style="font-size:16px;text-align:center">
      <span>分享</span>
    </p>
    <div class="">
      <div class="share-icon">
        <i class="iconfont icon-wechat1" @click="share('wechat')"></i>
        <i class="iconfont icon-weibo1" @click="share('weibo')"></i>
        <i class="iconfont icon-qq1" @click="share('qq')"></i>
        <i class="iconfont icon-score" v-if="isRelayScore" @click="share('score')"></i>
      </div>
      <input type="text" :value="baseURL+shareUrl" class="score_share_input gray_2">
    </div>
    <div slot="footer" style="text-align: center;">
      <div class="circle-btn-blue score_pop_btn share-btn-act" @click="copyUrl()">复制链接</div>
    </div>
  </Modal>
</template>

<script>
  import Clipboard from 'clipboard'
  export default {
    name: "share-modal",
    components: {},
    props:{
      show:{
        type: Boolean,
        default: false
      },
      isRelayScore:{
        type: Boolean,
        default: false
      },
      shareUrl:{
        type: String,
        default: ''
      }
    },
    data() {
      return {
        baseURL:'https://www.famulei.com',
      }
    },
    mounted() {

    },
    methods: {
      //菠菜投注弹层隐藏状态更改
      getFaultModalStatusChange(e){
        // console.log(e)
        this.$emit('setShareModalShow',e);
      },
      //分享动作
      share(action){
        if(action == 'score'){
          this.$emit('shareRelay',true);
        }
      },
      //复制链接到剪贴板
      copyUrl(){
        let _this = this;
        let clipboard = new Clipboard('.share-btn-act', {
          text: function() {
            return window.location.href;
          }
        });
        clipboard.on('success', function(e) {
          _this.$Message.success("复制成功");
        });
        clipboard.on('error', function(e) {
          console.log(`复制失败，${e}`);
          _this.$Message.error("复制失败！");
        });
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>

  .share-modal{
    text-align: center;
    margin-bottom: 15px;

    .share-icon{
      display flex;
      justify-content space-evenly
      align-items center;
    }

    .iconfont{
      cursor pointer;
    }

    .icon-wechat1 {
      font-size:34px;
      color #3ac536;
    }
    .icon-weibo1 {
      font-size:34px;
      color #ff515e;
    }
    .icon-qq1 {
      font-size:34px;
      color #0f83fb;
    }
    .icon-score {
      font-size:34px;
      color #0f83fb;
    }
    .guanwang-bg {
      margin-left: 20px;
      padding-left: 0;
      width: 36px;
      height: 36px;
      margin-right: 0;
      background: url(/images/index/score_icon.png) no-repeat;
      background-size: 100% 100%;
    }


    .score_share_input {
      width: 230px;
      line-height: 36px;
      border: 1px solid #f0f1f2;
      border-radius: 4px;
      padding: 0 10px;
    }
    .score_pop_btn {
      overflow: hidden;
      text-align: center;
    }

  }


</style>
