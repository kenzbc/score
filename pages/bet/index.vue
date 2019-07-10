<template>
  <div class="bet-page">
    <div class="bet-main-wrap">
      <div class="left-wrap">
        <!--<div>左边</div>-->
        <div class="tabs-nav">
          <ul>
            <li class="fll" :class="{'active' : tabsNavCurr == index }" @click="tabsNav(index)" v-for="(item,index) in tabsNavList">
              <a href="javascript:;">{{item.value}}</a>
            </li>
          </ul>
        </div>
        <section>
          <div class="bet_match_nav" v-if="betSingleListNav && betSingleListBlock">
            <ul>
              <li class="fll"
                  :class="{'active' : betSingleListNavCurr == index}"
                  v-for="(item, index) in betSingleListNav"
                  @click="betMatchNav(item.id, index)">
                <i><em v-if="betSingleListNavCurr == index"></em></i>
                <a href="javascript:;">{{item.name}}</a>
              </li>
            </ul>
            <div class="right_select">
              <div class="bet_match_nav_select" data-tabs="1">
              </div>
            </div>
          </div>
          <div class="bet_date_nav" v-if="tabsNavDateCur && betSingleListBlock">
            <div class="bet_date_nav_container swiper-container swiper-container-horizontal" >
              <div class="swiper-wrapper">
                <a href="javascript:;"
                   class="swiper-slide swiper-slide-active"
                   :class="{'active ' : tabsNavDateNavCur == index}"
                   v-for="(item, index) in tabsNavDateCur"
                   @click="betSingleDateNav(index, item.start_score)" style="width: 85.7143px;">
                  <p class="date_value_2">{{ item.date_value2 }}</p>
                  <p class="date_value_1">{{ item.date_value1 }}</p>
                </a>
              </div>
              <div class="swiper-button-prev swiper-button-disabled"><i class="icon iconfont"></i></div>
              <div class="swiper-button-next swiper-button-disabled"><i class="icon iconfont"></i></div>
            </div>
          </div>
          <div class="bet_groups_nav" v-if="!betSingleListBlock">
            <ul>
              <li class="fll"
                  v-for="(item, index) in tabsGroupList"
                  @click="betGroupsNav(item.type, index)"
                  :class="{'active' : betGroupListNavCurr == index}">
                <a href="javascript:;">{{item.value}}</a>
              </li>
            </ul>
          </div>
        </section>
        <single-list :betSingleList="betSingleList" v-if="betSingleListBlock && betSingleList"></single-list>
        <group-list :betGroupList="betGroupList" v-if="!betSingleListBlock && betGroupList"></group-list>
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

  </div>
</template>

