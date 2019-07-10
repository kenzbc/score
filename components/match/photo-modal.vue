<template>
  <div class="photo-modal" v-if="show">
    <div class="dialog-container">
      <div class="dialog-box">
        <div class="img-swiper">
          <span class="close" @click="close"><i class="iconfont icon-quxiao"></i></span>
          <div class="swiper-container photo-modal-swiper">
            <div class="swiper-wrapper">
              <div class="swiper-slide" v-for="item in dataList">
                <img class="photo" :src="item.image_url">
              </div>
            </div>
            <div class="pm-prev"><i class="iconfont icon-general__arrow_left"></i></div>
            <div class="pm-next"><i class="iconfont icon-general__arrow_right"></i></div>
          </div>
          <div class="swiper-index-text"></div>
        </div>
        <div class="img-comments"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "photo-modal",
    props:{
      show:{
        type:Boolean,
        default:false
      },
      initIndex:{
        type:Number,
        default:0
      },
      dataList:{
        type:Array,
        default:function () {
          return [];
        }
      }
    },
    data:function() {
      return {
        photoModalShow:false,//图集弹窗显示
        photoInitIndex:0,//图集弹窗默认显示第几张图



        thisIndex:0,
        photoSwiper:'',
        photoList:[], //图集数据
      }
    },
    watch:{
      show(newVal,oldVal){
        if(newVal == true){
          var _this = this;
          /**延迟初始化Swiper**/
          setTimeout(function () {
            new Swiper('.photo-modal-swiper', {
              initialSlide: _this.initIndex,
              navigation: {
                nextEl: '.pm-next',
                prevEl: '.pm-prev',
              },
              pagination: {
                el: '.swiper-index-text',
                type: 'fraction',
                renderFraction: function (currentClass, totalClass) {
                  return '<span class="' + currentClass + '"></span>' +
                    ' / ' +
                    '<span class="' + totalClass + '"></span>';
                },
              },
            })
          },10);
        }
      }
    },
    mounted() {

    },
    methods: {
      /**关闭图集弹层**/
      close:function(){
        this.$emit('close',true);
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .photo-modal {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;

    .dialog-container {
      transform: translate(-50%, -50%);
      position: absolute;
      top: 50%;
      left: 50%;

    }

    .dialog-box{
      width 1180px;
      display flex;

      .img-swiper{
        width 900px;
        height 740px;
        line-height 740px;
        overflow hidden;
        background: #000;
        position: relative;

        .close{
          width 24px;
          height 24px;
          line-height initial;
          color #fff;
          position:absolute;
          top:33px;
          right:33px;
          cursor pointer;
          z-index 10;
        }

        .pm-next, .pm-prev {
          position: absolute;
          top: 50%;
          width: 27px;
          height: 44px;
          line-height: initial;
          margin-top: -22px;
          left: 20px;
          z-index: 10;
          cursor: pointer;
          -moz-background-size: 27px 44px;
          -webkit-background-size: 27px 44px;
          background-size: 27px 44px;
          background-position: center;
          background-repeat: no-repeat;

          .iconfont{
            font-family:PingFangSC-Regular;
            color #fff;
            font-size 48px;
          }
        }
        .pm-next.swiper-button-disabled, .pm-prev.swiper-button-disabled {
          opacity: .35;
          cursor: auto;
          pointer-events: none;
        }
        .pm-next, .swiper-container-rtl .pm-prev {
          right: 40px;
          left: auto;
        }

        .swiper-slide{
          text-align center;

          .photo{
            margin:0 auto;
            max-width 100%;
            max-height 740px;
          }
        }

        .swiper-index-text{
          position absolute;
          left:50%;
          margin-left:-45px;
          bottom:10px;
          z-index 10;
          width:90px;
          height:28px;
          line-height 28px;
          background:rgba(0,0,0,0.5);
          border-radius:14px;
          text-align center;
          font-size:14px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:#FFFFFF;
        }
      }
      .img-comments{
        width 380px;
        height 740px;
        background: #fff;
      }


    }


  }
  /*768-1023*/
  @media screen and (max-width: 1000px) {

    .photo-modal {

      .dialog-box {
        width: 100%;
        display: flex;

        .img-swiper {

          .close {
            width: 32px;
            height: 32px;
            line-height: initial;
            color: #fff;
            position: absolute;
            top: 53px;
            right: 33px;
            cursor: pointer;
            z-index: 10;

            .iconfont{
              font-size:32px;
            }
          }
        }
      }
    }

    .img-comments{
      display none;
    }
  }

</style>
