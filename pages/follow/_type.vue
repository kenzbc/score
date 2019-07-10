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
          <nuxt-link to="/post" class="fll">新贴</nuxt-link>
          <nuxt-link to="/post?type=hot" class="fll">热贴</nuxt-link>
          <nuxt-link to="/follow" class="fll active">我的关注</nuxt-link>
        </div>
        <ul class="card_ul">
          <div class="select-scroll-wrapper cl">
            <ul class="select-list">
              <nuxt-link to="/follow" class="item" :class="{'active' : !followType}">全部</nuxt-link>
              <nuxt-link to="/follow/original" class="item" :class="{'active' : followType == 'original'}">原创</nuxt-link>
              <nuxt-link to="/follow/qa" class="item" :class="{'active' : followType == 'qa'}">问答</nuxt-link>
              <nuxt-link to="/follow/bet" class="item" :class="{'active' : followType == 'bet'}">菠菜组合</nuxt-link>
              <nuxt-link to="/follow/picture" class="item" :class="{'active' : followType == 'picture'}">图片</nuxt-link>
              <nuxt-link to="/follow/video" class="item" :class="{'active' : followType == 'video'}">视频</nuxt-link>
              <nuxt-link to="/follow/sound" class="item" :class="{'active' : followType == 'sound'}">语音</nuxt-link>
              <nuxt-link to="/follow/vote" class="item" :class="{'active' : followType == 'vote'}">投票</nuxt-link>
            </ul>
          </div>

          <div class="post-list-wrap">
            <div class="score-loading top" v-if="loading">
              <img class="score-icon" src="/static/images/score_loading.gif" alt="">
            </div>

            <div class="post-list-wrapper">
              <ul class="post-list index_article_list">
                <li v-for="item in followPost" v-if="$route.params.type=='qa'">
                  <qa-detail :item="item"></qa-detail>
                </li>

                <!--帖子List Item-->
                <li v-for="item in followPost" v-if="$route.params.type!='qa'">
                  <div class="index_article_border">
                    <div class="star_dynamic_main">

                      <!--用户头像等级等-->
                      <detail-head :data="item"></detail-head>
                      <!--帖子列表正文内容-->
                      <nuxt-link :to="'/p/'+item.dynamic_id" target="_blank" class="star_dynamic_link">
                        <h2>{{item.title}}</h2>
                        <p class="">{{item.content}}</p>
                      </nuxt-link>
                      <!--帖子类型-->
                      <div class="forward-box">
                        <!--音频-->
                        <audio-box v-if="item.sound && item.sound.length > 0"></audio-box>
                        <!--视频-->
                        <div v-if="item.video && item.video.length > 0" class="video-block">
                          <nuxt-link class="video-layer" :to="'/p/'+item.dynamic_id" target="_blank"></nuxt-link>
                          <img :src="item.video[0].image_url+'?x-oss-process=image/resize,m_fill,w_240,h_160,limit_0'" alt="">
                          <span class="type-label video">{{item.video[0].seconds}}</span>
                        </div>
                        <!--图片-->
                        <div v-if="item.picture && item.picture.length > 0" class="star_dynamic_pic cl">
                          <nuxt-link v-if="item.picture[0]" :to="'/p/'+item.dynamic_id" target="_blank" class="star_dynamic_pic_small fll">
                            <img :src="item.picture[0].image_url+'?x-oss-process=image/resize,m_fill,w_240,h_160,limit_0'" alt="">
                          </nuxt-link>
                          <nuxt-link v-if="item.picture[1]" :to="'/p/'+item.dynamic_id" target="_blank" class="star_dynamic_pic_small fll">
                            <img :src="item.picture[0].image_url1+'?x-oss-process=image/resize,m_fill,w_240,h_160,limit_0'" alt="">
                          </nuxt-link>
                          <nuxt-link v-if="item.picture[2]" :to="'/p/'+item.dynamic_id" target="_blank" class="star_dynamic_pic_small fll">
                            <img :src="item.picture[0].image_url2+'?x-oss-process=image/resize,m_fill,w_240,h_160,limit_0'" alt="">
                            <span class="type-label num">共 {{item.picture.length}} 张</span>
                          </nuxt-link>
                        </div>


                        <!--菠菜贴-->
                        <bet-detail v-if="$route.params.type == 'bet'"></bet-detail>


                        <!--转发的贴子-->
                        <forward-dynamic v-if="item.forward_dynamic && item.forward_dynamic.length > 0"  :item="item"></forward-dynamic>

                        <nuxt-link v-else-if="item.cover_url" :to="'/p/'+item.dynamic_id" target="_blank" class="article_cover_url">
                          <img :src="item.cover_url+'?x-oss-process=image/resize,m_fill,h_320,w_640,limit_0'">
                        </nuxt-link>



                      </div>
                      <!--点赞分享工具条-->
                      <detail-footer-tools :data="item" @refresh="getFollowPostList"></detail-footer-tools>
                    </div>
                  </div>
                </li>

              </ul>
            </div>

            <div v-if="loading" class="score-loading bottom">
              <img class="score-icon" src="/static/images/score_loading.gif" alt="">
            </div>
            <div class="load-more star_article_list_more show" @click="loadMore()">加载更多</div>
          </div>


        </ul>


      </div>


      <div class="wrap_right">
        <div class="follow-list-box">
          <h2>关注列表</h2>
          <div class="search-box">
            <div class="search-icon"><i class="iconfont icon-general__search_Gr"></i></div>
            <input type="text" class="search-text" placeholder="搜索我关注的人" data-member_id="">
            <div class="history-box">
              <div class="tool-bar cl"><h3>历史记录</h3> <i class="iconfont icon-fml-delete"></i></div>
              <ul class="history-list cl"></ul>
            </div>
          </div>
          <div class="user-list nano has-scrollbar">
            <ul class="nano-content" tabindex="0" style="right: -6px;">
              <li class="item-user active" data-index="-1">
                <img class="user-avatar" src="/static/images/select-all.png" alt="">
                <span>全部</span>
              </li>

              <li class="item-user" v-for="item in attentionList">
                <div class="avatar-box">
                  <img class="avatar" :src="item.avatar+'?x-oss-process=image/resize,m_fill,w_50,h_50,limit_0'"
                      :alt="item.demo">
                  <img class="sign-icon" src="/static/images/member/v.png">
                </div>
                <span>{{item.nickname}}</span>
              </li>

            </ul>
          </div>
        </div>
      </div>
    </div>





  </div>
