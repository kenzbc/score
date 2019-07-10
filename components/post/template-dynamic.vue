<template>
  <div class="content-left-header">
    <!--帖子详情头部-->
    <div class="post-message cl">
      <div class="post-message-left fl">
        <a :href="'/c/'+detail.circle_info[0].id" class="post-team-img fl">
          <img class="post-team-img1" :src="detail.circle_info[0].circle_picture">
        </a>
        <div class="post-team-message fl">
          <a target="_blank" :href="'/c/'+detail.circle_info[0].id">
            <p class="post-team-name">{{detail.circle_info[0].circle_name}}</p>
          </a>
          <p class="post-team-desc">
            <span class="fan-num1">成员</span>
            <span class="fan-num2">{{detail.circle_info[0].fans_num}}</span>
            <span class="fan-num1">贴子</span>
            <span class="fan-num2">{{detail.circle_info[0].bar_num}}</span>
          </p>
        </div>
      </div>
      <div class="post-message-right fr">
        <p class="add-join-btn add-join-btn1" @click="circleAttention(detail.circle_info[0].id, detail.circle_info[0].is_attention)">
          {{detail.circle_info[0].is_attention == '1' ? '已加入' : '加入'}}
        </p>
      </div>
    </div>

    <!--帖子详情分页和跳转转楼层-->
    <div class="post-loft slide_headerpage cl">
      <div class="post-loft-left fl">
        <div class="loft-left-num fl">
          <span class="left-num-reply floor_all">{{detail.comment_count}}</span>
          <span class="left-num-reply1">条回复</span>
        </div>
        <div class="loft-left-page fl">
          <span class="left-page--text">共</span>
          <span class="left-page-all">{{Math.ceil(detail.comment_count/20)}}</span>
          <span class="left-page--text">页</span>
        </div>
      </div>
      <div class="post-loft-right fr">
        <div class="loft-right-go fl" style="display:none;">
          <div class="loft-right-text">跳转到</div>
          <input class="loft-right-input" type="text" v-model="thisFloor" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
          <div class="loft-right-text">楼</div>
          <div class="loft-go-button pages_floor" @click="changeFloor(thisFloor)">GO</div>
          <div class="loft-right-line"></div>
        </div>
        <div class="page-right-go fl">
          <div class="loft-right-text">跳转到</div>
          <input class="loft-right-input1" type="text" v-model="thisPageSize" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')">
          <div class="loft-right-text">页</div>
          <div class="loft-go-button1" @click="changePageSize(thisPageSize)">GO</div>
        </div>
      </div>
    </div>

    <!--帖子详情描述部分-->
    <div class="post-main">
      <!--帖子详情描述部分头部信息-->
      <div class="post-main-top">
        <div class="main-top-title">{{detail.title}}</div>
        <div class="main-top-desc">
          <div class="top-desc-user cl">
            <div class="top-desc-user-left fl">
              <a :href="'/u/'+detail.member_id" target="_blank">
                <img class="desc-user-avatar"
                     src="https://img1.famulei.com/z/6260726/p/1810/2920215632832_100x100.jpg" alt="">
                <div class="desc-user-name">{{detail.nickname}}</div>
              </a>
              <div class="desc-user-leval">Lv.{{detail.rank}}</div>
              <div class="desc-user-louzhu broadcast_only">只看楼主</div>
            </div>
            <div class="top-desc-user-right fr">
              <span class="right-text">{{detail.dateWord}}</span>
              <span class="desc-user-louzhu3" @click="scrollToComment()">快速回复</span>
            </div>
            <div class="top-desc-user-line"></div>
          </div>
          <!--下面又分多种内容-->
          <div class="main-top-cont">
            <!--文章简介-->
            <h4 class="article_summary gray_2">{{detail.summary}}</h4>

            <!--文章内容-->
            <div class="article_main f_p_c">
              <article-detail :content="detail.content_html"></article-detail>
            </div>

            <!--文章视频 https://v.qq.com/iframe/player.html?vid=a0861q0310h -->
            <div class="article_main" v-if="detail.video && detail.video.length > 0">

            </div>
            <!--文章语音-->
            <div class="article_main" v-if="detail.sound && detail.sound.length > 0">
              <sound-detail :detail="detail.sound[0]"></sound-detail>
            </div>
            <!--红包类型-->
            <div class="article_main" v-if="detail.redPacket_info && detail.redPacket_info.length > 0">
              <red-envolope-detail :detail="detail.redPacket_info[0]"></red-envolope-detail>
            </div>

            <!--投票类型-->
            <div class="article_main" v-if="detail.vote.vote != null && Object.keys(detail.vote.vote).length > 0">
              <!--<vote-detail :detail="detail.vote"></vote-detail>-->
            </div>

            <!--广告帖子-->
            <div class="article_main" v-if="detail.adverts && detail.adverts.length > 0">
              {{detail.adverts}}
            </div>

            <!--单场菠菜类型-->
            <div class="article_main" v-if="detail.bet_list && detail.bet_list.length > 0">
              <bet-single-detail :data-list="detail.bet_list"></bet-single-detail>
            </div>

            <!--组合菠菜类型-->
            <div class="article_main" v-if="detail.bet_group && detail.bet_group.length > 0">
              <bet-group-detail :data-list="detail.bet_group"></bet-group-detail>
            </div>
            <!--转发的组合菠菜类型-->
            <div class="article_main" v-if="detail.forward_bet_group && detail.forward_bet_group.length > 0">
              <bet-group-detail bet-type="forward" :data-list="detail.forward_bet_group"></bet-group-detail>
            </div>

            <!--比赛赛事显示-->
            <div class="article_main" v-if="detail.match && detail.match.length > 0">
              <match-detail></match-detail>
            </div>


          </div>
        </div>
      </div>


    </div>

    <!--贴子奖励和点赞收藏分享部分-->
    <div class="post-good">
      <div class="post-good-bottom flex justify_between">
        <div class="post-bottom-left">
          <div class="post-good-replay post-good-replay-bottom fl" @click="scrollToComment()">
            <i class="iconfont icon-circle__comment"></i>
            <span class="louzhu-replay-num">{{detail.comment_count}}</span>
          </div>
          <div class="post-good-replay  post-good-cai fl" title="点赞" :class="{'active' : detail.is_praise == 1}" @click="praise(detail.dynamic_id, detail.is_praise == 1 ? 'unPraise' : 'praise')">
            <i class="iconfont icon-circle__good_Gray"></i>
            <span class="louzhu-replay-num">{{detail.praise_count}}</span>
          </div>
          <div @click="shareModal = true" class="post-good-replay post-good-fenxiang fl" title="分享">
            <i class="iconfont icon-replay icon-share"></i>
            <span class="louzhu-replay-num">分享</span>
          </div>
          <div class="post-good-replay post-good-shoucang fl" :class="{'active' : detail.is_collect == 1}" @click="collect(detail.dynamic_id, detail.is_collect == 1 ? 'unCollect' : 'collect')">
            <i class="iconfont icon-general__collect_A" v-if="detail.is_collect == 1"></i>
            <i class="iconfont icon-general__collect" v-else></i>
            <span class="louzhu-replay-num">收藏</span>
          </div>

        </div>
        <div class="post-bottom-right flex">
          <div class="post-report" @click="reportAdd(1, detail.member_id, detail.dynamic_id)">举报</div>
        </div>
      </div>
    </div>


    <!--举报弹层-->
    <report-modal
      :reportAddModal="reportAddModal"
      :report-data="reportData"
      @setReportModalShow="setReportModalShow"></report-modal>

    <!--分享动态弹出框-->
    <share-modal :show="shareModal" :share-url="$route.fullPath"
                 @shareRelay = 'shareRelay'
                 @setShareModalShow="setShareModalShow"></share-modal>

    <!--转发帖子弹层-->
    <relay-post-modal
      :show="relayPostModal"
      :data="detail"
      @setRelayPostModalShow="setRelayPostModalShow"></relay-post-modal>


  </div>
