<template>
  <div class="index-wrap" :style="">
    <!--left-->
    <div class="left-slide">
      <div class="ad-item" v-for="item in advertLeft.adverts">
        <a :href="item.object" target="_blank">
          <img :src="item.image_url+'?x-oss-process=image/resize,m_fill,w_230,h_115'">
        </a>
      </div>

      <!--热门赛事-->
      <hot-match :dataList="tournament_list"></hot-match>
      <!--俱乐部官方号-->
      <slide-club :dataList="club_list" :limit="6"></slide-club>
      <!--热门圈子-->
      <hot-moment :dataList="moment_list"></hot-moment>
      <!--名人微博-->
      <hot-weibo :dataList="hotWeiboList"></hot-weibo>
    </div>

    <!--center-->
    <div class="center-content">
      <!--banner-->
      <banner v-if="bannerList && bannerList.length > 0" :dataList="bannerList"></banner>
      <!--讯息-->
      <div class="index_article">
        <!--讯息分类tab-->
        <div class="index_article_nav swiper-container swiper-container-horizontal" id="index_article_nav">
          <div class="swiper-wrapper">
            <div class="swiper-slide swiper-slide-next"
                 v-for="item,index in channelList.slice(0,14)"
                 :class="{ 'active' : index == 0, 'active' : channel_id==item.channel_id}"
                 @click="changeTab(item.channel_id)">
              <span>{{item.channel_name}}<svg class="icon" aria-hidden="true"><use xlink:href="#icon-circle_blue"></use></svg></span>
            </div>
          </div>
          <div class="swiper-button-next"><i class="iconfont icon-general__arrow_right"></i></div>
          <div class="swiper-button-prev"><i class="iconfont icon-general__arrow_left"></i></div>
        </div>
        <!--讯息列表-->
        <ul class="index_article_list" id="index_article_list">
          <!--小图模式-->
          <li class="index_article_1" v-for="item in postList">
            <div class="index_article_border">
              <a :href="item.link_url" target="_blank" class="index_article_pic">
                <img :src="item.picture_list[0]+'?x-oss-process=image/resize,m_fill,h_130,w_195,limit_0'">
              </a>
              <div class="index_article_main">
                <a :href="item.link_url" target="_blank"  class="index_article_main_link">
                  <h2>{{item.title}}</h2>
                  <p class="gray_3">{{item.title}}</p>
                </a>
                <p class="index_article_info">
                  <a :href="'/u/'+item.member_id" class="index_article_info_user">
                    <img :src="item.avatar ? item.avatar : 'https://www.famulei.com/images/index/tx_pic.jpg'"></a>
                  <a :href="'/u/'+item.member_id" class="gray_3">{{item.nickname}}</a>
                </p>
              </div>
            </div>
          </li>

        </ul>


        <div v-if="isMoreBtn">
          <div class="loading-block" v-if="isLoading"><img src="/static/images/score_loading.gif" width="36"></div>
          <a href="javascript:" v-else @click="getMoreInfo()" class="block-more-btn">加载更多</a>

        </div>
      </div>

    </div>

    <!--right-->
    <div class="right-slide">
      <hot-post v-if="hotPostList && hotPostList.length > 0" :dataList="hotPostList"></hot-post>
      <hot-video v-if="videoList && videoList.length > 0" :dataList="videoList"></hot-video>
      <hot-bet v-if="betList && betList.length > 0" :dataList="betList"></hot-bet>
      <hot-comment v-if="superCommentList && superCommentList.length > 0" :dataList="superCommentList"></hot-comment>
    </div>


    <div style="clear:both"></div>
  </div>
</template>

