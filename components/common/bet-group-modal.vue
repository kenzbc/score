<template>
  <Modal :value="show" title="竞猜投注" width="580" @on-visible-change="getFaultModalStatusChange">
    <div class="bet-group-modal-body">
      <ul class="guess-cont" v-for="(betItems, index) in betGroupItem.bet_items">
          <li class="g-top cl">
            <div class="left fll cl">
              <img class="fll" :src="betItems.tournament_image ? betItems.tournament_image : '/static/images/tx_pic.jpg'" alt="">
              <p class="fll">{{betItems.tournament_name}}
                <span class="match-team-vs" v-if="betItems.match_team_a && betItems.match_team_b">{{betItems.match_team_a}}  vs  {{betItems.match_team_b}}</span>
              </p>
            </div>
            <div class="right flr">截止{{ betItems.bet_end_time | timestampToDate }}</div>
          </li>
          <li class="g-middle cl">
            <div class="left fll">{{betItems.title}}</div>
            <div class="right flr">{{betItems.people_num}}人已投注{{betItems.total_price}}
              <img src="https://img1.famulei.com/static/124/images/new_index/guozi.png">
            </div>
          </li>
          <li class="g-bottom cl">
            <div class="left fll cl">
              <div class="betting win_orange">
                <p class="score fll">
                  <span>{{ betItems.item_name}}</span>
                </p>
                <div class="odds flr win">
                  <p>赔率：{{ betItems.odds}}</p>
                </div>
              </div>
            </div>

            <div class="right flr">
              <div class="price-item">
                <label class="item " :class="{'out': betItems.change_price <= 10}" @click="addPrice(parseInt(betItems.change_price), -1, index)">
                  <i></i>
                </label>
                <label class="input">
                  <input type="text" value=""
                         v-model="betItems.change_price"
                         @keyup="vCode(betItems.change_price, index)"
                         @blur.prevent="inputBlur(betItems.change_price)">
                </label>
                <label class="item" :class="{'out': betItems.change_price >= 1000}" @click="addPrice(parseInt(betItems.change_price), 1, index)">
                  <i></i>
                  <i class="in"></i>
                </label>
              </div>
            </div>
          </li>
          <li class="warning cl" v-if="betItems.warn_message">
            <p class="icon fll">
              <i class="iconfont"></i>
            </p>
            <p class="warning-cont fll">{{betItems.warn_message}}</p></li>
        </ul>
    </div>
    <div slot="footer">
      <div class="card-item fll">
        <div class="left fll">
          <p v-if="betGroupItem.bet_items">{{ betGroupItem.bet_items.length }} 场消耗:
            <span class="guozi">{{groupData.payGuozi}}</span>
            <img src="https://img1.famulei.com/static/124/images/new_index/guozi.png" alt="">
          </p>
          <!--<p>我的果子: <my-bank :type="type" v-if="groupData"></my-bank>-->
          <p>我的果子: <span>{{ myBank.guozi1 }}</span>
            <img src="https://img1.famulei.com/static/124/images/new_index/guozi.png" alt="">
          </p>
        </div>
        <div class="right flr">
          <p>全对奖励: {{ betGroupItem.reward_double }}<i class="iconfont"></i></p>
          <p>预期可获: <span class="profit">{{groupData.profitGuozi}}</span>
            <img src="https://img1.famulei.com/static/124/images/new_index/guozi.png" alt="">
          </p>
        </div>
      </div>
      <Button class="btn-score-yellow bet-btn" @click="followGroup(betGroupItem.bet_group_id)">一键投注</Button>
    </div>
  </Modal>
</template>

