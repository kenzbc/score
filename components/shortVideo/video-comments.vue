<template>
  <div class="v-comment-wrap" :class="{show: show}">
    <div class="header-bar cl">
      <span class="c-title fll">回复</span>
      <a class="flr" :href="'/p/' + dynamicId" target="_blank" v-if="list.length > 0">
        <span class="">查看全部回复</span><i class="iconfont icon-general__arrow"></i>
      </a>
    </div>
    <Loading :show="!loading" size="small" />
    <div class="comment-list" v-if="list.length > 0">
      <video-comments-item :item-data="item" v-for="item in list" :key="item.dynamic_comment_id" />
    </div>
    <div class="no-data" v-if="loading && list.length == 0">暂无评论，说点什么吧...</div>
    <div class="commit-box">
      <input type="text" class="ipt-text" placeholder="说点什么吧" v-model="inputTxt" />
      <!--<div class="btn" @click="sendMessage()">回复</div>-->
      <Button class="btn" type="primary" @click="sendMessage">回复</Button>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      dynamicId: String,
      show: {
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        list: [],
        params: { // 评论
          dynamic_id: this.dynamicId,
          limit: 5,
          order_switch: 0
        },
        loading: this.show,
        inputTxt: ''
      }
    },
    watch: {
      show(val) {
        if (val) this.getComments()
      }
    },
    computed: {
      commentParams() {
        return {
          dynamic_id: this.dynamicId,
          content_html: this.inputTxt
        }
      }
    },
    mounted() {
//      console.log(this.loading)
    },
    methods: {
      // 获得评论列表数据
      async getComments() {
        let resp = await this.$api.comment.list({params:this.params})
        this.list = resp && resp.data.list || []
        const count = resp && resp.data.dynamic_comment_count || 0
        this.loading = true
        this.$emit('countHandler', count)
        console.log(this.list)
      },
      // 发送评论消息
      async sendMessage() {
        if (this.inputTxt == '') {
          this.$Message.info('说点什么呗~~')
//          return
        }
        await this.$api.comment.add({params:this.commentParams}).then(resp => {
          console.log(resp)
        })
        this.getComments()
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>

  .v-comment-wrap {
    overflow hidden
    display none
    &.show {
      display block
    }

    .header-bar {
      width 100%
      height: 40px
      line-height 40px
      background #fff
      box-shadow: 0 0 0 1px #EBEBED
      padding 0 18px
      margin-top 1px
      position relative;

      &:before {
        display block
        content ''
        width: 4px
        height: 12px
        background: #0D8DFC;
        position absolute
        left 18px
        top 14px
      }

      .c-title {
        font-size: 15px;
        color: #2D2F33;
        font-weight 600
        margin-left 10px
      }
      a {
        font-size: 13px;
        color: #A8ABB3;
      }
      .iconfont {
        display inline-block
        width: 14px
        font-size 13px
        transform rotate(-90deg)
        margin-left 5px
      }
    }
    .comment-list {
      background-image: linear-gradient(0deg, #FFFFFF 0%, #FCFCFC 100%);
      padding 0 20px
      overflow hidden
    }
    .commit-box {
      width: 100%
      height: 64px
      padding 15px 16px 0
      border-top 1px solid #eee
      /*display none*/
      .ipt-text {
        display block
        width calc(100% - 64px - 12px)
        font-size 14px
        float left
        border: 1px solid #EBEBED;
        border-radius: 17px;
        padding 8px 10px
        &::-webkit-input-placeholder { /* WebKit browsers */
          color:#ccc;font-size:14px;
        }
        &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color:#ccc;font-size:14px;
        }
        &::-moz-placeholder { /* Mozilla Firefox 19+ */
          color:#ccc;font-size:14px;
        }
        &:-ms-input-placeholder { /* Internet Explorer 10+ */
          color:#ccc;font-size:14px;
        }
      }
      .btn {
        width: 64px
        height: 30px
        line-height 30px
        text-align center
        background-color: #0D8DFC;
        border-radius: 15px;
        font-size: 13px;
        color: #FFF;
        margin-top 2px
        float right
        cursor pointer
        padding: 0
        border: 0
        display block
        /deep/ span {
          vertical-align baseline
        }
      }

      &.submitting {
        .btn {
          opacity .4
        }
      }
    }

    .no-data {
      width: 100%
      text-align center
      padding 20px 0
      color #a8abb3
    }
    &.loaded {
      .commit-box {
        display block
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
