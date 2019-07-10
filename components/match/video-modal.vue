<template>
  <div class="video-modal" v-if="show" @click="close">
    <div class="dialog-container" @click.stop>
      <div class="dialog-box">
        <div class="video-box">
          <iframe v-if="videoType == 'iframe'" width="860" height="485" :src="videoUrl" frameborder="0" allowfullscreen="allowfullscreen" id="match_video_iframe"></iframe>
          <video v-else width="860" height="485"
                 class="mejs__player"
                 id="match_video_mp4_from_mejs" autoplay="true" preload="auto" :poster="imageUrl" :src='videoUrl'></video>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "video-modal",
    components: {},
    props:{
      show:{
        type:Boolean,
        default:false
      },
      imageUrl:{
        type:String,
        default:''
      },
      videoUrl:{
        type:String,
        default:'https://v.qq.com/iframe/player.html?vid=k003057ef2d&amp;auto=0'
      }
    },
    head(){
      return{
        link: [
          {rel: 'stylesheet', href: '/static/lib/video/css/mediaelementplayer.css'},
        ],
        script: [
          {src: '/static/lib/video/mediaelement-and-player.js'},
        ],
      }
    },
    data:function() {
      return {
        videoType:'htm'
      }
    },
    watch:{
      show:function(newVal,oldVal){
        if (newVal === true) {
          if(this.videoUrl && this.videoUrl.match(/(\w+.mp4)|(\w+.m3u8)/)){
            this.videoType = 'media';
            setTimeout(function () {
              $('#match_video_mp4_from_mejs').mediaelementplayer({
                success: function (media) {
                }
              });
            },0);
          }else{
            this.videoType = 'iframe';
          }
        } else {

        }
      }
    },
    mounted() {

    },
    methods: {
      /**关闭图集弹层**/
      close:function(){
        this.$emit('close', true);
      },
    }
  }
</script>

<style lang="stylus" scoped>
  .video-modal {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;

    .dialog-container {
      max-width: inherit;
      width: 860px;
      height: 485px;
      margin-left: -430px;
      position: fixed;
      left: 50%;
      top: 50%;
      margin-top:-242px;
      z-index: 1000;
    }

    .dialog-box{
      width 860px;
      height: 485px;
      display flex;

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

      .video-box{
        width 100%;
        background: #000;
      }



    }


  }

</style>
