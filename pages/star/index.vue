<template>
  <div>
    <star-header :starInfo="starInfo" :more-nav="moreNav"></star-header>
    <div class="star-main pc">
      <star-left :data="starInfo"></star-left>

      <div class="score-star-home">
        <star-banner :list="bannerList"></star-banner>

        <div class="star-homepage-wrap">
          <h4 class="star_homepage_title">
            <a href="javascript:" data-type="2" :class="{'active' : listCategory == 'cms'}" @click="changeCategory('cms')">资讯
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-circle_blue"></use>
              </svg>
            </a>
            <a href="javascript:" data-type="3" :class="{'active' : listCategory == 'dynamic'}" @click="changeCategory('dynamic')">动态
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-circle_blue"></use>
              </svg>
            </a>
            <a href="javascript:" data-type="5" :class="{'active' : listCategory == 'qa'}" @click="changeCategory('qa')">问答
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-circle_blue"></use>
              </svg>
            </a>
            <a href="javascript:" data-type="6" :class="{'active' : listCategory == 'hot'}" @click="changeCategory('hot')">24h热帖
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-circle_blue"></use>
              </svg>
            </a>
            <a href="javascript:" data-type="0" v-if="starInfo.is_navigation_video == '1'"
               :class="{'active' : listCategory == 'video'}" @click="changeCategory('video')">视频
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-circle_blue"></use>
              </svg>
            </a>
          </h4>
          <!--资讯-->
          <star-main-cms
            v-if="listCategory == 'cms'"
            :star-id="starInfo.id"
            :list="cmsList"></star-main-cms>

          <!--帖子-->
          <star-main-dynamic
            v-if="listCategory == 'dynamic'"
            :star-id="starInfo.id"
            :list="dynamicList"></star-main-dynamic>

          <!--问答-->
          <star-main-qa
            v-if="listCategory == 'qa'"
            :star-id="starInfo.id"
            :list="qaList"></star-main-qa>

          <!--热帖-->
          <star-main-hot-dynamic
            v-if="listCategory == 'hot'"
            :circle-id="starInfo.circle_id"
            :list="hotDynamicList"></star-main-hot-dynamic>

          <!--视频-->
          <star-main-video
            v-if="listCategory == 'video'"
            :star-id="starInfo.id"
            :list="videoList"></star-main-video>
        </div>
      </div>

      <star-right :data="starInfo"></star-right>

    </div>

    <!--Mobile-->
    <div class="star-main-mobile" style="display:none;">
      <div class="header-nav">
        <a href="#" class="nav-item active"><i class="iconfont icon-shouye"></i><em></em></a>
        <a href="#" class="nav-item"><i class="iconfont icon-new"></i><em></em></a>
        <a href="#" class="nav-item"><i class="iconfont icon-shipin"></i><em></em></a>
        <a href="#" class="nav-item"><i class="iconfont icon-fensi1"></i><em></em></a>
      </div>

      <div class="banner-slide">
        <star-banner :mobile="true" :list="bannerList"></star-banner>
      </div>

      <div class="panel-info">
        <div class="ranking">
          <i class="iconfont icon-fensi"></i>
          <p>排行榜</p>
        </div>
        <div class="sign-info">
          <span class="rank">{{starInfo.is_sign == '0' ? '今天还未签到' : '今天已签到'}}</span>
          <span class="score">共{{starInfo.today_total_num}}人签到</span>
        </div>
        <div class="sign-btn">签到</div>
      </div>
      <div class="link-item">
        <a class="link" v-if="starInfo.is_toolbar_qa == '1'" :href="'/c/'+starInfo.qa_circle_id">
          <img :src="starInfo.toolbar_qa_image+'?x-oss-process=image/resize,m_fill,h_44,w_44'" width="22" height="22">
          <span>问答</span>
        </a>
        <a class="link" href="/bet_list" target="_blank">
          <img :src="starInfo.toolbar_bet_image+'?x-oss-process=image/resize,m_fill,h_44,w_44'" width="22" height="22">
          <span>菠菜</span>
        </a>
        <a class="link" :href="'/c/'+starInfo.circle_id" target="_blank">
          <img :src="starInfo.toolbar_circle_image+'?x-oss-process=image/resize,m_fill,h_44,w_44'" width="22" height="22">
          <span>圈子</span>
        </a>
        <nuxt-link class="link" :to="'/star/lineup?star_id='+starInfo.id">
          <img :src="starInfo.toolbar_broadcast_image+'?x-oss-process=image/resize,m_fill,h_44,w_44'" width="22" height="22">
          <span>阵容</span>
        </nuxt-link>
        <nuxt-link class="link" :to="'/star/trip?star_id='+starInfo.id">
          <img :src="starInfo.toolbar_trip_image+'?x-oss-process=image/resize,m_fill,h_44,w_44'" width="22" height="22">
          <span>行程</span>
        </nuxt-link>
        <a class="link" :href="starInfo.star_shop" target="_blank">
          <img :src="starInfo.toolbar_shop_image+'?x-oss-process=image/resize,m_fill,h_44,w_44'" width="22" height="22">
          <span>旗舰店</span>
        </a>
      </div>

      <div class="article-list">
        <div class="title-box">
          <span>
            <i class="orange-line"></i>
            <span class="stitle">资讯</span>
          </span>
          <a href="/star_h5_news?star_id=21" class="flr">更多<i class="iconfont icon-icon4 flr"></i></a>
        </div>
        <div class="article-list-box">
          <section class="list-item" v-for="item in cmsList">
            <div class="info">
              <a :href="'/p/'+item.object_id" class="title">{{item.title}}</a>
              <div class="author-info">
                <span>{{item.nickname}}</span>
                <span class="flr">{{item.view_count}} 阅</span>
              </div>
            </div>
            <a :href="'/p/'+item.object_id" class="news-img" style="max-height:81.25px;">
              <img :src="item.picture_list.length>0 ? item.picture_list[0] : '/static/images/img_null.png'" width="100%">
            </a>
          </section>
        </div>
      </div>



    </div>
  </div>
