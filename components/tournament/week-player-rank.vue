<template>
  <!--一周选手榜-->
  <div class="piece players-wrap">
    <div class="content">
      <piece-header title="一周选手榜">
        <div class="header-bg-line"></div>
        <ul class="menu cl">
          <li class="m-item-wrap" :class="{'lfl-score': item.type == 'F_SCORE', 'kda': item.type == 'KDA'}" v-for="(item, index) in pieceHeaderMenu.list" :key="index" @click="toggleMenu(index)">
            <span class="m-item" :class="{active: pieceHeaderMenu.currIndex == index}">{{item.name}}<svg class="icon" aria-hidden="true"><use xlink:href="#icon-circle_blue"></use></svg></span>
          </li>
        </ul>
        <nuxt-link class="more flr" :to="`/tournament_player?tournamentID=${tournamentId}`">更多</nuxt-link>
      </piece-header>
      <div class="p-body cl">
        <div class="player-tab-wrap fll" v-if="playerList.length > 0">
          <div class="th cl">
            <div class="td">排名</div>
            <div class="td">选手</div>
            <div class="td">战队</div>
            <div class="td">{{currTabHeader.field_average}}</div>
            <div class="td">{{currTabHeader.field_total}}</div>
          </div>
          <div class="player-list-wrap nano">
            <ul class="tbody nano-content">
              <li class="tr" :class="`no-${i+1}${i === playerIndex ? ' active' : ''}`" v-for="(item, i) in playerList" :key="i" @click="togglePlayer(i)">
                <div class="p-item cl">
                  <div class="td">
                    <img v-if="i < 3" :src="`/images/tournament/no${i+1}.png`" alt=""/>
                    <span v-else>{{i + 1}}</span>
                  </div>
                  <div class="td"><img :src="item.player_image_thumb" alt=""/>{{item.nickname || ''}}</div>
                  <div class="td"><img :src="item.team_image_thumb" alt=""/></div>
                  <div class="td">{{item.average || '0'}}</div>
                  <div class="td">{{item.totalnum || '0'}}</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="player-data-box flr" v-if="playerList.length > 0">
          <div class="top-menu">
            <div class="menu-btn week-btn" :class="{active: dataMode === 'week'}" @click="toggleDataMode('week')">本周数据</div>
            <div class="menu-btn total-btn" :class="{active: dataMode === 'total'}" @click="toggleDataMode('total')">总数据</div>
          </div>

          <!--选手信息、KDA数据-->
          <player-kda-data :player="playerData" :player-mode-data="playerModeData" :index="playerIndex" :positions="positions" />

          <!--选手图表数据-->
          <player-chart-data ref="chart" :player-mode-data="playerModeData" :max-data="modeChartMaxData" />

          <!--选手排名数据-->
          <player-performance-data :player-mode-data="playerModeData" />
        </div>

        <!--无数据-->
        <no-data :show="playerList.length == 0" />

        <!--数据加载等待-->
        <!--<Spin size="large" fix v-if="loading">-->
          <!--<Loading :show="true" />-->
        <!--</Spin>-->
      </div>
    </div>
  </div>
</template>