<script>
  import banner from '~/components/index/banner.vue'
  import slideClub from '~/components/index/slide-club.vue'
  import hotMoment from '~/components/index/hot-moment.vue'
  import hotWeibo from '~/components/index/hot-weibo.vue'
  import hotMatch from '~/components/index/hot-match.vue'
  import hotPost from '~/components/index/hot-post.vue'
  import hotVideo from '~/components/index/hot-video.vue'
  import hotComment from '~/components/index/comment.vue'
  import hotBet from '~/components/index/hot-bet.vue'

  const Cookie = process.client ? require("js-cookie") : undefined

  export default {
    layout:'layout-index',
    data() {
      return {
        banner:[],
        channel_id:-1,
        page:1,
        isMoreBtn:true,
        isLoading:false
      }
    },
    components: {
      banner,
      hotMatch,
      slideClub,
      hotMoment,
      hotWeibo,
      hotPost,
      hotVideo,
      hotComment,
      hotBet
    },
    watch:{
      channel_id(newVal, oldVal){
        console.log(newVal+",oldVal="+oldVal);
        this.getPostList();
      }
    },
    async asyncData({$axios, app}) {

      let [indexData] = await Promise.all([
        app.$api.tournament.getIndexData(),
      ]);


      return {
        advertLeft: indexData.data.data.advert_index_right, //左侧广告（后台接口给的是右侧）

        tournament_list: indexData.data.data.tournament_list,//热门赛事
        club_list: indexData.data.data.recommend_star_list,//官方俱乐部
        moment_list: indexData.data.data.recommend_circles,//热门圈子
        hotWeiboList: indexData.data.data.player_weibo_list,//名人微博
        bannerList: indexData.data.data.carousel_list,//轮播图

        channelList: indexData.data.data.channel_list,//讯息分类tab
        postList: indexData.data.data.article_list,//讯息列表

        betList: indexData.data.data.bet_list,//菠菜
        videoList: indexData.data.data.short_video_list,//热门视频
        superCommentList: indexData.data.data.super_comment,//神评论
        hotPostList: indexData.data.data.hot_dynamic_list, //右侧热帖
      }

    },
    mounted() {
      // this.$i18n.locale = Cookie.get("language");
      // this.$store.commit('setLanguage', Cookie.get("language"))
      // console.log('locale=' + this.$store.state.locale)
      window.addEventListener('scroll', this.winHandleScroll, true);  // 监听（绑定）滚轮滚动事件
      this.initSwiper();

      this.$store.commit('modules/tournament/setTournament', this.tournament_list);
    },
    methods: {
      initSwiper() {
        this.mySwiper = new Swiper('#index_article_nav', {
          //设置固定宽度，隐藏时初始化swiper
          //width: 200,
          direction: 'horizontal', // 切换选项
          //loop: true, // 循环模式选项
          slidesPerGroup : 6,
          slidesPerView: 6,//设置slider容器能够同时显示的slides数量
          observer: true,
          observeParents: true,
          breakpoints: {
            // //当宽度小于等于320
            // 320: {
            //   slidesPerView: 3,
            // },
            // //当宽度小于等于480
            // 480: {
            //   slidesPerView: 3,
            // },
            //当宽度小于等于640
            640: {
              slidesPerView: 3,
            }
          },
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        })
      },
      changeTab(channelId){
        this.page = 1;
        this.channel_id = channelId;
      },
      async getPostList(){
        let res = await this.$api.cms.getPostList({params:{channel_id:this.channel_id,page:this.page}});
        this.postList = res.data.article_list;
      },
      // window滚动事件
      async winHandleScroll(e) {
        if (e.target.documentElement) {
          let clientWidth = e.target.documentElement.clientWidth // 浏览器可视区域宽度
          let clientHeight = e.target.documentElement.clientHeight // 浏览器可视区域高度
          let scrollTop = e.target.documentElement.scrollTop   // document滚动偏移量
          let scrollHeight = e.target.documentElement.scrollHeight //文档内容实际高度（包括超出视窗的溢出部分）

          if (this.isMoreBtn && clientHeight + scrollTop >= scrollHeight - 300) {
            this.isMoreBtn = false;
            console.log('===加载更多内容……===');
            this.getMoreInfo();
          }
        }
      },
      async getMoreInfo(){
        this.isLoading = true;
        let res = await this.$api.cms.getPostList({params:{channel_id:this.channel_id,page:this.page + 1}});
        this.isLoading = false;
        if(res.data.article_list.length > 0){
          this.isMoreBtn = true;
          this.page = this.page + 1;
          this.postList = this.postList.concat(res.data.article_list);
        }else{
          this.isMoreBtn = false;
        }

      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.winHandleScroll, true);  // 监听（解绑）滚轮滚动事件
    }
  }
</script>

