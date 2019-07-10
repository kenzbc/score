<template>
  <div class="layout-index">

    <index-top-match></index-top-match>
    <Header></Header>

    <div id="page-content" class="page-content">
      <nuxt/>
    </div>

    <Aside></Aside>
    <Footer></Footer>

  </div>
</template>

<script>
  import Header from '~/components/Header.vue'
  import Aside from '~/components/Aside.vue'
  import Footer from '~/components/Footer.vue'
  import IndexTopMatch from "../components/common/index-top-match";

  export default {
    components: {
      IndexTopMatch,
      Header,
      Aside,
      Footer
    },
    data() {
      return {}
    },
    methods: {}
  }
</script>

<style lang="stylus">
  @import "~static/static/css/style.styl"
  @import "~static/static/css/ui.styl"
  @import "~static/static/css/iconfont/iconfont.css"
</style>
<style lang="stylus" scoped>

  .layout-index {
    position:relative;
    min-height:100%;
    padding-bottom: 262px;
    /*padding-left: calc(100vw - 100%);*/

    .page-content{
      margin: 0px auto;
      width: 100%;
      zoom: 1;
      padding-top: 0;

      .page-main {
        max-width: 990px;
        margin: 0px auto;
        /*padding-top:56px;*/
      }

      .page-main-single{
        max-width: 990px;
        margin: 0px auto;
        padding-top:20px;
      }

    }
  }


  /*手机*/
  @media screen and (max-width: 767px) {
    .layout-index {
      .page-content{
        padding-top: 40px;
      }
    }
  }
</style>
