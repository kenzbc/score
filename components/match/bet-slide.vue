<template>
  <div class="match-bet block">

    <h4 class="title">菠菜</h4>
    <div class="bet-list" :class="{'small' : size == 'small'}">

      <div class="bet-group" v-for="item in dataList.slice(0, currentNum)">
        <div class="item-title">{{item.title}}</div>
        <div v-for="it in item.items" @click="selectItem(it,item)">
          <bet-item-aside :class="{'status-blue':item.result_item_id == it.bet_item_id}"
                          :is-betting="it.is_betting"
                          :item-name="it.item_name"
                          :odds="it.odds"></bet-item-aside>
        </div>

        <div class="item-footer">
          <i class="iconfont icon-more1"></i>
          <span>{{item.people_num}} 人已投注 {{item.total_price}}</span>
          <span :class="{'end-text' : item.status != 1}">{{item.bet_end_time_txt}}</span>
        </div>
      </div>

      <no-data v-if="dataList.length < 1"></no-data>

      <div class="more" v-if="dataList.length > defaultNum" @click="showMore()">{{currentNum <= defaultNum ? '展开' : '收起' }} <i class="iconfont icon-general__arrow" :class="{'open': currentNum > defaultNum}"></i></div>

    </div>

    <bet-dialog
      :show="betDialogShow"
      :guozi="betDialogGuozi"
      :data="betDialogBet"
      :bet-item="betDialogItem"
      @close="closeBetModal"></bet-dialog>

  </div>
</template>


<script>

  export default {
    name: 'bet-slide',
    components:{
    },
    props:{
      size:{
        type: String,
        default: ''
      },
      dataList:{
        type:Array,
        default:function () {
          return [];
        }
      }
    },
    data:function() {
      return {
        defaultNum:5,//超过多少条显示展开
        currentNum:5,//默认显示条数

        betDialogShow: false, //是否显示果子投注弹层
        betDialogGuozi: 0, //我的果子
        betDialogItem:{},
        betDialogBet:{},
      }
    },
    mounted() {

    },
    methods: {
      /**获取投注选项**/
      selectItem (it,item) {
        console.log(item)
        // 如果投注已结束，提示
        if(item.status != 1){
          this.$Message.warning('该菠菜投注已经结束！');
          return;
        }
        this.$api.bet.getBetItem({params:{'bet_item_id': it.bet_item_id}}).then((res)=> {
          // console.log('success res=');
          // console.log(res.data);
          this.betDialogShow = true;
          this.betDialogGuozi = res.data.guozi;
          this.betDialogBet = it;
          this.betDialogItem = item;
          // _this.isLoading = false
        }).catch(function (error) {
          console.log(error);
        });

      },
      closeBetModal(e){
        if(e==true){
          this.betDialogShow = false;
        }
      },
      showMore(){
        if(this.defaultNum <= 3){
          this.defaultNum = 9999;
        }else{
          this.defaultNum = 3;
        }
      },
      refreshData(){
        this.$root.$emit('refresh-data', true);
      }
    }
  };
</script>

<style lang="stylus" scoped>

  .match-bet{
    width: 100%;
    min-height:100px;
    background:rgba(255,255,255,1);
    border-radius:2px;

    .title{
      line-height: 40px;
      border-bottom: 1px solid #F0F1F2;
      position: relative;
      margin: 0 12px;
      padding-left: 14px;
      font-size:15px;
      font-family:PingFangSC-Semibold;
      font-weight:600;
      color:#2D2F33;

      &:before{
        content: '';
        display: block;
        width: 4px;
        height: 12px;
        background: #0D8DFC;
        position: absolute;
        left: 2px;
        top: 14px;
      }
    }
    .bet-list{
      width: 100%;
      padding: 14px;
      padding-bottom: 4px;

      &.small{
        height: calc(100% - 141px);
        overflow: auto;
      }

      .bet-group{
        margin-top:10px;
        padding-bottom:10px;
        border-bottom: 1px dotted #f0f1f2;

        &:first-child{
          margin-top:0;
        }

        .item-title{
          line-height: 24px;
          font-weight: 700;
          font-size:14px;
          font-family:PingFangSC-Semibold;
          margin-bottom:6px;
          color #2D2F33;
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
            .white{
              display inline-block;
            }

            .left-text{
              color: #FFFFFF;
            }

            .right-odds{
              color: #FFFFFF;
              background: url(/images/bet_v4/Bet_blue@2x.png) 0 0;
            }
          }


          &.status-yellow {
            background: #FFEB79;
            border: 1px solid #FFD651;
            cursor: default;

            .left-text{
              color: #8C6600;
            }

            .right-odds{
              color: #8C6600;
              background: url(https://img1.famulei.com/static/126/images/bet_v4/bet_betting.png) 0 -25px;
            }
          }

          &.status-red {
            background: #ff5c5c;
            border: 1px solid #f44b4b;
            cursor: default;

            .left-text{
              color: #fff;
            }

            .right-odds{
              color: #fff;
              background: url(https://img1.famulei.com/static/126/images/bet_v4/bet_betting.png) 0 -135px;
            }
          }

          .left-text{
            height: 34px;
            width: 50%;
            padding-left: 14px;
            font-size:14px;
            font-family:PingFangSC-Regular;
            color:#2D2F33;
            display: flex;
            align-items: center;


            .check{
              display flex;
              align-content center;
            }

            .bet-title{
              display: inline-block;
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
              width: 100%;
            }
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

        .item-footer{
          font-size:12px;
          font-family:PingFangSC-Regular;
          font-weight:400;
          color:#A8ABB3;
          line-height:17px;

          .end-text{
            padding: 0 6px;
            color: #ff5c5c;
          }

          i{
            display inline-block;
            width 16px;
            height 16px;
            line-height 16px;
            text-align center;
            border-radius:50%;
            background #EBEBED;
            color #bfc1c5;
            font-size:12px;

          }
        }
      }


      .more{
        width 100%;
        height:32px;
        display flex;
        align-items center;
        justify-content: center;
        background:#fff;
        color:#2D2F33;
        box-shadow:0px 4px 10px -4px rgba(0,0,0,0.04);
        cursor pointer;

        .iconfont{
          display inline-block;
          margin-left:4px;
          color:#c6c7cd;

          &.open{
            transform: rotate(180deg);
            transition: all 0.3s ease-in;
          }
        }
      }
    }

  }




  /*320-767*/
  @media screen and (min-width: 320px) and (max-width: 767px) {
    .match-bet.block {
      overflow: auto;
      height: calc(100% - 60px);
    }
  }

  /*768-1023*/
  @media screen and (min-width: 768px) and (max-width: 1023px) {
    .match-bet.block {
      overflow: auto;
      height: calc(100% - 60px);
    }
  }

  /*1024-1129*/
  @media screen and (min-width: 1024px) and (max-width: 1129px) {

  }

  /*1130-1410*/
  @media screen and (min-width: 1130px) and (max-width: 1410px) {

  }

</style>
