<template>
  <div class="v-item">
    <!--视频-->
    <div class="video-box">
      <video-box :poster="item.image_url" :src="item.video_url" />
    </div>
    <div class="title-wrap">
      <h2><a :href="'/p/' + item.object_id" target="_blank">{{item.title || ''}}</a></h2>
      <span>{{item.play_count || ''}}播放</span>
    </div>
    <div class="info cl">
      <div class="left-wrap fll">
        <a class="avatar-link" :href="'/u/' + item.member_id" target="_blank"><img class="avatar" :src="item.member_avatar || '~/static/images/default_avatar.jpg'" alt="" /></a>
        <a class="username" :href="'/u/' + item.member_id" target="_blank">{{item.member_nickname || ''}}</a>
        <span class="follow-btn" :class="{islike: item.is_attention != '3' && item.is_attention != '1'}" @click="attentionHandler(item.is_attention)">{{item.is_attention == '3' ? '相互关注' : item.is_attention == '1' ? '已关注' : '关注'}}</span>
      </div>
      <div class="from flr"><span class="add-time">{{item.add_time_string || ''}}</span><span class="label">发布于</span><span class="circle">{{item.circle_name || ''}}</span></div>
    </div>
    <!--工具条-->
    <Toolbar :toolbar-data="item" :comment-count="item.dynamic_comment_count" @commentHandler="updateComment" />
    <!--评论-->
    <video-comments :dynamic-id="item.object_id" :show="item.isShowComments" @countHandler="updateCommentCount" />
  </div>
</template>

<script>
  export default {
    props: {
      itemData: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        item: Object.assign({}, this.itemData),
        attentionLock: false
      }
    },
    computed: {
      params() {
        return {
          attention_member_id: this.item.member_id
        }
      }
    },
    mounted() {
    },
    methods: {
      // 关注
      async attentionHandler(isAttention) {
        if (this.attentionLock) return
        this.attentionLock = true
        const key = (isAttention != '1' || isAttention != '3') ? 'unAttention' : 'setAttention'
        let status = ''
        switch (isAttention) {
          case '0':
            status = '1'
            break
          case '1':
            status = '0'
            break
          case '2':
            status = '3'
            break
          case '3':
            status = '2'
            break
        }

        this.$scoreApi[key](this.params).then(resp => {
          console.log(resp)
          console.log('关注')
          this.item.is_attention = status
          this.attentionLock = false
        })
      },
      // 更新评论状态
      async updateComment(status) {
        console.log('更新评论')
        this.item.isShowComments = status
      },
      // 根据回复接口返回的dynamic_comment_count，实时更新toolbar评论数
      updateCommentCount(data) {
        console.log(data)
        this.item.dynamic_comment_count = data
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .v-item {
    box-shadow: 0 0 0 1px #EBEBED;
    border-radius: 2px;
    background #fff

    +.v-item {
      margin-top 20px
    }
    .video-box {
      width: 640px
      height: 360px
    }
    .title-wrap {
      padding 0 20px
      background: #212329;
      height: 46px
      h2 {
        font-size: 16px;
        color: #FFF;
        display inline-block
        line-height 46px
        float left
        max-width 70%
        white-space nowrap
        a {
          font-size: 16px;
          color: #FFF;
          display block
          overflow hidden
          text-overflow ellipsis
        }
      }
      span {
        font-size: 14px;
        color: #A8ABB3;
        display block
        line-height 46px
        float right
      }
    }
    .info {
      width 100%
      margin-top 13px
      padding 0 20px
      span {
        display inline-block
        vertical-align middle
      }
      .avatar-link {
        display inline-block
      }
      .avatar {
        width: 20px
        height: 20px
        border-radius 50%
        display inline-block
        vertical-align middle
      }
      .username {
        font-size: 13px;
        color: #656973;
        margin-left 6px
        display inline-block
        vertical-align middle
        margin-bottom -1px
      }
      .follow-btn {
        min-width: 52px
        height: 18px
        line-height 16px
        text-align center
        background #0D8DFC
        font-size: 12px;
        border 1px solid #0D8DFC;
        color: #FFF;
        border-radius 9px
        margin-left 6px
        padding 0 10px
        cursor pointer
        &:hover {
          background: #077EE6;
        }
        &.islike {
          background #fff
          border: 1px solid #0D8DFC
          color: #0D8DFC
          &:hover {
            background: #EDF7FF;
          }
        }
      }
      .from {
        font-size: 12px;
        color: #A8ABB3;
        padding-top 2px
        a {
          font-size: 12px;
          color: #A8ABB3;
          &:hover {
            color #4B9CE3
          }
        }
        span {
          margin-left 5px
        }
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
