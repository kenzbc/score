<template>
  <div class="piece after-classification">
    <div class="position-menu" :class="'p' + tabBarMenu.activeIndex">
      <div class="item" :class="{active: index == tabBarMenu.activeIndex}" v-for="(item, index) in tabBarMenu.list" :key="index" @click="toggleTabMenu(item, index)">{{item.name}}</div>
    </div>
    <div class="tab-content cl">
      <div class="player-list left-t fll" :class="teamAKey">
        <div class="player-item" v-for="item in activeTabData.team_a" :key="item.playerId" v-if="item.playerId">
          <span class="val mid">{{item.val}}</span>
          <div class="data-bar mid" :style="{width: dataBarWidth * item.rate + 'px'}"></div>
          <div class="avatar hero mid"><img :src="item.heroAvatar || $score.defaultPlayerImg" /></div><div class="avatar player mid"><a :href="'/data/player/' + item.playerId" target="_blank"><img :src="item.playerAvatar || $score.defaultPlayerImg" /></a></div>
        </div>
      </div>
      <div class="player-list right-t flr" :class="teamBKey">
        <div class="player-item" v-for="item in activeTabData.team_b" :key="item.playerId" v-if="item.playerId">
          <div class="avatar player mid"><a :href="'/data/player/' + item.playerId" target="_blank"><img :src="item.playerAvatar || $score.defaultPlayerImg" /></a></div><div class="avatar hero mid"><img :src="item.heroAvatar || $score.defaultPlayerImg" /></div>
          <div class="data-bar mid" :style="{width: dataBarWidth * item.rate + 'px'}"></div>
          <span class="val mid">{{item.val}}</span>
        </div>
      </div>
    </div>
    <div class="data-btn-wrap cl">
      <div class="data-btn" :class="{fll: index == 0, flr: index == 1, active: dataBtn.activeIndex == index}" v-for="(item, index) in dataBtn.list" :key="item.index" @click="toggleDataBtn(item)">{{item.name}}</div>
    </div>
    <keep-alive>
      <components :is="currentTabComponent" v-show="dataBtn.activeIndex != -1" :game-data="gameData" :result-data="resultData" :str-arr="strArr" :max-atk="maxAtk" :max-def="maxDef"></components>
    </keep-alive>
  </div>
</template>

