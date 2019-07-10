<template>
  <!--音频-->
  <div class="list-items-radio" ref="listItemsRadio" v-if="show">
    <div class="cubeshape" ref="cubeshape">
      <div class="item-cube items-radio-first" @click="playAudio">
        <div class="radio-left">
          <i class="iconfont radio-icon icon-general__voice"></i>
          <span class="radio-text">点击收听</span>
        </div>
        <div class="radio-right">{{seconds}}"</div>
      </div>
      <div class="item-cube items-radio-second" @click="resetPlay" :data-video_id="url">
        <audio class="audio-play" :src="url" preload="auto"></audio>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "audio-box",
    components: {},
    props:{
      show: {
        type: Boolean,
        default: false
      },
      seconds: {
        type: String,
        default: '00:00'
      },
      url: {
        type: String,
        default: ''
      },
    },
    head () {
      return {
        script: [
          {src: '/static/lib/audio.min.js'},
        ],
      }
    },
    data() {
      return {
        currAudioWrapper:''
      }
    },
    watch:{
      show(newVal, oldVal){
      }
    },
    mounted() {
      this.initAudiosJs();
    },
    methods: {
      initAudiosJs(){
        setTimeout(()=> {
          // 帖子音频播放
          audiojs.events.ready(function () {
            audiojs.createAll();
          });
        }, 0);
      },
      playAudio(e){
        var wrapper = this.$refs.cubeshape;
        if (this.currAudioWrapper) {
          if ($(this.currAudioWrapper).find('.audiojs').hasClass('playing')) {
            $(this.currAudioWrapper).find('.audiojs').removeClass('playing error loading');
            $(this.currAudioWrapper).find('.play-pause .pause').click();
          }
          $(this.currAudioWrapper).removeClass('turn');
          $(this.currAudioWrapper).find('.audio-play').attr('src', this.url);
          $(this.currAudioWrapper).find('.progress').css('width', '0%');
          this.currAudioWrapper = null;
        }

        $(wrapper).addClass('rotate turn');
        $(wrapper).find('.play-pause .play').click();

        setTimeout(()=> {
          $(wrapper).removeClass('rotate');
          this.currAudioWrapper = wrapper;
        }, 300);
      },
      resetPlay(e){
        var self = $(e.target);
        if (self.parent().hasClass('playing')) {
          self.parent().removeClass('playing error loading');
          self.siblings('.play-pause').find('.pause').click();
          self.parent().find('.progress').css('width', '0%');
          self.parent().find('.audio-play').attr('src', this.url);
          self.parents('.cubeshape').removeClass('turn').addClass('rotate');
        }

        setTimeout(function () {
          self.parents('.cubeshape').removeClass('rotate');
        }, 300);
      },
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  /* 音频部分显示*/
  .list-items-radio{
    cursor pointer
    margin-top: 10px
    width: 328px
    height:60px
    border-radius: 8px;

    .cubeshape {
      width: 100%;
      height: 60px;
      position relative

      .item-cube {
        display flex;
        justify-content space-between;
        align-items flex-start;
        position: absolute;
        width: 100%
        height: 100%
        background: url("/static/images/banner/audio-bg.png") no-repeat;
        background-size: 100% 100%
        transition opacity .3s, z-index .3s, visibility .3s;


        &.items-radio-first {
          z-index 1
          visibility visible
          opacity 1

          .radio-left{
            margin:15px 0 0 16px

            .radio-icon{
              font-size: 13px
              color: #fff
            }
            .radio-text{
              margin-top: 16px
              margin-left: 9px
              font-size: 14px;
              color: #FFFFFF;
            }
          }
          .radio-right{
            margin-top: 14px
            margin-right: 20px
            font-size: 14px;
            line-height: 20px
            color: #FFFFFF;
          }
        }
        &.items-radio-second {
          z-index -1
          visibility hidden
          opacity 0

          .items-radio-left {
            margin:15px 0 0 16px

            .icon-player{
              font-size 12px
              color: #fff
            }
          }
          .items-radio-right{}
        }
      }

      &.turn {
        .item-cube {
          &.items-radio-first {
            z-index -1
            visibility hidden
            opacity 0
          }
          &.items-radio-second {
            z-index 1
            visibility visible
            opacity 1
          }
        }
      }

      &.rotate {
        animation: rotate-y 0.3s;
      }
    }

    >>> .audiojs {
      width: 98%

      .play-pause {
        margin-top: 4px;
      }
      .scrubber {
        width: 60%
      }
      .reset-play {
        right 21%
      }
    }
  }

  //语音翻转
  @keyframes rotate-y {
    50% {
      transform: scaleY(0);
    }
    100% {
      transform: scaleY(1);
    }
  }
</style>
