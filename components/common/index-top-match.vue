<template>
  <div class="header-match" id="headerMatch" v-if="$route.name == 'index' && matchList && matchList.length > 0">
    <div class="header-match-content">
      <!--所有赛事按钮列表-->
      <div class="all-match-btn">
        <p class="match-btn-text">{{$t('global.all')}}</p>
        <div class="match-list">
          <i class="iconfont icon-general__arrow_bel gray_2"></i>
          <ul class="schedule-list">
            <li v-for="item in $store.state.modules.tournament.list">
              <a href="javascript:;" @click="matchChange(item.tournamentID,item.short_name,item.image_thumb)">
                <img :src="item.image_thumb">
                {{item.short_name}}</a>
            </li>
          </ul>
        </div>
      </div>

      <!--首页头部赛事swiper-->
      <div class="match-scroll">
        <div id="index_match_swiper" class="swiper-container">
          <div class="swiper-wrapper">

            <nuxt-link v-for="item in matchList" :to="'/match/'+item.match_id" :key="item.match_id" class="swiper-slide match-item">
              <div class="match-team">
                <p><img :src="item.team_a_image+'?x-oss-process=image/resize,m_fill,h_24,w_24,limit_0'">{{item.team_a_short_name}}</p>
                <p><img :src="item.team_b_image+'?x-oss-process=image/resize,m_fill,h_24,w_24,limit_0'">{{item.team_b_short_name}}</p>
              </div>
              <div class="match-date-time">
                <!--未开始-->
                <p class="index_match_time" v-if="item.status == '0'">{{(item.start_date).substring(5)}}</p>
                <p class="index_match_time" v-if="item.status == '0'">{{item.start_time}}</p>
                <!--进行中-->
                <p class="index_match_live" v-if="item.status == '1'">LIVE</p>
                <!--已结束-->
                <p :class="item.team_a_win > item.team_b_win ? 'win' : 'lost'" v-if="item.status == '2'">{{item.team_a_win}}</p>
                <p :class="item.team_a_win < item.team_b_win ? 'win' : 'lost'" v-if="item.status == '2'">{{item.team_b_win}}</p>

              </div>
            </nuxt-link>

          </div>
          <div class="swiper-button-prev"><i class="iconfont icon-general__arrow_left"></i></div>
          <div class="swiper-button-next"><i class="iconfont icon-general__arrow_right"></i></div>
        </div>
      </div>
      <!--全部赛程-->
      <nuxt-link to="/tournament_list" target="_blank" class="tournament">
        <i class="iconfont icon-schedule"></i>
        <span>{{$t('global.allMatchProgress')}}</span>
      </nuxt-link>
    </div>
  </div>
</template>

