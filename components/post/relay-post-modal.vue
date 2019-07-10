<template>
  <Modal :value="show" width="440" class="share-modal" @on-visible-change="getFaultModalStatusChange">
    <p slot="header" style="font-size:16px;text-align:center">
      <span>转发贴子</span>
    </p>
    <div class="relay_main">
      <div class="relay_circle">
        <h3>转发到您关注的圈子</h3>
        <div class="relay_circle_wrap1" style="height: auto;">
          <ul class="relay_circle_list relay_circle_list1 cl">
            <li v-for="item in circleList">
              <a href="javascript:;"
                 :data-circleid="item.circle_id"
                 :class="{'on' : relayData.circle == item.circle_id}" @click="relayData.circle = item.circle_id">{{item.circle_name}}</a>
            </li>
          </ul>
        </div>
        <a href="javascript:;" class="relay_circle_more" style="display: none;"><i class="iconfont icon-icon4"></i></a>
      </div>
      <!--转发内容-->
      <div class="relay_tiezi" v-if="data && data.dynamic_id != ''">
        <div class="relay_tiezi_main cl">
          <p>标题：</p>
          <input class="forward_title forward_title1" v-model="relayData.title">
        </div>
        <div class="relay_tiezi_main cl">
          <p>内容：</p>
          <div class="textarea-text">
            <textarea class="relay_content relay_content1" v-model="relayData.content"></textarea>
            <div class="user-message-cont cl">
              <img class="user-message-cont-img fl"
                   :src="data.picture && data.picture.length > 0 ? data.picture[0].image_url : '/static/images/default_score.png'" alt="">
              <div class="user-message-cont-right fl">
                <div class="user-message-cont-text">{{data.title}}</div>
                <div class="user-message-cont-nickname">
                  <img class="cont-text1-img"
                       :src="data.avatar ? data.avatar : '/static/images/tx_pic.jpg'" alt="">
                  <div class="cont-text1-name">{{data.nickname}}</div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <!--转发赛事-->
      <!-- <div class="relay_match">

       </div>-->
      <!--转发贴子-->
      <!-- <div class="relay_show cl">

       </div>-->
    </div>
    <div slot="footer" style="text-align: center;">
      <div class="circle-btn-blue score_pop_btn" @click="sendPost(data.dynamic_id)">发布</div>
    </div>
  </Modal>
</template>

<script>
  /**转发帖子弹层组件**/
  export default {
    name: "relay-post-modal",
    components: {},
    props:{
      show:{
        type: Boolean,
        default: false
      },
      data:{
        type: Object,
        default:()=>{}
      }
    },
    data() {
      return {
        circleList:[],//我关注的圈子
        relayData:{
          circle:'',
          title:'',
          content:''
        },
      }
    },
    watch:{
      show(newVal, oldVal){
        if(newVal == true){
          this.getMyCircle();
        }
      }
    },
    mounted() {
      this.relayData.title = `转发了"${this.data.title}"`;
    },
    methods: {
      async getMyCircle(){
        let res = await this.$api.circle.getSelectCircleList();
        if(res.code == 200){
          this.circleList = res.data.attention_circle_list;
          if(this.circleList.length > 0){
            this.relayData.circle = this.circleList[0].circle_id;
          }
        }
      },
      //发布
      async sendPost(dynamicId){
        let params = {
          forward_dynamic_id:dynamicId,
          title:this.relayData.title,
          content_html:this.relayData.content,
          circle_id:this.relayData.circle
        };
        let res = await this.$api.dynamic.add({method:'post', params});
        if(res.code == 200){
          this.$Message.success(res.message);
          this.closeRelay();
        }else{
          this.$Message.error(res.message);
        }
      },
      //菠菜投注弹层隐藏状态更改
      getFaultModalStatusChange(e){
        // console.log(e)
        this.$emit('setRelayPostModalShow',e);
      },
      //关闭弹层
      closeRelay(){
        this.$emit('setRelayPostModalShow',false);
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>

  .relay_main {
    padding-bottom: 20px;


    .relay_circle {
      margin: 0px 24px 0 14px;

      h3 {
        line-height: 28px;
        font-size: 14px;
        color: #333;
        margin: 0 0 6px 14px;
      }

      .relay_circle_wrap, .relay_circle_wrap1 {
        height: 78px;
        overflow: hidden;
        position: relative;
        margin-bottom: 8px;
      }


      ul {
        li {
          margin: 0 0 10px 10px;
          float: left;

          a {
            display: inline-block;
            line-height: 28px;
            text-align: center;
            font-size: 14px;
            color: #656973;
            background: #F0F1F2;
            border-radius: 8px;
            border-radius: 4px;
            padding: 0 10px;

            &.on {
              color: #fff;
              background: #0D8DFC;
              border-radius: 8px;
            }
          }

        }
      }

    }


    .relay_tiezi {
      margin-bottom: 10px;

      .relay_tiezi_main {
        width: 434px;
        margin: 0 auto 20px auto;
        padding: 0 10px;

        p {
          line-height: 34px;
          float: left;
        }
        input {
          width: 360px;
          height: 34px;
          font-size: 14px;
          color: #333;
          border: 1px solid #eee;
          border-radius: 4px;
          float: left;
          padding: 0 10px;
        }
        .textarea-text {
          float: left;
          border: 1px solid #EBEBED;
          border-radius: 4px;

          textarea {
            width: 360px;
            height: 140px;
            line-height: 34px;
            font-size: 14px;
            color: #333;
            padding: 0 10px;
            outline-style: none;
            outline-width: 0px;
            text-shadow: none;
            -webkit-appearance: none;
            -webkit-user-select: text;
            outline-color: transparent;
            box-shadow: none;
            resize: none;
            border: none;
          }

          .user-message-cont {
            background: #FAFAFA;
            margin: 12px;
            display: flex;

            .user-message-cont-img {
              border: 1px solid rgba(0,0,0,0.03);
              border-radius: 4px 0 0 4px;
              height: 60px;
              width: 60px;
            }
            .user-message-cont-right {
              margin-left: 12px;
            }
            .user-message-cont-text {
              font-size: 15px;
              color: #656973;
              max-width: 262px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
              line-height: 32px;
            }
            .user-message-cont-nickname {
              margin-top: 5px;
              display flex
              align-items center;

              .cont-text1-img {
                height: 18px;
                width: 18px;
                border-radius: 50%;
              }
              .cont-text1-name {
                display: inline-block;
                font-size: 12px;
                color: #656973;
                line-height: 18px;
                margin-left: 4px;
              }
            }

          }
        }
      }


    }



  }


</style>