<script>
  import playerKdaData from "./player-kda-data"
  import playerChartData from "./player-chart-data"
  import playerPerformanceData from "./player-performance-data"

  export default {
    components: {
      playerKdaData,
      playerChartData,
      playerPerformanceData
    },
    props: {
      playerRank: {
        type: Object,
        default: {}
      },
      positions: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        playerList: [].concat(this.playerRank.list || []),
        playerWholeData:{
          'KILLS': Object.assign({}, this.playerRank)
        },
        pieceHeaderMenu: {
          currIndex: 0,
          list: [
            {type: 'KILLS', name: '击杀'},
            {type: 'ASSISTS', name: '助攻'},
            {type: 'DEATHS', name: '死亡'},
            {type: 'HITS', name: '补刀'},
            {type: 'DAMAGEDEALT', name: '输出'},
            {type: 'DAMAGETAKEN', name: '承伤'},
            {type: 'F_SCORE', name: 'LFL评分'},
            {type: 'KDA', name: 'KDA'}
          ]
        },
        tabHeader: {
          'KILLS': {field_average: '场均击杀', field_total: '总击杀'},
          'ASSISTS': {field_average: '场均助攻', field_total: '总助攻'},
          'DEATHS': {field_average: '场均死亡', field_total: '总死亡'},
          'HITS': {field_average: '场均补刀', field_total: '总补刀'},
          'DAMAGEDEALT': {field_average: '场均输出', field_total: '总输出'},
          'DAMAGETAKEN': {field_average: '场均承伤', field_total: '总承伤'},
          'F_SCORE': {field_average: '平均分', field_total: '总分'},
          'KDA': {field_average: '平均KDA', field_total: '总KDA'}
        },
        playerIndex: 0,
        dataMode: 'week',
        loading: false
      }
    },
    computed: {
      // 赛事ID
      tournamentId() {
        return this.$route.params.id
      },
      // 数据类型
      dataType () {
        return this.pieceHeaderMenu.list[this.pieceHeaderMenu.currIndex].type
      },
      // 当前数据类型，选手列表表头字段数据
      currTabHeader() {
        return this.tabHeader[this.dataType] || {}
      },
      // 当前选手数据
      playerData() {
        return this.playerList[this.playerIndex] || {}
      },
      // 周数据或者总数据
      playerModeData() {
        return this.playerData[this.dataMode] || {}
      },
      // 图表最大数据
      modeChartMaxData() {
        return this.playerRank.max && this.playerRank.max[this.dataMode] || {}
      }
    },
    methods: {
      // 头部菜单切换
      async toggleMenu(i) {
        if (this.pieceHeaderMenu.currIndex === i) return
        this.pieceHeaderMenu.currIndex = i
        if (!this.playerWholeData[this.dataType]) await this.getPlayerRank(this.dataType)
        this.playerList = this.playerWholeData[this.dataType].list || []
        this.updateChart()
      },
      // 选手切换
      togglePlayer(i) {
        if (this.playerIndex === i) return
        this.playerIndex = i
        this.dataMode = 'week'
        this.updateChart()
      },
      // 周数据、总数据切换
      toggleDataMode(mode) {
        if (this.dataMode === mode) return
        this.dataMode = mode
        this.updateChart()
      },
      // 根据TYPE类型获得相应选手数据
      async getPlayerRank(type) {
        let data = (await this.$api.tournament.weekPlayerRank({params: {type: type, tournamentID: this.tournamentId}})).data || {}
        this.playerWholeData[type] = data
      },
      // 更新图表数据
      updateChart() {
        setTimeout(() => {
          this.$refs.chart.updateChart()
        }, 10)

      }
    },
    mounted() {
//      console.log(this.playerRank)
//      console.log(this.playerWholeData)
    }
  }
</script>

