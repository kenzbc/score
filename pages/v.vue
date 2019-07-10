<template>
  <div class="video-main cl" id="videoMain">
    <ul class="v-menu" :style="{top: menusTop + 'px'}">
      <li class="menu-item" :class="{active: index == videoMenus.activeIndex}" v-for="(item, index) in videoMenus.list" :key="item.id" @click="selectMenu(item.id, index)">{{item.name}}</li>
    </ul>

    <div class="v-list-wrap fll">
      <div class="v-list" v-if="videoList.length > 0">
        <video-list-item :item-data="item" v-for="item in videoList" :key="item.id" />
      </div>
    </div>

    <div class="v-sidebar flr">
      <hot-video-list :hot-data="videoHostList" />
    </div>
  </div>
</template>

<script>
  const pkg = require('~/package')

  let params = {
    cate_id: 0,
    limit: 5,
    cache_key: ''
  }

  export default {
    head() {
      return this.$seo(
        `短视频`,
        `短视频`,
        `短视频`,
        {
          script: [],
          link: []
        }
      );
    },
    name: "short-video",
    data() {
      return {
        params: params, // 视频列表
        isLoadMoreLock: true, // 是否加载更多锁
        menusTop: 20, // 左侧菜单距离document顶部高度
        videoList: [],
        maskShow: true
      }
    },
    async asyncData({app}) {
      let videoData = (await app.$api.video.shortList({params})).data || {}
      let menusData = (await app.$api.video.shortTypeList()).data || {}

      if (videoData.list) {
        videoData.list.forEach(item => {
          item.isShowComments = false
        })
      }

      return {
        videoMenus: {
          activeIndex: 0,
          list: menusData.list || []
        },
        videoList: videoData.list || [],
        videoHostList: menusData.video_hot_list || []
      }
    },
    computed: {},
    mounted() {
      this.setCacheKey()
      window.addEventListener('scroll', this.winHandleScroll, true)  // 监听（绑定）滚轮滚动事件
    },
    methods: {
      // window滚动事件
      winHandleScroll(e) {
//        console.log(e)
        let clientWidth = e.target.documentElement.clientWidth // 浏览器可视区域宽度
        let clientHeight = e.target.documentElement.clientHeight // 浏览器可视区域高度
//        let docHeight = e.target.documentElement.offsetHeight   // document高度
        let docHeight = document.getElementById('videoMain').offsetHeight   // video页高度
        let scrollTop = e.target.documentElement.scrollTop   // document滚动偏移量
        let diff = docHeight - scrollTop - clientHeight

        if (clientWidth > 768) {
          this.menusTop = scrollTop + 20
        }
        if (this.isLoadMoreLock && diff < -130) {
          this.isLoadMoreLock = false
          this.getVideo()
        }

      },
      // 获取视频列表最后一条数据的cache_key，设置给params参数
      setCacheKey() {
        if (this.videoList && this.videoList.length > 0) {
          this.params.cache_key = this.videoList[this.videoList.length - 1].cache_key
        }
      },
      // 获取视频列表数据, isSelect: 是否通过筛选菜单调用
      async getVideo(isSelect) {
        let data = (await this.$api.video.shortList({params: this.params})).data || {}
//        console.log(data)
        let list = data.list || []

        list.forEach(item => {
          item.isShowComments = false
        })

        this.videoList = isSelect ? list : this.videoList.concat(list)
        this.isLoadMoreLock = true
        this.setCacheKey()
      },
      // 通过分类标签筛选视频
      async selectMenu(cateId, i) {
        this.videoMenus.activeIndex = i
        this.params.cate_id = cateId
        this.params.cache_key = ''

        this.getVideo(true)

      },
      // 更新评论状态
      async updateComment(index) {
        console.log('更新评论')
//        console.log(index)
        console.log(this.videoList[index])
        this.commentParams.dynamic_id = this.videoList[index].object_id
        let data = await this.$api.comment.list({params:this.commentParams})
//        console.log(data)
      }
    },
    destroyed() {
      window.removeEventListener('scroll', this.winHandleScroll, true);  // 监听（解绑）滚轮滚动事件
    }
  }
</script>

<style lang="stylus" scoped>
  .video-main {
    width: 990px
    margin 0 auto;
    position relative
    padding-top: 20px;
    padding-bottom: 40px
  }

  /*左侧菜单*/
  .v-menu {
    width: 100px
    padding 0 5px
    background #fff
    position absolute
    top 20px
    left -130px
    box-shadow: 0 4px 8px -3px rgba(0,0,0,0.10);
    border-radius: 4px;

    .menu-item {
      height: 36px
      line-height 36px
      text-align center
      font-size: 14px;
      color: #2D2F33;
      background #fff
      cursor pointer
      overflow hidden
      white-space nowrap
      text-overflow ellipsis
      border-radius: 4px;

      +.menu-item {
        margin-top 2px
      }

      &:first-child {
        margin-top 5px
      }

      &:last-child {
        margin-bottom 5px
      }

      &:hover {
        background #f0f1f2
      }

      &.active {
        background: #0D8DFC;
        color #fff;
      }
    }
  }


  /*视频列表*/
  .v-list {
    width: 640px
  }

  /*右侧栏*/
  .v-sidebar {
    width: 330px
  }

  @media screen and (max-width: 1200px) {

  }

  @media screen and (max-width: 768px) {

  }

  @media screen and (max-width: 600px) {

  }
</style>
