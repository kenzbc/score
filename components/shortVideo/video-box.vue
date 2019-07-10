<template>
  <div>
    <div class="video-player-box"
         v-if="isMediaFile"
         @play="onPlayerPlay($event)"
         @pause="onPlayerPause($event)"
         @ready="playerReadied"
         @statechanged="playerStateChanged($event)"
         v-video-player:scoreVideo="playerOptions">
    </div>
    <iframe v-if="!isMediaFile && !isStop" :width="width" height="500" :src="src" frameborder="0" allowfullscreen="allowfullscreen"></iframe>
  </div>
</template>

<script>
  export default {
    props: {
      poster: {
        type: String,
        default: ''
      },
      src: {
        type: String,
        default: ''
      },
      isStop: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: '860'
      }
    },
    data() {
      return {}
    },
    computed: {
      playerOptions() {
        return {
          autoplay: false,
          loop: false,
          muted: false,
          preload: 'none', // 加载video元素后，不下载视频数据 (auto)
          language: 'zh-CN',
          playbackRates: [1.0, 1.5, 2.0],
          aspectRatio: '16:9',
          fluid: true,
          sources: [{
            type: "application/x-mpegURL",
            src: this.src
          }],
          poster: this.poster ? this.poster + '?x-oss-process=image/resize,m_fill,w_860,h_484,limit_0' : '',
          notSupportedMessage: '视频文件丢失啦，请稍后再试...'
        }
      },
      isMediaFile() {
        return (/.m3u8|.mp4$/).test(this.src)
      }
    },
    watch: {
      isStop(val) {
        if (this.scoreVideo && val) this.scoreVideo.pause()
      },
      isMediaFile(val) {
        if (this.scoreVideo && !val) {
          this.scoreVideo.dispose()
          this.scoreVideo = null
        }
      }
    },
    mounted() {
//     console.log(this.scoreVideo)
    },
    methods: {
      onPlayerPlay(e) {
//        console.log(e)
      },
      onPlayerPause(e) {
//        console.log(e)
      },
      playerReadied(e) {
//        console.log(e)
      },
      playerStateChanged(e) {
//        console.log(e)
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>


  @media screen and (max-width: 1200px) {

  }

  @media screen and (max-width: 768px) {

  }

  @media screen and (max-width: 600px) {

  }
</style>
