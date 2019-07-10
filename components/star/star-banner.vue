<template>
  <div v-if="list && list.length > 0" class="swiper-container star-banner-swiper" :class="{'mobile' : mobile == true}">
    <div class="swiper-wrapper">
      <div class="swiper-slide" v-for="item in list">
        <nuxt-link :to="'/p/'+item.object_id" :title="item.title">
          <img :src="item.carousel_cover_url" width="100%" height="60%" :alt="item.title">
          <!--<img v-if="mobile != true" :src="item.carousel_cover_url+'?x-oss-process=image/resize,m_fill,h_256,w_640,limit_0'" :alt="item.title">-->
        </nuxt-link>
        <div v-if="mobile == true" class="title">{{item.title}}</div>
      </div>
    </div>
    <!-- 如果需要分页器 -->
    <div class="swiper-pagination"></div>
  </div>
</template>

<script>
  export default {
    name: "star-banner",
    components: {},
    props:{
      list:{
        type: Array,
        default: ()=>[]
      },
      mobile:{
        type: Boolean,
        default: false
      }
    },
    data() {
      return {
        swiper:{},
      }
    },
    mounted() {
      //banner
      this.swiper = new Swiper ('.star-banner-swiper', {
        loop: true, // 循环模式选项

        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
        },
      })
    },
    methods: {},
    destroyed() {
    }
  }
</script>

<style lang="stylus" scoped>
  .star-banner-swiper {
    border-radius: 2px;
    overflow: hidden;
    margin-bottom: 12px;

    .mobile{
      margin-bottom: 0;
    }

    .swiper-slide{
      width 640px;

      .title{
        background: rgba(0,0,0,0.3);
        color: #fff;
        position: absolute;
        bottom: 0;
        width: 100%;
        height: 30px;
        line-height: 30px;
        padding: 0 10px;
      }
    }

    .swiper-pagination{
      text-align: right;
      padding: 0 10px;
    }
    >>> .swiper-pagination-bullet-active {
      opacity: 1;
      background: #fff;
    }

  }
</style>
