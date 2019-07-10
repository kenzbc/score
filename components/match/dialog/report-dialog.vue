<template>
    <div class="dialog-wrap" v-if="show">
        <div class="pop" @click="close"></div>
        <div class="report_wrap score_pop_wrap">
            <h2 class="pop-title">{{score.languagePackage.currPackage['ChooseTheReasonForReporting']}}</h2>
            <div class="report-body">
                <ul class="pop-content">
                    <li :class="{'active': curRadio == item.id}"
                        @click="radioBtn(item.id)"
                        v-for="item in radio">
                        <span class="icon-box">
                            <svg class="icon radio-on" aria-hidden="true"><use xlink:href="#icon-general_checkbox_on"></use></svg>
                            <svg class="icon radio-off" aria-hidden="true"><use xlink:href="#icon-general_checkbox_off"></use></svg>
                        </span>
                        <span class="text-box">{{ item.text }}</span>
                    </li>
                </ul>
                <textarea class="text-content" name="message" maxlength="200" v-model="reason_desc"
                          :placeholder="score.languagePackage.currPackage['OthersDetailsReason']"></textarea>
                <div class="score_pop_btn">
                    <div class="pop-btn ok fll" @click="submitReport()">{{score.languagePackage.currPackage['Confirm']}}</div>
                    <div class="pop-btn cancel flr" @click="close()">{{score.languagePackage.currPackage['Cancel']}}</div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
  export default {
    name: "report-dialog",
    props: {
      show: {
        type: Boolean,
        default: false
      },
      reportData: {
        type:Object,
        default:function () {
          return {};
        }
      }
    },
    data() {
      return {
        radio: [
          {
            id: 1,
            text: 'UnfriendlyBehavior'
          },
          {
            id: 2,
            text: 'SpamOrHarmfulInformation'
          },
          {
            id: 3,
            text: 'AllegedInfringement'
          },
          {
            id: 4,
            text: 'FalseInformation'
          },
          {
            id: 5,
            text: 'OthersReason'
          },
        ],
        curRadio: '', // 单选
        reason_desc: ''
      }
    },
    methods: {
      /**
       * submit_success 成功提交/修改
       * 关闭弹层**/
      close(submit_success) {
        var backParams = {
          hide: true, // 隐藏弹层
        };
        if (submit_success) backParams.success = submit_success;
        this.$emit('close', backParams);
      },
      // 单选
      radioBtn(id){
        this.curRadio = id;
      },

      submitReport () {
        if (!this.curRadio) {
          global_tips('请选择举报理由', 'tip1');
          return false;
        }

        var params = {
          broadcast_id:  this.reportData.broadcast_id,  //举报对象member_id
          object_id: this.reportData.object_id,   //举报帖子或评论id,私信举报时为被举报人member_id
          report_type: this.reportData.report_type,  //举报类型： 1帖子 2 评论 3私信
          cache_key: this.reportData.cache_key,  //缓存ID
          report_reason: this.curRadio,  //举报理由 1不友善行为 2垃圾或有害信息 3涉嫌侵权 4不实信息 5其他
          reason_desc: this.reason_desc,   //理由补充
        };

        console.log(params);

        var _this = this;
        scoreTools.promiseApi('/services/common/report_member.php', params).then(function (res) {
          if (res.code == '200') {
            _this.close(true);
          }
          global_tips(res.message, 'tip1');
        });
      }
    },
    watch: {
      show(newVal, oldVal){
        if (newVal == true) {
          this.curRadio = '';
          this.reason_desc = '';
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
  /*举报弹出框*/
  .dialog-wrap {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;

    z-index: 99;
    .pop {
      position fixed
      top 0
      bottom 0
      left 0
      right 0
      width 100%
      height 100%
      background: rgba(0, 0, 0, .5);
      z-index 100
    }

    .report_wrap {
      max-width: 400px;
      min-width: 300px;
      height: 384px;
      overflow: hidden;

      &.score_pop_wrap {
        display: initial;
        background: #FFFFFF;
        box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px 0 rgba(0,0,0,0.08);
        border-radius: 4px;
        position: fixed;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        z-index: 999;
      }

      .report-body {
        padding 0 20px
      }
      .score_pop_btn {

        overflow: hidden;
        padding-top: 12px;
        text-align: center;

        .pop-btn {

          display: inline-block;
          width: 114px;
          height: 34px;
          line-height: 32px;
          border-radius: 20px;
          font-size: 13px;
          text-align: center;
          color: #656973;
          cursor: pointer;
          transition: background .3s;

          &.ok {
            background: #0D8DFC;
            color: #fff;
          }

          &.cancel {
            background: #fff;
            border: 1px solid #EBEBED;
            margin-left 30px
          }
        }
      }

      .pop-title {
        height: 46px;
        line-height: 46px;
        text-align: center;
        background: #0D8DFC;
        color: #fff;
        font-size: 16px;
      }

      .pop-content {
        margin: 7px 0 5px;
        li {
          height: 40px;
          margin: 0 auto;
          line-height: 40px;
          cursor: pointer;
          font-size: 14px;
          color: #2D2F33;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;

          .icon-box {
            display: inline-block;
            vertical-align: middle;
            width: 16px;
            height: 16px;
            margin-right: 3px;

            position: relative;
          }

          .text-box {
            display: inline-block;
            vertical-align: middle;
          }

          .icon {
            width: 16px;
            height: 16px;
            color: #999;
            position: absolute;
            background: #fff;

            &.radio-on {
              z-index: -1;
              visibility: hidden;
            }
            &.radio-off {
              z-index: 1;
            }

          }

          &.active {
            .icon {
              &.radio-on {
                z-index: 1;
                visibility: visible;
              }
              &.radio-off {
                z-index: -1;
                visibility: hidden;
              }

            }
          }
        }
      }

      textarea {
        width: 100%;
        height: 66px;
        display: block;
        margin: 0 auto;
        resize: none;
        outline: none;
        border: 1px solid #F0F1F2;
        border-radius: 4px;
        line-height: 1.4;
        color: #2D2F33;
        padding: 3px 9px;
        font-size: 14px;
        font-family: PingFang SC, 'Microsoft Yahei', sans-serif;
        word-wrap: break-word;

        &::-webkit-input-placeholder { /* WebKit browsers */
          color: #D2D4D9;
        }

        &:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
          color: #D2D4D9;
        }

        &::-moz-placeholder { /* Mozilla Firefox 19+ */
          color: #D2D4D9;
        }

        &:-ms-input-placeholder { /* Internet Explorer 10+ */
          color: #D2D4D9;
        }
      }
    }
  }

</style>
