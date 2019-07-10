<template>
  <Modal
    class="report-modal"
    :value="reportAddModal"
    width="298"
    title="选择举报理由"
    @on-ok="reportAddAct"
    @on-visible-change="getFaultModalStatusChange">
    <RadioGroup v-model="reportParams.reportReason">
      <Radio class="item" label="1">
        <span>不友善行为</span>
      </Radio>
      <Radio class="item" label="2">
        <span>垃圾或有害信息</span>
      </Radio>
      <Radio class="item" label="3">
        <span>涉嫌侵权</span>
      </Radio>
      <Radio class="item" label="4">
        <span>不实信息</span>
      </Radio>
      <Radio class="item" label="5">
        <span>其他（注明理由）</span>
      </Radio>
    </RadioGroup>
    <Input v-model="reportParams.reportDesc" type="textarea" :rows="3" placeholder="请详细填写，以确保举报能够被受理（限200个字）" />
    <div slot="footer" class="report-modal-footer">
      <div class="circle-btn-blue fll" @click="reportAddAct(reportData.reportType, reportData.broadcastId, reportData.objectId)">确定</div>
      <div class="circle-btn-default flr" @click="getFaultModalStatusChange(false)">取消</div>
    </div>
  </Modal>
</template>

<script>
  export default {
    name: "report-modal",
    components: {},
    props:{
      reportAddModal:{
        type:Boolean,
        default: false
      },
      reportData:{
        type:Object,
        default: ()=>{}
      },
    },
    data() {
      return {
        reportParams:{
          reportReason:'',
          reportDesc:'',
        }
      }
    },
    mounted() {
    },
    methods: {
      //举报发送
      async reportAddAct(reportType, broadcastId, objectId){
        if(reportType == ''){
          this.$Message.warning('请填写举报理由~');
          return;
        }


        let params = {
          report_reason: this.reportParams.reportReason,
          reason_desc: this.reportParams.reportDesc,

          report_type: reportType,
          broadcast_id: broadcastId,
          object_id: objectId,
        };

        let res = await this.$api.dynamic.setReport({method:'post',params});
        if(res.code == '200'){
          this.$Message.success(res.message);
        }else{
          this.$Message.warning(res.message);
        }
        this.getFaultModalStatusChange(false)

      },
      cancel () {
        this.$emit('setReportModalShow',false);
      },
      getFaultModalStatusChange(e){
        // console.log(e)
        this.$emit('setReportModalShow',e);
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>

  .report-modal{

    .report-modal-footer{
      display flex;
      justify-content space-around;
      align-items center;
    }

    .item{
      display block;
      height: 40px;
      margin: 0 auto;
      line-height: 40px;
      cursor: pointer;
      font-size: 14px;
      color: #2d2f33;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
</style>
