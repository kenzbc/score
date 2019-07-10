<template>
  <div class="page-about">
    <div class="page-main">
      <div class="global_container about_main">
        <h2 class="about_title">关于Score</h2>
        <p>Score是一款电竞明星和主播图文、语音、视频资讯app。聚焦电竞圈一线红人，第一时间获取游戏资讯。包揽明星动态，关注潮流衣食住行！快来加入我们吧~We are 伐木累！</p>
        <img src="/static/images/about_img.jpg" width="80%">
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    layout: 'layout-topic',
    name: "about",
    components: {},
    data() {
      return {}
    },
    head() {
      return this.$seo(
        `关于Score`,
        ``,
        ``,
        {
          script: [],
          link: []
        }
      );
    },
    async asyncData() {
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
    mounted() {

    },
    methods: {},
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .page-about{
    background-color #fff;
  }
  .about_main{ width:100%; min-height:638px; max-width:892px; padding:0 34px; margin: 0 auto;}
  .about_title{ font-size:36px; color:#fdd000; margin-bottom:24px;}
  .about_main p{ line-height:24px; font-size:14px; color:#999999;}
  .about_main img{ display:block; margin:28px auto 40px auto;}
  @media all and (max-width:768px){
    .about_main{ width:92%; padding:0 4%;}
    .about_title{ font-size:24px; text-align:center; margin-bottom:5%;}
    .about_main{ min-height:530px;}
  }
</style>
