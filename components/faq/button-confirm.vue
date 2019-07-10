<template>
	<div class="button-confirm" :class="paramsObj.class">
    <span>{{paramsObj.title}}</span>
  </div>
</template>

<script>
  export default {
    name: 'button-confirm',
    props: {
      // class 颜色
      paramsObj: {
        type: Object,
        default: null
      }

      // paramsObj: {   // 参数案例
      //   title: '提交问题',
      //   class: 'no-bg-blue',
      // }
    },
  }
</script>

<style lang="stylus" scoped>
  .button-confirm {
    width 100%
    line-height 40px
    border-radius 20px
    text-align center
    cursor pointer

    &.blue {   // 蓝色
      color #fff
      background #0d8dfc

      &:hover {
        background #077ee6
      }
    }

    &.no-bg-blue {  // 蓝边 透明背景
      color #0d8dfc
      border 1px solid #0d8dfc

      &:hover {
        background #EDF7FF
      }
    }

    &.no-bg-gray{  // 蓝边 透明背景
      color #656973
      border 1px solid #EBEBED

      &:hover {
        background #F0F1F2
      }
    }


  }
</style>
