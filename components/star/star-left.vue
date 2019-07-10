<template>
  <div class="score-star-left">
    <!--官方号信息-->
    <star-left-board :data="data"></star-left-board>

    <!--相关连接-->
    <star-left-link :list="data.link_list['1']" v-if="$store.state.modules.device.type == 'pc'"></star-left-link>

    <!--赞助商-->
    <star-left-sponsor :list="data.link_list['2']" v-if="$store.state.modules.device.type == 'pc'"></star-left-sponsor>


    <div v-if="data.ad_list.length > 0 && $store.state.modules.device.type == 'pc'" v-for="item in data.ad_list" class="score_slide_wrap star_ad_list">
      <a :href="item.go_url" class="star_slide_gg" :title="item.name">
        <img :src="item.image_url ? item.image_url : '/images/img_null.png'+'?x-oss-process=image/resize,m_fill,h_74,w_256,limit_0'">
      </a>
    </div>

  </div>
</template>

<script>
  import StarLeftLink from "./star-left-link";
  import StarLeftSponsor from "./star-left-sponsor";
  import StarLeftBoard from "./star-left-board";
  export default {
    name: "star-left",
    components: {StarLeftBoard, StarLeftSponsor, StarLeftLink},
    props:{
      data:{
        type: Object,
        default: ()=>{}
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

  .score-star-left {
    width: 280px;
    float: left;
  }

  .score_slide_wrap {
    background: #FFFFFF;
    box-shadow: 0 0 0 1px #ebebed;
    border-radius: 2px;
    margin-bottom: 12px;
  }
  .star-item {
    padding-bottom: 14px;
    overflow: hidden;
    margin-bottom: 20px;
  }
  .star-item:nth-child(4n+1) {
    margin-left: 0;
  }




  .star_ad_list{
    padding: 12px 12px 2px 12px;

    .star_slide_gg {
      display: block;
      margin-bottom: 10px;

      img {
        width: 256px;
        height: 74px;
      }
    }
  }


</style>
