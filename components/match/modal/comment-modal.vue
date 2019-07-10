<template>
  <div class="dialog-modal" v-if="show">
    <div class="dialog-container forecast">
      <div class="title">
        {{ JSON.stringify(commentData) == "{}" ? '写赛评' : '编辑我的赛评' }}
        <label class="bet-dialog-close" @click="close()"><i class="icon iconfont"></i></label>
      </div>
      <div class="comment-star">
        <i v-for="item,index in starNum" class="iconfont"
           :class="starScore >= index+1 ? 'icon-staron' : 'icon-staroff'"
           @click="starScore=index+1"></i>
      </div>
      <span class="star-txt"></span>
      <div class="desc">{{starScore > 0 ? starScore + '星' : '给比赛打分'}}</div>
      <textarea class="text-area" v-model="content" placeholder="说说你的看法吧！"></textarea>
      <div class="footer-btn">
        <div class="submit-btn" :class="{'active' : starScore > 0}" @click="submitComment">提交赛评</div>
      </div>
    </div>
  </div>
</template>

<!--<comment-modal :show="true" :comment-data="matchInfo.comment" @close=""></comment-modal>-->


<script>
  export default {
    name: "comment-modal",
    components: {},
    props:{
      show:{
        type:Boolean,
        default:false
      },
      matchInfo:{
        type:Object,
        default:function () {
          return {};
        }
      },
      commentData:{
        type:Object,
        default:function () {
          return {};
        }
      }
    },
    data() {
      return {
        starNum:5,
        starScore:0,
        content:''
      }
    },
    watch:{
      commentData(newVal, oldVal){
        this.starScore = newVal.score ? newVal.score : 0;
        this.content = newVal.content ? newVal.content : '';
      }
    },
    mounted() {
      this.starScore = this.commentData.score ? this.commentData.score : 0;
      this.content = this.commentData.content;
    },
    methods: {
      /**关闭弹层**/
      close(submit_success){
        let backParams = {
          hide: true, // 隐藏弹层
        };
        if (submit_success) backParams.success = submit_success;
        this.$emit('close', backParams);
      },

      submitComment(){
        if(parseInt(this.starScore) < 1){
          this.$Message.info('请给打个分吧~');
          return;
        }
        let params = {
          'matchID': this.matchInfo.matchID,
          'score': this.starScore,
          'content': this.content
        };
        this.$api.match.getMatchComment({params}).then((res)=> {
          if (res.code == '200') {
            this.$Message.success(res.message);
            this.$root.$emit('refresh-data', true);
            this.close();
          } else {
            this.$Message.error(res.message);
          }
        });
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .dialog-modal {
    width 100%;
    height 100%;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 100;
    background: rgba(0, 0, 0, 0.4);
    position: fixed;
    display flex;
    justify-content center;
    align-items center;


    .forecast{
      width:280px;
      height:390px;
      padding:16px 20px;
      background:#fff;
      box-shadow:0px 2px 8px 0px rgba(0,0,0,0.08),0px 0px 0px 1px rgba(0,0,0,0.03);
      border-radius:4px;

      .title{
        width 100%;
        font-size:17px;
        font-family:PingFangSC-Semibold;
        font-weight:600;
        color:#2D2F33;
        line-height:24px;
        position relative;
        text-align center;

        .bet-dialog-close{
          position: absolute;
          top: -4px;
          right: -8px;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          text-align: center;
          cursor: pointer;
          padding-top: 1px;
          line-height initial;

          .icon{
            font-size: 12px;
            color: #ccced3;
          }
        }
      }

      .comment-star{
        width: 192px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        text-align: center;
        margin: 14px auto 0 ;


        .iconfont{
          cursor pointer;
          font-size 32px;
          color:#FFCC60;
        }

      }


      .desc{
        height:20px;
        margin-top:14px;
        font-size:14px;
        font-family:PingFangSC-Medium;
        font-weight:500;
        color:#A8ABB3;
        line-height:20px;
        text-align center;
      }
      .text-area{
        width:240px;
        height:196px;
        margin-top:16px;
        padding:8px 14px;
        border-radius:4px;
        border:1px solid #EBEBED;
        font-size:14px;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#2d2f33;
        line-height:20px;

        &::-webkit-input-placeholder {
          color: #D2D4D9;
        }
      }

      .footer-btn{
        width 100%;
        margin-top:14px;
        display flex;
        justify-content center;

        .submit-btn{
          width 100%;
          height:34px;
          line-height:34px;
          text-align center;
          background #F7F8FA;
          border-radius:100px;
          font-size:14px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color:#b7b7b7;
          cursor pointer;

          &.active{
            background:#0D8DFC;
            color:#FFF;
          }
        }
      }

    }


  }

</style>
