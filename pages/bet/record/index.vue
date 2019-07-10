<template>
  <div class="bet-page">
    <div class="bet-main-wrap">
      <div class="left-wrap">
        <div class="tabs-nav">
          <div class="bet_tabs_nav" id="quiz_tabs">
            <ul>
              <li class="fll" :class="{'active' : tabsNavCurr == index }" @click="tabsNav(index)" v-for="(item,index) in tabsNavList">
                <a href="javascript:;">{{item.value}}</a>
              </li>
            </ul>
          </div>
          <div class="quiz_tabs_nav">
            <i-select
              :label-in-value="true"
              @on-change="getThemeItemValue"
              v-model="selectList.theme_cur.code"
              style="width:120px" >
              <i-option v-for="(item, index) in selectList.theme"
                        :class="{'ivu-select-item-focus' : selectList.theme_cur.code == index}"
                        :value="item.code" :key="index">{{ item.name }}</i-option>
            </i-select>
            <i-select
              :label-in-value="true"
              @on-change="getSubItemValue"
              v-model="selectList.sub_cur.code"
              v-if="selectList.theme_cur.code == 0"
              style="width:120px">
              <i-option v-for="(item, index) in selectList.sub"
                        :class="{'ivu-select-item-focus' : selectList.sub_cur.code == index}"
                        :value="item.code" :key="index">{{ item.name }}</i-option>
            </i-select>
            <div class="flr">
              <p>菠菜总收益 : <span class="bet_total_profit">{{ betAllRecord.profit }}</span><svg class="icon icon_size" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg></p>
            </div>
          </div>
        </div>
        <div class="quiz_list" v-if="myBetRecordBlock">
          <div class="quiz_group"
               v-for="(item, index) in myBetSingleList"
               v-if="myBetSingleListBlock && myBetSingleList && myBetSingleList.length > 0"
               :class="{'margin_b2' : myBetSingleList.length-1 != index}">
            <div class="bet_single_title quiz_white">
              <label class="fll">
                <img :src="item.image ? item.image : '/static/images/tx_pic.jpg'">
              </label>
              <p class="fll">
                {{ item.view_type != 3 ? item.name : item.category_name}}
                {{ item.view_type == 1 && item.round_name ?  '-' + item.round_name : ''}}
                {{ item.round_son_name ?  '-' + item.round_son_name : ''}}
              </p>

              <div class="clan fll" v-if="item.view_type == 1">
              <p class="fll">{{ item.match_team_a }}</p>
              <label class="fll">
                <img :src="item.team_image_thumb_a ? item.team_image_thumb_a : '/static/images/tx_pic.jpg'" alt="">
              </label>
              <p class="fll">VS</p>
              <label class="fll">
                <img :src="item.team_image_thumb_b ? item.team_image_thumb_b : '/static/images/tx_pic.jpg'" alt="">
              </label>
              <p class="fll">{{ item.match_team_b}}</p>
            </div>
              <div class="multiple flr">
                {{ item.people_num}}人已投注{{ item.total_price}}
                <svg class="icon icon_size" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg>
              </div>
            </div>
            <div class="quiz_group_dec">
              <div class="quiz_group_dec_title">
                <p class="fll">{{ item.title}}</p>
                <p class="flr" v-if="item.status == 1">
                  <span>截至{{ item.bet_end_time}}</span>
                </p>
                <p class="flr" v-else>
                  <span class="color_red">{{ item.status_txt}}</span>
                </p>
              </div>
              <div class="quiz_group_dec_detail">
                <div class="detail_row">
                  <div class="detail_cell">投注时间</div>
                  <div class="detail_cell">竞猜详情</div>
                  <div class="detail_cell">竞猜金额</div>
                  <div class="detail_cell">竞猜收入</div>
                </div>
                <div class="detail_row"
                     :class="{'quiz_group_close': item.status == 2 || item.status == 5, 'quiz_group_close_red' : key.bet_item_id == item.result_item_id }"
                     v-for="key in item.member_bet_list">
                  <div class="detail_cell">{{ key.add_time}}</div>
                  <div class="detail_cell">
                    {{ key.item_name}}
                    <span class="group_button" v-if="key.is_group == 1">组合投</span>
                  </div>
                  <div class="detail_cell fruit_color">{{ key.price }}<svg class="icon icon_size" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg></div>
                  <div class="detail_cell" v-if="item.status == 1 || item.status == 6 || item.status == 4 || item.status == 7">尚未结算</div>
                  <div class="detail_cell" v-else-if="item.status == 2 || item.status == 5">已返还果子</div>
                  <div class="detail_cell" v-else>{{ key.profit}}<svg class="icon icon_size" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg></div>
                </div>
              </div>
            </div>
          </div>
          <div class="quiz_group margin_b2"
               v-for="(item, index) in myBetGroupList"
               v-if="!myBetSingleListBlock && myBetGroupList && myBetGroupList.length > 0">
            <div class="bet_single_title quiz_white">
              <label class="track fll" :class="{'blue' : item.is_main == 0}">
                <strong>{{ item.is_main == 1 ? '原' : '跟'}}</strong>
              </label>
              <p class="fll">{{ item.title}}</p>
              <div class="multiple flr">
                <span v-if="item.status == 0">投注时间 {{item.add_time | dateFormat('X', 'YYYY-MM-DD HH:mm')}}</span>
                <span class="color_red" v-else>
                  <strong>{{ item.status_txt}}</strong>
                </span>
              </div>
            </div>
            <div class="bet_together_regular_dec">
              <div class="left fll">
                <label class="avatar">
                  <img :src="item.member_avatar ? item.member_avatar : '/static/images/tx_pic.jpg'">
                </label>
              </div>
              <div class="center fll">
                <p class="title">{{ item.member_nickname}}</p>
                <p class="dec">{{ item.content}}</p>
              </div>
              <div class="right flr">
                <div class="right_or_wrong">
                  <div class="blue fll">
                    <p>{{ item.right_count}}</p>
                    <p>对</p>
                  </div>
                  <div class="light_gray fll">
                    <p>{{ item.wrong_count}}</p>
                    <p>错</p>
                  </div>
                  <div class="gray fll">
                    <p>{{ item.unknown_count}}</p>
                    <p>未</p>
                  </div>
                </div>
              </div>
            </div>
            <div class="quiz_group_dec">
              <div class="quiz_group_dec_detail">
                <div class="detail_row">
                  <div class="detail_cell" style="width: 10%">竞猜标题</div>
                  <div class="detail_cell">竞猜详情</div>
                  <div class="detail_cell">竞猜金额</div>
                  <div class="detail_cell">竞猜收入</div>
                </div>
                <div class="detail_row"
                     v-for="key in item.bet_items"
                     :class="{'quiz_group_close': key.status == 2, 'quiz_group_close_red': key.result_item_id == key.bet_item_id}" >
                  <div class="detail_cell">{{ key.title }}</div>
                  <div class="detail_cell">{{ key.item_name }}</div>
                  <div class="detail_cell">{{ key.price }}
                    <svg class="icon icon_size" aria-hidden="true">
                      <use xlink:href="#icon-guozi"></use>
                    </svg>
                  </div>
                  <div class="detail_cell" v-if="key.status == 3">{{ key.profit_price}}</div>
                  <div class="detail_cell" v-else-if="key.status == 2"><strong>已返还果子</strong></div>
                  <div class="detail_cell" v-else>尚未结算</div>
                </div>
              </div>
              <div class="quiz_group_footer">
                <div class="dec flr">
                  <div class="multiple">
                    全中可获额外果子
                    <label>x<span>{{ item.reward_double}}</span></label>
                  </div>
                  <div class="multiple">
                    菠菜收益 :
                    <span class="fruit_color">{{ item.net_profit}}</span>
                    <svg class="icon icon_size" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg>
                  </div>
                  <div class="multiple">
                    总收益 :
                    <label><span>{{ item.total_profit}}</span><svg class="icon icon_size" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg></label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="quiz_list" v-if="!myBetRecordBlock">

          <div class="my_quiz_group margin_b3"
               v-if="item.record.best_bet && item.record.best_bet.length > 0"
               v-for="item in myRecordArray">
            <div class="my_quiz_title">
              <p><span>{{ item.name }}</span>{{ item.record.period}}</p>
            </div>
            <div class="my_quiz_dec ">
              <div class="scale fll result_data_all">
                <i-circle
                  :size="150"
                  :strokeWidth="8"
                  stroke-color="#FFD652"
                  :trailWidth="8"
                  :percent="parseInt( item.record.win_times / item.record.total_times  * 100 )">
                  <p class="demo-Circle-inner num">{{ item.record.win_num }}</p>
                  <p class="demo-Circle-inner text">命中率</p>
                </i-circle>
                <!--<p class="hit_rate">命中率</p>-->
              </div>
              <div class="results fll">
                <div class="dec fll">
                  <p>{{ item.record.record_ratio != ''? item.record.record_ratio : '-'}}</p>
                  <p>总战绩</p>
                </div>
                <div class="dec fll">
                  <p>{{ item.record.position != ''? item.record.position : '-'}}</p>
                  <p>排名</p>
                </div>
                <div class="dec fll">
                  <p :class="item.record.profit >= 0 ? 'red' : 'green'">{{ item.record.profit ? item.record.profit : '-'}}</p>
                  <p>总收益</p>
                </div>
                <div class="dec fll">
                  <p>{{ item.record.best_bet[0].bet_profit ? item.record.best_bet[0].bet_profit : '-'}}</p>
                  <p>单场最高</p>
                </div>
              </div>
              <div class="profit flr">
                <p class="title">单场收入最高菠菜<i class="flr icon iconfont" @click="memberRecordBtn(item.id)">&#xe6d8;</i></p>
                <div class="dec">
                  <p>{{ item.record.best_bet[0].title}}</p>
                  <div class="betting opt_red"
                       v-for="key in item.record.best_bet[0].items"
                       v-if="key.bet_item_id == item.record.best_bet[0].select_item_id">
                    <p class="score fll"><i class="icon iconfont">&#xe6d5;</i><span>{{ key.item_name}}</span>
                    </p>
                    <div class="odds flr opt">
                      <p>赔率：{{ key.odds}}</p>
                    </div>
                  </div>
                  <p>收益：<span>{{item.record.best_bet[0].bet_profit}}</span>
                    <svg class="icon icon_size" aria-hidden="true">
                      <use xlink:href="#icon-guozi"></use>
                    </svg>
                  </p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
      <div class="right-wrap">
        <slide-list :memberInfo="memberInfo"
                    :singleRecord="singleRecord"
                    :totalRecord="totalRecord"
                    :monthRecord="monthRecord"
                    :weekRecord="weekRecord"
                    :totalList="totalList"
                    :monthList="monthList"
                    :weekList="weekList"
        ></slide-list>
      </div>
    </div>
    <Modal
      width="360"
      v-model="isModal">
      <p slot="header">
        <Icon type="ios-information-circle"></Icon>
        <span>{{ bestBet.title }}</span>
      </p>
      <div class="group_body">
        <div class="header">
          <p>单场最高收益：{{ bestBet.bet_profit}} <svg class="icon icon_size" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg></p>
        </div>
        <div class="body">
          <div class="list" v-for="(item, index) in bestBet.items">
            <div class="betting " :class="{'opt_red' : item.bet_item_id == bestBet.select_item_id}">
              <p class="score fll">
                <i class="icon iconfont" v-if="item.bet_item_id == bestBet.select_item_id">&#xe6d5;</i>
                {{ item.item_name}}
              </p>
              <div class="odds flr" :class="{'opt': item.bet_item_id == bestBet.select_item_id}">
                <p>赔率：{{ item.odds}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>

<script>
  import SlideList from '~/components/bet/slide-list.vue'
  export default {
    name: "index",
    components: {
      SlideList
    },
    data(){
      return {
        tabsNavCurr: 0, // tab 切换
        tabsNavList: [
          {
            index: 0,
            value: '竞猜记录'
          },
          {
            index: 1,
            value: '我的战绩'
          },
        ],
        selectList: {
          theme_cur: {
            code: 0,
            name: '单场菠菜'
          },
          theme: [
            {
              code: 0,
              name: '单场菠菜'
            },
            {
              code: 1,
              name: '组合菠菜'
            },
          ],
          sub_cur: {
            code: 0,
            name: '进行中'
          },
          sub: [
            {
              code: 0,
              name: '进行中'
            },
            {
              code: 1,
              name: '已结束'
            }
          ]
        },
        singleParams: {
          type: 1,
          start_id: '',
          limit: 10,
        },
        groupParams: {
          cache_key: '',
          limit: 10,
        },
        isLoadMoreLock: true,  // 数据加载
        myBetSingleListBlock: true, // 我的单场菠菜列表 展示/隐藏
        myBetGroupList: [],
        myBetRecordBlock: true,  // 我的竞猜记录 展示/隐藏
        myRecordArray: [    // 我的战绩
          {
            id: 0,
            name: '本周战绩',
            record: {}
          },
          {
            id: 1,
            name: '本月战绩',
            record: {}
          },
          {
            id: 2,
            name: '总战绩',
            record: {}
          },
        ],
        update: '',  // 战绩更新时间
        isModal: false,
        bestBet: {},
      }
    },
    async asyncData({$axios, app}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
      let [my_bet_single_list, bet_single_list_nav] = await Promise.all([
        app.$scoreApi.getMyBetSingleList({type: 1}),
        app.$scoreApi.getBetSingleListNav({tournament_id: 0, start_id: '', limit: 10, type: 1})
        // app.$scoreApi.getBetSingleList({tournament_id: 0, start_id: '', limit: 10, type: 1})
      ]);
      // console.log(bet_single_list.data)
      console.log('-------------------->');
      return {
        myBetSingleList: my_bet_single_list.data.list || [], // 我的竞猜列表
        betAllRecord: my_bet_single_list.data.total_record,
        memberInfo: bet_single_list_nav.data.member_info, // 个人信息
        singleRecord: bet_single_list_nav.data.single_record, // 总战绩
        totalRecord: bet_single_list_nav.data.total_record, // 总战绩
        monthRecord: bet_single_list_nav.data.month_record, // 总战绩
        weekRecord: bet_single_list_nav.data.week_record, // 总战绩
        totalList: bet_single_list_nav.data.total_list || [], // 总榜
        monthList: bet_single_list_nav.data.month_list || [], // 月榜
        weekList: bet_single_list_nav.data.week_list || [], // 周榜
      }
    },
    mounted(){
      // this.NoData = this.byCategoryList.length == 0 ? true : false;
      window.addEventListener('scroll', this.winHandleScroll, true);  // 监听（绑定）滚轮滚动事件
    },
    methods: {
      // window滚动事件
      async winHandleScroll(e) {
        let clientWidth = e.target.documentElement.clientWidth // 浏览器可视区域宽度
        let clientHeight = e.target.documentElement.clientHeight // 浏览器可视区域高度
        let scrollTop = e.target.documentElement.scrollTop   // document滚动偏移量
        let scrollHeight = e.target.documentElement.scrollHeight //文档内容实际高度（包括超出视窗的溢出部分）

        if (this.isLoadMoreLock && clientHeight + scrollTop >= scrollHeight - 300 && this.tabsNavCurr == 0) {
          this.isLoadMoreLock = false;
          console.log('===加载更多内容……===');
          // 搜索分类分页
          this.setCacheKey();
          this.getData();
        }
      },
      // 获取分类列表最后一条数据的cache_key，设置给params参数
      setCacheKey() {
        if (this.selectList.theme_cur.code == 0) {
          if (this.myBetSingleList && this.myBetSingleList.length > 0) this.singleParams.start_id = this.myBetSingleList[this.myBetSingleList.length - 1].bet_id;
        } else {
          if (this.myBetGroupList && this.myBetGroupList.length > 0) this.groupParams.cache_key = this.myBetGroupList[this.myBetGroupList.length - 1].cache_key;
        }
      },
      // 分别获取数据   我的单场/组合
      async getData(){
        if (this.selectList.theme_cur.code == 0) {
          // 我的当场菠菜列表  type 1:进行中   2:已结束
          this.singleParams.type = this.selectList.sub_cur.code == 0 ? 1 : 2;
          // let res = await this.$scoreApi.getMyBetSingleList(this.singleParams);
          // debugger
          let res = await this.$api.bet.getMyBetSingleList({params: this.singleParams}); // api
          console.log('-----------我的单场菠菜列表--------------');
          if (res.code == '200') {
            this.myBetSingleList = this.singleParams.start_id == '' ? res.data.list || [] : this.myBetSingleList.concat(res.data.list);
            if (this.myBetSingleList.length != 0 && res.data.list.length != 0 ) this.isLoadMoreLock = true;
          } else {
            this.$Message.warning(res.message);
          }

        } else {
          // 我的组合菠菜列表
          let res = await this.$api.bet.getMyBetGroupFollowList({params: this.groupParams});
          // let res = {
          //   "code": "200",
          //   "message": "成功",
          //   "data": {
          //     "count": "20",
          //     "list": [
          //       {
          //         "bet_group_id": "11363",
          //         "bet_group_follow_id": "14889",
          //         "title": "相信科学",
          //         "is_private": "0",
          //         "is_main": "0",
          //         "add_time": "2019-04-10 15:52",
          //         "member_avatar": "https://img1.famulei.com/z/2983551/p/185/3000581472483_100x100.jpg",
          //         "member_nickname": "是你们的大宝贝奶瓶啊",
          //         "right_count": "3",
          //         "wrong_count": "3",
          //         "unknown_count": "0",
          //         "reward_double": "1.1",
          //         "net_profit": "-24",
          //         "total_profit": "-24",
          //         "cache_key": "1554882736013",
          //         "content": "",
          //         "status": "1",
          //         "status_txt": "已结算",
          //         "bet_items": [
          //           {
          //             "id": "4963252",
          //             "member_id": "2983551",
          //             "add_time": "1554689738",
          //             "price": "20",
          //             "bet_id": "7732",
          //             "bet_item_id": "16636",
          //             "ssdb_key": "29835511663615546897388071",
          //             "settlement_time": "0",
          //             "refund_time": "0",
          //             "bet_group_id": "11363",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "0",
          //             "appid": "1",
          //             "status": "3",
          //             "bet_end_time": "1555142400",
          //             "result_item_id": "16635",
          //             "title": "第一局比赛是否会超过38分钟？",
          //             "item_name": "不会",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "19/04/13",
          //             "match_time": "16:00:00",
          //             "match_team_a": "GRF",
          //             "match_team_b": "SKT",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/2116101396555_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/5688126/p/191/2116104235726_100X100.png",
          //             "result_item_string": "会",
          //             "result_item_string_en": "",
          //             "result_item_string_tw": "",
          //             "total_price": "214k",
          //             "people_num": "1927",
          //             "tournament_image": "https://img1.famulei.com/z/5688126/p/1812/1118565721703.png",
          //             "tournament_name": "2019 LCK春季赛 季后赛 ",
          //             "tournament_name_en": "2019 LCK春季赛 季后赛 ",
          //             "tournament_name_tw": "2019 LCK春季赛 季后赛 ",
          //             "view_type": 1,
          //             "odds": "1.49"
          //           },
          //           {
          //             "id": "4963253",
          //             "member_id": "2983551",
          //             "add_time": "1554689738",
          //             "price": "20",
          //             "bet_id": "7730",
          //             "bet_item_id": "16631",
          //             "ssdb_key": "29835511663115546897385847",
          //             "settlement_time": "1555153728",
          //             "refund_time": "0",
          //             "bet_group_id": "11363",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "37",
          //             "appid": "1",
          //             "status": "3",
          //             "bet_end_time": "1555142400",
          //             "result_item_id": "16631",
          //             "title": "谁会拿到比赛的胜利？",
          //             "item_name": "SKT",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "19/04/13",
          //             "match_time": "16:00:00",
          //             "match_team_a": "GRF",
          //             "match_team_b": "SKT",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/2116101396555_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/5688126/p/191/2116104235726_100X100.png",
          //             "result_item_string": "SKT",
          //             "result_item_string_en": "",
          //             "result_item_string_tw": "",
          //             "total_price": "694k",
          //             "people_num": "5526",
          //             "tournament_image": "https://img1.famulei.com/z/5688126/p/1812/1118565721703.png",
          //             "tournament_name": "2019 LCK春季赛 季后赛 ",
          //             "tournament_name_en": "2019 LCK春季赛 季后赛 ",
          //             "tournament_name_tw": "2019 LCK春季赛 季后赛 ",
          //             "view_type": 1,
          //             "odds": "1.83"
          //           },
          //           {
          //             "id": "4963254",
          //             "member_id": "2983551",
          //             "add_time": "1554689738",
          //             "price": "20",
          //             "bet_id": "7723",
          //             "bet_item_id": "16614",
          //             "ssdb_key": "29835511661415546897386591",
          //             "settlement_time": "0",
          //             "refund_time": "0",
          //             "bet_group_id": "11363",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "0",
          //             "appid": "1",
          //             "status": "3",
          //             "bet_end_time": "1555146000",
          //             "result_item_id": "16615",
          //             "title": "谁能获得比赛胜利？",
          //             "item_name": "FPX",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "19/04/13",
          //             "match_time": "17:00:00",
          //             "match_team_a": "FPX",
          //             "match_team_b": "JDG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/2116131268514_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/5688126/p/191/2116161762530_100X100.png",
          //             "result_item_string": "JDG",
          //             "result_item_string_en": "",
          //             "result_item_string_tw": "",
          //             "total_price": "746k",
          //             "people_num": "5966",
          //             "tournament_image": "https://img1.famulei.com/z/5688126/p/1812/1118553311945.png",
          //             "tournament_name": "2019 LPL春季赛\t 季后赛 ",
          //             "tournament_name_en": "2019 LPL春季赛\t 季后赛 ",
          //             "tournament_name_tw": "2019 LPL春季赛\t 季后赛 ",
          //             "view_type": 1,
          //             "odds": "1.42"
          //           },
          //           {
          //             "id": "4963255",
          //             "member_id": "2983551",
          //             "add_time": "1554689738",
          //             "price": "20",
          //             "bet_id": "7729",
          //             "bet_item_id": "16629",
          //             "ssdb_key": "29835511662915546897383125",
          //             "settlement_time": "0",
          //             "refund_time": "0",
          //             "bet_group_id": "11363",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "0",
          //             "appid": "1",
          //             "status": "3",
          //             "bet_end_time": "1555167600",
          //             "result_item_id": "16628",
          //             "title": "谁将获得比赛胜利？",
          //             "item_name": "FNC",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "19/04/13",
          //             "match_time": "23:00:00",
          //             "match_team_a": "OG",
          //             "match_team_b": "FNC",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/2115402255657_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/5688126/p/191/2115400974383_100X100.png",
          //             "result_item_string": "OG",
          //             "result_item_string_en": "",
          //             "result_item_string_tw": "",
          //             "total_price": "141k",
          //             "people_num": "1323",
          //             "tournament_image": "https://img1.famulei.com/z/5688126/p/1812/1119023693195.png",
          //             "tournament_name": "2019 LEC春季赛\t 季后赛 ",
          //             "tournament_name_en": "2019 LEC春季赛\t 季后赛 ",
          //             "tournament_name_tw": "2019 LEC春季赛\t 季后赛 ",
          //             "view_type": 1,
          //             "odds": "1.29"
          //           },
          //           {
          //             "id": "4963256",
          //             "member_id": "2983551",
          //             "add_time": "1554689738",
          //             "price": "20",
          //             "bet_id": "7733",
          //             "bet_item_id": "16637",
          //             "ssdb_key": "29835511663715546897385584",
          //             "settlement_time": "1555247652",
          //             "refund_time": "0",
          //             "bet_group_id": "11363",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "27",
          //             "appid": "1",
          //             "status": "3",
          //             "bet_end_time": "1555232400",
          //             "result_item_id": "16637",
          //             "title": "谁会拿到比赛的胜利?",
          //             "item_name": "IG",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "19/04/14",
          //             "match_time": "17:00:00",
          //             "match_team_a": "iG",
          //             "match_team_b": "TOP",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/2116131620647_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/5688126/p/191/2116134049538_100X100.png",
          //             "result_item_string": "IG",
          //             "result_item_string_en": "",
          //             "result_item_string_tw": "",
          //             "total_price": "1080k",
          //             "people_num": "6464",
          //             "tournament_image": "https://img1.famulei.com/z/5688126/p/1812/1118553311945.png",
          //             "tournament_name": "2019 LPL春季赛\t 季后赛 ",
          //             "tournament_name_en": "2019 LPL春季赛\t 季后赛 ",
          //             "tournament_name_tw": "2019 LPL春季赛\t 季后赛 ",
          //             "view_type": 1,
          //             "odds": "1.35"
          //           },
          //           {
          //             "id": "4963257",
          //             "member_id": "2983551",
          //             "add_time": "1554689738",
          //             "price": "20",
          //             "bet_id": "7735",
          //             "bet_item_id": "16642",
          //             "ssdb_key": "29835511664215546897388603",
          //             "settlement_time": "1555234670",
          //             "refund_time": "0",
          //             "bet_group_id": "11363",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "32",
          //             "appid": "1",
          //             "status": "3",
          //             "bet_end_time": "1555232400",
          //             "result_item_id": "16642",
          //             "title": "第一局谁先拿到五个击杀？",
          //             "item_name": "IG",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "19/04/14",
          //             "match_time": "17:00:00",
          //             "match_team_a": "iG",
          //             "match_team_b": "TOP",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/2116131620647_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/5688126/p/191/2116134049538_100X100.png",
          //             "result_item_string": "IG",
          //             "result_item_string_en": "",
          //             "result_item_string_tw": "",
          //             "total_price": "244k",
          //             "people_num": "2129",
          //             "tournament_image": "https://img1.famulei.com/z/5688126/p/1812/1118553311945.png",
          //             "tournament_name": "2019 LPL春季赛\t 季后赛 ",
          //             "tournament_name_en": "2019 LPL春季赛\t 季后赛 ",
          //             "tournament_name_tw": "2019 LPL春季赛\t 季后赛 ",
          //             "view_type": 1,
          //             "odds": "1.58"
          //           }
          //         ]
          //       },
          //       {
          //         "bet_group_id": "9816",
          //         "bet_group_follow_id": "13194",
          //         "title": "嗯",
          //         "is_private": "0",
          //         "is_main": "0",
          //         "add_time": "2019-03-19 16:48",
          //         "member_avatar": "https://img1.famulei.com/z/6248659/p/189/1220055931134_100x100.jpg",
          //         "member_nickname": "冷月殇魅",
          //         "right_count": "6",
          //         "wrong_count": "1",
          //         "unknown_count": "0",
          //         "reward_double": "1.2",
          //         "net_profit": "13",
          //         "total_profit": "13",
          //         "cache_key": "1552985285081",
          //         "content": "",
          //         "status": "1",
          //         "status_txt": "已结算",
          //         "bet_items": [
          //           {
          //             "id": "4772887",
          //             "member_id": "6248659",
          //             "add_time": "1552789586",
          //             "price": "20",
          //             "bet_id": "7639",
          //             "bet_item_id": "16425",
          //             "ssdb_key": "62486591642515527895866420",
          //             "settlement_time": "1553347896",
          //             "refund_time": "0",
          //             "bet_group_id": "9816",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "29",
          //             "appid": "1",
          //             "status": "3",
          //             "bet_end_time": "1553338800",
          //             "result_item_id": "16425",
          //             "title": "谁会拿到比赛的胜利",
          //             "item_name": "IG",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "19/03/23",
          //             "match_time": "19:00:00",
          //             "match_team_a": "RNG",
          //             "match_team_b": "iG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/2116133076803_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/5688126/p/191/2116131620647_100X100.png",
          //             "result_item_string": "IG",
          //             "result_item_string_en": "",
          //             "result_item_string_tw": "",
          //             "total_price": "1010k",
          //             "people_num": "5083",
          //             "tournament_image": "https://img1.famulei.com/z/5688126/p/1812/1118553311945.png",
          //             "tournament_name": "2019 LPL春季赛\t 常规赛 第九周",
          //             "tournament_name_en": "2019 LPL春季赛\t 常规赛 第九周",
          //             "tournament_name_tw": "2019 LPL春季赛\t 常规赛 第九周",
          //             "view_type": 1,
          //             "odds": "1.42"
          //           },
          //           {
          //             "id": "4772888",
          //             "member_id": "6248659",
          //             "add_time": "1552789586",
          //             "price": "20",
          //             "bet_id": "7647",
          //             "bet_item_id": "16441",
          //             "ssdb_key": "62486591644115527895867029",
          //             "settlement_time": "1553428074",
          //             "refund_time": "0",
          //             "bet_group_id": "9816",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "23",
          //             "appid": "1",
          //             "status": "3",
          //             "bet_end_time": "1553418000",
          //             "result_item_id": "16441",
          //             "title": "谁会拿到比赛的胜利",
          //             "item_name": "WE",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "19/03/24",
          //             "match_time": "17:00:00",
          //             "match_team_a": "VG",
          //             "match_team_b": "WE",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/1217213417198_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0417191173302_100X100.png",
          //             "result_item_string": "WE",
          //             "result_item_string_en": "",
          //             "result_item_string_tw": "",
          //             "total_price": "737k",
          //             "people_num": "2855",
          //             "tournament_image": "https://img1.famulei.com/z/5688126/p/1812/1118553311945.png",
          //             "tournament_name": "2019 LPL春季赛\t 常规赛 第九周",
          //             "tournament_name_en": "2019 LPL春季赛\t 常规赛 第九周",
          //             "tournament_name_tw": "2019 LPL春季赛\t 常规赛 第九周",
          //             "view_type": 1,
          //             "odds": "1.14"
          //           },
          //           {
          //             "id": "4772889",
          //             "member_id": "6248659",
          //             "add_time": "1552789586",
          //             "price": "20",
          //             "bet_id": "7659",
          //             "bet_item_id": "16465",
          //             "ssdb_key": "62486591646515527895863594",
          //             "settlement_time": "0",
          //             "refund_time": "0",
          //             "bet_group_id": "9816",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "0",
          //             "appid": "1",
          //             "status": "3",
          //             "bet_end_time": "1553590800",
          //             "result_item_id": "16464",
          //             "title": "谁会拿到比赛的胜利",
          //             "item_name": "IG",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "19/03/26",
          //             "match_time": "17:00:00",
          //             "match_team_a": "BLG",
          //             "match_team_b": "iG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/0318305067369_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0411192341360_100X100.png",
          //             "result_item_string": "BLG",
          //             "result_item_string_en": "",
          //             "result_item_string_tw": "",
          //             "total_price": "647k",
          //             "people_num": "3997",
          //             "tournament_image": "https://img1.famulei.com/z/5688126/p/1812/1118553311945.png",
          //             "tournament_name": "2019 LPL春季赛\t 常规赛 第十周",
          //             "tournament_name_en": "2019 LPL春季赛\t 常规赛 第十周",
          //             "tournament_name_tw": "2019 LPL春季赛\t 常规赛 第十周",
          //             "view_type": 1,
          //             "odds": "1.14"
          //           },
          //           {
          //             "id": "4772890",
          //             "member_id": "6248659",
          //             "add_time": "1552789586",
          //             "price": "20",
          //             "bet_id": "7583",
          //             "bet_item_id": "16313",
          //             "ssdb_key": "62486591631315527895869431",
          //             "settlement_time": "1553766625",
          //             "refund_time": "0",
          //             "bet_group_id": "9816",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "22",
          //             "appid": "1",
          //             "status": "3",
          //             "bet_end_time": "1553760000",
          //             "result_item_id": "16313",
          //             "title": "谁会拿到比赛的胜利",
          //             "item_name": "SKT",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "19/03/28",
          //             "match_time": "16:00:00",
          //             "match_team_a": "JAG",
          //             "match_team_b": "SKT",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/1612/2915475110063_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/1612/2915392771536_100X100.png",
          //             "result_item_string": "SKT",
          //             "result_item_string_en": "",
          //             "result_item_string_tw": "",
          //             "total_price": "339k",
          //             "people_num": "2305",
          //             "tournament_image": "https://img1.famulei.com/z/5688126/p/1812/1118565721703.png",
          //             "tournament_name": "2019 LCK春季赛 常规赛 第十周",
          //             "tournament_name_en": "2019 LCK春季赛 常规赛 第十周",
          //             "tournament_name_tw": "2019 LCK春季赛 常规赛 第十周",
          //             "view_type": 1,
          //             "odds": "1.09"
          //           },
          //           {
          //             "id": "4772891",
          //             "member_id": "6248659",
          //             "add_time": "1552789586",
          //             "price": "20",
          //             "bet_id": "7671",
          //             "bet_item_id": "16489",
          //             "ssdb_key": "62486591648915527895861267",
          //             "settlement_time": "1553856095",
          //             "refund_time": "0",
          //             "bet_group_id": "9816",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "24",
          //             "appid": "1",
          //             "status": "3",
          //             "bet_end_time": "1553850000",
          //             "result_item_id": "16489",
          //             "title": "谁会拿到比赛的胜利",
          //             "item_name": "WE",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "19/03/29",
          //             "match_time": "17:00:00",
          //             "match_team_a": "RW",
          //             "match_team_b": "WE",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/5688126/p/191/0319080269308_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0417191173302_100X100.png",
          //             "result_item_string": "WE",
          //             "result_item_string_en": "",
          //             "result_item_string_tw": "",
          //             "total_price": "789k",
          //             "people_num": "3651",
          //             "tournament_image": "https://img1.famulei.com/z/5688126/p/1812/1118553311945.png",
          //             "tournament_name": "2019 LPL春季赛\t 常规赛 第十周",
          //             "tournament_name_en": "2019 LPL春季赛\t 常规赛 第十周",
          //             "tournament_name_tw": "2019 LPL春季赛\t 常规赛 第十周",
          //             "view_type": 1,
          //             "odds": "1.18"
          //           },
          //           {
          //             "id": "4772892",
          //             "member_id": "6248659",
          //             "add_time": "1552789586",
          //             "price": "20",
          //             "bet_id": "7680",
          //             "bet_item_id": "16506",
          //             "ssdb_key": "62486591650615527895869764",
          //             "settlement_time": "1553943169",
          //             "refund_time": "0",
          //             "bet_group_id": "9816",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "33",
          //             "appid": "1",
          //             "status": "3",
          //             "bet_end_time": "1553934360",
          //             "result_item_id": "16506",
          //             "title": "谁会拿到比赛的胜利",
          //             "item_name": "TOP",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "19/03/30",
          //             "match_time": "16:26:00",
          //             "match_team_a": "TOP",
          //             "match_team_b": "BLG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/1712/2216063069163_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/5688126/p/191/0318305067369_100X100.png",
          //             "result_item_string": "TOP",
          //             "result_item_string_en": "",
          //             "result_item_string_tw": "",
          //             "total_price": "293k",
          //             "people_num": "1746",
          //             "tournament_image": "https://img1.famulei.com/z/5688126/p/1812/1118553311945.png",
          //             "tournament_name": "2019 LPL春季赛\t 常规赛 第十周",
          //             "tournament_name_en": "2019 LPL春季赛\t 常规赛 第十周",
          //             "tournament_name_tw": "2019 LPL春季赛\t 常规赛 第十周",
          //             "view_type": 1,
          //             "odds": "1.64"
          //           },
          //           {
          //             "id": "4772893",
          //             "member_id": "6248659",
          //             "add_time": "1552789586",
          //             "price": "20",
          //             "bet_id": "7601",
          //             "bet_item_id": "16349",
          //             "ssdb_key": "62486591634915527895866414",
          //             "settlement_time": "1554025325",
          //             "refund_time": "0",
          //             "bet_group_id": "9816",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "22",
          //             "appid": "1",
          //             "status": "3",
          //             "bet_end_time": "1554019200",
          //             "result_item_id": "16349",
          //             "title": "谁会拿到比赛的胜利",
          //             "item_name": "GRF",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "19/03/31",
          //             "match_time": "16:00:00",
          //             "match_team_a": "JAG",
          //             "match_team_b": "GRF",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/1612/2915475110063_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/186/2215413448399_100X100.png",
          //             "result_item_string": "GRF",
          //             "result_item_string_en": "",
          //             "result_item_string_tw": "",
          //             "total_price": "219k",
          //             "people_num": "1393",
          //             "tournament_image": "https://img1.famulei.com/z/5688126/p/1812/1118565721703.png",
          //             "tournament_name": "2019 LCK春季赛 常规赛 第十周",
          //             "tournament_name_en": "2019 LCK春季赛 常规赛 第十周",
          //             "tournament_name_tw": "2019 LCK春季赛 常规赛 第十周",
          //             "view_type": 1,
          //             "odds": "1.09"
          //           }
          //         ]
          //       },
          //       {
          //         "bet_group_id": "3811",
          //         "bet_group_follow_id": "6236",
          //         "title": "试试看",
          //         "is_private": "0",
          //         "is_main": "0",
          //         "add_time": "2018-03-21 17:53",
          //         "member_avatar": "https://img1.famulei.com/z/5678441/p/183/1013095352415_90x90.png",
          //         "member_nickname": "HuaNgYUooo",
          //         "right_count": "9",
          //         "wrong_count": "1",
          //         "unknown_count": "0",
          //         "reward_double": "1.5",
          //         "net_profit": "17",
          //         "total_profit": "17",
          //         "cache_key": "1521626013053",
          //         "content": "",
          //         "status": "1",
          //         "status_txt": "已结算",
          //         "bet_items": [
          //           {
          //             "id": "3236530",
          //             "member_id": "5678441",
          //             "add_time": "1521554702",
          //             "price": "10",
          //             "bet_id": "5008",
          //             "bet_item_id": "10700",
          //             "ssdb_key": "56784411070015215547027640",
          //             "settlement_time": "1521640963",
          //             "refund_time": "0",
          //             "bet_group_id": "3811",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "11",
          //             "status": "3",
          //             "bet_end_time": "1521630000",
          //             "result_item_id": "10700",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "KZ",
          //             "match_date": "18/03/21",
          //             "match_time": "19:00:00",
          //             "match_team_a": "KZ",
          //             "match_team_b": "JAG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/181/0914250768297_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/1612/2915475110063_100X100.png",
          //             "result_item_string": "KZ",
          //             "total_price": "93k",
          //             "people_num": "400",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/1714130938617.png",
          //             "tournament_name": "2018 LCK春季赛",
          //             "view_type": 1,
          //             "odds": "1.10"
          //           },
          //           {
          //             "id": "3236531",
          //             "member_id": "5678441",
          //             "add_time": "1521554702",
          //             "price": "10",
          //             "bet_id": "5009",
          //             "bet_item_id": "10702",
          //             "ssdb_key": "56784411070215215547028842",
          //             "settlement_time": "1521641072",
          //             "refund_time": "0",
          //             "bet_group_id": "3811",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "14",
          //             "status": "3",
          //             "bet_end_time": "1521630000",
          //             "result_item_id": "10702",
          //             "title": "比赛会进行几场？",
          //             "item_name": "两场",
          //             "match_date": "18/03/21",
          //             "match_time": "19:00:00",
          //             "match_team_a": "KZ",
          //             "match_team_b": "JAG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/181/0914250768297_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/1612/2915475110063_100X100.png",
          //             "result_item_string": "两场",
          //             "total_price": "28k",
          //             "people_num": "139",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/1714130938617.png",
          //             "tournament_name": "2018 LCK春季赛",
          //             "view_type": 1,
          //             "odds": "1.31"
          //           },
          //           {
          //             "id": "3236539",
          //             "member_id": "5678441",
          //             "add_time": "1521554702",
          //             "price": "10",
          //             "bet_id": "5022",
          //             "bet_item_id": "10728",
          //             "ssdb_key": "56784411072815215547024340",
          //             "settlement_time": "1521802071",
          //             "refund_time": "0",
          //             "bet_group_id": "3811",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "12",
          //             "status": "3",
          //             "bet_end_time": "1521795600",
          //             "result_item_id": "10728",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "iG",
          //             "match_date": "18/03/23",
          //             "match_time": "17:00:00",
          //             "match_team_a": "iG",
          //             "match_team_b": "JDG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/0411192341360_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/175/2710301716082_100X100.png",
          //             "result_item_string": "iG",
          //             "total_price": "337k",
          //             "people_num": "1706",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.12"
          //           },
          //           {
          //             "id": "3236532",
          //             "member_id": "5678441",
          //             "add_time": "1521554702",
          //             "price": "10",
          //             "bet_id": "5029",
          //             "bet_item_id": "10742",
          //             "ssdb_key": "56784411074215215547027318",
          //             "settlement_time": "1521806342",
          //             "refund_time": "0",
          //             "bet_group_id": "3811",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "15",
          //             "status": "3",
          //             "bet_end_time": "1521802800",
          //             "result_item_id": "10742",
          //             "title": "谁将率先拿到小龙？",
          //             "item_name": "EDG",
          //             "match_date": "18/03/23",
          //             "match_time": "19:00:00",
          //             "match_team_a": "EDG",
          //             "match_team_b": "VG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/0411150851993_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/1217213417198_100X100.png",
          //             "result_item_string": "EDG",
          //             "total_price": "50k",
          //             "people_num": "316",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.47"
          //           },
          //           {
          //             "id": "3236534",
          //             "member_id": "5678441",
          //             "add_time": "1521554702",
          //             "price": "10",
          //             "bet_id": "5027",
          //             "bet_item_id": "10738",
          //             "ssdb_key": "56784411073815215547023934",
          //             "settlement_time": "1521808234",
          //             "refund_time": "0",
          //             "bet_group_id": "3811",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "16",
          //             "status": "3",
          //             "bet_end_time": "1521802800",
          //             "result_item_id": "10738",
          //             "title": "比赛会进行几场？",
          //             "item_name": "两场",
          //             "match_date": "18/03/23",
          //             "match_time": "19:00:00",
          //             "match_team_a": "EDG",
          //             "match_team_b": "VG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/0411150851993_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/1217213417198_100X100.png",
          //             "result_item_string": "两场",
          //             "total_price": "50k",
          //             "people_num": "311",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.55"
          //           },
          //           {
          //             "id": "3236533",
          //             "member_id": "5678441",
          //             "add_time": "1521554702",
          //             "price": "10",
          //             "bet_id": "5028",
          //             "bet_item_id": "10740",
          //             "ssdb_key": "56784411074015215547025793",
          //             "settlement_time": "1521806272",
          //             "refund_time": "0",
          //             "bet_group_id": "3811",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "13",
          //             "status": "3",
          //             "bet_end_time": "1521802800",
          //             "result_item_id": "10740",
          //             "title": "第一局谁会获胜？",
          //             "item_name": "EDG",
          //             "match_date": "18/03/23",
          //             "match_time": "19:00:00",
          //             "match_team_a": "EDG",
          //             "match_team_b": "VG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/0411150851993_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/1217213417198_100X100.png",
          //             "result_item_string": "EDG",
          //             "total_price": "61k",
          //             "people_num": "354",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.24"
          //           },
          //           {
          //             "id": "3236535",
          //             "member_id": "5678441",
          //             "add_time": "1521554702",
          //             "price": "10",
          //             "bet_id": "5026",
          //             "bet_item_id": "10736",
          //             "ssdb_key": "56784411073615215547025726",
          //             "settlement_time": "1521808215",
          //             "refund_time": "0",
          //             "bet_group_id": "3811",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "12",
          //             "status": "3",
          //             "bet_end_time": "1521802800",
          //             "result_item_id": "10736",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "EDG",
          //             "match_date": "18/03/23",
          //             "match_time": "19:00:00",
          //             "match_team_a": "EDG",
          //             "match_team_b": "VG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/0411150851993_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/1217213417198_100X100.png",
          //             "result_item_string": "EDG",
          //             "total_price": "178k",
          //             "people_num": "786",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.20"
          //           },
          //           {
          //             "id": "3236537",
          //             "member_id": "5678441",
          //             "add_time": "1521554702",
          //             "price": "10",
          //             "bet_id": "5015",
          //             "bet_item_id": "10714",
          //             "ssdb_key": "56784411071415215547021449",
          //             "settlement_time": "0",
          //             "refund_time": "0",
          //             "bet_group_id": "3811",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "0",
          //             "status": "3",
          //             "bet_end_time": "1521878400",
          //             "result_item_id": "10715",
          //             "title": "比赛会进行几场？",
          //             "item_name": "两场",
          //             "match_date": "18/03/24",
          //             "match_time": "16:00:00",
          //             "match_team_a": "KSV",
          //             "match_team_b": "KZ",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/181/0914230758250_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/181/0914250768297_100X100.png",
          //             "result_item_string": "三场",
          //             "total_price": "41k",
          //             "people_num": "268",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/1714130938617.png",
          //             "tournament_name": "2018 LCK春季赛",
          //             "view_type": 1,
          //             "odds": "1.43"
          //           },
          //           {
          //             "id": "3236536",
          //             "member_id": "5678441",
          //             "add_time": "1521554702",
          //             "price": "10",
          //             "bet_id": "5014",
          //             "bet_item_id": "10713",
          //             "ssdb_key": "56784411071315215547029371",
          //             "settlement_time": "1521891164",
          //             "refund_time": "0",
          //             "bet_group_id": "3811",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "12",
          //             "status": "3",
          //             "bet_end_time": "1521878400",
          //             "result_item_id": "10713",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "KZ",
          //             "match_date": "18/03/24",
          //             "match_time": "16:00:00",
          //             "match_team_a": "KSV",
          //             "match_team_b": "KZ",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/181/0914230758250_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/181/0914250768297_100X100.png",
          //             "result_item_string": "KZ",
          //             "total_price": "157k",
          //             "people_num": "849",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/1714130938617.png",
          //             "tournament_name": "2018 LCK春季赛",
          //             "view_type": 1,
          //             "odds": "1.15"
          //           },
          //           {
          //             "id": "3236538",
          //             "member_id": "5678441",
          //             "add_time": "1521554702",
          //             "price": "10",
          //             "bet_id": "5018",
          //             "bet_item_id": "10721",
          //             "ssdb_key": "56784411072115215547029566",
          //             "settlement_time": "1521983604",
          //             "refund_time": "0",
          //             "bet_group_id": "3811",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "12",
          //             "status": "3",
          //             "bet_end_time": "1521964800",
          //             "result_item_id": "10721",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "SKT",
          //             "match_date": "18/03/25",
          //             "match_time": "16:00:00",
          //             "match_team_a": "KDM",
          //             "match_team_b": "SKT",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/1115433184967_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/1612/2915392771536_100X100.png",
          //             "result_item_string": "SKT",
          //             "total_price": "115k",
          //             "people_num": "577",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/1714130938617.png",
          //             "tournament_name": "2018 LCK春季赛",
          //             "view_type": 1,
          //             "odds": "1.12"
          //           }
          //         ]
          //       },
          //       {
          //         "bet_group_id": "3478",
          //         "bet_group_follow_id": "5710",
          //         "title": "关于LPL今日比赛",
          //         "is_private": "0",
          //         "is_main": "0",
          //         "add_time": "2018-02-07 14:53",
          //         "member_avatar": "https://img1.famulei.com/m/5581373/p/178/0811304399636_90x90.png",
          //         "member_nickname": "肉鸡暴风小可爱丶",
          //         "right_count": "4",
          //         "wrong_count": "2",
          //         "unknown_count": "0",
          //         "reward_double": "1.1",
          //         "net_profit": "-5",
          //         "total_profit": "-5",
          //         "cache_key": "1517986385041",
          //         "content": "",
          //         "status": "1",
          //         "status_txt": "已结算",
          //         "bet_items": [
          //           {
          //             "id": "3099824",
          //             "member_id": "5581373",
          //             "add_time": "1517942101",
          //             "price": "10",
          //             "bet_id": "4517",
          //             "bet_item_id": "9713",
          //             "ssdb_key": "5581373971315179421018664",
          //             "settlement_time": "1518005239",
          //             "refund_time": "0",
          //             "bet_group_id": "3478",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "12",
          //             "status": "3",
          //             "bet_end_time": "1517994000",
          //             "result_item_id": "9713",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "BLG",
          //             "match_date": "18/02/07",
          //             "match_time": "17:00:00",
          //             "match_team_a": "BLG",
          //             "match_team_b": "TOP",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/1712/2217585649173_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/1712/2216063069163_100X100.png",
          //             "result_item_string": "BLG",
          //             "total_price": "146k",
          //             "people_num": "849",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.17"
          //           },
          //           {
          //             "id": "3099825",
          //             "member_id": "5581373",
          //             "add_time": "1517942101",
          //             "price": "10",
          //             "bet_id": "4657",
          //             "bet_item_id": "9999",
          //             "ssdb_key": "5581373999915179421011364",
          //             "settlement_time": "0",
          //             "refund_time": "0",
          //             "bet_group_id": "3478",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "0",
          //             "status": "3",
          //             "bet_end_time": "1517994000",
          //             "result_item_id": "9998",
          //             "title": "比赛会进行几场？",
          //             "item_name": "三场",
          //             "match_date": "18/02/07",
          //             "match_time": "17:00:00",
          //             "match_team_a": "BLG",
          //             "match_team_b": "TOP",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/1712/2217585649173_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/1712/2216063069163_100X100.png",
          //             "result_item_string": "两场",
          //             "total_price": "40k",
          //             "people_num": "235",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "2.85"
          //           },
          //           {
          //             "id": "3099820",
          //             "member_id": "5581373",
          //             "add_time": "1517942101",
          //             "price": "10",
          //             "bet_id": "4692",
          //             "bet_item_id": "10068",
          //             "ssdb_key": "55813731006815179421015557",
          //             "settlement_time": "1518010774",
          //             "refund_time": "0",
          //             "bet_group_id": "3478",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "14",
          //             "status": "3",
          //             "bet_end_time": "1518001200",
          //             "result_item_id": "10068",
          //             "title": "第一局谁会获胜？",
          //             "item_name": "iG",
          //             "match_date": "18/02/07",
          //             "match_time": "19:00:00",
          //             "match_team_a": "iG",
          //             "match_team_b": "FPX",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/0411192341360_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/1712/2218103381529_100X100.png",
          //             "result_item_string": "iG",
          //             "total_price": "58k",
          //             "people_num": "360",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.36"
          //           },
          //           {
          //             "id": "3099822",
          //             "member_id": "5581373",
          //             "add_time": "1517942101",
          //             "price": "10",
          //             "bet_id": "4698",
          //             "bet_item_id": "10080",
          //             "ssdb_key": "55813731008015179421013469",
          //             "settlement_time": "1518010781",
          //             "refund_time": "0",
          //             "bet_group_id": "3478",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "16",
          //             "status": "3",
          //             "bet_end_time": "1518001200",
          //             "result_item_id": "10080",
          //             "title": "谁将率先拿到大龙？",
          //             "item_name": "iG",
          //             "match_date": "18/02/07",
          //             "match_time": "19:00:00",
          //             "match_team_a": "iG",
          //             "match_team_b": "FPX",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/0411192341360_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/1712/2218103381529_100X100.png",
          //             "result_item_string": "iG",
          //             "total_price": "30k",
          //             "people_num": "161",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.54"
          //           },
          //           {
          //             "id": "3099821",
          //             "member_id": "5581373",
          //             "add_time": "1517942101",
          //             "price": "10",
          //             "bet_id": "4678",
          //             "bet_item_id": "10040",
          //             "ssdb_key": "55813731004015179421018357",
          //             "settlement_time": "0",
          //             "refund_time": "0",
          //             "bet_group_id": "3478",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "0",
          //             "status": "3",
          //             "bet_end_time": "1518001200",
          //             "result_item_id": "10041",
          //             "title": "比赛会进行几场？",
          //             "item_name": "两场",
          //             "match_date": "18/02/07",
          //             "match_time": "19:00:00",
          //             "match_team_a": "iG",
          //             "match_team_b": "FPX",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/0411192341360_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/1712/2218103381529_100X100.png",
          //             "result_item_string": "三场",
          //             "total_price": "39k",
          //             "people_num": "224",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.59"
          //           },
          //           {
          //             "id": "3099823",
          //             "member_id": "5581373",
          //             "add_time": "1517942101",
          //             "price": "10",
          //             "bet_id": "4518",
          //             "bet_item_id": "9715",
          //             "ssdb_key": "5581373971515179421017752",
          //             "settlement_time": "1518010754",
          //             "refund_time": "0",
          //             "bet_group_id": "3478",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "13",
          //             "status": "3",
          //             "bet_end_time": "1518001200",
          //             "result_item_id": "9715",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "IG",
          //             "match_date": "18/02/07",
          //             "match_time": "19:00:00",
          //             "match_team_a": "iG",
          //             "match_team_b": "FPX",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/0411192341360_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/1712/2218103381529_100X100.png",
          //             "result_item_string": "IG",
          //             "total_price": "126k",
          //             "people_num": "577",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.23"
          //           }
          //         ]
          //       },
          //       {
          //         "bet_group_id": "3476",
          //         "bet_group_follow_id": "5709",
          //         "title": "。",
          //         "is_private": "0",
          //         "is_main": "0",
          //         "add_time": "2018-02-07 14:52",
          //         "member_avatar": "",
          //         "member_nickname": "Melon丶Dan",
          //         "right_count": "4",
          //         "wrong_count": "2",
          //         "unknown_count": "0",
          //         "reward_double": "1.1",
          //         "net_profit": "-5",
          //         "total_profit": "-5",
          //         "cache_key": "1517986367091",
          //         "content": "",
          //         "status": "1",
          //         "status_txt": "已结算",
          //         "bet_items": [
          //           {
          //             "id": "3099569",
          //             "member_id": "2516497",
          //             "add_time": "1517934902",
          //             "price": "10",
          //             "bet_id": "4635",
          //             "bet_item_id": "9954",
          //             "ssdb_key": "2516497995415179349024080",
          //             "settlement_time": "0",
          //             "refund_time": "0",
          //             "bet_group_id": "3476",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "0",
          //             "status": "3",
          //             "bet_end_time": "1517990400",
          //             "result_item_id": "9955",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "bbq",
          //             "match_date": "18/02/07",
          //             "match_time": "16:00:00",
          //             "match_team_a": "bbq",
          //             "match_team_b": "SKT",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/1618102315400_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/1612/2915392771536_100X100.png",
          //             "result_item_string": "SKT",
          //             "total_price": "134k",
          //             "people_num": "828",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/1714130938617.png",
          //             "tournament_name": "2018 LCK春季赛",
          //             "view_type": 1,
          //             "odds": "2.16"
          //           },
          //           {
          //             "id": "3099570",
          //             "member_id": "2516497",
          //             "add_time": "1517934902",
          //             "price": "10",
          //             "bet_id": "4645",
          //             "bet_item_id": "9974",
          //             "ssdb_key": "2516497997415179349027243",
          //             "settlement_time": "0",
          //             "refund_time": "0",
          //             "bet_group_id": "3476",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "0",
          //             "status": "3",
          //             "bet_end_time": "1517990400",
          //             "result_item_id": "9975",
          //             "title": "比赛会进行几场？",
          //             "item_name": "两场",
          //             "match_date": "18/02/07",
          //             "match_time": "16:00:00",
          //             "match_team_a": "bbq",
          //             "match_team_b": "SKT",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/1618102315400_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/1612/2915392771536_100X100.png",
          //             "result_item_string": "三场",
          //             "total_price": "39k",
          //             "people_num": "245",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/1714130938617.png",
          //             "tournament_name": "2018 LCK春季赛",
          //             "view_type": 1,
          //             "odds": "1.88"
          //           },
          //           {
          //             "id": "3099571",
          //             "member_id": "2516497",
          //             "add_time": "1517934902",
          //             "price": "10",
          //             "bet_id": "4697",
          //             "bet_item_id": "10078",
          //             "ssdb_key": "25164971007815179349029870",
          //             "settlement_time": "1518005278",
          //             "refund_time": "0",
          //             "bet_group_id": "3476",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "15",
          //             "status": "3",
          //             "bet_end_time": "1517994000",
          //             "result_item_id": "10078",
          //             "title": "谁将率先拿到一血？",
          //             "item_name": "BLG",
          //             "match_date": "18/02/07",
          //             "match_time": "17:00:00",
          //             "match_team_a": "BLG",
          //             "match_team_b": "TOP",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/1712/2217585649173_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/1712/2216063069163_100X100.png",
          //             "result_item_string": "BLG",
          //             "total_price": "36k",
          //             "people_num": "307",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.46"
          //           },
          //           {
          //             "id": "3099573",
          //             "member_id": "2516497",
          //             "add_time": "1517934902",
          //             "price": "10",
          //             "bet_id": "4517",
          //             "bet_item_id": "9713",
          //             "ssdb_key": "2516497971315179349022124",
          //             "settlement_time": "1518005245",
          //             "refund_time": "0",
          //             "bet_group_id": "3476",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "12",
          //             "status": "3",
          //             "bet_end_time": "1517994000",
          //             "result_item_id": "9713",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "BLG",
          //             "match_date": "18/02/07",
          //             "match_time": "17:00:00",
          //             "match_team_a": "BLG",
          //             "match_team_b": "TOP",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/1712/2217585649173_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/1712/2216063069163_100X100.png",
          //             "result_item_string": "BLG",
          //             "total_price": "146k",
          //             "people_num": "849",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.17"
          //           },
          //           {
          //             "id": "3099572",
          //             "member_id": "2516497",
          //             "add_time": "1517934902",
          //             "price": "10",
          //             "bet_id": "4691",
          //             "bet_item_id": "10066",
          //             "ssdb_key": "25164971006615179349025719",
          //             "settlement_time": "1518005267",
          //             "refund_time": "0",
          //             "bet_group_id": "3476",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "13",
          //             "status": "3",
          //             "bet_end_time": "1517994000",
          //             "result_item_id": "10066",
          //             "title": "第一局谁会获胜？",
          //             "item_name": "BLG",
          //             "match_date": "18/02/07",
          //             "match_time": "17:00:00",
          //             "match_team_a": "BLG",
          //             "match_team_b": "TOP",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/1712/2217585649173_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/1712/2216063069163_100X100.png",
          //             "result_item_string": "BLG",
          //             "total_price": "54k",
          //             "people_num": "363",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.29"
          //           },
          //           {
          //             "id": "3099574",
          //             "member_id": "2516497",
          //             "add_time": "1517934902",
          //             "price": "10",
          //             "bet_id": "4657",
          //             "bet_item_id": "9998",
          //             "ssdb_key": "2516497999815179349023108",
          //             "settlement_time": "1518005254",
          //             "refund_time": "0",
          //             "bet_group_id": "3476",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "15",
          //             "status": "3",
          //             "bet_end_time": "1517994000",
          //             "result_item_id": "9998",
          //             "title": "比赛会进行几场？",
          //             "item_name": "两场",
          //             "match_date": "18/02/07",
          //             "match_time": "17:00:00",
          //             "match_team_a": "BLG",
          //             "match_team_b": "TOP",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/1712/2217585649173_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/1712/2216063069163_100X100.png",
          //             "result_item_string": "两场",
          //             "total_price": "40k",
          //             "people_num": "235",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.43"
          //           }
          //         ]
          //       },
          //       {
          //         "bet_group_id": "3475",
          //         "bet_group_follow_id": "5708",
          //         "title": "发财",
          //         "is_private": "0",
          //         "is_main": "0",
          //         "add_time": "2018-02-07 14:52",
          //         "member_avatar": "https://img1.famulei.com/z/5592054/p/185/2314115056198_100x100.jpg",
          //         "member_nickname": "招兵买马接二连珊",
          //         "right_count": "6",
          //         "wrong_count": "4",
          //         "unknown_count": "0",
          //         "reward_double": "1.5",
          //         "net_profit": "-13",
          //         "total_profit": "-13",
          //         "cache_key": "1517986341028",
          //         "content": "",
          //         "status": "1",
          //         "status_txt": "已结算",
          //         "bet_items": [
          //           {
          //             "id": "3099464",
          //             "member_id": "5592054",
          //             "add_time": "1517933688",
          //             "price": "10",
          //             "bet_id": "4635",
          //             "bet_item_id": "9954",
          //             "ssdb_key": "5592054995415179336888921",
          //             "settlement_time": "0",
          //             "refund_time": "0",
          //             "bet_group_id": "3475",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "0",
          //             "status": "3",
          //             "bet_end_time": "1517990400",
          //             "result_item_id": "9955",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "bbq",
          //             "match_date": "18/02/07",
          //             "match_time": "16:00:00",
          //             "match_team_a": "bbq",
          //             "match_team_b": "SKT",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/1618102315400_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/1612/2915392771536_100X100.png",
          //             "result_item_string": "SKT",
          //             "total_price": "134k",
          //             "people_num": "828",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/1714130938617.png",
          //             "tournament_name": "2018 LCK春季赛",
          //             "view_type": 1,
          //             "odds": "2.16"
          //           },
          //           {
          //             "id": "3099465",
          //             "member_id": "5592054",
          //             "add_time": "1517933688",
          //             "price": "10",
          //             "bet_id": "4645",
          //             "bet_item_id": "9974",
          //             "ssdb_key": "5592054997415179336885363",
          //             "settlement_time": "0",
          //             "refund_time": "0",
          //             "bet_group_id": "3475",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "0",
          //             "status": "3",
          //             "bet_end_time": "1517990400",
          //             "result_item_id": "9975",
          //             "title": "比赛会进行几场？",
          //             "item_name": "两场",
          //             "match_date": "18/02/07",
          //             "match_time": "16:00:00",
          //             "match_team_a": "bbq",
          //             "match_team_b": "SKT",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/1618102315400_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/1612/2915392771536_100X100.png",
          //             "result_item_string": "三场",
          //             "total_price": "39k",
          //             "people_num": "245",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/1714130938617.png",
          //             "tournament_name": "2018 LCK春季赛",
          //             "view_type": 1,
          //             "odds": "1.88"
          //           },
          //           {
          //             "id": "3099466",
          //             "member_id": "5592054",
          //             "add_time": "1517933688",
          //             "price": "10",
          //             "bet_id": "4691",
          //             "bet_item_id": "10066",
          //             "ssdb_key": "55920541006615179336886088",
          //             "settlement_time": "1518005263",
          //             "refund_time": "0",
          //             "bet_group_id": "3475",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "13",
          //             "status": "3",
          //             "bet_end_time": "1517994000",
          //             "result_item_id": "10066",
          //             "title": "第一局谁会获胜？",
          //             "item_name": "BLG",
          //             "match_date": "18/02/07",
          //             "match_time": "17:00:00",
          //             "match_team_a": "BLG",
          //             "match_team_b": "TOP",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/1712/2217585649173_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/1712/2216063069163_100X100.png",
          //             "result_item_string": "BLG",
          //             "total_price": "54k",
          //             "people_num": "363",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.29"
          //           },
          //           {
          //             "id": "3099468",
          //             "member_id": "5592054",
          //             "add_time": "1517933688",
          //             "price": "10",
          //             "bet_id": "4657",
          //             "bet_item_id": "9998",
          //             "ssdb_key": "5592054999815179336883295",
          //             "settlement_time": "1518005252",
          //             "refund_time": "0",
          //             "bet_group_id": "3475",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "15",
          //             "status": "3",
          //             "bet_end_time": "1517994000",
          //             "result_item_id": "9998",
          //             "title": "比赛会进行几场？",
          //             "item_name": "两场",
          //             "match_date": "18/02/07",
          //             "match_time": "17:00:00",
          //             "match_team_a": "BLG",
          //             "match_team_b": "TOP",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/1712/2217585649173_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/1712/2216063069163_100X100.png",
          //             "result_item_string": "两场",
          //             "total_price": "40k",
          //             "people_num": "235",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.43"
          //           },
          //           {
          //             "id": "3099467",
          //             "member_id": "5592054",
          //             "add_time": "1517933688",
          //             "price": "10",
          //             "bet_id": "4517",
          //             "bet_item_id": "9713",
          //             "ssdb_key": "5592054971315179336881354",
          //             "settlement_time": "1518005238",
          //             "refund_time": "0",
          //             "bet_group_id": "3475",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "12",
          //             "status": "3",
          //             "bet_end_time": "1517994000",
          //             "result_item_id": "9713",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "BLG",
          //             "match_date": "18/02/07",
          //             "match_time": "17:00:00",
          //             "match_team_a": "BLG",
          //             "match_team_b": "TOP",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/1712/2217585649173_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/1712/2216063069163_100X100.png",
          //             "result_item_string": "BLG",
          //             "total_price": "146k",
          //             "people_num": "849",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.17"
          //           },
          //           {
          //             "id": "3099471",
          //             "member_id": "5592054",
          //             "add_time": "1517933688",
          //             "price": "10",
          //             "bet_id": "4678",
          //             "bet_item_id": "10040",
          //             "ssdb_key": "55920541004015179336886274",
          //             "settlement_time": "0",
          //             "refund_time": "0",
          //             "bet_group_id": "3475",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "0",
          //             "status": "3",
          //             "bet_end_time": "1518001200",
          //             "result_item_id": "10041",
          //             "title": "比赛会进行几场？",
          //             "item_name": "两场",
          //             "match_date": "18/02/07",
          //             "match_time": "19:00:00",
          //             "match_team_a": "iG",
          //             "match_team_b": "FPX",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/0411192341360_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/1712/2218103381529_100X100.png",
          //             "result_item_string": "三场",
          //             "total_price": "39k",
          //             "people_num": "224",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.59"
          //           },
          //           {
          //             "id": "3099473",
          //             "member_id": "5592054",
          //             "add_time": "1517933688",
          //             "price": "10",
          //             "bet_id": "4646",
          //             "bet_item_id": "9976",
          //             "ssdb_key": "5592054997615179336889729",
          //             "settlement_time": "1518012607",
          //             "refund_time": "0",
          //             "bet_group_id": "3475",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "20",
          //             "status": "3",
          //             "bet_end_time": "1518001200",
          //             "result_item_id": "9976",
          //             "title": "比赛会进行几场？",
          //             "item_name": "两场",
          //             "match_date": "18/02/07",
          //             "match_time": "19:00:00",
          //             "match_team_a": "KT",
          //             "match_team_b": "KZ",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/1612/2915483161334_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/181/0914250768297_100X100.png",
          //             "result_item_string": "两场",
          //             "total_price": "48k",
          //             "people_num": "222",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/1714130938617.png",
          //             "tournament_name": "2018 LCK春季赛",
          //             "view_type": 1,
          //             "odds": "1.92"
          //           },
          //           {
          //             "id": "3099470",
          //             "member_id": "5592054",
          //             "add_time": "1517933688",
          //             "price": "10",
          //             "bet_id": "4692",
          //             "bet_item_id": "10068",
          //             "ssdb_key": "55920541006815179336888435",
          //             "settlement_time": "1518010774",
          //             "refund_time": "0",
          //             "bet_group_id": "3475",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "14",
          //             "status": "3",
          //             "bet_end_time": "1518001200",
          //             "result_item_id": "10068",
          //             "title": "第一局谁会获胜？",
          //             "item_name": "iG",
          //             "match_date": "18/02/07",
          //             "match_time": "19:00:00",
          //             "match_team_a": "iG",
          //             "match_team_b": "FPX",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/0411192341360_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/1712/2218103381529_100X100.png",
          //             "result_item_string": "iG",
          //             "total_price": "58k",
          //             "people_num": "360",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.36"
          //           },
          //           {
          //             "id": "3099472",
          //             "member_id": "5592054",
          //             "add_time": "1517933688",
          //             "price": "10",
          //             "bet_id": "4518",
          //             "bet_item_id": "9715",
          //             "ssdb_key": "5592054971515179336884097",
          //             "settlement_time": "1518010752",
          //             "refund_time": "0",
          //             "bet_group_id": "3475",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "13",
          //             "status": "3",
          //             "bet_end_time": "1518001200",
          //             "result_item_id": "9715",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "IG",
          //             "match_date": "18/02/07",
          //             "match_time": "19:00:00",
          //             "match_team_a": "iG",
          //             "match_team_b": "FPX",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/0411192341360_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/1712/2218103381529_100X100.png",
          //             "result_item_string": "IG",
          //             "total_price": "126k",
          //             "people_num": "577",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.23"
          //           },
          //           {
          //             "id": "3099469",
          //             "member_id": "5592054",
          //             "add_time": "1517933688",
          //             "price": "10",
          //             "bet_id": "4636",
          //             "bet_item_id": "9956",
          //             "ssdb_key": "5592054995615179336887143",
          //             "settlement_time": "0",
          //             "refund_time": "0",
          //             "bet_group_id": "3475",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "0",
          //             "status": "3",
          //             "bet_end_time": "1518001200",
          //             "result_item_id": "9957",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "KT",
          //             "match_date": "18/02/07",
          //             "match_time": "19:00:00",
          //             "match_team_a": "KT",
          //             "match_team_b": "KZ",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/1612/2915483161334_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/181/0914250768297_100X100.png",
          //             "result_item_string": "KZ",
          //             "total_price": "137k",
          //             "people_num": "613",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/1714130938617.png",
          //             "tournament_name": "2018 LCK春季赛",
          //             "view_type": 1,
          //             "odds": "1.89"
          //           }
          //         ]
          //       },
          //       {
          //         "bet_group_id": "3276",
          //         "bet_group_follow_id": "5419",
          //         "title": "看人品",
          //         "is_private": "0",
          //         "is_main": "0",
          //         "add_time": "2018-01-15 15:31",
          //         "member_avatar": "https://img1.famulei.com/m/5660762/p/1710/0700472486438_100x100.jpg",
          //         "member_nickname": "典酱",
          //         "right_count": "5",
          //         "wrong_count": "1",
          //         "unknown_count": "0",
          //         "reward_double": "1.1",
          //         "net_profit": "12",
          //         "total_profit": "12",
          //         "cache_key": "1516001513065",
          //         "content": "",
          //         "status": "1",
          //         "status_txt": "已结算",
          //         "bet_items": [
          //           {
          //             "id": "2989111",
          //             "member_id": "5660762",
          //             "add_time": "1515856201",
          //             "price": "10",
          //             "bet_id": "4441",
          //             "bet_item_id": "9562",
          //             "ssdb_key": "5660762956215158562019466",
          //             "settlement_time": "1516024921",
          //             "refund_time": "0",
          //             "bet_group_id": "3276",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "15",
          //             "status": "3",
          //             "bet_end_time": "1516014000",
          //             "result_item_id": "9562",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "SNG",
          //             "match_date": "18/01/15",
          //             "match_time": "19:00:00",
          //             "match_team_a": "TOP",
          //             "match_team_b": "SNG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/1712/2216063069163_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0617443019399_100X100.png",
          //             "result_item_string": "SNG",
          //             "total_price": "76k",
          //             "people_num": "781",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.50"
          //           },
          //           {
          //             "id": "2989112",
          //             "member_id": "5660762",
          //             "add_time": "1515856201",
          //             "price": "10",
          //             "bet_id": "4471",
          //             "bet_item_id": "9621",
          //             "ssdb_key": "5660762962115158562015306",
          //             "settlement_time": "0",
          //             "refund_time": "0",
          //             "bet_group_id": "3276",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "0",
          //             "status": "3",
          //             "bet_end_time": "1516089600",
          //             "result_item_id": "9622",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "KZ",
          //             "match_date": "18/01/16",
          //             "match_time": "16:00:00",
          //             "match_team_a": "KZ",
          //             "match_team_b": "KSV",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/181/0914250768297_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/181/0914230758250_100X100.png",
          //             "result_item_string": "KSV",
          //             "total_price": "74k",
          //             "people_num": "693",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/1714130938617.png",
          //             "tournament_name": "2018 LCK春季赛",
          //             "view_type": 1,
          //             "odds": "1.61"
          //           },
          //           {
          //             "id": "2989113",
          //             "member_id": "5660762",
          //             "add_time": "1515856201",
          //             "price": "10",
          //             "bet_id": "4445",
          //             "bet_item_id": "9570",
          //             "ssdb_key": "5660762957015158562017344",
          //             "settlement_time": "1516109514",
          //             "refund_time": "0",
          //             "bet_group_id": "3276",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "12",
          //             "status": "3",
          //             "bet_end_time": "1516100400",
          //             "result_item_id": "9570",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "EDG",
          //             "match_date": "18/01/16",
          //             "match_time": "19:00:00",
          //             "match_team_a": "FPX",
          //             "match_team_b": "EDG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/1712/2218103381529_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0411150851993_100X100.png",
          //             "result_item_string": "EDG",
          //             "total_price": "199k",
          //             "people_num": "1336",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/0215380710235.png",
          //             "tournament_name": "2018 LPL春季赛\t",
          //             "view_type": 1,
          //             "odds": "1.13"
          //           },
          //           {
          //             "id": "2989114",
          //             "member_id": "5660762",
          //             "add_time": "1515856201",
          //             "price": "10",
          //             "bet_id": "4474",
          //             "bet_item_id": "9627",
          //             "ssdb_key": "5660762962715158562012471",
          //             "settlement_time": "1516247577",
          //             "refund_time": "0",
          //             "bet_group_id": "3276",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "12",
          //             "status": "3",
          //             "bet_end_time": "1516186800",
          //             "result_item_id": "9627",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "SKT",
          //             "match_date": "18/01/17",
          //             "match_time": "19:00:00",
          //             "match_team_a": "SKT",
          //             "match_team_b": "ROX",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/1612/2915392771536_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/1115425877255_100X100.png",
          //             "result_item_string": "SKT",
          //             "total_price": "68k",
          //             "people_num": "472",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/1714130938617.png",
          //             "tournament_name": "2018 LCK春季赛",
          //             "view_type": 1,
          //             "odds": "1.17"
          //           },
          //           {
          //             "id": "2989115",
          //             "member_id": "5660762",
          //             "add_time": "1515856201",
          //             "price": "10",
          //             "bet_id": "4475",
          //             "bet_item_id": "9630",
          //             "ssdb_key": "5660762963015158562011000",
          //             "settlement_time": "1516339161",
          //             "refund_time": "0",
          //             "bet_group_id": "3276",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "21",
          //             "status": "3",
          //             "bet_end_time": "1516262400",
          //             "result_item_id": "9630",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "BBQ",
          //             "match_date": "18/01/18",
          //             "match_time": "16:00:00",
          //             "match_team_a": "KDM",
          //             "match_team_b": "bbq",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/1115433184967_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/1618102315400_100X100.png",
          //             "result_item_string": "BBQ",
          //             "total_price": "51k",
          //             "people_num": "350",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/1714130938617.png",
          //             "tournament_name": "2018 LCK春季赛",
          //             "view_type": 1,
          //             "odds": "2.05"
          //           },
          //           {
          //             "id": "2989116",
          //             "member_id": "5660762",
          //             "add_time": "1515856201",
          //             "price": "10",
          //             "bet_id": "4476",
          //             "bet_item_id": "9632",
          //             "ssdb_key": "5660762963215158562011611",
          //             "settlement_time": "1516339171",
          //             "refund_time": "0",
          //             "bet_group_id": "3276",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "12",
          //             "status": "3",
          //             "bet_end_time": "1516273200",
          //             "result_item_id": "9632",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "KSV",
          //             "match_date": "18/01/18",
          //             "match_time": "19:00:00",
          //             "match_team_a": "JAG",
          //             "match_team_b": "KSV",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/1612/2915475110063_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/181/0914230758250_100X100.png",
          //             "result_item_string": "KSV",
          //             "total_price": "77k",
          //             "people_num": "451",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/181/1714130938617.png",
          //             "tournament_name": "2018 LCK春季赛",
          //             "view_type": 1,
          //             "odds": "1.16"
          //           }
          //         ]
          //       },
          //       {
          //         "bet_group_id": "2981",
          //         "bet_group_follow_id": "4573",
          //         "title": "。。。",
          //         "is_private": "0",
          //         "is_main": "0",
          //         "add_time": "2017-10-11 18:40",
          //         "member_avatar": "https://img1.famulei.com/m/5642843/p/179/0722020865020_100x100.jpg",
          //         "member_nickname": "conbory",
          //         "right_count": "8",
          //         "wrong_count": "2",
          //         "unknown_count": "0",
          //         "reward_double": "1.5",
          //         "net_profit": "1",
          //         "total_profit": "1",
          //         "cache_key": "1507718417013",
          //         "content": "",
          //         "status": "1",
          //         "status_txt": "已结算",
          //         "bet_items": [
          //           {
          //             "id": "2763560",
          //             "member_id": "5642843",
          //             "add_time": "1507567502",
          //             "price": "10",
          //             "bet_id": "4294",
          //             "bet_item_id": "9237",
          //             "ssdb_key": "5642843923715075675026272",
          //             "settlement_time": "1507787551",
          //             "refund_time": "0",
          //             "bet_group_id": "2981",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "11",
          //             "status": "3",
          //             "bet_end_time": "1507784400",
          //             "result_item_id": "9237",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "LZ胜",
          //             "match_date": "17/10/12",
          //             "match_time": "13:00:00",
          //             "match_team_a": "KZ",
          //             "match_team_b": "FNC",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/181/0910595152991_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/1612/2915515038329_100X100.png",
          //             "result_item_string": "LZ胜",
          //             "total_price": "393k",
          //             "people_num": "4134",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.08"
          //           },
          //           {
          //             "id": "2763561",
          //             "member_id": "5642843",
          //             "add_time": "1507567502",
          //             "price": "10",
          //             "bet_id": "4296",
          //             "bet_item_id": "9242",
          //             "ssdb_key": "5642843924215075675027945",
          //             "settlement_time": "1507823083",
          //             "refund_time": "0",
          //             "bet_group_id": "2981",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "11",
          //             "status": "3",
          //             "bet_end_time": "1507791600",
          //             "result_item_id": "9242",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "LZ胜",
          //             "match_date": "17/10/12",
          //             "match_time": "15:00:00",
          //             "match_team_a": "GAM",
          //             "match_team_b": "KZ",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/174/2114523592694_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/181/0910595152991_100X100.png",
          //             "result_item_string": "LZ胜",
          //             "total_price": "294k",
          //             "people_num": "2324",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.10"
          //           },
          //           {
          //             "id": "2763562",
          //             "member_id": "5642843",
          //             "add_time": "1507567502",
          //             "price": "10",
          //             "bet_id": "4298",
          //             "bet_item_id": "9246",
          //             "ssdb_key": "5642843924615075675029687",
          //             "settlement_time": "1507823164",
          //             "refund_time": "0",
          //             "bet_group_id": "2981",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "11",
          //             "status": "3",
          //             "bet_end_time": "1507798800",
          //             "result_item_id": "9246",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "LZ胜",
          //             "match_date": "17/10/12",
          //             "match_time": "17:00:00",
          //             "match_team_a": "IMT",
          //             "match_team_b": "KZ",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/1612/2915520666951_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/181/0910595152991_100X100.png",
          //             "result_item_string": "LZ胜",
          //             "total_price": "228k",
          //             "people_num": "1584",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.08"
          //           },
          //           {
          //             "id": "2763564",
          //             "member_id": "5642843",
          //             "add_time": "1507567502",
          //             "price": "10",
          //             "bet_id": "4299",
          //             "bet_item_id": "9248",
          //             "ssdb_key": "5642843924815075675025161",
          //             "settlement_time": "0",
          //             "refund_time": "0",
          //             "bet_group_id": "2981",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "0",
          //             "status": "3",
          //             "bet_end_time": "1507867200",
          //             "result_item_id": "9247",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "RNG胜",
          //             "match_date": "17/10/13",
          //             "match_time": "12:00:00",
          //             "match_team_a": "G2",
          //             "match_team_b": "RNG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/1612/2915402013103_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0411152029924_100X100.png",
          //             "result_item_string": "G2胜",
          //             "total_price": "394k",
          //             "people_num": "4231",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.20"
          //           },
          //           {
          //             "id": "2763565",
          //             "member_id": "5642843",
          //             "add_time": "1507567502",
          //             "price": "10",
          //             "bet_id": "4300",
          //             "bet_item_id": "9249",
          //             "ssdb_key": "5642843924915075675026585",
          //             "settlement_time": "1507893579",
          //             "refund_time": "0",
          //             "bet_group_id": "2981",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "12",
          //             "status": "3",
          //             "bet_end_time": "1507870800",
          //             "result_item_id": "9249",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "SSG胜",
          //             "match_date": "17/10/13",
          //             "match_time": "13:00:00",
          //             "match_team_a": "SSG",
          //             "match_team_b": "FB",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/1612/2915393439140_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/179/1218441576895_100X100.png",
          //             "result_item_string": "SSG胜",
          //             "total_price": "233k",
          //             "people_num": "2007",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.13"
          //           },
          //           {
          //             "id": "2763566",
          //             "member_id": "5642843",
          //             "add_time": "1507567502",
          //             "price": "10",
          //             "bet_id": "4301",
          //             "bet_item_id": "9251",
          //             "ssdb_key": "5642843925115075675027617",
          //             "settlement_time": "1507893629",
          //             "refund_time": "0",
          //             "bet_group_id": "2981",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "15",
          //             "status": "3",
          //             "bet_end_time": "1507874400",
          //             "result_item_id": "9251",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "SSG胜",
          //             "match_date": "17/10/13",
          //             "match_time": "14:00:00",
          //             "match_team_a": "SSG",
          //             "match_team_b": "G2",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/1612/2915393439140_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/1612/2915402013103_100X100.png",
          //             "result_item_string": "SSG胜",
          //             "total_price": "175k",
          //             "people_num": "1437",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.42"
          //           },
          //           {
          //             "id": "2763567",
          //             "member_id": "5642843",
          //             "add_time": "1507567502",
          //             "price": "10",
          //             "bet_id": "4302",
          //             "bet_item_id": "9254",
          //             "ssdb_key": "5642843925415075675026955",
          //             "settlement_time": "1507893677",
          //             "refund_time": "0",
          //             "bet_group_id": "2981",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "12",
          //             "status": "3",
          //             "bet_end_time": "1507878000",
          //             "result_item_id": "9254",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "RNG胜",
          //             "match_date": "17/10/13",
          //             "match_time": "15:00:00",
          //             "match_team_a": "FB",
          //             "match_team_b": "RNG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/179/1218441576895_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0411152029924_100X100.png",
          //             "result_item_string": "RNG胜",
          //             "total_price": "244k",
          //             "people_num": "2232",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.12"
          //           },
          //           {
          //             "id": "2763568",
          //             "member_id": "5642843",
          //             "add_time": "1507567502",
          //             "price": "10",
          //             "bet_id": "4304",
          //             "bet_item_id": "9257",
          //             "ssdb_key": "5642843925715075675028687",
          //             "settlement_time": "1507893764",
          //             "refund_time": "0",
          //             "bet_group_id": "2981",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "17",
          //             "status": "3",
          //             "bet_end_time": "1507885200",
          //             "result_item_id": "9257",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "RNG胜",
          //             "match_date": "17/10/13",
          //             "match_time": "17:00:00",
          //             "match_team_a": "RNG",
          //             "match_team_b": "SSG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/0411152029924_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/1612/2915393439140_100X100.png",
          //             "result_item_string": "RNG胜",
          //             "total_price": "268k",
          //             "people_num": "2272",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.69"
          //           },
          //           {
          //             "id": "2763569",
          //             "member_id": "5642843",
          //             "add_time": "1507567502",
          //             "price": "10",
          //             "bet_id": "4307",
          //             "bet_item_id": "9264",
          //             "ssdb_key": "5642843926415075675028387",
          //             "settlement_time": "1508039436",
          //             "refund_time": "0",
          //             "bet_group_id": "2981",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "12",
          //             "status": "3",
          //             "bet_end_time": "1507960800",
          //             "result_item_id": "9264",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "WE胜",
          //             "match_date": "17/10/14",
          //             "match_time": "14:00:00",
          //             "match_team_a": "FW",
          //             "match_team_b": "WE",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/1612/2915395771568_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0417191173302_100X100.png",
          //             "result_item_string": "WE胜",
          //             "total_price": "436k",
          //             "people_num": "3772",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.16"
          //           },
          //           {
          //             "id": "2763563",
          //             "member_id": "5642843",
          //             "add_time": "1507567502",
          //             "price": "10",
          //             "bet_id": "4311",
          //             "bet_item_id": "9272",
          //             "ssdb_key": "5642843927215075675023861",
          //             "settlement_time": "0",
          //             "refund_time": "0",
          //             "bet_group_id": "2981",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "0",
          //             "status": "3",
          //             "bet_end_time": "1508040000",
          //             "result_item_id": "9271",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "SKT胜",
          //             "match_date": "17/10/15",
          //             "match_time": "12:00:00",
          //             "match_team_a": "AHQ",
          //             "match_team_b": "SKT",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/1612/2915394963675_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/1612/2915392771536_100X100.png",
          //             "result_item_string": "AHQ胜",
          //             "total_price": "367k",
          //             "people_num": "3088",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.08"
          //           }
          //         ]
          //       },
          //       {
          //         "bet_group_id": "2955",
          //         "bet_group_follow_id": "4572",
          //         "title": "为lpl打call助威",
          //         "is_private": "0",
          //         "is_main": "0",
          //         "add_time": "2017-10-11 18:39",
          //         "member_avatar": "https://img1.famulei.com/z/3193833/p/185/2413130321094_100x100.jpg",
          //         "member_nickname": "丄偙De眼泪",
          //         "right_count": "8",
          //         "wrong_count": "1",
          //         "unknown_count": "0",
          //         "reward_double": "1.4",
          //         "net_profit": "9",
          //         "total_profit": "9",
          //         "cache_key": "1507718366027",
          //         "content": "主要是we(⁎⁍̴̛ᴗ⁍̴̛⁎)",
          //         "status": "1",
          //         "status_txt": "已结算",
          //         "bet_items": [
          //           {
          //             "id": "2757025",
          //             "member_id": "3193833",
          //             "add_time": "1507496701",
          //             "price": "10",
          //             "bet_id": "4294",
          //             "bet_item_id": "9237",
          //             "ssdb_key": "3193833923715074967013855",
          //             "settlement_time": "1507787592",
          //             "refund_time": "0",
          //             "bet_group_id": "2955",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "11",
          //             "status": "3",
          //             "bet_end_time": "1507784400",
          //             "result_item_id": "9237",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "LZ胜",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "17/10/12",
          //             "match_time": "13:00:00",
          //             "match_team_a": "KZ",
          //             "match_team_b": "FNC",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/181/0910595152991_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/1612/2915515038329_100X100.png",
          //             "result_item_string": "LZ胜",
          //             "total_price": "393k",
          //             "people_num": "4134",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.08"
          //           },
          //           {
          //             "id": "2757026",
          //             "member_id": "3193833",
          //             "add_time": "1507496701",
          //             "price": "10",
          //             "bet_id": "4296",
          //             "bet_item_id": "9242",
          //             "ssdb_key": "3193833924215074967011656",
          //             "settlement_time": "1507823108",
          //             "refund_time": "0",
          //             "bet_group_id": "2955",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "11",
          //             "status": "3",
          //             "bet_end_time": "1507791600",
          //             "result_item_id": "9242",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "LZ胜",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "17/10/12",
          //             "match_time": "15:00:00",
          //             "match_team_a": "GAM",
          //             "match_team_b": "KZ",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/174/2114523592694_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/181/0910595152991_100X100.png",
          //             "result_item_string": "LZ胜",
          //             "total_price": "294k",
          //             "people_num": "2324",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.10"
          //           },
          //           {
          //             "id": "2757027",
          //             "member_id": "3193833",
          //             "add_time": "1507496701",
          //             "price": "10",
          //             "bet_id": "4298",
          //             "bet_item_id": "9246",
          //             "ssdb_key": "3193833924615074967014257",
          //             "settlement_time": "1507823181",
          //             "refund_time": "0",
          //             "bet_group_id": "2955",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "11",
          //             "status": "3",
          //             "bet_end_time": "1507798800",
          //             "result_item_id": "9246",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "LZ胜",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "17/10/12",
          //             "match_time": "17:00:00",
          //             "match_team_a": "IMT",
          //             "match_team_b": "KZ",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/1612/2915520666951_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/2985229/p/181/0910595152991_100X100.png",
          //             "result_item_string": "LZ胜",
          //             "total_price": "228k",
          //             "people_num": "1584",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.08"
          //           },
          //           {
          //             "id": "2757028",
          //             "member_id": "3193833",
          //             "add_time": "1507496701",
          //             "price": "10",
          //             "bet_id": "4299",
          //             "bet_item_id": "9248",
          //             "ssdb_key": "3193833924815074967018443",
          //             "settlement_time": "0",
          //             "refund_time": "0",
          //             "bet_group_id": "2955",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "0",
          //             "status": "3",
          //             "bet_end_time": "1507867200",
          //             "result_item_id": "9247",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "RNG胜",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "17/10/13",
          //             "match_time": "12:00:00",
          //             "match_team_a": "G2",
          //             "match_team_b": "RNG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/1612/2915402013103_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0411152029924_100X100.png",
          //             "result_item_string": "G2胜",
          //             "total_price": "394k",
          //             "people_num": "4231",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.20"
          //           },
          //           {
          //             "id": "2757029",
          //             "member_id": "3193833",
          //             "add_time": "1507496701",
          //             "price": "10",
          //             "bet_id": "4302",
          //             "bet_item_id": "9254",
          //             "ssdb_key": "3193833925415074967014377",
          //             "settlement_time": "1507893702",
          //             "refund_time": "0",
          //             "bet_group_id": "2955",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "12",
          //             "status": "3",
          //             "bet_end_time": "1507878000",
          //             "result_item_id": "9254",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "RNG胜",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "17/10/13",
          //             "match_time": "15:00:00",
          //             "match_team_a": "FB",
          //             "match_team_b": "RNG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/179/1218441576895_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0411152029924_100X100.png",
          //             "result_item_string": "RNG胜",
          //             "total_price": "244k",
          //             "people_num": "2232",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.12"
          //           },
          //           {
          //             "id": "2757033",
          //             "member_id": "3193833",
          //             "add_time": "1507496701",
          //             "price": "10",
          //             "bet_id": "4304",
          //             "bet_item_id": "9257",
          //             "ssdb_key": "3193833925715074967015092",
          //             "settlement_time": "1507893784",
          //             "refund_time": "0",
          //             "bet_group_id": "2955",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "17",
          //             "status": "3",
          //             "bet_end_time": "1507885200",
          //             "result_item_id": "9257",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "RNG胜",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "17/10/13",
          //             "match_time": "17:00:00",
          //             "match_team_a": "RNG",
          //             "match_team_b": "SSG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/0411152029924_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/1612/2915393439140_100X100.png",
          //             "result_item_string": "RNG胜",
          //             "total_price": "268k",
          //             "people_num": "2272",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.69"
          //           },
          //           {
          //             "id": "2757030",
          //             "member_id": "3193833",
          //             "add_time": "1507496701",
          //             "price": "10",
          //             "bet_id": "4306",
          //             "bet_item_id": "9261",
          //             "ssdb_key": "3193833926115074967013599",
          //             "settlement_time": "1508039361",
          //             "refund_time": "0",
          //             "bet_group_id": "2955",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "13",
          //             "status": "3",
          //             "bet_end_time": "1507957200",
          //             "result_item_id": "9261",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "WE胜",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "17/10/14",
          //             "match_time": "13:00:00",
          //             "match_team_a": "WE",
          //             "match_team_b": "TSM",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/0417191173302_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/173/0917435348351_100X100.png",
          //             "result_item_string": "WE胜",
          //             "total_price": "594k",
          //             "people_num": "5237",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.22"
          //           },
          //           {
          //             "id": "2757031",
          //             "member_id": "3193833",
          //             "add_time": "1507496701",
          //             "price": "10",
          //             "bet_id": "4307",
          //             "bet_item_id": "9264",
          //             "ssdb_key": "3193833926415074967013739",
          //             "settlement_time": "1508039477",
          //             "refund_time": "0",
          //             "bet_group_id": "2955",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "12",
          //             "status": "3",
          //             "bet_end_time": "1507960800",
          //             "result_item_id": "9264",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "WE胜",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "17/10/14",
          //             "match_time": "14:00:00",
          //             "match_team_a": "FW",
          //             "match_team_b": "WE",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/1612/2915395771568_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0417191173302_100X100.png",
          //             "result_item_string": "WE胜",
          //             "total_price": "436k",
          //             "people_num": "3772",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.16"
          //           },
          //           {
          //             "id": "2757032",
          //             "member_id": "3193833",
          //             "add_time": "1507496701",
          //             "price": "10",
          //             "bet_id": "4310",
          //             "bet_item_id": "9270",
          //             "ssdb_key": "3193833927015074967014969",
          //             "settlement_time": "1508039628",
          //             "refund_time": "0",
          //             "bet_group_id": "2955",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "12",
          //             "status": "3",
          //             "bet_end_time": "1507971600",
          //             "result_item_id": "9270",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "WE胜",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "17/10/14",
          //             "match_time": "17:00:00",
          //             "match_team_a": "MSF",
          //             "match_team_b": "WE",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/1114213190985_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0417191173302_100X100.png",
          //             "result_item_string": "WE胜",
          //             "total_price": "468k",
          //             "people_num": "3759",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.14"
          //           }
          //         ]
          //       },
          //       {
          //         "bet_group_id": "2965",
          //         "bet_group_follow_id": "4571",
          //         "title": "LPL必胜",
          //         "is_private": "0",
          //         "is_main": "0",
          //         "add_time": "2017-10-11 18:38",
          //         "member_avatar": "",
          //         "member_nickname": "Tangent",
          //         "right_count": "5",
          //         "wrong_count": "1",
          //         "unknown_count": "0",
          //         "reward_double": "1.1",
          //         "net_profit": "6",
          //         "total_profit": "6",
          //         "cache_key": "1507718336063",
          //         "content": "LPL必胜",
          //         "status": "1",
          //         "status_txt": "已结算",
          //         "bet_items": [
          //           {
          //             "id": "2758985",
          //             "member_id": "5662862",
          //             "add_time": "1507521301",
          //             "price": "10",
          //             "bet_id": "4299",
          //             "bet_item_id": "9248",
          //             "ssdb_key": "5662862924815075213012975",
          //             "settlement_time": "0",
          //             "refund_time": "0",
          //             "bet_group_id": "2965",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "0",
          //             "status": "3",
          //             "bet_end_time": "1507867200",
          //             "result_item_id": "9247",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "RNG胜",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "17/10/13",
          //             "match_time": "12:00:00",
          //             "match_team_a": "G2",
          //             "match_team_b": "RNG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/1612/2915402013103_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0411152029924_100X100.png",
          //             "result_item_string": "G2胜",
          //             "total_price": "394k",
          //             "people_num": "4231",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.20"
          //           },
          //           {
          //             "id": "2758986",
          //             "member_id": "5662862",
          //             "add_time": "1507521301",
          //             "price": "10",
          //             "bet_id": "4302",
          //             "bet_item_id": "9254",
          //             "ssdb_key": "5662862925415075213013246",
          //             "settlement_time": "1507893663",
          //             "refund_time": "0",
          //             "bet_group_id": "2965",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "12",
          //             "status": "3",
          //             "bet_end_time": "1507878000",
          //             "result_item_id": "9254",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "RNG胜",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "17/10/13",
          //             "match_time": "15:00:00",
          //             "match_team_a": "FB",
          //             "match_team_b": "RNG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/2985229/p/179/1218441576895_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0411152029924_100X100.png",
          //             "result_item_string": "RNG胜",
          //             "total_price": "244k",
          //             "people_num": "2232",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.12"
          //           },
          //           {
          //             "id": "2758984",
          //             "member_id": "5662862",
          //             "add_time": "1507521301",
          //             "price": "10",
          //             "bet_id": "4304",
          //             "bet_item_id": "9257",
          //             "ssdb_key": "5662862925715075213017710",
          //             "settlement_time": "1507893752",
          //             "refund_time": "0",
          //             "bet_group_id": "2965",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "17",
          //             "status": "3",
          //             "bet_end_time": "1507885200",
          //             "result_item_id": "9257",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "RNG胜",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "17/10/13",
          //             "match_time": "17:00:00",
          //             "match_team_a": "RNG",
          //             "match_team_b": "SSG",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/0411152029924_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/1612/2915393439140_100X100.png",
          //             "result_item_string": "RNG胜",
          //             "total_price": "268k",
          //             "people_num": "2272",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.69"
          //           },
          //           {
          //             "id": "2758987",
          //             "member_id": "5662862",
          //             "add_time": "1507521301",
          //             "price": "10",
          //             "bet_id": "4306",
          //             "bet_item_id": "9261",
          //             "ssdb_key": "5662862926115075213014202",
          //             "settlement_time": "1508039284",
          //             "refund_time": "0",
          //             "bet_group_id": "2965",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "13",
          //             "status": "3",
          //             "bet_end_time": "1507957200",
          //             "result_item_id": "9261",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "WE胜",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "17/10/14",
          //             "match_time": "13:00:00",
          //             "match_team_a": "WE",
          //             "match_team_b": "TSM",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/0417191173302_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/173/0917435348351_100X100.png",
          //             "result_item_string": "WE胜",
          //             "total_price": "594k",
          //             "people_num": "5237",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.22"
          //           },
          //           {
          //             "id": "2758988",
          //             "member_id": "5662862",
          //             "add_time": "1507521301",
          //             "price": "10",
          //             "bet_id": "4307",
          //             "bet_item_id": "9264",
          //             "ssdb_key": "5662862926415075213011971",
          //             "settlement_time": "1508039413",
          //             "refund_time": "0",
          //             "bet_group_id": "2965",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "12",
          //             "status": "3",
          //             "bet_end_time": "1507960800",
          //             "result_item_id": "9264",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "WE胜",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "17/10/14",
          //             "match_time": "14:00:00",
          //             "match_team_a": "FW",
          //             "match_team_b": "WE",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/1612/2915395771568_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0417191173302_100X100.png",
          //             "result_item_string": "WE胜",
          //             "total_price": "436k",
          //             "people_num": "3772",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.16"
          //           },
          //           {
          //             "id": "2758989",
          //             "member_id": "5662862",
          //             "add_time": "1507521301",
          //             "price": "10",
          //             "bet_id": "4310",
          //             "bet_item_id": "9270",
          //             "ssdb_key": "5662862927015075213019973",
          //             "settlement_time": "1508039568",
          //             "refund_time": "0",
          //             "bet_group_id": "2965",
          //             "bet_group_follow_id": "0",
          //             "profit_price": "12",
          //             "status": "3",
          //             "bet_end_time": "1507971600",
          //             "result_item_id": "9270",
          //             "title": "谁会赢得比赛的胜利？",
          //             "item_name": "WE胜",
          //             "title_en": "",
          //             "title_tw": "",
          //             "item_name_en": "",
          //             "item_name_tw": "",
          //             "match_date": "17/10/14",
          //             "match_time": "17:00:00",
          //             "match_team_a": "MSF",
          //             "match_team_b": "WE",
          //             "team_image_thumb_a": "https://img1.famulei.com/z/0/p/171/1114213190985_100X100.png",
          //             "team_image_thumb_b": "https://img1.famulei.com/z/0/p/171/0417191173302_100X100.png",
          //             "result_item_string": "WE胜",
          //             "total_price": "468k",
          //             "people_num": "3759",
          //             "tournament_image": "https://img1.famulei.com/z/2985229/p/179/1412052195548.jpg",
          //             "tournament_name": "S7世界总决赛",
          //             "view_type": 1,
          //             "odds": "1.14"
          //           }
          //         ]
          //       }
          //     ]
          //   },
          //   "task_data": {
          //
          //   },
          //   "badge": [
          //
          //   ],
          //   "event": [
          //
          //   ]
          // };
          console.log('-----------我的组合菠菜列表--------------');
          if (res.code == '200') {
            this.myBetGroupList = this.groupParams.cache_key == '' ? res.data.list || [] : this.myBetGroupList.concat(res.data.list);
            if (this.myBetGroupList.length != 0 && res.data.list.length != 0 ) this.isLoadMoreLock = true;
          } else {
            this.$Message.warning(res.message);
          }

        }

      },
      // 我的战绩
      async memberRecord(){
        var weekRecord = {
          "position": "--",
          "member_id": "3059029",
          "profit": "0",
          "win_num": "0",
          "record_ratio": "0/0",
          "win_times": "0",
          "total_times": "0",
          "period": "2019.04.08~2019.04.14",
          "best_bet": [

          ]
        };
        var monthRecord = {
          "position": "",
          "member_id": 3059029,
          "profit": "-2",
          "win_num": "50%",
          "win_times": "2",
          "total_times": "4",
          "record_ratio": "2/4",
          "period": "2019.04.01~04.30",
          "best_bet": [
            {
              "select_item_id": "16580",
              "bet_profit": "7",
              "result_id": "16580",
              "title": "第一局谁先推掉一血塔",
              "items": [
                {
                  "bet_item_id": "16580",
                  "item_name": "SB",
                  "odds": "1.67"
                },
                {
                  "bet_item_id": "16581",
                  "item_name": "DWG",
                  "odds": "2.20"
                }
              ]
            }
          ]
        };
        var totalRecord = {
          "position": "",
          "member_id": 3059029,
          "profit": "-308",
          "win_num": "60%",
          "win_times": "117",
          "total_times": "194",
          "record_ratio": "117/194",
          "period": "2016.01.05~04.12",
          "best_bet": [
            {
              "select_item_id": "8292",
              "bet_profit": "55",
              "result_id": "8292",
              "title": "你觉得这场比赛谁会获胜？",
              "items": [
                {
                  "bet_item_id": "8292",
                  "item_name": "M17胜",
                  "odds": "6.48"
                },
                {
                  "bet_item_id": "8293",
                  "item_name": "OMG胜",
                  "odds": "1.14"
                }
              ]
            }
          ]
        };

        this.myRecordArray[0].record = weekRecord;
        this.myRecordArray[1].record = monthRecord;
        this.myRecordArray[2].record = totalRecord;

        console.log(this.myRecordArray);
        // let res = await this.$api.member.getMemberRecord();
        // console.log(res);
        // if (res.code == '200') {
        //   this.myRecordArray[0].record = res.data.weekRecord;
        //   this.myRecordArray[1].record = res.data.monthRecord;
        //   this.myRecordArray[2].record = res.data.totalRecord;
        // } else {
        //   this.$Message.warning(res.message);
        // }
      },
      tabsNav(index){
        this.tabsNavCurr = index;
        this.myBetRecordBlock = this.tabsNavCurr == 0 ? true : false;
        if (this.tabsNavCurr == 1) this.memberRecord();
      },

      getThemeItemValue(val){  // 选择类目
        if (val.value == 0 ){
          this.singleParams.start_id = '';
          this.myBetSingleListBlock = true;
        } else {
          this.groupParams.cache_key = '';
          this.myBetSingleListBlock = false;
        }
        this.selectList.theme_cur.name = val.label;
        this.selectList.sub_cur.code = 0;
        this.getData();
      },
      getSubItemValue(val){  // 选择状态
        this.selectList.theme_cur.name = val.label;
        this.getData();
      },
      memberRecordBtn(id){
        this.bestBet = this.myRecordArray[id].record.best_bet[0];
        this.isModal = true;
        console.log(this.bestBet);
      },
      ok () {
        // this.$Message.info('点击了确定');
      },
      cancel () {
        // this.$Message.info('点击了取消');
      }
    }
  }
</script>

<style lang="stylus"  scoped>

  .bet-main-wrap {
    padding-top 30px
    width 100%
    display flex
    flex-wrap wrap
    justify-content space-between

    .left-wrap {
      width calc(100% - 400px)

      /*.tabs-nav,.bet-match-nav,.bet-groups-nav{
        width: 100%;
      }*/

      .tabs-nav{
        width: 100%;
        margin-bottom: 20px;
        border: 1px solid #ebebec;

        >.bet_tabs_nav {
          >ul {
            overflow hidden

            >li{
              width: 50%;
              height:50px;
              border-top:2px solid #E6E8ED;

              &.active{
                background: #fff;
                border-top:2px solid #5F6575;

                a{
                  color:#5F6575;
                  opacity: 1;
                  font-weight:bold;
                  background: #fff
                }
              }

              a{
                display: block;
                text-align: center;
                width: 100%;
                line-height:50px;
                opacity: 0.5;
                font-size: 16px;
                color: #5F6575;
                background: #F9FAFB;

              }
            }
          }
        }


      }
    }

    .right-wrap {
      width 390px
    }

  }


  .bet_single_title{
    background: #23252B;
    border: 1px solid #2B2D33;
    overflow: hidden;
    height:50px;
    line-height:50px;
    overflow: hidden;
  }
  .bet_single_title label{
    width:26px;
    height:26px;
    margin:12px 0 0 10px;
    vertical-align:middle;
    overflow: hidden;
    cursor: pointer;
  }

  .bet_single_title .track{
    width: auto;
    height:18px;
    margin:16px 0 16px 10px;
    line-height: 18px;
    padding:0 5px;
    background: #FF5C5C;
    border-radius: 4px;
    color:#fff;
    cursor: default;
  }

  .bet_single_title label img{
    width: 100%;
    display: block;
  }
  .bet_single_title p{
    font-size:16px;
    padding-left:15px;
    /*font-weight: bold;*/
    color:#fff;
    cursor: pointer;
  }
  .bet_single_title p.group_title{
    cursor: default;
  }
  .bet_single_title .games{
    display: block;
    width: 18px;
    height:18px;
    line-height:18px;
    text-align: center;
    margin-top:16px;
    margin-left:10px;
    border-radius: 6px;
    background: #5F6575;
    color:#fff;
  }
  .bet_single_title .multiple{
    color:#97999F;
  }
  .multiple .icon{
    margin-right:20px;
  }

  .bet_single_title .multiple label{
    display: inline-block;
    width: auto;
    height:24px;
    margin:13px 10px;
    line-height: 24px;
    padding:0 5px;
    background: #FFDF79;
    /*border: 1px solid #FFD651;*/
    border-radius: 4px;
    color:#945800;
    text-align: center;
    cursor: default;
  }
  .bet_single_title .multiple label span{
    font-weight: bold;
  }
  /*竞猜记录*/
  .quiz_tabs_nav{
    padding:20px 4%;
    background: #fff;
    overflow: hidden;
  }

  .quiz_tabs_nav select{
    /*清除默认样式*/
    border:0;
    outline:none;
    appearance:none;
    -moz-appearance:none;
    -webkit-appearance:none;

    width: 13.5%;
    line-height: 36px;
    background: #F3F3F4;
    border-radius: 10px;
    color: #626368;
    padding:0 10px;
    margin-right:20px;
    background: url("//ourjs.github.io/static/2015/arrow.png") no-repeat scroll right center #F3F3F4;
  }

  .quiz_tabs_nav select option{
    line-height: 40px;
  }

  .quiz_tabs_nav div p{
    line-height:36px;
  }
  .quiz_tabs_nav div p span{
    font-size: 12px;
    color: #8C6600;;
  }
  .quiz_tabs_nav div p .icon{
    margin-left:10px;
  }

  .quiz_single_list,.quiz_group_list{
    border-left:1px solid #EBEBEC;
    border-right:1px solid #EBEBEC;
    background: #F9FAFB;
  }

  .quiz_group{
    border-top:1px solid #EBEBEC;
    border-bottom:1px solid #EBEBEC;
    background: #fff;
  }

  .quiz_group p{
    font-size: 16px;
    color: #5F6575;
  }

  .bet_single_title>.blue{
    background: #07A3F4;
  }
  .quiz_group .track strong{
    color:#fff;
  }
  .quiz_white{
    background: #fff;
    border:0;
  }

  .quiz_group .clan{
    overflow: hidden;
    margin-left:10px;
  }
  .quiz_group .clan p{
    margin:0 10px;
    text-align: center;
    padding-left:0;
  }
  .quiz_group .clan label{
    margin:12px 0;
    padding:0;
    width: 28px;
    height:28px;
    overflow: hidden;
  }
  /*.quiz_group .clan label img{
      width: 100%;
      display: block;
  }*/
  .quiz_group_dec{
    padding:0 20px;
    overflow: hidden;
    border-top:1px solid #EBEBEC;
    background: #fff;
    padding-top:20px;
  }

  .quiz_group_dec_title{
    line-height:40px;
    overflow: hidden;
    padding:0 30px;
  }
  .quiz_group_dec_title p{
    font-size:15px;
  }
  .quiz_group_dec_title p span{
    font-size:13px;
    font-weight:bold;
    color: #FFB332;
  }
  .quiz_group_dec_detail{
    padding-bottom:20px;
  }
  .detail_row{
    display:table-row;
    line-height:30px;
    font-size:13px;
    /*background:#F9FAFB;*/
  }
  .detail_row:nth-child(2n+1){
    background:#F9FAFB;
  }

  .detail_cell{
    display:table-cell;
    width:4%;
    padding-left:30px ;
  }
  .detail_row:first-Child div{
    font-weight:bold;
  }

  .detail_cell .icon{
    margin-left:5px;
  }

  .group_button{
    display: inline-block;
    background: #11ABFB;
    border-radius: 4px;
    font-size:12px;
    line-height: 18px;
    color:#fff;
    padding:0 5px;
  }

  .quiz_group_end{
    color:#4990E2;
  }

  .fruit_color{
    color:#8C6600;
  }

  .quiz_group_close{
    color:#FF5C5C;
    background: #FFF2F2;
  }
  .quiz_group_close_red{
    color:#FF5C5C;
  }
  .quiz_group_list .bet_together_regular_dec{
    border:0;
    border-top:1px solid #EBEBEc;
  }

  .quiz_group_list .quiz_group_dec{
    padding-top:20px;
  }
  .quiz_group_list .bet_together_regular_dec .center p.title{
    color:#5F6575;
  }
  .quiz_group_list .bet_together_regular_dec .center p.dec{
    font-size:14px;
  }
  /*.quiz_group .bet_single_title>p{
      margin-left:5px;
  }*/
  .quiz_group .bet_single_title .multiple{
    margin-right:30px;
    font-size:13px;


  }


  .quiz_single_footer{
    padding: 20px 25px 20px;
    background: #F9FAFB;
    overflow: hidden;
    margin-bottom:80px;
    border:1px solid #EBEBEc;
    border-top:0;
  }
  .quiz_single_footer p{
    background: #F3F3F4;
    text-align: center;
    height:30px;
    line-height: 30px;
    border-radius: 4px;
    font-size: 14px;
    color: #A5A8B2;
  }
  .quiz_group_footer p{
    padding:0 30px;
    line-height: 36px;
    background: #FFEB79;
    border: 1px solid #FFE23B;
    border-radius: 8px;
    font-size: 14px;
    color: #917359;
    font-weight: bold;
    cursor: pointer;
  }
  .quiz_group_footer .bj_gray{
    background: #989ca5;
    border: 1px solid #989ca5;
    color:#fff;
  }
  .quiz_group_footer .dec{
    overflow: hidden;
    line-height: 36px;
    margin-bottom:20px;
  }

  .quiz_group_footer .dec div{
    display: inline-block;
    padding-right:20px;
  }

  .quiz_group_footer .multiple label{
    display: inline-block;
    width: auto;
    height:24px;
    margin:6px 10px;
    line-height: 24px;
    padding:0 5px;
    background: #FFDF79;
    /*border: 1px solid #FFD651;*/
    border-radius: 4px;
    color:#945800;
  }

  .quiz_group_footer .multiple label span{
    font-weight: bold;
  }
  .quiz_group_footer .multiple .icon{
    margin:0;
    margin-left:5px;
  }

  .bet_together_regular_dec{
    overflow: hidden;
    background-image: linear-gradient(-225deg, #F9FAFB 0%, #F5F5F6 100%);
    border-right:1px solid #EBEBEC;
    border-left:1px solid #EBEBEC;
    padding:45px 0 35px;
  }
  .bet_together_regular_dec .left{
    width: 15%;
  }
  .bet_together_regular_dec .avatar{
    display: block;
    width: 70px;
    height:70px;
    border-radius: 50%;
    border:1px solid #EBEBEC;
    overflow: hidden;
    margin-left:30%;
  }
  .bet_together_regular_dec .avatar img{
    width: 100%;
  }
  .bet_together_regular_dec .center{
    width: 45%;
  }
  .bet_together_regular_dec .center p{
    text-align: left;
    color:#97999F;
  }
  .bet_together_regular_dec .title{
    font-size: 16px;
    color: #5F6575;
    font-weight: bold;
    margin-bottom:10px;
  }

  .bet_together_regular_dec .right{
    width: 40%;
    position: relative;
  }
  .bet_together_regular_dec .right>p{
    position: absolute;
    top:68px;
    right:88px;
  }

  .bet_together_regular_dec .right_or_wrong{
    overflow: hidden;
    margin-left:50%;
  }
  .bet_together_regular_dec .right_or_wrong div{
    width: 40px;
    line-height: 30px;
  }
  .bet_together_regular_dec .right_or_wrong div p{
    text-align: center;
  }

  .bet_together_regular_dec .right_or_wrong div p:first-Child{
    font-weight: bold;
    font-size:24px;
  }
  .bet_together_regular_dec .right_or_wrong .blue p{
    color:#4990E2;
  }
  .bet_together_regular_dec .right_or_wrong .light_gray p{
    color:#A5A8B2;
  }
  .bet_together_regular_dec .right_or_wrong .gray p{
    color:#5F6575;
  }

  /*我的竞猜*/
  .my_quiz_writer{
    background: #fff;
    padding:30px 4%;
  }
  .my_quiz_writer p{
    line-height: 22px;
  }
  .my_quiz_list{

  }
  .my_quiz_group{
    background: #FCFCFD;
    border: 1px solid rgba(235,235,236,0.60);
  }
  .my_quiz_title{
    background: #fff;
    height:40px;
    line-height:40px;
    border-bottom: 1px solid #EBEBEC;
  }

  .my_quiz_title p span{
    line-height: 20px;
    background: #4990E2;
    border-radius: 4px;
    margin:0 20px;
    padding:0 10px;
    color:#fff;
    font-weight: bold;
  }
  .my_quiz_dec{
    padding:20px 4%;
    background: #FCFCFD;
    overflow: hidden;
  }
  .my_quiz_dec .scale{
    width: 27%;
    margin-top:10px;
    position: relative;
  }
  .my_quiz_chart{
    position: absolute;
    top:50%;
    left:50%;
    width: 180px;
    height:180px;
    transform: translate(-50%,-50%);
  }

  .quiz_list .doughnutSummaryNumber{
    font-size:18px;
    font-weight:bold;
  }
  .my_quiz_dec .scale .hit_rate{
    color:#626368;
    font-size:14px;
    position: absolute;
    left:50%;
    top:58%;
    opacity: 0.6;
    transform: translate(-50%,-42%);
  }
  .my_quiz_dec .results{
    width: 32%;
    overflow: hidden;
  }

  .my_quiz_dec .results .dec{
    width: 50%;
    text-align: center;
    padding:20px 0;
  }
  .my_quiz_dec .results .dec p:first-Child{
    font-size: 24px;
    color: #4990E2;
    font-weight: bold;
  }
  .my_quiz_dec .results .dec p:first-Child .slash{
    font-weight: normal;
    color:#A5A8B2;
  }
  .my_quiz_dec .results .dec p:first-Child .total{
    color:#5F6575;
  }
  .my_quiz_dec .results .dec p:first-Child.green{
    color:#30BF63;
  }
  .my_quiz_dec .results .dec p:first-Child.red{
    color:#FF5C5C;
  }
  .my_quiz_dec .profit{
    width: 40%;
    background: #FFFFFF;
    border: 1px solid rgba(235,235,236,0.60);
    border-radius: 2px;
  }

  .my_quiz_dec .profit .title{
    font-size: 14px;
    color: #5F6575;
    line-height: 40px;
    text-align: left;
    font-weight: bold;
    padding-left:20px;
    border-bottom: 1px solid #EBEBEC;
    /*border: 1px solid rgba(235,235,236,0.60);*/
    /*border-radius: 2px;*/
  }
  .my_quiz_dec .profit .title .icon{
    margin-right:20px;
    font-weight: normal;
    height: 40px;
    cursor: pointer;
  }

  .my_quiz_dec .profit .dec{
    padding:10px 10%;
  }

  .my_quiz_dec .profit .dec>p{
    text-align: center;
    line-height: 40px;
  }

  .match_right_result{ background-color: #fff; padding: 3% 5%; font-size:100%;}
  .result_data_all {
    position absolute
    left 30px

    .num {
      font-size 18px
      color #606060
      line-height 26px
      font-weight bold
    }
    .text {
      font-size 14px
      color #626368
      line-height 20px
    }
  }
  .result_data_circle{display: table-cell; width: 33.33%; padding-bottom: 1rem; position: relative; }
  .result_data_circle>p{ text-align: center; font-size:1.4em; color:#373a41; line-height:2rem; margin-top:130px; }

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

  .bet_together_detail .betting{
    cursor: default;
  }

  /*弹窗*/
  .group_body{
    padding:5px 0 20px;
  }
  .group_body .header{
    height:40px;
    overflow: hidden;
  }
  .group_body .header p{
    line-height: 40px;
    color:#5F6575;
  }
  .group_body .body{
    max-height: 450px;
    overflow-y: scroll;
  }
  .group_body .body .list{
    padding:10px 10px 10px 0;
  }
  .group_body .body .list p{
    font-size:14px;
  }
  .group_body .body .betting{
    cursor: default;
    overflow hidden
  }


</style>
