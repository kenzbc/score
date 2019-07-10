<template>
  <div class="ranking-wrap fll">
    <div v-if="ranking.length > 0">
      <ul class="menu cl">
        <li class="item" :class="{active: index == rankTabIndex}" v-for="(item, index) in ranking" :key="index" v-if="index < 8" @click="toggleTab(index)">{{item.letter || '积分榜'}}</li>
      </ul>
      <div class="t-table-wrap">
        <div class="t-table" :class="{active: index == rankTabIndex}" v-for="(item, index) in ranking" :key="index" v-if="index < 8">
          <div class="th cl">
            <span class="td">积分排名</span>
            <span class="td">战队</span>
            <span class="td">胜负</span>
            <span class="td">积分</span>
            <span class="td">净胜分</span>
          </div>
          <div class="score-list-wrap nano" :style="`height: ${ranking.length > 4 ? '415px' : '450px'};`" v-if="item.list">
            <ul class="tbody nano-content">
              <li class="tr cl" v-for="(team, j) in item.list" :key="j">
                <span class="td">
                    <img v-if="j < 3" :src="`/images/tournament/no${j+1}.png`" alt=""/>
                    <template v-else>{{j + 1}}</template>
                </span>
                <span class="td"><nuxt-link :to="`/data/team/${team.team_id}`" target="_blank"><img :src="team.team_image" alt=""/>{{team.team_short_name || ''}}</nuxt-link></span>
                <span class="td">{{team.win || 0}}/{{team.los || 0}}</span>
                <span class="td">{{team.sort_one}}</span>
                <span class="td">{{team.sort_two}}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="no-ranking" v-else>暂无积分排名</div>
  </div>
</template>

<script>
  export default {
    name: "points-rank",
    props: {
      ranking: {
        type: Array,
        default: []
      }
    },
    data() {
      return {
        rankTabIndex: 0
      }
    },
    computed: {},
    mounted() {

    },
    methods: {
      toggleTab(i) {
        if (this.rankTabIndex == i) return
        this.rankTabIndex = i
      }
    },
    destroyed() {

    }
  }
</script>

<style lang="stylus" scoped>
  @import "~static/static/css/variable.styl"
  .ranking-wrap {
    width calc(100% - 641px)
    padding 6px 0
    .menu {
      padding 0 19px
      .item {
        float left
        width: 70px
        height: 26px
        line-height 26px
        text-align center
        background #F0F1F2
        color $color-gray-1
        font-size 12px
        border-radius 8px
        margin-top 10px
        cursor default
        ellipsis()
        + .item {
          margin-left 10px
        }
        &:nth-child(4n+1) {
          margin-left 0
        }
        &.active {
          background $color-blue
          color #fff
        }
        &:not(.active) {
          cursor pointer
        }
      }
    }

    .t-table-wrap {
    }

    .t-table {
      display none
      &.active {
        display block
      }
      img {
        width: 22px
        height: 22px
        display block
      }
      .tbody {
        padding 0 19px
      }
      .td {
        display block
        float: left
        text-align center
        font-size 13px
        color $color-gray-1
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
      }
      .th, .tr {
        width: 100%
        .td {
          &:nth-of-type(1) {
            width: 20%
          }
          &:nth-of-type(2) {
            width: 35%
          }
          &:nth-of-type(3) {
            width: 15%
          }
          &:nth-of-type(4) {
            width: 15%
          }
          &:nth-of-type(5) {
            width: 15%
          }
        }
      }
      .th {
        padding 15px 19px 10px
        .td {
          font-size 12px
        }
      }
      .tr {
        background: rgba(250, 250, 250, 1);
        border-radius: 8px;
        height: 40px
        line-height 40px
        + .tr {
          margin-top 8px
        }
        .td {
          font-family 'Industry-Demi'
          &:nth-of-type(1) {
            img {
              margin 0 auto
              margin-top 9px
            }
          }
          &:nth-of-type(2) {
            text-align left
            padding-left 4px
            font-family 'Industry-Bold'
            overflow hidden
            img {
              width: 29px
              height: 29px
              float left
              margin-right 8px
              margin-top 7px
            }
          }
        }
      }
    }
    .score-list-wrap {
      height: 415px
    }
    .no-ranking {
      text-align center
      margin-top 250px
      color #a8abb3
    }
  }

</style>
