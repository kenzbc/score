<template>
  <div class="bet-page">
    <div class="bet-main-wrap">
      <div class="left-wrap">
        <div class="bet_create_tabs margin_b3" >
          <p class="title fll">可选菠菜</p>

          <i-select class="flr"
                    :label-in-value="true"
                    @on-open-change="getBetNavBar"
                    @on-change="getBetNavBarVal"
                    v-model="navBar.id"
                    style="width:120px" >
            <i-option v-for="(item, index) in navBar.list"
                      :value="item.id" :key="index">{{ item.name }}</i-option>
          </i-select>
          <p class="sort flr">此分类下共有 <span class="creat_num">{{ navBarNum }}</span> 个菠菜</p>
        </div>
        <div class="bet_single_list" >
          <section  v-for="item in betSingleList">
            <div class="bet_group_header" v-if="type != 6">
              <img src="/static/images/bet/line.png">
              <p>{{ item.date_txt }}</p>
            </div>
            <div class="bet_group margin_b">
              <input type="hidden" name="" class="bet_single_start_id" :value="item.start_id">
              <div class="bet_single_title">
                <label class="fll" @click="match_link(item.match_id,item.tournament_id)">
                  <img :src="item.tournament_image  ? item.tournament_image : '/static/images/tx_pic.jpg'">
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


              <div class="bet_single_detail margin_b2" v-for="betItem in item.bet_list">
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
                  <a href="javascript:;"
                     class="bet_single_click fll"
                     v-for="score in betItem.items">
                    <div class="betting"
                         @click="addBetItem(score,
                         betItem.bet_id,
                         score.is_bet_cur,
                         item.tournament_image,
                         item.tournament_name,
                         item.round_name,
                         item.round_son_name, betItem.title)"
                         :class="{'normal_gray': score.is_bet_cur == undefined , 'win_orange': score.is_bet_cur == 1, '': score.is_bet_cur == 0 }">
                      <p class="score fll">
                        <span>{{ score.item_name}}</span>
                      </p>
                      <div class="odds flr" :class="{'normal': score.is_bet_cur == undefined, 'win': score.is_bet_cur == 1}">
                           <!--:class="score.is_bet == 1 ? 'win' : ''"-->
                        <p>赔率：{{ score.odds}}</p>
                      </div>
                    </div>
                  </a>
                </div>
              </div>

            </div>
          </section>
          <Modal
            width="360"
            v-model="isModal">
            <p slot="header">
              <Icon type="ios-information-circle"></Icon>
              <span>投注记录</span>
            </p>
            <div class="record_body">
              <div class="detail_row">
                <div class="detail_cell">投注时间</div>
                <div class="detail_cell">竞猜详情</div>
                <div class="detail_cell">竞猜金额</div>
              </div>
              <!--{{ for(var key in it){ }}-->
              <!--<div class="detail_row">-->
              <!--<div class="detail_cell">{{= it[key].add_time}}</div>-->
              <!--<div class="detail_cell">{{= it[key].item_name}}</div>-->
              <!--<div class="detail_cell">{{= it[key].price}}<svg class="icon icon_size" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg></div>-->
              <!--</div>-->
              <!--{{ } }}-->
              <!--{{? it.length == 0}}-->
              <!--<div class="detail_nodata">-->
              <!--<p>暂时没有投注记录</p>-->
              <!--</div>-->
              <!--{{?}}-->
            </div>
            <div slot="footer"></div>
          </Modal>
        </div>
      </div>

      <div class="right-wrap">
        <!--创建组合菠菜start-->
        <div class="bet-right-padding" >
          <div class="bet-create-top">
            <div class="bet-create-top-top">
              <i class="iconfont">&#xe645;</i>
              <span>创建菠菜组合</span>
            </div>
            <div class="bet-create-top-middle cl">
              <div class="bet-create-title fll">组合标题 :</div>
              <div class="bet-create-top-input flr">
                <input class="title-button" v-model="createBetParams.title" placeholder="不超过30个字" maxlength="30" type="text" />
              </div>
            </div>
            <div class="bet-create-top-bottom">
              <textarea class="textarea-button"
                        maxlength="225"
                        placeholder="描述:阐述你的预测根据，说服小伙伴们来跟单吧"
                        v-model="createBetParams.content"
                        name="" rows="" cols=""></textarea>
            </div>
          </div>
          <div class="bet-create-middle cl">
            <div class="fll">我的组合</div>
            <div class="bet-create-addNum flr"></div>
          </div>
          <div class="bet-create-bottom v_comment_body"
               :style="styles"
               @scroll="createScroll"
               :class="{'bet-create-bottom-bg': !createBetItem || createBetItem && createBetItem.length == 0 }">
            <div class="create-item" v-for="(item, index) in createBetItem">
              <div class="header cl">
                <img class="fll" :src="item.tournament_image ? item.tournament_image : '/static/images/tx_pic.jpg' "  alt="">
                <p class="fll">{{ item.name }} </p>
                <div class="delete flr" @click="deleteBetItem(index, item.bet_id, item.bet_item_id)"><i class="iconfont"></i>
                </div>
              </div>
              <div class="title">{{ item.title }}</div>
              <div class="content">
                <div class="betting win_orange">
                  <p class="score fll">
                    <span>{{ item.item_name}}</span>
                  </p>
                  <div class="odds flr win">
                    <p>赔率：{{ item.odds}}</p>
                  </div>
                </div>
              </div>

              <div class="footer cl">
                <div class="item-left fll">
                  <!--<Input class="input" @on-blur="inputBlur(item.member_max_bet)" v-model="item.value" type="number" placeholder="投注额" />-->
                  <input  @blur.prevent="inputBlur(item.change_price)"
                          @keyup="vCode(item.change_price, 1, item.member_max_bet, index)"
                          type="number"
                          maxlength="4"
                          placeholder="投注额"
                          v-model="item.change_price"
                          name=""
                          value="">
                </div>
                <div class="item-middle fll">
                  <input disabled="disabled"
                         type="number"
                         maxlength="4"
                         placeholder="可赢额"
                         name=""
                         :value="item.change_win_price ? item.change_win_price : ''">
                </div>
                <div class="item-right flr">可投<span class="can-bet">{{item.member_max_bet}}</span>
                  <svg class="icon icon_size" aria-hidden="true">
                    <use xlink:href="#icon-guozi"></use>
                  </svg>
                </div>
              </div>
              <div class="tips-footer cl" v-if="item.warn_message">
                <p class="fll">
                  <i class="iconfont"></i></p>
                <p class="fll false-warn">{{ item.warn_message }}</p></div>
            </div>
          </div>
          <div class="bet-create-foot">
            <div class="f-top cl">
              <p class="fll">批量投注<span>(单项投注10果子起) :</span></p>
              <div class="checkbox flr ">
                <Checkbox v-model="cteateBoxData.isPrivate" @on-change="isPrivateCur">不公开此组合</Checkbox>
              </div>
            </div>
            <div class="f-middle cl">
              <p class="fll">
                <input v-model="cteateBoxData.lotSetBet"
                       @keyup="vCode(cteateBoxData.lotSetBet, 0)"
                       @blur.prevent="inputBlur(cteateBoxData.lotSetBet)"
                       type="number"
                       maxlength="4" />
                <i class="iconfont">&#xe62d;</i>
                <span class="maxLength">{{ createBetItem.length }}</span>
              </p>
              <p class="flr">
                预期可获:
                <span class="profit-guozi">{{cteateBoxData.profitGuozi}}</span>
                <svg class="icon icon_size" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg>
              </p>
            </div>
            <div class="f-bottom cl">
              <div class="bet-create-foot-left fll">
                <p>
                  <span class="maxLength1"
                        v-if="createBetItem && createBetItem.length != 0">{{createBetItem.length}}</span> 场消耗:
                  <span class="totalGuozi">{{cteateBoxData.payGuozi}}</span>
                  <svg class="icon icon_size" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg>
                </p>
                <p>
                  我的果子: <span class="my-guozi">{{myBank.guozi1}}</span>
                  <svg class="icon icon_size" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg>
                </p>
                <p>
                  预期可获: <span class="profit-guozi1">{{cteateBoxData.groupProfitGuozi}}</span>
                  <svg class="icon icon_size" aria-hidden="true"><use xlink:href="#icon-guozi"></use></svg>
                </p>
              </div>
              <div class="bet-create-foot-right flr">
                <p>全对奖励 :  <span><i class="iconfont">&#xe62d;</i><span class="reward-double">{{cteateBoxData.rewardDouble}}</span></span></p>
                <p class="bet-key" @click="betKey">一键投注</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--菠菜记录弹窗-->
    <bet-list-modal :show="betListModal" :memberBetList="memberBetList" @setMemberBetModalShow="setMemberBetModalShow"></bet-list-modal>
  </div>
