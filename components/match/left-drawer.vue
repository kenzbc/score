<template>
  <div class="left-slide-drawer" :style="{'left':leftDrawer}">
    <div class="drawer-btn" @click="toggleLeftDrawer">
      <i class="iconfont icon-general__arrow_right" :class="{'close' : leftDrawer == '0'}"></i>
    </div>
    <div class="drawer-main">
      <left-schedule-slide
        size=""
        :match-info="matchInfo"
        :ji-fen-data="jiFenData"
        :schedule-list="scheduleList"
        :round-name.sync="matchInfo.round_name"
        @refresh-handler="updateRef"
        @change-schedule="changeSchedule"></left-schedule-slide>
    </div>
  </div>
</template>

<script>
  export default {
    name: "left-drawer",
    components: {},
    props:{
      border: {
        type: Boolean,
        default: true
      },
      matchInfo: {
        type: Object,
        default: ()=>{}
      },
      scheduleList: {
        type: Array,
        default: function () {
          return ()=>[]
        }
      },
      jiFenData: {
        type: Object,
        default: ()=>{}
      }
    },
    data: function () {
      return {
        leftDrawer: '-260px',//左侧抽屉
      }
    },
    mounted() {

    },
    methods: {
      toggleLeftDrawer () {
        if (this.leftDrawer == '0') {
          this.leftDrawer = '-260px';
        } else {
          this.leftDrawer = '0';
        }
      },
      updateRef (matchId) {
        this.$emit('refresh-handler', matchId);
      },
      changeSchedule (roundId) {
        this.$emit('change-schedule', roundId);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .left-slide-drawer {
    width 260px;
    flex-shrink: 0;
  }

  /*320-767*/
  @media screen and (min-width: 320px) and (max-width: 767px) {

  }

  /*768-1023*/
  @media screen and (min-width: 768px) and (max-width: 1023px) {

    .left-slide-drawer {
      display inline-block;
      width 260px;
      height 100%;
      position fixed;
      z-index 100;
      top:88px;
      left 0;

      .drawer-btn{
        position absolute;
        z-index -1;
        top: 200px;
        right:-22px;
        width:22px;
        height:80px;
        background:#fff;
        box-shadow:0px 4px 10px 0px rgba(0,0,0,0.06),0px 0px 0px 1px rgba(0,0,0,0.04);
        border-radius:0px 10px 10px 0px;
        display flex
        align-items center;
        justify-content center;
        cursor pointer;

        .iconfont{
          color: #A8ABB3;

          &.close{
            display: inline-block;
            transform: rotate(180deg);
          }
        }
      }

      .drawer-main{
        width 100%;
        height 100%;
        background:#fff;
        box-shadow:3px 3px 8px 0px rgba(0,0,0,0.04);
        position absolute;
        top:0;
      }



    }

  }

  /*1024-1129*/
  @media screen and (min-width: 1024px) and (max-width: 1129px) {

  }

  /*1130-1410*/
  @media screen and (min-width: 1130px) and (max-width: 1410px) {

    .left-slide-drawer {
      display inline-block;
      width 260px;
      height 100%;
      position fixed;
      z-index 100;
      top:88px;
      left 0;

      .drawer-btn{
        position absolute;
        z-index -1;
        top: 200px;
        right:-22px;
        width:22px;
        height:80px;
        background:#fff;
        box-shadow:0px 4px 10px 0px rgba(0,0,0,0.06),0px 0px 0px 1px rgba(0,0,0,0.04);
        border-radius:0px 10px 10px 0px;
        display flex
        align-items center;
        justify-content center;
        cursor pointer;

        .iconfont{
          color: #A8ABB3;

          &.close{
            display: inline-block;
            transform: rotate(180deg);
          }
        }
      }

      .drawer-main{
        width 100%;
        height 100%;
        background:#fff;
        box-shadow:3px 3px 8px 0px rgba(0,0,0,0.04);
        position absolute;
        top:0;
      }



    }
  }



</style>