</template>

<script>
  /** 帖子模板 **/
  import articleDetail from '~/components/post/article-detail' //文章类型帖子详情
  import videoDetail from '~/components/post/content/video-detail' //视频类型帖子详情
  import shareModal from '~/components/common/share-modal'
  import ReportModal from "../common/report-modal";
  import RewardModal from "./reward-modal";
  import VideoBox from "../shortVideo/video-box";
  import SoundDetail from "./content/sound-detail";
  import RedEnvolopeDetail from "./content/red-envolope-detail";
  import VoteDetail from "./content/vote-detail";
  import BetSingleDetail from "./content/bet-single-detail";
  import MatchDetail from "./content/match-detail";
  import BetGroupDetail from "./content/bet-group-detail";

  import { getHtmlDocName } from '~/utils/assist'
  import RelayPostModal from "./relay-post-modal";

  export default {
    name: "template-dynamic",
    components: {
      RelayPostModal,
      BetGroupDetail,
      MatchDetail,
      BetSingleDetail,
      VoteDetail,
      ReportModal,
      RewardModal,
      VideoBox,
      SoundDetail,
      RedEnvolopeDetail,
      articleDetail,
      videoDetail,
      shareModal
    },
    props:{
      detail:{
        type: Object,
        default: ()=>{}
      }
    },
    data() {
      return {
        thisFloor:'',
        thisPageSize:this.$route.query.pageNo ? this.$route.query.pageNo : 1,
        pageLimit:20,//分页数量

        reportAddModal:false,//是否显示举报弹层
        reportData:{},
        rewardModal:false,//是否显示打赏文章弹层
        shareModal:false,//是否显示分享Modal
        relayPostModal:false,//是否显示帖子转发弹层
      }
    },
    mounted() {

    },
    methods: {
      //分享弹层
      setShareModalShow(e){
        if(e === false){
          this.shareModal = false;
        };
      },
      //分享转发动作
      shareRelay(e){
        if(e === true){
          this.shareModal = false;
          this.relayPostModal = true;
        };
      },
      //帖子转发弹层回调
      setRelayPostModalShow(e){
        if(e === false){
          this.relayPostModal = false;
        };
      },
      //举报弹层隐藏处理
      setReportModalShow(e){
        if(e === false){
          this.reportAddModal = false;
          this.reportData = {};
        };
      },
      //举报
      reportAdd(reportType, broadcastId, objectId){
        this.reportAddModal = true;
        this.reportData.reportType = reportType; //举报类型： 1帖子 2 评论 3私信
        this.reportData.broadcastId = broadcastId;//举报对象人的ID 如帖子作者的member_id
        this.reportData.objectId = objectId; //举报对象Id，如帖子ID
      },
      /**
       * 圈子加入or取消加入
       * @param circleId 圈子ID
       * @param status 圈子当前关注状态  1:已关注  0:未关注
       * @returns {Promise<void>}
       */
      async circleAttention(circleId, status){

        let params = {
          circle_id: circleId
        };
        let res;
        if(status == '0'){
          res = await this.$api.circle.setJoinCircleAttention({params});
        }else{
          res = await this.$api.circle.setCancelCircleAttention({params});
        }
        if(res.code == '200'){
          this.$Message.success(res.message);
          this.$emit('refreshDetail',true);
        }else{
          this.$Message.error(res.message);
        }

      },
      //文章点赞
      async praise(dynamicId, type){

        let params = {
          dynamic_id:dynamicId
        };
        let res;
        if(type == 'praise'){
          res = await this.$api.dynamic.praise({params});
        }else{
          res = await this.$api.dynamic.unPraise({params});
        }
        if(res.code == '200'){
          this.$Message.success(res.message);
          this.$emit('refreshDetail',true);
        }else{
          this.$Message.error(res.message);
        }

      },
      /**
       * 收藏文章
       * @param dynamicId
       * @param type
       */
      async collect(dynamicId, type){
        let params={
          dynamic_id:dynamicId
        };

        let res;
        if(type == 'collect'){
          res = await this.$api.dynamic.collect({params});
        }else{
          res = await this.$api.dynamic.unCollect({params});
        }
        if(res.code == '200'){
          this.$Message.success(res.message);
          this.$emit('refreshDetail',true);
        }else{
          this.$Message.error(res.message);
        }
      },
      //顶部跳转楼层
      changeFloor(){

      },
      //顶部跳转评论分页
      async changePageSize(pageNo){
        this.thisPageSize = pageNo;
        this.$router.push({path:this.$router.path,query:{pageNo:pageNo}});
        this.$emit('refreshComments',{pageNo:pageNo});

      },

      scrollToComment(){
        $("html,body").animate({scrollTop:document.body.scrollHeight+"px"},200);
      }

    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  //帖子内容区域
  .content-left-header{
    background: #fff;
    box-shadow: 0 0 0 1px #ebebed;
    border-radius: 2px;
    position: relative;


    .post-message {
      height: 80px;
      overflow: hidden;
      display flex;
      justify-content space-between;

      .post-message-left {

        .post-team-img {
          margin: 14px 0 0 20px;

          .post-team-img1 {
            border: 1px solid rgba(0,0,0,0.04);
            height: 52px;
            width: 52px;
            border-radius: 50%;
          }
        }
        .post-team-message {
          margin-left: 12px;

          .post-team-name {
            margin-top: 19px;
            height: 22px;
            line-height: 22px;
            font-size: 16px;
            color: #2d2f33;
            font-weight: bold;
          }
          .post-team-desc {
            margin-top: 2px;
            line-height: 18px;

            .fan-num1 {
              font-size: 13px;
              color: #a8abb3;
            }
            .fan-num2 {
              margin: 0 17px 0 8px;
              font-size: 13px;
              color: #2d2f33;
            }
          }

        }
      }

      //加入圈子按钮
      .post-message-right {
        margin: 26px 20px 0 0;

        .add-join-btn {
          cursor: pointer;
          width: 70px;
          height: 28px;
          text-align: center;
          line-height: 26px;
          font-size: 13px;
          color: #fff;
          background: #0d8dfc;
          border-radius: 20px;
          border: 1px solid #0d8dfc;
        }
        .add-join-btn1 {
          border: 1px solid #0d8dfc;
          color: #0d8dfc;
          background: #fff;
        }
        .add-join-btn1.active {
          cursor: pointer;
          margin-top: 10px;
          width: 70px;
          height: 28px;
          background: #0d8dfc;
          border-radius: 20px;
          text-align: center;
          line-height: 26px;
          font-size: 13px;
          color: #fff;
          border: 1px solid #0d8dfc;
        }
      }
    }


    .post-loft {
      height: 40px;
      background: #fafafa;
      display flex;
      justify-content space-between;

      .post-loft-left {
        padding: 11px 0 0 24px;

        .loft-left-num{
          .left-num-reply {
            font-size: 13px;
            color: #000;
          }
          .left-num-reply1 {
            margin-left: 2px;
            font-size: 13px;
            color: #a8abb3;
          }
        }

        .loft-left-page {
          margin-left: 10px;

          .left-page--text {
            font-size: 13px;
            color: #a8abb3;
          }
          .left-page-all {
            margin: 0 2px;
            font-size: 13px;
            color: #000;
          }
          .left-page--text {
            font-size: 13px;
            color: #a8abb3;
          }
        }
      }

      .post-loft-right {
        margin-top: 9px;

        .loft-right-go {
          padding-right: 12px;
          position: relative;

          .loft-right-text {
            line-height: 22px;
            display: inline-block;
            vertical-align: middle;
            font-size: 13px;
            color: #a8abb3;
          }
          .loft-right-input {
            margin: 0 5px;
            border: 1px solid #ebebed;
            border-radius: 2px;
            width: 36px;
            height: 22px;
            text-align: center;
            line-height: 20px;
            display: inline-block;
            vertical-align: middle;
            margin-bottom: 1px;
            font-size: 12px;
            line-height: 20px;
          }
          .loft-right-text {
            line-height: 22px;
            display: inline-block;
            vertical-align: middle;
            font-size: 13px;
            color: #a8abb3;
          }
          .loft-go-button {
            cursor: pointer;
            margin-left: 5px;
            display: inline-block;
            vertical-align: middle;
            background: rgba(255,255,255,0.7);
            border: 1px solid #ebebed;
            border-radius: 8px;
            width: 36px;
            height: 22px;
            text-align: center;
            line-height: 20px;
            font-size: 12px;
            color: #656973;
          }
          .loft-right-line {
            position: absolute;
            background: #ebebed;
            height: 10px;
            width: 1px;
            right: 0px;
            top: 6px;
          }
        }
        .page-right-go {
          margin: 0 24px 0 12px;

          .loft-right-text {
            line-height: 22px;
            display: inline-block;
            vertical-align: middle;
            font-size: 13px;
            color: #a8abb3;
          }
          .loft-right-input1 {
            margin: 0 5px;
            border: 1px solid #ebebed;
            border-radius: 2px;
            width: 36px;
            height: 22px;
            text-align: center;
            line-height: 20px;
            display: inline-block;
            vertical-align: middle;
            margin-bottom: 1px;
            font-size: 12px;
            line-height: 20px;
          }
          .loft-right-text {
            line-height: 22px;
            display: inline-block;
            vertical-align: middle;
            font-size: 13px;
            color: #a8abb3;
          }
          .loft-go-button1 {
            cursor: pointer;
            margin-left: 5px;
            display: inline-block;
            vertical-align: middle;
            background: rgba(255,255,255,0.7);
            border: 1px solid #ebebed;
            border-radius: 8px;
            width: 36px;
            height: 22px;
            text-align: center;
            line-height: 20px;
            font-size: 12px;
            color: #656973;
          }
        }
      }

    }


    .post-main {
      margin: 12px 24px 0;

      .post-main-top {

        .main-top-title {
          width: 100%;
          overflow: hidden;
          font-size: 20px;
          color: #2d2f33;
          font-weight: bold;
          line-height: 30px;
        }

        .main-top-desc{
          .top-desc-user {
            height: 42px;
            position: relative;
            display flex;
            justify-content space-between;

            .top-desc-user-left {
              margin-top: 8px;

              .desc-user-avatar {
                height: 16px;
                width: 16px;
                border-radius: 50%;
              }
              .desc-user-name {
                display: inline-block;
                margin-left: 3px;
                font-size: 12px;
                color: #2d2f33;
              }
              .desc-user-leval {
                margin-left: 3px;
                display: inline-block;
                padding: 0 5px;
                height: 16px;
                line-height: 16px;
                text-align: center;
                background-image: linear-gradient(135deg,#19a7ff 0%,#058aff 100%);
                border-radius: 3px;
                font-size: 11px;
                color: #fff;
              }
              .desc-user-louzhu {
                cursor: pointer;
                margin-left: 3px;
                display: inline-block;
                border: 1px solid #d2d4d9;
                border-radius: 4px;
                width: 58px;
                height: 20px;
                line-height: 18px;
                text-align: center;
                font-size: 11px;
                color: #656973;
              }
            }
            .top-desc-user-right {
              padding-top: 10px;
              font-size: 12px;
              color: #a8abb3;

              .desc-user-louzhu3 {
                cursor: pointer;
                padding-left: 25px;
                color: #656973;
                display: inline-block;
                position: relative;
              }
              .desc-user-louzhu3:before {
                content: "";
                position: absolute;
                height: 10px;
                background: #ebebed;
                width: 1px;
                left: 12px;
                top: 2px;
              }
            }
            .top-desc-user-line {
              position: absolute;
              bottom: 0;
              width: 584px;
              height: 1px;
              left: 3px;
              border-top: 1px dotted #f0f1f2;
            }
          }


          .main-top-cont {
            margin-top: 15px;
          }
        }

      }

    }

    .post-good {
      margin: 10px 24px 0;
      padding-bottom: 6px;

      .post-good-bottom {
        margin-top: 20px;
        height: 32px;
        line-height: 32px;
        display flex;
        justify-content: space-between;

        .post-bottom-left{
          //回复
          .post-good-replay {
            cursor: pointer;
            display flex;
            align-items center;

            .louzhu-replay-num,.icon-replay,.louzhu-replay-num {
              font-size: 12px;
              color: #656973;
              margin-left:5px;
            }

            &.active{

              .iconfont,.louzhu-replay-num{
                color: #0d8dfc;
              }
            }



          }

          //赞
          .post-good-cai {
            margin-left: 30px;
          }
          //分享
          .post-good-fenxiang {
            margin-left: 30px;

            .icon-replay {
              font-size: 16px;
              color: #656973;
            }
          }
          //收藏
          .post-good-shoucang {
            margin-left: 30px;

            .icon-general__collect {
              margin-top: 1px;
              vertical-align: middle;
              font-size: 18px;
              color: #656973;
              display: inline-block;
            }
          }
        }
        .post-bottom-right {
          font-size: 12px;
          color: #a8abb3;
          cursor pointer
        }
      }
    }
  }

</style>
