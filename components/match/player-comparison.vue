<template>
  <div class="piece player-comparison-box">
    <div class="top-bar"><span>对位信息</span></div>
    <div class="data-wrap">
      <div class="position-menu" :class="'p' + activePid">
        <div class="item" :class="{active: item.pid == activePid}" v-for="item in positions" :key="item.pid" @click="togglePosition(item.pid)">{{item.name}}</div>
      </div>
      <div class="top-content cl">
        <div class="player-wrap fll">
          <ul class="player-list cl fll">
            <li class="player-item avatar fll" :class="{active: i == activeIndexA}" v-if="i < 6" v-for="(p, i) in teamAplayersOfPosition" :key="p.playerID" @click="togglePlayer(p, i)">
              <img :src="p.player_image_thumb" alt="" />
              <div class="pop-name">{{p.nickname}}</div>
            </li>
          </ul>
          <div class="focus-player fll">
            <div class="avatar fll">
              <a :href="'/data/player/' + activePlayerA.playerID" target="_blank">
                <img :src="activePlayerA.player_image_thumb" alt="" />
              </a>
            </div>
            <div class="name fll">
              <p class="en" :title="activePlayerA.nickname">
                <a :href="'/data/player/' + activePlayerA.playerID" target="_blank">{{activePlayerA.nickname}}</a>
              </p>
              <p class="cn">
                <a :href="'/data/player/' + activePlayerA.playerID" target="_blank">{{activePlayerA.player_chinese_name}}</a>
                <img :src="activePlayerA.country_image" alt="" />
              </p>
            </div>
          </div>
          <div class="recent-game cl fll">
            <div class="game-list">
              <ul class="cl" v-if="activePlayerA['win_lose']">
                <li class="game-item fll" :class="{win: val.toLowerCase() == 'w', last: i == 0}" v-for="(val, i) in recentGames" :key="i">{{val}}</li>
              </ul>
            </div>
            <div class="bottom-line l-line fll"></div>
            <p class="last-date">最后上场 {{activePlayerA.last_match_time | dateFormat('x', 'YYYY/MM/DD')}}</p>
          </div>
        </div>
        <div class="player-wrap flr team-r">
          <ul class="player-list cl flr">
            <li class="player-item avatar flr" :class="{active: i == activeIndexB}" v-if="i < 6" v-for="(p, i) in teamBplayersOfPosition" :key="p.playerID" @click="togglePlayer(p, i)">
              <img :src="p.player_image_thumb" alt="" />
              <div class="pop-name">{{p.nickname}}</div>
            </li>
          </ul>
          <div class="focus-player flr">
            <div class="avatar flr">
              <a :href="'/data/player/' + (activePlayerB.playerID || '')" target="_blank">
                <img :src="activePlayerB.player_image_thumb || $score.defaultPlayerImg" alt="" />
              </a>
            </div>
            <div class="name flr">
              <p class="en" :title="activePlayerB.nickname">
                <a :href="'/data/player/' + (activePlayerB.playerID || '')" target="_blank">{{activePlayerB.nickname}}</a>
              </p>
              <p class="cn">
                <img :src="activePlayerB.country_image" alt="" />
                <a :href="'/data/player/' + (activePlayerB.playerID || '')" target="_blank">{{activePlayerB.player_chinese_name}}</a>
              </p>
            </div>
          </div>
          <div class="recent-game cl flr">
            <div class="game-list flr">
              <ul class="cl flr" v-if="activePlayerB['win_lose']">
                <li class="game-item fll" :class="{win: val.toLowerCase() == 'w', last: i == activePlayerB['win_lose'].length - 1}" v-for="(val, i) in activePlayerB['win_lose']" :key="i">{{val}}</li>
              </ul>
            </div>
            <div class="bottom-line r-line flr"></div>
            <p class="last-date flr">最后上场 {{activePlayerB.last_match_time | dateFormat('x', 'YYYY/MM/DD')}}</p>
          </div>
        </div>
        <net-chart :data-a="netChartDataA" :data-b="netChartDataB"></net-chart>
      </div>

      <div class="data-content cl">
        <div class="chart-wrap fll">
          <i-circle :size="96" :stroke-width="8" :trail-width="8" :percent="parseFloat(activePlayerA.VICTORY_RATE)">
            <span class="val">{{activePlayerA.VICTORY_RATE}}%</span>
            <p class="key" slot="key">胜率</p>
          </i-circle>
          <div class="title" slot="title">{{activePlayerA.win_count || 0}}胜 {{activePlayerA.lose_count || 0}}败</div>
        </div>

        <div class="chart-wrap flr">
          <i-circle :size="96" :stroke-width="8" :trail-width="8" stroke-color="#FF4C6A" :percent="parseFloat(activePlayerB.VICTORY_RATE)">
            <span class="val">{{activePlayerB.VICTORY_RATE}}%</span>
            <p class="key" slot="key">胜率</p>
          </i-circle>
          <div class="title" slot="title">{{activePlayerB.win_count || 0}}胜 {{activePlayerB.lose_count || 0}}败</div>
        </div>

        <div class="com-wrap">
          <div class="com-box" :class="{'l-max': getCompare('left', 'TeamPercent'), 'r-max': getCompare('right', 'TeamPercent')}">
            <div class="row">
              <div class="result l-r fll">{{activePlayerA.TeamPercent || '0'}}%</div>
              <div class="result r-r flr">{{activePlayerB.TeamPercent || '0'}}%</div>
              <div class="mid-title">参团率</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="teamPercentA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="teamPercentB"></div></div>
            </div>
          </div>
          <div class="com-box" :class="{'l-max': getCompare('left', 'KDA'), 'r-max': getCompare('right', 'KDA')}">
            <div class="row">
              <div class="result l-r fll"><span class="val">{{activePlayerA.KDA || '0'}}</span><span class="kda">({{activePlayerA.AVERAGE_KILLS || '0'}}/{{activePlayerA.AVERAGE_DEATHS || '0'}}/{{activePlayerA.AVERAGE_ASSISTS || '0'}})</span></div>
              <div class="result r-r flr"><span class="kda">({{activePlayerB.AVERAGE_KILLS || '0'}}/{{activePlayerB.AVERAGE_DEATHS || '0'}}/{{activePlayerB.AVERAGE_ASSISTS || '0'}})</span><span class="val">{{activePlayerB.KDA || '0'}}</span></div>
              <div class="mid-title">KDA</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="kdaA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="kdaB"></div></div>
            </div>
          </div>
          <div class="com-box" v-show="activePid == '4'" :class="{'l-max': getCompare('left', 'neutralMinionsKilled_rate'), 'r-max': getCompare('right', 'neutralMinionsKilled_rate')}">
            <div class="row">
              <div class="result l-r fll">{{activePlayerA.neutralMinionsKilled_rate || '0.0'}}%</div>
              <div class="result r-r flr">{{activePlayerB.neutralMinionsKilled_rate || '0.0'}}%</div>
              <div class="mid-title">野区控制</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="{width: parseFloat(activePlayerA.neutralMinionsKilled_rate) > 100 ? '100%' : activePlayerA.neutralMinionsKilled_rate}"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="{width: parseFloat(activePlayerB.neutralMinionsKilled_rate) > 100 ? '100%' : activePlayerB.neutralMinionsKilled_rate}"></div></div>
            </div>
          </div>
          <div class="com-box" v-show="activePid == '4' || activePid == '5'" :class="{'l-max': getCompare('left', 'MINUTE_WARDSPLACED'), 'r-max': getCompare('right', 'MINUTE_WARDSPLACED')}">
            <div class="row">
              <div class="result l-r fll">{{activePlayerA.MINUTE_WARDSPLACED}}</div>
              <div class="result r-r flr">{{activePlayerB.MINUTE_WARDSPLACED}}</div>
              <div class="mid-title">视野控制</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="eyesRateA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="eyesRateB"></div></div>
            </div>
          </div>
          <div class="com-box" v-show="activePid == '3' || activePid == '5'" :class="{'l-max': getCompare('left', 'totalDamageTaken'), 'r-max': getCompare('right', 'totalDamageTaken')}">
            <div class="row">
              <div class="result l-r fll">{{activePlayerA.totalDamageTaken || '0'}}</div>
              <div class="result r-r flr">{{activePlayerB.totalDamageTaken || '0'}}</div>
              <div class="mid-title">分均承伤</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="minuteDamageTakenA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="minuteDamageTakenB"></div></div>
            </div>
          </div>
          <div class="com-box" v-show="activePid == '1' || activePid == '2' || activePid == '3'" :class="{'l-max': getCompare('left', 'MINUTE_DAMAGEDEALT'), 'r-max': getCompare('right', 'MINUTE_DAMAGEDEALT')}">
            <div class="row">
              <div class="result l-r fll">{{activePlayerA.MINUTE_DAMAGEDEALT || '0'}}</div>
              <div class="result r-r flr">{{activePlayerB.MINUTE_DAMAGEDEALT || '0'}}</div>
              <div class="mid-title">分均输出</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="minuteDamageA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="minuteDamageB"></div></div>
            </div>
          </div>
          <div class="com-box" v-show="activePid == '1' || activePid == '2'" :class="{'l-max': getCompare('left', 'DamageDealPercent'), 'r-max': getCompare('right', 'DamageDealPercent')}">
            <div class="row">
              <div class="result l-r fll">{{activePlayerA.DamageDealPercent || '0'}}%</div>
              <div class="result r-r flr">{{activePlayerB.DamageDealPercent || '0'}}%</div>
              <div class="mid-title">伤害转化率</div>
            </div>
            <div class="row cl">
              <div class="data-bar l-bar fll"><div class="rate-bar flr" :style="damageDealPercentA"></div></div>
              <div class="data-bar r-bar flr"><div class="rate-bar fll" :style="damageDealPercentB"></div></div>
            </div>
          </div>
        </div>
      </div>

      <div class="use-hero">
        <div class="hero-wrap fll">
          <ul class="hero-list">
            <li class="item-hero fll" v-for="hero in heroListA" :key="hero.heroID">
              <img class="hero-avatar" :src="hero.hero_image" />
              <div class="result">{{hero.win}}/{{hero.lose}}</div>
            </li>
          </ul>
          <div class="line"></div>
        </div>
        <div class="hero-wrap flr">
          <div class="line"></div>
          <ul class="hero-list r-list">
            <li class="item-hero flr" v-for="hero in heroListB" :key="hero.heroID">
              <img class="hero-avatar" :src="hero.hero_image" />
              <div class="result">{{hero.win}}/{{hero.lose}}</div>
            </li>
          </ul>
        </div>
        <div class="mid-tips">
          <p>常用英雄</p>
          <p>胜 / 负</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    components: {
    },
    props: {
      playerData: {
        type: Array,
        default: []
      },
      matchInfo: {
        type: Object,
        default: {}
      }
    },
    data: function () {
      return {
        activePid: '3',
        activeIndexA: 0,
        activeIndexB: 0,
        positions: [
          {pid: '3', name: '上单', index: 0},
          {pid: '4', name: '打野', index: 1},
          {pid: '2', name: '中单', index: 2},
          {pid: '1', name: 'ADC', index: 3},
          {pid: '5', name: '辅助', index: 4}
        ],
        chart: null
      };
    },
    filters:{
      pFloat: function (val) {
        var _val = val || 0;
        return _val != 0 ? parseFloat(_val) : _val;
      },
      pInt: function (val) {
        return parseInt(val || 0);
      },
    },
    computed: {
      teamAId: function () {
        return this.matchInfo.teamID_a;
      },
      teamBId: function () {
        return this.matchInfo.teamID_b;
      },
      teamA: function () {
        var _this = this;
        return this.playerData.filter(function (item) {
          return item.teamID == _this.teamAId;
        })
      },
      teamB: function () {
        var _this = this;
        return this.playerData.filter(function (item) {
          return item.teamID == _this.teamBId;
        })
      },
      teamAplayersOfPosition: function () {
        var _this = this;
        return this.teamA.filter(function (item) {
          return item.positionID == _this.activePid;
        });
      },
      teamBplayersOfPosition: function () {
        var _this = this;
        return this.teamB.filter(function (item) {
          return item.positionID == _this.activePid;
        });
      },
      activePlayerA: function () {
        return this.teamAplayersOfPosition[this.activeIndexA] || {};
      },
      activePlayerB: function () {
        return this.teamBplayersOfPosition[this.activeIndexB] || {};
      },
      recentGames: function () {
        var list = this.activePlayerA['win_lose'] || [];
        return list.reverse();
      },
      maxData: function () {
        var _maxData = this.matchInfo.max_data || {};
        return {
          'MINUTE_ECONOMIC': _maxData['MINUTE_ECONOMIC'] || 0,
          'AVERAGE_KILLS': _maxData['AVERAGE_KILLS'] || 0,
          'AVERAGE_Life': _maxData['AVERAGE_Life'] || 0,
          'AVERAGE_ASSISTS': _maxData['AVERAGE_ASSISTS'] || 0,
          'AVERAGE_MinionsKilled': _maxData['AVERAGE_MinionsKilled'] || 0,
          'MINUTE_WARDSPLACED': _maxData['MINUTE_WARDSPLACED'] || 0,
        };
//        return {
//          'MINUTE_ECONOMIC': '506.3',
//          'AVERAGE_KILLS': '6.5',
//          'AVERAGE_Life': '18553.6',
//          'AVERAGE_ASSISTS': '13.1',
//          'AVERAGE_MinionsKilled': '358.6',
//          'MINUTE_WARDSPLACED': '2.4',
//        }
      },
      netChartDataA: function () {
        var _this = this;
        var maxVal = 0;
        var val = 0;
        return Object.keys(this.maxData).map(function (key) {
          maxVal = parseFloat(_this.maxData[key]);
          val = parseFloat(_this.activePlayerA[key] || 0);
          return maxVal == 0 ? 1 : val / maxVal > 1 ? 1: parseFloat((val / maxVal).toFixed(2))
        });
      },
      netChartDataB: function () {
        var _this = this;
        var maxVal = 0;
        var val = 0;
        return Object.keys(this.maxData).map(function (key) {
          maxVal = parseFloat(_this.maxData[key]);
          val = parseFloat(_this.activePlayerB[key] || 0);
          return maxVal == 0 ? 1 : val / maxVal > 1 ? 1: parseFloat((val / maxVal).toFixed(2))
        });
      },
      heroListA: function () {
        return this.activePlayerA.hero_win_lose || []
      },
      heroListB: function () {
        return this.activePlayerB.hero_win_lose || []
      },
      kdaA: function () {
        var sum = parseFloat(this.activePlayerA.KDA || 0) + parseFloat(this.activePlayerB.KDA || 0);
        return {
          width: (sum > 0 ? parseFloat(this.activePlayerA.KDA || 0) / sum * 100 : 0) + '%'
        }
      },
      kdaB: function () {
        var sum = parseFloat(this.activePlayerA.KDA || 0) + parseFloat(this.activePlayerB.KDA || 0);
        return {
          width: (sum > 0 ? parseFloat(this.activePlayerB.KDA || 0) / sum * 100 : 0) + '%'
        }
      },
      teamPercentA: function () {
        var sum = parseFloat(this.activePlayerA.TeamPercent || 0) + parseFloat(this.activePlayerB.TeamPercent || 0);
        return {
          width: (sum > 0 ? parseFloat(this.activePlayerA.TeamPercent || 0) / sum * 100 : 0) + '%'
        }
      },
      teamPercentB: function () {
        var sum = parseFloat(this.activePlayerA.TeamPercent || 0) + parseFloat(this.activePlayerB.TeamPercent || 0);
        return {
          width: (sum > 0 ? parseFloat(this.activePlayerB.TeamPercent || 0) / sum * 100 : 0) + '%'
        }
      },
      minuteDamageTakenA: function () {
        var sum = parseFloat(this.activePlayerA.totalDamageTaken || 0) + parseFloat(this.activePlayerB.totalDamageTaken || 0);
        return {
          width: (sum > 0 ? parseFloat(this.activePlayerA.totalDamageTaken || 0) / sum * 100 : 0) + '%'
        }
      },
      minuteDamageTakenB: function () {
        var sum = parseFloat(this.activePlayerA.totalDamageTaken || 0) + parseFloat(this.activePlayerB.totalDamageTaken || 0);
        return {
          width: (sum > 0 ? parseFloat(this.activePlayerB.totalDamageTaken || 0) / sum * 100 : 0) + '%'
        }
      },
      minuteDamageA: function () {
        var sum = parseFloat(this.activePlayerA.MINUTE_DAMAGEDEALT || 0) + parseFloat(this.activePlayerB.MINUTE_DAMAGEDEALT || 0);
        return {
          width: (sum > 0 ? parseFloat(this.activePlayerA.MINUTE_DAMAGEDEALT || 0) / sum * 100 : 0) + '%'
        }
      },
      minuteDamageB: function () {
        var sum = parseFloat(this.activePlayerA.MINUTE_DAMAGEDEALT || 0) + parseFloat(this.activePlayerB.MINUTE_DAMAGEDEALT || 0);
        return {
          width: (sum > 0 ? parseFloat(this.activePlayerB.MINUTE_DAMAGEDEALT || 0) / sum * 100 : 0) + '%'
        }
      },
      damageDealPercentA: function () {
        var sum = parseFloat(this.activePlayerA.DamageDealPercent || 0) + parseFloat(this.activePlayerB.DamageDealPercent || 0);
        return {
          width: (sum > 0 ? parseFloat(this.activePlayerA.DamageDealPercent || 0) / sum * 100 : 0) + '%'
        }
      },
      damageDealPercentB: function () {
        var sum = parseFloat(this.activePlayerA.DamageDealPercent || 0) + parseFloat(this.activePlayerB.DamageDealPercent || 0);
        return {
          width: (sum > 0 ? parseFloat(this.activePlayerB.DamageDealPercent || 0) / sum * 100 : 0) + '%'
        }
      },
//      eyesValueA: function () {
//        return parseFloat(this.activePlayerA.wardsKilled || 0) + parseFloat(this.activePlayerA.wardsPlaced || 0);
//      },
//      eyesValueB: function () {
//        return parseFloat(this.activePlayerB.wardsKilled || 0) + parseFloat(this.activePlayerB.wardsPlaced || 0);
//      },
      eyesRateA: function () {
        var sum = parseFloat(this.activePlayerA.MINUTE_WARDSPLACED || 0) + parseFloat(this.activePlayerB.MINUTE_WARDSPLACED || 0);
        return {
          width: (sum > 0 ? parseFloat(this.activePlayerA.MINUTE_WARDSPLACED || 0) / sum * 100 : 0) + '%'
        };
//        var sum = this.eyesValueA + this.eyesValueB;
//        return (sum > 0 ? this.eyesValueA / sum * 100 : 0) + '%';
      },
      eyesRateB: function () {
        var sum = parseFloat(this.activePlayerA.MINUTE_WARDSPLACED || 0) + parseFloat(this.activePlayerB.MINUTE_WARDSPLACED || 0);
        return {
          width: (sum > 0 ? parseFloat(this.activePlayerB.MINUTE_WARDSPLACED || 0) / sum * 100 : 0) + '%'
        };
//        var sum = this.eyesValueA + this.eyesValueB;
//        return (sum > 0 ? this.eyesValueB / sum * 100 : 0) + '%';
      }
//      sumWardsKilledAndWardsPlaced: function () {
//        var result = 0;
//        this.playerData.forEach(function (item) {
//          result += (parseFloat(item.wardsKilled || 0) + parseFloat(item.wardsPlaced || 0));
//        });
//        return result;
//      }
    },
    mounted: function () {
//      console.log(this.playerData);
//      console.log(this.netChartDataA);
//      console.log(this.netChartDataB);
//      console.log(this.sumWardsKilledAndWardsPlaced);
    },
    methods: {
      getCompare: function (pos, key) {
        if (pos == 'left') return parseFloat(this.activePlayerA[key] || 0) > parseFloat(this.activePlayerB[key] || 0);
        if (pos == 'right') return parseFloat(this.activePlayerB[key] || 0) > parseFloat(this.activePlayerA[key] || 0);
      },
      getEyesCompare: function (pos) {
        if (pos == 'left') return this.eyesValueA > this.eyesValueB;
        if (pos == 'right') return this.eyesValueB > this.eyesValueA;
      },
      togglePosition: function (id) {
        if (this.activePid == id) return;
        this.activePid = id;
        this.activeIndexA = 0;
        this.activeIndexB = 0;
//        console.log(this.activePid);
      },
      togglePlayer: function (player, i) {
        if (player.teamID == this.teamAId) {
          this.activeIndexA = i;
          console.log('playerA: ' + this.activeIndexA);
        }
        if (player.teamID == this.teamBId) {
          this.activeIndexB = i;
          console.log('playerB: ' + this.activeIndexB);
        }
      }
    }
  };
