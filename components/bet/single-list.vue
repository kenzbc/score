<template>
  <div class="bet_single_list" >

    <section  v-for="(item, index) in betSingleList">
    <div class="bet_group_header"
         v-if="type != 6 && (index != 0 && item.date_txt != betSingleList[index - 1].date_txt || index == 0 ) ">
      <img src="/static/images/bet/line.png">
      <p>{{ item.date_txt }}</p>
    </div>
    <div class="bet_group margin_b">
      <input type="hidden" name="" class="bet_single_start_id" :value="item.start_id">
      <div class="bet_single_title">
        <label class="fll" @click="match_link(item.match_id,item.tournament_id)">
          <img :src="item.tournament_image == '' ? '/static/images/tx_pic.jpg' : item.tournament_image">
        </label>
        <p class="fll"
           @click="match_link(item.match_id,item.tournament_id)">
          {{ item.tournament_name }} {{ item.round_name ? '- ' + item.round_name : ''}} {{ item.round_son_name ?  '- ' + item.round_son_name : ''}}
        </p>
        <span class="games fll" v-if="item.bet_list">{{ item.bet_list.length}}</span>
      </div>

      <div class="bet_single_regular_dec" v-if="item.view_type == 1">
        <div class="left fll">
          <p>{{ item.match_date}}</p>
          <p>{{ item.match_date1}}</p>
        </div>
        <div class="center fll">
          <div class="bet_clan fll">
            <p class="fll">{{ item.match_team_a}}</p>
            <label class="fll">
              <img :src="item.team_image_thumb_a == '' ? '/static/images/tx_pic.jpg' : item.team_image_thumb_a">
            </label>
          </div>
          <div class="bet_vs fll">
            <p>vs</p>
            <p>BO{{ item.game_count}}</p>
          </div>
          <div class="bet_clan flr">
            <p class="flr">{{ item.match_team_b}}</p>
            <label class="flr">
              <img :src="item.team_image_thumb_b == '' ? '/static/images/tx_pic.jpg' : item.team_image_thumb_b">
            </label>
          </div>
        </div>
        <div class="right flr">
          <p @click="forward_link(item.match_id)">赛事前瞻</p>
        </div>
      </div>
      <div class="bet_single_cycle_dec" v-if="item.view_type ==2">
        <span class="big_title">{{ item.tournament_en_name}}</span>
        <p class="min_title">{{ item.tournament_name}}</p>
      </div>


      <div class="bet_single_detail margin_b2 pointer" v-for="betItem in item.bet_list">
        <div class="bet_single_detail_title">
          <input type="hidden" class="bet_id" name="" :value="betItem.bet_id">
          <p class="title fll">{{ betItem.title}}</p>
          <p class="flr">
            <span>{{ betItem.people_num}}人已投注{{ betItem.total_price}}</span>
            <span>{{ betItem.bet_end_time_txt}}</span>
            <i class="icon iconfont" @click="getMemberBetList(betItem.bet_id)">&#xe6d8;</i>
          </p>
        </div>
        <div class="bet_single_detail_dec">
          <a href="javascript:;"  class="bet_single_click fll"
             v-for="score in betItem.items">
            <bet-item-aside
              :is-betting="score.is_bet"
              :is-selected="betItem.result_item_id == score.bet_item_id"
              :item-name="score.item_name"
              :odds="score.odds" @click="getBetItem(score, betItem.bet_id)"></bet-item-aside>
          </a>
        </div>
      </div>
    </div>
    </section>
    <bet-modal :show="betModal" :betId="betId" :betItem="betItem" :guozi="guozi" @close="setBetModalShow"></bet-modal>
    <bet-list-modal :show="betListModal" :memberBetList="memberBetList" @setMemberBetModalShow="setMemberBetModalShow"></bet-list-modal>
  </div>
</template>
<script>
  import betModal from '../common/bet-modal'
  import betListModal from '../bet/bet-list-modal'
  export default {
    name: "single-list",
    components: {
      betModal,
      betListModal
    },
    data(){
      return {
        // betSingleList:[],
        betModal: false,
        betListModal: false,
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
          odds: "0",
        },
        guozi: '',
        isDate: true,
        dateTextCur: '',
        memberBetList: [],
      }
    },
    props: {
      betSingleList: {
        type: Array,
        default: []
      },
      type: {
        type: String,
        default: '1'
      },
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
      // 获取投注记录
      async getMemberBetList(betId){
        console.log(betId);
        this.betListModal = true;

        // 模拟数据
        this.memberBetList = [
          {
            "item_name": "aaaaa",
            "add_time": "2019-04-30 11:06",
            "price": "20"
          },
          {
            "item_name": "bbbbb",
            "add_time": "2019-04-25 16:56",
            "price": "100"
          },
          {
            "item_name": "bbbbb",
            "add_time": "2019-04-25 16:33",
            "price": "100"
          },
          {
            "item_name": "bbbbb",
            "add_time": "2019-04-25 14:42",
            "price": "30"
          },
          {
            "item_name": "bbbbb",
            "add_time": "2019-04-24 10:20",
            "price": "20"
          },
          {
            "item_name": "bbbbb",
            "add_time": "2019-04-24 10:19",
            "price": "20"
          },
          {
            "item_name": "bbbbb",
            "add_time": "2019-04-24 10:19",
            "price": "20"
          },
          {
            "item_name": "bbbbb",
            "add_time": "2019-04-24 10:19",
            "price": "20"
          },
          {
            "item_name": "aaaaa",
            "add_time": "2019-04-12 09:39",
            "price": "200"
          }
        ];
        // let res = await this.$api.bet.getMemberBetList({params: { bet_id: betId } });
        // if(res.code == '200'){
        //   this.betListModal = true;
        // }else{
        //   this.$Message.warning(res.message);
        //   return;
        // }
      },
      // 子组件返回值
      setBetModalShow(e){
        if(e === false){
          this.betModal = false;
        };
      },
      setMemberBetModalShow(e) {
        if(e === false){
          this.betListModal = false;
        };
      }
    },
    mounted(){
      // console.log('这里')
      // this.$scoreApi.getBetSingleListNav();
      // this.$scoreApi.getBetSingleList({tournament_id: 0, start_id: '', limit: 10, type: 1})
    }
  }
</script>

<style lang="stylus" scoped>
</style>
