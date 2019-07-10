<template>
  <div id="badge-page" class="badge-page">

    <!--徽章轮播-->
    <div id="slide_modal" v-if="isBadgeSliderShow">
      <div class="close-btn" @click="closeBadgeSlider()">×</div>

      <div id="certify">
        <div class="swiper-container">
          <div class="swiper-wrapper">
            <div class="swiper-slide" v-for="item,index in badgeDetailList">
              <div class="slide-item">
                <div class="badge-img">
                  <img :src="item.image_url">
                  <div v-if="item.appid != 0" class="is-app">{{item.app_name}}</div>
                  <span v-if="item.is_have == 0" class="not-have-text"><i class="iconfont icon-password"></i></span>
                </div>
                <div class="badge-text">
                  <div class="title">
                    {{item.name}}
                    <span class="using" v-if="item.is_wear == 1">佩戴中</span>
                  </div>
                  <div class="desc">{{item.desc}} <a v-if="item.web_url" :href="item.web_url">活动详情</a></div>
                  <span class="condition">
                                <span class="bold">达成条件：</span>
                                <span class="font">{{item.string_up}} </span>
                            </span>
                  <span class="condition" v-if="item.type == 3">
                                活动时间：
                                <span class="font">{{item.need_string}}</span>
                            </span>
                  <span class="get-time">
                                <span class="have" v-if="item.get_time">
                                    <svg class="icon" aria-hidden="true">
                                        <use xlink:href="#icon-icongou"></use>
                                    </svg>
                                </span>
                                <span class="active bold" v-if="item.get_time">{{item.get_time | timestampToDate}} 达成</span>
                                <span v-else>尚未达成</span>
                            </span>
                  <div class="button use" v-if="item.is_have == 1 && item.is_wear == 0 && index == highestIndex" @click="useOrCancelBadge(item.id,0)">佩戴徽章</div>
                  <div class="button light-green" v-if="item.is_have == 1 && item.is_wear == 0 && index != highestIndex">{{item.string_up}}</div>
                  <div class="progress-tips" v-if="item.is_have == 0 &&item.type != 3">
                    <div class="runing" :style="'width:'+(item.need_value / item.params_value)*100+'%'"></div>
                    <span>{{item.need_string}}</span>
                  </div>
                  <div class="button cancel-use" v-if="item.is_have == 1 && item.is_wear == 1" @click="useOrCancelBadge(item.id,1)">取消佩戴</div>
                  <div class="button disable-use" v-if="item.is_have != 1 && item.type == 3">尚未达成</div>
                </div>
              </div>
              <div class="item-modal-bg"></div>
            </div>
          </div>
        </div>
        <div v-if="showSwiperType == '1'" class="swiper-pagination"></div>
        <div class="swiper-button-prev">
          <i class="iconfont">&#xe71a;</i>
        </div>
        <div class="swiper-button-next">
          <i class="iconfont">&#xe71b;</i>
        </div>
      </div>

    </div>

    <!--徽章-->
    <div class="badge-container">

      <div class="my-badge" v-for="item in badgeList">
        <div class="badge-type"><span class="line"></span>{{item.name}}（{{item.have_count}}/{{item.total_count}}）</div>
        <div class="badge-list">
          <div @click="showBadge(item.id)" class="badge-item" v-for="item in item.list">
            <div class="badge-img" >
                        <span class="like-heart">
                            <div class="heart-shape" :class="item.is_wear == '1' ? 'active' : ''"></div>
                        </span>
              <img :src="item.image_url">
              <div v-if="item.appid != 0" class="is-app">{{item.app_name}}</div>
              <div v-if="item.is_have == 0 && item.type != 3" class="no-have-shade"><i class="iconfont icon-password"></i></div>
            </div>
            <div class="badge-title">
                    <span class="title">
                        {{item.name}} <span v-if="item.type =='1'">&nbsp;Lv.{{item.grade}}</span>
                        <span class="using" v-if="item.is_wear == 1">佩戴中</span>
                    </span>
              <span class="desc">
                            <span class="bold">达成条件：</span>
                            {{item.string_up}}
                        </span>
              <span class="get-time">
                            <span class="have" v-if="item.is_have == 1">
                                <svg class="icon" aria-hidden="true">
                                    <use xlink:href="#icon-icongou"></use>
                                </svg>
                            </span>
                            <span class="active bold" v-if="item.is_have == 1">{{item.get_time | timestampToDate}} 达成</span>
                            <span class="getting-badge" v-if="item.type == 3 && item.is_have != 1 && isTimeRuning(item.activity_start_time,item.activity_end_time)">活动进行中</span>
                            <span v-if="item.is_have == 0 && item.type != 3">未达成</span>
                        </span>
            </div>
          </div>
        </div>

      </div>



      <div class="my-badge" style="display: none;" v-for="item in badgeList">
        <div class="badge-type"><span class="line"></span>{{item.name}}（{{item.have_count}}/{{item.total_count}}）</div>
        <div class="badge-list">
          <div @click="showBadge(item.id)" class="badge-item" v-for="item in item.list">
            <div class="badge-img" >
                    <span class="like-heart">
                        <div class="heart-shape" :class="item.is_wear == '1' ? 'active' : ''"></div>
                    </span>
              <img :src="item.image_url">
            </div>
            <div class="badge-title">
                    <span class="title">{{item.name}} Lv.{{item.grade}}
                        <span class="using">佩戴中</span>
                    </span>
              <span class="desc">达成条件：{{item.desc}} {{item.get_conditions}} 天</span>
              <span class="get-time">
                        <span class="have">
                            <svg class="icon" aria-hidden="true">
                                <use xlink:href="#icon-icongou"></use>
                            </svg>
                        </span>
                        <span class="active">达成</span>
                        <span>未达成</span>
                        <span class="getting-badge">活动进行中</span>
                    </span>
            </div>
          </div>
        </div>

      </div>



    </div>

  </div>
