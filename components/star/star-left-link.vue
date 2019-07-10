<template>
  <div class="score_slide_wrap star_slide_link_1">
    <h4 class="score_slide_title">相关链接</h4>
    <ul class="score_slide_main star_link_list">
      <li v-for="item in list">
        <div class="score_slide_border">
          <a :href="item.link" target="_blank">
            <img :src="item.pic+'?x-oss-process=image/resize,m_fill,h_24,w_24'">
            {{item.name}}
          </a>
        </div>
      </li>


    </ul>
  </div>
</template>

<script>
  export default {
    name: "star-left-link",
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

    .score_slide_main {
      li {
        padding: 0 12px;

        .score_slide_border {
          line-height: 24px;
          border-bottom: 1px dotted #F0F1F2;
          padding: 8px 0;

          a{
            display: flex;
            align-items: center;
          }

          img {
            display: block;
            width: 24px;
            height: 24px;
            float: left;
            margin-right: 6px;
          }
        }
      }
    }
  }
</style>
