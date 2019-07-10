<template>
  <div class="manager_pop guozi_pop" v-if="show">
    <a href="javascript:;" @click="close" class="manager_pop_close"><i class="iconfont icon-iconx"></i></a>
    <div class="title-jinyan">禁言</div>
    <div class="object-jiangli">
      禁言对象 : <span class="guozi_name">{{nickname}}</span>
    </div>
    <p>禁言时间 : <input type="text" class="guozi" onkeyup="this.value=this.value.replace(/\D/g,'')" onafterpaste="this.value=this.value.replace(/\D/g,'')" v-model="closeTime">小时 <span class="moren-time">（0为永久）</span></p>
    <div class="object-why">操作理由 :</div>
    <textarea class="demo" v-model="remark"></textarea>
    <div class="manager_pop_btn-bottom cl">
      <a href="javascript:;" class="manager_pop_btn fl" @click="actSubmit(dynamicId,memberId,closeTime,remark)">提交</a>
      <a href="javascript:;" class="manager_pop_btn1 fr" @click="close">取消</a>
    </div>
  </div>
</template>

<script>
  // 奖励果子弹层
  export default {
    name: "forbid-comment-dialog",
    props:{
      show:{
        type: Boolean,
        default:false
      },
      nickname:{
        type: String,
        default:''
      },
      memberId:{
        type: String,
        default:''
      },
      dynamicId:{
        type: String,
        default:''
      },

    },
    components: {},
    data() {
      return {
        closeTime:'',
        remark:''
      }
    },
    mounted() {

    },
    methods: {
      actSubmit:function (dynamicId, broadcastId, closeTime, remark) {
        if (closeTime == '') {
          this.$Message.warning('禁言时间不能为空', 'tip2');
          return;
        } else if (remark == 0) {
          this.$Message.warning('禁言理由不能为空', 'tip2');
          return;
        }

        var params = {
          dynamic_id: dynamicId, //动态id
          broadcast_id: broadcastId, //禁言人的会员ID
          close_time:closeTime,
          remark:remark
        };
        this.$api.bar.bmCloseMember({params}).then((res)=> {
          if(res.code == 200){
            this.$Message.success('禁言成功', 'tip2');
            this.close();
            return;
          }
          this.$Message.error(res.message, 'tip2');
        }).catch(function (error) {
          console.log(error);
        });
      },
      close:function () {
        this.$emit('close',{hide:true});
      }
    },
    destroyed() {
    }
  }
</script>

<style scoped>
  .manager_pop {
    width: 320px;
    background: #fff;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px 0 rgba(0,0,0,0.08);
    border-radius: 4px;
    position: fixed;
    left: 50%;
    top: 30%;
    z-index: 30;
    margin-left: -190px;
  }
  .manager_pop_close {
    display: block;
    width: 46px;
    height: 46px;
    line-height: 46px;
    text-align: center;
    color: #fff;
    position: absolute;
    right: 0;
    top: 0;
  }
  .manager_pop .title-jinyan {
    border-radius: 4px 4px 0 0;
    line-height: 46px;
    text-align: center;
    font-size: 16px;
    color: #fff;
    margin: 0;
    background: #0d8dfc;
  }
  .manager_pop .object-jiangli {
    margin: 20px 0 0 20px;
    line-height: 20px;
    font-size: 14px;
    color: #2d2f33;
  }
  .manager_pop .object-jiangli span {
    color: #4b9ce3;
    padding-left: 6px;
  }
  .manager_pop p {
    margin: 14px 0 0 20px;
    line-height: 28px;
    font-size: 14px;
    color: #2d2f33;
  }
  .manager_pop p input {
    display: inline-block;
    width: 80px;
    height: 28px;
    padding-left: 12px;
    border: 1px solid #ebebed;
    border-radius: 4px;
    margin: 0 10px 0 6px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .manager_pop p .icon_size-guozi {
    margin-left: 4px;
    width: 16px;
    height: 16px;
    vertical-align: middle;
    margin-bottom: 2px;
  }
  .object-why {
    margin: 24px 0 0 20px;
    font-size: 14px;
    color: #2d2f33;
  }
  .manager_pop textarea {
    width: 280px;
    height: 80px;
    border: 1px solid #e5e5e5;
    border-radius: 5px;
    padding: 10px 14px;
    margin-top: 8px;
    resize: none;
    margin: 6px 20px 0;
    outline: none;
  }
  .manager_pop_btn-bottom {
    width: 280px;
    margin: 16px 20px 0;
    padding-bottom: 16px;
  }
  .manager_pop_btn {
    display: inline-block;
    width: 120px;
    line-height: 34px;
    text-align: center;
    color: #fff;
    background: #0d8dfc;
    border-radius: 20px;
  }
  .manager_pop_btn-bottom .manager_pop_btn1 {
    display: inline-block;
    width: 120px;
    line-height: 34px;
    text-align: center;
    font-size: 13px;
    color: #656973;
    border: 1px solid #ebebed;
    border-radius: 20px;
  }
</style>
