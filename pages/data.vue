<template>
  <div>
    <header-sub-menus>
      <li v-for="item in headerSubMenu">
        <nuxt-link :to="item.url" :class="{active : item.active}" class="link">{{item.title}}
          <svg class="icon schdule_icon_active" aria-hidden="true">
            <use xlink:href="#icon-circle_blue"></use>
          </svg>
        </nuxt-link>
      </li>
    </header-sub-menus>
    <div class="page-main">
      大数据开发中

    </div>
  </div>
</template>

<script>
  export default {
    name: "database",
    components: {},
    data() {
      return {
        headerSubMenu: [
          {title: '热门', url: '/schedule', active: false},
          {title: '赛事', url: '/tournament_list', active: false},
          {title: '大数据', url: '/data', active: true}
        ]
      }
    },
    async asyncData() {

    },
    methods: {},
    mounted() {

    },
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>

</style>
