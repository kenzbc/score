<template>
  <div class="piece-header">
    <h2 class="fll">{{title}}</h2>
    <slot></slot>
    <!--<ul class="menu cl">-->
      <!--<li class="m-item-wrap" v-for="(item, index) in tournament.list" :key="index">-->
        <!--<span class="m-item" :class="{active: tournament.index == index}" :data-index="index" :data-round-id="item.roundID">{{item.name || ''}}<svg class="icon" aria-hidden="true"><use xlink:href="#icon-circle_blue"></use></svg></span>-->
      <!--</li>-->
    <!--</ul>-->
  </div>
</template>

<script>
  export default {
    name: "top-bar",
    props: {
      title: String
    },
    data() {
      return {

      }
    },
    mounted() {
    },
    methods: {

    },
    destroyed() {
    }
  }
</script>

<style lang="stylus">
  @import "~static/static/css/variable.styl"

  .piece-header {
    height: 52px
    background: linear-gradient(-135deg, #FAFAFA, #FCFCFC);
    border-bottom 1px solid #F0F1F2
    h2 {
      position: relative;
      font-size: 20px;
      font-weight 400
      color: $color-gray-1
      padding-left: 38px;
      line-height: 42px;
      border-top 1px solid #F0F1F2
      margin-top 4px
      height: calc(100% - 3px)
      background #fff

      &:before {
        content: '';
        display: block;
        width: 4px;
        height: 16px;
        background: #d2d4d9;
        position: absolute;
        left: 24px;
        top: 15px;
      }
    }
    .header-bg-line {
      display block
      width: 70px
      height: 52px
      float left
      background url('/images/tournament/box_header_bg.png') no-repeat center;
      background-size 70px 53px
    }
    .menu {
      height: 100%
      float left
      .m-item-wrap {
        width: 114px
        float left
        text-align center
        padding 0 10px
        line-height 50px
        ellipsis()
        &:nth-of-type(1) {
          margin-left -20px
        }
        &.more-btn {
          font-size 16px
          font-weight 400
          color $color-gray-2
          text-align right
          padding-right 16px
          a {
            color $color-gray-2
          }
        }
        .m-item {
          position relative
          color $color-gray-1
          font-size 17px
          .icon {
            width: 12px
            height: 12px
            color transparent
            display none
            position absolute
            top 0
            right -12px
          }
          &.active {
            color $color-gray
            font-weight 600
            cursor: default
            .icon {
              display block
              color $color-blue
            }
          }
          &:not(.active) {
            cursor pointer
          }
        }
        + .m-item-wrap {
          position relative
          &:before {
            display block
            content ''
            width: 1px
            height: 14px
            background $color-gray-4
            position absolute
            left 0
            top 20px
          }
        }
      }
    }

  }

</style>
