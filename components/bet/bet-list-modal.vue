<template>
  <Modal width="670" :value="show"  @on-visible-change="getFaultModalStatusChange">
    <p slot="header">
      <svg class="icon" aria-hidden="true"><use xlink:href="#icon-jingcaijilu"></use></svg>
      <span>投注记录</span>
    </p>
    <div class="record_body">
      <div class="detail_row">
        <div class="detail_cell">投注时间</div>
        <div class="detail_cell">竞猜详情</div>
        <div class="detail_cell">竞猜金额</div>
      </div>
      <div class="detail_row" v-for="item in memberBetList">
        <div class="detail_cell">{{ item.add_time}}</div>
        <div class="detail_cell">{{ item.item_name}}</div>
        <div class="detail_cell">{{ item.price}}<svg class="icon icon_size" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg></div>
      </div>
      <!--{{? it.length == 0}}-->
      <!--<div class="detail_nodata">-->
      <!--<p>暂时没有投注记录</p>-->
      <!--</div>-->
      <!--{{?}}-->
    </div>
    <div slot="footer"></div>
  </Modal>
</template>

<script>
  export default {
    name: "bet-list-modal",
    props:{
      show: {
        type: Boolean,
        default: false
      },
      memberBetList: {
        type: Array,
        default: ()=>[]
      }
    },
    methods: {
      //菠菜投注记录弹层隐藏状态更改
      getFaultModalStatusChange(e){
        // console.log(e)
        this.$emit('setMemberBetModalShow',e);
      }
    }
  }
</script>

<style lang="stylus" scoped>
  // 我的竞猜记录
  .detail_row{
    display:table-row;
    line-height:30px;
    font-size:13px;
    /*background:#F9FAFB;*/

    &:nth-child(2n+1){
      background:#F9FAFB;
    }

    .detail_cell{
      display:table-cell;
      width:4%;
      padding-left:30px ;

      &:first-Child {
        div{
          font-weight:bold;
        }
      }

      .icon{
        margin-left:5px;
      }
    }
  }
</style>

