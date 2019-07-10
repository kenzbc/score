<template>

  <div class="err-page">
    <div class="box-main" v-if="error.statusCode === 404">
      <!--404内容-->
      <div class="err_main">
        <img src="/static/images/error/pic404.jpg"><br><br>
        <div class="title" style="margin-top:20px;">
          抱歉！内容未找到或页面无法访问 …<br>
        </div>
        <a href="/" class="button active" style="margin-top:20px;">点击返回首页</a>

        <div class="sub-desc">
          请确保浏览器的地址栏中显示的网站地址的拼写和格式正确无误，<br> 如果通过单击链接而到达了该网页，可能页面已删除，活动已下线等。
        </div>
      </div>
      <!--404内容-->
    </div>
    <div class="box-main" v-if="error.statusCode === 500">
      <!--500内容-->
      <div class="err_main">
        <img src="/static/images/error/pic404.jpg"><br><br>
        <div class="title" style="margin-top:20px;">
          500 抱歉！服务器累晕了，请您稍后再试~<br>
        </div>
        <a href="/" class="button active" style="margin-top:20px;">点击返回首页</a>

        <div class="sub-desc">
          服务器暂时无法处理您的请求~<br> 如果您一直出现此问题，请联系网站管理员。
        </div>
      </div>
      <!--500内容-->

    </div>
  </div>

</template>


<script>

  export default {
    layout: 'layout-topic',
    name: "error-404",
    components: {
    },
    props: [
      'error'
    ],
    data() {
      return {
        msg:'未找到对应的页面!'
      }
    },
    async asyncData({app, route})
    {

      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
      /*
      let res = await ({
        method: 'get',
        url: `/apiUrl.do?id=parameters`
      })
      return {
        dataList:res.data.list,
      }
      */
    },
    fetch() {
      // 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。
    },
    head: {

    },
    mounted() {
      let _this = this;
      // setTimeout(function () {
      //   _this.delayURL('https://www.famulei.com');
      // },500)

    },
    methods: {
      delayURL(url) {
        let _this = this;
        var delay = document.getElementById("time").innerHTML;
        if (delay > 0) {
          delay--;
          document.getElementById("time").innerHTML = delay
        } else {
          window.top.location.href = url
        }
        setTimeout(function () {
          _this.delayURL('/');
        }, 1000)
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .button{
    display inline-block;
    text-align: center;
    border: 1px solid #0d8dfc;
    border-radius: 16px;
    margin: 0 auto;
    font-size: 13px;
    color: #0d8dfc;
    cursor: pointer;
    transition: background 0.3s;
    padding: 4px 10px;

    &.active{
      background: #0d8dfc;
      color: #fff;
    }
  }

  .box-main{
    text-align center;
    padding-top: 100px;
    padding-bottom 90px;
    background #fff;

    .title{
      font-size:22px;
      line-height 1.5
    }
    .sub-desc{
      max-width 450px;
      margin:0 auto;
      margin-top 50px;
      font-size: 14px;
      color: #999;
      line-height: 25px;
    }


    .err-code{
      font-size:50px;
    }
  }


</style>
