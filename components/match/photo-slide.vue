
<template>
  <div class="match-photo-wrap block">
    <div class="match-photo border" v-if="size != 'small'">
      <h4 class="title">
        图集
        <div class="switch">
          <span class="photo-prev swiper-button-prev"><i class="iconfont icon-general__arrow_left"></i></span>
          <span class="photo-next swiper-button-next"><i class="iconfont icon-general__arrow_right"></i></span>
        </div>
      </h4>
      <div class="photo-list">
        <div class="swiper-container photo-list-swiper">
          <div class="swiper-wrapper" :style="flexHeight">
            <div class="swiper-slide item" v-for="item,index in dataList" @click="showPhotoModal(index)">
              <img class="photo" :src="item.image_url1">
            </div>
          </div>
        </div>

        <no-data v-if="dataList.length < 1"></no-data>
      </div>
    </div>

    <div class="match-photo" v-if="size == 'small'">
      <h4 class="title">
        图集
      </h4>
      <div class="photo-list small">
        <div class="photo-slide" v-for="item,index in dataList" @click="showPhotoModal(index)">
          <img class="photo" :src="item.image_url1">
        </div>

        <no-data v-if="dataList.length < 1"></no-data>
      </div>
    </div>



    <photo-modal
      :show="photoModalShow"
      :init-index="photoInitIndex"
      :match-info="matchInfo"
      :data-list="dataList"
      @close="closeModal"></photo-modal>

  </div>
</template>


<script>
  export default {
    name: "photo-slide",
    components:{
    },
    props:{
      size:{
        type: String,
        default: ''
      },
      matchInfo:{
        type:Object,
        default:function () {
          return {};
        }
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
        flexHeight:'height:630px;',
        photoSwiper:'',
      }
    },
    watch:{
      dataList(newVal,oldVal){
        if(!Object.is(newVal,oldVal)){

        }
      },
      size(newVal, oldVal){
        this.initSwiper();
      }
    },
    mounted() {
      this.initSwiper();
    },
    methods: {
      initSwiper:function(){
        var _this = this;
        /**延迟初始化Swiper**/
        setTimeout(function () {
          _this.photoSwiper = new Swiper('.photo-list-swiper', {
            slidesPerColumn : 3,
            slidesPerColumnFill : 'row',
            navigation: {
              nextEl: '.photo-next',
              prevEl: '.photo-prev',
            },
          });

          if(_this.dataList.length < 3){
            _this.flexHeight = 'height:'+ (_this.dataList.length * 210) + 'px;';
          }

        },500);
      },
      showPhotoModal(photoIndex){
        this.photoModalShow = true;
        this.photoInitIndex = photoIndex;
      },
      closeModal(e){
        if(e==true){
          this.photoModalShow = false;
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>

  .match-photo{
    width: 100%;
    min-height:100px;
    background:rgba(255,255,255,1);
    border-radius:2px;

    .title{
      line-height: 40px;
      border-bottom: 1px solid #F0F1F2;
      position: relative;
      margin: 0 12px;
      padding-left: 14px;
      font-size:15px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:#2D2F33;
      display flex
      align-items center;
      justify-content space-between;

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

      .switch{
        width 120px;
        display flex
        align-items center;
        justify-content space-between;

        .prev,.next{
          background-image none;
          display inline-block;
          right: inherit;
          left: inherit;
          width:40px;
          height:24px;
          line-height 20px;
          text-align center;
          border-radius:14px;
          border:1px solid rgba(240,241,242,1);
          color #A8ABB3;
          font-size 12px;
          font-weight normal;
          cursor pointer;
        }
        .swiper-button-next, .swiper-button-prev {
          width:40px;
          height:24px;
          line-height 20px;
          text-align center;
          border-radius:14px;
          border:1px solid #F0F1F2;
          position: relative;
          margin-top initial;
          background-image none;
          color #A8ABB3;
          font-size 12px;
          font-weight normal;
          cursor pointer;
        }
      }


    }
    .photo-list{
      width: 100%;
      padding: 14px;
      padding-bottom: 4px;

      .swiper-wrapper{
        height: 630px;
        display: flex;
        flex-direction: column;
        flex-wrap: wrap;
        align-content: flex-start;

        .item{
          color: #fff;
          height: 210px;
          flex-shrink: 0;
          text-align: center;
          line-height: 200px;
        }
      }

      &.small{
        height: calc(100% - 141px);
        overflow: auto;
      }

      .photo{
        width 100%;
        max-width: 300px;
        height 200px;
        margin-bottom:10px;
        cursor pointer;
      }

    }

  }



  /*320-767*/
  @media screen and (min-width: 320px) and (max-width: 767px) {
    .match-photo-wrap.block {
      overflow: auto;
      height: calc(100% - 60px);
    }
  }

  /*768-1023*/
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    .match-photo-wrap.block {
      overflow: auto;
      height: calc(100% - 60px);
    }
  }

  /*1024-1129*/
  @media screen and (min-width: 1024px) and (max-width: 1129px) {

  }

  /*1130-1410*/
  @media screen and (min-width: 1130px) and (max-width: 1410px) {

  }
</style>
