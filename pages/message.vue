<template>
  <div class="message_wrap cl">
    <!--消息左侧NAV-->
    <div class="message_left fll">
      <h2>我的消息</h2>
      <ul class="message_nav cl">
        <li><a href="#comment" data-messageType="comment" onclick="message('comment',1)" class="active"><i class="iconfont icon-circle__comment"></i><span>回复</span></a></li>
        <li><a href="#aita" data-messageType="aita" onclick="message('aita',1)"><i class="iconfont icon-personal_message__1"></i><span>提到</span></a></li>
        <li><a href="#praise" data-messageType="praise" onclick="message('praise',1)"><i class="iconfont icon-circle__good_Gray"></i><span>赞</span></a></li>
        <li><a href="#quote" data-messageType="quote" onclick="message('quote',1)"><i class="iconfont icon-quote"></i><span>引用</span></a></li>
        <li><a href="#notice" data-messageType="notice" onclick="message('notice',1)"><i class="iconfont icon-personal_message__"></i><span>系统回复</span></a></li>
        <li><a href="/chat" target="_blank"><i class="iconfont icon-IM__chat"></i>发起聊天</a></li>
      </ul>
    </div>
    <!--消息右侧主内容-->
    <div class="message_right flr">
      <div class="message_title">
        <h2 class="">回复</h2>
        <p class="message_comment">
          <a href="#comment" onclick="message('comment',1)" class="active">回复我的</a>
          <a href="#my_comment" onclick="message('my_comment',1)">我回复的</a>
        </p>
      </div>
      <ul class="message_main" id="message_list">

      </ul>
      <div class="page-num-cont cl">
        <div id="pagination_15" class="flr"></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "bet_list",
    components: {},
    data() {
      return {}
    },
    async asyncData() {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
      /*
      let res = await ({
        method: 'get',
        url: `/apiUrl.do?id=parameters`
      })
      return {
        dataList:res.data.list,
      }
      */
    },
    mounted() {

    },
    methods: {},
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .message_wrap {
    width 860px
    margin 30px auto
    background: linear-gradient(180deg, rgba(254, 254, 254, 1), rgba(252, 252, 252, 1));
    box-shadow: 0px 0px 0px 1px rgba(235, 235, 237, 1);
    border-radius: 2px;
    .message_left {
      width 220px
      padding 16px
      h2 {
        line-height: 28px;
        font-size: 20px;
        font-weight 700
        padding-left 12px;
        margin-bottom 16px;
      }
      .message_nav {
        a {
          display inline-block
          width 100%
          height: 40px;
          line-height 40px
          color: #656973;
          padding 0 15px
          margin-bottom 4px
          .iconfont {
            font-size 20px
            margin-right 15px
            float left
          }
          &.active, &:hover {
            color #fff
            background #0D8DFC
            border-radius: 24px;
          }
        }
      }
    }
    .message_right {
      width 640px
      min-height 340px
      background: rgba(255, 255, 255, 1);
      box-shadow: -3px 0px 8px 0px rgba(0, 0, 0, 0.02);
      .message_title {
        line-height 28px
        border-bottom 1px solid #F5F6F7
        padding 16px 16px 16px 24px
        h2 {
          font-size 20px
          padding-left 4px
        }
        p.message_comment {
          display none
          margin-top 10px
        }
        a {
          display inline-block
          line-height 26px
          font-size 12px
          color #656973
          background rgba(0, 0, 0, 0.04);
          border-radius: 8px;
          padding 0 13px
          margin-right 10px
          &.active, &:hover {
            color #fff
            background: rgba(13, 141, 252, 1);
          }
        }
      }
      .message_main {
        li {
          border-bottom 1px solid #F5F6F7
          padding 12px 20px
          /*新版系统通知*/
          .notice_title {
            line-height 22px
            font-weight: 600;
            font-size 15px
            padding-left 6px
            margin-bottom 4px
          }
          .unclick {
            cursor default
            &:hover {
              color inherit
            }
          }
          .notice_content {
            padding 0 6px
            .notice_content_p {
              min-height 44px
              line-height 22px
              font-size 14px
              font-weight: 400;
              margin-bottom 2px
              .go_url {
                color #4B9CE3
              }
            }
            .notice_time {
              line-height 18px
              font-weight: 400;
              font-size 12px
            }
          }
          .notice_img {
            width 54px
            height 54px
          }
          /**/
          .message_main_top {
            margin-bottom 8px;
            .message_top_user {
              .message_top_avatar {
                width 36px
                height 36px
                border-radius 50%
                position relative
              }
              .message_top_user_img {
                width 36px
                height 36px
                border-radius 50%
              }
              .message_top_member_type {
                width 15px
                height 15px
                position absolute
                right -2px
                bottom -2px
              }
              .message_top_user_main {
                padding-left 8px
                .message_top_name {
                  line-height 20px;
                  font-size 15px;
                  font-weight 700
                  span {
                    display: inline-block;
                    padding: 0 5px;
                    height: 16px;
                    line-height: 16px;
                    text-align: center;
                    background-image: linear-gradient(135deg, #19a7ff 0%, #058aff 100%);
                    border-radius: 3px;
                    font-size: 11px;
                    color: #fff;
                    font-weight normal
                    vertical-align top
                    margin: 2px 0 0 6px;
                  }
                }
                .message_top_time {
                  line-height 16px;
                  font-size 12px;
                }
              }
            }
            .message_top_reply_btn {
              display none
              line-height 18px;
              font-size 13px;
              .iconfont {
                font-size 18px
                margin-right 6px
              }
            }
          }
          .message_content {
            .face-icon {
              height: 22px
              margin-top -3px
            }
            .message_content_p {
              display block
              line-height 22px
              cursor pointer
              margin-bottom 8px
              padding-left 2px
              a {
                color #4B9CE3
              }
            }
            .notice_content_p {
              line-height 22px
              padding-left 2px
            }
            .message_content_wrap {
              display block
              background #FAFAFA
              border-radius 4px
              overflow hidden
              .message_content_img {
                width 60px
                height 60px
              }
              .message_content_post {
                width calc(100% - 60px)
                padding 6px 12px
                h4 {
                  height 22px
                  line-height 22px
                  font-size 15px
                  overflow: hidden;
                  text-overflow: ellipsis;
                  white-space: nowrap;
                  margin-bottom 8px
                }
                p {
                  line-height 18px
                  font-size 12px;
                  img {
                    width 18px
                    height 18px
                    border-radius 50%
                    margin-right 8px
                  }
                }
              }
              .message_content_reply {
                padding 8px 12px
                .message_reply_info {
                  line-height 20px
                  margin-bottom 6px
                  a {
                    color #4B9CE3
                    margin 0 6px
                  }
                }
                .message_reply_post {
                  line-height 18px
                  font-size 12px
                  padding-left 4px
                }
              }
            }
          }
          .message_bottom {
            display none
            margin-top 12px
            input {
              width calc(100% - 150px)
              line-height 34px
              border 1px solid #EBEBED
              border-radius 17px
              padding 0 20px
            }
            input:
            :-webkit-input-placeholder {
              color: #D2D4D9;
            }
            a {
              display inline-block
              line-height: 30px;
              font-size 12px
              color #656973
              border-radius: 20px;
              border: 1px solid #EBEBED;
              padding 0 20px
              margin-left 4px
              &.active, &:hover {
                color #fff
                background: #0D8DFC
                border: 1px solid #0D8DFC;
              }
            }
          }
        }
      }
    }
  }

  //引用
  .comment-quote {
    padding-left 8px;
    padding-bottom 7px;
    border-bottom 1px dotted #EBEBED
    position relative;
    margin-bottom 7px;
    margin-top -2px
    &:before {
      display block
      content: ''
      width: 2px
      height: calc(100% - 16px)
      background #0D8DFC
      position absolute
      top 5px
      left 0
      border-radius 2px 0 0 2px
    }
    .quote-title {
      font-size 13px
      font-weight 400
      span {
        display inline-block
        vertical-align middle
        line-height 20px
        color #4B9CE3
      }
      a {
        color #4B9CE3
      }
      .line {
        margin 0 6px
        background: rgba(13,141,252,0.16)
        width: 1px
        height: 10px
        line-height normal
      }
    }
    .quote-content {
      color #656973
      font-size 13px
      font-weight 400
      position relative;
      .face-icon {
        height: 16px
        margin-top -4px
      }
      .hide-btn {
        display none
        height: 18px
        line-height 18px
        color: #4B9CE3
        position absolute
        bottom: 0
        right: 4px
        margin-top -3px
        background: #fff
        padding-left: 8px
        cursor: pointer
      }
      .content-text {
        line-height 20px
        max-height 40px
        word-break break-all
        overflow hidden
        position relative
        .more-btn {
          width: 40px
          height: 20px
          line-height 20px
          color: #4B9CE3
          position absolute
          bottom: 0
          right: 0
          background: #fff
          padding-left: 6px
          cursor: pointer
          &:after {
            display block
            content: '...'
            height 20px
            line-height 14px
            position absolute
            right: 38px
            bottom: 0
            padding-left: 40px
            background: linear-gradient(to right, transparent, #fff 65%)
            color #999
          }
        }
        .hide-btn {
          position static
          bottom: auto
          right: auto
        }
      }
      /* 音频部分显示*/
      .list-items-radio {
        display none
        cursor pointer
        margin-top: 6px
        width: 328px
        height: 50px
        border-radius: 8px;
        .cubeshape {
          width: 100%;
          height: 60px;
          position relative
          .item-cube {
            position: absolute;
            width: 100%
            height: 100%
            background: url("/images/banner/radio.png") no-repeat;
            background-size: 101% 100%;
            background-position: center;
            transition opacity .3s, z-index .3s, visibility .3s;
            &.items-radio-first {
              z-index 1
              visibility visible
              opacity 1
              .radio-left {
                margin: 14px 0 0 16px
                .radio-icon {
                  font-size: 13px
                  color: #fff
                }
                .radio-text {
                  margin-top: 16px
                  margin-left: 9px
                  font-size: 14px;
                  color: #FFFFFF;
                  line-height 18px
                }
              }
              .radio-right {
                margin-top: 14px
                margin-right: 20px
                font-size: 14px;
                line-height: 20px
                color: #FFFFFF;
              }
            }
            &.items-radio-second {
              z-index -1
              visibility hidden
              opacity 0
              .items-radio-left {
                margin: 15px 0 0 16px
                .icon-player {
                  font-size 12px
                  color: #fff
                }
              }
              .items-radio-right {
              }
            }
          }

          &.turn {
            .item-cube {
              &.items-radio-first {
                z-index -1
                visibility hidden
                opacity 0
              }
              &.items-radio-second {
                z-index 1
                visibility visible
                opacity 1
              }
            }
          }
          &.rotate {
            animation: rotate-y 0.3s;
          }
        }

        .audiojs {
          width: 98%
          .scrubber {
            width: 60%
          }
          .reset-play {
            right 21%
          }
        }
      }

      .img-wrap {
        display none
        width: 100%
        padding-top 8px
        padding-bottom 6px
        .img-rows {
          overflow hidden
          +.img-rows {
            margin-top 6px
          }
        }
        .img-item {
          border-radius 4px
          +.img-item {
            margin-left 6px
          }
        }
      }

      &.more {
        .hide-btn {
          display inline-block
        }
        .content-text {
          max-height 100%
          .more-btn {
            display none
          }
        }
        .list-items-radio, .img-wrap {
          display block
        }
      }
    }
  }
  //语音翻转
  @keyframes rotate-y {
    50% {
      transform: scaleY(0);
    }
    100% {
      transform: scaleY(1);
    }
  }

  .message_null {
    text-align center
    margin-bottom 20px
    img {
      display block
      width 33%
      margin 20px auto
    }
  }

  /*分页*/
  .page-num-cont {
    padding 20px 14px
    /*ccs-5*/
    .whj_jqueryPaginationCss-5 {
      display: inline-block;
      user-select: none;
      -webkit-user-select: none;
      -moz-user-select: none;
      -ms-user-select: none;
    }

    .whj_jqueryPaginationCss-5 div {
      display: inline-block;
      vertical-align: middle;
      height: 26px;
      line-height: 26px;
    }

    .whj_jqueryPaginationCss-5 .whj_padding {
      padding: 1px 8px;
    }
    .whj_jqueryPaginationCss-5 .page-item {
      padding: 0
      width: 26px
      text-align: center
      margin: 0 3px
    }
    .whj_jqueryPaginationCss-5 .all-page-ye {
      margin: 0 4px
      display: inline-block
      font-size: 13px;
      color: #636873;
      vertical-align top
    }
    .whj_jqueryPaginationCss-5 .page-item:nth-child(3) {
      margin-left: 7px
    }
    .whj_jqueryPaginationCss-5 .page-item:nth-child(7) {
      margin-right: 7px

    }
    .whj_jqueryPaginationCss-5 .page-line {
      width: 4px
      margin: 0 10px
      display: inline-block
      .line-height {
        margin-top: 8px
        display: block
        height: 10px
        width: 1px
        background: #EBEBED;
      }
    }
    .whj_jqueryPaginationCss-5 .whj_bgc {
      // background-color: #199eaf;
      color: #636873;
    }
    .whj_jqueryPaginationCss-5 .whj_padding-confirm {
      background: rgba(255, 255, 255, 0.70);
      border: 1px solid #EBEBED;
      border-radius: 8px;
      width: 36px
      height: 22px
      padding: 0
      line-height 20px
      font-size: 12px;
      color: #656973;
      text-align: center
      vertical-align: middle;
    }
    .whj_jqueryPaginationCss-5 .page-ye {
      display: inline-block
      font-size: 13px;
      color: #A8ABB3;
      margin 0 8px
    }
    .whj_jqueryPaginationCss-5 .whj_border {
      //border: 1px solid #199eaf;
    }

    .whj_jqueryPaginationCss-5 .whj_color {
      font-size: 13px;
      color: #A8ABB3;
    }

    .whj_jqueryPaginationCss-5 .whj_hover:hover {
      /*  background-color: #d4f1ff;
        color: #199eaf;*/
      cursor: pointer;
    }

    .whj_jqueryPaginationCss-5 .whj_checked {
      background: #0D8DFC;
      border-radius: 16px;
      font-size: 14px;
      color: #FFFFFF;
    }

    .whj_jqueryPaginationCss-5 .whj_hoverDisable {
      opacity: 0.5;
    }

    .whj_jqueryPaginationCss-5 select {
      height: 28px;
      vertical-align: bottom;
      padding: 0px;
      outline: none;
    }

    .whj_jqueryPaginationCss-5 input {
      padding: 0px;
      height: 22px;
      outline: none;
      text-align: center;
      width: 36px;
      vertical-align: middle;
      border: 1px solid #EBEBED;
      border-radius: 2px;
    }

    .whj_jqueryPaginationCss-5 div, .whj_jqueryPaginationCss-5 input, .whj_jqueryPaginationCss-5 select {
      /* margin: 2px;*/
    }

    /*只有设置显示总页数时，该样式才生效*/
    .whj_jqueryPaginationCss-5 .whj_totalSizeSingle {
      display: none
      margin-left: -8px;
    }
  }

  @media screen and (max-width: 768px) {
    .message_wrap {
      width 100%
      margin-top 0
      .message_left {
        width 100%
        padding 2px 12px
        .message_nav {
          border-bottom 1px solid #F5F6F7
        }
        h2 {
          display none
        }
        .message_nav li {
          //width 25%
          float left
          padding: 0 14px;
          &:last-of-type {
            display none
          }
          a {
            text-align center
            padding 0
            margin-bottom 0
            &.active {
              font-weight 700
              color #2D2F33
              background none

              span {
                position relative
                &:after {
                  content ""
                  width 6px
                  height 6px
                  border 2px solid #0D8DFC
                  border-radius 50%
                  position absolute
                  right -10px
                  top 0px
                }
              }

            }
            .iconfont {
              display none
            }
          }
        }
      }
      .message_right {
        width 100%
        box-shadow none
        .message_title {
          border-bottom none
          padding 10px 12px 4px 12px
          h2 {
            display none
          }
          p.message_comment {
            margin-top 0
          }
        }
        .message_main li {
          padding 12px
        }
      }
    }
  }

  @media screen and (max-width: 320px) {
    .comment-quote {
      .quote-content {
        .list-items-radio {
          width: 285px
        }

      }
    }
  }
</style>
