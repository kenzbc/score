<template>
  <div class="live-room">
    <ul class="live-game-list" v-if="gameList.length > 0">
      <li class="game-item" :class="{'playing': item.status == 0}" v-for="(item, index) in gameList" :key="index">
        <p class="game">GAME {{index + 1}}</p>
        <p class="game-win">{{item.status | getGameTextStatus}}</p>
      </li>
    </ul>
    <div class="live-video" ref="liveVideoWrap">
      <!--<span v-show="!videoSrc">暂无视频直播</span>-->
      <embed id="liveVideo" v-show="videoSrc" width="100%" height="100%" wmode="opaque" allowfullscreen="true" allowscriptaccess="always" :src="videoSrc" />
    </div>
    <live-data-menu :match-status="matchStatus" @change-tab-data="changeTabData" v-show="gameList.length > 0 && showMenu"></live-data-menu>
  </div>
</template>

<script>
  export default {
    name: 'live-room',
    components: {
    },
    props: {
      matchInfo: {
        type: Object,
        default: {}
      },
      showMenu: {
        type: Boolean,
        default: true
      }
    },
    data: function () {
      return {
        gameList: [],
        gameListApiTimer: null,
        interval: 5000,
        liveId: ''
      };
    },
    created() {
      this.liveId = scoreTools.getUrlParams('live_id');
      this.getLiveGameList();
    },
    watch: {
      videoSrc: function (val) {
        if (!!val) this.initVideo(val);
      },
      isShowLiveRoom: function (val) {
        if (val) {
          this.clearTimer();
        } else {
          this.getLiveGameList();
        }
      },
      'matchInfo.matchID': function (val) {
        this.clearTimer();
        if (this.matchInfo.status == '1') this.getLiveGameList();
      }
    },
    computed: {
      matchStatus: function () {
        return (this.matchInfo.status || '') + '';
      },
      matchId: function () {
        return this.matchInfo.matchID || '';
      },
      videoSrc: function () {
        return this.$root.$data.liveVideoSrc;
      },
      isMatchOver: function () {
        var result = this.gameList.every(function (item) {
          return item.status == 1;
        });
        if (this.gameList.length == 0) result = false;
        return result || this.matchStatus == '2';
      },
      isShowLiveRoom: function () {
        return this.$root.$data.review.show;
      }
    },
    mounted() {},
    methods: {
      initVideo: function (src) {
        var liveVideo = '<embed id="liveVideo" v-show="videoSrc" width="100%" height="100%" wmode="opaque" allowfullscreen="true" allowscriptaccess="always" src="' + src + '" />';
        this.$refs.liveVideoWrap.removeChild(document.getElementById('liveVideo'));
        $(this.$refs.liveVideoWrap).append(liveVideo);
      },
      changeTabData: function (index) {
        this.$emit('change-tab-data', index);
      },
      // 局数列表
      getLiveGameList: function () {
        var _this = this;
        var href = this.jsonHost + this.getEnvStr({dev: 'development'}) + '/lol/livedata/' + this.matchId + '.json';
//        var href = 'https://img1.famulei.com/lol/livedata/7151.json';
        if (this.liveId) href = 'https://img1.famulei.com/lol/livedata/' + this.liveId + '.json'; // 测试使用线上数据

        scoreTools.promiseAjax('GET', href).then(function (resp) {
          _this.gameList = resp.data || [];
//          _this.currGameIndex = _this.initGameIndex();
          _this.loopAjaxHandler(_this.getLiveGameList);
        }).catch(function (err) {
          console.log('error: ' + err.status);
          _this.gameList = [];
          _this.loopAjaxHandler(_this.getLiveGameList);
        });
      },
      initGameIndex: function () {
        var i = 0;
        this.gameList.forEach(function (item, index) {
          if (item.status == 0 || item.status == 1) {
            i = index;
          }
        });
        return i;
      },
      loopAjaxHandler: function (fn) {
        if (this.isMatchOver) return;
        this.gameListApiTimer = setTimeout(function () {
          fn();
        }, this.interval);
      },
      clearTimer: function () {
        if (this.gameListApiTimer) {
          clearTimeout(this.gameListApiTimer);
          this.gameListApiTimer = null;
        }
      }
    },
    filters: {
      getGameTextStatus: function (val) {
        return val == -1 ? '未开始' : val == 0 ? '进行中' : '已结束';
      }
    },
    destroyed() {
      this.clearTimer();
    }
  };
</script>

<style lang="stylus" scoped>
  .live-room {
    margin-top -1px;
    .live-video {
      width: 100%
      height: 416px
      background: #000;
    }
    .live-game-list {
      width: 100%;
      height: 50px;
      background: #fff;
      text-align: center;
      box-shadow: 0 0 0 1px #ebebed;
      border-radius 0 0 2px 2px;
      .game-item {
        display: inline-block;
        height: 100%;
        position: relative;
        //cursor: pointer;
        padding-top: 9px;
        color: #A8ABB3;
        + .game-item {
          margin-left 32px
        }
        &:after {
          display: none;
          content: '';
          position: absolute;
          left: calc(50% - 23px);
          bottom: 0;
          width: 46px;
          height: 3px;
          background: #0D8DFC;
          border-radius: 1px;
        }
        .game {
          font-family 'Industry-Bold'
          font-size 15px
        }
        .game-win {
          //font-family 'Industry-Demi'
          font-size 12px
          margin-top 5px
        }
        &.playing {
          .game {
            color #2D2F33
          }
          .game-win {
            color #0D8DFC
          }
          &:after {
            display block
          }
        }
      }
    }
  }
</style>
