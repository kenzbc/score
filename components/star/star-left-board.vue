<template>
  <div class="score_slide_wrap star-item" id="star_slide_info">
    <div class="item-header"
         :style="'background-image: url('+starInfo.bg_image_url+');'">
      <div class="share_star_icon" @click="shareModal = true"><i class="iconfont icon-share"></i></div>
    </div>

    <div class="item-body">
      <p class="team-name">{{starInfo.name}}</p>
      <div class="star_slide_sign cl">
        <div class="star_slide_sign_info fll">
          <h4>{{starInfo.is_sign == '0' ? '今天还未签到' : '今天已签到'}}</h4>
          <p class="gray_3">共有 {{starInfo.today_total_num}} 个人签到</p>
        </div>
        <a href="javascript:" class="star_slide_sign_btn flr" @click="starCodeShow(1)">签到</a>
      </div>


      <div class="item-menu cl">
        <div class="link-item-wrap" v-if="starInfo.is_toolbar_qa == '1'">
          <a class="link-item question" :href="'/c/'+starInfo.qa_circle_id" target="_blank">
            <span>
              <svg class="icon" aria-hidden="true"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-official__qa"></use></svg>
            </span>
            <p>问答</p>
          </a>
        </div>
        <div class="link-item-wrap" v-if="starInfo.is_toolbar_bet == '1'">
          <a class="link-item bet" href="/bet" target="_blank">
            <span>
              <svg class="icon" aria-hidden="true">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-official__bocai"></use>
              </svg>
            </span>
            <p>菠菜</p>
          </a>
        </div>
        <div class="link-item-wrap" v-if="starInfo.is_toolbar_circle == '1'">
          <a class="link-item circle" :href="'/c/'+starInfo.id" target="_blank">
            <span>
              <svg class="icon" aria-hidden="true"><use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-official__circle"></use></svg>
            </span>
            <p>圈子</p>
          </a>
        </div>
        <div class="link-item-wrap" v-if="starInfo.is_toolbar_broadcast == '1'">
          <nuxt-link class="link-item lineup" :to="'/star/lineup?star_id='+starInfo.id">
            <span>
              <svg class="icon" aria-hidden="true"><use xlink:href="#icon-official__team"></use></svg>
            </span>
            <p>阵容</p>
          </nuxt-link>
        </div>
        <div class="link-item-wrap" v-if="starInfo.is_toolbar_trip == '1'">
          <nuxt-link class="link-item trip" :to="'/star/trip?star_id='+starInfo.id">
            <span>
              <svg class="icon" aria-hidden="true"><use xlink:href="#icon-official__schedule"></use></svg>
            </span>
            <p>行程</p>
          </nuxt-link>
        </div>
      </div>

      <div class="follow-btn"
           :class="{'active' : starInfo.is_attention == 1}"
           @click="starAttention(starInfo.id, starInfo.is_attention)">
        {{starInfo.is_attention == 1 ? '已关注' : '关注'}}
      </div>
    </div>

    <div class="star_code_wrap" v-if="starQrCodeShow">
      <a href="javascript:" class="star_code_close" @click="starQrCodeShow = false">
        <i class="iconfont icon-iconx"></i>
      </a>
      <img :src="starQrCode" class="star_code_img">
      <p class="star_code_p">
        扫码下载 <span class="star_code_name">{{starInfo.name}}</span> App<br>
        为自己喜欢的官方号签到吧 !
      </p>
    </div>

    <!--分享官方号-->
    <share-modal :show="shareModal"
                 :share-url="$route.fullPath"
                 @setShareModalShow="setShareModalShow"></share-modal>

  </div>
</template>

