<template>
  <div class="tournament-list cl" v-if="tournamentData.list">
    <div class="item-box" v-for="(item, index) in tournamentData.list" :key="index">
      <div class="item-content">
        <nuxt-link :to="`/match_pc?tournamentID=${item.tournamentID}`" target="_blank"><img class="tournament-logo fll" :src="item.image_thumb || '//img1.famulei.com/common/images/index/img_null.png'"></nuxt-link>
        <div class="info fll">
          <p class="tournament-title"><nuxt-link :to="`/tournament_list/${item.tournamentID}`" target="_blank">{{item.name || ''}}</nuxt-link></p>
          <p class="tournament-date">{{item.start_date || ''}} ~ {{item.end_date || ''}}</p>
          <span class="status" :class="{wait: item.status == 0, gaming: item.status == 1, end: item.status == 2 }">{{item.status == 0 ? '即将开始' : item.status == 1 ? '进行中' : '已结束'}}</span>
        </div>
      </div>
    </div>
    <no-data tip="暂无赛事" :show="tournamentData.list.length === 0" />
  </div>
</template>

<script>

  export default {
    data() {
      return {}
    },
    props: {
      tournamentData: {
        type: Object,
        default: {}
      }
    },
    mounted() {
      console.log(this.tournamentData)
    },
    methods: {
      selectMenu(item) {
        this.$emit('selectMenu', item)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .tournament-list {
    width 100%
    min-height 500px
    padding 0 14px;
    position relative;
    .item-box {
      width: calc(100% / 3)
      float: left;
      padding 15px 0

      &.null-item {
        width: 100%
        padding 200px 0
        .tip {
          width: 200px
        }
      }

      .item-content {
        width: 280px;
        height: 80px
        margin 0 auto
      }
      .tournament-logo {
        width: 80px
        height: 80px
      }
      .info {
        width calc(100% - 80px)
        height 100%
        padding-top 8px
        padding-left 14px
        .tournament-title {
          font-size: 16px;
          color: #2D2F33;
          font-weight 600
          margin-bottom 9px
          white-space nowrap
          overflow hidden
          text-overflow ellipsis
        }
        .tournament-date {
          font-size: 12px;
          color: #A8ABB3;
          margin-bottom 10px
        }
        .status {
          padding 2px 8px
          font-size 12px
          border-radius 4px
          color #fff;
          &.gaming {
            background: #0D8DFC;
          }
          &.wait {
            background: #16DE9B;
          }
          &.end {
            background: #A8ABB3;
          }
        }
      }
    }
  }

  @media screen and (max-width: 1200px) {

  }

  @media screen and (max-width: 768px) {

  }

  @media screen and (max-width: 600px) {

  }
</style>
