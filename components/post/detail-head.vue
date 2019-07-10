<template>
  <div class="star_dynamic_member cl">
    <a :href="'/p/'+data.dynamic_id" target="_blank" class="star_dynamic_avatar fll">
      <img :src="data.broadcast_info.avatar+'?x-oss-process=image/resize,m_fill,w_36,h_36,limit_0'" class="star_dynamic_avatar_img">
      <img v-if="data.broadcast_info.type == '1'" src="/static/images/member/v.png" class="score_member_type">
      <img v-if="data.broadcast_info.type == '2'" src="/static/images/member/staff.png" class="score_member_type">
    </a>
    <div class="star_dynamic_info fll">
      <h4>
        <a :href="'/u/'" target="_blank"> {{data.broadcast_info.nickname}}</a>
        <span>Lv.{{data.broadcast_info.rank}}</span>
      </h4>
      <p class="gray_3"> 发布于 {{data.circle_info[0].circle_name}}</p>
    </div>
    <div class="star_dynamic_else flr">
      <i class="iconfont icon-general__arrow gray_2"></i>
      <ul>
        <li><a href="javascript:" @click="reportAdd(1, data.member_id, data.dynamic_id)">举报</a></li>
        <li><a href="javascript:" @click="blockMemberConfirm(data.member_id)">屏蔽该用户</a></li>
      </ul>
    </div>


    <!--举报弹层-->
    <report-modal
      :reportAddModal="reportAddModal"
      :report-data="reportData"
      @setReportModalShow="setReportModalShow"></report-modal>

  </div>
</template>

<script>
  import ReportModal from "../common/report-modal";
  /**
   * 帖子详情 item 用户头像区域
   */



  export default {
    name: "detail-head",
    components: {ReportModal},
    props:{
      data:{
        type:Object,
        default:()=>{}
      }
    },
    data() {
      return {
        reportAddModal:false,//是否显示举报弹层
        reportData:{},
      }
    },
    mounted() {

    },
    methods: {
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
      //屏蔽用户
      blockMemberConfirm(member_id){
        this.$Modal.confirm({
          title: '提示',
          content: '您确定要屏蔽改用户吗？',
          onOk: () => {
            this.blockMember(member_id)
          }
        });
      },
      //屏蔽用户
      async blockMember(member_id){
        let params = {
          block_member_id: member_id
        };
        this.$api.member.setBlockMemeber({params}).then((res)=>{
          if(res.code == '200'){
            this.$Message.success(res.message);
          }else{
            this.$Message.warning(res.message);
          }
        }).catch((err)=>{
          this.$Message.error('系统发生了错误~');
        });

      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .star_dynamic_member {
    margin: 4px 0 8px 0;
    width: 100%;

    .star_dynamic_avatar {
      display: block;
      position: relative;
      margin-right: 8px;

      .score_member_type {
        width: 16px;
        height: 16px;
        position: absolute;
        right: -2px;
        bottom: -2px;
      }

      img.star_dynamic_avatar_img {
        display: block;
        width: 36px;
        height: 36px;
        border-radius: 50%;
      }
    }


    .star_dynamic_info {

      h4 {
        line-height: 20px;

        span {
          display: inline-block;
          height: 16px;
          line-height: 14px;
          font-size: 12px;
          font-weight: normal;
          color: #fff;
          background-image: linear-gradient(-135deg, #058aff 0%, #19a7ff 100%);
          border-radius: 4px;
          padding: 0 4px;
          margin: -4px 0 0 8px;
        }
      }

      p {
        line-height: 18px;
        font-size: 12px;
      }
    }

    .star_dynamic_else {
      display: block;
      position: relative;
      cursor: pointer;

      &:hover ul {
        display: block;
      }

      ul {
        display: none;
        width: 120px;
        background: #fff;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px 0 rgba(0,0,0,0.08);
        border-radius: 4px;
        position: absolute;
        left: 0px;
        top: 100%;
        padding: 5px;
        z-index: 1;

        li {
          line-height: 36px;
          border-radius: 4px;
          padding: 0;

          a {
            display: block;
            border-radius: 4px;
            padding: 0 10px;
            width: 100%;

            &:hover{
              color: #fff;
              background: #0d8dfc;
            }
          }
        }
      }
    }
  }

</style>
