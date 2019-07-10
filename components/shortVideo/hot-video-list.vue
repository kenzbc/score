<template>
  <div class="v-hot-wrap">
    <h2 class="title">视频热榜</h2>
    <ul class="v-hot-list" v-if="hotData.length > 0">
      <li class="hot-item" v-for="(item, index) in hotData" :key="item.id">
        <div class="video-block">
          <nuxt-link class="video-layer" :to="`/p/${item.object_id}`" target="_blank"></nuxt-link>
          <img :src="(item.image_url || '//img1.famulei.com/common/images/index/img_null.png') + '?x-oss-process=image/resize,m_fill,w_300,h_169,limit_0'" alt="" />
          <p class="cl"><span class="fll">{{item.play_count || ''}}次播放</span><span class="flr">{{item.play_time_string || ''}}</span></p>
        </div>
        <h3 class="v-title"><a :href="'/p/' + item.object_id" target="_blank">{{item.title || ''}}</a></h3>
        <div class="from cl">
          <span class="fll">{{item.circle_name || ''}}</span>
          <span class="flr">{{item.dynamic_comment_count || 0}} 条评论</span>
        </div>
      </li>
    </ul>
    <div class="null-wrap" v-else>
      <no-data tip="暂无热点视频" :show="true" />
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {}
    },
    props: {
      hotData: {
        type: Array,
        default: []
      }
    },
    computed: {},
    fetch() {
      // 与 asyncData 方法类似，用于在渲染页面之前获取数据填充应用的状态树（store）。不同的是 fetch 方法不会设置组件的数据。
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
  .v-sidebar {
    width: 330px
  }
  .v-hot-wrap {
    width: 330px
    padding 0 15px
    background #fff
    box-shadow: 0 0 0 1px #EBEBED;
    border-radius: 2px;
    .title {
      height: 41px
      line-height 41px
      position relative
      font-size: 15px;
      color: #2D2F33;
      padding-left 10px
      border-bottom 1px solid #F0F1F2;
      &:before {
        display block
        content ''
        width: 4px
        height: 12px
        background: #0D8DFC;
        position absolute
        top 14px
        left 0
      }
    }
  }


  /*右侧栏视频列表*/
  .v-hot-list {
    padding 12px 0 16px
    .hot-item {
      +.hot-item {
        margin-top 12px
      }
    }
    .video-block {
      width: 100%;
      height: 169px;
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      .video-layer {
        display: block;
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        background-color: rgba(0,0,0,0.3);
        background-image: url('/static/images/video/video-icon.png');
        background-repeat: no-repeat;
        background-size: 60px;
        background-position: center;
        opacity: 0.7;
        transition: background-color 0.3s, opacity 0.3s;
        &:hover {
          opacity: 1;
          background-color: rgba(0,0,0,0);
        }
      }
      p {
        position absolute
        bottom 0
        width: 100%
        padding 6px 10px
        font-size 12px
        color #fff
        z-index 2
      }
    }
    .v-title {
      margin 6px 0
      font-size: 14px;
      color: #2D2F33;
    }
    .from {
      width 100%
      font-size: 12px;
      color: #A8ABB3;
      white-space nowrap
      span:nth-child(1) {
        max-width 70%
        overflow hidden
        text-overflow ellipsis
        color: #A8ABB3;
      }
    }
  }


  .null-wrap {
    width: 100%
    height: 300px
    position relative
  }

  @media screen and (max-width: 1200px) {

  }

  @media screen and (max-width: 768px) {

  }

  @media screen and (max-width: 600px) {

  }
</style>
