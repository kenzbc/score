<template>
  <div class="sub-menu">
    <div class="sub-header" v-if="subMenu">
      <div class="sub-header-nav-left"></div>
      <div class="sub-header-nav">
        <ul class="nav-list cl">
          <slot></slot>
          <!--<li v-for="item in subMenu"><a :href="item.url" :class="{active : item.active}" class="link">{{item.title}}-->
          <!--<svg class="icon schdule_icon_active" aria-hidden="true">-->
          <!--<use xlink:href="#icon-circle_blue"></use>-->
          <!--</svg>-->
          <!--</a></li>-->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "sub-menu",
    components: {},
    props: {
      subMenu: {
        type: Array,
        default: () => []
      }
    },
    data() {
      return {}
    },
    mounted() {

    },
    methods: {},
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>

  .sub-menu {
    width: 100%;
    background: rgba(255, 255, 255, 1);
    position fixed;
    top 51px;
    z-index 99;
    box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.02), 0 2px 4px 0 rgba(0, 0, 0, 0.04);
  }

  .sub-header {
    width: 100%;
    max-width: 1200px;
    height: 36px;
    margin: 0 auto;
    /*position: relative;*/
    /*z-index: 30;*/
    /*display flex;*/

    .sub-header-nav-left {
      padding: 0;
      padding-top: 8px;
      width: 105px;
      height: 100%;
      float: left;
    }

    .sub-header-nav {
      width: 1200px;
      height: 36px;
      /*margin: 0 auto;*/

      .nav-list {
        display flex;

        li {
          flex-shrink:0;
          font-size: 14px;
          padding: 0 22px;
          float: left;
          height: 36px;
          line-height: 36px;
        }
        li:first-child {
          padding-left: 0
        }
        /deep/ a.link {
          height: 100%;
          color: #A8ABB3;
          cursor: pointer;
          display: block;
          position: relative;

          /deep/ .schdule_icon_active {
            position: absolute;
            display: none;
            width: 12px;
            height: 12px;
            color: #0d8dfc;
            right: -1px;
            top: 8px;
          }

          /deep/ &.active {
            color: #2D2F33;
            cursor: default
            .schdule_icon_active {
              display: block;
              right: -12px;
            }
          }

          &:hover {
            color: #2D2F33
          }

        }
      }
    }
  }


  /*手机*/
  @media screen and (max-width: 767px) {
    .sub-menu{
      top: 40px;
    }

    .sub-header {
      overflow: auto;

      .sub-header-nav {

        .nav-list {
          display flex;
          overflow: auto;
        }
      }
    }
  }
</style>
