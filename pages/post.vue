<template>
  <div>
    <header-sub-menus>
      <li><nuxt-link to="/post" class="link active">
          看帖
          <svg class="icon schdule_icon_active" aria-hidden="true">
            <use xlink:href="#icon-circle_blue"></use>
          </svg>
        </nuxt-link></li>
      <li><nuxt-link to="/moment/my" class="link">
        我的圈子
        <svg class="icon schdule_icon_active" aria-hidden="true">
          <use xlink:href="#icon-circle_blue"></use>
        </svg>
      </nuxt-link></li>
      <li><nuxt-link to="/moment" class="link">
        推荐圈子
        <svg class="icon schdule_icon_active" aria-hidden="true">
          <use xlink:href="#icon-circle_blue"></use>
        </svg>
      </nuxt-link></li>
    </header-sub-menus>

    <div class="page-main">
      <div class="wrap_container">
        <div class="post_sub_nav">
          <nuxt-link to="/post" class="fll" :class="{'active' : $route.query.type != 'hot'}">新贴</nuxt-link>
          <nuxt-link to="/post?type=hot" class="fll" :class="{'active' : $route.query.type == 'hot'}">热贴</nuxt-link>
          <nuxt-link to="/follow" class="fll">我的关注</nuxt-link>
        </div>
        <ul class="card_ul">
          <li class="no_hover sort_by" v-if="$route.query.type != 'hot'">
            <div class="card_body post_main_body">
              <p class="fll" :class="{'active':orderBy == 'reply_time'}" @click="orderBy = 'reply_time'">按回复时间排序</p>
              <p class="fll" :class="{'active':orderBy == 'add_time'}" @click="orderBy = 'add_time'">按发布时间排序</p>
            </div>
          </li>

          <!--帖子List Item-->
          <li v-for="item,index in postDataList">
            <div class="card_body post_main_body is_hot">
              <div class="card_left fll" v-if="$route.query.type == 'hot'"><p class="num">59</p><p>参与</p></div>
              <div class="card_text  fll">
                <div class="title-wrap">
                  <p class="title">
                    <a :href="item.link_url" target="_blank">{{item.title}}</a>
                    <svg v-if="item.redPacket_info.length != 0" class="icon" aria-hidden="true"><use xlink:href="#icon-circle__luckymoney"></use></svg>
                    <svg v-if="item.bet_id != '0' && item.bet_group.length != 0&& item.forward_bet_group.legnth != 0" class="icon" aria-hidden="true"><use xlink:href="#icon-circle__bet"></use></svg>
                    <svg v-if="item.type.indexOf('vote') > 0" class="icon" aria-hidden="true"><use xlink:href="#icon-circle__vote"></use></svg>
                    <svg v-if="item.type.indexOf('sound') > 0" class="icon" aria-hidden="true"><use xlink:href="#icon-circle__voice"></use></svg>
                  </p>
                </div>
                <p class="dec">
                  <nuxt-link :to="item.link_url" target="_blank" v-html="item.summary"></nuxt-link>
                </p>
                <div class="info">
                  <label class="avatar">
                    <nuxt-link :to="'/u/'+item.member_id" target="_blank"><img :src="item.avatar ? item.avatar : '/static/images/tx_pic.jpg'" alt=""></nuxt-link>
                  </label>
                  <label class="nickname">
                    <nuxt-link :to="'/u/'+item.member_id" target="_blank">{{item.nickname}}</nuxt-link>
                  </label>
                  <label class="dec">{{item.add_time | tsToaGo}} 来自&nbsp; {{item.web_circle_name}}</label>
                </div>
              </div>
              <div class="card_right flr" v-if="item.picture.length > 0">
                <nuxt-link :to="item.link_url" target="_blank">
                  <img v-for="item in item.picture" :src="item.image_url+'?x-oss-process=image/resize,m_fill,h_64,w_96,limit_0'" alt="">
                  <div class="small_float">
                    <div class="bj"></div>
                    <p>共 {{item.picture.length}} P</p>
                  </div>
                </nuxt-link>
              </div>
            </div>
          </li>
        </ul>



      </div>
      <div class="wrap_right">

        <hot-circle-slide :hotCircleList="hotUserList"></hot-circle-slide>

        <hot-user-slide :hotUserList="hotUserList"></hot-user-slide>

      </div>
    </div>
  </div>