<script>
  import SingleList from '~/components/bet/single-list.vue'
  import GroupList from '~/components/bet/group-list.vue'
  import SlideList from '~/components/bet/slide-list.vue'
  export default {
    name: "index",
    data() {
      return {
        tabsNavCurr: 0, // tab 切换
        tabsGroupList: [
          {
            type: 1,
            value: '推荐组合'
          },
          {
            type: 2,
            value: '按命中排序'
          },
          {
            type: 3,
            value: '按跟单人数排序'
          },
          {
            type: 4,
            value: '按发布时间排序'
          },
        ],
        betGroupListNavCurr: 0, // 组合菠菜二级搜索导航
        tabsNavList: [
          {
            index: 0,
            value: '单场菠菜'
          },
          {
            index: 1,
            value: '组合菠菜'
          },
        ],
        singleParams: {
          tournament_id: 0,  // 默认为0
          start_id: '',
          start_score: '',
          limit: 10,
          type: 1   //1 菠菜(默认) 2 比赛菠菜 3 官方号菠菜 4 精选菠菜 6可选菠菜列表 7赛事菠菜
        },
        betSingleListNavCurr: 0, // 单场菠菜二级导航
        betSingleListBlock: true,  //单场菠菜展示/隐藏
        tabsNavDateCur: [],
        tabsNavDateNavCur: 0, // 时间导航
        betGroupList: [],
        isLoadMoreLock: true,  // 数据加载
        groupParams: {
          type: 1,
          limit: 10,
          cache_key: '',
        },
      }
    },
    components: {
      SingleList,
      GroupList,
      SlideList
    },
    async asyncData({$axios, app}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
      let [bet_single_list_nav, bet_single_list] = await Promise.all([
        app.$api.bet.getBetSingleListNav(),
        app.$api.bet.getBetSingleList({tournament_id: 0, start_id: '', limit: 10, type: 1})
      ]);
      // console.log(bet_single_list.data)
      console.log('-------------------->');
      return {
        betSingleList: bet_single_list.data.list || [],  // 单场菠菜列表
        betSingleListNav: bet_single_list_nav.data.navbar_list || [], // 导航
        memberInfo: bet_single_list_nav.data.member_info || {}, // 个人信息
        singleRecord: bet_single_list_nav.data.single_record, // 总战绩
        totalRecord: bet_single_list_nav.data.total_record, // 总战绩
        monthRecord: bet_single_list_nav.data.month_record, // 总战绩
        weekRecord: bet_single_list_nav.data.week_record, // 总战绩
        totalList: bet_single_list_nav.data.total_list || [], // 总榜
        monthList: bet_single_list_nav.data.month_list || [], // 月榜
        weekList: bet_single_list_nav.data.week_list || [], // 周榜
      }
    },
    methods: {
      // window滚动事件
      async winHandleScroll(e) {
        if (e.target.documentElement) {
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
        }
      },
      // 获取分类列表最后一条数据的cache_key，设置给params参数
      setCacheKey() {
        if (this.tabsNavCurr == 0) {
          if (this.betSingleList && this.betSingleList.length > 0) this.singleParams.start_id = this.betSingleList[this.betSingleList.length - 1].start_id;
        } else {
          if (this.betGroupList && this.betGroupList.length > 0) this.groupParams.cache_key = this.betGroupList[this.betGroupList.length - 1].cache_key;
        }
      },
      // 获取数据
      async getData(){
        if (this.tabsNavCurr == 0 ){
          // 单场菠菜
          let res = await this.$api.bet.getBetSingleList( { params: this.singleParams} );

          if (res.code == '200') {
            this.betSingleList = this.singleParams.start_id == '' ? res.data.list || [] : this.betSingleList.concat(res.data.list)
            if (this.betSingleList.length != 0 && res.data.list.length != 0 ) this.isLoadMoreLock = true;
          } else {
            this.$Message.warning(res.message);
          }

        } else {
          // 组合菠菜
          let res = await this.$api.bet.getBetGroupList({ params: this.groupParams});
          /*let res = {
            "code": "200",
            "message": "成功",
            "data": {
              "count": 2,
              "list": [
                {
                  "bet_group_id": "11598",
                  "cache_key": "1555854869028",
                  "title": "-",
                  "member_id": "5678334",
                  "member_nickname": "快去学习",
                  "member_avatar": "https://img1.famulei.com/z/5678334/p/186/2921500458686_90x90.png",
                  "reward_double": "1.1",
                  "hit_rate": "60",
                  "hit_num": "20",
                  "end_time_string": "04-26 14:00",
                  "member_count": "2",
                  "content": "",
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
                      "total_price": "17k",
                      "people_num": "214",
                      "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
                      "tournament_name": "2019NEST 线上预选赛 ",
                      "tournament_name_en": "2019NEST 线上预选赛 ",
                      "tournament_name_tw": "2019NEST 线上预选赛 ",
                      "view_type": 1,
                      "odds": "1.25"
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
                      "total_price": "2268",
                      "people_num": "57",
                      "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
                      "tournament_name": "2019NEST 线上预选赛 ",
                      "tournament_name_en": "2019NEST 线上预选赛 ",
                      "tournament_name_tw": "2019NEST 线上预选赛 ",
                      "view_type": 1,
                      "odds": "2.22"
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
                      "total_price": "5404",
                      "people_num": "95",
                      "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
                      "tournament_name": "2019NEST 线上预选赛 ",
                      "tournament_name_en": "2019NEST 线上预选赛 ",
                      "tournament_name_tw": "2019NEST 线上预选赛 ",
                      "view_type": 1,
                      "odds": "3.63"
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
                      "total_price": "1421",
                      "people_num": "45",
                      "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
                      "tournament_name": "2019NEST 线上预选赛 ",
                      "tournament_name_en": "2019NEST 线上预选赛 ",
                      "tournament_name_tw": "2019NEST 线上预选赛 ",
                      "view_type": 1,
                      "odds": "2.16"
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
                      "total_price": "15k",
                      "people_num": "162",
                      "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
                      "tournament_name": "2019NEST 线上预选赛 ",
                      "tournament_name_en": "2019NEST 线上预选赛 ",
                      "tournament_name_tw": "2019NEST 线上预选赛 ",
                      "view_type": 1,
                      "odds": "1.48"
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
                      "total_price": "1641",
                      "people_num": "42",
                      "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
                      "tournament_name": "2019NEST 线上预选赛 ",
                      "tournament_name_en": "2019NEST 线上预选赛 ",
                      "tournament_name_tw": "2019NEST 线上预选赛 ",
                      "view_type": 1,
                      "odds": "3.17"
                    }
                  ],
                  "is_follow": "0",
                  "is_private": "0",
                  "dynamic_status": "0",
                  "dynamic_id": "1023666",
                  "dynamic_comment_count": "0"
                },
                {
                  "bet_group_id": "11567",
                  "cache_key": "1555682491093",
                  "title": "?",
                  "member_id": "5646047",
                  "member_nickname": "布拉格1",
                  "member_avatar": "https://img1.famulei.com/m/5646047/p/179/1416463753923_100x100.jpg",
                  "reward_double": "1.1",
                  "hit_rate": "45",
                  "hit_num": "20",
                  "end_time_string": "04-26 14:00",
                  "member_count": "7",
                  "content": "",
                  "bet_items": [
                    {
                      "id": "5024842",
                      "member_id": "5646047",
                      "add_time": "1555682491",
                      "price": "10",
                      "bet_id": "7766",
                      "bet_item_id": "16719",
                      "ssdb_key": "56460471671915556824914186",
                      "settlement_time": "0",
                      "refund_time": "0",
                      "bet_group_id": "11567",
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
                      "total_price": "17k",
                      "people_num": "214",
                      "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
                      "tournament_name": "2019NEST 线上预选赛 ",
                      "tournament_name_en": "2019NEST 线上预选赛 ",
                      "tournament_name_tw": "2019NEST 线上预选赛 ",
                      "view_type": 1,
                      "odds": "1.25"
                    },
                    {
                      "id": "5024841",
                      "member_id": "5646047",
                      "add_time": "1555682491",
                      "price": "10",
                      "bet_id": "7769",
                      "bet_item_id": "16727",
                      "ssdb_key": "56460471672715556824918633",
                      "settlement_time": "0",
                      "refund_time": "0",
                      "bet_group_id": "11567",
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
                      "total_price": "1421",
                      "people_num": "45",
                      "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
                      "tournament_name": "2019NEST 线上预选赛 ",
                      "tournament_name_en": "2019NEST 线上预选赛 ",
                      "tournament_name_tw": "2019NEST 线上预选赛 ",
                      "view_type": 1,
                      "odds": "2.16"
                    },
                    {
                      "id": "5024840",
                      "member_id": "5646047",
                      "add_time": "1555682491",
                      "price": "10",
                      "bet_id": "7768",
                      "bet_item_id": "16725",
                      "ssdb_key": "56460471672515556824918354",
                      "settlement_time": "0",
                      "refund_time": "0",
                      "bet_group_id": "11567",
                      "bet_group_follow_id": "0",
                      "profit_price": "0",
                      "appid": "1",
                      "status": "1",
                      "bet_end_time": "1556341200",
                      "result_item_id": "0",
                      "title": "谁会拿到比赛的胜利？",
                      "item_name": "SN",
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
                      "total_price": "5404",
                      "people_num": "95",
                      "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
                      "tournament_name": "2019NEST 线上预选赛 ",
                      "tournament_name_en": "2019NEST 线上预选赛 ",
                      "tournament_name_tw": "2019NEST 线上预选赛 ",
                      "view_type": 1,
                      "odds": "1.30"
                    },
                    {
                      "id": "5024839",
                      "member_id": "5646047",
                      "add_time": "1555682491",
                      "price": "10",
                      "bet_id": "7771",
                      "bet_item_id": "16733",
                      "ssdb_key": "56460471673315556824915633",
                      "settlement_time": "0",
                      "refund_time": "0",
                      "bet_group_id": "11567",
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
                      "total_price": "1641",
                      "people_num": "42",
                      "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
                      "tournament_name": "2019NEST 线上预选赛 ",
                      "tournament_name_en": "2019NEST 线上预选赛 ",
                      "tournament_name_tw": "2019NEST 线上预选赛 ",
                      "view_type": 1,
                      "odds": "3.17"
                    },
                    {
                      "id": "5024838",
                      "member_id": "5646047",
                      "add_time": "1555682491",
                      "price": "10",
                      "bet_id": "7770",
                      "bet_item_id": "16730",
                      "ssdb_key": "56460471673015556824915764",
                      "settlement_time": "0",
                      "refund_time": "0",
                      "bet_group_id": "11567",
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
                      "total_price": "15k",
                      "people_num": "162",
                      "tournament_image": "https://img1.famulei.com/z/2373870/p/194/1113004397814.png",
                      "tournament_name": "2019NEST 线上预选赛 ",
                      "tournament_name_en": "2019NEST 线上预选赛 ",
                      "tournament_name_tw": "2019NEST 线上预选赛 ",
                      "view_type": 1,
                      "odds": "1.48"
                    },
                    {
                      "id": "5024837",
                      "member_id": "5646047",
                      "add_time": "1555682491",
                      "price": "10",
                      "bet_id": "7754",
                      "bet_item_id": "16692",
                      "ssdb_key": "56460471669215556824912667",
                      "settlement_time": "0",
                      "refund_time": "0",
                      "bet_group_id": "11567",
                      "bet_group_follow_id": "0",
                      "profit_price": "0",
                      "appid": "1",
                      "status": "1",
                      "bet_end_time": "1557417300",
                      "result_item_id": "0",
                      "title": "LPL队MSI能走多远？",
                      "item_name": "冠军",
                      "title_en": "",
                      "title_tw": "",
                      "item_name_en": "",
                      "item_name_tw": "",
                      "match_date": "",
                      "match_team_a": "",
                      "match_team_b": "",
                      "team_image_thumb_a": "",
                      "team_image_thumb_b": "",
                      "result_item_string": "",
                      "total_price": "84k",
                      "people_num": "586",
                      "tournament_image": "https://img1.famulei.com/m/2564381/p/188/0717231983304.png",
                      "tournament_name": "娱乐",
                      "tournament_name_en": "entertainment",
                      "tournament_name_tw": "娛樂",
                      "view_type": 3,
                      "odds": "1.87"
                    }
                  ],
                  "is_follow": "0",
                  "is_private": "0",
                  "dynamic_status": "0",
                  "dynamic_id": "1022904",
                  "dynamic_comment_count": "0"
                }
              ]
            },
            "task_data": {

            },
            "badge": [

            ],
            "event": [

            ]
          };*/
          console.log(res);
          if (res.code == '200') {
            this.betGroupList = this.groupParams.cache_key == '' ? res.data.list || [] : this.betGroupList.concat(res.data.list);
            if (this.betGroupList.length != 0 && res.data.list.length != 0 ) this.isLoadMoreLock = true;
          } else {
            this.$Message.warning(res.message);
          }
        }
      },
      // 赛事列表-导航（搜索）
      betMatchNav(id, index){
        this.betSingleListNavCurr = index;
        this.singleParams.tournament_id = id;
        this.getData();
      },
      // 一级切换
      tabsNav(index){
        this.tabsNavCurr = index;
        this.betSingleListBlock = this.tabsNavCurr == 0 ? true : false;
        this.getData();
      },
      // 赛事时间列表-导航（搜索）
      betSingleDateNav(index, start_score){
        // 暂时没有start_score参数，接口没有这个字段 （需要加上）
        this.tabsNavDateNavCur = index; // 时间选择
        // console.log(index, start_score);
        this.singleParams.start_score = start_score;
        this.getData();
      },
      // 组合菠菜导航列表（搜索）
      betGroupsNav(type, index){
        this.groupParams.type = type;
        this.betGroupListNavCurr = index;
        this.getData();
      }
    },
    mounted(){
      // 首次日期
      if (this.betSingleListNav) {
        this.tabsNavDateCur = this.betSingleListNav[this.betSingleListNavCurr].date_list;
      }

      window.addEventListener('scroll', this.winHandleScroll, true);  // 监听（绑定）滚轮滚动事件
    },
    watch: {
      // tokenValue(newVal, oldVal){
      //   if (process.client && newVal) {
      //     console.log(newVal)
      //     window.location.reload();
      //   }
      // }
    },
    computed: {
      // tokenValue() {
      //   return this.$store.state.token;
      // },
    },

  }
