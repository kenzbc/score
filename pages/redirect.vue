<template>
  <div class="dialog-wrap">
    <div class="tickets_wrap score_pop_wrap">
      <div class="content">
        <p>正在离开 Score，前往</p>
        <p class="img">
          <img :src="params.logo" alt="">
          <span class="name">{{decodeURI(params.name)}}</span>
        </p>

      </div>
      <div class="btn" @click="openLink(params.url)">点击跳转</div>
      <p class="time">自动跳转中 {{refresh_time}}s</p>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    components: {},
    data() {
      return {
        show:true,
        refresh_time: 5,
        t: '', // 定时器,

        params:{
          name:'赛高',
          logo:'https://img1.famulei.com/common/images/share_score.png',
          url:'/'
        }
      }
    },
    head() {
      return {
        title: "正在跳转..."
      }
    },
    async asyncData() {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
    },
    filters: {},
    mounted() {
      this.params = this.getRequest();
      console.log(this.params);
      this.countDown(this.refresh_time);
    },
    watch: {},
    methods: {
      // 定时器
      countDown(Time) {
        var _this = this;
        if (Time >= 0) {
          _this.refresh_time = Time --;
          _this.t = setTimeout(function () {
            // 判断是否刷新
            _this.countDown(Time);
          }, 1000);
        } else {
          _this.openLink(_this.params.url);
        }
      },
      openLink(url){
        // 清除定时器
        clearTimeout(this.t);
        // 跳转地址
        window.location.href = url;
      },





      getRequest() {
        //var url = window.location.search; //获取url中"?"符后的字串
        var thisUrl = document.location.toString();
        var arrUrl = thisUrl.split("?");
        var url = '?'+arrUrl[1];

        var theRequest = new Object();
        if (url.indexOf("?") != -1) {
          var str = url.substr(1);
          var strs = str.split("&");
          for(var i = 0; i < strs.length; i ++) {
            theRequest[strs[i].split("=")[0]]=unescape(strs[i].split("=")[1]);
          }
        }
        return theRequest;
      },
    },
    beforeDestroy(){
      // 清除定时器
      clearTimeout(this.t);
      this.refresh_time = 5;
    }
  }
</script>

<style lang="stylus" scoped>
  .page-redirect{
    background #fff;
  }
  .dialog-wrap {
    width 100%;
    height: 100%;
    min-height 500px;
    display flex;
    justify-content center;
    align-items center

    .tickets_wrap {
      width: 360px;
      overflow: hidden;
      padding 30px 60px 20px

      &.score_pop_wrap {
        background: #FFFFFF;
      }

      .content {
        text-align center

        p {
          font-size 16px
          color #2D2F33;
          display flex;
          justify-content center;
          align-items center;

          &.img {
            margin 18px auto 30px

            img {
              display inline-block
              max-width 100px;
              max-height 40px
            }
          }

          .name{
            margin-left:6px;
            display inline-block;
            max-width:250px;
            font-size:28px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
      .btn {
        width 100%
        text-align center
        font-size 16px
        color #fff
        border-radius 24px
        line-height 36px
        background #0D8DFC
        cursor pointer

        &:hover{

        }
      }

      .time {
        color #A8ABB3
        text-align center
        line-height 20px
        margin-top 12px
      }
    }
  }

</style>