</template>

<script>
  import HotUserSlide from "../components/post/hot-user-slide";
  import HotCircleSlide from "../components/post/hot-circle-slide";
  export default {
    name: "post",
    components: {HotCircleSlide, HotUserSlide},
    data() {
      return {
        page:1,
        limit:20,
        isLoadMoreLock: true, // 是否加载更多锁
        menusTop: 20, // 左侧距离document顶部高度
        orderBy:'reply_time',
        circleRecommendList:[],
        activeUsersList:[],
        postDataList:[],
      }
    },
    filters:{
    },
    async asyncData({app, $axios, error, query}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。

      let postList = [];
      if(query.type == "hot"){
        let [postDataList] = await Promise.all([
          app.$api.dynamic.getPostPageHotList()
        ]);
        postList = postDataList;
      }else{
        let [postDataList] = await Promise.all([
          app.$api.dynamic.getPostPageListData()
        ]);
        postList = postDataList;
      }

      let [postSlide] = await Promise.all([
        app.$api.dynamic.getPostSlideList()
      ]);

      return {
        postDataList: postList.data.list,
        postSlide: postSlide.data.recommend,
        hotUserList: postSlide.data.user,
      }

    },
    watch:{
      //排序状态改变时重新请求数据
      orderBy (newValue, oldValue) {
        if(newValue != oldValue){
          this.getPostList(true);
        }
      },
      $route() {
        this.page = 1;
        this.postDataList = [];
        this.getPostList(true);
      }
    },
    head() {
      // 配置当前页面的 Meta 标签
      return this.$seo(
        `看贴`,
        `明星圈子,互动社区,主播互动`,
        `Score,致力于为电竞玩家提供专业、快速、全面的赛事信息及专业化的数据查询功能，是电竞玩家赛事互动平台。在这里，还可以关注你喜爱电竞选手，为他打CALL`,
        {
          script: [],
          link: []
        }
      );
    },
    mounted() {
      if (process.client) {
        window.addEventListener('scroll', this.winHandleScroll, true)  // 监听（绑定）滚轮滚动事件
      }
    },
    methods: {
      // window滚动事件
      async winHandleScroll(e) {
        //变量scrollTop是滚动条滚动时，距离顶部的距离
        var scrollTop = document.documentElement.scrollTop||document.body.scrollTop;
        //变量windowHeight是可视区的高度
        var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
        //变量scrollHeight是滚动条的总高度
        var scrollHeight = document.documentElement.scrollHeight||document.body.scrollHeight;

        //滚动条到底部的条件
        if(scrollTop+windowHeight==scrollHeight){
          //写后台加载数据的函数
          if (this.isLoadMoreLock) {
            this.isLoadMoreLock = false;
            this.loadMore();
          }
        }

      },
      //获取帖子列表
      async getPostList(isReload){
        console.log('获取帖子列表')
        let params = {
          page: this.page,
          limit: this.limit,
          order: this.orderBy
        };

        let res = {};
        if(this.$route.query.type == "hot"){
          res = await this.$api.dynamic.getPostPageHotList({params});
        }else{
          res = await this.$api.dynamic.getPostPageListData({params});
        }

        if (res.code == '200'){
          if(isReload){
            this.postDataList = res.data.list;
          }else{
            this.postDataList = this.postDataList.concat(res.data.list);
          }
          if(res.data.list.length > 0){
            this.isLoadMoreLock = true;
          }else{
            this.isLoadMoreLock = false;
          }

        }else{
          this.$Message.warning(res.message);
        }
      },
      loadMore(){
        this.page = this.page + 1;
        this.getPostList();
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.winHandleScroll, true);  // 监听（绑定）滚轮滚动事件
    }
  }
</script>

