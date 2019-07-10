<template>
  <div class="score_slide_wrap star_slide_link_1">
    <h4 class="score_slide_title">赞助商</h4>
    <div class="star_slide_sponsor cl" id="star_link_list_2">

      <a :href="item.link" target="_blank" v-for="item in list" :title="item.name">
        <img :src="item.pic+'?x-oss-process=image/resize,m_fill,h_80,w_80'">
      </a>

    </div>
  </div>
</template>

<script>
  export default {
    name: "star-left-sponsor",
    components: {},
    props:{
      list:{
        type: Array,
        default: ()=>[]
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
  .score_slide_wrap {
    background: #FFFFFF;
    box-shadow: 0 0 0 1px #ebebed;
    border-radius: 2px;
    margin-bottom: 12px;

    .score_slide_title {
      line-height: 40px;
      border-bottom: 1px solid #F0F1F2;
      position: relative;
      margin: 0 12px;
      padding-left: 14px;

      &:before {
        content: '';
        display: block;
        width: 4px;
        height: 12px;
        background: #0D8DFC;
        position: absolute;
        left: 2px;
        top: 14px;
      }
    }



    .star_slide_sponsor {
      padding: 12px 8px 0 8px;

      a {
        display: block;
        width: 80px;
        height: 80px;
        margin: 0px 4px 12px 4px;
        float: left;

        img {
          width: 100%;
          height: 100%;
        }
      }
    }






  }
</style>
