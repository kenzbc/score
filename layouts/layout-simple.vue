<template>
  <div class="layout-simple">

    <nuxt/>

    <Aside></Aside>
    <Footer></Footer>
  </div>
</template>

<script>
  import Header from '~/components/Header.vue'
  import Aside from '~/components/Aside.vue'
  import Footer from '~/components/Footer.vue'
  export default {
    components:{
      Header,
      Footer,
      Aside
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
  .layout-simple{
    width: 100%;
    min-height 100%;
    position relative;
    padding-bottom 265px;
  }
</style>
