<template>
  <div>
    <header-sub-menus>
      <li>
        <a href="javascript:;" :class="{'active':subMenuTab=='hot'}" @click="changeTab('hot')" class="link">
          {{$t('starPage.hot')}}
          <svg class="icon schdule_icon_active" aria-hidden="true">
            <use xlink:href="#icon-circle_blue"></use>
          </svg>
        </a>
      </li>
      <li>
        <a href="javascript:;" :class="{'active':subMenuTab=='my'}" @click="changeTab('my')" class="link">
          {{$t('starPage.myStar')}}
          <svg class="icon schdule_icon_active" aria-hidden="true">
            <use xlink:href="#icon-circle_blue"></use>
          </svg>
        </a>
      </li>
      <li v-for="item,index in categoryList">
        <a href="javascript:;" :class="{'active':subMenuTab==item.id}" @click="changeTab(item.id,index)" class="link">
          {{item.category_name}}
          <svg class="icon schdule_icon_active" aria-hidden="true">
            <use xlink:href="#icon-circle_blue"></use>
          </svg>
        </a>
      </li>
    </header-sub-menus>

    <div class="star-main">
      <div class="star-list-box cl">
        <div v-for="item in dataList" class="item-wrap">
          <div class="star-item">
            <div class="item-header" :style="'background-image: url('+ item.bg_image_url +')'">
              <div class="like-wrap" :class="item.is_attention == '1' ? 'show' : ''">
                <i v-if="item.is_loved" class="iconfont icon-like_active"></i>
                <i v-else class="iconfont icon-like" @click="setLoved(item.id)"></i>
                <span v-if="!item.is_loved" @click="setLoved(item.id)">设为最爱</span>
              </div>
            </div>
            <div class="item-body">
              <p class="team-name">
                <nuxt-link :to="'/star?star_id='+item.id" target="_blank">{{item.name ? item.name : '--'}}</nuxt-link>
              </p>
              <div class="item-menu cl">

                <div v-if="item.is_toolbar_qa == '1'" class="link-item-wrap">
                  <a class="link-item question" :href="'/c/'+item.qa_circle_id" target="_blank">
                    <span><img :src="item.toolbar_qa_image+'?x-oss-process=image/resize,m_fill,h_72,w_72'"></span>
                    <p>问答</p>
                  </a>
                </div>

                <div v-if="item.is_toolbar_bet == '1'" class="link-item-wrap">
                  <a class="link-item bet" href="/bet_list" target="_blank">
                    <span><img :src="item.toolbar_bet_image+'?x-oss-process=image/resize,m_fill,h_72,w_72'"></span>
                    <p>菠菜</p>
                  </a>
                </div>

                <div v-if="item.is_toolbar_circle == '1'" class="link-item-wrap">
                  <a class="link-item circle" :href="'/c/'+item.circle_id" target="_blank">
                    <span><img :src="item.toolbar_circle_image+'?x-oss-process=image/resize,m_fill,h_72,w_72'"></span>
                    <p>圈子</p>
                  </a>
                </div>

                <div v-if="item.is_toolbar_broadcast == '1'" class="link-item-wrap">
                  <nuxt-link class="link-item lineup" :to="'/star/lineup?star_id='+item.id">
                    <span><img :src="item.toolbar_broadcast_image+'?x-oss-process=image/resize,m_fill,h_72,w_72'"></span>
                    <p>阵容</p>
                  </nuxt-link>
                </div>

                <div v-if="item.is_toolbar_trip == '1'" class="link-item-wrap">
                  <nuxt-link class="link-item trip" :to="'/star/trip?star_id='+item.id">
                    <span><img :src="item.toolbar_trip_image+'?x-oss-process=image/resize,m_fill,h_72,w_72'"></span>
                    <p>行程</p>
                  </nuxt-link>
                </div>

                <div v-if="item.is_star_shop == '1'" class="link-item-wrap">
                  <a class="link-item trip" :href="item.star_shop" target="_blank">
                    <span><img :src="item.toolbar_shop_image+'?x-oss-process=image/resize,m_fill,h_72,w_72'"></span>
                    <p>旗舰店</p>
                  </a>
                </div>

              </div>
              <div class="follow-btn" :class="{'active' : item.is_attention == '1'}" @click="setAttention(item.id,item.is_attention)">{{item.is_attention == '1' ? '已关注' : '关注' }}</div>
            </div>
          </div>
        </div>
        <no-data :show="true" v-if="dataList && dataList.length < 1"></no-data>
      </div>
    </div>
  </div>

</template>