</template>

<script>
  import audioBox from '~/components/common/audio-box'
  import QaDetail from "../../components/post/content/qa-detail";
  import BetDetail from "../../components/post/bet-detail";
  import DetailHead from "../../components/post/detail-head";
  import DetailFooterTools from "../../components/post/detail-footer-tools";
  import ForwardDynamic from "../../components/post/forward-dynamic";
  import ReportModal from "../../components/common/report-modal";
  export default {
    name: "post",
    components: {
      ReportModal,
      ForwardDynamic,
      DetailFooterTools,
      DetailHead,
      BetDetail,
      QaDetail,
      audioBox
    },
    data() {
      return {
        loading:false,
        loadMoreBtn:true,
        page:1,
        limit:20,
        followType:'',
        reportAddModal:false,

      }
    },
    watch:{
      followType(newVal, oldVal){

      }
    },
    async asyncData({app, $axios, error, store, params}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。

      let followParams = {
        params:{
          filtrate: params.type,
          add_time: 999,
          page: 1,
          limit: 20,
        }
      };
      let attParams = {
        params:{
          target_member_id: '75193',
          limit: 999,
        }
      };

      let [followPost, attentionList] = await Promise.all([
        app.$api.dynamic.getFollowPostList(followParams),
        app.$api.dynamic.getAttentionTeamList(attParams)
      ]);

      return {
        followType: params.type,
        followPost: followPost.data.dynamic_list,
        attentionList: attentionList.data,
      }


    },
    fetch() {
      // 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。
    },
    head() {
      // 配置当前页面的 Meta 标签
      return this.$seo(
        `我关注的`,
        `我关注的`,
        `我关注的`,
        {
          script: [],
          link: []
        }
      );
    },
    mounted() {
    },
    methods: {
      //获取关注帖子列表
      async getFollowPostList(){
        let params = {
          filtrate: this.$route.params.type,
          add_time: 999,
          page: this.page,
          limit: this.limit,
        };
        let res = await this.$api.dynamic.getFollowPostList({params});
        if(res.code == '200'){
          this.followPost = res.data.dynamic_list;
        }
      },
      //加载更多
      async loadMore(){
        this.page = this.page++;
        this.loading = true;
        this.loadMoreBtn = false;
        let params = {
          filtrate: this.$route.params.type,
          add_time: 999,
          page: this.page,
          limit: this.limit,
        };
        let res = await this.$api.dynamic.getFollowPostList({params});
        if(res.code == '200'){
          this.followPost = this.followPost.concat(res.data.dynamic_list);
        }
        this.loadMoreBtn = true;
        this.loading = false;
      },


    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .page-main {
    max-width: 990px;
    margin: 36px auto;
    width: 100%;
    zoom: 1;
    padding-top: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }

  .score-loading {
    width: 100%;
    height: 40px;
    z-index: -1;
    overflow: hidden;
    text-align: center;
    transition: 0.5s;

    .score-icon {
      height: 100%;
    }
  }

  .load-more {
    margin: 15px;
    cursor: pointer;
    border: 1px solid #f0f1f2;
    border-radius: 8px;
    background: #fff;
    font-size: 14px;
    color: #a8abb3;
    text-align: center;
    line-height: 40px;
    display: block;


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


    .select-scroll-wrapper{
      width: 100%;
      height: 50px;
      background: #fff;
      border-bottom: 1px solid #f5f6f7;
      padding-top: 12px;
      padding-left: 15px;

      .select-list{
        width: 100%;
        height: 50px;
        background: #fff;
        padding-top: 5px;
        padding-left: 15px;

        .item {
          min-width: 60px;
          height: 26px;
          line-height: 26px;
          margin-left:10px;
          padding: 0 12px;
          background: #f0f1f2;
          border-radius: 8px;
          font-size: 12px;
          color: #656973;
          float: left;
          text-align: center;
          cursor: pointer;

          &.active{
            background: #0d8dfc;
            color: #fff;
          }
        }
      }




    }



    //帖子列表
    .post-list-wrap{

      .type-label {
        display: block;
        padding: 3px 8px;
        color: #fff;
        position: absolute;
        right: 0;
        bottom: 0;
        border-radius: 4px 0 4px 0;
        font-size: 12px;
      }



      .index_article_border {
        padding: 10px 16px;


        .star_hot_link h2, .star_dynamic_link h2 {
          line-height: 24px;
          font-size: 16px;
          margin: 6px 7px 0;
        }
        .star_hot_link p, .star_dynamic_link p {
          max-height: 66px;
          line-height: 22px;
          overflow: hidden;
          margin: 4px 7px 0;
        }
        .star_dynamic_link {
          display: block;
          margin-bottom: 10px;
        }

        .forward-box {
          width: 596px;
          margin: 0 auto;

          .article_cover_url {
            display: block;
            max-width: 100%;

            img{
              width: 100%;
            }
          }

          .video-block{
            width: 240px;
            height: 160px;
            border-radius: 4px;
            overflow: hidden;
            position: relative;

            .video-layer {
              display: block;
              position: absolute;
              width: 100%;
              height: 100%;
              top: 0;
              left: 0;
              z-index: 1;
              background-color: rgba(0,0,0,0.3);
              background-image: url(/images/play.png);
              background-repeat: no-repeat;
              background-size: 60px;
              background-position: center;
              opacity: 0.7;
              transition: background-color 0.3s, opacity 0.3s;

              &:hover {
                opacity: 1;
                background-color: rgba(0,0,0,0);
              }
            }


            .type-label.video {
              background: rgba(0,0,0,0.68);
            }
          }


        }


      }

    }


  }



  .wrap_right {
    width: 330px;
    float: right;

    .follow-list-box {
      width: 100%;
      height: 580px;
      background: #fff;
      box-shadow: 0 0 0 1px #ebebed;
      border-radius: 2px;

      h2 {
        font-size: 16px;
        color: #2d2f33;
        padding: 15px 20px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .search-box {
        width: 300px;
        height: 34px;
        position: relative;
        margin: 0 auto;
        background: #f7f8fa;
        border-radius: 17px;

        .search-icon {
          width: 44px;
          height: 34px;
          float: left;
          text-align: center;
          padding-top: 5px;

          .iconfont {
            font-size: 24px;
            color: #a8abb3;
          }
        }
        .search-text {
          display: block;
          width: calc(100% - 44px);
          height: 34px;
          float: right;
          background: transparent;
        }
        .history-box {
          width: 280px;
          position: absolute;
          left: -15px;
          top: 0;
          overflow: hidden;
          opacity: 0;
          z-index: -1;
          visibility: hidden;
          background: #fff;
          box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px 0 rgba(0,0,0,0.08);
          border-radius: 4px;
          padding: 0 9px 10px;
          transition: opacity 0.1s, z-index 0.5s, visibility 0.7s, left 0.4s;

          .tool-bar {
            padding: 15px 7px 5px;
            text-align: justify;

            h3 {
              font-size: 13px;
              color: #656973;
              float: left;
            }
            .iconfont {
              font-size: 12px;
              color: #a8abb3;
              float: right;
              cursor: pointer;
            }
          }
        }
      }

      .user-list {
        width: 100%;
        height: 480px;
        margin-top: 20px;


        .item-user {
          width: 314px;
          height: 50px;
          margin: 0 auto;
          font-size: 14px;
          color: #2d2f33;
          border-bottom: 1px solid #f0f1f2;
          line-height: 50px;
          padding: 0 12px;
          border-radius: 4px;
          cursor: pointer;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;

          &:hover {
            background: #eeeff0;
          }
          &.active {
            background: #0d8dfc;
            color: #fff;
          }

          .user-avatar {
            display: inline-block;
            vertical-align: middle;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 6px;
          }

          .avatar-box {
            position: relative;
            display: inline-block;
            vertical-align: middle;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            margin-right: 6px;

            .avatar {
              display: block;
              width: 100%;
              border-radius: 50%;
            }
            .sign-icon {
              display: block;
              width: 14px;
              height: 14px;
              border-radius: 50%;
              position: absolute;
              bottom: -2px;
              right: -2px;
            }
          }




        }

      }

    }


  }




</style>