<style lang="stylus">
  @import "~static/static/css/variable.styl"

  .players-wrap {
    .piece-header {
      .menu {
        .m-item-wrap {
          width: 86px
          padding 0
          &:nth-of-type(1) {
            margin-left -25px
          }
          &.lfl-score {
            width 113px
          }
          &.kda {
            width 87px
          }
        }
      }
      .more {
        margin-top 18px;
        margin-right: 20px
        font-size: 16px;
        font-weight: 400;
        color: $color-gray-2
      }
    }
    .p-body {
      width: 100%
      position relative
      min-height 424px
    }
    .player-tab-wrap {
      width: 515px
      border-right 1px solid #F7F8FA
      padding-top 22px
      padding-bottom 24px
      .player-list-wrap {
        width: 100%
        height: 590px
        margin-top 10px
      }

      img {
        width: 30px
        height: 30px
        display block
      }
      .tbody {
        padding 0 24px
      }
      .td {
        height: 100%
        float: left
        text-align center
        font-size 13px
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
      }
      .th, .tr {
        .td {
          &:nth-of-type(1) {
            width: 13%
          }
          &:nth-of-type(2) {
            width: 35%
          }
          &:nth-of-type(3) {
            width: 15%
          }
          &:nth-of-type(4) {
            width: 18%
          }
          &:nth-of-type(5) {
            width: 19%
          }
        }
      }
      .th {
        width: calc(100% - (24px * 2))
        height: 32px
        line-height 32px
        border-radius 16px
        background-color #FCFCFC
        margin 0 auto
        .td {
          font-weight 400
          color $color-gray-1
          &:nth-of-type(2) {
            text-align left
            padding-left 47px
          }
        }
      }
      .tr {
        background: #fff;
        border: 1px solid #F5F6F7;
        border-radius: 25px;
        height: 50px
        line-height 48px
        overflow hidden

        .p-item {
          width: 100%
          height: 100%
          border-radius 25px
        }
        + .tr {
          margin-top 10px
        }
        &.no-1, &.no-2, &.no-3 {
          padding 1px
          border 0
          .p-item {
            border-radius 24px
            background #fff
          }
        }
        &.active {
          background: rgba(0, 0, 0, 0.03)
          border: 1px solid rgba(0, 0, 0, 0.06);
        }
        &.no-1 {
          background: linear-gradient(90deg, #F7EAD7, #FCF8ED);
          &.active {
            border 0;
            .p-item {
              background: linear-gradient(90deg, #FCF8F2, #FFFEFC);
            }
          }
        }
        &.no-2 {
          background: linear-gradient(90deg, #E6E6E8, #F5F6F7);
          &.active {
            border 0;
            .p-item {
              background: linear-gradient(90deg, #F2F3F5, #FDFDFD);
            }
          }
        }
        &.no-3 {
          background: linear-gradient(90deg, #F7E7DF, #FCF6F0);
          &.active {
            border 0;
            .p-item {
              background: linear-gradient(90deg, #FCF7F5, #FFFEFC);
            }
          }
        }
        .td {
          font-family 'Industry-Demi'
          &:nth-of-type(1) {
            img {
              margin 9px auto 0
            }
            span {
              display block
              width: 20px;
              height: 20px;
              background: linear-gradient(315deg, rgba(211, 213, 218, 1) 0%, rgba(168, 171, 179, 1) 100%);
              border-radius: 50%;
              margin 14px auto 0
              line-height 20px
              font-size 12px
              color #fff
            }
          }
          &:nth-of-type(2) {
            text-align left
            padding-left 4px
            font-family 'Industry-Bold'
            font-size 14px
            overflow hidden
            img {
              width: 36px
              height: 36px
              float left
              margin-top 6px
              margin-right 8px
              border-radius 50%
            }
          }
          &:nth-of-type(3) {
            img {
              margin 9px auto 0
            }
          }
        }
        &:not(.active) {
          cursor pointer
          &:hover {
            &.no-1, &.no-2, &.no-3 {
              padding 0
              background transparent
              border: 1px solid #F5F6F7

            }
            .p-item {
              background: rgba(0, 0, 0, 0.02);
            }
          }
        }
      }
    }
    .player-data-box {
      width: calc(100% - 515px)
      // visibility hidden
      &.show {
        visibility visible
      }
      .top-menu {
        width: 220px
        height: 30px
        margin 22px auto 6px
        overflow hidden
        .menu-btn {
          width: 50%
          height: 100%
          text-align center
          line-height 28px
          font-size 13px
          cursor pointer
          color $color-gray-1
          border: 1px solid #EBEBED;
          font-weight 400;
          &.week-btn {
            float left
            border-radius 15px 0 0 15px
            border-right 1px solid transparent
          }
          &.total-btn {
            float right
            border-radius 0 15px 15px 0
            border-left 1px solid transparent
          }
          &.active {
            border: 1px solid #BFDDFF
            background #F2F8FF
            color $color-blue
            font-weight 600
            cursor default
          }
          &:not(.active):hover {
            background #F5F6F7
          }
        }
      }

    }
  }

</style>
