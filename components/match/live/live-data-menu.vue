<template>
  <div class="live-data-menu cl" :class="{end: matchStatus == '2'}" v-show="1">
    <div class="data-btn" :class="{active: item.tab == activeMenuIndex}" v-for="(item, index) in dataMenu" :key="index" @click="toggleTab(item)">{{item.name}}</div>
  </div>
</template>

<script>
  export default {
    name: 'live-data-menu',
    props: {
      matchStatus: {
        type: String,
        default: ''
      }
    },
    data: function () {
      return {
        menu: [
          {name: '比赛复盘', tab: 1},
          {name: '击杀地点', tab: 2},
          {name: '走位热点', tab: 3},
          {name: '视野眼位', tab: 4},
          {name: '团战数据', tab: 5},
          {name: '伤害总和', tab: 6},
          {name: '数据面板', tab: 7},
          {name: '经济曲线', tab: 8},
          {name: '经验曲线', tab: 9}
        ]
      };
    },
    created() {},
    watch: {},
    computed: {
      dataMenu: function () {
        var pos = this.matchStatus == '1' ? 1 : 0;
        return this.menu.slice(pos);
      },
      activeMenuIndex: function () {
        return this.$root.$data.liveDataMenuIndex;
      }
    },
    mounted() {

    },
    methods: {
      toggleTab: function (item) {
        this.$emit('change-tab-data', item.tab);
      }
    }
  };
</script>
<style lang="stylus" scoped>
  .live-data-menu {
    display flex
    align-items center
    justify-content center
    width: 100%
    background #000
    padding 11px 14px
    .data-btn {
      width: 72px;
      height: 28px;
      background: rgba(31, 34, 41, 0.8);
      border-radius: 8px;
      float left
      font-size: 13px;
      font-weight: 500;
      color: #fff
      line-height: 28px;
      text-align center
      cursor pointer
      + .data-btn {
        margin-left 8px
      }
      &.active {
        background #0D8DFC
        cursor default
      }
    }
    &.end {
      padding 16px 124px
    }
    &.playing {
      padding 16px 124px
    }
  }
</style>
