<template>
  <div class="list-items-radio">
    <div class="cubeshape">
      <div class="item-cube items-radio-first flex justify_between align_center">
        <div class="radio-left">
          <i class="iconfont radio-icon icon-general__voice"></i>
          <span class="radio-text">点击收听</span>
        </div>
        <div class="radio-right">{{detail.seconds}}"</div>
      </div>
      <div class="item-cube items-radio-second cl">
        <div class="audiojs" classname="audiojs" :title="detail.audio_title">
          <audio class="audio-play" :src="detail.audio_url" preload="auto"></audio>
          <div class="play-pause">
            <p class="play"><i class="iconfont icon-radio icon-bofang"></i></p>
            <p class="pause"><i class="iconfont icon-radio icon-pause"></i></p>
            <p style="display: none;" class="loading"></p>
            <p class="error"></p>
          </div>
          <div class="scrubber">
            <div class="progress" style="width: 0%;"></div>
            <div class="loaded" style="width: 100%;"></div>
          </div>
          <div class="reset-play"></div>
          <div class="time">
            <em class="played">00:00</em>
            <strong style="display: none;" class="duration">02:11</strong>
          </div>
          <div class="error-message">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  //音频帖子
  export default {
    name: "sound-detail",
    components: {},
    props:{
      detail:{
        type: Object,
        default: ()=>{}
      }
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {},
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .list-items-radio {
    cursor: pointer;
    margin-top: 10px;
    width: 328px;
    height: 60px;
    border-radius: 8px;

    .cubeshape {
      width: 100%;
      height: 60px;
      position: relative;

      .item-cube {
        display flex
        justify-content space-between
        align-items center;
        position: absolute;
        width: 100%;
        height: 100%;
        background: url(/images/dynamic/radio.png) no-repeat;
        background-size: 100% 100%;
        transition: opacity 0.3s,z-index 0.3s,visibility 0.3s;



        &.items-radio-first {

          .radio-left {
            margin: -14px 0 0 16px;

            .radio-icon {
              font-size: 13px;
              color: #fff;
            }
            .radio-text {
              margin-top: 16px;
              margin-left: 9px;
              font-size: 14px;
              color: #fff;
            }
          }
          .radio-right {
            margin-top: -14px;
            margin-right: 20px;
            font-size: 14px;
            line-height: 20px;
            color: #fff;
          }
        }

        &.items-radio-second {
          z-index: -1;
          visibility: hidden;
          opacity: 0;
        }


        .audiojs {
          width: 98%;
          height: 36px;
          overflow: hidden;
          font-size: 12px;

          p {
            display: none;
            width: 25px;
            height: 30px;
            margin: 0px;
            cursor: pointer;
            text-align: center;
          }

          audio {
            position: absolute;
            left: -1px;
          }
          .play-pause {
            margin-top: 2px;
            width: 25px;
            height: 30px;
            padding: 4px 6px;
            margin-left: 4px;
            float: left;
            overflow: hidden;
            line-height: 30px;
            text-align: center;

            p {
              line-height: 34px;
              font-size: 17px;
              margin-bottom: 17px;
            }
          }
          .play {
            .icon-radio {
              font-size: 14px;
              color: #fff;
            }
          }


          .scrubber {
            position: relative;
            float: left;
            width: 188px;
            height: 2px;
            margin: 22px 0 0 8px;
            border-left: 0px;
            border-bottom: 0px;
            overflow: hidden;
          }
          .progress {
            position: absolute;
            top: 0px;
            left: 0px;
            height: 2px;
            width: 0px;
            background: #fff;
            z-index: 1;
          }
          .loaded {
            position: absolute;
            top: 0px;
            left: 0px;
            height: 2px;
            width: 0px;
            background: #3CA3FF;
          }
          .reset-play {
            position: absolute;
            height: 12px;
            width: 12px;
            background: #fff;
            border-radius: 4px;
            top: 17px;
            right: 21%;
          }
          .time {
            float: right;
            height: 36px;
            line-height: 36px;
            margin: 0px 0px 0px 6px;
            color: #fff;
            margin-top: 4px;
            margin-right: 12px;

            em {
              color: #fff;
              font-style: normal;
              font-size: 14px;
            }
            strong {
              padding: 0px 0px 0px 2px;
              font-weight: normal;
              color: #0D8DFC;
            }

          }
          .error-message {
            float: left;
            display: none;
            margin: 0px 10px;
            height: 36px;
            width: 400px;
            overflow: hidden;
            line-height: 36px;
            white-space: nowrap;
            color: #fff;
            text-overflow: ellipsis;
            -o-text-overflow: ellipsis;
            -icab-text-overflow: ellipsis;
            -khtml-text-overflow: ellipsis;
            -moz-text-overflow: ellipsis;
            -webkit-text-overflow: ellipsis;
          }
        }

      }

    }
  }

</style>
