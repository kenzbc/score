<template>
    <div class="comment_pop-mask" v-if="show">
        <div class="comment_pop">
            <a href="javascript:;" class="comment_pop_close" @click="close()">
                <i class="iconfont icon-pop_close icon-iconx"></i>
            </a>
            <h2>
                <span>{{replyData.type == 0 ? '引用' : '回复'}}</span>
                <span class="at_repeat_name" v-if="replyData.nickname && replyData.type != 0">@{{replyData.nickname}}：</span>
            </h2>
            <div class="editor-quote-wrap" v-if="replyData.type == 0">
                <!--<div class="close-btn"><i class="iconfont icon-close-60"></i></div>-->
                <div class="quote-title"><span>引用</span><span class="nickname">@{{replyData.nickname}}</span><span>的回复:</span></div>
                <div class="quote-content">
                    {{ replyData.quote_content }}
                    <div class="more-text-icon">...</div>
                </div>
            </div>
            <textarea maxlength="500" class="comment_pop_content" v-model="commentContent" placeholder="请说点什么呗"></textarea>

            <div class="comment_pop-bottom cl">
                <div class="comment_pop-left fll">
                    <a href="javascript:;" class="comment_pop_btn fl" @click="addReply()">回复</a>
                    <a href="javascript:;" class="comment_pop_btn1 fl" @click="close()">取消</a>
                </div>
                <div class="comment_pop-right fll">0/500</div>
                <div class="img_code alislider flr" v-if="!isImgCode">
                  <no-captcha :width="320" :height="40" :isReset="isResetCaptcha" @captchaCallback="captchaCallback($event)"></no-captcha>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  //回复弹层
  export default {
    name: "reply-dialog",
    props:{
      show:{
        type: Boolean,
        default: false
      },
      isTabs:{
        type: Number,
        default: 0
      },
      replyData: {
        type:Object,
        default:function () {
          return {};
        }
      }
    },
    data() {
      return {
	      // forecast_comment_data:{
		     //  parent_cache_key:'',
		     //  matchID:'',
		     //  content:'',
		     //  reply_cache_key:'',
	      // },
	      // dynamic_comment_data:{
		     //  dynamic_id:'',
		     //  content_html:'',
		     //  reply_id:'',
		     //  reply_reply_id:'',
	      // },
        nc_params:{},
        isResetCaptcha:false,

        commentContent:'',
        isImgCode: false,  // 验证码
        aliNc:''
      }
    },
    mounted() {

    },
    methods: {
      // 关闭回复弹窗
      close (submit_success){
        var backParams = {
          hide: true, // 隐藏弹层
        };
        if (submit_success) backParams.success = submit_success;
        this.$emit('close', backParams);
      },
      /**
       * 阿里滑块验证callback
       * @param e
       */
      captchaCallback(e){
        this.nc_params.csessionid = e.csessionid;
        this.nc_params.token = e.token;
        this.nc_params.scene = e.scene;
        this.nc_params.sig = e.sig;
      },
      //回复评论
      addReply(){

	      if(!this.commentContent){
		      this.$Message.info('请说点什么呗');
		      return
	      }

        // 回复的回复。评论处理
	      if (this.replyData.is_reply_reply) {
		      var replayText = '@' + this.replyData.nickname + ': ';
		      this.commentContent = replayText + this.commentContent;
	      }

        // 拦截code码||阿里滑动验证  暂时无字段
        if (!this.nc_params.csessionid || !this.nc_params.scene || !this.nc_params.sig || !this.nc_params.token) {
          this.$Message.info('请先滑动验证！');
          return false;
        }
        this.replyData.aliyun_sessionId = this.nc_params.csessionid;
        this.replyData.aliyun_token = this.nc_params.token;
        this.replyData.aliyun_sig = this.nc_params.sig;
        this.replyData.aliyun_scene = this.nc_params.scene;

        // 聊天内容字段content_html  赛评/预测内容字段content
        if(this.isTabs == 3){//聊天
	        this.replyData.content_html = this.commentContent;
	        this.$api.comment.add({params:this.replyData}).then((res)=>{
            if(res.code == 200){
              this.close(true);
              // 清空当前输入
              this.commentContent = '';
            }
            this.$Message.info(res.message, 'tip1');
          })

        }else{//预测
	        this.replyData.content = this.commentContent;
          this.$api.comment.add({params:this.replyData}).then((res)=>{
            if(res.code == 200){
              this.close(true);
              // 清空当前输入
              this.commentContent = '';
            }
            this.$Message.info(res.message, 'tip1');
          })
        }
      },

    },
    watch: {
      show(newVal, oldVal){
        this.isResetCaptcha = true;

        if (newVal == true) {
          // 不同tab 初始
          this.isTabs == 3 ? this.replyData.content_html = '' : this.replyData.content = '';
        }else{
          this.nc_params.csessionid = '';
          this.nc_params.token = '';
          this.nc_params.sig = '';
          this.nc_params.scene = '';
        }
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .comment_pop-mask {
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0,0,0,0.7);
    position: fixed;
  }
  .comment_pop {
    background: #fff;
    width: 100%;
    max-width: 640px;
    border-radius: 5px;
    box-shadow: rgba(0,0,0,0.1) 0px 0px 16px;
    position: fixed;
    left: 50%;
    top: 30%;
    z-index: 12;
    margin-left: -320px;
    padding-bottom: 20px;

    // 引用
    .editor-quote-wrap {
      background: #f7f8fa;
      box-shadow: 0 1px 0 0 rgba(0,0,0,0.06);
      padding: 10px 13px;
      position: relative;

      .close-btn {
        width: 16px;
        height: 16px;
        position: absolute;
        top: 8px;
        right: 8px;
        cursor: pointer;
        color: #ccc;
      }
      .quote-title {
        font-size: 13px;
        font-weight: 400;
        color: #656973;

        span {
          display: inline-block;
          vertical-align: middle;
          height: 18px;
          line-height: 18px;
        }
        .nickname {
          margin: 0 5px;
          color: #4b9ce3;
        }
      }
      .quote-content {
        line-height: 20px;
        max-height: 40px;
        overflow: hidden;
        position: relative;
        word-break: break-all;
        margin-top: 5px;
        color: #656973;
        font-size: 13px;
        font-weight: 400;

        .more-text-icon {
          height: 20px;
          line-height: 13px;
          position: absolute;
          right: 0;
          bottom: 0;
          padding-left: 50px;
          padding-right: 7px;
          background: linear-gradient(to right, rgba(255,255,255,0), #f7f8fa 65%);
          color: #999;
        }
      }
    }


    .comment_pop_close {
      display: block;
      width: 35px;
      height: 35px;
      line-height: 34px;
      text-align: center;
      color: #fff;
      position: absolute;
      right: 0;
      top: 5px;
      font-size: 12px;

      .icon-pop_close {
        font-size: 12px;
      }
    }

    h2 {
      border-radius: 4px 4px 0 0;
      line-height: 46px;
      background: #0d8dfc;
      font-size: 16px;
      color: #fff;
      text-align: center;
      margin: 0;
    }
    textarea {
      margin: 24px 20px 0;
      width: 600px;
      height: 100px;
      line-height: 24px;
      border: 1px solid #ebebed;
      border-radius: 5px;
      resize: none;
      padding: 10px 20px;
      outline: none;
    }
    .comment_pop-bottom {
      width calc(100% - 40px)
      margin: 14px 20px 0;

      .comment_pop-left{

        .comment_pop_btn {
          display: block;
          width: 70px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          color: #fff;
          background: #0d8dfc;
          border-radius: 20px;
          font-size: 13px;
        }

        .comment_pop_btn1 {
          margin-left: 10px;
          display: block;
          width: 70px;
          height: 28px;
          line-height: 26px;
          text-align: center;
          border: 1px solid #ebebed;
          border-radius: 20px;
          font-size: 13px;
          color: #656973;
        }



      }
      .comment_pop-right {
        line-height: 28px;
        font-size: 14px;
        color: #a8abb3;
        padding-left: 40px;
      }
      .img_code {
        display: table;
        padding-top: 4px;

        i {
          display: table-cell;
          color: #656973;
          font-size: 16px;
          font-weight: normal;
          vertical-align: middle;
          width: 40px;
          text-align: center;
          position: relative;

          &:after {
            content: "";
            width: 1px;
            height: 14px;
            background: #ebebed;
            position: absolute;
            right: 0;
            top: 4px;
          }
        }

        input {
          width: 120px;
          margin-left: 16px;
          color: #656973;
        }
      }
    }
  }



    .nc-lang-cnt {
        padding-left: initial!important;
    }
    /*滑块样式*/

    .alislider .nc_scale {
        height: 40px;
    }
    .alislider .nc-container .nc_scale span {
        height: 40px;
        line-height: 40px;
    }
    .alislider .nc-container .nc_scale .scale_text {
        line-height: 40px;
    }
    .alislider .nc-container .nc_scale .nc-align-center.scale_text2 {
        /*height: 40px;*/
        line-height: 40px;

    }
    .alislider .nc-container .nc_scale span.nc-lang-cnt {
        display: inherit;
        line-height: 40px;
    }
    .alislider .nc-container .nc_scale .btn_ok {
        color: #0D8DFC;
    }
    .alislider .nc-container .nc_scale .nc_ok,
    .alislider .nc-container .nc_scale .nc_bg {
        background: #0D8DFC;
    }
    .nc-container .nc_scale .scale_text2 b {
        display: block;
    }



</style>
