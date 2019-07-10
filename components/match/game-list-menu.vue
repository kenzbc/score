<template>
  <div class="game-link-list" v-if="matchStatus != '0'">
    <div class="game-link" :class="{active: index == gameMenuCurrIndex}" v-for="(item, index) in afterGameList" :key="item.index" @click="toggleGame(index, item.resultID)">
      <span class="team-img" v-if="matchStatus == '2'"><img :src="item.team_image || $score.defaultScoreImg" alt="" v-if="item.team_image"  width="24" height="24"/></span>
      <span class="team-name">{{'GAME ' + (index + 1)}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'game-link-list',
    components: {},
    props: {
      matchStatus: {
        type: String,
        default: '0'
      },
      afterGameList: {
        type: Array,
        default: ()=>[]
      }
    },
    data: function () {
      return {
        gameMenuCurrIndex: 0,
      };
    },
    watch: {},
    computed: {
      // 赛后局数列表菜单
      afterGameMenu: function () {
        return this.afterGameList.map(function (item, index) {
          return {
            index: index,
            name: 'GAME ' + (index + 1)
          };
        });
      },
    },
    mounted() {
//      console.log(this.matchInfo);
    },
    methods: {
      toggleGame: function (i, resultId) {
        this.gameMenuCurrIndex = i;
        this.$emit('after-change-game-handler', resultId);
      }
    }
  };
</script>
<style lang="stylus" scoped>
  .game-link-list {
    width: 100%
    height: 47px
    line-height 44px
    text-align center
    background #fff
    box-shadow: 0 0 0 1px #ebebed;
    border-radius: 0 0 2px 2px;
    margin-top: 12px;

    .game-link {
      display inline-block
      height: 100%
      cursor pointer
      color #A8ABB3
      + .game-link {
        margin-left 22px
      }
      >>> .team-img {
        width: 24px
        height: 24px
        margin 0
        display: inline-block;
        vertical-align: middle;

        >>> img{
          display inline-block;
          width: 24px
          height: 24px
        }
        mid()
      }
      .team-name {
        font-size: 14px;
        font-family: 'Industry-Bold';
        margin-left 4px
        mid()
      }
      &:after {
        display none
        content ''
        width: 36px
        height: 2px
        background #0D8DFC
        margin 0 auto
      }
      &.active {
        color #2D2F33
        cursor default
        &:after {
          display block
        }
      }
    }
  }
</style>