<script>
  export default {
    components: {
    },
    props: {
      gameData: {
        type: Object,
        default: {}
      }
    },
    data: function () {
      return {
        tabBarMenu: {
          activeIndex: 0,
          activeField: '_atk_o',
          activeKey: 'maxAtk',
          list: [
            {key: 'maxAtk', name: '输出', field: '_atk_o'},
            {key: 'maxDef', name: '承伤', field: '_def_o'},
            {key: 'maxMoney', name: '经济', field: '_money_o'},
            {key: 'maxHits', name: '补刀', field: '_hits'},
            {key: 'maxScore', name: 'LFL评分', field: '_score'}
          ],
        },
        strArr: ['a', 'b', 'c', 'd', 'e'],
        dataBarWidth: 180,
        dataBtn: {
          activeIndex: -1,
          list: [
            {index: 0, name: '赛后统计', component: 'table-data'},
            {index: 1, name: '出装天赋', component: 'details-data'}
          ]
        },
        currentTabComponent: 'table-data'
      };
    },
    watch: {},
    computed: {
      resultData: function () {
        return this.gameData.result_list || {};
      },
      maxAtk: function () {
        var list = [];
        for (var i = 0; i < this.strArr.length; i++) {
          list.push(parseFloat(this.resultData['red_star_' + this.strArr[i] + this.tabBarMenu.list[0].field] || 0));
        }
        for (var i = 0; i < this.strArr.length; i++) {
          list.push(parseFloat(this.resultData['blue_star_' + this.strArr[i] + this.tabBarMenu.list[0].field] || 0));
        }
        return Math.max.apply(Math, list);
      },
      maxDef: function () {
        var list = [];
        for (var i = 0; i < this.strArr.length; i++) {
          list.push(parseFloat(this.resultData['red_star_' + this.strArr[i] + '_def_o'] || 0));
        }
        for (var i = 0; i < this.strArr.length; i++) {
          list.push(parseFloat(this.resultData['blue_star_' + this.strArr[i] + '_def_o'] || 0));
        }
        return Math.max.apply(Math, list);
      },
      maxMoney: function () {
        var list = [];
        for (var i = 0; i < this.strArr.length; i++) {
          list.push(parseFloat(this.resultData['red_star_' + this.strArr[i] + '_money_o'] || 0));
        }
        for (var i = 0; i < this.strArr.length; i++) {
          list.push(parseFloat(this.resultData['blue_star_' + this.strArr[i] + '_money_o'] || 0));
        }
        return Math.max.apply(Math, list);
      },
      maxHits: function () {
        var list = [];
        for (var i = 0; i < this.strArr.length; i++) {
          list.push(parseFloat(this.resultData['red_star_' + this.strArr[i] + '_hits'] || 0));
        }
        for (var i = 0; i < this.strArr.length; i++) {
          list.push(parseFloat(this.resultData['blue_star_' + this.strArr[i] + '_hits'] || 0));
        }
        return Math.max.apply(Math, list);
      },
      maxScore: function () {
        var list = [];
        for (var i = 0; i < this.strArr.length; i++) {
          list.push(parseFloat(this.resultData['red_star_' + this.strArr[i] + '_score'] || 0));
        }
        for (var i = 0; i < this.strArr.length; i++) {
          list.push(parseFloat(this.resultData['blue_star_' + this.strArr[i] + '_score'] || 0));
        }
        return Math.max.apply(Math, list);
      },
      activeTabData: function () {
        var team_a = [];
        var team_b = [];
        for (var i = 0; i < this.strArr.length; i++) {
          if (this.resultData[this.teamAKey + '_star_' + this.strArr[i] + '_playerID']) {
            team_a.push({
              playerId: this.resultData[this.teamAKey + '_star_' + this.strArr[i] + '_playerID'],
              playerAvatar: this.resultData[this.teamAKey + '_star_' + this.strArr[i] + '_pic'],
              heroAvatar: this.resultData[this.teamAKey + '_hero_' + this.strArr[i] + '_pic'],
              val: parseFloat(this.resultData[this.teamAKey + '_star_' + this.strArr[i] + this.tabBarMenu.activeField] || 0),
              rate: this[this.tabBarMenu.activeKey] == 0 ? 0 : parseFloat(this.resultData[this.teamAKey + '_star_' + this.strArr[i] + this.tabBarMenu.activeField] || 0) / this[this.tabBarMenu.activeKey]
            });
          }
        }
        for (var i = 0; i < this.strArr.length; i++) {
          if (this.resultData[this.teamBKey + '_star_' + this.strArr[i] + '_playerID']) {
            team_b.push({
              playerId: this.resultData[this.teamBKey + '_star_' + this.strArr[i] + '_playerID'],
              playerAvatar: this.resultData[this.teamBKey + '_star_' + this.strArr[i] + '_pic'],
              heroAvatar: this.resultData[this.teamBKey + '_hero_' + this.strArr[i] + '_pic'],
              val: parseFloat(this.resultData[this.teamBKey + '_star_' + this.strArr[i] + this.tabBarMenu.activeField] || 0),
              rate: this[this.tabBarMenu.activeKey] == 0 ? 0 : parseFloat(this.resultData[this.teamBKey + '_star_' + this.strArr[i] + this.tabBarMenu.activeField] || 0) / this[this.tabBarMenu.activeKey]
            });
          }
        }
        return {
          'team_a': team_a,
          'team_b': team_b
        };
      },
      teamAKey: function () {
        return this.resultData.teamID_a == this.resultData.blue_teamID ? 'blue' : 'red';
      },
      teamBKey: function () {
        return this.resultData.teamID_b == this.resultData.red_teamID ? 'red' : 'blue';
      }
    },
    mounted() {
//      console.log('赛后数据--------');
//      console.log(this.tabData);
//      console.log(this.maxDamage);
    },
    methods: {
      toggleTabMenu: function (item, index) {
        this.tabBarMenu.activeIndex = index;
        this.tabBarMenu.activeField = item.field;
        this.tabBarMenu.activeKey = item.key;
      },
      toggleDataBtn: function (item) {
        this.dataBtn.activeIndex = item.index;
        this.currentTabComponent = item.component;
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .after-classification {
    padding-top 24px
    margin-top: -1px !important;
    border-radius 0 0 2px 2px !important;
    .position-menu {
      width: 640px
      margin 0 auto
      overflow hidden
      .item {
        float left
        width: 20%
        height: 30px
        line-height 28px
        text-align center
        font-size 13px
        color #656973
        font-weight 400
        border: 1px solid #DCDFE6
        cursor pointer
        &:first-of-type {
          border-radius 6px 0 0 6px
        }
        &:last-of-type {
          border-radius 0 6px 6px 0
        }
        &:nth-of-type(2),
        &:nth-of-type(4) {
          border-left 0
          border-right 0
        }
        &.active {
          background #F2F7FC
          border 1px solid #B3D9FF
          cursor default
          color #0D8DFC
          font-weight 600
        }
      }
      &.p1 {
        .item {
          &:first-of-type {
            border-right 1px solid transparent
          }
          &:nth-of-type(3) {
            border-left 1px solid transparent
          }
        }
      }
      &.p3 {
        .item {
          &:last-of-type {
            border-left 1px solid transparent
          }
          &:nth-of-type(3) {
            border-right 1px solid transparent
          }
        }
      }
    }
    .tab-content {
      width: 100%
      height: 100%
      margin-top 30px
      overflow hidden
      position relative
      &:before {
        display block
        content ''
        width: 1px
        height: 200px
        background: rgba(0, 0, 0, 0.06);
        position absolute
        top: 50%
        left 50%
        transform translateY(-50%)
      }
      .player-list {
        width: 50%
        .player-item {
          + .player-item {
            margin-top 8px
          }
        }
        .avatar {
          &.hero {
            width: 36px
            height: 36px
            position relative
            z-index 1
          }
          &.player {
            width: 30px
            height: 30px
          }
        }
        .data-bar {
          width: 110px;
          height: 6px;
          border-radius: 2px;
          margin 0 4px;
          transition width .5s
        }
        .val {
          font-family: 'Industry-Bold';
          height: 20px;
          font-size: 16px;
          color: #2D2F33
          line-height: 18px;
        }
        &.left-t {
          padding-right 25px
          text-align right
          .hero {
            margin-right -5px
          }
        }
        &.right-t {
          padding-left 25px
          text-align left
          .hero {
            margin-left -5px
          }
        }
        &.blue {
          .data-bar {
            background: linear-gradient(135deg, rgba(13, 126, 255, 1) 0%, rgba(15, 151, 255, 1) 100%);
          }
        }
        &.red {
          .data-bar {
            background: linear-gradient(225deg, rgba(255, 76, 106, 1) 0%, rgba(255, 107, 137, 1) 100%);
          }
        }
      }
    }
    .data-btn-wrap {
      width: 100%
      padding 33px 84px 20px
      .data-btn {
        width: 280px;
        height: 34px;
        border-radius: 8px;
        border: 1px solid rgba(0, 0, 0, 0.1);
        font-size: 14px;
        font-weight: 400;
        color: #2D2F33
        line-height: 32px
        text-align center
        cursor pointer
        &.active {
          background: #F2F7FC
          border-radius: 8px;
          border: 1px solid #B3D9FF
          color: #0D8DFC
        }
      }
    }
  }
</style>
