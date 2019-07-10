<template>
  <div class="bet-dialog" v-if="show">
    <div class="dialog-container">
      <div class="dialog-box">
        <div class="d-header">
          竞猜投注
          <label class="bet-dialog-close" @click="close()"><i class="icon iconfont"></i></label>
        </div>
        <div class="bet-body">
          <div class="item-title">{{betItem.title}}</div>
          <div class="bet-item">
            <div class="left-text">
            <span v-if="data.is_betting == '1'">
              <img class="check-icon white" src="/static/images/match_new/checkbox_on_white@2x.png">
              <img class="check-icon blue" src="/static/images/match_new/checkbox_on_blue@2x.png">
            </span>
              {{data.item_name}}
            </div>
            <div class="right-odds">赔率：{{data.odds}}</div>
          </div>
          <p class="bet-desc">当前赔率按照双方队伍的押注而变动，结算赔率以关盘时为准</p>

          <div class="bet-detail">
            <div class="bet-input">
              <div class="left-slide">
                <label>投注金额</label>
                <input type="number" class="bet_single_price"
                       v-model="price" maxlength="5"
                       :placeholder="minBet +'-'+ data.member_max_bet"
                       @blur="onChangePrice()"/>
              </div>
              <div class="right-slide">
                <label>最大可投</label>
                <span class="guozi">
                    {{parseInt(data.member_max_bet) < parseInt(guozi) ? data.member_max_bet : guozi}}
                  </span>
                <svg class="icon icon_size pop-bocai-icon" aria-hidden="true">
                  <use xlink:href="#icon-guozi"></use>
                </svg>
              </div>
            </div>

            <div class="bet-input">
              <div class="left-slide">
                <label>预期可获</label>
                <span class="guozi">{{Math.ceil(price * data.odds)}}</span>
                <svg class="icon icon_size pop-bocai-icon" aria-hidden="true">
                  <use xlink:href="#icon-guozi"></use>
                </svg>
              </div>
              <div class="right-slide">
                <label>当前果子</label>
                <span class="guozi">{{guozi}}</span>
                <svg class="icon icon_size pop-bocai-icon" aria-hidden="true">
                  <use xlink:href="#icon-guozi"></use>
                </svg>
              </div>
            </div>

          </div>
        </div>
        <div class="bet-footer">
          <div class="bet-btn" @click="close()">取消</div>
          <div class="bet-btn active" @click="submitBetting(betItem.bet_id, data.bet_item_id)">投注</div>
        </div>

      </div>

    </div>
  </div>
</template>

<script>
  export default {
    name: 'bet-dialog',
    props:{
      show:{
        type:Boolean,
        default:false
      },
      guozi:{
        type: Number,
        default:0
      },
      betItem:{
        type:Object,
        default:function () {
          return {};
        }
      },
      data:{
        type:Object,
        default:function () {
          return {};
        }
      }
    },
    data:function() {
      return {
        minBet:10,
        price:10,
      }
    },
    watch:{
      price:function(newVal,oldVal){
        if(newVal > 0){
          if(newVal >= parseInt(this.data.member_max_bet)){
            this.price = parseInt(this.data.member_max_bet);
            this.$Message.warning('已超过最大可投数量！');
            return;
          }
        }else if(newVal > this.guozi) {
          this.$Message.warning('您的果子数量不够！');
          return;
        }
      }
    },
    mounted() {

    },
    methods: {
      /**关闭菠菜投注弹层**/
      close:function(){
        this.price = this.minBet;
        this.$emit('close',true);
      },
      onChangePrice:function(){
        console.log(this.price);
        if(parseInt(this.price) < parseInt(this.minBet)){
          this.$Message.warning('最小投注'+this.minBet+'果子！');
          this.price = this.minBet;
        }
      },
      /**菠菜投注**/
      submitBetting:function(betId,betItemId){
        var params = {
          'bet_id': betId,
          'bet_item_id':betItemId,
          'price':this.price
        };
        this.$api.bet.setBet({params}).then((res)=> {
          if (res.code == '200') {
            this.$emit('close',true);
            this.betDialogGuozi = '';
            this.betDialogBet = {};
            this.betDialogItem = {};
            this.$root.$emit('refresh-data', true);
          }
          this.$Message.success(res.message);
        });

      }
    }
  }
</script>