</template>

<script>
  import moment from 'moment'
  export default {
    name: "badge",
    middleware: 'user-auth',//本页面需要登录收起才可以访问
    components: {},
    data() {
      return {
        isLoading:true,
        badgeList: [],
        badgeDetailList:[],
        highestIndex:-1,
        isBadgeSliderShow:false,
        showSwiperType:'0',
        swiper:'',
        mockPrefix:'', //  /mock/25
      }
    },
    head() {
      return this.$seo(
        `徽章中心`,
        `徽章中心`,
        `徽章中心`
      );
    },
    filters: {
      /**
       * 时间戳转日期
       * @param ts
       * @returns {*}
       */
      timestampToDate: function (ts) {
        if(!ts){ return "" }
        return moment(Number(ts*1000)).format('YYYY-MM-DD');;
      }
    },
    watch: {
      swiper: {
        handler(newValue) {
          var mo = function(e){e.preventDefault();};

          if(newValue != ""){
            //禁止页面滑动
            document.body.style.overflow='hidden';
            document.addEventListener("touchmove",mo,false);
          }else{
            document.body.style.overflow='';
            document.removeEventListener("touchmove",mo,false);
          }

        },
        deep: true
      }
    },
    async asyncData() {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
      /*
    let res = await ({
      method: 'get',
      url: `/apiUrl.do?id=parameters`
    })
    return {
      dataList:res.data.list,
    }
    */
    },
    mounted() {
      this.getBadgeList();
    },
    methods: {
      /**
       * 获取徽章分类及列表
       * @param
       * @returns
       */
      async getBadgeList(){
        let res = await this.$api.badge.getBadgeList();
        this.badgeList = res.data.list;
      },
      closeBadgeSlider(){
        this.isBadgeSliderShow = false;
        this.swiper = '';
        this.badgeDetailList = [];
      },
      /**
       * 初始化徽章详情切换slide
       * @param
       * @returns
       */
      initialSlide: function(initialSlide){
        console.log(this.swiper);
        this.swiper = '';

        if(window.isMoblie) {
          this.swiper = new Swiper('#certify .swiper-container', {
            initialSlide:initialSlide,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            pagination: {
              el: '.swiper-pagination',
              clickable: true,
              renderBullet: function (index, className) {
                return '<span class="' + className + '">Lv.' + (index + 1) + '</span>';
              },
            },
          });
        }else{
          this.swiper = new Swiper('#certify .swiper-container', {
            initialSlide:initialSlide,
            watchSlidesProgress: true,
            slideToClickedSlide: true,
            slidesPerView: 'auto',
            centeredSlides: true,
            loop: false,
            loopedSlides: 1,
            autoplay: false,
            navigation: {
              nextEl: '.swiper-button-next',
              prevEl: '.swiper-button-prev',
            },
            pagination: {
              el: '.swiper-pagination',
              clickable :true,
              renderBullet: function (index, className) {
                return '<span class="' + className + '">Lv.' + (index + 1) + '</span>';
              },
            },
            on: {
              progress: function(progress) {
                for (let i = 0; i < this.slides.length; i++) {
                  var slide = this.slides.eq(i);
                  var slideProgress = this.slides[i].progress;
                  let modify = 1;
                  if (Math.abs(slideProgress) > 1) {
                    modify = (Math.abs(slideProgress) - 1) * 0.3 + 1;
                  }
                  let translate = slideProgress * modify * 60 + 'px';
                  let scale = 1 - Math.abs(slideProgress) / 6;
                  let zIndex = 999 - Math.abs(Math.round(10 * slideProgress));
                  slide.transform('translateX(' + translate + ') scale(' + scale + ')');
                  slide.css('zIndex', zIndex);
                  slide.css('opacity', 1);
                  if (Math.abs(slideProgress) > 1) {
                    slide.css('opacity', 0);
                  };
                }
              },
              setTransition: function(transition) {
                for (let i = 0; i < this.slides.length; i++) {
                  let slide = this.slides.eq(i);
                  slide.transition(transition);
                };

              }
            }

          })
        }

      },
      /**
       * 活动徽章 当前活动徽章是否正在进行中
       * @param startTimestamp
       * @param endTimestamp
       * @returns {boolean} true:进行中  false:未开始或已结束
       */
      isTimeRuning: function(startTimestamp, endTimestamp){
        var thisTimestamp = moment().unix();
        if (thisTimestamp >= startTimestamp && thisTimestamp <= endTimestamp) {
          return true;
        }else{
          return false;
        }
      },
      /**
       * 显示徽章 详情列表
       * @param badge_id 徽章id
       */
      async showBadge(badge_id) {
        let _this = this;
        let params = {
          badge_id:badge_id
        };

        let res = await this.$api.badge.getBadgeDetailList({params});
        let list = res.data.list;


        let highestIndex = '';
        for(var i=0;i<list.length;i++){
          if(list[i].is_have == 1){
            highestIndex = i;
          }
          _this.showSwiperType = list[i].type;
        }

        this.highestIndex = highestIndex;
        this.isBadgeSliderShow = true;
        this.$nextTick(() => {
          //初始化slide
          this.initialSlide(highestIndex);

        });
        this.badgeDetailList = res.data.list;

      },
      /**
       * 佩戴或取消佩戴徽章
       * @param badgeId 徽章id
       * @param type 0:佩戴，1:取消佩戴
       */
      async useOrCancelBadge(badgeId, type){

        let params = {
          badge_id: badgeId,
          type: type,
        };

        let res = await this.$api.badge.setUseBadge(params);
        this.isBadgeSliderShow = true;
        this.$nextTick(() => {
          this.getBadgeList();
          this.showBadge(badgeId);
        });

      },
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .badge-page{
    background #fff;
  }
  .new_main{
    margin-top:0;
    margin-bottom:0px;
    padding-bottom:150px;
    border-bottom 1px solid #EBEBED
    background #FFFFFF;
  }
  [v-cloak] {
    display: none
  }

  @font-face {
    font-family: "Lato-BlackItalic";
    src: url("/static/css/font/Lato-BlackItalic.ttf");
  }

  .bold{
    font-family:PingFangSC-Semibold;
    font-weight:600;
  }
  .close-btn{
    width: 60px;
    height: 60px;
    background: rgba(0,0,0,0.3);
    position: absolute;
    z-index 101;
    top: 50px;
    right: 50px;
    color: #fff;
    font-size: 54px;
    border-radius: 50%;
    cursor: pointer;
    line-height: 50px;
    text-align: center;
  }


  .badge-container {
    width 1008px;
    margin 0 auto;
    //background #d2d2d2;
    display table;
    position relative;

    .my-badge{
      margin-top:37px;
    }
    .my-badge:first-child{
      margin-top:40px;
    }

    .badge-type{
      padding-left 18px;
      font-size:20px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:#2D2F33;
      line-height:28px;

      .line{
        width:4px;
        height:16px;
        margin-right:6px;
        display inline-block;
        background:#0D8DFC;
      }
    }
    .badge-list{
      width 1008px;
      margin-top:18px;
      display flex
      flex-wrap wrap
    }


    .badge-item:hover{
      box-shadow:0px 8px 24px -4px rgba(0,0,0,0.14),0px 0px 0px 1px rgba(0,0,0,0.04);
      transition: all 0.5s;
    }
    .badge-item{
      width:234px;
      min-height:354px;
      margin-left 18px;
      margin-bottom 18px;
      background:#fff;
      box-shadow:0px 4px 22px -6px rgba(0,0,0,0.06),0px 0px 0px 1px rgba(0,0,0,0.04);
      border-radius:4px;
      transition: all 0.5s;

      .badge-img{
        position relative;
        width:234px;
        height:234px;
        padding:17px;
        background:linear-gradient(180deg,rgba(252,252,252,1) 0%,rgba(247,248,250,1) 100%);
        border-radius:6px 6px 0px 0px;
        text-align center


        .no-have-shade{
          width:234px;
          height:234px;
          line-height 234px;
          position absolute;
          left:0;
          top:0;
          background:linear-gradient(180deg,rgba(255,255,255,0.6) 0%,rgba(253,253,253,0.6) 100%);

          .iconfont{
            font-size 32px;
            color:#666;
          }
        }

        .is-app{
          position absolute;
          top:12px;
          left:0;
          width:75px;
          text-align center;
          height:22px;
          background:linear-gradient(90deg,#0D7EFF 0%,#0F97FF 100%);
          border-radius:0px 100px 100px 0px;
          font-size:12px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:#FFFFFF;
          line-height:22px;
        }

        .not-have-text{
          width:234px;
          height:234px;
          background:rgba(210,212,217,0.8);
          border-radius:8px 8px 0px 0px;
          display flex;
          justify-content center;
          align-items center;
          position absolute;
          top:0;
          left:0;
          font-size:30px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:rgba(255,255,255,1);
          line-height:42px;
        }



        .like-heart{
          display none;
          position absolute;
          z-index 10;
          width 20px;
          height 20px;
          top 12px;
          right 12px;
          cursor pointer
        }
        .like-heart:hover .heart-shape,.like-heart:hover .heart-shape:before,.like-heart:hover .heart-shape:after{
          background-color: red;
          -webkit-transition: all .3s ease-in-out;
          -moz-transition: all .3s ease-in-out;
          -ms-transition: all .3s ease-in-out;
          -o-transition: all .3s ease-in-out;
          transition: all .3s ease-in-out
        }


        .heart-shape{position:relative;width:10px;height:10px;border-radius:2px;transform:rotate(45deg);top:50%;left:50%;margin:-5px;}
        .heart-shape:before{content:'';position:absolute;width:10px;height:10px;border-radius:50%;top:0px;left:-5px;}
        .heart-shape:after{position:absolute;width:10px;height:10px;content:'';border-radius:50%;left:0px;top:-5px;}
        .heart-shape,.heart-shape:before,.heart-shape:after{
          background-color:#e8e8ea;
          -webkit-transition: all .3s ease-in-out;
          -moz-transition: all .3s ease-in-out;
          -ms-transition: all .3s ease-in-out;
          -o-transition: all .3s ease-in-out;
          transition: all .3s ease-in-out
        }
        .heart-shape.active,.heart-shape:before.active,.heart-shape:after.active{
          background-color:red;
        }



        img {
          max-width 200px;
          max-height 200px;
        }
      }
      .badge-title{
        width:234px;
        margin-top: 10px;
        padding:0 14px;

        .title{
          display flex;
          align-items center;
          font-size:18px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:#2D2F33;
          line-height:24px;

          .using{
            display inline-block;
            width:52px;
            height:18px;
            margin-left:6px;
            text-align center;
            background:#0D8DFC;
            border-radius:100px;
            font-size:12px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:#FFFFFF;
            line-height:17px;
          }

        }
        .desc{
          height 40px;
          margin-top: 6px;
          display block;
          font-size:14px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:#2D2F33;
          line-height:20px;
          overflow:hidden;

          text-overflow:ellipsis;
          display:-webkit-box;
          -webkit-box-orient:vertical;
          -webkit-line-clamp:2;
        }
        .get-time{
          margin-top: 8px;
          display block;
          font-size:14px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:#A8ABB3;
          line-height:20px;

          .active{
            color:#7FDE3E;
          }
          .have{
            display inline-block
            text-align center
            width:16px;
            height:16px;
            line-height 16px;
            border-radius:50%;
            background:linear-gradient(90deg,#74E87E 0%,#B1F073 100%);

            .icon{
              width 12px;
              height 10px;
              color:#fff;
            }
          }

          .getting-badge{
            display inline-block
            width:82px;
            height:24px;
            margin-bottom: 12px;
            background:linear-gradient(135deg,#FF4C6A 0%,#FF6B89 100%);
            border-radius:4px;
            line-height 24px;
            text-align center;
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:#FFFFFF;
          }
        }
        .get-time.active{
          color:#FFA621;
        }

      }
    }



  }


  #slide_modal{
    width 100%;
    height 100%;
    position: fixed;
    left:0;
    top:0;
    z-index 100;
    background:rgba(0,0,0,0.5);
  }
  #certify {
    position: relative;
    width: 980px;
    margin: 0 auto
    top:50%;
    margin-top:-320px;

    .swiper-container {
      padding-bottom: 60px;
    }
    >>> .swiper-slide {
      width:360px;
      min-height:554px;
      //box-shadow: 0 8px 30px #ddd;

      .slide-item{
        width:360px;
        background: #fff;
        border-radius:8px;
      }
      .item-modal-bg{
        background: rgba(0,0,0,0.3);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 20;
        border-radius: 4px;
      }

      .badge-img{
        width:360px;
        height:340px;
        line-height:340px;
        display flex;
        align-items center;
        background:linear-gradient(225deg,rgba(255,255,255,1) 0%,rgba(245,246,247,1) 100%);
        border-radius:8px 8px 0px 0px;
        position relative

        img{
          min-width 280px;
          max-width: 280px;
          max-height: 280px;
          display inline-block;
          margin:0 auto;
        }

        .is-app{
          position absolute;
          top:16px;
          left:0;
          width:112px;
          padding-left:8px;
          height:24px;
          background:linear-gradient(90deg,#0D7EFF 0%,#0F97FF 100%);
          border-radius:0px 100px 100px 0px;
          font-size:14px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:#FFFFFF;
          line-height:24px;
        }

        .not-have-text{
          width:360px;
          height:340px;
          background:rgba(210,212,217,0.8);
          border-radius:8px 8px 0px 0px;
          display flex;
          justify-content center;
          align-items center;
          position absolute;
          top:0;
          left:0;
          font-size:30px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:rgba(255,255,255,1);
          line-height:42px;

          .iconfont{
            font-size: 32px;
            color: #666;
          }
        }
      }

      .badge-text{
        width:360px;
        min-height:214px;
        padding:14px 24px;

        .title{
          display flex;
          align-items center;
          font-size:24px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:#2D2F33;
          line-height:33px;
          overflow:hidden;
          text-overflow:ellipsis;
          white-space:nowrap

          .using{
            display inline-block;
            width:52px;
            height:18px;
            margin-left:6px;
            text-align center;
            background:#0D8DFC;
            border-radius:100px;
            font-size:12px;
            font-family:PingFangSC-Semibold;
            font-weight:600;
            color:#FFFFFF;
            line-height:17px;
          }
        }
        .desc{
          height 30px;
          font-size:14px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:#A8ABB3;
          line-height:20px;
          border-bottom:1px solid #F0F1F2;

          a{
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:#4B9CE3;
            line-height:20px;
            float right
          }
        }
        .condition{
          margin-top: 9px;
          display block;
          font-size:15px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:#2D2F33;
          line-height:21px;

          .font{
            font-family:PingFangSC-Regular;
            font-weight:400;
          }
        }

        .get-time{
          margin-top: 8px;
          display block;
          font-size:14px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:#A8ABB3;
          line-height:20px;

          .active{
            color:#7FDE3E;
          }
          .have{
            display inline-block
            text-align center
            width:16px;
            height:16px;
            line-height 16px;
            border-radius:50%;
            background:linear-gradient(90deg,#74E87E 0%,#B1F073 100%);

            .icon{
              width 12px;
              height 10px;
              color:#fff;
            }
          }

          .getting-badge{
            display inline-block
            width:82px;
            height:24px;
            background:linear-gradient(135deg,#FF4C6A 0%,#FF6B89 100%);
            border-radius:4px;
            line-height 24px;
            text-align center;
            font-size:14px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:#FFFFFF;
          }
        }
        .get-time.active{
          color:#FFA621;
        }

        .button{
          width:320px;
          height:42px;
          margin 18px auto 0 auto;
          cursor pointer;
          border-radius:24px;
          font-size:16px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:#FFFFFF;
          line-height:42px;
          text-align center;
        }
        .button.use{
          background:#0D8DFC;
        }
        .button.cancel-use{
          background:#FF5C69;
        }
        .button.disable-use{
          background:#16DE9B;
        }
        .button.light-green{
          background:rgba(232,247,223,1);
          font-size:14px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:#89B172;
        }
        .progress-tips{
          width:320px;
          height:42px;
          margin 18px auto 0 auto;
          background:#F7F8FA;
          border-radius:21px;
          font-size:14px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:#656973;
          line-height:42px;
          text-align center;
          position relative;
          overflow hidden;

          .runing{
            position absolute;
            top:-40px;
            left:0px;
            width:0px;
            height:142px;
            background:linear-gradient(45deg,#E1E2E6 0%,#EBEBED 100%);
            border-radius:21px 0px 0px 21px;
            z-index 1;
            transform:rotate(7deg);
          }
          span{
            width:320px;
            height:42px;
            position absolute;
            top:0;
            left:0;
            z-index 2;
            display block;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap
          }
        }



      }

    }

    >>> .swiper-slide-active{
      .item-modal-bg{
        background: rgba(0,0,0,0);
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 20;
        border-radius: 4px;
        display none;
      }
    }





    >>> .swiper-slide p {
      line-height: 98px;
      padding-top: 0;
      text-align: center;
      color: #636363;
      font-size: 1.1em;
      margin: 0;
    }
    >>> .swiper-pagination {
      width: 100%;
      bottom: -65px;
      font-family: "Lato-BlackItalic";
      font-weight:normal;
    }
    >>> .swiper-pagination-bullets .swiper-pagination-bullet {
      width:62px;
      height:112px;
      font-size:24px;
      font-family:Lato-BlackItalic;
      font-weight:normal;
      color:#CCCCCC;
      line-height:39px;

      margin-right:24px;
      background-color: transparent;
      //border: 3px solid #fff;
      //background-color: #d5d5d5;
      //width: 30px;
      //height: 30px;
    }
    >>> .swiper-pagination-bullets .swiper-pagination-bullet-active {
      //border: 3px solid #00aadc;
      //background-color: #00aadc;
      color #fff;
      font-size:32px;
      background-color: transparent;
    }
    >>> .swiper-button-prev {
      left: -100px;
      top: 250px;
      width:62px;
      height:112px;
      background-image:none;
      /*background: url(https://www.swiper.com.cn/demo/certify/images/wm_button_icon.png) no-repeat;*/
      /*background-position: 0 0;*/
      /*background-size: 100%;*/

      i{
        color:rgba(255,255,255,.3);
        font-size:80px;
      }
    }
    >>> .swiper-button-prev:hover {
      /*background-position: 0 -46px;*/
      /*background-size: 100%*/
      i{
        color:rgba(255,255,255,1);
      }
    }
    >>> .swiper-button-next {
      right: -100px;
      top: 250px;
      width:62px;
      height:112px;
      background-image:none;
      /*background: url(https://www.swiper.com.cn/demo/certify/images/wm_button_icon.png) no-repeat;*/
      /*background-position: 0 -93px;*/
      /*background-size: 100%;*/
      i{
        color:rgba(255,255,255,.3);
        font-size:80px;
      }
    }
    >>> .swiper-button-next:hover {
      /*background-position: 0 -139px;*/
      /*background-size: 100%*/
      i{
        color:rgba(255,255,255,1);
      }
    }
  }




  @media screen and (max-width: 1024px) {

    .badge-container {
      width 100%;
      overflow-y scroll

      .badge-list{
        width 100%;
      }
    }

  }

  @media screen and (max-width: 600px) {

    .close-btn{
      width: 40px;
      height: 40px;
      background: rgba(0,0,0,0.3);
      position: absolute;
      z-index 101;
      top: 50px;
      right: 10px;
      color: #fff;
      font-size: 38px;
      border-radius: 50%;
      cursor: pointer;
      line-height: 33px;
      text-align: center;
    }


    #certify {
      position: relative;
      width: 100%;
      margin: 0 auto
      top: 50%;
      margin-top: -240px;


      .swiper-pagination-bullets .swiper-pagination-bullet{
        font-size: 22px;
      }

      .swiper-pagination {
        display: none;
      }

      .swiper-container {
        padding-bottom: 60px;
      }


      .swiper-slide {
        width: 270px;
        min-height: 254px;
        //box-shadow: 0 8px 30px #ddd;

        .slide-item{
          width 270px;
          margin: 0 auto;
          background: #fff;
          border-radius: 8px;
        }


        .badge-img {
          width: 270px;
          height: 240px;
          line-height: 240px;
          display flex;
          align-items center;
          background: linear-gradient(225deg, rgba(255, 255, 255, 1) 0%, rgba(245, 246, 247, 1) 100%);
          border-radius: 8px 8px 0px 0px;
          position relative


          .not-have-text{
            width: 270px;
            height: 240px;
          }
          img {
            min-width 220px;
            max-width: 220px;
            max-height: 220px;
            display inline-block;
            margin: 0 auto;
          }
        }

        .badge-text{
          width: 260px;

          .progress-tips{
            width: 100%;
            font-size: 12px;

            .runing{
              left: -80px;
            }
            span{
              width: 100%;
              display block;
              overflow:hidden;
              text-overflow:ellipsis;
              white-space:nowrap
            }
          }

          .button{
            width: 220px;
            height: 42px;
            background: #ff5c69;
            border-radius: 24px;
            margin: 18px auto 0 auto;
          }
        }
      }
    }


    .badge-container {
      width 100%;
      overflow-y scroll;

      .badge-list{
        width 100%;
        display flex
        justify-content space-evenly
      }
    }

  }
</style>