</template>

<script>
  import Vue from 'vue'
  import SingleList from '~/components/bet/single-list.vue'
  import betListModal from '~/components/bet/bet-list-modal'
  export default {
    name: "index",
    components: {
      SingleList,
      betListModal
    },

    data(){
      return {
        type: '6',
        isModal: false,
        betListModal: false,
        createBetItem: [],
        cteateBoxData: {   // 创建板块数据
          rewardDouble: 1.1,  // 菠菜倍数
          isPrivate: false,   // 私密checkbox
          lotSetBet: '',  // 批量
          profitGuozi: 0,  // 预期可获果子数
          groupProfitGuozi: 0, //预期可获组合菠菜果子数
          payGuozi: 0  // 消耗果子数
        },
        createBetParams: {
          title: '',
          content: '',
          bet_items: [],
          is_private: 0,
        },
        navBar: {
          id: 0,
          num: 0,
          list: []
        },
        singleParams: {
          tournament_id: 0,
          start_id: '',
          limit: 10,
          type: 6
        },
        isLoadMoreLock: true,  // 数据加载
        targetScrollTop: 0,
        styles: {
          scrolltop: 0,
        },
        memberBetList: [],
      }
    },
    async asyncData({$axios, app}) {
      // 异步数据处理，另外该方法的第一个参数为当前页面组件的 上下文对象。
      // let [ bet_single_list] = await Promise.all([
      let [bet_single_list, my_bank] = await Promise.all([
        app.$api.bet.getBetSingleList({tournament_id: 0, start_id: '', limit: 5, type: 6}),
        app.$api.user.getMyBank()
      ]);
      // console.log(bet_single_list.data)
      console.log('-------------------->');
      return {
        navBarNum: bet_single_list.data.count || 0,
        betSingleList: bet_single_list.data.list || [],  // 单场菠菜列表
        myBank: my_bank.data || {}
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

          if (this.isLoadMoreLock && clientHeight + scrollTop >= scrollHeight - 300) {
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
        if (this.betSingleList && this.betSingleList.length > 0) this.singleParams.start_id = this.betSingleList[this.betSingleList.length - 1].start_id;
      },
      // 获取投注记录
      getBetRecord(betId){

      },
      // 获取菠菜的赛事列表 触发
      async getBetNavBar(){
        if  (this.navBar.list && this.navBar.list.length == 0) {
          let res = await this.$api.bet.getBetNavBar();
          if (res.code == '200') {
            this.navBar.list = res.data || [];

          } else {
            this.$Message.warning(res.message);
            return;
          }
        }
      },
      async getData(){
        console.log(this.singleParams);
        let res = await this.$api.bet.getBetSingleList({params: this.singleParams}); // api
        this.betSingleList = this.singleParams.start_id == '' ? res.data.list || [] : this.betSingleList.concat(res.data.list);

        if(this.createBetItem && this.createBetItem.length > 0) {
          for(var k in this.createBetItem) {
            let bet_id = this.createBetItem[k].bet_id;
            let bet_item_id = this.createBetItem[k].bet_item_id;

            // 遍历当前数组，更新数据
            this.betSingleList.forEach( lists => {
              for(var i in lists.bet_list) {
                if (lists.bet_list[i].bet_id == bet_id) {
                  for (var j in lists.bet_list[i].items){
                    if (lists.bet_list[i].items[j].bet_item_id == bet_item_id) {
                      Vue.set(lists.bet_list[i].items[j],'is_bet_cur',1); // is_bet_cur  1: 选择  0: 非
                    } else {
                      Vue.set(lists.bet_list[i].items[j],'is_bet_cur',0); // is_bet_cur  1: 选择  0: 非
                    }
                  }
                }
              }
            });
          }
        }
        this.navBarNum = res.data.count || 0;
        if (this.betSingleList.length != 0 && res.data.list.length != 0 ) this.isLoadMoreLock = true;

      },
      getBetNavBarVal(val){
        this.navBar.id = val.value;
        this.singleParams.tournament_id = this.navBar.id;
        this.singleParams.start_id = '';
        this.getData();
      },
      createScroll(e){
        // console.log(e)
        // console.log(e.target)
      },
      // 添加到数组
      addBetItem(item, bet_id, is_bet_cur, tournament_image, tournament_name, round_name, round_son_name, tilte){



        if (is_bet_cur == undefined) {
          let name = tournament_name + (round_name ? '- ' + round_name : '') + (round_son_name ? '- ' + round_son_name : '');
          item.tournament_image = tournament_image;
          item.name = name;
          item.bet_id = bet_id;
          item.title = tilte;
          item.warn_message = '';
          // console.log(item);
          // 判断批量是否 有值
          if (this.cteateBoxData.lotSetBet)  {
            console.log(this.cteateBoxData.lotSetBet);
            item.change_price = this.cteateBoxData.lotSetBet;
            item.change_win_price = item.change_price * item.odds;
          }

          this.createBetItem.push(item);
          // 遍历当前数组，更新数据
          this.betSingleList.forEach( lists => {
            for(var i in lists.bet_list) {
              if (lists.bet_list[i].bet_id == bet_id) {
                for (var j in lists.bet_list[i].items){
                  if (lists.bet_list[i].items[j].bet_item_id == item.bet_item_id) {
                    Vue.set(lists.bet_list[i].items[j],'is_bet_cur',1); // is_bet_cur  1: 选择  0: 非
                  } else {
                    Vue.set(lists.bet_list[i].items[j],'is_bet_cur',0); // is_bet_cur  1: 选择  0: 非
                  }
                }
              }
            }
          });

          // console.log(this.betSingleList);

          // 根据数量 添加倍数
          let len = this.createBetItem.length;
          switch(len)
          {
            case 7:
              this.cteateBoxData.rewardDouble = 1.2;
              break;
            case 8:
              this.cteateBoxData.rewardDouble = 1.3;
              break;
            case 9:
              this.cteateBoxData.rewardDouble = 1.4;
              break;
            case 10:
              this.cteateBoxData.rewardDouble = 1.5;
              break;
            default:
              this.cteateBoxData.rewardDouble = 1.1
          }
        }

        if (this.cteateBoxData.lotSetBet) this.mountedGroupGuozi();
      },
      // 根据index删除数据
      deleteBetItem(index, bet_id, bet_item_id){

        // 遍历当前数组，更新数据
        this.betSingleList.forEach( lists => {
          for(var i in lists.bet_list) {
            if (lists.bet_list[i].bet_id == bet_id) {
              for (var j in lists.bet_list[i].items){
                Vue.delete(lists.bet_list[i].items[j],'is_bet_cur'); // is_bet_cur  1: 选择  0: 非
              }
            }
          }
        });

        this.createBetItem.splice(index,1);
      },
      // input 失去焦点
      inputBlur(change_price){
        if (parseInt(change_price) < 10) {
          this.$Message.warning('不能小于10');
        }
      },
      // 是否私密
      isPrivateCur(val){
        this.cteateBoxData.isPrivate = val;
        this.createBetParams.is_private = this.cteateBoxData.isPrivate == true ? 1 : 0;
      },
      // 验证数字 //type 0: 批量  1: 单投   index 第n个单投
      vCode(num, type, member_max_bet, index){
        // console.log(num, type, member_max_bet)
        let reg = /^\+?[1-9][0-9]*$/;  // 非零整数
        if (!reg.test(num) && num) {
          this.$Message.warning('只能输入整数');
          return
        }

        // 单投
        if( type == 1) {

          if (member_max_bet && num > parseInt(member_max_bet)) {
            this.$Message.warning('最大不能超过' + member_max_bet);
            // 变更为最大可投数
            this.createBetItem.forEach( (item, i)=> {
              if (i == index) Vue.set(item, 'change_price', member_max_bet);
            });
          } else {
            // 计算可赢额
            let guozi = 0;
            let pay = 0;
            this.createBetItem.forEach( (item, i)=> {

              if (i == index) {
                Vue.set(item, 'change_win_price', Math.round(item.change_price * item.odds));

                if (item.warn_message) Vue.set(item, 'warn_message', '');
              }
              if (item.change_price) pay += parseInt(item.change_price);
              if (item.change_win_price) guozi += item.change_win_price;

            });

            this.cteateBoxData.payGuozi = Math.round(pay);
            this.cteateBoxData.profitGuozi = Math.round(guozi);
            this.cteateBoxData.groupProfitGuozi = Math.round(this.cteateBoxData.profitGuozi * this.cteateBoxData.rewardDouble);
          }
        } else if (type == 0) {  // 批量

          // 计算预期可获
          if(this.createBetItem.length == 0) {
            this.$Message.warning('请从左侧选择中意的菠菜');
            this.cteateBoxData.profitGuozi = '';
          } else {

            this.mountedGroupGuozi(num)
          }

        }
      },
      // 计算预期可获
      mountedGroupGuozi(num){
        if (this.createBetItem && this.createBetItem.length > 0) {
          let guozi = 0;
          let pay = 0;
          this.createBetItem.forEach( (item, i) => {
            Vue.set(item, 'change_price', num );
            Vue.set(item, 'change_win_price', Math.round(item.change_price * item.odds));

            // 判断是否高于最大可投
            if (parseInt(item.change_price) > parseInt(item.member_max_bet)) {
              Vue.set(item, 'warn_message', '最大不能超过' + item.member_max_bet);
            } else {
              Vue.set(item, 'warn_message', '')
            }

            // 预期可获累计
            if (item.change_price) pay += parseInt(item.change_price);
            if (item.change_win_price) guozi += item.change_win_price;

            this.cteateBoxData.payGuozi = Math.round(pay);
            this.cteateBoxData.profitGuozi = Math.round(guozi);
            this.cteateBoxData.groupProfitGuozi = Math.round(this.cteateBoxData.profitGuozi * this.cteateBoxData.rewardDouble);
          });

        }
      },
      // 一键投注
      async betKey(){

        if (this.createBetItem.length < 6 || this.createBetItem.length > 10) {
          this.$Message.warning('最少添加6个最多10个');
        } else if (!this.createBetParams.title) {
          this.$Message.warning('标题不能为空');
        } else if (!this.createBetParams.content) {
          this.$Message.warning('描述不能为空');
        } else {
          var betItemArr = [];

          this.createBetItem.forEach( (item, i) => {
            var betItem = {   // 初始化
              bet_id: '',
              bet_item_id: '',
              guozi_num: '',
            };
            if (!item.change_price) {
              Vue.set(item, 'warn_message', '投注额不能为空');
              const container = this.$el.querySelector('.v_comment_body');
              if (container) {
                let scrollTop = 176 * i;
                container.scrollTop = scrollTop;
              }
              return false;
            }
            betItem.bet_id = item.bet_id;
            betItem.bet_item_id = item.bet_item_id;
            betItem.guozi_num = item.change_price;
            betItemArr.push(betItem);
          });
          this.createBetParams.bet_items = JSON.stringify(betItemArr);
          console.log(this.createBetParams);

          // 组合菠菜创建
          let res = await this.$api.bet.addGroupBet({params: this.createBetParams}); // api
          if (res.code == '200') {
            if (res.data.status == 0) {
              this.$Message.success(res.data.message);
              this.$router.push({
                name: 'bet-my',
              });
            } else {
              this.createBetItem.forEach( (item, i) => {
                if (item.bet_id == res.data.bet_id) {
                  Vue.set(item, 'warn_message', res.data.message);
                  const container = this.$el.querySelector('.v_comment_body');
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
            this.createBetItem.forEach( (item, i) => {
              if (item.bet_id == res.data.bet_id) {
                Vue.set(item, 'warn_message', res.data.message);
                const container = this.$el.querySelector('.v_comment_body');
                if (container) {
                  let scrollTop = 178 * i;
                  container.scrollTop = scrollTop;
                }
                return false;
              }
            })
          }

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
      setMemberBetModalShow(e) {
        if(e === false){
          this.betListModal = false;
        };
      }
    },
    mounted(){
      // this.$api.bet.getBetSingleList({tournament_id: 0, start_id: '', limit: 10, type: 6})
      window.addEventListener('scroll', this.winHandleScroll, true);  // 监听（绑定）滚轮滚动事件
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~static/static/css/bet.styl"

  .bet-main-wrap {
    padding-top 30px
    width 100%
    display flex
    flex-wrap wrap
    justify-content space-between

    .left-wrap {
      width calc(100% - 400px)

      /*创建组合菠菜tab*/
      .bet_create_tabs{
        height:60px;
        padding:12px 20px;
        line-height: 36px;
        background: #FFFFFF;
        border: 1px solid #EBEBEC;
        position: relative;

        .title{
          font-size: 16px;
          color: #5F6575;
          font-weight: bold;
        }

        .sort{
          margin-right:30px;

          span{
            color:#000014;
          }
        }
        .bet_match_nav_select{
          background: #F3F3F4;
          border-radius: 10px;
          padding:0 10px;
          cursor: pointer;
        }

        .bet_match_nav_select:after{
          top:50px;
        }

        .bet_match_nav_list{
          position: absolute;
          top:65px;
          right:0;
          width: 200px;
          padding:10px 10px;
          background: #FFFFFF;
          border-radius: 10px;
          box-shadow: 0 8px 20px 0 rgba(0,0,0,0.12);
          /*border:1px solid #EBEBEC;*/
          z-index:9;

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
      }
    }
    .right-wrap {

      /*创建组合菠菜侧边栏*/
      .bet-create-top{
        background: #FFFFFF;
        border: 1px solid rgba(235,235,236,0.60);
      }
      .bet-create-top-top{
        padding: 16px 0 16px 20px;
      }
      .bet-create-top-top i{
        font-size: 20px;
      }
      .bet-create-top-top span{
        padding-left: 5px;
        font-family: "微软雅黑";
        font-weight: bold;
        font-size: 16px;
        color: #5F6575;
      }
      .bet-create-top-middle{
        width: 100%;
        padding: 10px 20px 15px;
      }
      .bet-create-title{
        font-size: 16px;
        color: #5F6575;
        line-height: 40px;
      }
      .bet-create-top-input{
        height: 40px;
        width: 75%;
      }
      .bet-create-top-input input{
        width: 97%;
        height: 40px;
        background: #FCFCFD;
        border: 1px solid #EBEBEC;
        border-radius: 10px;
        padding-left: 10px;
      }
      .bet-create-top-bottom{
        padding: 0 20px 10px;

      }
      .bet-create-top-bottom textarea{
        outline: none;
        width: 100%;
        height: 120px;
        background: #FCFCFD;
        border: 1px solid #EBEBEC;
        border-radius: 10px;
        padding: 12px 18px;
      }
      .bet-create-middle{
        width: 100%;
        padding: 16px 26px;
        background: #FFFFFF;
        border: 1px solid rgba(235,235,236,0.60);
        border-top: 0;
      }
      .bet-create-middle div:nth-of-type(1){
        font-size: 16px;
        color: #5F6575;
        font-weight: bold;
      }
      .bet-create-middle div:nth-of-type(2){
        font-size: 16px;
        color: #5F6575;
      }
      .bet-create-bottom{
        padding: 0 10px;
        /*background: #F9FAFB;*/

        border-left: 1px solid rgba(235,235,236,0.60);
        border-right: 1px solid rgba(235,235,236,0.60);
        height: 500px;
        overflow-y: auto;
        background #fff
      }
      .bet-create-bottom-bg{
        background: #fff url('/images/bet/creat-bet.png') no-repeat 50% 30%;
        background-size: 50%;
      }
      .create-item{
        background: #FFFFFF;
        border: 1px solid rgba(235,235,236,0.60);
        border-radius: 2px;
        margin-top: 10px;
        padding: 12px 0 0;

        &:last-child{
          margin-bottom 10px
        }

        .header{
          width calc(100% - 32px)
          margin: 0 16px;
          position relative

          img{
            height: 28px;
            width: 28px;
          }
          > p {
            font-size: 14px;
            color: #5F6575;
            font-weight: bold;
            line-height: 28px;
            padding-left: 6px;
          }
          .delete {
            cursor: pointer;
            position absolute
            right 0
            top 50%
            transform translate(0, -50%)

            i {
              font-size: 18px;
              color: #FF8E89;
            }
          }
        }

        .title {
          margin: 0 16px;
          padding: 10px 0;
          font-size: 14px;
          color: #5F6575;
        }
        .content {
          margin: 0 16px;
          font-size: 14px;
          color: #5F6575;
        }
        .footer {
          margin: 0 16px;
          padding 10px 0

          .item-left{
            font-size: 13px;
            color: #333333;
            width: 25%;
            height: 30px;
            line-height: 30px;
            text-align: center;

            input {
              cursor: pointer;
              text-align: center;
              background: #FCFCFD;
              width: 100%;
              height: 30px;
              border: 1px solid #EBEBEC;
              border-radius: 10px;

              &::-webkit-outer-spin-button,
              &::-webkit-inner-spin-button {
                -webkit-appearance: none;
              }


            }
            input[type="number"] {
              -moz-appearance: textfield;
            }

          }
          .item-middle {
            margin-left: 3%;
            font-size: 13px;
            color: #333333;
            width: 25%;
            height: 30px;
            line-height: 30px;
            text-align: center;

            input{
              cursor: pointer;
              text-align: center;
              background: #FFF1C4;
              border: 1px solid #FFE283;
              border-radius: 10px;
              width: 100%;
              height: 28px;

              &::-webkit-outer-spin-button,
              &::-webkit-inner-spin-button {
                -webkit-appearance: none;
              }
            }
            input[type="number"] {
              -moz-appearance: textfield;
            }
          }
          .item-right{
            width: 45%;
            text-align: right;
            line-height: 30px;
            font-size: 13px;
            color: #97999F;

            span{
              padding-right: 3px;
            }

            img{
              width: 13px;
              height: 16px;
              vertical-align: middle;
            }
          }
        }
      }

      .tips-footer{
        width 100%
        padding: 6px 13px;
        background: #FF8E89;
        border: 1px solid #F87771;

        img{
          height: 16px;
          width: 16px;
        }

        p{
          padding-left: 10px;
          font-size: 12px;
          color: #7B1E1A;
          font-weight: bold;
          line-height: 16px;

          i {
            font-size: 16px;
            color: #7B1E1A;
          }
        }
      }

      .bet-create-foot{
        background: #FFFFFF;
        border: 1px solid rgba(235,235,236,0.60);

        .f-top {
          padding: 15px 16px;
          width 100%

          .checkbox {
            label {
              font-size 14px
              color: #5F6575;
            }
          }
        }
        .f-middle {
          width 100%
          padding: 0 15px 15px;
          line-height: 30px;
          font-size: 16px;
          color: #5F6575;
          border-bottom: 1px solid rgba(235,235,236,0.60);

          p {
            i {
              font-size 12px
            }
            input {
              cursor: pointer;
              height: 30px;
              background: #FCFCFD;
              border: 1px solid #EBEBEC;
              border-radius: 10px;
              width: 130px;
              font-size: 14px;
              padding-left: 10px;

              &::-webkit-outer-spin-button,
              &::-webkit-inner-spin-button {
                -webkit-appearance: none;
              }
            }
            input[type="number"] {
              -moz-appearance: textfield;
            }
          }
        }

        .f-bottom{
          width 100%
          padding: 20px 30px;
        }
      }


      .bet-create-foot-middle p:nth-of-type(1) i{
        color: #5F6575;
        font-size:10px;
        -webkit-transform:scale(0.8);
        display:inline-block;
      }
      .bet-create-foot-middle p:nth-of-type(2){
        font-size: 14px;
        color: #333333;
      }
      .bet-create-foot-middle p:nth-of-type(2) span{
        font-size: 14px;
        color: #796D62;
        padding-right: 4px;
      }
      .bet-create-foot-middle p:nth-of-type(2) img{
        width: 13px;
        height: 16px;
        vertical-align: middle;
      }

      .bet-create-foot-left p{
        font-size: 14px;
        color: #333333;
        line-height: 18px;
      }
      .maxLength1{
        font-weight: bold;
      }
      .reward-double{
        font-weight: bold;
      }
      .bet-create-foot-left p:nth-of-type(2){
        padding: 13px 0;
      }
      .bet-create-foot-left p span{
        font-size: 14px;
        color: #796D62;
        padding-right: 4px;
      }
      .bet-create-foot-left p img{
        width: 13px;
        height: 16px;
        vertical-align: middle;
      }
      .bet-create-foot-right p:nth-of-type(1){
        font-size: 14px;
        color: #333333;
      }
      .bet-create-foot-right p:nth-of-type(1) span i{
        color: #945800;
        font-size:10px;
        -webkit-transform:scale(0.8);
        display:inline-block;
      }
      .bet-create-foot-right p:nth-of-type(1) span{
        font-size: 14px;
        color: #945800;
        background: #FFDF79;
        border: 1px solid #FFD651;
        border-radius: 4px;
      }
      .bet-create-foot-right p:nth-of-type(2){
        cursor: pointer;
        margin-top: 20px;
        font-size: 14px;
        color: #8C6600;
        font-weight: bold;
        padding: 8px 25px;
        background: #FFEB79;
        border: 1px solid #FFE23B;
        border-radius: 8px;
        text-align: center;
      }

      /*弹层*/
      .bet-tip-mask,.check-tip-mask{
        position: absolute;
        top:0;
        left:0;
        right:0;
        bottom:0;
        z-index: 999;
        background: rgba(0,0,0,0.7);
        position:fixed;
        _position:absolute;
      }
      .check-tip,.bet-tip{
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -90px;
        margin-left: -170px;
        background: #FFFFFF;
        box-shadow: 0 8px 20px 0 rgba(0,0,0,0.12);
        border-radius: 2px;
        width: 340px;
        padding: 24px 0 0 0;
      }
      .check-tip-top{
        font-size: 16px;
        color: #5F6575;
        text-align: center;
        font-weight: bold;
      }
      .check-tip-middle{
        padding: 30px 0 40px 0;
        font-size: 16px;
        color: #5F6575;
        text-align: center;
      }
      .check-tip-bottom{
        border: 1px solid #EBEBEC;
      }
      .check-tip-lose,.check-tip-determine{
        width: 50%;
        text-align: center;
        line-height: 50px;
        cursor: pointer;
      }

      .check-tip-lose i{
        font-size: 13px;
        color: #FF5C5C;
      }
      .check-tip-lose span{
        font-size: 14px;
        color: #5F6575;
      }
      .check-tip-determine i{
        font-size: 17px;
        color: #6AD6BC;
      }
      .check-tip-determine span{
        font-size: 14px;
        color: #5F6575;
      }
    }
  }
</style>
