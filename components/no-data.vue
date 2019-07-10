<template>
  <div class="no-data" v-if="show">
    <div class="inner-wrap" :style="{width: width, height: height}">
      <img src="~/static/static/images/no_data.png" />
      <p>{{tip}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    name:'noData',
    data() {
      return {}
    },
    props: {
      show: {
        type: Boolean,
        default: false
      },
      width: {
        type: String,
        default: '150px'
      },
      height: {
        type: String,
        default: '150px'
      },
      tip: {
        type: String,
        default: '暂无数据'
      }
    },
    mounted() {},
    methods: {}
  }
</script>

<style lang="stylus" scoped>
  .no-data {
    width 100%
    height: 100%
    .inner-wrap {
      /*position absolute*/
      /*left: 0*/
      /*right: 0*/
      /*top: 0*/
      /*bottom: 0*/
      margin: auto
      text-align center
      img {
        height: calc(100% - 30px)
      }
      p {
        color #999
        text-align center
        font-size 14px
        margin-top 10px
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
