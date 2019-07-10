<template>
  <div class="content-right-original">
    <div class="circle-recomm-top cl">
      <div class="recomm-top-left fl">
        <span class="recomm-top-left-line"></span>
        <span class="recomm-top-left-text">楼主</span>
      </div>
    </div>
    <div class="circle-recomm-middle">
      <div class="circle-recomm-middle-line"></div>
      <div class="right-original-cont">
        <div class="original-cont-top" :style="'background:url('+item.broadcast_info.background+') no-repeat;background-size:100% 100%;'">

        </div>
        <div class="original-cont-avatar cl">
          <a :href="'/u/'+item.member_id" class="por fll">
            <img class="original-cont-avatar-img" :src="item.broadcast_info.avatar" alt="">
            <img v-if="item.broadcast_info.type == '1'" src="/static/images/member/v.png" class="img-staff">
            <img v-if="item.broadcast_info.type == '2'" src="/static/images/member/staff.png" class="img-staff">
          </a>
          <div @click="attention(item.member_id, isAttention)" class="focus-people-btn focus-people-btn1 fr"
               :class="{'active':isAttention == '1'}">
            {{isAttention == '1' ? '已关注' : '关注'}}
          </div>
        </div>
        <div class="original-cont-desc">
          <div class="original-user-message">
            <div class="original-user-nickname">{{item.broadcast_info.nickname}}</div>
            <div class="original-user-sex">
              <img v-if="item.broadcast_info.is_girl == '0'" src="/static/images/member/female.png" width="20">
              <img v-else src="/static/images/member/male.png" width="20">
            </div>
            <div class="original-user-leval">Lv.{{item.broadcast_info.rank}}</div>
          </div>
          <div class="original-cont-title">{{item.broadcast_info.demo}}</div>
        </div>
        <div class="original-cont-list">
          <div class="original-cont-list-item">
            <a :href="'/u/'+item.member_id">
              <span class="fan-number1">文章</span>
              <span class="fan-number2">待接口提供</span>
            </a>
          </div>
          <div class="original-cont-list-item">
            <a :href="'/u/'+item.member_id">
              <span class="fan-number1">贴子</span>
              <span class="fan-number2">{{item.broadcast_info.bar_count}}</span>
            </a>
          </div>
          <div class="original-cont-list-item">
            <a :href="'/u/'+item.member_id+'#like'">
              <span class="fan-number1">关注</span>
              <span class="fan-number2">{{item.broadcast_info.attention_count}}</span>
            </a>
          </div>
          <div class="original-cont-list-item">
            <a :href="'/u/'+item.member_id+'#fans'">
              <span class="fan-number1">粉丝</span>
              <span class="fan-number2">{{item.broadcast_info.fans_count}}</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "right-side-member",
    components: {},
    props:{
      item:{
        type: Object,
        default: ()=>{}
      }
    },
    data() {
      return {
        isAttention:0,
      }
    },
    watch:{
      item(newVal,oldVal){
        this.isAttention = newVal.broadcast_info.is_attention;
      },
    },
    mounted() {
      this.isAttention = this.item.broadcast_info.is_attention;
    },
    methods: {
      /**
       * 关注或取消关注楼主
       * @param memberId
       * @param status 1:已关注 0:未关注
       */
      async attention(memberId, status){
        let params = {
          attention_member_id:memberId
        };
        let res;
        if(status == 1){//1为已关注，再次点击时取消关注
          res = await this.$api.member.unAttention({params});
        }else{
          res = await this.$api.member.setAttention({params});
        }

        if(res.code == '200'){
          status == 1 ? this.isAttention = 0 : this.isAttention = 1;
          this.$Message.success(res.message);
        }else {
          this.$Message.error(res.message);
        }

      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>

  .content-right-original {
    background: #fff;
    box-shadow: 0 0 0 1px #ebebed;
    border-radius: 2px;

    .circle-recomm-top {
      padding: 10px 13px 10px 14px;

      .recomm-top-left {

        .recomm-top-left-line {
          display: inline-block;
          height: 12px;
          width: 4px;
          background: #0d8dfc;
          vertical-align: middle;
        }
        .recomm-top-left-text {
          line-height: 20px;
          margin-left: 6px;
          font-size: 15px;
          color: #2d2f33;
          font-weight: bold;
          vertical-align: middle;
        }
      }

    }
    .circle-recomm-middle {

      .circle-recomm-middle-line {
        height: 1px;
        background: #f0f1f2;
        margin: 0 15px;
      }
      .right-original-cont {
        margin: 10px;

        .original-cont-top {
          height: 80px;
          border-radius: 4px;
        }
        .original-cont-avatar {
          height: 38px;
          position: relative;
          display flex;

          .original-cont-avatar-img {
            background: #fff;
            border: 2px solid #fff;
            height: 70px;
            width: 70px;
            border-radius: 50%;
            position: absolute;
            top: -32px;
            left: 16px;
          }
          .img-staff {
            height: 24px;
            width: 24px;
            border-radius: 50%;
            position: absolute;
            top: 15px;
            left: 65px;
          }
          .focus-people-btn {
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
          .focus-people-btn1 {
            border: 1px solid #0d8dfc;
            color: #0d8dfc;
            background: #fff;
            position: absolute;
            right: 0px;
            top: 0px;

            &.active{
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
        .original-cont-desc {
          margin: 15px 0 0 12px;

          .original-user-message {
            display: flex;
            align-items: center;

            .original-user-nickname {
              vertical-align: middle;
              display: inline-block;
              font-size: 16px;
              color: #2d2f33;
              font-weight: bold;
            }
            .original-user-sex {
              display: inline-block;
              margin-left: 7px;
              height: 20px;
              width: 20px;
              border-radius: 50%;
              text-align: center;
              line-height: 20px;
            }
            .original-user-leval {
              display: inline-block;
              margin-left: 7px;
              padding: 0 5px;
              height: 16px;
              line-height: 16px;
              text-align: center;
              background-image: linear-gradient(135deg, #19a7ff 0%, #058aff 100%);
              border-radius: 3px;
              font-size: 11px;
              color: #fff;
            }

          }
          .original-cont-title {
            margin-top: 8px;
            font-size: 14px;
            color: #656973;
          }
        }

        .original-cont-list {
          margin: 8px 0 0 12px;
          padding-bottom: 15px;
          display flex
          justify-content space-between
          flex-wrap wrap;

          .original-cont-list-item {
            display: inline-block;
            flex: 0 0 calc(50% - 3px);
            height: 28px;
            line-height: 28px;
            text-align: left;
            background: #f5f6f7;
            border-radius: 14px;
            padding: 0 12px;
            margin-bottom: 8px;

            .fan-number1 {
              font-size: 12px;
              color: #a8abb3;
            }
            .fan-number2 {
              margin-left: 6px;
              font-size: 14px;
              color: #2d2f33;
              font-weight: bold;
            }
          }
        }
      }
    }
  }


</style>
