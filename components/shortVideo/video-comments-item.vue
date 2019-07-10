<template>
  <div class="comment-item cl">
    <a :href="'/u/' + item.member_id" target="_blank"><img class="avatar" :src="item.avatar || '/images/default_avatar.jpg'" alt="" /></a>
    <div class="content">
      <p><span class="nickname"><a :href="'/u/' + item.member_id" target="_blank">{{item.nickname || ''}}</a></span><span class="colon">:</span>{{item.content || ''}}</p>
      <div v-if="!item.isCommit" :data-did="item.dynamic_id" :data-dcid="item.dynamic_comment_id" :data-cache_key="item.cache_key" :data-count="item.praise_count">
        <div class="praise-btn like" :class="{ok: item.is_praise == '1'}" @click="praiseHandler()">
          <span class="label">{{item.is_praise == '0' ? '点赞' : '已赞'}}</span><span class="praise-count">{{item.praise_count != '0' ? '('+item.praise_count+')' : ''}}</span>
        </div>
        <strong></strong>
        <span class="praise-btn unlike" :class="{ok: item.is_dislike == '1'}">{{item.is_dislike == '0' ? '踩' : '已踩'}}</span>
        <span class="add-time">{{item.web_time || ''}}</span>
      </div>
    </div>
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
      }
    },
    computed: {
      params() {
        return {
          dynamic_id: this.item.dynamic_id,
          dynamic_comment_id: this.item.dynamic_comment_id,
          comment_cache_key: this.item.cache_key
        }
      }
    },
    watch: {},
    mounted() {},
    methods: {
      // 评论点赞
      praiseHandler() {
        this.$api.comment.praise({params:this.params}).then(resp => {
          console.log(resp)
        })
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .comment-item {
    margin-top 15px
    width 100%
    .avatar {
      display block
      width: 24px
      height: 24px
      border-radius 50%
      border: 1px solid rgba(0,0,0,0.04);
      float left
    }
    .content {
      width calc(100% - 24px)
      padding-left 10px
      float left
      p {
        font-size: 13px;
        color: #2D2F33;
        line-height 21px
        margin-bottom 6px
      }
      .nickname {
        font-size: 15px;
        color: #2D2F33;
        font-weight 600
        display inline-block
        margin-top -3px

      }
      .colon {
        display inline-block
        padding-left 3px
        padding-right 9px
        margin-top -6px
        font-weight 600
      }
      .praise-btn {
        display inline-block
        vertical-align middle
        font-size: 13px;
        color: #A8ABB3;
        cursor pointer
        &:not(.ok):hover {
          .label {
            color: #656973
          }
        }
        &.like {
          span {
            display block
            float left
          }
          .praise-count {
            font-size 14px
            margin-left 6px
            margin-top -2px
            display: none
          }
        }
        &.ok {
          color #0D8DFC
          .praise-count {
            display block
          }
        }
        &.unlike {
          &:not(.ok):hover {
            color: #656973
          }
        }
      }

      strong {
        display inline-block
        vertical-align middle
        width: 1px
        height: 10px
        margin 0 16px
        background: #EBEBED;
      }

      .add-time {
        float right
        color: #A8ABB3;
        font-size 13px
      }
    }
    &:last-child {
      margin-bottom 15px
    }
  }

  @media screen and (max-width: 1200px) {

  }

  @media screen and (max-width: 768px) {

  }

  @media screen and (max-width: 600px) {

  }
</style>
