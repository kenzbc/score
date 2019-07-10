<template>
  <div>
    <div class="index_right_wrap">
      <h4 class="index_slide_title">
        <!--<i class="iconfont icon-remensaishi"></i>-->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-jingcaishipin"></use>
        </svg>
        短视频
        <a href="/v" class="index_slide_more gray_3 flr">更多</a>
      </h4>

      <ul class="index_right_video">
        <li v-if="dataList" v-for="item in dataList">
          <a :href="'/p/'+item.object_id">
            <div class="index_right_video_main">
              <img :src="item.image_url+'?x-oss-process=image/resize,m_fixed,h_170,w_300,limit_0'" width="100%">
              <span>{{item.play_time_string}}</span>
            </div>
            <p class="index_right_video_title">{{item.title}}</p>
          </a>
          <p class="index_right_video_info">
            <a :href="'/u/'+item.member_id" class="gray_3">{{item.member_nickname}}</a>
            <span class="gray_3 flr">{{item.play_count}}次播放</span>
          </p>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    components: {},
    data() {
      return {
      }
    },
    props:{
      dataList:{
        type: Array,
        default: ()=> []
      },
      limit:{
        type: Number,
        default: 5
      },
    },
    mounted() {


    },
    methods: {
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .index_right_wrap {
    width: 330px;
    background: #fff;
    box-shadow: 0 0 0 1px #ebebed;
    border-radius: 2px;
    margin-bottom: 14px;
  }
  .index_slide_title {
    width: calc(100% - 24px);
    line-height: 44px;
    font-size: 16px;
    border-bottom: 1px solid #f0f1f2;
    margin: 0 auto;
  }
  .index_slide_title .icon {
    width: 24px;
    height: 24px;
    margin: 10px 8px 0 0;
    float: left;
  }
  .index_slide_title .index_slide_more {
    font-size: 14px;
    font-weight: normal;
    color:#A8ABB3;
    float: right;
  }

  .index_right_video {
    padding: 10px 12px 4px 12px;

    li {
      margin-bottom: 10px;
    }
    .index_right_video_main {
      border-radius: 6px;
      overflow: hidden;
      position: relative;
      margin-bottom: 6px;

      span {
        color: #fff;
        font-size: 12px;
        position: absolute;
        right: 3%;
        bottom: 5%;
        z-index: 3;
      }
    }
    .index_right_video_main:before {
      content: "";
      width: 50px;
      height: 50px;
      background: url(/static/images/video/video-icon.png) no-repeat;
      background-size: 100% 100%;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
      z-index: 3;
    }
    .index_right_video_main:after {
      content: "";
      width: 100%;
      height: 100%;
      background-color: rgba(0,0,0,0.5);
      position: absolute;
      left: 0;
      top: 0;
      z-index: 2;
      transition: all 0.3s;
    }
    .index_right_video_title {
      width: 100%;
      height: 20px;
      line-height: 20px;
      overflow: hidden;
    }
    .index_right_video_info {
      line-height: 20px;
      font-size: 12px;
      color: #A8ABB3;

      a{
        color: #A8ABB3;
      }
    }

    .index_right_video_main img {
      display: block;
    }




  }













</style>