</template>

<script>
  import StarHeader from "../../components/star/star-header";
  import StarLeft from "../../components/star/star-left";
  import StarRight from "../../components/star/star-right";
  import StarBanner from "../../components/star/star-banner";
  import StarMainCms from "../../components/star/star-main-cms";
  import StarMainDynamic from "../../components/star/star-main-dynamic";
  import StarMainHotDynamic from "../../components/star/star-main-hot-dynamic";
  import StarMainVideo from "../../components/star/star-main-video";
  import StarMainQa from "../../components/star/star-main-qa";
  export default {
    name: "star",
    layout: 'layout-simple',
    components: {
      StarMainQa,
      StarMainVideo,
      StarMainHotDynamic,
      StarMainDynamic,
      StarMainCms,
      StarBanner,
      StarRight,
      StarLeft,
      StarHeader
    },
    data() {
      return {
        listCategory:'cms',

        starInfo: {},
        moreNav: '',
        bannerList: [],
        cmsList: [],
        qaList: [],
        videoList: [],

        dynamicList: [],
        hotDynamicList: []
      }
    },
    async asyncData({app, $axios, error, params, query, route}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。

      let dynamicParams = {
        star_id: query.star_id,
        limit: 20,
        page: 1
      };

      let [starInfo, dynamic] = await Promise.all([
        app.$api.star.getStarInfo({params:dynamicParams}),
        app.$api.star.getDynamicList({params:dynamicParams})
      ]);


      let moreNav = [];
      if(starInfo.data.link_list[3]){
        moreNav = moreNav[3];
      }

      return {
        starInfo: starInfo.data,
        moreNav: moreNav,
        bannerList: starInfo.data.carousel_list,
        cmsList: starInfo.data.cms_list,
        qaList: starInfo.data.qa_list,
        videoList: starInfo.data.video_list,

        dynamicList: dynamic.data.list
      }

    },
    watch:{
      $route() {
        this.getInitData();
      }
    },
    mounted() {

    },
    methods: {
      async getInitData(){

        let dynamicParams = {
          star_id: this.$route.query.star_id,
          limit: 20,
          page: 1
        };

        let [starInfo, dynamic] = await Promise.all([
          this.$api.star.getStarInfo({params:dynamicParams}),
          this.$api.star.getDynamicList({params:dynamicParams})
        ]);


        let moreNav = [];
        if(starInfo.data.link_list[3]){
          moreNav = moreNav[3];
        }

        this.starInfo = starInfo.data;
        this.moreNa = moreNav;
        this.bannerList = starInfo.data.carousel_list;
        this.cmsList = starInfo.data.cms_list;
        this.qaList = starInfo.data.qa_list;
        this.videoList = starInfo.data.video_list;
        this.dynamicList = dynamic.data.list;

      },
      //更改分类
      changeCategory(tab){
        this.listCategory = tab;
        if(tab == 'hot'){
          this.$api.dynamic.circleHotDynamicList({params:{circle_id: this.starInfo.circle_id}}).then((res)=>{
            this.hotDynamicList = res.data.list;
          })
        }
      },
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .star-main{
    min-height 600px;
    max-width: 1240px;
    width: 100%;
    padding-top: 118px;
    margin: 0 auto 20px auto;
    display: flex;
    justify-content: space-between;

    .score-star-home {
      max-width: 640px;
      width: 100%;
      float: left;
      margin: 0 20px;
    }

    .star-homepage-wrap{
      width: 100%;
      background: #FFFFFF;
      box-shadow: 0 0 0 1px #EBEBED;
      border-radius: 2px;
      padding-bottom: 15px;

      .star_homepage_title {
        line-height: 40px;
        border-bottom: 1px solid #F0F1F2;
        margin: 0 20px;

        a {
          font-weight: normal;
          font-size: 16px;
          color: #656973;
          margin-right: 40px;

          .icon {
            display: none;
          }

          &.active {
            font-weight: 700;
            color: #2D2F33;
            position: relative;

            .icon {
              display: block;
              width: 12px;
              height: 12px;
              color: #0d8dfc;
              position: absolute;
              right: -10px;
              top: 0px;
            }
          }
        }
      }
    }

  }

  .star-main-mobile{

    .header-nav{
      height 34px;
      background #fff;
      display flex;
      justify-content space-around;
      align-items center;

      .nav-item{

        &.active{
          color:#fddc00;
          position relative;

          em {
            position: absolute;
            width: 18px;
            height: 3px;
            bottom: -10px;
            left: 50%;
            background-color: #fddc00;
            transform: translateX(-50%);
          }
        }
      }
    }


    .banner-slide{}

    .panel-info{
      background #fff;
      border-bottom: 1px solid #f5f5f5;
      padding: 2% 3%;
      position: relative;
      display flex;
      align-items center;

      .ranking{
        width: 20%;
        text-align: center;
        font-size: 0.8rem;
        margin-right: 4%;

        i{
          color: #f7ca17;
        }
        p{
          line-height: 1.4rem;
        }
      }
      .sign-info{
        line-height: 1.4rem;
        color: #999;

        span{
          line-height: 21px;
          display: block;
        }
      }
      .sign-btn{
        display: block;
        line-height: 1.6rem;
        color: #333;
        border: 1px solid #606060;
        padding: 0 5%;
        border-radius: 1rem;
        position: absolute;
        top: 50%;
        right: 3%;
        transform: translateY(-50%);

        &.active{
          color: #fff;
          background: #0d8dfc;
          border: 1px solid #0d8dfc;
        }
      }


    }


    .link-item{
      background #fff;
      border-bottom: 1px solid #f5f5f5;
      padding: 2% 3%;
      position: relative;
      display flex;
      align-items center;
      justify-content space-around

      .link{
        text-align center;

        span{
          margin-top 4px;
          display block;
        }
      }

    }

    .article-list{
      margin-top:10px;
      background #fff;

      .title-box{
        line-height: 2.4rem;
        border-bottom: 1px solid #f5f5f5;
        padding: 0 3%;
        display flex;
        justify-content space-between;
        align-items center;

        .stitle{
          display: inline-block;
        }
        .orange-line{
          width: 5px;
          height: 1rem;
          display: inline-block;
          vertical-align: middle;
          background-color: #ff520e;
        }




      }

      .article-list-box{

        .list-item{
          display flex;
          justify-content space-between;
          border-bottom: 1px solid #f5f5f5;
          padding: 3%;

          .info{
            width: 64%;

            .title{
              display: inline-block;
              height: 3.6rem;
              line-height: 1.8rem;
              font-size: 1rem;
              overflow: hidden;
              margin-top: -0.3rem;
              margin-bottom: 0.4rem;
            }
            .author-info{
              font-size: 0.6rem;
              color: #999999;
              margin: 0;
              display flex;
              justify-content space-between;
              align-items center;
            }
          }

          .news-img{
            display: block;
            width: 32%;
            overflow: hidden;

            img{
              box-sizing: border-box;
              vertical-align: middle;
              border: 0;
            }
          }
        }
      }
    }
  }


  @media all and (max-width:768px){

    .star-main{
      width 100%;
      display: block;

      .score-star-left{
        width 100%;
      }
      .score_star_right{
        display none;
      }

      .score-star-home{
        margin: 0;

        .star-homepage-wrap{

          .star_homepage_title{
            display: flex;
            flex-shrink: 0;
            justify-content: space-between;

            a{
              flex-shrink: 0;
              margin-right initial;
            }
          }
        }


      }
    }

  }
</style>
