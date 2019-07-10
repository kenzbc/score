<template>
  <!--随机徽章弹出框-->
  <div class="badge-pops">
    <div class="form">
      <div class="head">
        <span class="title">获得新的徽章</span>
        <a href="javascript:" class="sign_close" @click="closeBadgePop">
          <i class="iconfont icon-iconx"></i>
        </a>
      </div>
      <div class="wrap">
        <div class="swiper-container badge-swiper">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item in data">
              <div class="pop-img">
                <img :src="item.image_url">
              </div>
              <div class="special" v-if="item.appid != '0'">Score专属徽章</div>
              <div class="title">{{item.name}}</div>
              <div class="desc">{{item.desc}}</div>
            </div>
          </div>
          <!-- 如果需要导航按钮 -->
          <div class="swiper-badge-prev" v-if="badgeList.length > 1"><i class="iconfont">&#xe71a;</i></div>
          <div class="swiper-badge-next" v-if="badgeList.length > 1"><i class="iconfont">&#xe71b;</i></div>
        </div>

        <a class="button" href="/badge">立即查看</a>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "badge-modal",
    components: {},
    props:{
      badgeData:{
        type: [],
        default:()=>[]
      }
    },
    data() {
      return {
        data:[]
      }
    },
    mounted() {
      this.data = this.badgeData;
    },
    methods: {
      closeBadgePop(){
        this.$store.commit('modules/badge/removeBadgePop');
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  /** 徽章事件弹窗 **/
  .badge-pops {
    display: block;
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    z-index: 100;
    background-color: rgba(0, 0, 0, .7);


    .swiper-badge-next, .swiper-badge-prev {
      position: absolute;
      top: 50%;
      width: 27px;
      height: 44px;
      margin-top: -22px;
      z-index: 10;
      cursor: pointer;
      -moz-background-size: 27px 44px;
      -webkit-background-size: 27px 44px;
      background-size: 27px 44px;
      background-position: center;
      background-repeat: no-repeat;
    }

    .swiper-badge-prev {
      left: 0px;
    }
    .swiper-badge-next {
      right: 0px;
    }

    .swiper-badge-prev.swiper-button-disabled,.swiper-badge-next.swiper-button-disabled{
      .iconfont{
        font-size:28px;
        color: #ecebeb;
      }
    }


    .swiper-badge-prev, .swiper-badge-next{
      background-image none;

      .iconfont{
        font-size:28px;
        color: #bcbcbc;
      }

      &.no{
        .iconfont{
          color:#dedede;
        }
      }
    }



    .form {
      width: 316px;
      height: 510px;
      background-color: #fff;
      box-shadow:0px 2px 4px 0px rgba(0,0,0,0.02),0px 1px 0px 0px rgba(0,0,0,0.03);
      border-radius: 8px;
      top: 50%;
      left: 50%;
      margin-left: -158px;
      margin-top: -255px;
      position: fixed;
      z-index: 101;
      overflow: hidden;

      .head {
        text-align: center;
        position: relative;
        padding-top: 27px;

        .title{
          font-size:18px;
          font-family:PingFangSC-Semibold, "Microsoft YaHei";
          font-weight:600;
          color:rgba(45,47,51,1);
          line-height:26px;
        }

        .sign_close{
          width: 16px;
          height: 16px;
          line-height: 32px;
          color: #D2D4D9;
          /*background-color: #0D8DFC;*/
          position: absolute;
          right: 14px;
          top: 4px;
        }
      }

      .wrap {
        box-sizing: border-box;
        margin-top:16px;
        padding: 0 15px;
        text-align center;

        .swiper-pagination-bullet {
          background: #F0F1F2;
          opacity: 1;
        }
        .swiper-pagination-bullet-active {
          opacity: 1;
          background: #A8ABB3;
        }


        .pop-img{
          width:285px;
          height:285px;
          display block;
          overflow hidden;
          position: relative;
          margin: 0 auto;

          img{
            max-width 100%;
          }
        }

        .special{
          width 91px
          height:17px
          line-height 17px;
          margin:0 auto;
          border-radius:20px
          background:#0D8DFC;
          color:#fff;
          font-size:12px;
        }

        .title{
          margin-top:11px;
          font-size:20px;
          font-family:PingFangSC-Semibold, "Microsoft YaHei";
          font-weight:600;
          color:#2D2F33;
          line-height:28px;
        }

        .desc{
          margin-top:3px;
          font-size:14px;
          font-family:PingFangSC-Regular, "Microsoft YaHei";
          font-weight:400;
          color:#A8ABB3;
          line-height:26px;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }


        .button{
          display inline-block;
          width:275px;
          height:36px;
          margin:0 auto;
          margin-top:10px;
          line-height 36px;
          background:rgba(13,141,252,1);
          border-radius:24px;
          color:#fff;
          cursor pointer;
        }
        .button.blue{
          background:#0D8DFC;
        }
      }

    }

  }

</style>
