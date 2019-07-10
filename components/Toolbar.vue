<template>
  <div>
    <div class="comment-toolbar">
      <div class="tool-btn" :class="{praised: item.is_praise == '1'}" @click="toolsPraise(item.is_praise)"><i class="iconfont icon-circle__good_Gray"></i><span>{{parseInt(item.praise_count) || '点赞'}}</span></div>
      <div class="tool-btn" :class="{'comment-show': item.isShowComments}" @click="toolsComment"><i class="iconfont icon-circle__comment"></i><span>{{parseInt(commentCount) || '回复'}}</span></div>
      <div class="tool-btn" @click="toolsShare"><i class="iconfont icon-share"></i><span>分享</span></div>
      <div class="tool-btn collect" :class="{collected: item.is_collect == '1'}" @click="toolsCollect(item.is_collect)"><i class="iconfont" :class="{'icon-general__collect_A': item.is_collect == '1', 'icon-general__collect': item.is_collect != '1'}"></i><span>{{item.is_collect == '1' ? '已收藏' : '收藏'}}</span></div>
    </div>
    <modal-mask bg-color="rgba(0,0,0, 0.5)" :show="maskShow" :maskShow.sync="maskShow">
      <toolbar-share :maskShow.sync="maskShow" :dynamic-id="item.object_id"/>
    </modal-mask>
  </div>
</template>

<script>

  export default {
    props: {
      toolbarData: {
        type: Object,
        default: {}
      },
      commentCount: String
    },
    data() {
      return {
        praiseLock: false,  // API请求控制锁
        collectLock: false,  // API请求控制锁
        maskShow: false,  // 是否显示分享弹窗
        item: Object.assign({}, this.toolbarData)
      }
    },
    computed: {
      params() {
        return {
          dynamic_id: this.item.object_id
        }
      }
    },
    mounted() {
//      console.log(this.toolbarData)
    },
    methods: {
      // 点赞
      toolsPraise(isPraise) {
        if (this.praiseLock) return
        this.praiseLock = true
        const key = isPraise == '0' ? 'praise' : 'unPraise'
        const status = isPraise == '0' ? '1' : '0'

        this.$api.dynamic[key](this.params).then(resp => {
          console.log(resp)
          console.log('更新点赞')
          let count = parseInt(this.item.praise_count)
          this.item.is_praise = status
          this.item.praise_count = status === '1' ? ++count : --count
          this.praiseLock = false
        })
      },
      // 评论
      toolsComment() {
        this.item.isShowComments = !this.item.isShowComments
        this.$emit('commentHandler', this.item.isShowComments)
      },
      // 分享
      toolsShare() {
        console.log('分享')
        this.maskShow = true
      },
      // 收藏
      toolsCollect(isCollect) {
        if (this.collectLock) return
        this.collectLock = true
        const key = isCollect == '0' ? 'collect' : 'unCollect'
        const status = isCollect == '0' ? '1' : '0'

        this.$api.dynamic[key](this.params).then(resp => {
          console.log(resp)
          console.log('更新收藏')
          this.item.is_collect = status
          this.collectLock = false
        })
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .comment-toolbar {
    text-align: center;
    padding: 15px 0 13px;

    .tool-btn {
      display: inline-block;
      width: 143px;
      padding: 3px 0;
      text-align: center;
      background: #FAFAFA;
      border-radius: 24px;
      margin: 0 2px;
      cursor pointer
      color: #656973
      span {
        font-size 13px;
        margin-left 2px;
        display inline-block
        vertical-align middle
        margin-top 1px
      }
      .iconfont {
        font-size: 18px;
        margin-right: 4px;
        display inline-block
        vertical-align middle
      }
      &:hover {
        color: #0D8DFC;
        background: #F0F8FF;
      }
      &.collect {
        &:hover {
          color: #FFC157;
          background: #FFFAF0;
        }
      }
      &.collected {
        color: #FFC157;
        .iconfont {
          color: #FFC157;
        }
      }
      &.praised {
        color: #0D8DFC;
      }
      &.comment-show {
        background: #0D8DFC;
        color: #fff;
      }
    }
  }

  @media screen and (max-width: 1200px) {

  }

  @media screen and (max-width: 768px) {

  }

  @media screen and (max-width: 600px) {

  }
</style>