<style lang="stylus" scoped>

  .bet-dialog{
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999;
    background: rgba(0,0,0,0.7);
    position: fixed;



    .dialog-container{
      transform: translate(-50%,-50%);
      position: absolute;
      top: 50%;
      left: 50%;
      background: #fff;
      border-radius:4px;
      overflow hidden;

      .dialog-box{
        width:320px;
        min-height:340px;
        background:#fff;
        box-shadow:0px 2px 8px 0px rgba(0,0,0,0.08),0px 0px 0px 1px rgba(0,0,0,0.03);
        position: relative;


        .d-header{
          width:320px;
          height:46px;
          background:#0D8DFC;
          border-radius:4px 4px 0px 0px;

          font-size:16px;
          font-family:PingFangSC-Semibold;
          font-weight:600;
          color:#FFFFFF;
          line-height:46px;
          text-align center;

          .bet-dialog-close{
            position: absolute;
            top: 10px;
            right: 10px;
            width: 24px;
            height: 24px;
            border-radius: 50%;
            text-align: center;
            cursor: pointer;
            padding-top: 1px;
            line-height initial;

            .icon{
              font-size: 12px;
              color: #fff;
            }
          }
        }

        .bet-body{
          padding:20px 15px 14px;
        }

        .item-title{
          line-height: 24px;
          font-weight: 700;
          font-size:14px;
          font-family:PingFangSC-Semibold;
          margin-bottom:12px;
          color #2D2F33;
          text-align center;
        }
        .bet-item{
          width 100%;
          display flex;
          justify-content space-between;
          line-height: 34px;
          border-radius:24px;
          margin-bottom: 8px;
          border: 1px solid #f0f1f2;
          cursor pointer;
          overflow: hidden

          .check-icon{
            width 16px;
            height 16px;
            margin-right:10px;
          }
          .white{
            display none;
          }

          &.status-blue {
            background: #0D8DFC;
            border: 1px solid #077af0;
            cursor: default;

            .blue{
              display none;
            }

            .left-text{
              color: #FFFFFF;
            }

            .right-odds{
              color: #FFFFFF;
              background: url(/images/bet_v4/Bet_blue@2x.png) 0 0;
            }
          }

          .left-text{
            height: 34px;
            width: 130px;
            padding-left: 14px;
            font-size:14px;
            font-family:PingFangSC-Regular;
            color:#2D2F33;
            display: flex;
            align-items: center;
          }

          .right-odds{
            width: 115px;
            height: 34px;
            text-align: center;
            background: url(https://img1.famulei.com/static/126/images/bet_v4/bet_betting.png) 0 -135px;
            background-size: cover;
            color: #656973;
            font-size:14px;
            font-family:PingFangSC-Regular;
          }



        }

        .bet-desc{
          font-size:12px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:#A8ABB3;
          line-height:17px;
        }
        .bet-detail{
          width 100%;
          margin-top:24px;
          display flex;
          flex-wrap wrap;

          .left-slide,.right-slide{
            width 50%;

          }

          .bet-input{
            width: 100%;
            margin-bottom:16px;
            display flex;
            justify-content space-between;

            label{
              font-family:PingFangSC-Regular;
              color:#2D2F33;
              line-height:20px;
            }
            input{
              width:54px;
              height:28px;
              border-radius:4px;
              border:1px solid #EBEBED;
              font-size:16px;
              font-family:D-DINExp-Bold;
              font-weight:bold;
              color:#FF6942;
              line-height:18px;
              text-align center;
            }
            .guozi{
              font-size:16px;
              font-family:D-DINExp-Bold;
              font-weight:bold;
              color:#FF6942;
              line-height:18px;
            }
          }
        }



        .bet-footer {
          width 100%;
          display flex;
          justify-content center;
          padding: 0 0 16px;
          background: #fff;

          .bet-btn {
            width:110px;
            height:34px;
            border-radius:18px;
            border:1px solid #EBEBED;
            font-size:13px;
            font-family:PingFangSC-Regular;
            font-weight:400;
            color:#656973;
            text-align center;
            line-height 34px;

            &:hover{
              cursor pointer;
            }

            &.active{
              background:rgba(13,141,252,1);
              border-radius:20px;
              color:#fff;
              margin-left:16px;
            }
          }
        }



      }


    }
  }




</style>
