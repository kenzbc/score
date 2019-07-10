<template>
  <div class="piece best-group">
    <div class="tools-bar cl">
      <h2 class="fll">最佳阵容</h2>
      <div class="menu flr">
        <!--时间选择-->
        <Select class="select-component flr" :placeholder="currText" @on-change="toggleDate">
          <Option v-for="item in bestGroup.select" :value="item.cacheID" :key="item.cacheID">{{ item.name }}</Option>
        </Select>
      </div>
    </div>
    <ul class="best-player-list cl">
      <li class="item-wrap" v-for="(item, index) in currBestGroup" :key="index">
        <div class="player-item">
          <div class="avatar-wrap">
            <nuxt-link :to="`/data/player/${item.playerID || ''}`" target="_blank"><img class="player-avatar" :src="item.player_image_thumb" alt="" /></nuxt-link>
            <span class="team-logo">
              <nuxt-link :to="`/data/team/${item.teamID || ''}`" target="_blank"><img :src="item.team_image_thumb" alt="" /></nuxt-link>
            </span>
          </div>
          <div class="player-data">
            <p class="name"><nuxt-link :to="`/data/player/${item.playerID || ''}`" target="_blank">{{item.nickname || ''}}</nuxt-link></p>

            <kda-bar :kda="item.KDA" :kills="parseInt(item.kills)" :deaths="parseInt(item.deaths)" :assists="parseInt(item.assists)" />

            <div class="join-rate-bar"><span class="inner-bar" :style="{width: `${(item.offered_rate || 0) > 100 ? 100 : item.offered_rate || 0}%`, transition: transitionStyle}"></span></div>
            <p class="join-rate"><span>{{item.offered_rate || 0}}%</span>场均参团率</p>

            <div v-if="index === 0">
              <div class="attribute"><span class="fll">场均承伤占比</span><span class="flr">{{item.damageTaken_rate || ''}}%</span></div>
              <div class="attribute"><span class="fll">场均伤害占比</span><span class="flr">{{item.damageDealt_rate || ''}}%</span></div>
              <div class="attribute"><span class="fll">分均伤害</span><span class="flr">{{item.damageDealt_m || ''}}</span></div>
              <div class="attribute"><span class="fll">分均补刀</span><span class="flr">{{item.hits_m || ''}}</span></div>
            </div>
            <div v-else-if="index === 1">
              <div class="attribute"><span class="fll">场均承伤占比</span><span class="flr">{{item.damageTaken_rate || ''}}%</span></div>
              <div class="attribute"><span class="fll">控野率</span><span class="flr">{{item.neutralMinionsKilled_rate || ''}}%</span></div>
              <div class="attribute"><span class="fll">分均排眼</span><span class="flr">{{item.wardsKilled_m || ''}}</span></div>
              <div class="attribute"><span class="fll">分均伤害</span><span class="flr">{{item.damageDealt_m || ''}}</span></div>
            </div>
            <div v-else-if="index === 2">
              <div class="attribute"><span class="fll">场均伤害占比</span><span class="flr">{{item.damageDealt_rate || ''}}%</span></div>
              <div class="attribute"><span class="fll">场均伤害转化率</span><span class="flr">{{item.DTR || 0}}%</span></div>
              <div class="attribute"><span class="fll">分均伤害</span><span class="flr">{{item.damageDealt_m || ''}}</span></div>
              <div class="attribute"><span class="fll">分均补刀</span><span class="flr">{{item.hits_m || ''}}</span></div>
            </div>
            <div v-else-if="index === 3">
              <div class="attribute"><span class="fll">场均伤害占比</span><span class="flr">{{item.damageDealt_rate || ''}}%</span></div>
              <div class="attribute"><span class="fll">场均伤害转化率</span><span class="flr">{{item.DTR || 0}}%</span></div>
              <div class="attribute"><span class="fll">分均伤害</span><span class="flr">{{item.damageDealt_m || ''}}</span></div>
              <div class="attribute"><span class="fll">分均补刀</span><span class="flr">{{item.hits_m || ''}}</span></div>
            </div>
            <div v-else>
              <div class="attribute"><span class="fll">场均承伤占比</span><span class="flr">{{item.damageTaken_rate || ''}}%</span></div>
              <div class="attribute"><span class="fll">分均插眼</span><span class="flr">{{item.wardsPlaced_m || ''}}</span></div>
              <div class="attribute"><span class="fll">分均排眼</span><span class="flr">{{item.wardsKilled_m || ''}}</span></div>
              <div class="attribute"><span class="fll">分均购买控制守卫</span><span class="flr">{{item.visionWardsBoughtInGame_m || ''}}</span></div>
            </div>
          </div>
          <div class="c-s"><svg class="icon pos" aria-hidden="true"><use :xlink:href="positions[item.positionID].icon"></use></svg><span class="text">{{item.position_name || ''}} 评分:</span><span class="score">{{item.f_score || ''}}</span></div>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import kdaBar from "./kda-bar"

  export default {
    components: {kdaBar},
    props: {
      bestGroupData: {
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
//        bestGroup: Object.assign({}, this.bestGroupData),
        bestGroup: {
          params: Object.assign({}, this.bestGroupData.params),
          currIndex: this.bestGroupData.currIndex,
          select: [].concat(this.bestGroupData.select),
          groups: Object.assign({}, this.bestGroupData.groups)
        },
        currBestGroup: [].concat(this.bestGroupData.groups[this.bestGroupData.params.cacheID] || []),
        transitionStyle: 'width 0.3s'
      }
    },
    computed: {
      currText() {
        return this.bestGroup.currIndex !== -1 ? this.bestGroup.select[this.bestGroup.currIndex].name || '' : '无'
      }
    },
    methods: {
      async toggleDate(val) {
        this.bestGroup.params.cacheID = val
        if (!this.bestGroup.groups[val] || this.bestGroup.groups[val] && this.bestGroup.groups[val].length === 0) await this.getGroup()
        this.currBestGroup = this.bestGroup.groups[val]
      },
      async getGroup() {
        const data = (await this.$api.tournament.weekBestGroup({params: this.bestGroup.params})).data || {}
        this.bestGroup.groups[this.bestGroup.params.cacheID] = data.list || []
      }
    },
    mounted() {
//      console.log(this.bestGroup)
    }
  }
