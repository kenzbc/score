<template>
  <div class="main-cont-text" v-html="content">
  </div>
</template>

<script>
  //文章类型帖子内容
  export default {
    name: "article-detail",
    props:{
      content:{
        type:String,
        default: ''
      }
    },
    components: {},
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
  .main-cont-text {
    font-size: 16px;
    line-height: 1.8;
    color: #4c4c4c;
    font-weight: 300;
    word-wrap: break-word;
    padding: 0;

    >>> p {
      font-size: 16px;
      line-height: 1.8;
      color: #4c4c4c;
      font-weight: 300;
      word-wrap: break-word;
    }

    >>> img{
      max-width: 100%;
      display: block;
      text-align: center;
      margin: 0 auto;
    }
  }
</style>
