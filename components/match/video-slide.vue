<template>
  <div class="match-video-wrap block">
    <div class="match-video" v-if="size != 'small'">
      <h4 class="title">
        <div class="tab-nav">
          <span class="tab" :class="{'active' : videoTab == 'replay'}" @click="changeTab('replay')">比赛回放 <span class="line"></span></span>
          <span class="tab" :class="{'active' : videoTab == 'splendid'}" @click="changeTab('splendid')">精彩锦集 <span class="line"></span></span>
        </div>

        <div class="switch">
          <span class="video-prev swiper-button-prev"><i class="iconfont icon-general__arrow_left"></i></span>
          <span class="video-next swiper-button-next"><i class="iconfont icon-general__arrow_right"></i></span>
        </div>
      </h4>
      <div class="photo-list">
        <div class="swiper-container video-list-swiper">
          <div class="swiper-wrapper" :style="flexHeight">
            <div class="swiper-slide item" v-for="item in dataList" @click="playVideo(item.video_link)">
              <span class="video">
                <img class="photo" :src="item.image_url ? item.image_url : '/static/images/img_null.png'">
                <img class="video-icon" src="/static/images/video/video-icon.png">
              </span>
              <span class="text">{{item.title | stringEllipsis(18)}}</span>
            </div>
          </div>
        </div>
        <no-data v-if="dataList.length < 1"></no-data>
      </div>
    </div>


    <div class="match-video small" v-if="size == 'small'">
      <!--比赛回放-->
      <h4 class="title">
        <div class="tab-nav">
          <span class="tab">比赛回放 <span class="line"></span></span>
        </div>
      </h4>
      <div class="photo-list" :class="{'small' : size == 'small'}">

        <div class="video-slide" v-for="item in replayVideoList" @click="playVideo(item.video_link)">
          <span class="video">
            <img class="photo" :src="item.image_url ? item.image_url : '/images/index/img_null.png'">
            <img class="video-icon" src="/static/images/video/video-icon.png">
          </span>
          <span class="text">{{item.title | stringEllipsis(18)}}</span>
        </div>

        <no-data v-if="replayVideoList.length < 1"></no-data>
      </div>

      <!--竞猜集锦-->
      <h4 class="title">
        <div class="tab-nav">
          <span class="tab">精彩锦集 <span class="line"></span></span>
        </div>
      </h4>
      <div class="photo-list" :class="{'small' : size == 'small'}">

        <div class="video-slide" v-for="item in splendidVideoList" @click="playVideo(item.video_link)">
          <span class="video">
            <img class="photo" :src="item.image_url ? item.image_url : '/images/index/img_null.png'">
            <img class="video-icon" src="/static/images/video/video-icon.png">
          </span>
          <span class="text">{{item.title | stringEllipsis(18)}}</span>
        </div>

        <no-data v-if="replayVideoList.length < 1"></no-data>
      </div>
    </div>


    <video-modal
      :show="videoModalShow"
      :video-url="videoPlayUrl"
      @close="closeModal"></video-modal>
  </div>
</template>


<script>

  export default {
    name: 'video-slide',
    components:{
    },
    props:{
      size:{
        type: String,
        default: ''
      },
      replayVideoList:{
        type:Array,
        default:function () {
          return ()=>[];
        }
      },
      splendidVideoList:{
        type:Array,
        default:function () {
          return ()=>[];
        }
      }
    },
    data:function() {
      return {
        videoModalShow:false,//视频弹窗显示
        videoPlayUrl:'',//播放时传入的URL

        dataList:[],

        videoTab:'replay',
        videoSwiper:'',
        flexHeight:'height:630px;',
      }
    },
    computed:{

    },
    watch:{
      dataList(newVal,oldVal){
        if(Object.is(newVal,oldVal)){
        }
      },
      size(newVal, oldVal){
        this.initSwiper();
      }
    },
    mounted() {
      this.dataList = this.replayVideoList;
      this.initSwiper();
    },
    methods: {
      initSwiper(){
        var _this = this;
        /**延迟初始化Swiper**/
        setTimeout(function () {
          _this.videoSwiper = new Swiper('.video-list-swiper', {
            observer:true,
            observeParents:true,
            observeSlideChildren:true,
            slidesPerColumn : 3,
            slidesPerColumnFill : 'row',
            navigation: {
              nextEl: '.video-next',
              prevEl: '.video-prev',
            },
          });
          if(_this.dataList.length < 3){
            _this.flexHeight = 'height:'+ (_this.dataList.length * 210) + 'px;';
          }else{
            _this.flexHeight = 'height:640px;';
          }
        },0);
      },
      changeTab(type){
        this.videoTab = type;
        if(type == 'replay'){
          this.dataList = this.replayVideoList ? this.replayVideoList : [];
        }else{
          this.dataList = this.splendidVideoList ? this.splendidVideoList : [];
        }
        this.initSwiper();
      },
      playVideo(videoUrl){
        this.videoPlayUrl = videoUrl;
        this.videoModalShow = true;
      },
      closeModal(e){
        if(e==true){
          this.videoModalShow = false;
        }
      }
    }
  };
