<template>
  <div title="俱乐部官方号">
    <div class="index_left_wrap">
      <h4 class="index_slide_title">
        <!--<i class="iconfont icon-remensaishi"></i>-->
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-guanfanghao"></use>
        </svg>
        俱乐部官方号
        <nuxt-link to="/star_list" class="index_slide_more gray_3 flr">更多</nuxt-link>
      </h4>
      <ul class="index_left_main">
        <li v-if="dataList && dataList.length > 0" v-for="item in dataList.slice(0,limit)">
          <div class="index_left_border">
            <nuxt-link :to="'star?star_id='+item.id"><img :src="item.list_image_url+'?x-oss-process=image/resize,m_fill,h_24,w_24,limit_0'" class="fll">{{item.name}}	</nuxt-link>
          </div>
        </li>

      </ul>
    </div>
  </div>
</template>

<script>
  export default {
    name: "",
    components: {},
    data() {
      return {
        tournament_list:[]
      }
    },
    props:{
      dataList:{
        type: Array,
        default: ()=> []
      },
      limit:{
        type: Number,
        default: 5
      },
    },
    mounted() {

    },
    methods: {


    },
    destroyed() {
    }
  }
</script>

<style scoped>
  .index_left_wrap {
    width: 230px;
    background: #fff;
    box-shadow: 0 0 0 1px #ebebed;
    border-radius: 3px;
    margin-bottom: 14px;
  }
  .index_slide_title {
    width: calc(100% - 24px);
    line-height: 44px;
    font-size: 16px;
    border-bottom: 1px solid #f0f1f2;
    margin: 0 auto;
  }
  .index_slide_title .icon {
    width: 24px;
    height: 24px;
    margin: 10px 8px 0 0;
    float: left;
  }
  .index_slide_title .index_slide_more {
    font-size: 14px;
    font-weight: normal;
    color:#A8ABB3;
    float: right;
  }

  .index_left_main li {
    padding: 0 12px;
  }
  .index_left_main li:hover{
    background-color: #f6f7f9;
  }
  .index_left_main li .index_left_border {
    width: 100%;
    height: 38px;
    line-height: 24px;
    font-size: 13px;
    border-bottom: 1px dotted #f0f1f2;
    overflow: hidden;
    padding: 7px 0;
  }
  .index_left_main li img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }




</style>