<style lang="stylus" scoped>
  .index-wrap {
    width: 1240px;
    padding-top: 20px;
    margin: 0 auto;
    display: flex;
    justify-content space-between;
  }

  //左侧
  .left-slide{

    .ad-item{
      margin-bottom: 10px;

      a {
        display: block;
        margin-bottom: 4px;

        img {
          display: block;
          width: 230px;
          height: 115px;
          border-radius: 4px;
        }
      }
    }


  }
  //右侧
  .right-slide{
    width 330px;
  }
  //中间
  .center-content {
    width: 640px;
    margin: 0 20px;

    .index_article {
      background: #fff;
      box-shadow: 0 0 0 1px #ebebed;
      border-radius: 2px;
      padding: 0 0px 10px 0px;
      margin-bottom: 20px;

      .index_article_nav {
        width: calc(100% - 30px);
        height: 50px;
        border-bottom: 1px solid #f0f1f2;
        overflow: hidden;
        position: relative;
        padding-right: 40px;
        margin: 0 auto;

        .swiper-slide {
          line-height: 22px;
          text-align: center;
          font-size: 16px;
          color: #656973;
          cursor: pointer;
          padding: 14px 0px;
          float: left;

          .icon{
            display none;
          }
        }
        .swiper-slide.active {
          font-weight: 700;
          color: #2d2f33;

          span {
            position: relative;

            .icon {
              display: block;
              width: 12px;
              height: 12px;
              color: #0d8dfc;
              position: absolute;
              right: -14px;
              top: 0px;
            }
          }
        }



        .swiper-button-prev, .swiper-button-next {
          width: 18px;
          height: 48px;
          background-image: none;
          background-color: #fff;
          padding-top: 12px;
        }
        .swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled {
          opacity: 1;
        }
        .swiper-button-prev .iconfont, .swiper-button-next .iconfont {
          font-size: 18px;
          color: #a8abb3;
        }

        .swiper-button-prev {
          left: inherit;
          right: 12px;
        }
        .swiper-button-next {
          right: -4px;
        }
      }

      .index_article_list {

        li {
          cursor: pointer;
          padding: 0px 15px;
          display: flex;

          .index_article_border {
            border-bottom: 1px dotted #f0f1f2;
            padding: 10px 0;
          }

          .index_article_info {
            line-height: 20px;
            font-size: 12px;
            display flex;
            color: #A8ABB;

            a {
              color: #A8ABB;

              img {
                display: block;
                width: 14px;
                height: 14px;
                border-radius: 50%;
                margin-right: 4px;
              }
            }
            a.index_article_info_user {
              padding-top: 3px;
            }
            a.gray_3{
              color: #A8ABB;
            }
          }
        }
        li.index_article_1 {

          .index_article_pic {
            display: block;
            width: 195px;
            height: 130px;
            border-radius: 4px;
            overflow: hidden;
            float: left;

            img {
              width: 100%;
              transition: ease all 0.8s;
            }
          }

          .index_article_main {
            width: 400px;
            padding-left: 10px;
            float: right;

            a.index_article_main_link {
              display: block;
              height: 110px;

              h2 {
                width: 100%;
                max-height: 50px;
                line-height: 25px;
                font-size: 18px;
                font-weight: 700;
                overflow: hidden;
                padding: 2px 0 2px 0;
              }
              p {
                max-height: 42px;
                line-height: 21px;
                overflow: hidden;
                margin-top: 6px;
              }
            }

          }

        }


      }


    }





  }



  //  list 加载更多block按钮,loading
  .loading-block{
    display: block;
    text-align center;
  }
  .block-more-btn {
    display: block;
    width: calc(100% - 24px);
    line-height: 40px;
    font-size: 14px;
    text-align: center;
    color: #a8abb3;
    background: #f7f8fa;
    border-radius: 8px;
    margin: 0 auto;
  }


  // ＜ 1240
  @media screen and (max-width: 1240px) {
    .index-wrap{
      width: 1000px;
    }
    .left-slide{
      display none;
    }
  }
  // ＜ 990
  @media screen and (max-width: 990px) {
    .index-wrap{
      width: 640px;
    }
    .right-slide{
      display none;
    }
  }
  // ＜ 767
  @media screen and (max-width: 767px) {
    .index-wrap{
      width 100%;
      padding-top: 0;
      margin -51px 0 0 0;
    }

    .center-content {
      width: 100%;
      margin: 0px;

      .index_article {

        .index_article_list{

          li.index_article_1{

            .index_article_pic{
              width: 120px;
              height: 80px;
            }

            .index_article_main{
              width: calc(100% - 130px);

              a.index_article_main_link{
                height: 62px;

                h2{
                  font-size: 16px;
                  padding-top: 0;
                }
                p{
                  display: none;
                }
              }
            }
          }
        }
      }

    }
  }



</style>