</script>
<style lang="stylus" scoped>

  .match-video{
    width:100%
    min-height:100px;
    background:rgba(255,255,255,1);
    border-radius:2px;

    &.border{
      box-shadow:0px 0px 0px 1px rgba(235,235,237,1);
    }

    .title{
      line-height: 40px;
      border-bottom: 1px solid #F0F1F2;
      position: relative;
      padding: 0 12px;
      display flex
      align-items center;
      justify-content space-between;

      .tab-nav{
        min-width: 160px;
        height 40px;
        .tab{
          display inline-block;
          height 40px;
          margin-right:7px;
          font-size:15px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:#A8ABB3;
          position relative;
          cursor pointer;

          &.active{
            color:#2D2F33;

            .line{
              width:36px;
              height:2px;
              background:#0D8DFC;
              position absolute;
              left:12px;
              bottom 0;
            }
          }


        }
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
      width 100%;
      padding:14px;
      padding-bottom:4px;

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
        }
      }

      .swiper-slide{
        display flex;
        flex-wrap wrap;

        .video{
          display flex;
          align-items center;
          justify-content center;
          width:100%;
          height:169px;
          position relative;
          cursor pointer;

          .photo{
            width 302px;
            height 169px;
          }

          .video-icon{
            width 80px;
            height 80px;
            position absolute;
            left:50%;
            top:50%;
            margin-left:-40px;
            margin-top:-40px;
          }
        }

        .text{
          width 100%;
          height: 40px;
          padding-top: 6px;
          font-size:16px;
          font-family:Industry-Bold;
          font-weight:bold;
          color:#2D2F33;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }


    }




    &.small{
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


        &.small{
          height: calc(100% - 141px);
          overflow: auto;
        }


        .video-slide {
          display flex;
          flex-wrap wrap;
        }
        .video{
          display flex;
          align-items center;
          justify-content center;
          width:100%;
          //height:169px;
          position relative;
          cursor pointer;

          .photo{
            width 100%;
          }

          .video-icon{
            width 80px;
            height 80px;
            position absolute;
            left:50%;
            top:50%;
            margin-left:-40px;
            margin-top:-40px;
          }
        }
        .text{
          height: 40px;
          padding-top: 6px;
          font-size:16px;
          font-family:Industry-Bold;
          font-weight:bold;
          color:#2D2F33;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

      }

    }


  }


  /*320-767*/
  @media screen and (min-width: 320px) and (max-width: 767px) {
    .match-video-wrap.block {
      overflow: auto;
      height: calc(100% - 60px);
    }
  }

  /*768-1023*/
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    .match-video-wrap.block {
      overflow: auto;
      height: calc(100% - 60px);

      .video-next{
        width 30px;
      }

    }
  }

  /*1024-1129*/
  @media screen and (min-width: 1024px) and (max-width: 1129px) {
    .match-video-wrap.block {

      .swiper-button-prev,.swiper-button-next{
        width 30px!important;
      }

    }
  }

  /*1130-1410*/
  @media screen and (min-width: 1130px) and (max-width: 1410px) {

  }
</style>
