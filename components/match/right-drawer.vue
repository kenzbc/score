<template>
  <div class="right-slide-drawer" :style="{'right':rightDrawer}">
    <div class="drawer-btn" @click="toggleRightDrawer">
      <i class="iconfont icon-general__arrow_left" :class="{'close' : rightDrawer == '0'}"></i>
    </div>

    <div class="slide-main" :class="{wide: showTab}">
      <div class="toggle-tab" v-show="!showTab">
        <div class="item" v-if="matchInfo.status == '2' && replayVideoList.length > 0 || splendidVideoList.length > 0"
             :class="{'active' : rightDrawerTab == 'video'}" @click="toggleDrawerTab('video')">视频回顾</div>
        <div class="item" :class="{'active' : rightDrawerTab == 'bet'}" @click="toggleDrawerTab('bet')">菠菜</div>
        <div class="item" v-if="photoList && photoList.length > 0" :class="{'active' : rightDrawerTab == 'photo'}" @click="toggleDrawerTab('photo')">图集</div>
        <div class="item" v-if="newsList && newsList.length > 0" :class="{'active' : rightDrawerTab == 'news'}" @click="toggleDrawerTab('news')">资讯</div>
        <div class="item" v-if="matchInfo.status == '1' && matchInfo.dynamic_id != '0'" :class="{'active' : rightDrawerTab == 'chat'}" @click="toggleDrawerTab('chat')">文字直播</div>
      </div>

      <!--视频-->
      <video-slide v-if="matchInfo.status == '2' && replayVideoList.length > 0 || splendidVideoList.length > 0" v-show="showTab || rightDrawerTab == 'video'"
                   :size="showTab ? '' : 'small'"
                   :replay-video-list="replayVideoList"
                   :splendid-video-list="splendidVideoList">
      </video-slide>
      <!--菠菜投注-->
      <bet-slide v-show="showTab || rightDrawerTab == 'bet'" :size="showTab ? 'small' : 'border'" :data-list="betList"></bet-slide>
      <!--图集-->
      <photo-slide v-if="photoList && photoList.length > 0" v-show="showTab || rightDrawerTab == 'photo'" :match-info="matchInfo" :size="showTab ? '' : 'small'" :border="false" :data-list="photoList"></photo-slide>
      <!--资讯-->
      <news-slide v-if="newsList && newsList.length > 0" v-show="showTab || rightDrawerTab == 'news'" :size="showTab ? 'small' : ''" :data-list="newsList"></news-slide>
      <!--聊天室-->
      <!--<chat v-if="matchInfo.status == '1' && matchInfo.dynamic_id != '0'" v-show="rightDrawerTab == 'chat'" :match-info="matchInfo" :tab-name="rightDrawerTab"></chat>-->
      <!--<chat-room v-if="matchInfo.status == '1' && matchInfo.dynamic_id != '0'" v-show="rightDrawerTab == 'chat'" :match-info="matchInfo" :tab-name="rightDrawerTab" ></chat-room>-->
    </div>
  </div>
</template>