<script>
  import moment from 'moment'
  import Vue from 'vue'
  // import myBank from '~/components/common/my-bank.vue'
  export default {
    name: "bet-group-modal",
    data(){
      return {
        data: {
          "code": "200",
          "message": "成功",
          "data": {
            "ssdb_v": "20180911",
            "bet_group_id": "11598",
            "member_id": "5678334",
            "title": "-",
            "content": "",
            "add_time": "1555854869",
            "end_time": "1556258400",
            "end_time_string": "04-26 14:00",
            "status": "0",
            "is_recommend": "0",
            "is_private": "0",
            "dynamic_id": "1023666",
            "hit_rate": "60",
            "hit_num": "20",
            "reward_double": "1.1",
            "bet_items": [
              {
                "id": "5037192",
                "member_id": "5678334",
                "add_time": "1555854869",
                "price": "10",
                "bet_id": "7766",
                "bet_item_id": "16719",
                "ssdb_key": "56783341671915558548698174",
                "settlement_time": "0",
                "refund_time": "0",
                "bet_group_id": "11598",
                "bet_group_follow_id": "0",
                "profit_price": "0",
                "appid": "1",
                "status": "1",
                "bet_end_time": "1556258400",
                "result_item_id": "0",
                "title": "谁会拿到比赛的胜利？",
                "item_name": "EDG",
                "title_en": "",
                "title_tw": "",
                "item_name_en": "",
                "item_name_tw": "",
                "match_date": "04/26",
                "match_team_a": "EDG",
                "match_team_b": "SS",
                "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/2116130822405_100X100.png",
                "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0410324771957_100X100.png",
                "result_item_string": "",
                "total_price": "47k",
                "people_num": "610",
                "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
                "tournament_name": "2019NEST 线上预选赛 ",
                "tournament_name_en": "2019NEST 线上预选赛 ",
                "tournament_name_tw": "2019NEST 线上预选赛 ",
                "view_type": 1,
                "odds": "1.20"
              },
              {
                "id": "5037193",
                "member_id": "5678334",
                "add_time": "1555854869",
                "price": "10",
                "bet_id": "7767",
                "bet_item_id": "16722",
                "ssdb_key": "56783341672215558548699129",
                "settlement_time": "0",
                "refund_time": "0",
                "bet_group_id": "11598",
                "bet_group_follow_id": "0",
                "profit_price": "0",
                "appid": "1",
                "status": "1",
                "bet_end_time": "1556258400",
                "result_item_id": "0",
                "title": "比赛会进行几场？",
                "item_name": "四场",
                "title_en": "",
                "title_tw": "",
                "item_name_en": "",
                "item_name_tw": "",
                "match_date": "04/26",
                "match_team_a": "EDG",
                "match_team_b": "SS",
                "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/2116130822405_100X100.png",
                "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0410324771957_100X100.png",
                "result_item_string": "",
                "total_price": "13k",
                "people_num": "242",
                "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
                "tournament_name": "2019NEST 线上预选赛 ",
                "tournament_name_en": "2019NEST 线上预选赛 ",
                "tournament_name_tw": "2019NEST 线上预选赛 ",
                "view_type": 1,
                "odds": "2.94"
              },
              {
                "id": "5037190",
                "member_id": "5678334",
                "add_time": "1555854869",
                "price": "10",
                "bet_id": "7768",
                "bet_item_id": "16724",
                "ssdb_key": "56783341672415558548694484",
                "settlement_time": "0",
                "refund_time": "0",
                "bet_group_id": "11598",
                "bet_group_follow_id": "0",
                "profit_price": "0",
                "appid": "1",
                "status": "1",
                "bet_end_time": "1556341200",
                "result_item_id": "0",
                "title": "谁会拿到比赛的胜利？",
                "item_name": "RW",
                "title_en": "",
                "title_tw": "",
                "item_name_en": "",
                "item_name_tw": "",
                "match_date": "04/27",
                "match_team_a": "RW",
                "match_team_b": "SN",
                "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/2116184878561_100X100.png",
                "team_image_thumb_b": "https://img1.famulei.com/z/5688126/p/191/2116133646980_100X100.png",
                "result_item_string": "",
                "total_price": "21k",
                "people_num": "257",
                "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
                "tournament_name": "2019NEST 线上预选赛 ",
                "tournament_name_en": "2019NEST 线上预选赛 ",
                "tournament_name_tw": "2019NEST 线上预选赛 ",
                "view_type": 1,
                "odds": "2.70"
              },
              {
                "id": "5037191",
                "member_id": "5678334",
                "add_time": "1555854869",
                "price": "10",
                "bet_id": "7769",
                "bet_item_id": "16727",
                "ssdb_key": "56783341672715558548698147",
                "settlement_time": "0",
                "refund_time": "0",
                "bet_group_id": "11598",
                "bet_group_follow_id": "0",
                "profit_price": "0",
                "appid": "1",
                "status": "1",
                "bet_end_time": "1556341200",
                "result_item_id": "0",
                "title": "比赛会进行几场？",
                "item_name": "四场",
                "title_en": "",
                "title_tw": "",
                "item_name_en": "",
                "item_name_tw": "",
                "match_date": "04/27",
                "match_team_a": "RW",
                "match_team_b": "SN",
                "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/2116184878561_100X100.png",
                "team_image_thumb_b": "https://img1.famulei.com/z/5688126/p/191/2116133646980_100X100.png",
                "result_item_string": "",
                "total_price": "8003",
                "people_num": "129",
                "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
                "tournament_name": "2019NEST 线上预选赛 ",
                "tournament_name_en": "2019NEST 线上预选赛 ",
                "tournament_name_tw": "2019NEST 线上预选赛 ",
                "view_type": 1,
                "odds": "2.40"
              },
              {
                "id": "5037188",
                "member_id": "5678334",
                "add_time": "1555854869",
                "price": "10",
                "bet_id": "7770",
                "bet_item_id": "16730",
                "ssdb_key": "56783341673015558548697219",
                "settlement_time": "0",
                "refund_time": "0",
                "bet_group_id": "11598",
                "bet_group_follow_id": "0",
                "profit_price": "0",
                "appid": "1",
                "status": "1",
                "bet_end_time": "1556359200",
                "result_item_id": "0",
                "title": "谁会拿到比赛的胜利？",
                "item_name": "BLG",
                "title_en": "",
                "title_tw": "",
                "item_name_en": "",
                "item_name_tw": "",
                "match_date": "04/27",
                "match_team_a": "RNG",
                "match_team_b": "BLG",
                "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/2116133076803_100X100.png",
                "team_image_thumb_b": "https://img1.famulei.com/z/5688126/p/191/2116130359968_100X100.png",
                "result_item_string": "",
                "total_price": "42k",
                "people_num": "380",
                "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
                "tournament_name": "2019NEST 线上预选赛 ",
                "tournament_name_en": "2019NEST 线上预选赛 ",
                "tournament_name_tw": "2019NEST 线上预选赛 ",
                "view_type": 1,
                "odds": "1.50"
              },
              {
                "id": "5037189",
                "member_id": "5678334",
                "add_time": "1555854869",
                "price": "10",
                "bet_id": "7771",
                "bet_item_id": "16733",
                "ssdb_key": "56783341673315558548692909",
                "settlement_time": "0",
                "refund_time": "0",
                "bet_group_id": "11598",
                "bet_group_follow_id": "0",
                "profit_price": "0",
                "appid": "1",
                "status": "1",
                "bet_end_time": "1556359200",
                "result_item_id": "0",
                "title": "比赛会进行几场？",
                "item_name": "五场",
                "title_en": "",
                "title_tw": "",
                "item_name_en": "",
                "item_name_tw": "",
                "match_date": "04/27",
                "match_team_a": "RNG",
                "match_team_b": "BLG",
                "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/2116133076803_100X100.png",
                "team_image_thumb_b": "https://img1.famulei.com/z/5688126/p/191/2116130359968_100X100.png",
                "result_item_string": "",
                "total_price": "8056",
                "people_num": "121",
                "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
                "tournament_name": "2019NEST 线上预选赛 ",
                "tournament_name_en": "2019NEST 线上预选赛 ",
                "tournament_name_tw": "2019NEST 线上预选赛 ",
                "view_type": 1,
                "odds": "3.99"
              }
            ],
            "circle_id": "627",
            "circle_name": "菠菜组合讨论区",
            "right_count": "0",
            "wrong_count": "0",
            "unknown_count": "6",
            "bet_profit": "0",
            "total_profit": "0",
            "reward_additional": "10%",
            "member_count": "23",
            "member_nickname": "快去学习",
            "member_type": "0",
            "member_avatar": "https://img1.famulei.com/z/5678334/p/186/2921500458686_90x90.png",
            "member_badge_image": "",
            "member_rank": "19",
            "is_girl": "0",
            "dynamic_status": "0",
            "dynamic_comment_count": "0",
            "dynamic_reward_list": [

            ],
            "dynamic_reward_num": "",
            "dynamic_praise_count": "0",
            "bet_group_profit": "0",
            "bet_price": "60",
            "end_settlement_time": "1556359200",
            "result_bet_price": "0",
            "content_list_string": "“谁会拿到比赛的胜利？”、“比赛会进行几场？”、“谁会拿到比赛的胜利？”等6场菠菜",
            "add_time_string": "2天前",
            "net_profit": "0",
            "is_praise": "0",
            "member_guozi": "4485"
          },
          "task_data": {

          },
          "badge": [

          ],
          "event": [

          ]
        },
       /* betGroupItem: {
          "ssdb_v": "20180911",
          "bet_group_id": "11598",
          "member_id": "5678334",
          "title": "-",
          "content": "",
          "add_time": "1555854869",
          "end_time": "1556258400",
          "end_time_string": "04-26 14:00",
          "status": "0",
          "is_recommend": "0",
          "is_private": "0",
          "dynamic_id": "1023666",
          "hit_rate": "60",
          "hit_num": "20",
          "reward_double": "1.1",
          "bet_items": [
            {
              "id": "5037192",
              "change_price": "100",
              "member_id": "5678334",
              "add_time": "1555854869",
              "price": "10",
              "bet_id": "7766",
              "bet_item_id": "16719",
              "ssdb_key": "56783341671915558548698174",
              "settlement_time": "0",
              "refund_time": "0",
              "bet_group_id": "11598",
              "bet_group_follow_id": "0",
              "profit_price": "0",
              "appid": "1",
              "status": "1",
              "bet_end_time": "1556258400",
              "result_item_id": "0",
              "title": "谁会拿到比赛的胜利？",
              "item_name": "EDG",
              "title_en": "",
              "title_tw": "",
              "item_name_en": "",
              "item_name_tw": "",
              "match_date": "04/26",
              "match_team_a": "EDG",
              "match_team_b": "SS",
              "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/2116130822405_100X100.png",
              "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0410324771957_100X100.png",
              "result_item_string": "",
              "total_price": "47k",
              "people_num": "610",
              "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
              "tournament_name": "2019NEST 线上预选赛 ",
              "tournament_name_en": "2019NEST 线上预选赛 ",
              "tournament_name_tw": "2019NEST 线上预选赛 ",
              "view_type": 1,
              "odds": "1.20"
            },
            {
              "id": "5037193",
              "member_id": "5678334",
              "change_price": "100",
              "add_time": "1555854869",
              "price": "10",
              "bet_id": "7767",
              "bet_item_id": "16722",
              "ssdb_key": "56783341672215558548699129",
              "settlement_time": "0",
              "refund_time": "0",
              "bet_group_id": "11598",
              "bet_group_follow_id": "0",
              "profit_price": "0",
              "appid": "1",
              "status": "1",
              "bet_end_time": "1556258400",
              "result_item_id": "0",
              "title": "比赛会进行几场？",
              "item_name": "四场",
              "title_en": "",
              "title_tw": "",
              "item_name_en": "",
              "item_name_tw": "",
              "match_date": "04/26",
              "match_team_a": "EDG",
              "match_team_b": "SS",
              "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/2116130822405_100X100.png",
              "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0410324771957_100X100.png",
              "result_item_string": "",
              "total_price": "13k",
              "people_num": "242",
              "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
              "tournament_name": "2019NEST 线上预选赛 ",
              "tournament_name_en": "2019NEST 线上预选赛 ",
              "tournament_name_tw": "2019NEST 线上预选赛 ",
              "view_type": 1,
              "odds": "2.94"
            },
            {
              "id": "5037190",
              "member_id": "5678334",
              "change_price": "100",
              "add_time": "1555854869",
              "price": "10",
              "bet_id": "7768",
              "bet_item_id": "16724",
              "ssdb_key": "56783341672415558548694484",
              "settlement_time": "0",
              "refund_time": "0",
              "bet_group_id": "11598",
              "bet_group_follow_id": "0",
              "profit_price": "0",
              "appid": "1",
              "status": "1",
              "bet_end_time": "1556341200",
              "result_item_id": "0",
              "title": "谁会拿到比赛的胜利？",
              "item_name": "RW",
              "title_en": "",
              "title_tw": "",
              "item_name_en": "",
              "item_name_tw": "",
              "match_date": "04/27",
              "match_team_a": "RW",
              "match_team_b": "SN",
              "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/2116184878561_100X100.png",
              "team_image_thumb_b": "https://img1.famulei.com/z/5688126/p/191/2116133646980_100X100.png",
              "result_item_string": "",
              "total_price": "21k",
              "people_num": "257",
              "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
              "tournament_name": "2019NEST 线上预选赛 ",
              "tournament_name_en": "2019NEST 线上预选赛 ",
              "tournament_name_tw": "2019NEST 线上预选赛 ",
              "view_type": 1,
              "odds": "2.70"
            },
            {
              "id": "5037191",
              "member_id": "5678334",
              "change_price": "100",
              "add_time": "1555854869",
              "price": "10",
              "bet_id": "7769",
              "bet_item_id": "16727",
              "ssdb_key": "56783341672715558548698147",
              "settlement_time": "0",
              "refund_time": "0",
              "bet_group_id": "11598",
              "bet_group_follow_id": "0",
              "profit_price": "0",
              "appid": "1",
              "status": "1",
              "bet_end_time": "1556341200",
              "result_item_id": "0",
              "title": "比赛会进行几场？",
              "item_name": "四场",
              "title_en": "",
              "title_tw": "",
              "item_name_en": "",
              "item_name_tw": "",
              "match_date": "04/27",
              "match_team_a": "RW",
              "match_team_b": "SN",
              "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/2116184878561_100X100.png",
              "team_image_thumb_b": "https://img1.famulei.com/z/5688126/p/191/2116133646980_100X100.png",
              "result_item_string": "",
              "total_price": "8003",
              "people_num": "129",
              "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
              "tournament_name": "2019NEST 线上预选赛 ",
              "tournament_name_en": "2019NEST 线上预选赛 ",
              "tournament_name_tw": "2019NEST 线上预选赛 ",
              "view_type": 1,
              "odds": "2.40"
            },
            {
              "id": "5037188",
              "member_id": "5678334",
              "change_price": "100",
              "add_time": "1555854869",
              "price": "10",
              "bet_id": "7770",
              "bet_item_id": "16730",
              "ssdb_key": "56783341673015558548697219",
              "settlement_time": "0",
              "refund_time": "0",
              "bet_group_id": "11598",
              "bet_group_follow_id": "0",
              "profit_price": "0",
              "appid": "1",
              "status": "1",
              "bet_end_time": "1556359200",
              "result_item_id": "0",
              "title": "谁会拿到比赛的胜利？",
              "item_name": "BLG",
              "title_en": "",
              "title_tw": "",
              "item_name_en": "",
              "item_name_tw": "",
              "match_date": "04/27",
              "match_team_a": "RNG",
              "match_team_b": "BLG",
              "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/2116133076803_100X100.png",
              "team_image_thumb_b": "https://img1.famulei.com/z/5688126/p/191/2116130359968_100X100.png",
              "result_item_string": "",
              "total_price": "42k",
              "people_num": "380",
              "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
              "tournament_name": "2019NEST 线上预选赛 ",
              "tournament_name_en": "2019NEST 线上预选赛 ",
              "tournament_name_tw": "2019NEST 线上预选赛 ",
              "view_type": 1,
              "odds": "1.50"
            },
            {
              "id": "5037189",
              "member_id": "5678334",
              "change_price": "100",
              "add_time": "1555854869",
              "price": "10",
              "bet_id": "7771",
              "bet_item_id": "16733",
              "ssdb_key": "56783341673315558548692909",
              "settlement_time": "0",
              "refund_time": "0",
              "bet_group_id": "11598",
              "bet_group_follow_id": "0",
              "profit_price": "0",
              "appid": "1",
              "status": "1",
              "bet_end_time": "1556359200",
              "result_item_id": "0",
              "title": "比赛会进行几场？",
              "item_name": "五场",
              "title_en": "",
              "title_tw": "",
              "item_name_en": "",
              "item_name_tw": "",
              "match_date": "04/27",
              "match_team_a": "RNG",
              "match_team_b": "BLG",
              "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/2116133076803_100X100.png",
              "team_image_thumb_b": "https://img1.famulei.com/z/5688126/p/191/2116130359968_100X100.png",
              "result_item_string": "",
              "total_price": "8056",
              "people_num": "121",
              "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
              "tournament_name": "2019NEST 线上预选赛 ",
              "tournament_name_en": "2019NEST 线上预选赛 ",
              "tournament_name_tw": "2019NEST 线上预选赛 ",
              "view_type": 1,
              "odds": "3.99"
            }
          ],
          "circle_id": "627",
          "circle_name": "菠菜组合讨论区",
          "right_count": "0",
          "wrong_count": "0",
          "unknown_count": "6",
          "bet_profit": "0",
          "total_profit": "0",
          "reward_additional": "10%",
          "member_count": "23",
          "member_nickname": "快去学习",
          "member_type": "0",
          "member_avatar": "https://img1.famulei.com/z/5678334/p/186/2921500458686_90x90.png",
          "member_badge_image": "",
          "member_rank": "19",
          "is_girl": "0",
          "dynamic_status": "0",
          "dynamic_comment_count": "0",
          "dynamic_reward_list": [

          ],
          "dynamic_reward_num": "",
          "dynamic_praise_count": "0",
          "bet_group_profit": "0",
          "bet_price": "60",
          "end_settlement_time": "1556359200",
          "result_bet_price": "0",
          "content_list_string": "“谁会拿到比赛的胜利？”、“比赛会进行几场？”、“谁会拿到比赛的胜利？”等6场菠菜",
          "add_time_string": "2天前",
          "net_profit": "0",
          "is_praise": "0",
          "member_guozi": "4485"
        },*/
        groupData: {
          profitGuozi: 0, //预期可获果子数
          payGuozi: 0  // 消耗果子数
        },
        type: 1,  // 1: 果子  2.钻石  3.门票  4.钥匙
        myBank: {}, // 我的钱包
        groupParams: {
          bet_group_id: '',
          bet_items: [],
          is_private: 0,
        },
      }
    },
    components: {
      // myBank
    },
    props:{
      show: {
        type: Boolean,
        default: false
      },
      betGroupItem: {
        type: Object,
        default: {}
      },
    },
    filters: {
      /**
       * 时间戳转日期
       * @param ts
       * @returns {*}
       */
      timestampToDate: function (ts) {
        if(!ts){ return "" }
        return moment(Number(ts*1000)).format('MM-DD HH:mm');
      }
    },

    mounted(){
      this.betItemsCur(); // 添加默认值 100
      // this.$api.user.getMyBank();
      // this.getMyBank();
    },
    methods: {
      async getMyBank() {
        let res = await this.$api.user.getMyBank();
        console.log(res);
        if (res.code == '200') {
          this.myBank = res.data || {};
        } else {
          this.$Message.warning(res.message);
        }
      },
      //菠菜投注弹层隐藏状态更改
      getFaultModalStatusChange(e){
        // console.log(e)
        this.$emit('setBetGroupModalShow',e);
      },
      addPrice(change_price, status, index){
        // console.log(change_price, status)

        // status -1: 减   1 加
        if (status == -1) { // 减
          change_price > 10 ? change_price -= 10 : 10;

        } else if (status == 1) {  // 加
          change_price < 1000 ? change_price += 10 : 1000;
        }

        this.betItemsCur(change_price, index )
      },
      vCode(change_price, index){
        let reg = /^\+?[1-9][0-9]*$/;  // 非零整数
        if (!reg.test(change_price) && change_price) {
          this.$Message.warning('只能输入整数');
          return
        }
        this.betItemsCur(change_price, index)
      },
      // input 失去焦点
      inputBlur(change_price){
        if (parseInt(change_price) < 10) {
          this.$Message.warning('投注额不能小于10');
        } else if (parseInt(change_price) > 1000) {
          this.$Message.warning('投注额不能大于1000');
        }
      },

      // 数据处理
      betItemsCur(change_price, index ){
        console.log('------------数据处理------------------');
        if (this.betGroupItem.bet_items) {
          let betItems = this.betGroupItem.bet_items;
          let payGuozi = 0;
          betItems.forEach( (item, i) => {
            if (change_price) {
              if (i == index) {
                Vue.set(item, 'change_price', change_price);
                if (item.change_price > 1000) {
                  Vue.set(item, 'warn_message', '投注额不能大于1000');
                } else if (item.change_price < 10) {
                  Vue.set(item, 'warn_message', '投注额不能小于10');
                } else {
                  Vue.set(item, 'warn_message', '');
                }
              }
            } else {
              // 初始值 100
              Vue.set(item, 'change_price', 100);
            }

            payGuozi += parseInt(item.change_price);
          });

          this.betGroupItem.bet_items = betItems;
          this.groupData.payGuozi = Math.round(payGuozi);
          this.groupData.profitGuozi = Math.round(this.groupData.payGuozi * parseFloat(this.betGroupItem.reward_double));
        }

      },

      // 组合菠菜投注
      async followGroup(bet_group_id){
        this.groupParams.bet_group_id = bet_group_id;
        this.groupParams.is_private = this.betGroupItem.is_private;

        var betItemArr = [];
        let betItems = this.betGroupItem.bet_items;
        betItems.forEach( item => {
          var betItem = {   // 初始化
            bet_id: '',
            bet_item_id: '',
            guozi_num: '',
          };
          if (!item.change_price) {
            Vue.set(item, 'warn_message', '投注额不能为空');
            return false;
          }
          betItem.bet_id = item.bet_id;
          betItem.bet_item_id = item.bet_item_id;
          betItem.guozi_num = item.change_price;
          betItemArr.push(betItem);
        });
        this.groupParams.bet_items = JSON.stringify(betItemArr);

        let res = await this.$api.bet.setFollowGroupBet({params: this.groupParams});
        if (res.code == '200') {
          if (res.data.status == 0) {
            this.$Message.success(res.data.message);
            this.$emit('setBetGroupModalShow',false);
          } else {
            betItems.forEach( (item, i) => {
              if (item.bet_id == res.data.bet_id) {
                Vue.set(item, 'warn_message', res.data.message);
                const container = this.$el.querySelector('.bet-group-modal-body');
                if (container) {
                  let scrollTop = 178 * i;
                  container.scrollTop = scrollTop;
                }
                return false;
              }
            })
          }
        } else {
          this.$Message.warning(res.message);
        }
      }
    },
    watch: {

      show(newVal, oldVal){
        // 弹层为true 触发事件
        if (newVal == true) {
          this.getMyBank();
          this.betItemsCur();
        }
      }
    },
    computed: {

    }
  }
