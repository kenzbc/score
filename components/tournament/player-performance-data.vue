<template>
  <div class="attr-data cl">
    <div class="cols">
      <div class="attr-block">
        <p class="val">{{playerModeData.average_kills || ''}}</p>
        <p class="key">场均击杀</p>
        <div class="t-rank">联赛第<span>{{playerModeData.kills_ranking || '-'}}</span></div>
      </div>
      <div class="attr-block">
        <p class="val">{{playerModeData.average_deaths || ''}}</p>
        <p class="key">场均死亡</p>
        <div class="t-rank">联赛第<span>{{playerModeData.deaths_ranking || '-'}}</span></div>
      </div>
      <div class="attr-block">
        <p class="val">{{playerModeData.average_assists || ''}}</p>
        <p class="key">场均助攻</p>
        <div class="t-rank">联赛第<span>{{playerModeData.assists_ranking || '-'}}</span></div>
      </div>
    </div>
    <div class="cols">
      <div class="attr-block">
        <p class="val">{{playerModeData.average_hits || ''}}</p>
        <p class="key">分均补刀</p>
        <div class="t-rank">联赛第<span>{{playerModeData.hits_ranking || '-'}}</span></div>
      </div>
      <div class="attr-block">
        <p class="val">{{playerModeData.average_damageDealt || ''}}</p>
        <p class="key">分均伤害</p>
        <div class="t-rank">联赛第<span>{{playerModeData.damageDealt_ranking || '-'}}</span></div>
      </div>
      <div class="attr-block">
        <p class="val">{{playerModeData.average_damageTaken || ''}}</p>
        <p class="key">分均承伤</p>
        <div class="t-rank">联赛第<span>{{playerModeData.damageTaken_ranking || '-'}}</span></div>
      </div>
    </div>
    <div class="cols">
      <div class="attr-block">
        <p class="val">{{playerModeData.average_money || ''}}</p>
        <p class="key">分均经济</p>
        <div class="t-rank">联赛第<span>{{playerModeData.money_ranking || '-'}}</span></div>
      </div>
      <div class="attr-block">
        <p class="val">{{playerModeData.average_wardsKilled || ''}}</p>
        <p class="key">场均排眼</p>
        <div class="t-rank">联赛第<span>{{playerModeData.wardsKilled_ranking || '-'}}</span></div>
      </div>
      <div class="attr-block">
        <p class="val">{{playerModeData.average_wardsPlaced || ''}}</p>
        <p class="key">场均插眼</p>
        <div class="t-rank">联赛第<span>{{playerModeData.wardsPlaced_ranking || '-'}}</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      playerModeData: {
        type: Object,
        default: {}
      },
    },
    data() {
      return {

      }
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~static/static/css/variable.styl"

  .attr-data {
    width: 100%
    margin-top 26px
    .cols {
      width calc(100% / 3)
      float left
      + .cols {
        border-left 1px solid #F0F1F2
      }
      .attr-block {
        text-align center
        .val {
          height: 22px
          line-height 22px
          font-size 18px
          font-family 'Industry-Bold'
        }
        .key {
          font-size 13px
          font-weight 400
          color $color-gray-2
          height: 18px
          line-height 18px
          margin-top 1px
        }
        .t-rank {
          width: 92px
          height: 21px
          margin 0 auto
          border-radius 11px
          background #F7F8FA
          color $color-gray-1
          margin-top 3px
          font-weight 400
          line-height 20px
          font-size 12px
          span {
            color $color-blue
            margin-left 5px
            font-weight 600
          }
        }
        + .attr-block {
          margin-top 15px
        }
      }
    }
  }
</style>
