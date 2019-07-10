<template>
  <div class="layout-topic">
    <Header :styles="styles"></Header>
    <div class="page-content">
      <nuxt/>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '~/components/Header.vue'
  import Footer from '~/components/Footer.vue'
  export default {
    components:{
      Header,
      Footer
    },
    data(){
      return {
        styles:{
          'box-shadow':'none'
        }
      }
    },
    head () {
      return {
        title: '',
        meta:
          [
            {hid:'keywords', name: 'keywords', content: `page`},
            {hid:'description', name: 'description', content: `page`},
          ]
      }
    },
    methods:{}
  }
</script>
<style lang="stylus">
  @import "~static/static/css/style.styl"
  @import "~static/static/css/ui.styl"
  @import "~static/static/css/iconfont/iconfont.css"
</style>
<style lang="stylus" scoped>
  .layout-topic {
    position:relative;
    min-height:100%;
    padding-bottom: 223px;
    /*padding-left: calc(100vw - 100%);*/

    .page-content{
      margin: 0px auto;
      width: 100%;
      zoom: 1;
      /*padding-top: 51px;*/

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
    .layout-topic {
      .page-content{
        padding-top: 40px;
      }
    }

  }
</style>
