<template>
  <div class="index_right_wrap">
    <h4 class="index_slide_title">
      <!--<i class="iconfont icon-remensaishi"></i>-->
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-bocai3"></use>
      </svg>
      菠菜
      <a href="/bet_list" class="index_slide_more gray_3 flr">更多</a>
    </h4>


    <section class="index_right_bet">
      <div class="index_v4_aside_cont bet_single_list" v-if="dataList && dataList.length > 0" v-for="item in dataList">
        <div class="index_v4_aside_cont_top cl">
          <img class="fll" :src="item.tournament_image" alt="">
          <p class="fll">{{item.tournament_name}} - {{item.round_name}} {{item.match_team_a}} vs {{item.match_team_b}}</p>
        </div>
        <div class="index_v4_aside_cont-title bet_single_detail">
          {{item.title}}
        </div>

        <div class="more-flow">
          <a href="javascript:;" v-for="it in item.items" @click="getBetItem(it, item.bet_id)">
            <bet-item-aside
              :is-betting="betItem.is_bet"
              :is-selected="betItem.result_item_id == it.bet_item_id"
              :item-name="it.item_name"
              :odds="it.odds"></bet-item-aside>
          </a>
        </div>
        <div class="inde-time gray_3 flex justify_between">
          <span>{{item.bet_end_time_txt}}</span>
        </div>
      </div>

      <!--<bet-modal :show="betModal" :betId="betId" :betItem="betItem" :guozi="guozi" @setBetModalShow="setBetModalShow"></bet-modal>-->
      <bet-modal :show.sync="betModal" :betId="betId" :betItem="betItem" :guozi="guozi" @close="setBetModalShow"></bet-modal>
    </section>
  </div>
</template>

<script>
  export default {
    name: "",
    components: {
    },
    data() {
      return {
        betModal: false,
        guozi:'0',
        betId:'',
        betItem:{
          bet_item_id: "",
          init_price: "0",
          price: 10,
          member_max_bet: 1000,
          item_name: "",
          item_name_en: "",
          item_name_tw: "",
          win_rate: "0",
          odds: "0"
        },
      }
    },
    props:{
      dataList:{
        type: Array,
        default: ()=> []
      },
      limit:{
        type: Number,
        default: 5
      },
    },
    watch:{

    },
    mounted() {


    },
    methods: {
      // 获取菠菜投注项
      async getBetItem(betItem, betId){

        // console.log(betItem)

        this.betItem = betItem;
        this.betId = betId;

        let params = {
          'bet_item_id':betItem.bet_item_id
        };

        let res = await this.$api.bet.getBetItem({params});
        if(res.code == '200'){
          this.betModal = true;
          this.guozi = res.data.guozi;
        }else{
          this.$Message.warning(res.message);
          return;
        }
      },
      setBetModalShow(e){
        if(e === false){
          this.betModal = false;
        };
      }
    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .index_right_wrap {
    width: 330px;
    background: #fff;
    box-shadow: 0 0 0 1px #ebebed;
    border-radius: 2px;
    margin-bottom: 14px;
  }
  .index_slide_title {
    width: calc(100% - 24px);
    line-height: 44px;
    font-size: 16px;
    border-bottom: 1px solid #f0f1f2;
    margin: 0 auto;
  }
  .index_slide_title .icon {
    width: 24px;
    height: 24px;
    margin: 10px 8px 0 0;
    float: left;
  }
  .index_slide_title .index_slide_more {
    font-size: 14px;
    font-weight: normal;
    color:#A8ABB3;
    float: right;
  }

  /*菠菜新加样式*/
  .index_right_bet {
    padding: 0 12px;
  }
  .index_v4_aside_cont {
    background: #fff;
    padding-bottom: 20px;
  }
  .index_v4_aside_cont_top {
    padding: 10px 0px 8px 0;
    display flex;
    img {
      width: 24px;
      height: 24px;
    }
    p{
      line-height: 24px;
      font-weight: 700;
      font-size: 16px;
      padding-left: 8px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
    }
  }

  .index_v4_aside_cont-title {
    line-height: 20px;
    margin-bottom: 8px;
  }
  .index_v4_aside_cont-bottom {
    line-height: 34px;
    border-radius: 10px;
    margin-bottom: 8px;
  }
  .index_v4_aside_cont-bottom-left {
    height: 34px;
    width: 180px;
    padding-left: 10px;
  }
  .index_v4_aside_cont-bottom-right {
    width: 115px;
    height: 34px;
    text-align: center;
  }
  .inde-time {
    font-size: 12px;
    color: #A8ABB3;
  }
  .inde-time .iconfont {
    font-size: 12px;
    display: inline-block;
    margin-top: -5px;
  }
  /*不同的颜色背景图*/
  .list-match-red {
    background: #ff5c5c;
    border: 1px solid #ff3d3d;
    border-radius: 10px;
    font-size: 14px;
    color: #fff;
    font-weight: bold;
  }
  .list-match-red-url {
    font-size: 14px;
    color: #fff;
    font-weight: bold;
    background: url("/static/images/bet/bet_betting.png") 0 -45px;
    background-size: cover;
  }
  .list-match-yellow {
    background: #ffeb79;
    border: 1px solid #ffe23b;
    border-radius: 10px 10px;
    font-weight: bold;
    font-size: 14px;
    color: #5f6575;
  }
  .list-match-yellow-url {
    background: url("/static/images/bet/bet_betting.png") 0 0;
    background-size: cover;
  }
  .list-match-red-url {
    background: url("/static/images/bet/bet_betting.png") 0 -45px;
    background-size: cover;
  }
  .list-match-gray {
    background: #fcfdfe;
    border: 1px solid #f0f1f2;
    border-radius: 10px 10px;
    opacity: 0.7;
    font-weight: bold;
    font-size: 14px;
    color: #5f6575;
  }
  .list-match-gray-url {
    opacity: 0.7;
    font-weight: bold;
    font-size: 14px;
    color: #5f6575;
    background: url("/static/images/bet/bet_betting.png") 0 -135px;
    background-size: cover;
  }
  .list-match-gray1 {
    border: 1px solid #f0f1f2;
    border-radius: 10px;
  }
  .list-match-gray1:hover {
    background: #f8f9fa;
  }
  .list-match-gray-url1 {
    background: url("/static/images/bet/bet_betting.png") 0 -135px;
    background-size: cover;
  }




</style>
