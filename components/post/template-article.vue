<template>
  <div>
    <div class="article_wrap">
      <!--文章头图-->
      <img :src="detail.cover_url+'?x-oss-process=image/resize,m_fill,w_640,h_320,limit_0'" class="article_top_picture">
      <!--文章标题-->
      <h1 class="article_title">{{detail.title}}</h1>
      <!---->
      <div class="article_info flex justify_between gray_3">
        <p class="article_info_left">
          <span>{{detail.add_time | tsToaGo}}</span>
          发布于<nuxt-link :to="'/c/'+detail.circle_info[0].id" target="_blank" class="gray_3">{{detail.circle_info[0].circle_name}}</nuxt-link>
        </p>
        <div class="article_info_right">
          <a href="javascript:" @click="reportAdd(1, detail.member_id, detail.dynamic_id)" class="gray_3 article_report">举报</a>
          <span class="article_info_line">|</span>

          <Dropdown>
            <a href="javascript:void(0)" class="article_manage_btn gray_3">
              管理
            </a>
            <DropdownMenu slot="list">
              <DropdownItem onclick="master(1,'',this);">贴子置顶</DropdownItem>
              <DropdownItem onclick="master(3,'',this);">设置热门</DropdownItem>
              <DropdownItem onclick="master(5,'',this);">删除贴子</DropdownItem>
              <DropdownItem onclick="manager_pop(1,'楼主')">奖励果子</DropdownItem>
              <DropdownItem onclick="jinyan_pop('楼主',75165)">禁言管理</DropdownItem>
            </DropdownMenu>
          </Dropdown>


        </div>
      </div>
      <!--文章简介-->
      <h4 class="article_summary gray_2">{{detail.summary}}</h4>

      <!--文章内容-->
      <div class="article_main f_p_c">
        <article-detail :content="detail.content_html"></article-detail>
      </div>

      <!--文章视频 https://v.qq.com/iframe/player.html?vid=a0861q0310h -->
      <div class="article_main" v-if="detail.video && detail.video.length > 0">
        <video-box width="626" :src="detail.video[0].video_url"></video-box>
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
        <vote-detail :detail="detail.vote"></vote-detail>
      </div>

      <!--广告帖子-->
      <div class="article_main" v-if="detail.adverts && detail.adverts.length > 0">
        广告帖子怎么显示？ {{detail.adverts}}
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

      <div class="article_main">
        问答类型
      </div>

      <div class="article_main" v-if="detail.picture && detail.picture.length > 0">
        图片类型
      </div>


      <!--文章奖励-->
      <div class="post-good">

      </div>



      <!--文章打赏-->
      <div class="article_reward">
        <div class="article_reward_info flex justify_between align_center">
          <div class="article_reward_info_main flex">
            <a href="/u/75165" target="_blank">
              <img class="" src="https://img1.famulei.com/z/75165/p/194/0115421354572_100x100.png">
            </a>
            <div class="">
              <a :href="'/u/'+detail.member_id" target="_blank">
                <h3>{{detail.nickname}}</h3>
                <p class="gray_3">{{detail.member_demo}}</p>
              </a>
            </div>

          </div>
          <a href="javascript:" @click="rewardModal = true" class="article_reward_btn">打赏</a>
        </div>
        <div class="article_reward_main">
          <div id="article_reward_info">
            <p class="article_reward_main_p">为喜欢的作者加油！</p>
          </div>
          <div class="article_reward_main_member flex justify_between">
            <ul class="flex flex_wrap article_reward_list" id="article_reward_list">

            </ul>
            <a href="javascript:" id="diamond_reward_btn" class="flex justify_center align_center" style="display: none;">
              <svg class="icon" aria-hidden="true"><use xlink:href="#icon-arrow_blue"></use>
              </svg>
            </a>
          </div>
        </div>
      </div>
      <!--圈子信息-->
      <div class="circle_info flex justify_between align_center">
        <div class="circle_info_wrap flex">
          <a href="/c/1" target="_blank">
            <img src="http://img1.famulei.com/z/1060/p/165/0516510552973.png">
          </a>
          <div class="circle_info_main">
            <nuxt-link :to="'/c/'+detail.circle_info[0].id" target="_blank">
              <h2>{{detail.circle_info[0].circle_name}}</h2>
              <p style="display:flex;" class="gray_3">
                成员<span class="gray_1">{{detail.circle_info[0].fans_num}}</span>
                贴子<span class="gray_1">{{detail.circle_info[0].bar_num}}</span>
              </p>
            </nuxt-link>
          </div>

        </div>
        <a href="javascript:" @click="circleAttention(detail.circle_info[0].id, detail.circle_info[0].is_attention)" class="circle-btn active">
          {{detail.circle_info[0].is_attention == '1' ? '已加入' : '加入'}}
        </a>
      </div>


      <!--文章操作按钮-->
      <div class="dynamic_operate">
        <div class="dynamic_operate_main" :class="{'active' : detail.is_praise == 1}">
          <div class="dynamic_operate_icon article_praise_btn" @click="praise(detail.dynamic_id, detail.is_praise == 1 ? 'unPraise' : 'praise')">
            <i class="iconfont icon-circle__good_white"></i>
          </div>
          <p class="gray_2">{{detail.praise_count}}</p>
        </div>
        <div class="dynamic_operate_main" @click="scrollToComment()">
          <div class="dynamic_operate_icon article_comment_btn">
            <i class="iconfont icon-circle__comment"></i>
          </div>
          <p class="gray_2">{{detail.comment_count}}</p>
        </div>
        <div class="dynamic_operate_main">
          <div class="dynamic_operate_icon" @click="sharePop(8909,'http://img1.famulei.com/z/1060/p/165/0516510552973.png','https://img1.famulei.com/z/75165/p/194/0115421354572_100x100.png','dev小诸')">
            <i class="iconfont icon-share-51"></i>
          </div>
          <p class="gray_2">分享</p>
        </div>
        <div class="dynamic_operate_main" :class="{'active' : detail.is_collect == 1}">
          <div class="dynamic_operate_icon flex justify_center align_center article_collect_btn" @click="collect(detail.dynamic_id, detail.is_collect == 1 ? 'unCollect' : 'collect')">
            <i class="iconfont icon-general__collect_A" v-if="detail.is_collect == 1"></i>
            <i class="iconfont icon-general__collect" v-else></i>
          </div>
          <p class="gray_2">{{detail.is_collect == 1 ? '已收藏' : '收藏'}}</p>
        </div>
      </div>
      <!--左侧浮动文章操作按钮-->
      <div class="dynamic_operate left_operate">
        <div class="dynamic_operate_main" :class="{'active' : detail.is_praise == 1}">
          <div class="dynamic_operate_icon" @click="praise(detail.dynamic_id, detail.is_praise == 1 ? 'unPraise' : 'praise')">
            <i class="iconfont icon-circle__good_white"></i>
          </div>
        </div>
        <div class="dynamic_operate_main" @click="scrollToComment()">
          <div class="dynamic_operate_icon">
            <i class="iconfont icon-circle__comment"></i>
          </div>
        </div>
        <div class="dynamic_operate_main">
          <div class="dynamic_operate_icon" @click="sharePop(8909,'http://img1.famulei.com/z/1060/p/165/0516510552973.png','https://img1.famulei.com/z/75165/p/194/0115421354572_100x100.png','dev小诸')">
            <i class="iconfont icon-share-51"></i>
          </div>
        </div>
        <div class="dynamic_operate_main" :class="{'active' : detail.is_collect == 1}">
          <div class="dynamic_operate_icon" @click="collect(detail.dynamic_id, detail.is_collect == 1 ? 'unCollect' : 'collect')">
            <i class="iconfont icon-general__collect_A" v-if="detail.is_collect == 1"></i>
            <i class="iconfont icon-general__collect" v-else></i>
          </div>
        </div>
      </div>

    </div>

    <!--打赏文章弹层-->
    <reward-modal v-if="rewardModal"
                  :data="detail"
                  @closeReward="rewardModal=false"></reward-modal>

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
  /** 文章模板 **/
  import articleDetail from '~/components/post/article-detail' //文章类型帖子详情
  import videoDetail from '~/components/post/content/video-detail' //视频类型帖子详情
  import shareModal from '~/components/common/share-modal' //分享弹层
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
    name: "template-article",
    components: {
      RelayPostModal,
      BetGroupDetail,
      MatchDetail,
      BetSingleDetail,
      VoteDetail,
      RedEnvolopeDetail,
      SoundDetail,
      VideoBox,
      RewardModal,
      ReportModal,
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
        reportAddModal:false,//是否显示举报弹层
        reportData:{},
        rewardModal:false,//是否显示打赏文章弹层
        shareModal:false,//是否显示分享Modal,
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
      //打赏文章
      setReward(){

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
      //分享文章
      sharePop(){
        this.shareModal = true;
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
      scrollToComment(){
        $("html,body").animate({scrollTop:document.body.scrollHeight+"px"},200);
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .article_wrap {
    .article_top_picture {
      border-radius: 6px;
      margin-bottom: 20px;
    }

    .article_title {
      line-height: 40px;
      font-weight: 600;
      font-size: 30px;
      padding: 0 7px;
      margin-bottom: 20px;
    }

    .article_info {
      line-height: 20px;
      margin-bottom: 20px;
      padding: 0 7px;
      display flex
      justify-content space-between

      .article_info_left {

        span {
          margin-right: 8px;
        }
        a {
          margin-left: 8px;
        }
      }

      .article_info_right{





        .article_info_line {
          display: inline-block;
          color: #ebebed;
          margin: 0 12px;
        }
        //文章管理浮层
        .article_manage_btn {
          position: relative;

          .article_manage_wrap {
            width: 120px;
            background: #fff;
            box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px 0 rgba(0,0,0,0.08);
            border-radius: 4px;
            position: absolute;
            top: 30px;
            left: -50px;
            z-index: 10;
            padding: 5px;

            .article_manage_li {
              cursor: pointer;
              height: 36px;
              line-height: 36px;
              text-align: center;
              color: #2d2f33;
              border-radius: 8px;
              padding: 0 6px;
            }
          }
        }







      }



    }


    //文章简介
    .article_summary {
      line-height: 26px;
      font-size: 16px;
      font-weight: 400;
      background: #f5f6f7;
      border-radius: 6px;
      padding: 8px 16px;
      margin-bottom: 20px;
    }


    //文章内容
    .article_main {
      /*line-height: 34px;*/
      /*font-weight: 400;*/
      /*font-size: 17px;*/
      padding: 0 7px;
      margin-bottom: 50px;

      /*
      >>> p {
        line-height: 34px;
        font-size: 17px;
      }
      >>> img {
        max-width: 100%;
        margin-bottom: 17px;
      }
      >>> img:not(.content) {
        max-width: 100%;
        height: auto;
        display: block;
        margin: 0 auto;
        border: 0;
      }
      */

    }

    //文章打赏
    .article_reward{
      background: #f5f5f5;
      border-radius: 6px;
      margin-bottom: 20px;

      .article_reward_info {
        background: rgba(0,0,0,0.03);
        padding: 10px 20px;
        display flex
        justify-content space-between;
        align-items: center;

        .article_reward_info_main{
          display flex;
          padding: 14px 20px;

          img {
            width: 50px;
            height: 50px;
            border-radius: 50%;
            margin-right: 12px;
          }
          h3 {
            font-weight: 600;
            line-height: 22px;
            font-size: 16px;
            margin-top: 6px;
          }
          p {
            font-weight: 400;
            line-height: 18px;
          }

        }


        .article_reward_btn {
          display: block;
          width: 80px;
          height: 34px;
          line-height: 34px;
          text-align: center;
          font-size: 16px;
          color: #fff;
          background: #ff665b;
          border-radius: 17px;
        }
      }



      .article_reward_main{
        padding: 14px 20px;

        .article_reward_info{

          .article_reward_main_p {
            line-height: 20px;
            margin-bottom: 4px;
          }
        }
        .article_reward_main_member{
          display flex
          justify-content space-between
          flex-wrap wrap;

          .article_reward_list {
            width: calc(100% - 24px);
          }

          a {
            width: 24px;
            height: 24px;
            text-align: center;
            border: 1px solid rgba(0,0,0,0.1);
            border-radius: 50%;
            display flex
            justify-content center;
            align-items center
          }

        }

      }


    }

    //圈子信息
    .circle_info {
      border-radius: 6px;
      border: 1px solid rgba(0,0,0,0.06);
      padding: 14px 20px;
      margin-bottom: 40px;
      display flex
      justify-content space-between
      align-items center

      .circle_info_wrap{
        display flex

        img {
          width: 52px;
          height: 52px;
          border: 1px solid rgba(0,0,0,0.04);
          border-radius: 50%;
          margin-right: 12px;
        }
        .circle_info_main{
          h2 {
            line-height: 22px;
            font-size: 16px;
            margin-top: 5px;
            margin-bottom: 2px;
          }
          p {
            line-height: 20px;
            font-size: 12px;
            display flex

            span {
              margin: 0 16px 0 8px;
            }
          }

        }
        .circle_btn {
          display: block;
          width: 70px;
          height: 28px;
          line-height: 28px;
          text-align: center;
          color: #fff;
          background: #0d8dfc;
          border-radius: 20px;
        }
      }
    }


    //文章操作
    .dynamic_operate {
      margin-bottom: 50px;
      display flex
      justify-content center

      .dynamic_operate_main {
        text-align: center;
        margin: 0 35px;

        p {
          line-height: 20px;
          color: #656973;

          &.active{
            color: #0d8dfc;
          }
        }

        .dynamic_operate_icon {
          width: 50px;
          height: 50px;
          background: #f5f6f7;
          border-radius: 50%;
          cursor: pointer;
          margin-bottom: 8px;
          display flex
          justify-content center
          align-items center

          .icon {
            width: 26px;
            height: 26px;
            color: #656973;
            display flex
            justify-content center
            align-items center
          }
        }


        .iconfont{
          color: #656973;
          font-size: 28px;
        }
        &.active{
          .dynamic_operate_icon {
            background: rgba(13,141,252,0.06);
            .iconfont {
              font-size: 28px;
            }
            .icon,.iconfont {
              color: #0d8dfc;
            }
          }
        }



      }


      &.left_operate {
        position: fixed;
        left: 50%;
        top: 80px;
        margin-bottom: 50px;
        margin-left: -575px;
        display block;

        .dynamic_operate_main {
          margin: 0;

          .dynamic_operate_icon {
            margin-bottom: 20px;
          }

          &.active{
            .dynamic_operate_icon {
              background: rgba(13,141,252,0.06);

              .icon {
                color: #0d8dfc;
              }
            }
          }

          .dynamic_operate_icon {
            margin-bottom: 20px;
          }


        }

      }
    }





  }

</style>
