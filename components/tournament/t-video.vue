<template>
  <div class="piece t-video-wrap">
    <piece-header title="赛事视频">
      <div class="header-bg-line"></div>
      <ul class="menu cl">
        <li class="m-item-wrap" v-for="(item, index) in pieceHeaderMenu.list" :key="index" @click="toggleMenu(item.type, index)">
          <span class="m-item" :class="{active: pieceHeaderMenu.currIndex == index}">{{item.name}}<svg class="icon" aria-hidden="true"><use xlink:href="#icon-circle_blue"></use></svg></span>
        </li>
      </ul>
      <div class="t-pagination flr">
        <div class="arrow-btn prev" :class="{disabled: params.page === 1 || video.count === 0}" @click="prevPage"><i class="iconfont icon-general__arrow_left"></i></div>
        <div class="arrow-btn next" :class="{disabled: params.page === pages || video.count === 0}" @click="nextPage"><i class="iconfont icon-general__arrow_right"></i></div>
      </div>
    </piece-header>
    <div class="piece-main">
      <ul class="video-list cl" v-if="video.count > 0">
        <li class="v-item" v-for="(item, index) in video.list" :key="index" @click="videoPlay(item.image_url, item.video_link)">
          <div class="video-block">
            <div class="inner-block" :style="'background-image: url(' + item.image_url | catImg(224, 126) + ')'">
              <div class="video-layer"></div>
            </div>
          </div>
          <h3 class="v-title">{{item.title || ''}}</h3>
        </li>
      </ul>
      <no-data v-else :show="true" tip="暂无视频" />

      <!--视频播放器弹层-->
      <modal-mask bg-color="rgba(0,0,0, 0.5)" :show="maskShow" :maskShow.sync="maskShow" v-if="video.count > 0">
        <div class="video-box" v-if="video.play.src">
          <video-box :poster="video.play.poster" :src="video.play.src" :is-stop="!maskShow" />
        </div>
      </modal-mask>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      videoData: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        video: {
          count: this.videoData.match_video_count || 0,
          list: [].concat(this.videoData.match_video_list || []),
          play: {
            poster: '',
            src: ''
          }
        },
        pieceHeaderMenu: {
          currIndex: 0,
          list: [
            {type: 1, name: '三分钟速看'},
            {type: 2, name: '全场回顾'}
          ]
        },
        params: {
          tournamentID: this.$route.params.id,
          type: 1,
          page: 1
        },
        limit: 8,
        maskShow: false,
        defaultPic: '//img1.famulei.com/common/images/index/img_null.png'
      }
    },
    computed: {
      // 赛事ID
      tournamentId() {
        return this.$route.params.id
      },
      // 视频页数
      pages() {
        return Math.ceil(this.video.count / this.limit)
      }
    },
    methods: {
      // 头部菜单切换
      async toggleMenu(type, i) {
        if (this.pieceHeaderMenu.currIndex === i) return
        this.pieceHeaderMenu.currIndex = i
        this.params.type = type
        this.params.page = 1
        this.getVideoList()
      },
      // 上一页
      prevPage() {
        if (this.params.page > 1) this.params.page--
        this.getVideoList()
      },
      // 下一页
      nextPage() {
        if (this.params.page < this.pages) this.params.page++
        this.getVideoList()
      },
      // 获取视频数据
      async getVideoList() {
        let data = (await this.$api.video.tournamentVideoList({params: this.params})).data || {}
        console.log(data)
        this.video.list = data.match_video_list || []
      },
      // 视频弹层播放
      videoPlay(poster, src) {
        this.video.play.poster = poster || ''
        this.video.play.src = src || ''
        this.maskShow = true
      }
    },
    mounted() {
//      console.log(this.params)
    }
  }
</script>

<style lang="stylus">
  .t-video-wrap {
    .video-box {
      width: w = 860px
      height: h = 484px
      position fixed
      top: 50%
      left: 50%
      margin-left -(w / 2)
      margin-top -(h / 2)
      z-index 200
    }
    .t-pagination {
      margin-top: 12px;
      margin-right: 20px;
    }
    .piece-header {
      .menu {
        .m-item-wrap {
          width: 164px
        }
      }
    }
    .piece-main {
      width: 100%
      height: 408px
      position relative
    }

    .video-list {
      width: 100%
      padding 10px 19px
    }
    .video-block {
      width: 100%;
      height: 126px;
      margin 0 auto
      border-radius: 4px;
      overflow: hidden;
      position: relative;
      background-image: url('//img1.famulei.com/common/images/index/img_null.png');
      background-repeat: no-repeat;
      background-size: cover;
      background-position: center;
      .inner-block {
        width: 100%
        height: 100%
        background-repeat: no-repeat;
        background-size: cover;
        background-position: center;
      }
      .video-layer {
        position: absolute;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        z-index: 1;
        background-color: rgba(0,0,0,0);
        background-image: url('/static/images/video/video-icon.png');
        background-repeat: no-repeat;
        background-size: 60px;
        background-position: center;
        opacity: 0;
        transition: background-color 0.3s, opacity 0.3s;
        &:hover {
          opacity: 1;
          background-color: rgba(0,0,0,0.3);
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
      height: 40px
      margin 0
      margin-top 8px
      font-size: 14px
      font-weight 600
      line-height 20px
      transition-duration .3s
      overflow hidden
    }
    .games {
      font-size: 14px
      font-weight 600
      transition-duration .3s
    }
    .v-item {
      width: 25%
      padding 10px 7px
      float left
      cursor pointer
    }
  }
</style>
