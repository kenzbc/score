<template>
  <div class="dialog-modal" v-if="show && matchInfo">
    <div class="dialog-container forecast">
      <!--{{data}}-->
      <div class="title">
        {{Object.keys(matchInfo.forecast).length > 0 ? '修改预测' : '预测比赛'}}
        <label class="bet-dialog-close" @click="close()"><i class="icon iconfont"></i></label>
      </div>
      <div class="forecast-button">
        <div class="f-btn blue" :class="{'active' : matchInfo.teamID_a == params.win_teamID}" @click="selectTeamBtn(matchInfo.teamID_a)">
          {{matchInfo.team_a_short_name}} 胜</div>
        <div class="f-btn red" :class="{'active' : matchInfo.teamID_b == params.win_teamID}" @click="selectTeamBtn(matchInfo.teamID_b)">
          {{matchInfo.team_b_short_name}} 胜</div>
      </div>
      <div class="desc">预测正确可得 3 果子</div>
      <textarea class="text-area" v-model="params.content" placeholder="说说你的看法吧！"></textarea>
      <div class="footer-btn">
        <div class="submit-btn" :class="{'active' : defaultTeam != ''}" @click="submitForecast">提交预测</div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "forecast-modal",
    components: {},
    props:{
      show:{
        type:Boolean,
        default:false
      },
      defaultTeam:{
        type: [String, Object]
      },
      matchInfo:{
        type:Object,
        default:function () {
          return {};
        }
      }
    },
    data() {
      return {
        currentTeam:'',
        params: {
          matchID: '',
          win_teamID: '',
          content: ''
        },
      }
    },
    mounted() {

    },
    watch: {
      show:function(newVal,oldVal){
        this.currentTeam = this.defaultTeam;
        this.params.matchID = this.matchInfo.matchID;
        // 选择胜队伍
        if(Object.keys(this.matchInfo.forecast).length > 0){
          this.currentTeam = this.matchInfo.forecast && this.matchInfo.forecast.forecast_teamID == this.matchInfo.teamID_b ? 'b' : 'a';
          // 选择胜队伍id
          if(this.matchInfo.forecast && this.matchInfo.forecast.forecast_teamID == this.matchInfo.teamID_a){
            this.params.win_teamID = this.matchInfo.teamID_a;
          }else if(this.matchInfo.forecast && this.matchInfo.forecast.forecast_teamID == this.matchInfo.teamID_b){
            this.params.win_teamID = this.matchInfo.teamID_b;
          }
          // 胜的理由
          this.params.content = this.matchInfo.forecast && this.matchInfo.forecast.content ? this.matchInfo.forecast.content : '';
        }else{
          this.params.win_teamID = this.defaultTeam ? this.defaultTeam : '';
        }
      },
    },
    methods: {
      /**
       * submit_success 成功提交/修改
       * 关闭弹层**/
      close(submit_success){
        var backParams = {
          hide: true, // 隐藏弹层
        };
        if (submit_success) backParams.success = submit_success;
        this.params.win_teamID = '';
        this.$emit('close', backParams);
      },
      // 选择队伍
      selectTeamBtn(id){
        this.params.win_teamID = id;
      },
      // 提交预测
      submitForecast(){
        if(Object.keys(this.params.win_teamID).length < 1){
          this.$Message.warning('请选择您预测的队伍！');
          return false;
        }

        let params = this.params;
        // console.log(_this.params);
        this.$api.match.setMatchForecast({params}).then((res)=> {
          if (res.code == '200') {
            this.close(true);
            this.$root.$emit('refresh-data', true);
            this.$Message.success('预测已提交');
          }else{
            this.$Message.error('预测提交失败');
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
    background: rgba(0, 0, 0, 0.7);
    position: fixed;
    display flex;
    justify-content center;
    align-items center;


    .forecast{
      width:280px;
      height:294px;
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

      .forecast-button{
        margin-top 14px;
        display flex
        justify-content space-between;
        align-items center;

        .f-btn{
          width:114px;
          height:30px;
          line-height:26px;
          text-align center;
          border-radius:4px;
          font-size:14px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          cursor pointer;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          &.red{
            border:2px solid #FF5C69;
            color:#FF5C69;

            &.active{
              background:#FF5C69;
              border-radius:4px;
              border:2px solid rgba(0,0,0,0.1);
              font-size:14px;
              font-family:PingFangSC-Semibold;
              font-weight:600;
              color:#FFFFFF;
            }
          }

          &.blue{
            border:2px solid #0D8DFC;
            color:#0D8DFC;

            &.active{
              background:#0D8DFC;
              border-radius:4px;
              border:2px solid rgba(0,0,0,0.1);
              font-size:14px;
              font-family:PingFangSC-Semibold;
              font-weight:600;
              color:#FFFFFF;
            }
          }



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
        height:96px;
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
          background:#F6F7F8;
          border-radius:100px;
          font-size:14px;
          font-family:PingFangSC-Medium;
          font-weight:500;
          color: #b0b0b0;
          cursor pointer;

          &.active{
            background:#0D8DFC;
            color:#FFFFFF;
          }
        }
      }

    }


  }

</style>
