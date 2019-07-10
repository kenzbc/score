<template>
  <div class="page-contact">
    <div class="page-main">
      <div class="global_container contact_main cl">
        <div class="contact_p">
          <h2>联系我们</h2>
          <ul class="contact_left">
            <li>
              <div class="contact_icon"><img src="/static/images/contact/contact_addr.png"></div>
              <div class="contact_xq"><h5>联系地址</h5><p>上海市灵石路695号3号楼2003-2004室</p><p>邮编：200072</p></div>
            </li>
            <li>
              <div class="contact_icon"><img src="/static/images/contact/contact_shwu.png"></div>
              <div class="contact_xq"><h5>商务合作</h5><p>电子邮箱：bd@famulei.com</p></div>
            </li>
            <li>
              <div class="contact_icon"><img src="/static/images/contact/contact_phone.png"></div>
              <div class="contact_xq"><h5>客服联系</h5><p>电子邮箱：kf@famulei.com</p><p>联系电话：021-62522414</p><p>服务时间：周一至周五 10:00~19:00</p></div>
            </li>
            <li>
              <div class="contact_icon"><img src="/static/images/contact/contact_weixin.png"></div>
              <div class="contact_xq"><h5>微信公众号</h5><p>微信号：wearefamulei2015</p><p><img src="/static/images/contact/contact_erweima.jpg" width="85"></p></div>
            </li>
            <li>
              <div class="contact_icon"><img src="/static/images/contact/contact_sina.png"></div>
              <div class="contact_xq"><h5>微博联系</h5><p>搜索“<a href="//weibo.com/famulei2015">Score官方微博</a>”或者“<a href="//weibo.com/u/5727248761">Score广播台</a>”</p></div>
            </li>
          </ul>
        </div>
        <div class="contact_img"><img src="/static/images/contact/contact_ditu.jpg" width="100%"></div>
      </div>
      <!--友情链接-->
      <div class="contact_main link_list">
        <h2>友情链接</h2>
        <div class="f14 textContent c666">
          <p class="pb20">链接要求：游戏类媒体合作前，请先交换友链。<br>链接申请请发送至：pengyw#famulei.com（请将#换成@）</p>
          <ul class="friendLinks cl">
            <li><a href="http://dj.sina.com.cn/" target="_blank" title="新浪电竞">新浪电竞</a></li>
            <li><a href="http://www.ooqiu.com/" target="_blank" title="全球电竞网">全球电竞网</a></li>
            <li><a href="http://games.qq.com/jingji/" target="_blank" title="腾讯游戏频道">腾讯游戏频道</a></li>
            <li><a href="http://www.dianjinghu.com/" target="_blank" title="电竞虎">电竞虎</a></li>
            <li><a href="http://www.cespc.com/" target="_blank" title="竞游网">竞游网</a></li>
            <li><a href="http://www.58game.com/dzjj/article-list-1.html" target="_blank" title="58电竞游戏">58电竞游戏</a></li>
            <li><a href="http://www.gamerbbs.cn/" target="_blank" title="电竞世界">电竞世界</a></li>
            <li><a href="http://lol.766.com/" target="_blank" title="766LOL">766LOL</a></li>
            <li><a href="http://www.766.com/" target="_blank" title="766电竞">766电竞</a></li>
            <li><a href="http://www.gamemei.com/" target="_blank" title="游戏魅">游戏魅</a></li>
            <li><a href="http://ka114.net/" target="_blank" title="万卡园">万卡园</a></li>
            <li><a href="http://kf.2114.com/" target="_blank" title="网页游戏开服表">网页游戏开服表</a></li>
            <li><a href="http://www.duouoo.com/" target="_blank" title="多游网">多游网</a></li>
            <li><a href="http://www.d5game.com/" target="_blank" title="第五游戏网">第五游戏网</a></li>
            <li><a href="http://www.gk99.com/" target="_blank" title="游戏港口">游戏港口</a></li>
            <li><a href="http://www.1688wan.com" target="_blank" title="1688玩">1688玩</a></li>
            <li><a href="http://games.ifeng.com/esports" target="_blank" title="凤凰网游戏">凤凰网游戏</a></li>
            <li><a href="http://www.wanyoucn.com" target="_blank" title="玩游网">玩游网</a></li>
          </ul>
        </div>
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
  .page-contact{
    background-color #fff;
  }

  .contact_main{ width:100%; max-width:926px; padding-left:34px; padding-top:50px; margin: 0 auto;}
  .contact_p{ width:35%; float:left;}
  .contact_p h2,.link_list h2{ font-size:28px; color:#fdd000; margin-bottom:24px;}
  .contact_img{ width:65%; float:right; margin-top:20px;}
  .contact_left{ overflow:hidden;}
  .contact_left li{ width:100%; height:auto; margin-bottom:20px; overflow:hidden;}
  .contact_left .contact_icon{ width:15%; float:left; margin:10px 0; display:inline-block; text-align:center; vertical-align:middle;}
  .contact_left .contact_xq{ width:80%; float:left; font-size:14px; margin:0 0 0 12px;}
  .contact_xq h5{ color:#484848; font-size:14px; margin-top:8px;}
  .contact_xq p{ color:#666; font-size:14px; margin-top:4px;}
  .contact_xq p a{ color:#fdd000;}
  /*友情链接*/
  .pb20 {padding-bottom: 20px;color: #999;font-size: 12px;line-height:25px}

  .friendLinks{margin-right:-80px;padding:5px 0;border-top: 1px solid #f2f2f2;}
  .friendLinks li{float:left;width:100px;margin:5px 20px 0 0;font-size:12px;white-space:nowrap; overflow:hidden; text-overflow:ellipsis}
  .friendLinks li a{color:#666}
  .friendLinks li a:hover{color:#f30}


  @media all and (max-width:768px) {
    .contact_main {
      padding: 0;
    }

    .contact_p {
      width: 80%;
      float: none;
      margin: 0 auto;
    }

    .contact_p h2 {
      text-align: center;
    }

    .contact_img {
      width: 98%;
      float: none;
      margin: 0 auto;
    }
  }

</style>