</script>

<style lang="stylus" scoped>
  @import "~static/static/css/variable.styl"
  .tools-bar {
    .menu {
      width: 190px
    }
  }

  .best-player-list {
    width: 100%
    padding: 12px 20px 20px
    .kda-wrap {
      margin-top 20px
    }
    .item-wrap {
      width: 20%
      float left
      .player-item {
        width: 160px
        margin 0 auto
      }
      .avatar-wrap {
        width: 160px
        height: 160px
        background-color #fbfbfb
        border-radius 50%
        position relative

        .player-avatar {
          width: 100%
          height: 100%
          border-radius 50%
        }

        .team-logo {
          display block
          width: 50px
          height: 50px
          background #fff
          border-radius 50%
          position absolute
          right 0
          bottom -5px
          > img {
            width: 36px
            height: 36px
            display block
            margin 7px auto
          }
        }
      }
      .player-data {
        width: 100%
        height: 295px
        .name {
          text-align center
          height: 24px
          line-height 24px
          font-family 'Industry-Demi'
          font-size 20px
          margin-top 8px
          ellipsis()
          a:hover {
            color: #2D2F33
          }
        }
        .join-rate-bar {
          width: 100%
          height: 10px
          background #f5f6f7
          border-radius 5px
          margin-top 8px
          .inner-bar {
            display block
            width: 0
            height: 100%
            background: linear-gradient(-135deg,rgba(92,157,255,1),rgba(78,101,245,1));
            box-shadow: 0 3px 8px -2px rgba(13,141,252,0.2);
            border-radius 5px
          }
        }
        .join-rate {
          height: 20px
          line-height 20px
          margin-top 4px
          font-size 12px
          white-space nowrap
          overflow hidden
          span {
            font-size 16px
            font-family 'Industry-Bold'
            margin-left 2px
            margin-right 12px
          }
        }
        .attribute {
          width: 100%
          height: 32px
          line-height 32px
          border-radius 16px
          background #F7F8FA
          padding 0 10px
          margin-top 10px
          white-space nowrap
          overflow hidden
          span {
            &:nth-child(1) {
              color $color-gray-1
              font-size 13px
            }
            &:nth-child(2) {
              font-size 16px
              font-family 'Industry-Bold'
            }
          }

        }
      }
      .c-s {
        width: 100%
        height: 32px
        border-radius 16px
        border: 1px solid #F0F1F2;
        padding-left 10px
        white-space nowrap
        overflow hidden
        margin-top 7px
        .icon {
          width: 16px
          height: 16px
          display inline-block
          vertical-align middle
        }
        span {
          display inline-block
          vertical-align middle
        }
        .text {
          font-size 13px
          font-weight 600
          color $color-gray-1
          padding-left: 5px
          padding-right 13px
        }
        .score {
          height: 100%
          line-height 28px
          font-size 17px
          font-family 'Industry-Demi'
          color $color-blue
        }
      }
    }
  }

</style>
