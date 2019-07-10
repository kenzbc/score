<template>
  <div class="comment_pop-mask" style="display: block;">
    <div class="comment_pop">
      <a href="javascript:;" class="comment_pop_close" @click="close">
        <i class="iconfont icon-pop_close icon-iconx"></i>
      </a>
      <h2>
        <span>回复 </span>
        <span class="at_repeat_name">@{{data.nickname}}：</span>
      </h2>
      {{data}}
      <textarea maxlength="500" class="comment_pop_content" v-model="commentContent"></textarea>

      <div class="comment_pop-bottom cl">
        <div class="comment_pop-left fll">
          <a href="javascript:;" class="comment_pop_btn fl" @click="addReply(data.dynamicId, data.replyId, data.replyReplyId)">回复</a>
          <a href="javascript:;" class="comment_pop_btn1 fl" @click="close">取消</a>
        </div>
        <div class="comment_pop-right fll">0/500</div>
        <div class="img_code flr" id="reply_reply_imgCode">
          <!--<i class="iconfont icon-verification"></i>-->
          <!--<input type="text" class="img_code_input" id="reply_img_code" placeholder="请输入验证码">-->
          <!--<img class="verify-image" src="/img_code" onclick="setImageCode(this)"/>-->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "comment-pop",
    components: {},
    props:{
      data:{
        type: Object,
        default: ()=>{}
      }
    },
    data() {
      return {
        reply_id:'',
        reply_reply_id:'',
        reply_type:'',
        reply_reply_name:'',
        commentContent:''
      }
    },
    mounted() {
    },
    methods: {
      //回复评论
      async addReply(dynamicId,replyId,replyReplyId){
        let params = {
          dynamic_id: dynamicId,
          reply_id: replyId,
          reply_reply_id:replyReplyId,
          is_chatroom:'',
          is_prize:'',
          quote_comment_id:'',
          seconds:'',
          content_html: `回复 @${this.data.nickname}：${this.commentContent}`,
        };
        this.$api.comment.add({method:'post',params}).then((res)=>{
          if(res.code == '200'){
            this.$Message.success(res.message);
            this.$emit('refreshComments',true);
            this.close();
          }else{
            this.$Message.warning(res.message);
          }
        }).catch((err)=>{
          this.$Message.error('处理评论错误！')
        });

      },
      close(){
        this.$emit('close',true);
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .comment_pop-mask {
    display: none;
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
    box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px 0 rgba(0,0,0,0.08);
    border-radius: 4px;
    width: 100%;
    max-width: 640px;
    background-color: #fff;
    border-radius: 5px;
    box-shadow: rgba(0,0,0,0.1) 0px 0px 16px;
    position: fixed;
    left: 50%;
    top: 30%;
    z-index: 12;
    margin-left: -320px;
    padding-bottom: 20px;


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
      }
    }
  }






</style>