<script>
  import ShareModal from "../common/share-modal";
  export default {
    name: "star-left-board",
    components: {ShareModal},
    props:{
      data:{
        type: Object,
        default: ()=>{}
      }
    },
    data() {
      return {
        shareModal: false,
        starInfo:{},
        starQrCodeShow: false,
        starQrCode: '/static/images/twocode.png',
      }
    },
    watch:{
      data(newVal, oldVal){
        this.starInfo = newVal;
      }
    },
    mounted() {
      this.starInfo = this.data;
    },
    methods: {
      //分享弹层
      setShareModalShow(e){
        if(e === false){
          this.shareModal = false;
        };
      },
      async starAttention(starId, isAtt){
        let params = {
          star_id: starId,
          type: isAtt == 1 ? '2' : '1'
        };

        let res =  await this.$api.star.setStarAttention({params});
        if(res.code == 200){
          this.$Message.success(res.message);
          if(isAtt == 1){
            this.starInfo.is_attention = 0;
          }else{
            this.starInfo.is_attention = 1;
          }
        }else{
          this.$Message.error(res.message);
        }
      },
      //显示官方号
      starCodeShow(starId){
        switch (starId) {
          case 1:
            this.starQrCode = '/static/images/star/we_code.png';
            break;
          case 11:
            this.starQrCode = '/static/images/star/rng_code.png';
            break;
          default:
            this.starQrCode = '/static/images/twocode.png';
            break;
        }

        this.starQrCodeShow = true;
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .star-item {
    padding-bottom: 14px;
    overflow: hidden;
    margin-bottom: 20px;


    .item-header {
      width: 100%;
      height: 80px;
      position: relative;
      background-color: #fff;
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;

      &:hover{
        .share_star_icon{
          display inline-block;
        }
      }

      .share_star_icon {
        display: none;
        position: absolute;
        width: 28px;
        height: 28px;
        line-height: 28px;
        text-align: center;
        background: #000;
        border-radius: 50%;
        top: 8px;
        left: 10px;
        overflow: hidden;
        cursor: pointer;
        transition: width 0.5s,opacity 0.5s;

        .iconfont {
          font-size: 18px;
          color: #fff;
        }
      }
    }


    .item-body{

      .team-name {
        padding: 19px 0 24px;
        font-size: 17px;
        color: #2d2f33;
        letter-spacing: 0;
        text-align: center;
        font-weight: 600;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
        max-width: 85%;
        margin: 0 auto;
      }
      .star_slide_sign {
        width: 240px;
        border-bottom: 1px solid #f0f1f2;
        padding-bottom: 16px;
        margin: 10px auto 20px auto;

        .star_slide_sign_info {
          h4 {
            line-height: 20px;
          }
          p {
            line-height: 18px;
            font-size: 12px;
          }

        }
        .star_slide_sign_btn {
          display: block;
          line-height: 30px;
          text-align: center;
          color: #fff;
          background: #0d8dfc;
          border-radius: 20px;
          padding: 0 20px;
          margin-top: 3px;
        }
      }


      .item-menu {
        width: 100%;
        margin-bottom: 16px;
        height: 62px;
        display flex
        justify-content space-around;

        .link-item-wrap {
          /*width: 20%;*/
          /*float: left;*/
        }

        &.four {
          .link-item-wrap {
            /*width: 25%;*/
          }
        }

        .link-item {
          display: block;
          width: 36px;
          padding: 3px 0;
          margin: 0 auto;

          span {
            display: block;
            width: 36px;
            height: 36px;
            border: 1px solid rgba(0,0,0,0.03);
            border-radius: 50%;
            margin: 0 auto;
            background: #eee;

            .icon {
              width: 20px;
              height: 20px;
              margin-top: 7px;
              margin-left: 7px;
              color: #fff;
            }
          }
          p {
            font-size: 12px;
            color: #2d2f33;
            letter-spacing: 0;
            text-align: center;
            margin-top: 8px;
          }

          &.question {
            span {
              background-image: linear-gradient(-135deg,#19a7ff 0%,#058aff 100%);
            }
          }
          &.bet {
            span {
              background-image: linear-gradient(-134deg, #14d4fa 0%, #05b0fa 100%);
            }
          }
          &.circle {
            span {
              background-image: linear-gradient(-135deg, #16de9b 0%, #0ccc76 100%);
            }
          }
          &.lineup {
            span {
              background-image: linear-gradient(-135deg, #6293f5 0%, #4b70eb 100%);
            }
          }
          &.trip {
            span {
              background-image: linear-gradient(-135deg, #ffc552 0%, #ffdc85 100%);
            }
          }
        }


      }


      .follow-btn {
        width: 240px;
        height: 32px;
        line-height: 30px;
        text-align: center;
        border: 1px solid #0d8dfc;
        border-radius: 16px;
        margin: 0 auto;
        font-size: 13px;
        color: #0d8dfc;
        cursor: pointer;

        &.active {
          color: #fff;
          background: #0d8dfc;
        }
      }
    }
  }

  .star_code_wrap {
    width: 216px;
    height: 330px;
    text-align: center;
    background: url(/static/images/star/star_code_score.png);
    background-size: cover;
    border-radius: 4px;
    padding: 115px 0 20px 0;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 12;

    .star_code_close {
      color: #fff;
      position: absolute;
      right: 8px;
      top: 8px;

      .iconfont {
        font-size: 14px;
      }
    }

    .star_code_img {
      width: 130px;
      height: 130px;
      margin-bottom: 20px;
    }

    .star_code_p {
      line-height: 20px;

      .star_code_name{}
    }

  }



</style>
