<template>
  <div class="bg" @click="closeReward()">

    <div class="score_diamond_wrap score_pop_wrap" v-if="!rewardIsSuccess" @click.stop>
      <div class="diamond_member">
        <a href="/u/75165" target="_blank">
          <img :src="data.avatar">
          <p>{{data.nickname}}</p>
        </a>
      </div>
      <div class="diamond_pop_main">
        <ul class="diamond_list">
          <li :class="{'active' : rewardPrice == 1}" @click="rewardPrice = 1">
            <svg class="icon" aria-hidden="true">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-wallet_zuanshi"></use>
            </svg>
            <span>1</span>
          </li>
          <li :class="{'active' : rewardPrice == 5}" @click="rewardPrice = 5">
            <svg class="icon" aria-hidden="true">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-wallet_zuanshi"></use>
            </svg>
            <span>5</span>
          </li>
          <li :class="{'active' : rewardPrice == 10}" @click="rewardPrice = 10">
            <svg class="icon" aria-hidden="true">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-wallet_zuanshi"></use>
            </svg>
            <span>10</span>
          </li>
          <li :class="{'active' : rewardPrice == 50}" @click="rewardPrice = 50">
            <svg class="icon" aria-hidden="true">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-wallet_zuanshi"></use>
            </svg>
            <span>50</span>
          </li>
          <li :class="{'active' : rewardPrice == 100}" @click="rewardPrice = 100">
            <svg class="icon" aria-hidden="true">
              <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-wallet_zuanshi"></use>
            </svg>
            <span>100</span>
          </li>
          <li class="custom">
            <span class="max">MAX</span>
          </li>
        </ul>
        <p class="diamond_tips gray_3">提示：您打赏的钻石会直接转入作者的账户哦</p>
        <div class="diamond_pay">
          <div class="diamond_info">
            <p class="diamond_pay_num pay_type">打赏数量：<span id="check_diamond">{{rewardPrice}}</span>
              <svg class="icon" aria-hidden="true">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-wallet_zuanshi"></use>
              </svg>
            </p>
            <p class="diamond_pay_num unpay_type" v-if="rewardPrice > userInfo.diamond">钻石不足，请充值</p>
            <p class="diamond_pay_had gray_3">钻石余额：<span id="have_diamond">{{userInfo.diamond}}</span>
              <svg class="icon" aria-hidden="true">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="#icon-wallet_zuanshi"></use>
              </svg>
            </p>
          </div>
          <a href="javascript:" @click="reward()" v-if="userInfo.diamond > rewardPrice" class="diamond_btn pay_type brand">确定</a>
          <a href="javascript:" @click="recharge()" v-else class="diamond_btn unpay_type green_1">去充值</a>
        </div>
      </div>
    </div>

    <div class="score_alert_wrap score_pop_wrap" v-if="rewardIsSuccess">
      <p class="info">感谢您的喜欢<br>我会继续努力哒！</p>
      <a href="javascript:" class="close" @click="closeReward()">知道啦</a>
    </div>

  </div>

</template>

<script>
  /**文章打赏弹层组件**/
  export default {
    name: "reward-modal",
    components: {},
    props:{
      data:{
        type: Object,
        default:()=>{}
      }
    },
    data() {
      return {
        rewardPrice:1,
        rewardIsSuccess:false,//是否打赏成功
      }
    },
    mounted() {
      this.getUserInfo();
      this.dynamicId = this.data.dynamic_id;
    },
    methods: {
      async getUserInfo(){
        let params = {
          broadcast_id:this.$store.state.modules.login.member_id
        };
        let userInfo = await this.$api.member.getUserInfo({params});
        this.userInfo = userInfo.data;
        this.$store.commit('modules/login/setUserInfo', userInfo.data);
      },
      //打赏
      async reward(){
        let params = {
          dynamic_id:this.dynamicId,
          number:this.rewardPrice,
        };

        let reward = await this.$api.dynamic.diamondReward({method:'post',params});
        if(reward.code == 200){
          this.rewardIsSuccess = true;
        }

      },
      //充值
      recharge(){},



      closeReward(){
        this.$emit('closeReward',true);
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .bg{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(55,55,55,.6);
    height: 100%;
    z-index: 1000;
  }

  .score_diamond_wrap {
    width: 300px;
    padding: 0 15px;
  }

  .score_pop_wrap {
    background: #FFFFFF;
    box-shadow: 0 0 0 1px rgba(0,0,0,0.03), 0 2px 8px 0 rgba(0,0,0,0.08);
    border-radius: 4px;
    position: fixed;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;

    .diamond_member {
      position: relative;
      padding-top: 40px;
      margin-bottom: 20px;

      img {
        width: 60px;
        height: 60px;
        border-radius: 50%;
        position: absolute;
        left: 50%;
        top: -30px;
        transform: translate(-50%, 0);
      }
      p {
        line-height: 22px;
        text-align: center;
        font-size: 16px;
        font-weight: 600;
      }

    }

    .diamond_pop_main{

      .diamond_list {
        padding-bottom: 7px;
        display flex
        flex-wrap wrap

        li {
          flex: 0 0 80px;
          height: 40px;
          text-align: center;
          background: #f7f8fa;
          border: 2px solid #f7f8fa;
          border-radius: 6px;
          cursor: pointer;
          margin: 5px;
          display flex
          justify-content center
          align-items center

          &.active {
            background: rgba(13,141,252,0.04);
            border: 2px solid #0d8dfc;
          }

          .icon {
            width: 20px;
            height: 20px;
            color: #0d8dfc;
          }
          span {
            line-height: 20px;
            font-size: 16px;
            font-weight: 600;
          }
        }
      }

      .diamond_tips {
        font-size: 12px;
        font-weight: 400;
        line-height: 16px;
        padding: 0 5px;
        margin-bottom: 12px;
      }

      .diamond_pay {
        border-top: 1px solid #f0f1f2;
        padding: 18px 5px;
        display flex
        justify-content space-between
        align-items center

        .diamond_info{

          .diamond_pay_num {
            line-height: 24px;
            display flex
            align-items center

            &.unpay_type {
              color: #ff5c69;
            }

            span {
              font-size: 20px;
              font-weight: bold;
            }
            .icon {
              width: 20px;
              height: 20px;
              color: #0d8dfc;
            }
          }

          .diamond_pay_had {
            line-height: 16px;
            font-size: 12px;
            display flex
            align-items center
          }

        }

        .diamond_btn {
          height: 34px;
          line-height: 34px;
          text-align: center;
          color: #fff;
          border-radius: 17px;
          padding: 0 18px;

          &.brand {
            background-color: #0D8DFC;
          }

          &.unpay_type{
            background-color: #16DE9B;
          }
        }
      }
    }


    .info {
      line-height: 24px;
      text-align: center;
      padding-top: 20px;
      margin-bottom: 26px;
    }

    .close {
      display: block;
      width: 260px;
      height: 34px;
      line-height: 34px;
      text-align: center;
      color: #fff;
      background: #0d8dfc;
      border-radius: 24px;
    }
  }

  .score_alert_wrap {
    padding: 16px 20px;
  }
</style>
