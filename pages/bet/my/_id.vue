<template>
  <div class="page-main">
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
          <div class="quiz_tabs_nav" v-if="myBetRecordBlock">
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
          <div class="quiz_tabs_nav" v-if="!myBetRecordBlock">
            <div>
              <p>{{update}}</p>
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
                <img :src="item.image ? item.image : '/images/tx_pic.jpg'">
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
                <!--{{ for(var key in it.bet_items){ }}-->
                <!--{{? it.bet_items[key].status == 2}}-->
                <!--<div class="detail_row quiz_group_close">-->
                <!--<div class="detail_cell">{{= it.bet_items[key].title}}</div>-->
                <!--<div class="detail_cell">{{= it.bet_items[key].item_name}}</div>-->
                <!--<div class="detail_cell">{{= it.bet_items[key].price}}<svg class="icon icon_size" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg></div>-->
                <!--<div class="detail_cell"><strong>已返还果子</strong></div>-->
                <!--</div>-->
                <!--{{?? it.bet_items[key].status == 1 || it.bet_items[key].status == 6 || it.bet_items[key].status == 4 || it.bet_items[key].status == 7}}-->
                <!--<div class="detail_row">-->
                <!--<div class="detail_cell">{{= it.bet_items[key].title}}</div>-->
                <!--<div class="detail_cell">{{= it.bet_items[key].item_name}}</div>-->
                <!--<div class="detail_cell fruit_color">{{= it.bet_items[key].price}}<svg class="icon icon_size" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg></div>-->
                <!--<div class="detail_cell">尚未结算</div>-->
                <!--</div>-->
                <!--{{??}}-->

                <!--<div class="detail_row {{? it.bet_items[key].result_item_id == it.bet_items[key].bet_item_id}} quiz_group_close_red {{?}}">-->
                <!--<div class="detail_cell">{{= it.bet_items[key].title}}</div>-->
                <!--<div class="detail_cell">{{= it.bet_items[key].item_name}}</div>-->
                <!--<div class="detail_cell fruit_color">{{= it.bet_items[key].price}}<svg class="icon icon_size" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg></div>-->
                <!--<div class="detail_cell">{{= it.bet_items[key].profit_price}}</div>-->
                <!--</div>-->
                <!--{{?}}-->
                <!--{{ } }}-->
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
               v-if="item.record && item.record.best_bet && item.record.best_bet.length > 0"
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
                    <p class="score fll">
                      <i class="icon iconfont">&#xe6d5;</i>
                      <span>{{ key.item_name}}</span>
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
        <svg class="icon" aria-hidden="true"><use xlink:href="#icon-jingcaijilu"></use></svg>
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
                <span>{{ item.item_name}}</span>
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
    name: "bet-my-id",
    components: {
      SlideList
    },
    data(){
      return {
        tabsNavCurr: this.$route.params.id ? 1 : 0, // tab 切换
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
        myBetRecordBlock: this.$route.params.id ? false : true,  // 我的竞猜记录 展示/隐藏
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
        update: '*本排行榜每天1点(UTC+8)更新',  // 战绩更新时间
        isModal: false,
        bestBet: {},
      }
    },
    async asyncData({$axios, app, params}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
      let [my_bet_single_list, bet_single_list_nav, res] = await Promise.all([
        app.$api.bet.getMyBetSingleList({type: 1}),
        app.$api.bet.getBetSingleListNav({tournament_id: 0, start_id: '', limit: 10, type: 1}),
        // app.$api.member.getMemberRecord(),
      ]);
      console.log('====================>');
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
        // update: res.data.update,
        /*myRecordArray: [    // 我的战绩
          {
            id: 0,
            name: '本周战绩',
            record: res.data.weekRecord || {}
          },
          {
            id: 1,
            name: '本月战绩',
            record: res.data.monthRecord || {}
          },
          {
            id: 2,
            name: '总战绩',
            record: res.data.totalRecord || {}
          },
        ],*/
      }
    },
    mounted(){
      // this.NoData = this.byCategoryList.length == 0 ? true : false;
      console.log(this.$route.params)
      window.addEventListener('scroll', this.winHandleScroll, true);  // 监听（绑定）滚轮滚动事件
      if (this.tabsNavCurr == 1) this.memberRecord();
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
        let res = await this.$api.member.getMemberRecord();
        console.log(res);
        if (res.code == '200') {
          // this.myRecordArray[0].record = res.data.weekRecord;
          // this.myRecordArray[1].record = res.data.monthRecord;
          // this.myRecordArray[2].record = res.data.totalRecord;
          // this.update = res.data.update;
        } else {
          this.$Message.warning(res.message);
        }
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
  .layout-default .page-content .page-main {
    max-width: 1200px;
    width: 100%;
    zoom: 1;
    margin: 0 auto 20px;
    padding: 0;
  }
  .bet-main-wrap {
    padding-top 30px
    width 100%
    display flex
    flex-wrap wrap
    justify-content space-between

    .left-wrap {
      width calc(100% - 400px)

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