</script>

<style lang="stylus" scoped>
  .bet-group-modal-body {
    max-height: 580px;
    overflow-y: auto;
    border-right: 3px solid #fcfcfc;

    // 弹窗样式
    .ivu-modal-body {
      padding 10px 0
    }

    .guess-cont {
      background: #FFFFFF;
      border: 1px solid rgba(235,235,236,0.60);
      border-radius: 2px;
      margin-bottom: 10px;

      &:last-child {
        margin-bottom: 0;
      }

      .g-top {
        width 100%
        padding: 10px 14px;
        line-height: 28px;
        border-bottom: 1px solid rgba(235,235,236,0.60);

        .left {
          img {
            display: inline-block;
            width: 28px;
            height: 28px;
          }
          p{
            padding-left: 5px;
            line-height: 28px;
            display: inline-block;
            font-size: 14px;
            color: #5F6575;
            font-weight: bold;

            span{
              font-size: 14px;
              color: red;
              line-height: 18px;
              padding-left: 10px;
            }
          }
        }
        .right {
          font-size: 13px;
          color: #97999F;
        }
      }
      .g-middle {
        width 100%
        padding: 20px 24px 12px 24px;

        .left {
          font-size: 16px;
          line-height: 24px;
          color: #5F6575;
        }

        .right {
          font-size: 13px;
          line-height: 24px;
          color: #97999F;

          img{
            width: 13px;
            height: 16px;
            margin-bottom: -3px;
          }
        }
      }
      .g-bottom {
        width 100%
        padding: 0 20px 21px 20px;

        .left{
          width 56%
        }
        .right {
          width 200px
          .price-item {
            display flex

            label {

              height 30px
              line-height 28px

              &.item {
                margin 5px 0
                display block
                width 30px
                height 30px
                border-radius 6px
                border 1px solid #EBEBEC
                position relative
                cursor pointer

                i {
                  position absolute
                  top 50%
                  left 50%
                  transform translate(-50%, -50%)

                  width 14px
                  height 2px
                  border-radius 6px
                  background #97999F

                  &.in {
                    width 2px
                    height 14px
                  }
                }

                &.out {
                  pointer-events: none;
                  cursor default

                  i {
                    background #EBEBEC
                  }
                }
              }
              &.input {
                height 34px
                line-height 32px
                margin 3px 6px
                border 1px solid #EBEBEC
                overflow hidden
                border-radius 6px
                width calc(100% - 72px)

                input {
                  width 100%
                  background transparent
                  text-align center
                }
              }
            }

          }
        }
      }
    }


    /*common*/
    .betting{
      width: 100%;
      border-radius: 10px;
      height:40px;
      line-height: 40px;
      font-weight: bold;
      /*cursor: pointer;*/
      border:1px solid #F0F1F2;
      background: #FCFDFE;

      p{
        color: #5F6575;
        font-size: 14px;
        opacity: 0.6;
      }
      .score{
        padding-left:15px;
        font-size: 0;

        i {
          vertical-align:middle;
        }
        span {
          font-size: 14px;
          vertical-align:middle;
        }
      }

      .odds{
        width: 115px;
        height:40px;
        background: url('/static/images/bet/bet_betting.png') 0 -135px;
        background-size: cover;

        p{
          padding-right:15px;
          text-align: right;
        }
      }

      .normal{
        background-position: 0 -135px;
      }

      &.normal_gray {

        border:1px solid #F0F1F2;
        background: #FCFDFE;
        overflow: hidden;

        p{
          color: #5F6575;
          opacity: 1;
        }

        &:hover,
        &:active{

          background: #F5F6F7;
          border: 1px solid #E6E7E8;

          .normal{
            background-position: 0 -90px;
          }

          p{
            color: #5F6575;
            opacity: 1;
          }
        }
      }

      .opt{
        background-position: 0 -45px;
      }

      .win{
        background-position: 0 0;
      }

      .icon{
        font-size:10px;
        color:#fff;
        margin-right:5px;
      }
    }
    /*.active_gray{
        background: #F5F6F7;
        border: 1px solid #E6E7E8;
    }
    .active_gray p{
        color: #5F6575;
        opacity: 1;
    }*/
    .opt_red{
      background: #FF5C5C;
      border: 1px solid #FF3D3D;
      overflow: hidden;
    }
    .opt_red p{
      color:#fff;
      opacity: 1;
    }
    .color_red{
      color:#FF5C5C;
    }
    .win_orange{
      background: #FFEB79;
      border: 1px solid #FFD651;
      overflow: hidden;

      p{
        color:#8C6600;
        opacity:1;

        .icon{
          font-size:10px;
          color:#fff;
          margin-right:5px;
        }
      }
    }



    // 警告
    .warning{
      width 100%
      line-height: 26px;
      background: #FF8E89;
      border: 1px solid #F87771;

      p{
        font-size: 12px;
        color: #7B1E1A;
        font-weight: bold;

        &.icon {
          margin: 0 5px 0 10px;
          width: 20px;
          height: 26px;

          i {
            font-size: 16px;
            color: #7B1E1A;
          }
        }

        img{
          padding: 5px 10px;
          width: 16px;
          height: 16px;
        }
      }





    }
  }
</style>
