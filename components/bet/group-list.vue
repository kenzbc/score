<template>
  <div class="bet_single_list">
    <section  v-for="(item, index) in betGroupList">
      <div class="bet_group margin_b">
        <div class="bet_single_title">
          <label class="track fll" v-if="item.is_follow == 1">已跟投</label>
          <p class="group_title fll">{{ item.title}}</p>
          <span class="games fll">{{ item.bet_items.length}}</span>
          <div class="multiple flr">
            全中可获额外果子
            <label>x <span>{{ item.reward_double}}</span></label>
          </div>
        </div>
        <div class="bet_together_regular_dec">
          <div class="left fll">
            <label class="avatar">
              <img :src="item.member_avatar ? item.member_avatar  : '/images/new_index/tx_pic.jpg'">
            </label>
          </div>
          <div class="center fll">
            <p class="title">{{ item.member_nickname}}</p>
            <p class="dec">{{ item.content}}</p>
          </div>
          <div class="right flr">
            <i-circle
              :size="80"
              :strokeWidth="8"
              stroke-color="#FFD652"
              :trailWidth="8"
              :percent="parseInt( item.hit_rate )">
              <p class="demo-Circle-inner num">{{ item.hit_rate == 0 ? '--' : item.hit_rate + '%'}}</p>
              <p class="winning " style="position: absolute; bottom: -55px; width: 100px; margin-left: -10px"> {{ item.hit_num >= 20 ? '近' + item.hit_num + '场命中率' : '不足20场'}}</p>
            </i-circle>

          </div>
        </div>
        <div class="bet_together_detail">
          <div class="bet_together_group fll" v-for="betItem in item.bet_items">
            <div class="bet_together_title">
              <p class="fll">{{ betItem.title}}</p>
              <i class="flr icon iconfont">&#xe6d8;</i>
            </div>
            <div class="bet_together_dec">
              <div class="betting " :class="item.is_follow == 1 ? 'win_orange' : 'normal_gray'">
                <p class="score fll">
                  <i class="icon iconfont" v-if="item.is_follow == 1">&#xe6d5;</i>
                  <span>{{ betItem.item_name}}</span>
                </p>
                <div class="odds flr " :class="item.is_follow == 1 ? 'win' : 'normal'">
                  <p>赔率：{{ betItem.odds}}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="bet_together_vote">
          <div class="left fll">
            <p class="end_time_string">截止{{ item.end_time_string}}</p>
            <p>已有{{ item.member_count}}人跟单</p>
          </div>
          <div class="center fll">
            <p @click="setGroupBet(item.bet_group_id, index)"> {{item.is_follow == 1 ? '继续跟投' : '立即跟投'}}</p>
          </div>
          <div class="right flr">
            <nuxt-link :to="'/p/' + item.dynamic_id">
              <p v-if="item.is_private == 0 && item.dynamic_status == 0">
                <i class="icon iconfont">&#xe64b;</i>
                参与讨论
                <span>( {{ item.dynamic_comment_count}} )</span>
              </p>
            </nuxt-link>
          </div>
        </div>
      </div>
    </section>
    <bet-group-modal :show="betGroupModal" :betGroupItem="betGroupItem" @setBetGroupModalShow="setBetGroupModalShow"></bet-group-modal>
  </div>
</template>

<script>
  import betGroupModal from '../common/bet-group-modal'
  export default {
    name: "group-list",
    components: {
      betGroupModal
    },
    data(){
      return {
        params:{
          bet_group_id: ''
        },
        betGroupModal: false, // 组合菠菜跟投弹窗
        betGroupItem: {},
      }
    },
    props: {
      betGroupList: {
        type: Array,
        default: []
      },
    },
    methods: {
      // 组合菠菜跟投
      async setGroupBet(bet_group_id, index){
        if (this.betGroupList && this.betGroupList.length > 0) {
          this.betGroupItem = this.betGroupList[index];
          // this.params.bet_group_id = bet_group_id;
          // let res = await this.$api.bet.setGroupBet({params: this.params});
          // if (res.code == '200') {
          //   console.log(res);
          this.betGroupModal = true;
          // } else {
          //   this.$Message.warning(res.message);
          // }
        }
      },
      // 子组件返回值
      setBetGroupModalShow(e){
        if(e === false){
          this.betGroupModal = false;
        }
      },
    }
  }
</script>

<style lang="stylus" scoped>

</style>