<script>
  // 首页顶部赛事滚动
  export default {
    name: "index-top-match",
    components: {},
    data() {
      return {
        indexMatchSwiper: '',
        matchList:[],
        runingMatchIndex:0 //正在进行的赛事索引
      }
    },
    watch:{
      $route(to,from){
        if (to.path === '/') {
          this.getIndexTopMatchList();
        }
      },
    },
    mounted() {
      if (this.$route.path === '/') {
        this.getIndexTopMatchList();
      }
    },
    methods: {
      //获取比赛列表
      async getIndexTopMatchList(tournamentId){
        let res = await this.$api.tournament.getIndexTopMatchList({params:{"tournament_id":tournamentId}});
        this.matchList = res.data.list;
        //判断有没有进行中的
        for (let i=0; i < this.matchList.length; i++){
          if(this.matchList[i].status == '1'){
            this.runingMatchIndex = i;
            break;
          }else if(this.matchList[i].status == '0'){
            this.runingMatchIndex = i;
            break;
          }
        }

        setTimeout(()=> {
          this.initSwiper()
        },100)
      },
      initSwiper() {
        this.indexMatchSwiper = new Swiper('#index_match_swiper', {
          //设置固定宽度，隐藏时初始化swiper
          //width: 200,
          direction: 'horizontal', // 切换选项
          //loop: true, // 循环模式选项
          slidesPerView: 6,//设置slider容器能够同时显示的slides数量
          breakpoints: {
            //当宽度小于等于480
            480: {
              slidesPerView: 1,
            },
            //当宽度小于等于640
            640: {
              slidesPerView: 2,
            },
            //当宽度小于等于840
            840: {
              slidesPerView: 3,
            },
            //当宽度小于等于1030
            1030: {
              slidesPerView: 4,
            }
          },
          observer: true,
          observeParents: true,
          // 如果需要前进后退按钮
          navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
          },
        });
        //滚动到今天的位置
        setTimeout(()=> {
          //console.log(_this.todayIndex);
          this.indexMatchSwiper.slideTo(this.runingMatchIndex, 1000, false);    //滚动到对齐后的第五页（即第五个li的位置）
        },1500);

      },
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .header-match {
    display flex;
    width: 100%;
    background-color: #fff;
    border-bottom: 1px solid #EEEEEF;
    position: relative;
    z-index: 100;

    .header-match-content {
      max-width: 1280px;
      width: 100%;
      height: 64px;
      margin: 0 auto;
      position: relative;
      z-index: 60;

      .all-match-btn {
        width: 60px;
        height: 64px;
        border-right: 1px solid #EEEEEF;
        padding: 14px 0 0px 0;
        position: relative;
        z-index: 3;

        .match-btn-text {
          width: 100%;
          height: 30px;
          line-height: 30px;
          font-size: 14px;
          text-align: center;
        }
        .match-list {
          width: 100%;
          text-align: center;
          position: relative;

          i {
            font-size: 12px;
            cursor: pointer;
          }

          .schedule-list {
            display: none;
            max-height: 320px;
            background: #fff;
            border-radius: 4px;
            box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.03), 0 2px 8px 0 rgba(0, 0, 0, 0.08);
            position: absolute;
            left: 0;
            top: 6px;
            overflow-y: auto;
            padding: 5px;

            li {
              width: 170px;
              text-align: left;

              a {
                display: block;
                width: 100%;
                height: 36px;
                line-height: 24px;
                border-radius: 4px;
                overflow: hidden;
                padding: 6px 8px;

                img {
                  display: block;
                  width: 24px;
                  height: 24px;
                  float: left;
                  margin-right: 8px;
                }
              }
              a:hover {
                background-color #0c82fb;
                color: #fff;
              }
            }

          }
        }

      }
      .all-match-btn:hover .schedule-list {
        display block;
      }

      .match-scroll {
        width: calc(100% - 140px);
        height: 64px;
        overflow: hidden;
        position: absolute;
        left: 60px;
        top: 0;
        z-index: 2;

        .swiper-container {
          padding: 0 36px;
        }

        .match-item {
          height: 64px;
          border-left: 1px solid #F0F1F2;
          cursor: pointer;
          padding: 8px 15px;
          display: flex;
          justify-content: space-between;
          font-family: 'Industry-BoldItalic', PingFang SC, Microsoft Yahei, sans-serif;
        }
        .match-item:first-child {
          margin-left: -1px;
        }
        .match-item:last-child {
          border-right: 1px solid #F0F1F2;
        }
        .match-item .match-team {
          line-height: 24px;
          font-size: 13px;
        }
        .match-item .match-team img {
          display: block;
          width: 24px;
          height: 24px;
          margin-right: 8px;
          float: left;
        }
        .match-item .match-date-time {
          line-height: 24px;
          font-size: 13px;
        }
        .match-date-time p {
          line-height: 24px;
          text-align: right;
          font-size: 13px;
          color: #A8ABB3;
        }
        .match-item .match-date-time p.win{
          font-size: 16px;
          color: #FFA646;
        }
        .match-item .match-date-time p.lost{
          font-size: 16px;
        }

        .match-item  p.index_match_live {
          line-height: 18px;
          font-size: 12px;
          color: #fff;
          background-color: #FF5C69;
          border-radius: 2px;
          padding: 0 4px;
          margin-top: 12px;
        }
        .swiper-button-prev, .swiper-button-next {
          width: 36px;
          height: 64px;
          line-height: 64px;
          background: #fff;
          top: 0;
          margin-top: 0;
        }
        .swiper-button-prev {
          left: 0px;
          display flex;
          justify-content center;
          border-right: 1px solid #F0F1F2;
        }
        .swiper-button-next {
          right: 0px;
          display flex;
          justify-content center
        }
      }
      .tournament {
        display: block;
        width: 80px;
        height: 64px;
        text-align: center;
        background: #fff;
        border-left: 1px solid #F0F1F2;
        border-right: 1px solid #F0F1F2;
        position: absolute;
        right: 0;
        top: 0;
        z-index: 4;
        padding-top: 4px;

        i {
          font-size: 24px;
          color: #A8ABB3;
        }
        span {
          display: block;
          line-height: 24px;
          font-size: 12px;
          color: #A8ABB3;
        }
      }
    }

  }

  @media screen and (max-width: 767px) {
    .header-match{
      margin-top 41px;

      .all-match-btn{
        display none;
      }
      .match-scroll{
        width: calc(100% - 80px)!important;
        left: 0!important;
      }
    }
  }

</style>