</script>

<style lang="stylus" scoped>
  .player-comparison-box {
    .data-wrap {
      padding 16px 26px 24px
    }
    .com-box {
      .mid-title {
        width 90px !important
      }
    }
    .position-menu {
      width: 100%
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
      &.p4 {
        .item {
          &:first-of-type {
            border-right 1px solid transparent
          }
          &:nth-of-type(3) {
            border-left 1px solid transparent
          }
        }
      }
      &.p1 {
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
    .top-content {
      width: 100%
      margin-top 18px
      .player-wrap {
        width calc((100% - 210px) / 2)
        &.team-r {
          .player-list {
            .player-item {
              + .player-item {
                margin-left 0
                margin-right 8px
              }
            }
          }
          .focus-player {
            .name {
              text-align right
            }
          }
          .recent-game {
            .last-date {
              text-align right
            }
          }
        }
      }
      .player-list {
        min-width: 32px
        height: 32px
        .player-item {
          width: 32px
          height: 32px
          background: linear-gradient(180deg, rgba(235, 235, 237, 1) 0%, rgba(250, 250, 250, 1) 100%);
          cursor pointer
          position relative
          opacity .4
          overflow visible
          + .player-item {
            margin-left 8px
          }
          img {
            border-radius 50%
          }
          .pop-name {
            display: none;
            white-space: nowrap;
            min-width: 80px;
            padding: 0 12px;
            height: 30px;
            line-height: 30px;
            text-align: center;
            background: #373a41;
            box-shadow: 0 6px 16px 0 rgba(0,0,0,0.12);
            border-radius: 2px;
            font-size: 12px;
            color: #f9f9fa;
            font-family: 'Industry-Bold';
            position: absolute;
            top: -41px;
            left: 50%;
            transform translate(-50%, 0);
            z-index 1
            &:before {
              display: block;
              content: '';
              width: 0;
              height: 0;
              border-bottom: 10px solid #373A41;
              border-right: 10px solid transparent;
              position: absolute;
              top: 23px;
              left: calc(50% - 5px);
              transform: rotate(-45deg);
            }
          }
          &.active {
            opacity 1
            cursor default
          }
          &:hover {
            opacity 1
            .pop-name {
              display block
            }
          }
        }
        &:hover {
          .player-item {
            &:not(:hover) {
              opacity .4
            }
          }
        }
      }
      .focus-player {
        width 100%
        overflow hidden
        margin-top 18px
        .avatar {
          width: 84px
          height: 84px
          background: linear-gradient(180deg, rgba(235, 235, 237, 1) 0%, rgba(250, 250, 250, 1) 100%);
        }
        .name {
          width calc(100% - 84px)
          padding 19px 18px 0
          color: #2D2F33
          overflow hidden
          .en {
            height: 29px;
            font-size: 24px;
            font-family: 'Industry-Bold';
            line-height: 29px;
            overflow hidden
            white-space nowrap
            text-overflow ellipsis
          }
          .cn {
            height: 18px;
            font-size: 13px;
            font-weight: 400;
            line-height: 18px;
          }
          img {
            display inline-block
            height: 13px
            margin-left 4px
            margin-right 4px
            margin-top -4px
          }
        }
      }
      .recent-game {
        width: 100%
        height: 50px
        margin-top 13px
        .game-list {
          width: 100%
          height: 27px
          padding-bottom 6px
        }
        .bottom-line {
          width:82px;
          height:1px;
          background #EBEBED
          position relative
          &:before {
            display: block;
            content: '';
            position: absolute;
            top -3px;
            border-bottom: 4px solid #D2D4D9
            border-left: 4px solid transparent;
            border-right: 4px solid transparent;
            z-index: 1;
          }
          &:after {
            display: block;
            content: '';
            position: absolute;
            border-bottom: 3px solid #fff;
            border-left: 3px solid transparent;
            border-right: 3px solid transparent;
            top -2px;
            z-index: 2;
          }
          &.l-line {
            &:before{
              left: 6px;
            }
            &:after {
              left 7px;
            }
          }
          &.r-line {
            &:before{
              right: 6px;
            }
            &:after {
              right 7px;
            }
          }
        }
        .game-item {
          width: 20px
          height: 20px
          border-radius 50%
          background #F0F1F2
          color #A8ABB3
          font-size: 13px;
          font-family: 'Industry-Bold';
          line-height: 18px;
          position relative
          text-align center
          + .game-item {
            margin-left 4px
          }

          &.win {
            background #FAF3E6
            color #CDB99C
          }
        }
        .last-date {
          width: 100%
          height: 17px;
          font-size: 12px;
          font-weight: 500;
          color: #A8ABB3
          line-height: 17px;
          margin-top 6px
        }
      }
      .net-chart {
        width: 200px
        height: 200px
        margin 7px auto 0
      }
    }

    .data-content {
      width: 100%
      padding 10px 12px 24px
      border-bottom none

      .chart-wrap {
        width: 100px
        padding-top 10px

        .val{
          font-size: 24px;
          color: #2d2f33;
          font-family: 'Industry-Bold';
        }

        .title{
          margin-top 12px
          text-align: center;
          color: #2d2f33;
          height: 20px;
          font-size: 14px;
          font-weight: 600;
          line-height: 20px;
        }
      }
      .com-wrap {
        width calc(100% - 200px)
        margin 0 auto
      }
      .com-box {
        + .com-box {
          margin-top 12px
        }
      }
    }
    .use-hero {
      width: 100%
      overflow hidden
      .hero-wrap {
        width: calc((100% - 110px) / 2)
        height: 48px
        display flex
        justify-content space-between
        align-items center
        .line {
          height 1px
          background rgba(0, 0, 0, 0.06);
          flex-grow 6
        }
      }
      .hero-list {
        flex-grow 1
        &.r-list {
          .item-hero + .item-hero {
            margin-left 0
            margin-right 8px
          }
        }
      }
      .item-hero {
        text-align center
        + .item-hero {
          margin-left 8px
        }
        .hero-avatar {
          display block
          width: 30px
          height: 30px
          border-radius 50%
        }
        .result {
          height: 14px;
          font-size: 12px;
          font-family: 'Industry-Demi';
          font-weight: normal;
          color: #2D2F33
          line-height: 13px;
          margin-top 4px
        }
      }
      .mid-tips {
        width: 60px
        text-align center
        position relative
        margin 7px auto
        P:nth-of-type(1) {
          height: 20px;
          font-size: 14px;
          font-weight: 600;
          color: #2D2F33
          line-height: 20px;
        }
        P:nth-of-type(2) {
          height: 17px;
          font-size: 12px;
          font-weight: 600;
          color: #A8ABB3
          line-height: 17px;
          margin-top 1px
        }
      }
    }
  }
</style>