<style lang="stylus" scoped>
  .page-main{
    display: flex
    justify-content space-between
  }
  .wrap_container {
    background: #fff;
    box-shadow: 0 0 0 1px #ebebed;
    border-radius: 2px;
    width: calc(100% - 350px);
    margin-bottom:20px;

    .post_sub_nav {
      line-height: 50px;
      background: #fafafa;
      border-bottom: 1px solid #f5f6f7;
      overflow: hidden;

      a {
        display: block;
        padding: 0 25px;
        font-size: 16px;
        color: #656973;
        letter-spacing: 0;
      }
      a.active {
        font-size: 20px;
        color: #2d2f33;
        letter-spacing: 0;
        font-weight: bold;
      }
    }



    .post_main_body {
      padding: 15px 0;

      .card_left {
        margin: 6px 15px 6px 0;
        width: 60px;
        height: 54px;
        background: #f3f9ff;
        border: 1px solid #d9edff;
        border-radius: 12px;
        padding: 8px 0 6px;

        p {
          width: 100%;
          text-align: center;
          line-hight: 18px;
          font-size: 13px;
          color: #0d8dfc;
        }
        p.num {
          font-weight: bold;
          font-size: 18px;
          line-height: 22px;
        }
      }

      .card_text {
        width: calc(100% - 195px);
        img {
          width: 100%;
        }

        p {
          line-height: 22px;
          height: 22px;
          margin-bottom: 3px;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        p.title {
          font-size: 16px;
          font-weight: bold;
          color: #2d2f33;
          display: inline-block;
          vertical-align: middle;
          max-width: calc(100% - 30px);
        }

        .dec {
          >>> .biaoqing {
            width: 24px;
            vertical-align: middle;
          }
        }

        .info {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          color: #a8abb3;
          display: flex;
          align-items center;

          label {
            font-size: 12px;
            letter-spacing: 0;
            margin-right: 5px;
            color: #a8abb3;

            a {
              color: #a8abb3;
            }

            &.avatar{
              display: inline-block;
              width: 14px;
              height: 14px;
              position: relative;

              a {
                color: #a8abb3;
                display: block;
                width: 14px;
                height: 14px;
                position: absolute;
                top: 0;
                left: 0;
                border-radius: 50%;
                overflow: hidden;

                img {
                  display: block;
                }
              }
            }
          }


        }
      }


      .card_right {
        width: 96px;
        height: 64px;
        border-radius: 4px;
        overflow: hidden;
        position: relative;
        background: #444;

        .small_float {
          position: absolute;
          bottom: 0;
          right: 0;
          border-top-left-radius: 4px;
          width: 48px;
          height: 18px;
          overflow: hidden;

          .bj {
            position: absolute;
            width: 100%;
            height: 100%;
            background: #000;
            opacity: 0.5;
          }
          p {
            position: absolute;
            line-height: 18px;
            width: 48px;
            text-align: center;
            color: #fff;
            z-index: 9;
            font-size: 11px;
          }
        }
      }

    }
    .post_main_body >p {
      background: #f0f1f2;
      border-radius: 8px;
      font-size: 12px;
      color: #656973;
      text-align: center;
      line-height: 26px;
      margin-right: 10px;
      padding: 0 10px;
      cursor: pointer;
    }
    .post_main_body >p.active {
      background: #0d8dfc;
      color: #fff;
    }


    .card_ul {
      padding-bottom: 10px;

      li {
        padding: 0 15px;

        .card_body {
          border-bottom: 1px dotted #f0f1f2;
          overflow: hidden;
        }
      }
    }

  }

  .wrap_right {
    width: 330px;
  }



  @media screen and (max-width: 1200px) {
    .list-box {
      width: 900px;
    }
  }

  @media screen and (max-width: 768px) {
    .page-main {
      padding-top 30px;
    }

    .list-box {
      width: 600px;
    }
  }

  @media screen and (max-width: 600px) {
    .page-main {
      padding-top 0;
    }

    .list-box {
      width: 300px;
    }
  }


</style>