<script>
  /**官方号页面**/
  export default {
    name: "moment_all",
    components: {},
    data() {
      return {
        subMenuTab:'hot',
        category_list:[],
        dataList:[],
        lplList:[],
        mGameList:[]
      }
    },
    async asyncData({app, $axios, error}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。

      let [star] = await Promise.all([
        app.$api.star.getStarList('post')
      ])

      return {
        categoryList: star.data.category_list,
        dataList: star.data.recommend_list,
      }

    },
    fetch() {
      // 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。
    },
    head() {
      return this.$seo(
        `推荐圈子`,
        `明星圈子,互动社区,主播互动`,
        `竞猜`,
      );
    },
    mounted() {
      console.log(11);
    },
    methods: {
      /**官方号官方号关注**/
      async setAttention(star_id,is_attention) {
        //判断是否登录
        if(!await this.$getLoginStatus()){return false;}

        let type = '';
        let res = {};
        if(is_attention == 1){
          res = await this.$api.star.setStarAttention({params:{star_id:star_id,type:2}});
          type = 2;
        }else{
          res = await this.$api.star.setStarAttention({params:{star_id:star_id,type:1}});
          type = 1;
        }


        if(res.code == 200){
          this.$Message.success(res.message);
          this.dataList.forEach((item)=>{
            if(item.id == star_id){
              item.is_attention = type;
            }
          })
        }else{
          this.$Message.warning(res.message);
        }
      },
      /**切换Tab请求数据**/
      async changeTab(type,categoryId){
        if (type == '') return;
        this.subMenuTab = type;
        let starList = await this.$api.star.getStarList('post');
        if(type == 'hot'){
          this.dataList = starList.data.recommend_list;
        }else if(type == 'my') {
          this.dataList = starList.data.attention_list;
        }else{
          this.dataList = starList.data.category_list[categoryId].star_list;
        }


      },
      /**
       * 设置为最爱
       * @param starId
       */
      async setLoved(starId) {
        let setLovedRes = await this.$api.star.setStarLoved({params:{star_id:starId}});
        if(setLovedRes.code == '200'){
          this.$Message.success(setLovedRes.message);
          this.changeTab(this.subMenuTab);
        }else{
          this.$Message.warning(setLovedRes.message);
        }
      },
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>

  .star-main {
    width: 1200px;
    margin: 0px auto;
    padding-top: 36px;
  }



  .star-list-box {
    width: 1200px
    padding: 10px 0 20px 0;
    margin 0 auto
    overflow hidden
    .item-wrap {
      padding 10px;
      float: left;
      .star-item {
        width: 280px
        height 264px
        background: #FFFFFF;
        box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.04);
        border-radius: 4px;
        padding-bottom 14px;
        .item-header {
          width: 100%
          height: 80px
          position relative;
          background-color #fff;
          background-repeat no-repeat;
          background-size cover;
          background-position center;
          cursor pointer;
        //border-radius 0 0 140px 140px / 0 0 7px 7px;
          .like-wrap {
            display: none;
            position absolute;
            width 18px;
            height: 20px;
            top 8px;
            left: 10px;
            overflow hidden;
            white-space nowrap;
            cursor pointer;
            transition width .5s, opacity .5s;
            .iconfont {
              position absolute
              top: 0
              left: 0
              font-size 18px
              color: #fff;
            }
            span {
              margin-left 26px;
              margin-top 2px;
              font-size 12px;
              color: #fff;
              opacity 0;
              transition opacity .5s;
            }
            &:hover {
              width: 78px
              span {
                opacity 1
              }
            }
            &.show {
              display block;
            }
          }
        }

        .item-body {
          .team-name {
            padding 19px 0 24px
            font-size: 17px;
            color: #2D2F33;
            letter-spacing: 0;
            text-align: center;
            font-weight 600;
            white-space nowrap
            text-overflow ellipsis
            overflow hidden
            max-width 85%
            margin 0 auto;
          }

          .item-menu {
            width: 100%;
            margin-bottom 16px
            height 62px;
            display flex;
            justify-content space-around

            .link-item-wrap {
              float: left;
            }
            .link-item {
              display block
              width: 36px
              padding 3px 0;
              margin 0 auto;
              span {
                display block
                width: 36px
                height: 36px
                //border: 1px solid rgba(0, 0, 0, 0.03);
                border-radius: 50%;
                margin 0 auto
                background #eee
                overflow hidden;

                img{
                  width 36px;
                }

                .icon {
                  width: 20px;
                  height: 20px;
                  margin-top 7px;
                  margin-left 7px;
                  color: #fff;
                }
              }
              p {
                font-size: 12px;
                color: #2D2F33;
                letter-spacing: 0;
                text-align: center;
                margin-top 8px
              }
              &.question {
                span {
                  //background-image: linear-gradient(-135deg, #19A7FF 0%, #058AFF 100%);
                }
              }
              &.circle {
                span {
                  //background-image: linear-gradient(-135deg, #16DE9B 0%, #0CCC76 100%);
                }
              }
              &.bet {
                span {
                  //background-image: linear-gradient(-134deg, #14D4FA 0%, #05B0FA 100%);
                }
              }
              &.lineup {
                span {
                  //background-image: linear-gradient(-135deg, #6293F5 0%, #4B70EB 100%);
                }
              }
              &.trip {
                span {
                  //background-image: linear-gradient(-135deg, #FFC552 0%, #FFDC85 100%);
                }
              }

            }

          }

          .follow-btn {
            width: 240px
            height: 32px
            line-height 30px
            text-align center
            border: 1px solid #0D8DFC;
            border-radius: 16px;
            margin 0 auto
            font-size: 13px;
            color: #0D8DFC;
            cursor pointer
            transition background .3s;
            &:hover {
              background #EDF7FF;
            }
            &.active{
              background: #0d8dfc;
              color: #fff;
            }
          }
        }
      }
      &.attention {
        .star-item {
          .follow-btn {
            background: #0D8DFC;
            color: #fff;

            &:hover {
              background #077EE6;
            }
          }
        }
      }
      &.liked {
        .star-item {
          .like-wrap {
            cursor default

          }
        }
      }
    }
    .tip {
      margin-top 80px;
    }
  }

  @media screen and (max-width: 1200px) {
    .star-list-box {
      width: 900px;
    }
  }

  @media screen and (max-width: 768px) {
    .star-main {
      padding-top: 37px;
      width 100%;
    }

    .star-list-box {
      width: 600px;
    }
  }

  @media screen and (max-width: 600px) {
    .star-main {
      padding-top: 37px;
      width 100%;
    }

    .star-list-box {
      width: 300px;
    }
  }

  //.nav-box {
  //    width: 250px;
  //    float: left;
  //}
  //
  //.nav-box .nav-title {
  //    font-size: 16px;
  //    border-bottom: 1px solid #ddd
  //}
  //
  //.nav-box .nav-title .nav-item {
  //    line-height: 30px;
  //    width: 50%;
  //    display: inline-block;
  //    border-bottom:  1px solid #ddd;
  //    text-align: center;
  //    padding-bottom: 10px;
  //    cursor: pointer;
  //}
  //
  //.nav-box .nav-title .nav-item.active {
  //    border-bottom: 3px solid #fddc00;
  //    margin-bottom: -1px;
  //}
  //
  //.nav-box ul {
  //    margin: 8px 0;
  //}
  //
  //.nav-box ul li {
  //    display: block;
  //    float: left;
  //    width: 100px;
  //    height: 40px;
  //    margin-top: 10px;
  //    text-align: center;
  //    line-height: 40px;
  //    background-color: #eee;
  //    border-radius: 5px;
  //    color: #333;
  //    overflow: hidden;
  //}
  //
  //.nav-box ul li.active {
  //    background-color: #fddc00;
  //}
  //
  //.nav-box ul li a {
  //    display: block;
  //}
  //
  //.nav-box ul li:nth-child(odd) {
  //    margin-right: 10px;
  //}
  //
  //.main-box {
  //    width: calc(100% - 250px - 10px);
  //    float: right;
  //}
  //
  //.nav-box, .main-box {
  //    padding: 20px;
  //    background-color: #fff;
  //    border-radius: 5px;
  //}
  ///*右侧*/
  //.star_list_title{ line-height: 30px; font-size: 22px; color: #333; margin: 0; }
  //.star_list_wrap{ padding-top: 1%; margin: 0 -0.5%; }
  //.star_list_main{ width: 32%; border: 1px solid #ddd; border-radius: 5px; padding: 1%; margin: 0.5%; float: left; }
  //.star_list_img{ display: block; width: 30%; }
  //.star_list_img img{ border-radius: 5px;}
  //.star_list_info{ width: 66%; }
  //.star_list_info h3{ height: 28px; line-height: 28px; font-size: 16px; color: #333; margin: 0; overflow: hidden; }
  //.star_list_info p{ font-size: 14px; color: #999; margin-bottom: 4px; }
  //.star_list_btn{ display: inline-block; line-height: 24px; font-size: 14px; border-radius: 5px; padding: 0 5%; }
  //.star_list_btn i{ display: inline-block; color: #fff; margin-right: 4px; }
  //.star_list_info a.attention,.star_list_info a.homestar{  color: #000; background-color: #fddc00; border: 1px solid #fddc00;}
  //.star_list_info a.attentioned,.star_list_info a.homestared{ color: #333; background-color: #fff; border: 1px solid #ddd;}
  //.star_list_info a.homestared,.star_list_info a.homestar{ margin-left: 4px; }
</style>