</script>

<style lang="stylus">
  @import "~static/static/css/bet.styl"

  .bet-main-wrap {
    .left-wrap {
      .bet_tabs_nav {
        li {
          width: 50%;
          height:50px;
          border-top:2px solid #E6E8ED;

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
        }


      }

      .bet_match_nav{
        padding:25px 0 20px;
        border-bottom:1px solid #EBEBEC;
        background: #fff;
        position: relative;

        .right_select{
          position: absolute;
          right: 0;
          top: 25px;
          width: 50px;
          height:30px;
          background: #fff;
        }

        >ul{
          padding:0 2.5%;
          height:40px;
          line-height:40px;
          overflow: hidden;
          li{
            padding:0 20px;
            line-height:40px;
            color:#333;
            a{
              display: inline-block;
            }
            &.active {
              a{
                font-weight: bold;
              }
            }
            i{
              font-size:0;
              display: inline-block;
              width:14px;
              height:14px;
              border:2px solid #FFD900;
              margin-bottom:2px;
              vertical-align:middle;
              border-radius: 10px;
              position: relative;

              em{
                position: absolute;
                display: block;
                width: 8px;
                height:8px;
                background: #FFD900;
                border-radius: 50%;
                /*margin-left:2px;*/
                /*margin-top:2px;*/
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
              }
            }
          }
        }
        >.bet_match_nav_select{
          position: absolute;
          right:20px;
          top: 25px;
          background: #F3F3F4;
          border-radius:10px;
          padding:0 10px;
          line-height: 30px;
          margin-top:5px;
        }

        .bet_match_nav_select{
          background: #F3F3F4;
          border-radius:10px;
          width: 30px;
          line-height: 30px;
          margin-top:5px;
          cursor: pointer;

          &:after {
            content: '\e60d';
            display: inline-block;
            font-family: 'iconfont';
            transform: rotate(90deg);
            margin-left: 5px;
            font-size:18px;
            color:#777;
            font-weight: bold;
            vertical-align: middle;
            transition-duration: .3s;
          }
        }
      }

      .bet_groups_nav{
        padding:25px 0 20px;
        border-bottom:1px solid #EBEBEC;
        background: #fff;
        color:#5F6575;
        height: 86px;
        margin-bottom: 20px;
        ul{
          padding:0 2.5%;

          li{
            padding:0 20px;
            line-height:40px;
            color:#333;
            margin:0 2%;
            border-radius: 10px;

            &:hover,
            &.active{
              background: #A5A8B2;

              a{
                color:#fff;
                /*font-weight: bold;*/
              }
            }
          }
        }
      }

      .bet_match_nav_list{
        position: absolute;
        top:65px;
        right:0;
        width: 200px;
        padding:10px 10px;
        background: #FFFFFF;
        border-radius: 2px;
        border-radius: 10px;
        box-shadow: 0 8px 20px 0 rgba(0,0,0,0.12);
        /*border:1px solid #EBEBEC;*/
        z-index:999;

        li{
          line-height:40px;
          font-size: 13px;
          color: #333333;
          border-radius: 10px;
          padding:0 15px;
          text-align: center;
          cursor: pointer;

          &.active{
            background: #A5A8B2;
          }
          &:hover{
            background: #F3F3F4;
          }
        }
      }

      /*日期选择*/
      .bet_date_nav{
        background: #fff;
        overflow: hidden;
      }
      .bet_date_nav_container,.bet_date_nav_list{
        /*height:100px;*/
        margin:0 4%;
        width: 92%;
        padding:10px 0;
      }
      .swiper-container{
        overflow: visible;
      }
      .swiper-wrapper{
        /*overflow: hidden;*/
      }
      .swiper-wrapper a{
        line-height: 22px;
        padding:10px 0;
        text-align: center;
        margin:0 9px;
        border-radius: 10px;
      }
      #bet_date a.active{
        background: #A5A8B2;
        color:#fff;
      }
      .swiper-wrapper a:hover{
        background: #A5A8B2;
        color:#fff;
      }
      .swiper-wrapper a .date_value_2{
        font-weight: bold;
      }
      .swiper-button-prev{
        left: -33px;
        top: 30px;
        border-left:1px solid #ebebec;
        /*width: 40px;*/
        line-height: 70px;
        padding-left: 15px;
        background: #fff;
      }

      .swiper-button-next{
        right: -32px;
        top: 30px;
        /*width: 40px;*/
        padding-right: 15px;
        line-height: 70px;
        background: #fff;
      }
      .swiper-button-prev .icon,.swiper-button-next .icon{
        font-size:24px;
        color:#777777;
      }
      .swiper-button-next.swiper-button-disabled, .swiper-button-prev.swiper-button-disabled{
        opacity: 1;
      }
      .swiper-button-next, .swiper-button-prev{
        height:70px;
      }

    }

  }

</style>