<script>

  export default {
    name: 'rightSlideDrawer',
    components: {
    },
    props: {
      matchInfo: {
        type: Object,
        default: function () {
          return {};
        }
      },
      border: {
        type: Boolean,
        default: true
      },
      replayVideoList: {
        type: Array,
        default: ()=>[]
      },
      splendidVideoList: {
        type: Array,
        default: ()=>[]
      },
      betList: {
        type: Array,
        default: ()=>[]
      },
      photoList: {
        type: Array,
        default: ()=>[]
      },
      newsList: {
        type: Array,
        default: ()=>[]
      },
      dataList: {
        type: Array,
        default: ()=>[]
      },
      winWidth: {
        type: Number,
        default: 0
      }
    },
    data: function () {
      return {
        rightDrawer: '0', //右侧抽屉
        rightDrawerTab: '' //右侧抽屉默认Tab
      };
    },
    watch: {
      'matchInfo.matchID': function (val) {
        if (this.matchInfo.status == '0') this.rightDrawerTab = 'bet';
        if (this.matchInfo.status == '1' && this.matchInfo.dynamic_id != '0') this.rightDrawerTab = 'chat';
        if (this.matchInfo.status == '2') this.rightDrawerTab = 'video';
      }
    },
    computed: {
      showTab: function () {
        if (this.matchInfo.status == '1') return false;
        return this.winWidth > 1023;
      }
    },
    mounted() {
      this.rightDrawerTab = this.matchInfo.status == '1' && this.matchInfo.dynamic_id != '0' ? 'chat' : this.matchInfo.status == '2' ? 'video' : 'bet';
      console.log(this.rightDrawerTab);
    },
    methods: {
      toggleRightDrawer: function () {
        if (this.rightDrawer == '0') {
          this.rightDrawer = '-280px';
        } else {
          this.rightDrawer = '0';
        }
      },
      toggleDrawerTab: function (tab) {
        this.rightDrawerTab = tab;
      },
//      showTab: function (type) {
//        if (this.matchInfo.status != '1') return true;
//        return this.rightDrawerTab == type;
//      }
    }
  };
</script>
<style lang="stylus" scoped>
  .iconfont.close{
    display: inline-block;
    transform:rotate(180deg);
  }

  .right-slide-drawer {
    width: 330px;
    flex-shrink: 0;

    .drawer-btn {
      display none
    }

    .toggle-tab {
      display flex
      width: 100%
      height: 51px
      border-bottom 1px solid rgba(0, 0, 0, 0.06);
      background #fff
      flex-shrink 0
      align-items center
      padding-left 4px;
      .item {
        height: 26px;
        line-height 26px;
        text-align center;
        background: #F0F1F2;
        color: #656973;
        border-radius: 8px;
        font-size: 12px;
        font-family: 'PingFangSC-Medium';
        font-weight: 500;
        margin-left: 8px;
        cursor pointer;
        padding 0 10px

        &.active {
          background: #0D8DFC;
          color: #FFFFFF
        }
      }
    }

    .slide-main {
      width: 100%
      height: 100%
      background #fff
      box-shadow: 0 0 0 1px rgba(0,0,0,0.06);
      border-radius: 2px;
      .toggle-tab {
        &.show {
          display flex
        }
      }
      &.wide {
        background transparent
        box-shadow none
        .block {
          box-shadow: 0 0 0 1px rgba(0,0,0,0.06);
          + .block {
            margin-top 12px
          }
        }
      }
    }
  }



  /*320-767*/
  @media screen and (min-width: 320px) and (max-width: 767px) {
    .right-sidebar {
      width: 270px;
    }
  }
  /*768-1023*/
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    .right-slide-drawer {
      width 280px;
      height calc(100% - 101px);
      position fixed;
      z-index 10;
      background #fff;
      top: 101px;
      right 0;

      .drawer-btn {
        position absolute;
        z-index -1;
        top: 200px;
        left: -22px;
        width: 22px;
        height: 80px;
        background: #fff;
        box-shadow: 0px 4px 10px 0px rgba(0, 0, 0, 0.06), 0px 0px 0px 1px rgba(0, 0, 0, 0.04);
        border-radius: 10px 0px 0px 10px;
        display flex
        align-items center;
        justify-content center;
        cursor pointer;

        .iconfont {
          color: #A8ABB3;
        }
      }

      .slide-main {}
    }

  }
  /*1024-1129*/
  @media screen and (min-width: 1024px) and (max-width: 1129px) {
    .right-slide-drawer {
      width: 270px;
      flex-shrink: 0;
    }
  }
  /*1130-1410*/
  @media screen and (min-width: 1130px) and (max-width: 1410px) {
    .right-sidebar {
      width: 330px;
    }
  }

</style>
