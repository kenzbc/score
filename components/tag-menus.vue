<template>
    <ul class="menu fl cl" v-if="menusData.list">
      <li class="item" :class="{active: menusData.activeIndex === index}" v-for="(item, index) in menusData.list" :key="item.key" @click="selectMenu(item)">{{ item.title }}</li>
      <!--<li class="item" data-status="ing">进行中</li>-->
      <!--<li class="item" data-status="nostart">即将开始</li>-->
      <!--<li class="item" data-status="end">已经结束</li>-->
    </ul>
</template>

<script>
  /**
   * tab 标签
   */
  export default {
    name:"tag-menus",
    data() {
      return {}
    },
    props: {
      menusData: {
        type: Object,
        default: {}
      }
    },
    mounted() {
      // console.log(this.menusData)
    },
    methods: {
      selectMenu (item) {
        this.$emit('selectMenu', item)
      }
    }
  }
</script>

<style lang="stylus" scoped>
  .item {
    float left
    width: 80px;
    height: 30px;
    line-height: 30px;
    font-size: 14px;
    color: #656973;
    text-align: center;
    background: #F0F1F2;
    border-radius: 8px;
    cursor pointer
    &.active {
      color: #fff;
      background: #0D8DFC;
    }
    +.item {
      margin-left 10px
    }
  }

  @media screen and (max-width: 1200px) {
    .star-list-box {
      width: 900px;
    }
  }

  @media screen and (max-width: 768px) {
    .star-main {
      padding-top 30px;
    }

    .star-list-box {
      width: 600px;
    }
  }

  @media screen and (max-width: 600px) {
    .star-main {
      padding-top 0;
    }

    .star-list-box {
      width: 300px;
    }
  }
</style>
