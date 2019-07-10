<template>
  <div class="bet-item" :class="{'status-blue': isSelected == true}">
    <div class="left-text">
      <span class="check" v-if="isBetting == '1'">
        <img class="check-icon white" src="/static/images/bet/checkbox_on_white@2x.png">
        <img class="check-icon blue" src="/static/images/bet/checkbox_on_blue@2x.png">
      </span>
      {{ itemName}}
    </div>
    <div class="right-odds">赔率：{{ odds}}</div>
  </div>
</template>

<script>
  // 菠菜投注的单个投注选项条
  export default {
    name: "bet-item-aside",
    components: {},
    props:{
      //菠菜是否投注
      isBetting:{
        type: [String, Number],
        default: 0
      },
      //当前菠菜项名称
      itemName:{
        type: String,
        required: true
      },
      //赔率
      odds:{
        type: String,
        required: true
      },
      //当前菠菜是否是开奖菠菜
      isSelected:{
        type: Boolean,
        default: false
      },
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {},
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
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

    .check{
      display: flex;
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
        background: url(/static/images/bet/bet_blue@2x.png) 0 0;
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
      background: url(/static/images/bet/bet_betting.png) 0 -135px;
      background-size: cover;
      color: #656973;
      font-size:14px;
      font-family:PingFangSC-Regular;
    }



  }

</style>
