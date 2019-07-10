<template>
  <div>
    <star-header :starInfo="starInfo"></star-header>
    <div class="star-main">
      <star-left :data="starInfo"></star-left>
      <div class="score-star-home">
        <div class="score-rank">
          <h4 class="star-title">签到榜</h4>
          <div class="star-list">
            <ul>
              <li v-for="item,index in rankList">
                <a href="/u/5657512" class="star-rank-img">
                  <img :src="item.avatar ? item.avatar : '/static/images/tx_pic.jpg' | catImg(62, 62)">
                  <span class="level-1">{{item.today_no}}</span>
                </a>
                <p class="star-rank-name fll">
                  <span class="star-user">
                    <span>{{item.nickname}}</span>
                    <span class="star-rank-name-level">Lv.{{item.rank}}</span>
                  </span>
                  <span class="star-rank-name-time">{{item.time}}</span>
                </p>
              </li>

            </ul>

            <a v-if="rankList && rankList.length < 0" href="javascript:" class="star-get-more gray_2" @click="getMore">加载更多</a>
          </div>
        </div>



      </div>
      <star-right :data="starInfo"></star-right>
    </div>

  </div>
</template>

<script>
  import StarHeader from "../../components/star/star-header";
  import StarRight from "../../components/star/star-right";
  import StarLeft from "../../components/star/star-left";
  export default {
    name: "rank",
    layout: 'layout-simple',
    components: {
      StarLeft,
      StarRight,
      StarHeader
    },
    data() {
      return {
        page:2,
        limit:20,
        isMore:true,
        rankList:[],
      }
    },
    async asyncData({app, $axios, error, params, query, route}) {

      let dynamicParams = {
        star_id: query.star_id,
        limit: 20,
        page: 1,
      };


      let [starInfo, rankList] = await Promise.all([
        app.$api.star.getStarInfo({params:dynamicParams}),
        app.$api.star.getSignRankList({params:dynamicParams})
      ]);

      return {
        starInfo: starInfo.data,
        rankList: rankList.data.list,
      }


    },
    mounted() {

    },
    methods: {
      async getMore(){
        let params = {
          star_id: this.$route.query.star_id,
          limit: 20,
          page: 1,
        };
        let res = await this.$api.star.getSignRankList({params});
        if(res.code == '200'){
          if(res.data.list.length > 0){
            this.isMore = true;
            this.page = this.page + 1;
            this.rankList = this.rankList.concat(res.data.list);
          }else{
            this.isMore = false;
            this.page = this.page + 1;
          }
        }else{
          this.$Message.error(res.message);
        }
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .star-main {
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


    .score-rank{
      max-width: 640px;
      width: 100%;
      background: #FFFFFF;
      box-shadow: 0 0 0 1px #EBEBED;
      border-radius: 2px;

      .star-title{
        line-height: 40px;
        border-bottom: 1px solid #F0F1F2;
        position: relative;
        margin: 0 12px;
        padding-left: 12px;

        &:before{
          content: '';
          display: block;
          width: 4px;
          height: 12px;
          background: #0D8DFC;
          position: absolute;
          left: 2px;
          top: 14px;
        }
      }

      .star-list{
        padding-bottom: 15px;

        li{
          display flex;
          justify-content space-between;
          padding: 10px 12px 0 12px;

          .star-rank-img {
            display: block;
            border: 1px solid transparent;
            border-radius: 50%;
            position: relative;
            padding: 2px;
            margin: 0 16px;

            img{
              display: block;
              width: 62px;
              height: 62px;
              border-radius: 50%;
            }
            span{
              display: block;
              width: 26px;
              height: 26px;
              line-height: 22px;
              font-size: 13px;
              text-align: center;
              color: #fff;
              background: #C7CDD9;
              border: 2px solid #FFFFFF;
              border-radius: 50%;
              position: absolute;
              left: 0px;
              bottom: 0px;

              &.level-1{
                width: 32px;
                height: 32px;
                text-indent: -9999px;
                background: url(https://img1.famulei.com/static/125/images/star/rank_1.png) center top no-repeat;
                background-size: cover;
                border: none;
                border-radius: initial;
                left: -6px;
                bottom: -6px;
              }
              &.level-2{
                width: 32px;
                height: 32px;
                text-indent: -9999px;
                background: url(https://img1.famulei.com/static/125/images/star/rank_2.png) center top no-repeat;
                background-size: cover;
                border: none;
                border-radius: initial;
                left: -6px;
                bottom: -6px;
              }
              &.level-3{
                width: 32px;
                height: 32px;
                text-indent: -9999px;
                background: url(https://img1.famulei.com/static/125/images/star/rank_3.png) center top no-repeat;
                background-size: cover;
                border: none;
                border-radius: initial;
                left: -6px;
                bottom: -6px;
              }
            }
          }

          .star-rank-name {
            width: calc(100% - 104px);
            line-height: 62px;
            font-size: 16px;
            font-weight: bold;
            border-bottom: 1px solid #F0F1F2;
            padding-bottom: 12px;
            position: relative;
            display flex
            align-items center;
            justify-content space-between;

            .star-user{
              display flex
              align-items center;

              .star-rank-name-level {
                margin-left:10px;
                display: inline-block;
                height: 16px;
                line-height: 16px;
                font-size: 12px;
                font-weight: normal;
                color: #fff;
                background-image: linear-gradient(-135deg,#058AFF 0%,#19A7FF 100%);
                border-radius: 4px;
                padding: 0 4px;
              }
            }


            .star-rank-name-time {
              background: #fff;
              color: #81858D;
              font-size: 12px;
              font-weight: normal;
            }
          }


        }
      }
    }


    .star-get-more{
      display: block;
      line-height: 40px;
      text-align: center;
      border-radius: 8px;
      margin: 15px 15px 0 15px;
      border: 1px solid #f0f1f2;
      /* background: #F7F8FA; */
      background: #fff;
      font-size: 14px;
      color: #a8abb3;
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
      }
    }

  }
</style>
